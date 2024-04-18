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
      {courses.map((eachCourse) => <Course key={eachCourse.id} course={eachCourse} />)}
    </div>
  )
}

const Course = ({ course }) => {
  const sumVal = course.parts.reduce((prev, cur) => {
    return prev + cur.exercises;
  }, 0);
  return (
    <>
      <Header text={course.name}></Header >
      <Content contents={course.parts} />
      <Sum value={sumVal} />
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

const Sum = ({ value }) => <strong>total of {value} exercises</strong>;

export default App