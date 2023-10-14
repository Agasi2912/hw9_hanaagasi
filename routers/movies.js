/**
 * @swagger
 * tags:
 *    name: Movies
 *    description: The movies managing API
 * /api/movies:
 *   post:
 *      summary: Create a new movie
 *      tags: [Movies]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/movies'
 *      responses:
 *        200:
 *          description: The created movie.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/movies'
 *        500:
 *          description: Some server error
 * /api/movies/{id}:
 *   get:
 *      summary: Get the movie by id
 *      tags: [Movies]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The movie by id
 *      responses:
 *        200:
 *          description: The movie created by id
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/movies'
 *        404:
 *          description: The movie was not found
 *   put:
 *      summary: Update the movie by id
 *      tags: [Movies]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The movie by id
 *      requestBody:
 *          required: true
 *          content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/movies'
 *      responses:
 *        200:
 *          description: The movie was updated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/movies'
 *        404:
 *          description: The movie was not found
 *        505:
 *          description: Some error happened
 *   delete:
 *      summary: Remove the movie by id
 *      tags: [Movies]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The movie by id
 * 
 *      responses:
 *        200:
 *          description: The movie created by id
 *        404:
 *          description: The movie was not found
*/

const express = require("express");
const router = express.Router();

const query = require('../query/movies.js'); // Mengimpor fungsi dari query.js
// Route untuk menampilkan data seluruh list movies
router.get('/movies', async (req, res) => {
    try {
      const movies = await query.getAllMovies();
      res.json(movies);
    } catch (error) {
      res.status(200).json({ error: "Gagal mengambil data film." });
    }
  });

router.post('/movies', async (req, res) => {
    const { id, title, genres, year } = req.body;  
    try {
      const result = await query.postAllMovies(id, title, genres, year);
      res.json({ message: "Data movies berhasil dimasukkan.", result });
    } catch (error) {
      res.status(200).json({ error: "Gagal memasukkan data movies." });
    }
  });

  router.put('/movies/:id', async (req, res) => {
    const { id } = req.params;
    const { title, genres, year } = req.body;
  
    try {
      const result = await query.putAllMoviesbyid(id, title, genres, year);
      res.json({ message: "Data film berhasil diperbarui.", result });
    } catch (error) {
      res.status(200).json({ error: "Gagal memperbarui data film." });
    }
  });

  router.delete('/movies/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const rowCount = await query.deleteMoviesbyid(id);
      if (rowCount === 1) {
        res.json({ message: "Data film berhasil dihapus." });
      } else {
        res.status(404).json({ error: "Data film tidak ditemukan." });
      }
    } catch (error) {
      res.status(200).json({ error: "Gagal menghapus data film." });
    }
  });

// Menangani permintaan GET untuk mendapatkan data film dengan paginasi
router.get('/movies/pagination', async (req, res) => {
  try {
    const movies = await query.getPaginationMovies();
    res.json(movies);
  } catch (error) {
    res.status(200).json({ error: "Gagal mengambil data pagination film." });
  }
});


module.exports = router;