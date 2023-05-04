const express = require('express');
const performance = require('performance-now');
const {Configuration, OpenAIApi} = require("openai");
const dotenv = require('dotenv');

dotenv.config();


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post("/getCode", async (req, res) => {

    const {code} = req.body;

    const prompt = `only give the time complexity of below function  ${code}`;

    const parameters = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.7
    }

    const response = await openai.createChatCompletion(parameters)
        .then((response) => {
                res.status(200).json({
                    success: true,
                    data: response.data

                })
            }
        ).catch((err) => {
                res.status(200).json({
                    success: false,
                    message: err.message
                })
            }
        );
});


const port = 3001;
app.listen(port, (req, res) => {
    console.log(`Example app listening at http://localhost:${port}`);
});



