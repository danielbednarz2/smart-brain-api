import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import handleRegister from './controllers/Register.js';
import handleSignIn from './controllers/SignIn.js';
import handleProfile from './controllers/Profile.js';
import { handleImage, handleApiCall } from './controllers/Image.js';

const postgres = knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        database: 'smart_brain',
        user: 'Daniel Walker',
        password: ' '
    }
})

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello')
})

app.post('/signin', (req, res) => { handleSignIn(req, res, postgres, bcrypt)})

app.post('/register', (req, res) => { handleRegister(req, res, postgres, bcrypt)})

app.get('/profile/:id', (req, res) => { handleProfile(req, res, postgres)})

app.put('/image', (req, res) => { handleImage(req, res, postgres)})    

app.post('/imageurl', (req, res) => { handleApiCall(req, res)})

app.listen(PORT, () => console.log(`App is running on port ${PORT}`))