const express = require('express');
const { getMusicData, searchMusicData } =require('../controller/music-controller');

const router = express.Router();

router.get('/musicData', getMusicData);
router.get('/searchData', searchMusicData);

module.exports = router;