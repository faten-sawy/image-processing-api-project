//this is the unit test for the main API route
import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('test image processor', () => {
  // check for missing query parameters
  it('checks for missing query parameters', async () => {
    const response = await request.get('/image');
    expect(response.status).toBe(400);
  });

  // check for invalid image dimension parameters
  it('checks for invalid image dimension parameters', async () => {
    const response = await request.get('/image?f=encenadaport&w=w&h=h');
    expect(response.status).toBe(400);
  });

  // check for unknown image asset; all query parameters provided but filename could not be found in assets
  it('checks for unknown image asset', async () => {
    const response = await request.get('/image?f=unknown&w=100&h=100');
    expect(response.status).toBe(404);
  });

  // happy path - test the image API
  it('gets resized image', async () => {
    const response = await request.get('/image?f=encenadaport&w=100&h=100');
    expect(response.status).toBe(200);
  });
});
