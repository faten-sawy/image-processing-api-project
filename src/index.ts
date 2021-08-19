//this is the Express server entry point

//import Express framework
import express from 'express';

//import the routes object
import routes from './routes/index';

//import the logger middleware
import logger from './utilities/logger';

//create the application object
const app = express();

//set a port
const port = 3000;

//add an API entry point, apply the router and logger as middleware
app.use('/image', logger, routes);

//listen to port and output message to console
app.listen(port, () => {
  console.log('Server started at localhost:' + port);
});

export default app;
