import React from 'react'

const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Content = (props) => {
  const [part1, part2, part3] = props.parts

  return (
    <div>
      <Part partname={part1.name} numOfExercises={part1.exercises} />
      <Part partname={part2.name} numOfExercises={part2.exercises} />
      <Part partname={part3.name} numOfExercises={part3.exercises} />
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.partname} {props.numOfExercises}</p>
  )
}

const Total = (props) => {
  const [part1, part2, part3] = props.parts

  return (
    <p> Number of exercises {part1.exercises + part2.exercises + part3.exercises} </p>
  )
}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App;