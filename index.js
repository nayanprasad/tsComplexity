const express = require('express');
const performance = require('performance-now');
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  organization: "org-FFGHGaY6dYhffKNzcbGtcRoL",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);


const app = express();
app.use(express.json());




app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post("/getCode", async (req, res) => {

    const {code, language} = req.body;

    const prompt = `convert the following function to ${language} \n ${code}`;

    const parameters = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.7
    }

    const response = await openai.createChatCompletion(parameters);
    console.log(response.data);

    // fetch("https://api.openai.com/v1/chat/completions", parameters)
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    //     .catch(error => console.log(error));

    res.status(200).json({
        success: true,
        message: "Code converted successfully",
        data: response.data
    })

});


const port = 3001;
app.listen(port, (req, res) => {
  console.log(`Example app listening at http://localhost:${port}`);
});






function myFunction() {
  // code to measure performance of
  // for (let i = 0; i < 100000; i++) {
  //   console.log('Hello World!');
  // }
}

const t0 = performance();
myFunction();
const t1 = performance();
console.log(`Time taken: ${t1 - t0} milliseconds`);

