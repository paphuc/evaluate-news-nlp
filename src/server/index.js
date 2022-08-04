var path = require('path')
const express = require('express')
const FormData = require('form-data');
const fetch = require("node-fetch");
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv');
dotenv.config();
const apiKey = process.env.API_KEY;
const baseURL = 'https://api.meaningcloud.com/lang-4.0/identification';
const cors = require('cors');

const app = express()
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
    formData.append('txt', data.message);
    formData.append('key', apiKey);
    const response = await fetch(url, {
        method: 'POST',
        body: formData, // body data type must match "Content-Type" header        
    });
    try {
        const newData = await response.json();
        return newData
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}
app.get('/test', async function(req, res) {
    let response = await postData(baseURL, {
        "message": req.query.message,
    })
    res.send({"message":response["language_list"][0].name})
})