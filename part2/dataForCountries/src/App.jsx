import { useState, useEffect } from "react";
import countryService from './countryService';


function App() {
  const [searchVal, setSearchVal] = useState('');
  const [countries, setCountries] = useState([]);

  const onSearchChange = (event) => {
    setSearchVal(event.target.value);
    countryService
      .fetchCountries()
      .then(res => setCountries(res.data.filter(each => each.name.official.toLowerCase().includes(searchVal.toLowerCase()))));
    return null;
  };

  useEffect(() => {
    countryService
      .fetchCountries()
      .then(res => setCountries(res.data));
  }, []);

  return (
    <div>
      <Search val={searchVal} handleChange={onSearchChange} />
      <Display countryArray={countries}/>
    </div>
  );
};

const Search = ({val, handleChange}) => {
  // console.log(handleChange);
  return (
    <p>find countries <input value={val} onChange={handleChange} /></p>
)};

const Display = (countryArray) => {
  if (countryArray.length > 10) {
    return (<p>Too many matches, speficy another filter</p>);
  }
  else if (countryArray.length > 1){
    return (
      countryArray.map(each => <p key={each.area}>{each.name.common}</p>)
    )
  }
  else if (countryArray.length==1){
    return (
      <p>{countryArray[0].name.common}</p>
    )
  }
  else return (
    <p>No match country</p>
  );
}

export default App
