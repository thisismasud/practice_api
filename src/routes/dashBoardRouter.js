//This is the route for dashboard

const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello I am in dashboard!')
})

module.exports = router;