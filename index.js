import express from 'express';
import performance from 'performance-now';
import {Configuration, OpenAIApi} from "openai";
import dotenv from 'dotenv';
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post("/getComplexity", async (req, res) => {

    const {code} = req.body;

    const prompt = `return the time complixty value of below code ${code}`;

    const url = 'https://askgpt3.p.rapidapi.com/';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '2fa138ec46msh81f511674360ed2p11ff4cjsn5bfb059fc7bf',
            'X-RapidAPI-Host': 'askgpt3.p.rapidapi.com'
        },
        body: {
            prompt: prompt,
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
        res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: error
        })
    }
});


const port = 3001;
app.listen(port, (req, res) => {
    console.log(`Example app listening at http://localhost:${port}`);
});



