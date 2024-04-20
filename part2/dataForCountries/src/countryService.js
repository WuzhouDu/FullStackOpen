import axios from 'axios';
const baseURL = "https://studies.cs.helsinki.fi/restcountries/api";

const fetchCountries = () => {
    return axios
        .get(`${baseURL}/all`)
}

export default {fetchCountries};