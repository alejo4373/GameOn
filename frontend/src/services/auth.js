import { post } from 'axios';

export const loginUser = (credentials) =>  post('/login', credentials) 
export const signupUser = (credentials) =>  post('/signup', credentials) 

