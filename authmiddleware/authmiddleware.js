const express = require("express");
const router = express.Router();

//Router middleware
const jwt = require('jsonwebtoken');


router.get('/login', (req,res) => {
    const token = jwt.sign(
        {
          username: 'agasi',
          password: 'admin'
        },
        `koderahasiayangsangatrahasia`,
        {expiresIn: '1h'}
      );
      res.json({
        token: token,
      });
    });
  
  router.get('/verify/:token', (req,res) => {
    const data = jwt.verify(
        req.params.token,
        `koderahasiayangsangatrahasia`
      );
      res.json({
        data: data,
      });
    });
    
  


module.exports = router;