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

const Statistics = (props) => {
  if(props.allClicks === 0) {
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return(
    <div>
    <StatisticsLine  text="good" value = {props.good}/>
    <StatisticsLine  text="neutral" value = {props.neutral}/>
    <StatisticsLine  text="bad" value = {props.bad}/>
    <StatisticsLine  text="all" value = {props.allClicks}/>
    <StatisticsLine  text="average" good = {props.good} bad = {props.bad} neutral = {props.neutral}/>
    <StatisticsLine  text="good" good = {props.good} bad = {props.bad} neutral = {props.neutral} percent = {1}/>
    </div>
  )

}

const StatisticsLine = (props) => {
  if(props.allClicks === 0) {
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  else if(props.text === "average") {
    return(
      <p>{props.text} {(props.good-props.bad)/(props.good+props.bad+props.neutral)} </p>
    )
  }
  else if(props.text === "good" && props.percent === 1){
    return(
      <p>good {(props.good)/(props.good+props.bad+props.neutral)*100} % </p>
    )
  }
  else{
  return (
  <div> 
  <p>{props.text} {props.value} </p>
  </div>
  )
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)

  const handleGood = () => {
    setGood(good+1)
    setAll(allClicks+1)
  }

  const handleNeutral = () => {
    setNeutral(neutral+1)
    setAll(allClicks+1)
  }

  const handleBad = () => {
    setBad(bad+1)
    setAll(allClicks+1)
  }

  return (
    <div>
      <h1><Header header="give feedback"></Header></h1>
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <h1><Header header="statistics"></Header></h1>
      <Statistics good={good} neutral={neutral} bad = {bad} allClicks ={allClicks}></Statistics>
    </div>
  )
}

export default App