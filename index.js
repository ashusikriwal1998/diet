const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Configuration, OpenAIApi } = require("openai");
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


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
    firstname: {type: String, required: [true, 'first name required'] }, 
    lastname: {type: String, required: [true, 'there should be a Last name']}, 
    email: {type: String,unique: [true,'email already exists'], required: [true, 'email required'] }, 
    password: {type: String, required: [true, 'password should not be empty']}, 
    token: String
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
   
    const {firstname, lastname, email, password} = req.body

    if(!(firstname && lastname && email && password)){
        res.status(400).send("All fields are compulsory ");
    }

    const existingUser = await User.findOne({email});
    if(existingUser){
        res.status(401).send("User already exists with this Email");
    }else{

    const encPassword = await bcrypt.hash(password, 10);
   
    try {
       const user =  await User.create({
            firstname,
            lastname,
            email,
            password: encPassword
        });
        
        user.password = undefined;

        res.status(201).send(user);
        
     } catch (error) {
         res.status(400).send(error);
     }

    }
    
})

//Login
app.post("/login" , async(req,res)=>{
    try {
         const {email, password} = req.body;
         
         if(!(email && password)){
            res.status(400).send("email and password are required")
         } 

         const user = await User.findOne({email});
         if(!user){res.status(400).send("user not found")}

         
         if(user && (await bcrypt.compare(password, user.password))){
            const token = jwt.sign({ email: user.email }, 'shhhhh',{expiresIn: "2h"});
            user.token=token;
            user.password=undefined;

                res.status(200).send({
                    success: true,
                    token,
                    user
                });
           
         }

    } catch (error) {
        console.log(error);
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