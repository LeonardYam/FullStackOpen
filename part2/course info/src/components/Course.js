const Header = ({name}) => <h2>{name}</h2>

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part => <Part key={part.name} part={part}/>)}
    </div>
  )
}

const Total = ({parts}) => 
<p>
  <b>total of {parts.reduce((x, y) => x + y.exercises, 0)} exercises</b>
</p>

const Course = ({course}) => {
  const {name, parts} = course
  return (
  <div>
    <Header name={name} />
    <Content parts={parts} />
    <Total parts={parts} />
  </div>
  )
}

export default Course