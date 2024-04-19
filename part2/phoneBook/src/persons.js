import axios from "axios";
const baseURL = "http://localhost:3001/persons";

const fetchAll = () => {
    return axios
        .get(baseURL);
}

const addNewPhoneBookElement = (newElement) => {
    return axios
        .post(baseURL, newElement);
}

export default {fetchAll, addNewPhoneBookElement};