const express = require('express');

const app = express();

const users = [];

let ID = 0;

app.use(express.json());

app.get('/users', (req, res)=>{
    res.send({users});
});

 app.get('/users/:id', (req, res)=>{
    const userID = +req.params.id;
    const user = users.find(user => user.id === userID);
    
    user ? res.send({user}) : res.status(404).send({user : null});
    
});

app.post('/users', (req, res)=>{
    let user = {
        id : ID++,
        ...req.body
    }
    users.push(user);
    res.send({user});

});

app.put('/users/:id', (req, res)=>{
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