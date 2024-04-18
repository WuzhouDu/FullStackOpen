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

export default Course;