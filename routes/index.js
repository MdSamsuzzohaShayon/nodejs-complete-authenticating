// HOME AND DASHBOARD BELONG HERE

const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.send('welcome to browser');
})


module.exports = router;