import { useCallback, useEffect, useRef, useState } from "react"
import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk"
import { env } from "env.mjs"

type RecordingState = "idle" | "recording" | "processing"

type UseSpeechRecognitionOptions = {
  onFinalTranscript: (text: string) => void
  onError: (message: string) => void
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

export const useSpeechRecognition = ({ onFinalTranscript, onError, maxAudioDurationMs = 15000 }: UseSpeechRecognitionOptions) => {
  const [recordingState, setRecordingState] = useState<RecordingState>("idle")
  const [stream, setStream] = useState<MediaStream | null>(null)
  const recognizerRef = useRef<SpeechSDK.SpeechRecognizer | null>(null)
  const maxDurationTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const tokenRef = useRef<CachedToken | null>(null)
  const transcriptRef = useRef("")

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

  const cleanup = () => {
    if (maxDurationTimeoutRef.current) {
      clearTimeout(maxDurationTimeoutRef.current)
      maxDurationTimeoutRef.current = null
    }
    recognizerRef.current?.close()
    recognizerRef.current = null
    setRecordingState("idle")
    setStream(null)
    transcriptRef.current = ""
  }

  const stopRecognition = useCallback(
    (shouldSubmit = false) => {
      if (!recognizerRef.current) {
        setRecordingState("idle")
        setStream(null)
        return
      }

      if (!shouldSubmit) {
        cleanup()
        return
      }

      setRecordingState("processing")
      recognizerRef.current.stopContinuousRecognitionAsync(
        () => {
          if (transcriptRef.current.trim().length > 0) {
            onFinalTranscript(transcriptRef.current)
          }
          cleanup()
        },
        (err) => {
          console.error("Error stopping recognition:", err)
          cleanup()
        }
      )
    },
    [onFinalTranscript]
  )

  const startRecognition = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true })
        setStream(mediaStream)

        const token = await getValidToken()

        const speechConfig = SpeechSDK.SpeechConfig.fromAuthorizationToken(token, env.NEXT_PUBLIC_AZURE_AI_SPEECH_REGION || "")
        speechConfig.speechRecognitionLanguage = env.NEXT_PUBLIC_AZURE_AI_SPEECH_LANGUAGE
        speechConfig.setProperty(SpeechSDK.PropertyId.SpeechServiceConnection_EndSilenceTimeoutMs, "500")
        speechConfig.setProperty(SpeechSDK.PropertyId.Speech_SegmentationSilenceTimeoutMs, "500")

        const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput()
        const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig)
        recognizerRef.current = recognizer

        recognizer.recognizing = (_, e) => {
          transcriptRef.current = e.result.text
        }

        recognizer.recognized = (_, e) => {
          transcriptRef.current = e.result.text
        }

        recognizer.canceled = (_, e) => {
          if (e.reason === SpeechSDK.CancellationReason.Error) {
            onError(ERROR_MESSAGES[e.errorCode])
            console.error(e.errorDetails)
          }
          stopRecognition()
        }

        recognizer.speechEndDetected = () => {
          stopRecognition(true)
        }

        recognizer.startContinuousRecognitionAsync(
          () => {
            setRecordingState("recording")
            maxDurationTimeoutRef.current = setTimeout(() => {
              stopRecognition(true)
            }, maxAudioDurationMs)
          },
          (err) => {
            onError(`Failed to initiate speech recognition. Please try again. (${err})`)
            setRecordingState("idle")
            throw new Error(`Failed to initiate speech recognition. Please try again. (${err})`)
          }
        )
      } catch (error) {
        console.error(error)
        onError("Failed to initiate speech recognition. Please try again.")
        setRecordingState("idle")
      }
    },
    [onError, maxAudioDurationMs, getValidToken, stopRecognition]
  )

  useEffect(() => {
    return () => {
      stopRecognition()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return {
    startRecognition,
    stopRecognition,
    recordingState,
    stream,
  }
}
