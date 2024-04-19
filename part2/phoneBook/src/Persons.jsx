const Persons = ({ persons, searchName, onDeleteHandle }) => (
    <>
        {persons.filter((person) => person.name.toLowerCase().includes(searchName.toLowerCase())).map(person => 
        <p key={person.name}>{person.name} {person.number} 
            <button onClick={() => onDeleteHandle(person)}>delete</button>
        </p>)}
    </>
)



export default Persons;