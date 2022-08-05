var path = require('path')
const express = require('express')
const FormData = require('form-data');
const fetch = require("node-fetch");
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv');
dotenv.config();
const apiKey = process.env.API_KEY;
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1';
const cors = require('cors');

const app = express()

const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function(req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('dist/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function() {
    console.log('Example app listening on port 8080!')
})

const postData = async(url = '', data = {}) => {
    let formData = new FormData();
    formData.append('of', "json");
    formData.append('lang', "en");
    formData.append('key', apiKey);
    formData.append('url', data.url);
    const response = await fetch(url, {
        method: 'POST',
        body:  formData, // body data type must match "Content-Type" header        
    });
    try {
        const newData = await response.json();
        return newData
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

app.post('/sentiment',  async function(req, res) {
    let response = await postData(baseURL, {
        "url": req.body.url,
    })
    console.log(response)

    res.send({
        "subjectivity":response["subjectivity"],
        "irony": response["irony"]
    })
})