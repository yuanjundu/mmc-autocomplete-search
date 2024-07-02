const Music = require("../models/Music");

const getMusicData = async(req, res) => {
    try {
        const music = await Music.find()
        res.json(music)
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }}

const searchMusicData = async(req, res) => {
    try {
        const music = await Music.find({
            $or: [
                {name: new RegExp(query, 'i')},
                {'albums.title': new RegExp(query, 'i')},
                {'albums.songs.title': new RegExp(query, 'i')},
            ]
        }).exec();
        res.json(music)
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    getMusicData,
    searchMusicData,
}