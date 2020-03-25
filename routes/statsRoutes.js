const express = require('express');
const coronaStatsController = require('../controllers/coronaStatsController');
const router = express.Router();

router.get('/stats',coronaStatsController.getStats);

module.exports = router;