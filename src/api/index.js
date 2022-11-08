import axios from 'axios';
import { PROFILE_KEY } from '../constants/local';
import baseURL from '../constants/url';

const API = axios.create({ baseURL })


API.interceptors.request.use((req) => {
    if (localStorage.getItem(PROFILE_KEY)) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem(PROFILE_KEY))["token"]}`;
    }
    return req;
})
const prefix = '/api';


export const fetchPosts = (page) => API.get(`${prefix}/posts?page=${page}`);
export const fetchPost = (id) => API.get(`${prefix}/posts/${id}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`${prefix}/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post(`${prefix}/posts`, newPost);
export const likePost = (id) => API.patch(`${prefix}/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`${prefix}/posts/${id}/commentPost`, { value });
export const updatePost = (id, postData) => API.patch(`${prefix}/posts/${id}`, postData);
export const deletePost = (id) => API.delete(`${prefix}/posts/${id}`);

//user actions
export const signin = (formData) => API.post(`${prefix}/user/signin`, formData);
export const changePassword = (formData) => API.post(`${prefix}/user/changePassword`, formData);
export const getRanking = (username) => API.post(`${prefix}/user/getRanking`, { username });

export const addView = () => API.get(`${prefix}/views/addView`);
export const getViews = () => API.get(`${prefix}/views/viewCount`);

