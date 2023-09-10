export function WinnerModal ({ winner, resetGame }) {
    if (winner === null) return null
    const winnerText = winner === false ? 'It\'s a draw' : `The winner is ${winner}`
    return (
      <section className='winner'>
        <div className='text'>
          <h2>
            {
              winnerText
            }
            </h2>

            <footer onClick={resetGame}><button>Play again</button></footer>
        </div>
      </section>
    )
  }