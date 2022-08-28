const Header = (props) => {
  return (
    <div>
      <p>
        {props.course}
      </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <p>
        {props.part1}
        {props.ex1}
        {props.part2}
        {props.ex1}
        {props.part3}
        {props.ex3}
      </p>
    </div>
  )

}
const Total = (props) => {
  return (
    <div>
      <p>
        {props.total}
        {props.ex}
      </p>
    </div>
  )
}

const App = () => {
  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14

  return (
    <div>
      <h1><Header course="Half Stack application development" /></h1>
      <p>
      <Content part1='Fundamentals of React ' ex1 ={exercises1}/>
      </p>
      <p>
      <Content part2='Using props to pass data ' ex2 = {exercises2}/>
      </p>
      <p>
      <Content part3='State of a component ' ex3 = {exercises3} />
      </p>
      <Total total="Number of exercises " ex={exercises1+exercises2+exercises3}/>
    </div>
  )
  }

export default App