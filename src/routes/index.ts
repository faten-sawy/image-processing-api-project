//this is the main API route

// Express server module
import express from 'express';

// Path module
import path from 'path';

// Image file utilities module
import { checkFileExists, readFileContents } from '../utilities/imageFile';

// create the Router object
const routes = express.Router();

// define the main API endpoint
routes.get('/', (req, res) => {
  res.status(200).send('main API route');
});

// define the image resize route
// e.g. http://localhost:3000/api/image?f=imageName&w=100&h=100
routes.get('/image', (req, res) => {
  const filename = req.query.f as string;
  const width = req.query.w as string;
  const height = req.query.h as string;

  // check for valid request query parameters
  // if any one of these are not provided, image processor cannot proceed
  if (filename === undefined || width === undefined || height === undefined) {
    // invalid request query parameters
    res.status(400).send('Missing request query parameters');
  } else {
    // check for valid width and height values
    const w = parseInt(width) as number;
    const h = parseInt(height) as number;
    if (isNaN(w) || isNaN(h)) {
      res.status(400).send('Invalid request query parameters');
    } else {
      const assetsDir = path.join(__dirname, '../../assets/full/');
      const thumbsDir = path.join(__dirname, '../../assets/thumbnail/');

      //TODO: pass the file extension as a request query parameter
      const assetFileName = assetsDir + filename + '.jpeg';

      // check if specified file exists in assets
      checkFileExists(assetFileName).then((assetExists) => {
        if (assetExists) {
          // check if thumbnail already exists for given filename and dimensions
          const thumbnailFileName =
            thumbsDir + filename + '-' + width + 'w-' + height + 'h.jpeg';
          console.log('thumbnailFileName=' + thumbnailFileName);
          checkFileExists(thumbnailFileName).then((thumbnailExists) => {
            if (thumbnailExists) {
              // TODO: return existing thumbnail

              res.status(200).send('TODO:  return existing thumbnail');
            } else {
              // open asset image file contents

              // TODO: use Sharp module to resize asset image to specified dimensions and save as thumbnail

              // TODO: return saved thumbnail
              res.status(200).sendFile(assetFileName);
            }
          });
        } else {
          // unknown filename resource
          res.status(404).send('Cannot find the requested resource');
        }
      });
    }
  }
});

// export the routes object
export default routes;
