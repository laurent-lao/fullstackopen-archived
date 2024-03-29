import React from 'react'

const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Content = (props) => {
  return (
    <div>
      <Part partname={props.part1} numOfExercises={props.exercises1} />
      <Part partname={props.part2} numOfExercises={props.exercises2} />
      <Part partname={props.part3} numOfExercises={props.exercises3} />
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.partname} {props.numOfExercises}</p>
  )
}

const Total = (props) => {
  return (
    <p> Number of exercises {props.total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1} exercises1={exercises1}
        part2={part2} exercises2={exercises2}
        part3={part3} exercises3={exercises3}
      />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App;