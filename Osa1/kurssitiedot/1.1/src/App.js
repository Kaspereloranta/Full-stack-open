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
          <Part part={props.parts[0].name + ": "} ex={props.parts[0].exercises}/>
          <Part part={props.parts[1].name + ": "} ex={props.parts[1].exercises}/>
          <Part part={props.parts[2].name + ": "} ex={props.parts[2].exercises}/>
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
        {"Number of exercises: "}
        {props.parts[0].exercises+props.parts[1].exercises+props.parts[2].exercises}
      </p>
    </div>
  )
}

const App = () => {
  
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <h1><Header name={course} /></h1>
      <p>
      <Content parts={parts}/>
      </p>
      <Total parts={parts}/>
    </div>
  )
  }

export default App