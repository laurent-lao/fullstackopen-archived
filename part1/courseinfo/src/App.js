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
      <Header course={course} />
      <Content
        part1={parts[0].name} exercises1={parts[0].exercises}
        part2={parts[1].name} exercises2={parts[1].exercises}
        part3={parts[2].name} exercises3={parts[2].exercises}
      />
      <Total total={parts[0].exercises + parts[1].exercises + parts[2].exercises} />
    </div>
  )
}

export default App;