// Import pool dari file db.js
const pool = require("../db.js");

// Fungsi untuk mendapatkan semua data users
const getAllUsers = async () => {
	try {
		const query = "SELECT * FROM users";
		const { rows } = await pool.query(query);
		return rows;
	} catch (error) {
		console.error("Error saat mengambil data pengguna:", error);
		throw error;
	}
};

const postAllUsers = async (id, email, gender, password, role) => {
    try {
      const query = "INSERT INTO users (id, email, gender, password, role) VALUES ($1, $2, $3, $4, $5)";
      const values = [id, email, gender, password, role];
      const { rows } = await pool.query(query, values);
      return rows;
    } catch (error) {
      console.error("Error saat memasukkan data pengguna:", error);
      throw error;
    }
  };

  const putAllUsersbyid = async (id, email, gender, password, role) => {
    try {
      const query = "UPDATE users SET email = $2, gender = $3, password = $4, role = $5 WHERE id = $1";
      const values = [id, email, gender, password, role];
      const { rows } = await pool.query(query, values);
      return rows;
    } catch (error) {
      throw error;
    }
  };

  const deleteUsersbyid = async (id) => {
    try {
      const query = "DELETE FROM users WHERE id = $1";
      const values = [id];
      const { rowCount } = await pool.query(query, values);
      return rowCount; // Mengembalikan jumlah baris yang dihapus
    } catch (error) {
      throw error;
    }
  };

  const getPaginationUsers = async () => {
    try {
      const query = "SELECT * FROM users LIMIT 10";
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      console.error("Error saat mengambil data pagination user:", error);
      throw error;
    }
  };

  module.exports = {
	getAllUsers,
	postAllUsers,
    putAllUsersbyid,
    deleteUsersbyid,
    getPaginationUsers,
};
