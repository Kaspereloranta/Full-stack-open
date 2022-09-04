const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p key={part.id}>
    {part.name} {part.exercises}
  </p>

const Content = ({ contents }) => 
  <>
    <Header name = {contents.name}></Header>
    {contents.parts.map((part,i) => <div key={i}> <Part part={part}></Part></div>)}
    <b>total of {(contents.parts.map(part => part.exercises)).reduce((acc, val)=> { return acc + val;},0)} exercises</b>  
  </>

const Courses = ({courses}) => 
<>
    {courses.map((course,i)=> <div key={i}> <Content contents={course}></Content></div>)}
</>

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      <Courses courses={courses} />
    </div>
  )
}

export default App