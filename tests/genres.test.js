const request = require("supertest");
const server = require("../server");

const db = require("../config/dbConfig.js");

describe("genres endpoints", () => {
  beforeAll(async () => {
    await db.migrate.latest();
    await db.seed.run();
  });
  
  afterAll(async () => {
    await db.raw(`TRUNCATE TABLE genres RESTART IDENTITY CASCADE`);
  });

  it("should return 200", async () => {
    return request(server)
      .get("/api/genres")
      .expect(200)
      .expect(function(res) {
        const data = res.body;
        expect(data.length).toBe(3);
      });
  });

  it("should return 200", async () => {
    const id = '976f9eb9-7784-43f0-9ea9-caa9a5779119';
    const genre = await db('genres').select().where({ id }).first();

    return request(server)
      .get(`/api/genres/${id}`)
      .expect(200)
      .expect(function(res) {
        const data = res.body;
        expect(typeof data).toBe("object");
        expect(data.id).toBe(id);
        expect(data.name).toBe(genre.name);
        expect(data.description).toBe(genre.description);
      });
  });

  it("shoud return 404", async () => {
    const id = '5c22251d-3f74-4ced-bf72-16631ca805c4';

    return request(server)
      .get(`/api/genres/${id}`)
      .expect(404);
  });

  it('should add new genre successfully', async () => {
    const newGenre = {
      name: 'Comedy',
      description: 'Description for Comedy Genre'
    };
    const oldGenres = await db('genres');

    const res = await request(server)
      .post('/api/genres')
      .send(newGenre);

    expect(res.status).toBe(201);
    
    const data = res.body;
    expect(data.name).toBe(newGenre.name);
    expect(data.description).toBe(newGenre.description);
    
    const newGenres = await db('genres');
    expect(newGenres.length).toBe(oldGenres.length + 1);
  });

  it('Should return 404', async () => {
    return request(server)
      .post('/api/genres')
      .send()
      .expect(404);
  });

  it('Should return 404', async () => {
    return request(server)
      .post('/api/genres')
      .send()
      .expect(404);
  });

  it('Should update successfully', async () => {
    const id = '976f9eb9-7784-43f0-9ea9-caa9a5779119';
    const newData = { name: 'Comedy' };

    const oldGenre = await db('genres').select().where({ id }).first();

    const res = await request(server)
      .put(`/api/genres/${id}`)
      .send(newData);

    expect(res.status).toBe(200);
    
    const newGenre = res.body;
    expect(newGenre.name).toBe(newData.name);
    expect(newGenre.id).toBe(id);
    expect(newGenre.description).toBe(oldGenre.description);
  });

  it('Should return 404', async () => {
    const id = '5c22251d-3f74-4ced-bf72-16631ca805c4';
    const newData = { name: 'Comedy' };

    const res = await request(server)
      .put(`/api/genres/${id}`)
      .send(newData)
      .expect(404);
  });

  it('Should return 404', async () => {
    const id = '976f9eb9-7784-43f0-9ea9-caa9a5779119';

    const res = await request(server)
      .put(`/api/genres/${id}`)
      .send()
      .expect(404);
  });

  it('Should delete successfully', async () => {
    const id = '976f9eb9-7784-43f0-9ea9-caa9a5779119';
    const oldGenre = await db('genres').select().where({ id }).first();
    const oldGenres = await db('genres');

    const res = await request(server)
      .delete(`/api/genres/${id}`);
    
    expect(res.status).toBe(200);
    
    const data = res.body;
    expect(data.id).toBe(id);
    expect(data.name).toBe(oldGenre.name);
    expect(data.description).toBe(oldGenre.description);

    const newGenres = await db('genres');
    expect(newGenres.length).toBe(oldGenres.length - 1);

  });

  it('Should return 404', async () => {
    const id = '5c22251d-3f74-4ced-bf72-16631ca805c4';

    return request(server)
      .delete(`/api/genres/${id}`)
      .expect(404);
  })

})