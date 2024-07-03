const express = require('express');
const { searchMusicData } = require('../controller/music-controller');

const router = express.Router();

router.get('/searchData', searchMusicData);

module.exports = router;