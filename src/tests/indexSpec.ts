//this is the unit test for the main API route
import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('test image processor', () => {
  // test the main API endpoint
  it('gets main API endpoint', async () => {
    const response = await request.get('/api/image');
    expect(response.status).toBe(200);
  });
});
