const express = require('express');
const coronaStatsController = require('../controllers/coronaStatsController');
const router = express.Router();
const cors = require('../middleware/cors');

router.get('/stats',cors, coronaStatsController.getStats);

//default
router.get('*',cors, coronaStatsController.notFound);
router.get('/',cors, coronaStatsController.notFound);

module.exports = router;