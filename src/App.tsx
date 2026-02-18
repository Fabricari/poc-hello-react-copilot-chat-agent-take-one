import './App.css'

function App() {
  const helloText: string = 'HELLO WORLD'

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

        <text
          x="450"
          y="474"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="Impact, Haettenschweiler, 'Arial Black', sans-serif"
          fontSize="122"
          letterSpacing="3"
        >
          {helloText}
        </text>
      </svg>
    </main>
  )
}

export default App