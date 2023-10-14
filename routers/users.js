const express = require("express");
const router = express.Router();
const query = require('../query/users.js'); // Mengimpor fungsi dari query.js

// Route untuk menampilkan data seluruh list users
router.get('/users', async (req, res) => {
    try {
      const users = await query.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(200).json({ error: "Gagal mengambil data pengguna." });
    }
  });

router.post('/users', async (req, res) => {
    const { id, email, gender, password, role } = req.body;  
    try {
      const result = await query.postAllUsers(id, email, gender, password, role);
      res.json({ message: "Data pengguna berhasil dimasukkan.", result });
    } catch (error) {
      res.status(200).json({ error: "Gagal memasukkan data pengguna." });
    }
  });

  router.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { email, gender, password, role } = req.body;
  
    try {
      const result = await query.putAllUsersbyid(id, email, gender, password, role);
      res.json({ message: "Data pengguna berhasil diperbarui.", result });
    } catch (error) {
      res.status(200).json({ error: "Gagal memperbarui data pengguna." });
    }
  });

  router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const rowCount = await query.deleteUsersbyid(id);
      if (rowCount === 1) {
        res.json({ message: "Data pengguna berhasil dihapus." });
      } else {
        res.status(404).json({ error: "Data pengguna tidak ditemukan." });
      }
    } catch (error) {
      res.status(200).json({ error: "Gagal menghapus data pengguna." });
    }
  });

  router.get('/users/pagination', async (req, res) => {
    try {
      const movies = await query.getPaginationUsers();
      res.json(movies);
    } catch (error) {
      res.status(200).json({ error: "Gagal mengambil data pagination film." });
    }
  });

module.exports = router;