import React, { useState } from 'react'

const randomNumber = (max) => {return Math.floor((Math.random() * max))}

const Button = ({handleClick, text}) => {
  return (<button onClick={handleClick}>{text}</button>)
}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const setToSelected = (value) => {setSelected(value)}
  const randomAnecdote = () => {setToSelected(randomNumber(anecdotes.length))}

  const incrementVote = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy)
  }

  const maxVotesIndex = () => {
    const votesCopy = [...votes]
    let max = 0
    let maxIndex = 0

    votesCopy.forEach((value, index) => {
      if (value > max) {
        max = value
        maxIndex = index
        console.log('max: ', max, 'maxIndex: ', maxIndex)
      }
    })
    return maxIndex
  }

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <p>{anecdotes[selected]}</p>
      <Button handleClick={incrementVote} text='Vote' />
      <Button handleClick={randomAnecdote} text='Next anecdote'/>

      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[maxVotesIndex()]}</p>
    </div>
  )
}

export default App