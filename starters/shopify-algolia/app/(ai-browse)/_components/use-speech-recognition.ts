import { useCallback, useEffect, useRef, useState } from "react"
import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk"
import { env } from "env.mjs"

type RecordingState = "idle" | "recording" | "processing"

type UseSpeechRecognitionOptions = {
  onTranscript: (text: string) => void
  onEndOfUtterance: () => void
  onError: (message: string) => void
  silenceTimeoutMs?: number
  maxAudioDurationMs?: number
}

type CachedToken = {
  token: string
  timestamp: number
}
const ERROR_MESSAGES: Record<SpeechSDK.CancellationErrorCode, string> = {
  [SpeechSDK.CancellationErrorCode.NoError]: "No error occurred during speech recognition.",
  [SpeechSDK.CancellationErrorCode.AuthenticationFailure]: "Authentication failed. Please try again later.",
  [SpeechSDK.CancellationErrorCode.BadRequestParameters]: "Invalid recognition parameters provided.",
  [SpeechSDK.CancellationErrorCode.TooManyRequests]: "Too many requests. Please wait and try again.",
  [SpeechSDK.CancellationErrorCode.ConnectionFailure]: "Connection failed. Check your network and try again.",
  [SpeechSDK.CancellationErrorCode.ServiceTimeout]: "Service timed out. Please try again later.",
  [SpeechSDK.CancellationErrorCode.ServiceError]: "Service encountered an error. Please try again.",
  [SpeechSDK.CancellationErrorCode.RuntimeError]: "An unexpected runtime error occurred.",
  [SpeechSDK.CancellationErrorCode.Forbidden]: "Quota exceeded. Please wait and try again.",
}

export const useSpeechRecognition = ({ onTranscript, onEndOfUtterance, onError, silenceTimeoutMs = 2000, maxAudioDurationMs = 15000 }: UseSpeechRecognitionOptions) => {
  const [recordingState, setRecordingState] = useState<RecordingState>("idle")
  const [stream, setStream] = useState<MediaStream | null>(null)
  const recognizerRef = useRef<SpeechSDK.SpeechRecognizer | null>(null)
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const maxDurationTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const tokenRef = useRef<CachedToken | null>(null)
  const onEndOfUtteranceRef = useRef(onEndOfUtterance)

  useEffect(() => {
    onEndOfUtteranceRef.current = onEndOfUtterance
  }, [onEndOfUtterance])

  const fetchToken = useCallback(async () => {
    try {
      const res = await fetch("/api/speech/token")
      if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`)
      }
      const data = (await res.json()) as { token: string }
      tokenRef.current = { token: data.token, timestamp: Date.now() }
      return data.token
    } catch (error) {
      throw error instanceof Error ? error : new Error("Failed to fetch token")
    }
  }, [])

  const getValidToken = useCallback(async () => {
    const TOKEN_EXPIRY_MS = 10 * 60 * 1000
    const BUFFER_MS = 30 * 1000
    const now = Date.now()
    if (tokenRef.current && now - tokenRef.current.timestamp < TOKEN_EXPIRY_MS - BUFFER_MS) {
      return tokenRef.current.token
    }
    return await fetchToken()
  }, [fetchToken])

  const stopRecognition = useCallback(() => {
    if (recognizerRef.current) {
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current)
        silenceTimeoutRef.current = null
      }
      if (maxDurationTimeoutRef.current) {
        clearTimeout(maxDurationTimeoutRef.current)
        maxDurationTimeoutRef.current = null
      }
      setRecordingState("processing")
      recognizerRef.current.stopContinuousRecognitionAsync(
        () => {
          recognizerRef.current?.close()
          recognizerRef.current = null
          setRecordingState("idle")
          setStream(null)
          onEndOfUtteranceRef.current()
        },
        (err) => {
          console.error("Error stopping recognition:", err)
          recognizerRef.current?.close()
          recognizerRef.current = null
          setRecordingState("idle")
          setStream(null)
        }
      )
    } else {
      setRecordingState("idle")
      setStream(null)
    }
  }, [])

  const startRecognition = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true })
        setStream(mediaStream)

        const token = await getValidToken()

        const speechConfig = SpeechSDK.SpeechConfig.fromAuthorizationToken(token, env.NEXT_PUBLIC_AZURE_AI_SPEECH_REGION || "")
        speechConfig.speechRecognitionLanguage = env.NEXT_PUBLIC_AZURE_AI_SPEECH_LANGUAGE

        const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput()
        const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig)
        recognizerRef.current = recognizer

        recognizer.recognizing = (_, e) => {
          onTranscript(e.result.text || "")
          if (silenceTimeoutRef.current) {
            clearTimeout(silenceTimeoutRef.current)
          }
        }

        recognizer.recognized = (_, e) => {
          if (e.result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
            onTranscript(e.result.text || "")
            if (silenceTimeoutRef.current) {
              clearTimeout(silenceTimeoutRef.current)
            }
            silenceTimeoutRef.current = setTimeout(stopRecognition, silenceTimeoutMs)
          }
        }

        recognizer.canceled = (_, e) => {
          if (e.reason === SpeechSDK.CancellationReason.Error) {
            onError(ERROR_MESSAGES[e.errorCode])
            console.error(e.errorDetails)
          }
          stopRecognition()
        }

        recognizer.sessionStopped = stopRecognition

        recognizer.startContinuousRecognitionAsync(
          () => {
            setRecordingState("recording")
            maxDurationTimeoutRef.current = setTimeout(() => {
              stopRecognition()
            }, maxAudioDurationMs)
          },
          (err) => {
            onError(`Failed to initiate speech recognition. Please try again. (${err})`)
            setRecordingState("idle")
          }
        )
      } catch (error) {
        console.error(error)
        onError("Failed to initiate speech recognition. Please try again.")
        setRecordingState("idle")
      }
    },
    [onTranscript, onError, silenceTimeoutMs, maxAudioDurationMs, getValidToken, stopRecognition]
  )

  useEffect(() => {
    return stopRecognition
  }, [stopRecognition])

  return {
    startRecognition,
    stopRecognition,
    recordingState,
    stream,
  }
}
