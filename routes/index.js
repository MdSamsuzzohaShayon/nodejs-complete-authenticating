const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index');
});


// router.get('/signup', (req, res, next) => {
//     res.render('signup');
// });

router.get('/signin', (req, res, next) => {
    res.render('signin');
});


router.get('/signup', (req, res, next) => {
    res.render('signup');
})



module.exports = router;