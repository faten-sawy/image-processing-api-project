# image-processing-api-project
### Image Processing API - Udacity Full Stack JavaScript Developer Nanodegree Program

This project resizes and serves up images based on specified dimensions as needed by a web application.



##### The following NPM scripts are provided:

`formatter` Runs prettier and eslint for code formatting

`build` Converts Typescript into JavaScript code

`test` Runs build and Jasmine to perform tests

`dev` Runs the application on active monitoring through nodemon

`start` Runs the application in Node



##### Usage:
To use the Image Processor API, send a request to the endpoint with the following query parameters:

**f** : The filename of the image file to process as stored under assets

**x** : The file extension of the image file to process (JPG, PNG, etc.) as stored under assets

**w** : The intended width of the image file to be returned

**h** : The intended height of the image file to be returned

###### Example - http://localhost:3000/image?f=encenadaport&x=jpeg&w=100&h=100



Once the application is running, a sample front-end page can be viewed - http://localhost:3000/ - which displays image thumbnails with varying sizes.

##### Error messages:

___400 Bad Request___:  query parameters are missing, invalid or cannot be determined

___404 Not Found___:  image file could not be found or does not exist under assets
