import React, { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({stats}) => {

  if ((stats.good + stats.neutral + stats.bad) > 0)
    return (
      <table>
        <tbody>
          <Statistic name='good' value={stats.good}/>
          <Statistic name='neutral' value={stats.neutral}/>
          <Statistic name='bad' value={stats.bad}/>
          <Statistic name='average' value={stats.average}/>
          <Statistic name='positive' value={stats.positive} />
        </tbody>
      </table>
    )
  else
    return (
      <div>
        No feedback given
      </div>
    )
}

const Statistic = ({name, value}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = value => setGood(value)
  const setToNeutral = value => setNeutral(value)
  const setToBad = value => setBad(value)

  const reset = () => {
    setToGood(0)
    setToNeutral(0)
    setToBad(0)
  }

  const addToGood = () => setToGood(good + 1)
  const addToNeutral = () => setToNeutral(neutral + 1)
  const addToBad = () => setToBad(bad + 1)

  const average = () => {return((good - bad)/(good + neutral + bad))}
  const positive = () => {return((good/(good + neutral + bad)*100) + " %")}

  const stats = {
    good: good,
    neutral: neutral,
    bad: bad,
    average: average(),
    positive: positive()
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={addToGood} text='good'/>
      <Button handleClick={addToNeutral} text='neutral' />
      <Button handleClick={addToBad} text='bad' />
      
      <h1>statistics</h1>
      <Statistics stats={stats} />
      <Button handleClick={reset} text='reset' />
    </div>
  )
}

export default App
