const express = require("express");
const { ensureAuthantication } = require("../middleware/Auth");


const router = express.Router();

router.get('/', ensureAuthantication, (req, res) => {
    res.status(200).json(
        [
            {
                name: "mobile",
                price: 10000
            },
            {
                name: "tv",
                price: 100000
            }
        ]
    )
})

module.exports = router;