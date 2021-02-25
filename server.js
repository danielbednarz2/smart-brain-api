import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import handleRegister from './controllers/Register.js';
import handleSignIn from './controllers/SignIn.js';
import handleProfile from './controllers/Profile.js';
import { handleImage, handleApiCall } from './controllers/Image.js';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 

const postgres = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    }
})

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Hello'))

app.post('/signin', (req, res) => { handleSignIn(req, res, postgres, bcrypt)})

app.post('/register', (req, res) => { handleRegister(req, res, postgres, bcrypt)})

app.get('/profile/:id', (req, res) => { handleProfile(req, res, postgres)})

app.put('/image', (req, res) => { handleImage(req, res, postgres)})    

app.post('/imageurl', (req, res) => { handleApiCall(req, res)})

app.listen(PORT || 3000, () => console.log(`App is running on port ${PORT}`))