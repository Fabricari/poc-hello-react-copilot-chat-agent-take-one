import { useMemo } from 'react'
import './App.css'

const FONT_FAMILY = "Impact, Haettenschweiler, 'Arial Black', sans-serif"

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
      const initialRotation = Math.random() * 20 - 10
      cursor += advance

      return [
        {
          char,
          key: `${char}-${index}`,
          x,
          initialRotation,
        },
      ]
    })
  }, [fontSize, helloText])

  return (
    <main className="hello-page" aria-labelledby="hello-world-title">
      <svg
        className="hello-logo"
        viewBox="0 0 900 800"
        role="img"
        aria-labelledby="hello-world-title"
      >
        <title id="hello-world-title">{helloText}</title>

        <polygon
          points="450,96 540,283 747,310 597,456 633,663 450,564 267,663 303,456 153,310 360,283"
          fill="#78CFA0"
        />

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
              transform={`rotate(${letter.initialRotation} ${letter.x} 0)`}
            >
              {letter.char}
            </text>
          ))}
        </g>
      </svg>
    </main>
  )
}

export default App