import { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]);

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
    // if (persons.every((person) => !areTheseObjectsEqual(person, { name: newName }))) {
    //   setPersons(persons.concat({ name: newName, number: newPhone }));
    // }
    // else {
    //   window.alert(`${newName} is already added to phonebook`);
    // }

    // setNewName('');
    // setNewPhone('');
    const newElement = {name: newName, number: newPhone};
    axios
      .post("http://localhost:3001/persons", newElement)
      .then(res => {
        console.log(res);
        setNewName('');
        setPersons([...persons, res.data]);
      });
  }

  const handleSearchChange = (e) => {
    setSearchName(e.target.value);
  }

  useEffect(() => {
    // console.log("in useEffect");
    axios
      .get("http://localhost:3001/persons")
      .then(res => {
        // console.log("promise fulfilled");
        setPersons(res.data);
      })
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter searchName={searchName} handleChange={handleSearchChange} />

      <h2>add a new</h2>

      <PersonForm handleAddName={handleAddName} handleTypingPhone={handleTypingPhone} handleTypingName={handleTypingName} newName={newName} newPhone={newPhone} />

      <h2>Numbers</h2>

      <Persons persons={persons} searchName={searchName}/>
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