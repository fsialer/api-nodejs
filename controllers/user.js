'use strict'
const User = require('../models/user');
const service=require('../services');
function signUp(req,res){
    let user=new User({
        email:req.body.email,
        password:req.body.password
    });

    user.save((err)=>{
        if(err) res.status(500).send({message:`Error al crear usuario:${err}`})
        return res.status(201).send({token:service.createToken(user)})
    })
}

function signIn(req,res){
    User.find({email:req.body.email},(err,user)=>{
        if(err) return res.status(500).send({message:err});
        if(!user) return res.status(404).send({message:'No existe el usuario'});

        req.user=user;
        res.status(200).send(
            {message:'Te haz logeado correctamente', 
            token:service.createToken(user)
        })       
    })
}

module.exports = {
    signUp,
    signIn
}
