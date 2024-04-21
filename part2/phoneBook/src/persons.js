import axios from "axios";
const baseURL = "/api/persons";

const fetchAll = () => {
    return axios
        .get(baseURL);
}

const addNewPhoneBookElement = (newElement) => {
    return axios
        .post(baseURL, newElement);
}

const deletePhoneBookElement = (id) => {
    return axios
            .delete(`${baseURL}/${id}`);
}

const updateCurrentPhone = (id, updatedElement) => {
    return axios
            .put(`${baseURL}/${id}`, updatedElement);
}

export default {fetchAll, addNewPhoneBookElement, deletePhoneBookElement, updateCurrentPhone};