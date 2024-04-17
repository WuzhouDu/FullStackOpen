import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  );
};

const StatisticLine = ({text, value}) => <p>{text} {value}</p>;

const StatisticDisplay = ({ good, neutral, bad }) => {
  const avg = (good - bad) / (good + neutral + bad);
  const posRate = (good) / (good + neutral + bad);
  if (good + neutral + bad === 0) {
    return <p>No feedback given</p>;
  }

  else {
    return (
      <div>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="average" value={avg} />
        <StatisticLine text="positive " value={posRate} />
      </div>);
  }
};


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  function onHandleClickPlusOneMaker(stateVar, setFun) {
    return () => setFun(stateVar + 1);
  }

  return (
    <div>
      <Header text="give feedback" />
      <Button text="Good" handleClick={onHandleClickPlusOneMaker(good, setGood)} ></Button>
      <Button text="Neutral" handleClick={onHandleClickPlusOneMaker(neutral, setNeutral)} ></Button>
      <Button text="Bad" handleClick={onHandleClickPlusOneMaker(bad, setBad)} ></Button>

      <Header text="statistics"></Header>
      <StatisticDisplay good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App