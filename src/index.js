const express = require('express');
const geoCode = require('./utils/geocode');
const forcast = require('./utils/forcast');
const path = require('path');
const hbs = require('hbs');
const staticPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');
const app = express();
const port = process.env.PORT || 3000;
//
//
//
//
//
//
//
//
//
app.use('/public', express.static(staticPath));
//set up handle bars
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);
// path //files

app.get('', (req, res) => {
  res.render('index', {
    name: 'Weather App',
    Author: 'Abid Hossain Mazumder',
    title: 'Home',
  });
});
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please Provide a address',
    });
  }
  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }

      forcast(latitude, longitude, (error, forcastData) => {
        if (error) {
          return res.send({
            error,
          });
        }
        res.send({
          address: req.query.address,
          location: location,
          forcastData: forcastData,
        });
      });
    }
  );
});
app.get('/products', (req, res) => {
  if (!req.query.search || !req.query.rating) {
    return res.send({
      error: 'You Must provide a search and rating term',
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});
app.get('/about', (req, res) => {
  res.render('about', {
    name: 'About Page',
    title: 'About',
  });
});
app.get('/help', (req, res) => {
  res.render('help', {
    name: 'Help Page',
    title: 'Help',
  });
});
app.get('/help/*', (req, res) => {
  res.render('404', {
    name: '404 Article Not Found',
    title: '404 Page Not Found',
  });
});
//404 page
app.get('*', (req, res) => {
  res.render('404', {
    name: 'Page Not found',
    title: '404 Page Not Found',
  });
});

app.listen(port, () => {
  console.log('server is up on port');
});
