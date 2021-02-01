const express = require('express');
const router = express();
const Story = require('../models/Story');
// MIDDLEWARE WILL BE ADDED IN SECOND AGRUEMENT OF A ROUTE 
const { ensureAuth } = require('../middleware/auth');

console.log("Storis");
router.get('/add', ensureAuth, (req, res, next) => {
    res.render('stories/add');
});



router.post('/add', ensureAuth, async (req, res, next) => {
    try {
        req.body.user = req.user.id;
        await Story.create(req.body);
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});




module.exports = router;