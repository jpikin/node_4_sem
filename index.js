const express = require('express');
const joi = require('joi');
const fs = require('fs');
const app = express();
const users = [];
const filePath = './static/data.json'
let ID = 0;

const userSchema = joi.object({
    name: joi.string().min(2).required(),
    age: joi.number().min(0).max(101).required()
});

app.use(express.json());

app.get('/users', (req, res)=>{
    const data = fs.readFileSync(filePath, 'utf8')
    const parsedData = JSON.parse(data);
    
    res.send(parsedData);    
}); 

 app.get('/users/:id', (req, res)=>{
    const userID = +req.params.id;
const parsedData = getJSON();
    const user = parsedData.find(user => user.id === userID);
    
    user ? res.send({user}) : res.status(404).send({user : null});
    
});

app.post('/users', (req, res)=>{
    const result = userSchema.validate(req.body);
    if (result.error) {return res.status(404).send({error: result.error.details})}
    let user = {
        id : ID++,
        ...req.body
    }
    const parseData = getJSON();
    parseData.push(user);
    const updatedData = JSON.stringify(parseData, null, 2);
    fs.writeFileSync(filePath, updatedData, 'utf-8');
    res.send(user);
});

app.put('/users/:id', (req, res)=>{
    const result = userSchema.validate(req.body);
    if (result.error) {return res.status(404).send({error: result.error.details})}
    const userID = +req.params.id;
    const user = users.find(user => user.id === userID);
    if(user){
        const {name, age} = req.body;
        user.name = name,
        user.age = age
        res.send({user})
    } else {
        res.status(404).send({user : null});
    }
});


app.delete('/users/:id', (req, res)=>{
    const userID = +req.params.id;
    const user = users.find(user => user.id === userID);
    
    if(user){
        const userIndex = users.indexOf(user);
        users.splice(userIndex, 1);
        res.send({user})
    } else {
        res.status(404).send({user : null});
    }
});
app.listen(3000);

function getJSON(){
    const data = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(data);
    
}