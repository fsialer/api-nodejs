'use strict'
const express = require('express');
const artistController = require('../controllers/artist');
const userController=require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router();

//Rutas
api.get('/artists',auth, artistController.getArtists);
api.post('/artist',auth, artistController.saveArtist);
api.get('/artist/:artistId',auth, artistController.getArtist);
api.put('/artist/:artistId',auth, artistController.updateArtist);
api.delete('/artist/:artistId',auth, artistController.deleteArtist);
api.post('/signup',userController.signUp);
api.post('/signin',userController.signIn);
api.get('/private', auth,(req,res)=>{
    res.status(200).send({ message: 'tienes acceso' })
});


module.exports = api;