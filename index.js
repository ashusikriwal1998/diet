const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
    apiKey: "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",
});

const openai = new OpenAIApi(config);

//setup server
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/chat", async (req,res)=>{

    const prompt = req.body.plan;
  
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0,
        max_tokens: 4000,
        top_p: 1,

    });
    res.status(200).send(response.data.choices[0]);

})

const port = 8080;
app.listen(port,()=>{
   
    console.log(`server is listening on port ${port}`);
})