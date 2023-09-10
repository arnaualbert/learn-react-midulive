import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './components/Square'
import { TURNS } from './constants'
import { checkWinnerFrom } from './logic/board'
import './App.css'
import { WinnerModal } from './components/WinnerModal'


function App() {

  // const [board, setBoard] = useState(Array(9).fill(null))

  const [board, setBoard] = useState(() => {
    const boardFromStorage = JSON.parse(window.localStorage.getItem('board')) 
    ? JSON.parse(window.localStorage.getItem('board')) 
    : Array(9).fill(null)
    return boardFromStorage
  })

  // const [turn, setTurn] = useState(TURNS.X)
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = JSON.parse(window.localStorage.getItem('turn')) 
    return turnFromStorage ?? TURNS.X
  })


  const [winner, setWinner] = useState(null) // null is no winner, false is draw


  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
  }

  const updateBoard = (index) => {
    // if the square is already filled don't update
    if (board[index] || winner) return

    // update the board with the current turn if it's not filled
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // change the turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // save the board
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if(checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset game</button>
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

     <WinnerModal winner={winner} resetGame={resetGame}/>
    </main>
    )
}

export default App
