//this is the main API route

// Express server module
import express from 'express';

// Path module
import path from 'path';

// Image file utilities module
import {
  checkFileExists,
  insistDirectoryExists,
  resizeFile
} from '../utilities/imageFile';

// create the Router object
const routes = express.Router();

// define the image resize route
// e.g. http://localhost:3000/image?f=imageName&w=100&h=100
routes.get('/', (req, res) => {
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
      //TODO: pass the file extension as a request query parameter
      const assetResourceName =
        path.join(__dirname, '../../assets/full/') + filename + '.jpeg';
      const thumbnailDirectory = path.join(
        __dirname,
        '../../assets/thumbnail/'
      );
      const thumbnailResourceName =
        thumbnailDirectory + filename + '-' + width + 'w-' + height + 'h.jpeg';

      // check if specified file exists in assets
      checkFileExists(assetResourceName).then((assetExists) => {
        if (assetExists) {
          // check if thumbnail directory exists; create if it doesn't
          insistDirectoryExists(thumbnailDirectory);

          // resize asset image to specified dimensions and save as thumbnail
          resizeFile(
            assetResourceName,
            parseInt(width),
            parseInt(height),
            thumbnailResourceName
          ).then((outputFileName) => {
            res.status(200).sendFile(outputFileName);
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
