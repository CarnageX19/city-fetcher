const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');

dotenv.config();

app.use(cors());

const port = process.env.PORT;
const accessKey = process.env.UNSPLASH_API_KEY;


app.get('/photos',async (req,res)=>{
    const city = req.query.city || "bengaluru";

    const unsplashUrl = `https://api.unsplash.com/search/photos?query=${city}&client_id=${accessKey}&orientation=portrait&per_page=1`

    const response = await fetch(unsplashUrl);
    const result = await response.json();
    const imageUrl = result.results[0].urls.regular;
    res.send(imageUrl)
})

app.listen(port,()=>{
    console.log(`Server running at PORT: ${port}`)
})