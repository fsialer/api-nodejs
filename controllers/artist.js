'use strict'

const Artist = require('../models/artist');

function getArtist(req, res) {
    let artistId = req.params.artistId;

    Artist.findById(artistId, (err, artist) => {
        if (err) return res.status(500).send({ message: `Error al realizar la peticion:${err}` })
        if (!artist) return res.status(404).send({ message: `El artista no existe` })
        res.status(200).send({ artist })
    })
}

function getArtists(req, res) {
    Artist.find({}, (err, artists) => {
        if (err) return res.status(500).send({ message: `Error al relizar la peticion: ${artists}` })
        if (!artists) return res.status(404).send({ message: `No existen artistas` })
        res.send(200, { artists });
    });

}

function saveArtist(req, res) {
    console.log("Post /api/artist");
    console.log(req.body);
    let artist = new Artist();
    artist.name = req.body.name;
    artist.date = req.body.date;
    artist.bio = req.body.bio;
    artist.avatar = req.body.avatar;
    artist.state = req.body.state;

    artist.save((err, artistStored) => {
        if (err) res.status(500).send({ message: `Error al salvar en la base de datos:${err}` })
        res.status(200).send({ artist: artistStored });
    });

}

function updateArtist(req, res) {
    let artistId = req.params.artistId;
    let update = req.body;
    Artist.findByIdAndUpdate(artistId, update, (err, artistUpdate) => {
        if (err) res.status(500).send({ message: `Error al actualizar el artista:${err}` })
        res.status(200).send({ artist: artistUpdate })
    })
}

function deleteArtist(req, res) {
    let artistId = req.params.artistId;
    Artist.findByIdAndRemove(artistId,(err,artist)=>{
         if (err) res.status(500).send({ message: `Error al borrar el artista: ${err}` })
         res.status(200).send({ message: 'El artista ha sido eliminado' });
    });
    /*Artist.findById(artistId, (err, artist) => {
        if (err) res.status(500).send({ message: `Error al borrar el artista: ${err}` })
        console.log(artist);
        artist.remove((err) => {
            if (err) res.status(500).send({ message: `Error al borrar el artista: ${err}` })
            res.status(200).send({ message: 'El artista ha sido eliminado' });
        })
    })*/
}

module.exports = {
    getArtist,
    getArtists,
    saveArtist,
    updateArtist,
    deleteArtist
}
