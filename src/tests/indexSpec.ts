//this is the unit test for the main API route
import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('test image processor', () => {
  it('checks front-end page', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });

  // check for missing query parameters
  it('checks for missing query parameters', async () => {
    const response = await request.get('/image');
    expect(response.status).toBe(400);
  });

  // check for invalid image dimension parameters
  it('checks for invalid image dimension parameters', async () => {
    const response = await request.get('/image?f=encenadaport&x=jpeg&w=w&h=h');
    expect(response.status).toBe(400);
  });

  // check for unknown image asset; all query parameters provided but filename could not be found in assets
  it('checks for unknown image asset', async () => {
    const response = await request.get('/image?f=unknown&x=PNG&w=100&h=100');
    expect(response.status).toBe(404);
  });

  // happy path - test the image API
  it('gets resized image', async () => {
    const response = await request.get(
      '/image?f=encenadaport&x=jpeg&w=100&h=100'
    );
    expect(response.status).toBe(200);
  });

  it('gets resized image with specified image format', async () => {
    const response = await request.get('/image?f=fjord&x=JPEG&w=1000&h=1000');
    expect(response.status).toBe(200);
  });
});
