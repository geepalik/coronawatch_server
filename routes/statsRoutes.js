const express = require('express');
const coronaStatsController = require('../controllers/coronaStatsController');
const router = express.Router();

router.get('/stats', coronaStatsController.getStats);

//default
router.get('*', coronaStatsController.notFound);
router.get('/', coronaStatsController.notFound);

module.exports = router;