import React from 'react'

const Header = ({course}) => {
  return <h1>{course}</h1>
}

const Course = ({course}) => {

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  ) 
}

const Content = ({parts}) => {
  return (
    <div>
     {
       parts.map(part => <Part key={part.id} partname={part.name} numOfExercises={part.exercises} />)
     } 
    </div>
  )
}

const Part = ({partname, numOfExercises}) => {
  return (
    <p>{partname} : {numOfExercises}</p>
  )
}

const TotalTemp = ({parts}) => {
  let total = 0
  parts.map(part => total += part.exercises)
  
  return (
    <p> Number of exercises {total} </p>
  )
}

const Total = ({parts}) => {
  const sumCallback = (acc, part) => acc + part.exercises
  const total = parts.reduce(sumCallback, 0)
  
  return (
    <p> Number of exercises {total} </p>
  )
  
}

export default Course;