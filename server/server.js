const express = require ("express")
const mongoose = require("mongoose")
require('dotenv').config; // pour mettre les variables d'environnemet

const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json()) 

const  mongoAtlasUri = "mongodb+srv://nour:crud123@cluster0.cv5mh.mongodb.net/todoDBretryWrites=true&w=majority"
mongoose.connect(mongoAtlasUri,({ useNewUrlParser: true, useUnifiedTopology: true, useUnifiedTopology: true  }))
    .then( console.log(" Mongoose is connected"))
    .catch(err => console.log(err))

const todoSchema = new mongoose.Schema({
    title: String,
    complete: {
        type: Boolean,
        default: false
    }
})
const todo = mongoose.model("todo", todoSchema)
app.get("/todos", (req,res) => {
    todo.find().then(todo => res.json(todo))
})
app.post("/todos", (req,res) => {
    const nweTodo = new todo({
        title:req.body.title
    })
    nweTodo.save().then(todo=>res.json(todo))
})
app.listen(PORT, ()=>{
    console.log(`server is connected at port : ${PORT}`)
}
)