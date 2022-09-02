import { useState } from 'react'


const Header = (props) => {
  return (
    <div>
      <p>
        {props.header}
      </p>
    </div>
  )
}


const Button = (props) => { 
  const { handleClick, text } = props

  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(7))

  const getRandomInt = (max) => Math.floor(Math.random()*max)

  const handleClick = () => {
    setSelected(getRandomInt(7))
  }

  const handleVote = () => {
    const pointsCopy = [...points]
    pointsCopy[selected] += 1
    setPoints(pointsCopy)
  }


  return (
    <div>
      <h1><Header header="Anecdote of the day"></Header></h1>
      <p> {anecdotes[selected]}  </p>
      <p> 
      <Button handleClick={handleVote} text="vote"/>
      <Button handleClick={handleClick} text="next anecdote" /> </p>
      <h1><Header header="Anecdote with most votes"></Header></h1>
      <p>{anecdotes[points.indexOf(Math.max(...points))]}</p>
    </div>
  )
}

export default App