const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
    apiKey: "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",
});

const openai = new OpenAIApi(config);


//db section

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://ashusikriwal:y3r9mMNgumUYToZr@cluster0.fafvkzj.mongodb.net/diet_planner?retryWrites=true&w=majority');
  console.log("database connected");
}

//Schema
const userSchema = new Schema({
    username: {type: String,unique: [true,'username already exists'], required: [true, 'username required'] }, 
    password: {type: String, required: [true, 'password should not be empty']}, 
    name: {type: String, required: [true, 'there should be a name']}, 
  });

  const User = mongoose.model('User', userSchema);

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
// Get
app.get("/users" , async(req,res)=>{
   const user = await User.find();
    res.status(200).send(user);
})

app.get("/users/:id" , async(req,res)=>{
    const id = req.params.id;
    const user = await User.findById(id).exec();
    res.send(user);
})

// Create
app.post("/users" , async(req,res)=>{
    const user = new User(req.body);
    try {
       await user.save();
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
})

//Update
app.patch("/users/:id" , async(req,res)=>{
    const id = req.params.id;
    try {
        const user = await User.findOneAndUpdate({_id:id},req.body, {new:true});
        res.status(200).send(user);

    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
   
})

//Delete
app.delete("/users/:id" , async(req,res)=>{
    const id = req.params.id;
    const user = await User.findByIdAndRemove(id);
    res.status(200).send(user);
})


const port = process.env.PORT || 8069;
app.listen(port,()=>{
   
    console.log(`server is listening on port ${port}`);
}) 