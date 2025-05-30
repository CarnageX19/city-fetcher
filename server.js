const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');

dotenv.config();

const frontendUrl = process.env.WHITELIST;
app.use(cors({
    origin:frontendUrl
}));

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin !== frontendUrl) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
});

const port = process.env.PORT;
const accessKey = process.env.UNSPLASH_API_KEY;

app.get('/photos',async (req,res)=>{
    const city = req.query.city || "bengaluru";

    console.log(`Recieved image query for ${city}`)

    const unsplashUrl = `https://api.unsplash.com/search/photos?query=${city}&client_id=${accessKey}&orientation=portrait&per_page=1`
    const response = await fetch(unsplashUrl);
    const result = await response.json();
    const imageUrl = result.results[0].urls.regular;
    res.send(imageUrl)
})

app.listen(port,()=>{
    console.log(`Server running at PORT: ${port}`)
})