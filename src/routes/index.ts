//this is the main API route
import express from 'express';

// create the Router object
const routes = express.Router();

// define the main API endpoint
routes.get('/image', (req, res) => {
  res.send('main API route');
});

// export the routes object
export default routes;
