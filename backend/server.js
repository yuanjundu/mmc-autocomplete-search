const express = require('express');
const connectMongoDB = require('./config/mongodb');
const dotenv = require('dotenv');
const cors = require('cors');
const musicRoutes = require('./routes/music-routes');

dotenv.config();

const app = express();

connectMongoDB();

app.use(cors());
app.use(express.json());

app.use('/api', musicRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})