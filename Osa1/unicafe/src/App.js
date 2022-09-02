import { useState } from 'react'

const Header = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        {props.header}
      </p>
    </div>
  )
}

const Display = ({ counter }) => <div>{counter}</div>

const Button = (props) => { 
  console.log(props)
  const { handleClick, text } = props
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good+1)
  }

  const handleNeutral = () => {
    setNeutral(neutral+1)
  }

  const handleBad = () => {
    setBad(bad+1)
  }


  return (
    <div>
      <h1><Header header="give feedback"></Header></h1>
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <h1><Header header="statistics"></Header></h1>
      <p>good {good} </p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

export default App