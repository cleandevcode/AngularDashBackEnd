const request = require("supertest");
const server = require("../server");

const db = require("../config/dbConfig.js");

const id = '8703da24-9f2e-4150-9501-7d7c4800391c';
const testId = 'cb2e97c3-91a0-4f74-891a-17f47c406d93';
const timeDiff = 480*60*1000;

describe("movies endpoints", () => {
  beforeAll(async () => {
    await db.migrate.latest();
    await db.seed.run();
  });
  
  afterAll(async () => {
    await db.raw(`TRUNCATE TABLE movies RESTART IDENTITY CASCADE`);
  });

  it("should return 200", async () => {
    return request(server)
      .get("/api/movies")
      .expect(200)
      .expect(function(res) {
        const data = res.body;
        expect(data.length).toBe(3);
      });
  });

  it("should return 200", async () => {
    const movie = await db('movies').select().where({ id }).first();

    return request(server)
      .get(`/api/movies/${id}`)
      .expect(200)
      .expect(function(res) {
        const data = res.body;
        expect(typeof data).toBe("object");
        expect(data.id).toBe(id);
        expect(data.name).toBe(movie.name);
        expect(data.description).toBe(movie.description);
        expect(data.genre).toBe(movie.genre);
        expect(new Date(data.releaseDate)).toStrictEqual(movie.releaseDate);
        expect(data.duration).toBe(movie.duration);
        expect(data.rating).toBe(movie.rating);
      });
  });

  it("shoud return 404", async () => {
    return request(server)
      .get(`/api/movies/${testId}`)
      .expect(404);
  });

  it('should add new movie successfully', async () => {
    const releaseDate = new Date('2021-03-04');
    const newMovie = {
      name: 'Movie 4',
      description: 'Movie 4 Description',
      releaseDate,
      genre: 'cb2e97c3-91a0-4f74-891a-17f47c406d93',
      duration: 1200,
      rating: 5.0
    };

    const oldMovies = await db('movies');

    const res = await request(server)
      .post('/api/movies')
      .send(newMovie);

    expect(res.status).toBe(201);
    
    const data = res.body;
    expect(data.name).toBe(newMovie.name);
    expect(data.description).toBe(newMovie.description);
    expect(data.genre).toBe(newMovie.genre);
    expect(Number(data.duration)).toBe(newMovie.duration);
    expect(data.rating).toBe(newMovie.rating);
    expect(releaseDate.getTime() - new Date(data.releaseDate).getTime()).toBe(timeDiff);
    const newMovies = await db('movies');
    expect(newMovies.length).toBe(oldMovies.length + 1);
  });

  it('Should return 404', async () => {
    return request(server)
      .post('/api/movies')
      .send()
      .expect(404);
  });

  it('Should update successfully', async () => {
    const newData = { name: 'Comedy' };

    const oldMovie = await db('movies').select().where({ id }).first();

    const res = await request(server)
      .put(`/api/movies/${id}`)
      .send(newData);

    expect(res.status).toBe(200);
    
    const newGenre = res.body;
    expect(newGenre.name).toBe(newData.name);
    expect(newGenre.id).toBe(id);
    expect(newGenre.description).toBe(oldMovie.description);
    expect(newGenre.genre).toBe(oldMovie.genre);
    expect(new Date(newGenre.releaseDate)).toStrictEqual(oldMovie.releaseDate);
    expect(newGenre.duration).toBe(oldMovie.duration);
    expect(newGenre.rating).toBe(oldMovie.rating);
  });

  it('Should return 404', async () => {
    const newData = { name: 'Comedy' };

    const res = await request(server)
      .put(`/api/movies/${testId}`)
      .send(newData)
      .expect(404);
  });

  it('Should return 404', async () => {

    const res = await request(server)
      .put(`/api/movies/${id}`)
      .send()
      .expect(404);
  });

  it('Should delete successfully', async () => {
    const oldMovie = await db('movies').select().where({ id }).first();
    const oldMovies = await db('movies');

    const res = await request(server)
      .delete(`/api/movies/${id}`);
    
    expect(res.status).toBe(200);
    
    const data = res.body;
    expect(data.id).toBe(id);
    expect(data.name).toBe(oldMovie.name);
    expect(data.description).toBe(oldMovie.description);
    expect(data.genre).toBe(oldMovie.genre);
    expect(new Date(data.releaseDate)).toStrictEqual(oldMovie.releaseDate);
    expect(data.duration).toBe(oldMovie.duration);
    expect(data.rating).toBe(oldMovie.rating);

    const newMovies = await db('movies');
    expect(newMovies.length).toBe(oldMovies.length - 1);

  });

  it('Should return 404', async () => {
    const id = '5c22251d-3f74-4ced-bf72-16631ca805c4';

    return request(server)
      .delete(`/api/movies/${id}`)
      .expect(404);
  });
});