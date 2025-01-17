import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://apipedidos.appjvs.com.br/api',
    auth: {
        username: "wesley@gmail.com",
        password: "123456",
    },
});
