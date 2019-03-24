import { post } from 'axios';

export const loginUser = (credentials) =>  post('/login', credentials) 

