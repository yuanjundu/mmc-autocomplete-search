const Music = require("../models/Music");

const searchMusicData = async(req, res) => {
    const query = req.query.q;
    console.log('Query received:', query);
    
    const regex = new RegExp(`^${query}`, 'i');

    try {
        const music = await Music.find({
            $or: [
                {name: regex},
                {'albums.title': regex},
                {'albums.songs.title': regex},
            ]
        }).exec();

        console.log('Music data fetched:', music); 

        const results = music.reduce((acc, singer) => {
            if(regex.test(singer.name)){
                acc.push({type: 'singer', value: singer.name});
            }

            singer.albums.forEach(album => {
                if(regex.test(album.title)) {
                    acc.push({type: 'album', value: album.title});
                }

                album.songs.forEach(song => {
                    if(regex.test(song.title)) {
                        acc.push({type: 'song', value: song.title});
                    }
                });
            });
            return acc;
        }, []);

        console.log("Results found:", results);

        res.json({data: results});
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    searchMusicData,
}