const Header = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        {props.name}
      </p>
    </div>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <p>
          <Part part={props.part1} ex={props.ex1}/>
          <Part part={props.part2} ex={props.ex2}/>
          <Part part={props.part3} ex={props.ex3}/>
      </p>
    </div>
  )

}
const Part = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        {props.part}
        {props.ex}
      </p>
    </div>
  )

}
const Total = (props) => {
  console.log(props)
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
  
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  
  return (
    <div>
      <h1><Header name={course} /></h1>
      <p>
      <Content part1={part1.name + ": "} ex1 ={part1.exercises} />
      </p>
      <p>
      <Content part2={part2.name + ": "} ex2 ={part2.exercises} />
      </p>
      <p>
      <Content part3={part3.name + ": "} ex3 ={part3.exercises} />
      </p>
      <Total total="Number of exercises: " ex={part1.exercises+part2.exercises+part3.exercises}/>
    </div>
  )
  }

export default App