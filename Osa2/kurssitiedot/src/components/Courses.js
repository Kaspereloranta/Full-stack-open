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

const Courses = ({courses}) => {
    return (
        <>
            {courses.map((course,i)=> <div key={i}> <Content contents={course}></Content></div>)}
        </>
    )
}

export default Courses