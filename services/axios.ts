import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "https://jsonplaceholder.typicode.com/";

export const getPosts = () => {
    return axios.get(`${API_URL}posts`);
};

export const updatePost = (id, data) => {
    return axios.put(`${API_URL}posts/${id}`, data);
};
