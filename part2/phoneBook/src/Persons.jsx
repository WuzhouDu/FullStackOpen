const Persons = ({ persons, searchName }) => (
    <>
        {persons.filter((person) => person.name.toLowerCase().includes(searchName.toLowerCase())).map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </>
)

export default Persons;