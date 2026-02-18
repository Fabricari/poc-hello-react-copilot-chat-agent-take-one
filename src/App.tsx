import { type CSSProperties, useEffect, useMemo, useState } from 'react'
import './App.css'

const FONT_FAMILY = "Impact, Haettenschweiler, 'Arial Black', sans-serif"
const WOBBLE_DURATION_BASE_SECONDS = 0.5
const WOBBLE_DURATION_VARIANCE_SECONDS = 0.2

function measureCharWidth(char: string, fontSize: number): number {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  if (!context) {
    return fontSize * 0.6
  }

  context.font = `${fontSize}px ${FONT_FAMILY}`

  return context.measureText(char).width
}

function App() {
  const helloText: string = 'HELLO WORLD'
  const fontSize = 122
  const letterGap = 4
  const maxRotation = 10
  const wobbleRange = 20
  const [isPressed, setIsPressed] = useState(false)
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  useEffect(() => {
    if (!isPressed) {
      return
    }

    const handlePointerUp = () => {
      setIsPressed(false)
      setIsVideoOpen(true)
    }

    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointercancel', handlePointerUp)

    return () => {
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointercancel', handlePointerUp)
    }
  }, [isPressed])

  useEffect(() => {
    if (!isVideoOpen) {
      return
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsVideoOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isVideoOpen])

  const letters = useMemo(() => {
    const chars = Array.from(helloText)
    const advances = chars.map((char) => measureCharWidth(char, fontSize) + letterGap)
    const totalWidth = advances.reduce((width, advance) => width + advance, 0)

    let cursor = -totalWidth / 2

    return chars.flatMap((char, index) => {
      const advance = advances[index]

      if (char === ' ') {
        cursor += advance
        return []
      }

      const x = cursor + advance / 2
      const initialRotation = Math.random() * (maxRotation * 2) - maxRotation
      const minRotation = Math.max(-maxRotation, initialRotation - wobbleRange)
      const maxLetterRotation = Math.min(maxRotation, initialRotation + wobbleRange)
      const wobbleDuration =
        WOBBLE_DURATION_BASE_SECONDS + Math.random() * WOBBLE_DURATION_VARIANCE_SECONDS
      const wobbleDelay = -Math.random() * wobbleDuration
      cursor += advance

      return [
        {
          char,
          key: `${char}-${index}`,
          x,
          minRotation,
          maxRotation: maxLetterRotation,
          wobbleDuration,
          wobbleDelay,
        },
      ]
    })
  }, [fontSize, helloText])

  return (
    <main className="hello-page" aria-labelledby="hello-world-title">
      <svg
        className={`hello-logo${isPressed ? ' is-pressed' : ''}`}
        viewBox="0 0 900 800"
        role="img"
        aria-labelledby="hello-world-title"
      >
        <title id="hello-world-title">{helloText}</title>

        <g className="hello-star-shell">
          <polygon
            className="hello-star"
            points="450,96 540,283 747,310 597,456 633,663 450,564 267,663 303,456 153,310 360,283"
            fill="#78CFA0"
          />
        </g>

        <g transform="translate(450 474)">
          {letters.map((letter) => (
            <text
              key={letter.key}
              className="hello-letter"
              x={letter.x}
              y="0"
              textAnchor="middle"
              fill="#FFFFFF"
              fontFamily={FONT_FAMILY}
              fontSize={fontSize}
              style={
                {
                  '--rot-min': `${letter.minRotation}deg`,
                  '--rot-max': `${letter.maxRotation}deg`,
                  animationDuration: `${letter.wobbleDuration}s`,
                  animationDelay: `${letter.wobbleDelay}s`,
                } as CSSProperties
              }
            >
              {letter.char}
            </text>
          ))}
        </g>

        <rect
          className="hello-lockup-hitarea"
          x="120"
          y="80"
          width="660"
          height="600"
          onPointerDown={() => setIsPressed(true)}
        />
      </svg>

      {isVideoOpen ? (
        <div
          className="video-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="YouTube video"
          onClick={() => setIsVideoOpen(false)}
        >
          <div className="video-modal-content" onClick={(event) => event.stopPropagation()}>
            <button
              className="video-modal-close"
              type="button"
              aria-label="Close video"
              onClick={() => setIsVideoOpen(false)}
            >
              ×
            </button>

            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/mHONNcZbwDY?si=JHS5_THr9NwfH5ac"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      ) : null}
    </main>
  )
}

export default App