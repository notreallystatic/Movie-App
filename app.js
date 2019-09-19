// Working with APIs
// A simple webpage to search for movies by name, using the Open Movie Database API(http://omdbapi.com/)

const request = require('request');
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
	res.render('search');
});

app.get('/results', (req, res) => {	
	var query = req.query.search;
	var url = "http://www.omdbapi.com/?apikey=thewdb&s=" + query;
	request(url, (error, response, body) => {	
		if (!error && response.statusCode == 200) {
			
			// The given body is in string format, so you need to change it into an object to manipulate it further.
			const data = JSON.parse(body);
			res.render('results', {data: data});
		}
	})
});

app.listen('3000', () => {
	console.log("Movie app has started!");
})