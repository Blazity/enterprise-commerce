import { useRef, useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import { toast } from "sonner"
import { cn } from "utils/cn"
import { Textarea } from "components/ui/textarea"
import { useAiCommerce } from "./ai-commerce-provider"
import { generateUUID } from "utils/generate-uuid"
import { Mic, X } from "lucide-react"

type RecordingState = "idle" | "recording" | "processing"
type TranscriptionResponse = { text: string }

type AudioFormat = "webm" | "mp4" | "ogg" | "wav" | "mp3"
type AudioCodec = "opus" | "aac" | "pcm"

type AudioRecorderConfig = {
  format?: AudioFormat
  codec?: AudioCodec
  maxDuration?: number // in seconds, undefined means no limit
  audioBitsPerSecond?: number
  timeslice?: number // in milliseconds, how often to emit data
  onComplete?: (blob: Blob) => Promise<void> | void
  onError?: (error: Error) => void
}

type UseAudioRecorderReturn = {
  startRecording: () => Promise<void>
  stopRecording: () => void
  isRecording: boolean
  isProcessing: boolean
  error: Error | null
  isSupported: boolean
}

const DEFAULT_CONFIG = {
  format: "webm" as AudioFormat,
  codec: "opus" as AudioCodec,
  maxDuration: undefined as number | undefined,
  audioBitsPerSecond: 128000,
  timeslice: 1000,
}

const getMimeType = (format: AudioFormat, codec: AudioCodec): string => {
  const mimeTypes = {
    webm: { opus: "audio/webm;codecs=opus" },
    mp4: { aac: "audio/mp4" },
    mp3: { aac: "audio/mp3" },
    ogg: { opus: "audio/ogg;codecs=opus" },
    wav: { pcm: "audio/wav" },
  }

  return mimeTypes[format]?.[codec] || ""
}

const useAudioRecorder = (config: AudioRecorderConfig = {}): UseAudioRecorderReturn => {
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [isSupported, setIsSupported] = useState(true)
  
  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const stream = useRef<MediaStream | null>(null)
  const chunks = useRef<Blob[]>([])
  const timeoutId = useRef<NodeJS.Timeout | null>(null)
  
  const configRef = useRef<AudioRecorderConfig>({...config})
  
  useEffect(() => {
    configRef.current = {...config}
  }, [config])
  
  const getMergedConfig = useCallback(() => {
    return {
      ...DEFAULT_CONFIG,
      ...configRef.current,
    }
  }, [])

  useEffect(() => {
    const checkSupport = () => {
      const isSupported = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
      setIsSupported(isSupported)
      
      if (!isSupported) {
        setError(new Error("Audio recording is not supported in this browser"))
      }
    }
    
    checkSupport()
    
    return () => {
      stopRecordingAndCleanup()
    }
  }, [])
  
  const stopRecordingAndCleanup = useCallback(() => {
    try {
      if (mediaRecorder.current?.state === "recording") {
        mediaRecorder.current.stop()
      }
      
      if (stream.current) {
        stream.current.getTracks().forEach(track => track.stop())
        stream.current = null
      }
      
      if (timeoutId.current) {
        clearTimeout(timeoutId.current)
        timeoutId.current = null
      }
    } catch (err) {
      console.error("Cleanup error:", err)
    }
  }, [])

  const getBestSupportedMimeType = useCallback((): string => {
    const mergedConfig = getMergedConfig()
    const { format, codec } = mergedConfig
    const preferredMimeType = getMimeType(format, codec)
    
    if (preferredMimeType && MediaRecorder.isTypeSupported(preferredMimeType)) {
      return preferredMimeType
    }
    
    const fallbackTypes = [
      "audio/mp3",
      "audio/mpeg",
      "audio/webm;codecs=opus",
      "audio/webm",
      "audio/ogg;codecs=opus",
      "audio/wav",
      "audio/mp4",
      ""
    ]
    
    for (const type of fallbackTypes) {
      if (MediaRecorder.isTypeSupported(type)) {
        console.log(`Using supported MIME type: ${type}`)
        return type
      }
    }
    
    return ""
  }, [getMergedConfig])

  const startRecording = useCallback(async () => {
    try {
      setError(null)
      chunks.current = []
      
      stopRecordingAndCleanup()
      
      stream.current = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          channelCount: 1,
          sampleRate: 16000,
          echoCancellation: true,
          noiseSuppression: true
        } 
      })
      
      const mimeType = getBestSupportedMimeType()
      const mergedConfig = getMergedConfig()
      
      mediaRecorder.current = new MediaRecorder(stream.current, {
        mimeType,
        audioBitsPerSecond: mergedConfig.audioBitsPerSecond,
      })
      
      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.current.push(event.data)
        }
      }
      
      mediaRecorder.current.onstop = async () => {
        if (chunks.current.length > 0) {
          setIsProcessing(true)
          
          try {
            let audioBlob: Blob

            if (mimeType.includes('mp3') || mimeType.includes('mpeg')) {
              audioBlob = new Blob(chunks.current, { type: 'audio/mp3' })
            } else if (mimeType.includes('webm')) {
              audioBlob = new Blob(chunks.current, { type: 'audio/webm' })
            } else if (mimeType.includes('ogg')) {
              audioBlob = new Blob(chunks.current, { type: 'audio/ogg' })
            } else if (mimeType.includes('wav')) {
              audioBlob = new Blob(chunks.current, { type: 'audio/wav' })
            } else {
              audioBlob = new Blob(chunks.current, { type: 'audio/mp3' })
            }
            
            console.log(`Created audio blob with type: ${audioBlob.type}, size: ${audioBlob.size} bytes`)
            
            if (configRef.current.onComplete) {
              await configRef.current.onComplete(audioBlob)
            }
          } catch (err) {
            const error = err instanceof Error ? err : new Error("Error processing recording")
            setError(error)
            if (configRef.current.onError) {
              configRef.current.onError(error)
            }
          } finally {
            setIsProcessing(false)
            setIsRecording(false)
          }
        }
      }
      
      mediaRecorder.current.onerror = (event) => {
        const error = new Error("Recording failed: " + event.error)
        setError(error)
        
        if (configRef.current.onError) {
          configRef.current.onError(error)
        }
        
        setIsRecording(false)
      }
      
      mediaRecorder.current.start(mergedConfig.timeslice)
      setIsRecording(true)
      
      if (mergedConfig.maxDuration) {
        timeoutId.current = setTimeout(() => {
          if (mediaRecorder.current?.state === "recording") {
            stopRecording()
          }
        }, mergedConfig.maxDuration * 1000)
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to start recording")
      setError(error)
      
      if (configRef.current.onError) {
        configRef.current.onError(error)
      }
    }
  }, [getBestSupportedMimeType, getMergedConfig, stopRecordingAndCleanup])

  const stopRecording = useCallback(() => {
    try {
      if (mediaRecorder.current?.state === "recording") {
        mediaRecorder.current.stop()
      }
      
      if (timeoutId.current) {
        clearTimeout(timeoutId.current)
        timeoutId.current = null
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to stop recording")
      setError(error)
      
      if (configRef.current.onError) {
        configRef.current.onError(error)
      }
    }
  }, [])

  return {
    startRecording,
    stopRecording,
    isRecording,
    isProcessing,
    error,
    isSupported,
  }
}

export const Textbox = ({ messages }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { handleSubmit, createNewSuggestions, setInput, isLoading, input } = useAiCommerce()
  const [recordingState, setRecordingState] = useState<RecordingState>("idle")
  
  const processAudioForTranscription = useCallback(async (audioBlob: Blob) => {
    try {
      console.log(`Sending audio for transcription: ${audioBlob.type}, size: ${audioBlob.size} bytes`)
      
      const formData = new FormData()
      formData.append('audio', audioBlob)
      
      const response = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      })
      
      // Handle non-OK responses
      if (!response.ok) {
        let errorMessage = "Transcription failed"
        try {
          const errorData = await response.json() as { error?: string }
          errorMessage = errorData.error || errorMessage
        } catch (e) {
          // If JSON parsing fails, use the status text
          errorMessage = response.statusText || errorMessage
        }
        throw new Error(errorMessage)
      }
      
      const data = await response.json() as TranscriptionResponse
      setInput(data.text)
      setRecordingState("idle")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to transcribe audio")
      console.error("Transcription error:", error)
      setRecordingState("idle")
    }
  }, [setInput])
  
  const handleRecorderError = useCallback((error: Error) => {
    toast.error(error.message)
    setRecordingState("idle")
  }, [])
  
  const {
    startRecording,
    stopRecording,
    isRecording,
    isProcessing,
    error,
    isSupported,
  } = useAudioRecorder({
    format: "mp3",
    codec: "aac",
    maxDuration: 300,
    audioBitsPerSecond: 128000,
    onComplete: processAudioForTranscription,
    onError: handleRecorderError,
  })

  useEffect(() => {
    if (error) {
      toast.error(error.message)
    }
  }, [error])

  useEffect(() => {
    if (isProcessing) {
      setRecordingState("processing")
    } else if (isRecording) {
      setRecordingState("recording")
    }
  }, [isProcessing, isRecording])

  const handleInput = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value)
  }, [setInput])

  const handleSubmitForm = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e)
    createNewSuggestions([...messages, { id: generateUUID(), role: "user", content: input }])
  }, [handleSubmit, createNewSuggestions, messages, input])

  const handleStartRecording = useCallback(async () => {
    setRecordingState("recording")
    await startRecording()
  }, [startRecording])

  const handleStopRecording = useCallback(() => {
    stopRecording()
  }, [stopRecording])

  return (
    <form>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.25, delay: 0.18 }}
        className="relative"
      >
        <Textarea
          ref={textareaRef}
          placeholder="Send a message..."
          value={input}
          onChange={handleInput}
          disabled={recordingState !== "idle"}
          className={cn(
            "max-h-[calc(50dvh)] min-h-[24px] resize-none overflow-hidden rounded-xl bg-white text-base focus-visible:ring-gray-300",
            recordingState !== "idle" && "opacity-50"
          )}
          rows={3}
          autoFocus
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault()

              if (isLoading) {
                toast.error("Please wait for the model to finish its response!")
              } else {
                handleSubmitForm(event as unknown as React.FormEvent<HTMLFormElement>)
              }
            }
          }}
        />
        
        {recordingState === "idle" && isSupported && (
          <motion.button
            type="button"
            onClick={handleStartRecording}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 p-1.5 text-gray-600 hover:bg-gray-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mic size={18} />
          </motion.button>
        )}
        
        <AnimatePresence>
          {recordingState !== "idle" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-white/90 backdrop-blur-sm"
            >
              <motion.div
                className="flex flex-col items-center gap-4"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
              >
                {recordingState === "recording" ? (
                  <>
                    <motion.div
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        backgroundColor: ["rgb(254, 226, 226)", "rgb(254, 202, 202)", "rgb(254, 226, 226)"]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="h-4 w-4 rounded-full bg-red-500" />
                    </motion.div>
                    <p className="text-sm font-medium text-gray-600">Pending voice recording...</p>
                    <motion.button
                      type="button"
                      onClick={handleStopRecording}
                      className="mt-2 rounded-lg bg-gray-900 px-8 py-3 font-medium text-white hover:bg-gray-800"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Stop recording
                    </motion.button>
                  </>
                ) : (
                  <>
                    <motion.div
                      className="h-16 w-16 rounded-full bg-blue-100 p-4"
                      animate={{ 
                        rotate: [0, 360],
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2,
                        ease: "linear"
                      }}
                    >
                      <div className="h-full w-full rounded-full border-4 border-blue-400 border-t-transparent" />
                    </motion.div>
                    <p className="text-sm font-medium text-gray-600">Processing your voice...</p>
                  </>
                )}
              </motion.div>
              
              <motion.button
                type="button"
                onClick={() => {
                  handleStopRecording()
                  setRecordingState("idle")
                }}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 p-1.5 text-gray-600 hover:bg-gray-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={18} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </form>
  )
}
