const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
      }
    ]
  }

  return <Course course={course} />
}

const Course = ({ course }) => {
  return (
    <>
      <Header text={course.name}></Header >
      <Content contents={course.parts} />
    </>
  );
};

const Header = ({ text }) => <h1>{text}</h1>;
const Content = ({ contents }) => {
  return (
    <>
      {contents.map(content => <Part key={content.id} name={content.name} exercises={content.exercises} />)}
    </>
  )
}
const Part = ({ name, exercises }) => <p>{name} {exercises}</p>;

export default App