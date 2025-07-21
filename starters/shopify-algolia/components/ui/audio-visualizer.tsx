"use client"

import { useEffect, useRef } from "react"

const AUDIO_CONFIG = {
  FFT_SIZE: 512,
  SMOOTHING: 0.8,
  MIN_BAR_HEIGHT: 1,
  MIN_BAR_WIDTH: 2,
  BAR_SPACING: 1,
  COLOR: {
    MIN_INTENSITY: 100,
    MAX_INTENSITY: 255,
    INTENSITY_RANGE: 155,
  },
} as const

interface AudioVisualizerProps {
  stream: MediaStream | null
  isRecording: boolean
  onClick: () => void
}

export function AudioVisualizer({ stream, isRecording, onClick }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationFrameRef = useRef<number>()
  const containerRef = useRef<HTMLDivElement>(null)

  const cleanup = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    if (audioContextRef.current) {
      audioContextRef.current.close()
    }
  }

  useEffect(() => {
    return cleanup
  }, [])

  useEffect(() => {
    if (stream && isRecording) {
      startVisualization()
    } else {
      cleanup()
    }
  }, [stream, isRecording])

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && containerRef.current) {
        const container = containerRef.current
        const canvas = canvasRef.current
        const dpr = window.devicePixelRatio || 1
        const rect = container.getBoundingClientRect()

        canvas.width = rect.width * dpr
        canvas.height = rect.height * dpr

        canvas.style.width = `${rect.width}px`
        canvas.style.height = `${rect.height}px`

        const ctx = canvas.getContext("2d")
        if (ctx) {
          ctx.setTransform(1, 0, 0, 1, 0, 0)
          ctx.scale(dpr, dpr)
        }
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const startVisualization = async () => {
    try {
      const audioContext = new AudioContext()
      audioContextRef.current = audioContext

      const analyser = audioContext.createAnalyser()
      analyser.fftSize = AUDIO_CONFIG.FFT_SIZE
      analyser.smoothingTimeConstant = AUDIO_CONFIG.SMOOTHING
      analyserRef.current = analyser

      const source = audioContext.createMediaStreamSource(stream!)
      source.connect(analyser)

      draw()
    } catch (error) {
      console.error("Error starting visualization:", error)
    }
  }

  const getBarColor = (normalizedHeight: number) => {
    const intensity =
      Math.floor(normalizedHeight * AUDIO_CONFIG.COLOR.INTENSITY_RANGE) + AUDIO_CONFIG.COLOR.MIN_INTENSITY
    return `rgb(${intensity}, ${intensity}, ${intensity})`
  }

  const drawBar = (
    ctx: CanvasRenderingContext2D,
    x: number,
    centerY: number,
    width: number,
    height: number,
    color: string
  ) => {
    ctx.fillStyle = color
    ctx.fillRect(x, centerY - height, width, height)
    ctx.fillRect(x, centerY, width, height)
  }

  const draw = () => {
    if (!isRecording) return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx || !analyserRef.current) return

    const dpr = window.devicePixelRatio || 1
    ctx.scale(dpr, dpr)

    const analyser = analyserRef.current
    const bufferLength = analyser.frequencyBinCount
    const frequencyData = new Uint8Array(bufferLength)

    const drawFrame = () => {
      animationFrameRef.current = requestAnimationFrame(drawFrame)

      analyser.getByteFrequencyData(frequencyData)

      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr)

      const barWidth = Math.max(
        AUDIO_CONFIG.MIN_BAR_WIDTH,
        canvas.width / dpr / bufferLength - AUDIO_CONFIG.BAR_SPACING
      )
      const centerY = canvas.height / dpr / 2
      let x = 0

      for (let i = 0; i < bufferLength; i++) {
        const normalizedHeight = frequencyData[i] / 255
        const barHeight = Math.max(AUDIO_CONFIG.MIN_BAR_HEIGHT, normalizedHeight * centerY)

        drawBar(ctx, x, centerY, barWidth, barHeight, getBarColor(normalizedHeight))

        x += barWidth + AUDIO_CONFIG.BAR_SPACING
      }
    }

    drawFrame()
  }

  return (
    <div ref={containerRef} className="size-full cursor-pointer rounded-lg backdrop-blur" onClick={onClick}>
      <canvas ref={canvasRef} className="size-full" />
    </div>
  )
}
