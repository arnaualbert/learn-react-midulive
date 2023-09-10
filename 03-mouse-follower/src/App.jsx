import { useEffect, useState } from "react"

function App() {

  const [enabled, setEnabled] = useState(false)

  const [position, setPosition] = useState({
    x: 0,
    y: 0
  })


  useEffect(() => {

    console.log('Follow mouse')

    const handleMove = (event) => {
      const { clientX, clientY } = event
      console.log(clientX, clientY)
      setPosition({
        x: clientX,
        y: clientY
      })
    }


    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }


    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])



  return (

    <main>

      <div style={{
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: '1px solid #fff',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 50,
        height: 50,
        transform: `translate(${position.x}px,${position.y}px)`
      }}
      />

      <h3>Follow mouse</h3>

      <button onClick={() => setEnabled(!enabled)}>{enabled ? 'Disable follow mouse' : 'Enable follow mouse'}</button>

    </main>

  )
}

export default App