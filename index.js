const express = require('express');
const performance = require('performance-now');
const { Configuration, OpenAIApi } = require("openai");
const dotenv = require('dotenv');

dotenv.config();


const configuration = new Configuration({
  organization: "org-FFGHGaY6dYhffKNzcbGtcRoL",
  apiKey: process.env.OPENAI_API_KEY ,
});
const openai = new OpenAIApi(configuration);


const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post("/getCode", async (req, res) => {

    const {code, language} = req.body;

    const prompt = `convert the following function  ${language} code into javascript \n ${code}`;

    const parameters = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.7
    }

    // const response = await openai.createChatCompletion(parameters);
    // console.log(response.data);

    const t0 = performance();
    // myFunction();
    const t1 = performance();
    const time = t1 - t0;
    console.log(`Time taken: ${t1 - t0} milliseconds`);


    res.status(200).json({
        success: true,
        time: time,
    })

});


const port = 3001;
app.listen(port, (req, res) => {
  console.log(`Example app listening at http://localhost:${port}`);
});



