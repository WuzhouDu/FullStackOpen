import { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons.jsx'
import personService from './persons.js'
import Notification from './Notification.jsx';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [message, setMessage] = useState('');
  const [red, setRed] = useState(false);
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchName, setSearchName] = useState('')


  const handleTypingName = (e) => {
    setNewName(e.target.value);
  }

  const handleTypingPhone = (e) => {
    setNewPhone(e.target.value);
  }

  const handleAddName = (event) => {
    event.preventDefault();
    const newElement = { name: newName, number: newPhone };
    const existedElement = persons.find(each => each.name === newName);
    if (!existedElement) {
      personService
        .addNewPhoneBookElement(newElement)
        .then(res => {
          console.log(res);
          setNewName('');
          setNewPhone('');
          setPersons([...persons, res.data]);
          setTimeout(() => {
            setMessage(`add new person ${newElement.name}`);
            setRed(false);
          }, 1000);
        });
    }
    else if (window.confirm(`${newName} is already added, replace the older one with the new one?`)) {
      personService
        .updateCurrentPhone(existedElement.id, newElement)
        .then(res => {
          setPersons(persons.map(each => each.id != existedElement.id ? each : res.data));
          setTimeout(() => {
            setMessage(`update person ${newElement.name}`);
            setRed(false);
          }, 1000);
          setNewName('');
          setNewPhone('');
        })
        .catch(err => {
          setMessage(`ERROR: person ${newElement.name} is deleted from the server`);
          setRed(true);
          setPersons(persons.filter(each => each.id != existedElement.id));
        });
    }
  }

  const handleSearchChange = (e) => {
    setSearchName(e.target.value);
  }

  const onDeletePersonHandle = (deletedPerson) => {
    // console.log(`delete id ${id}`);
    if (window.confirm(`Delete ${deletedPerson.name} ?`)) {
      personService
        .deletePhoneBookElement(deletedPerson.id)
        .then(res => {
          console.log(res);
          setPersons(persons.filter(each => each.id !== deletedPerson.id));
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    // console.log("in useEffect");
    personService
      .fetchAll()
      .then(res => {
        // console.log("promise fulfilled");
        setPersons(res.data);
      })
  }, []);


  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} red={red} />
      <Filter searchName={searchName} handleChange={handleSearchChange} />

      <h2>add a new</h2>

      <PersonForm handleAddName={handleAddName} handleTypingPhone={handleTypingPhone} handleTypingName={handleTypingName} newName={newName} newPhone={newPhone} />

      <h2>Numbers</h2>

      <Persons persons={persons} searchName={searchName} onDeleteHandle={onDeletePersonHandle} />
    </div>
  )
}

function areTheseObjectsEqual(first, second) {
  "use strict";

  // If the value of either variable is empty
  // we can instantly compare them and check
  // for equality.
  if (
    first === null ||
    first === undefined ||
    second === null ||
    second === undefined
  ) {
    return first === second;
  }

  // If neither are empty, we can check if
  // their constructors are equal. Because
  // constructors are objects, if they are
  // equal, we know the objects are of the
  // same type (though not necessarily of
  // the same value).
  if (first.constructor !== second.constructor) {
    return false;
  }

  // If we reach this point, we know both
  // objects are of the same type so all
  // we need to do is check what type one
  // of the objects is, and then compare
  // them
  if (first instanceof Function || first instanceof RegExp) {
    return first === second;
  }

  // Throught back to the equlity check
  // we started with. Just incase we are
  // comparing simple objects.
  if (first === second || first.valueOf() === second.valueOf()) {
    return true;
  }

  // If the value of check we saw above
  // failed and the objects are Dates,
  // we know they are not Dates because
  // Dates would have equal valueOf()
  // values.
  if (first instanceof Date) return false;

  // If the objects are arrays, we know
  // they are not equal if their lengths
  // are not the same.
  if (Array.isArray(first) && first.length !== second.length) {
    return false;
  }

  // If we have gotten to this point, we
  // need to just make sure that we are
  // working with objects so that we can
  // do a recursive check of the keys and
  // values.
  if (!(first instanceof Object) || !(second instanceof Object)) {
    return false;
  }

  // We now need to do a recursive check
  // on all children of the object to
  // make sure they are deeply equal
  const firstKeys = Object.keys(first);

  // Here we just make sure that all the
  // object keys on this level of the
  // object are the same.
  const allKeysExist = Object.keys(second).every(
    i => firstKeys.indexOf(i) !== -1
  );

  // Finally, we pass all the values of our
  // of each object into this function to
  // make sure everything matches
  const allKeyValuesMatch = firstKeys.every(i =>
    areTheseObjectsEqual(first[i], second[i])
  );

  return allKeysExist && allKeyValuesMatch;
}

export default App