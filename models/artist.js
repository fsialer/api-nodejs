'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = Schema({
    name: String,
    date: Date,
    bio: String,
    avatar: String,
    state: { type: Boolean, default: true }

});

module.exports = mongoose.model('Artist', ArtistSchema);