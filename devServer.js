const axios = require('axios');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev');

const app = express();
const compiler = webpack(config);

const host = 'http://localhost';
const port = process.env.npm_config_port ? process.env.npm_config_port : 3000;

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/teams', (req, res) => {
	axios.get('http://api.football-data.org/v1/competitions/426/teams').then(function (response) {
		return res.json(response.data.teams);
	}).catch(function (error) {
		console.log(error);
	});
});

app.get('/teams/:tid', (req, res) => {
	const { tid } = req.params;
	axios.get('http://api.football-data.org/v1/teams/' + tid + '/players').then(function (response) {
		return res.json(response.data.players);
	}).catch(function (error) {
		console.log(error);
	});
});

app.listen(port, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.info('==> Listening on port %s. Open up %s:%s/ in your browser.', port, host, port);
});
