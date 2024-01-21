import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:4444/',
});

instance.interceptors.request.use((config) => {     //пишем функцию посредник для проверки наличия токена при любом запросе и если есть отправлять запрос
    config.headers.Authorization = window.localStorage.getItem('token');

    return config;
});

export default instance;