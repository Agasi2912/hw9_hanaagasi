



// Import pool dari file db.js
const pool = require("../db.js");


// Fungsi untuk mendapatkan semua data movies
const getAllMovies = async () => {
	try {
		const query = "SELECT * FROM movies";
		const { rows } = await pool.query(query);
		return rows;
	} catch (error) {
		console.error("Error saat mengambil data movie:", error);
		throw error;
	}
};

const postAllMovies = async (id, title, genres, year) => {
    try {
      const query = "INSERT INTO movies (id, title, genres, year) VALUES ($1, $2, $3, $4)";
      const values = [id, title, genres, year];
      const { rows } = await pool.query(query, values);
      return rows;
    } catch (error) {
      console.error("Error saat memasukkan data film:", error);
      throw error;
    }
  };

  const putAllMoviesbyid = async (id, title, genres, year) => {
    try {
      const query = "UPDATE movies SET title = $2, genres = $3, year = $4 WHERE id = $1";
      const values = [id, title, genres, year];
      const { rows } = await pool.query(query, values);
      return rows;
    } catch (error) {
      throw error;
    }
  };

  const deleteMoviesbyid = async (id) => {
    try {
      const query = "DELETE FROM movies WHERE id = $1";
      const values = [id];
      const { rowCount } = await pool.query(query, values);
      return rowCount; // Mengembalikan jumlah baris yang dihapus
    } catch (error) {
      throw error;
    }
  };


  
  const getPaginationMovies = async () => {
    try {
      const query = "SELECT * FROM movies LIMIT 10";
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      console.error("Error saat mengambil data pagination movie:", error);
      throw error;
    }
  };

  
  

module.exports = {
	getAllMovies,
	postAllMovies,
    putAllMoviesbyid,
    deleteMoviesbyid,
    getPaginationMovies,
    
};