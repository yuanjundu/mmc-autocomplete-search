const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SongSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    length: {
        type: String,
        required: true,
    },   
});

const AlbumSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    songs: [SongSchema],
    description: {
        type: String,
    }
});

const SingerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    albums: [AlbumSchema],
}, {collection: 'search-data'});

const Music = mongoose.model('Music', SingerSchema);

module.exports = Music;
