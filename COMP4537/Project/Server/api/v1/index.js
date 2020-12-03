import express from 'express';

const router = express.Router();

router.get('/', (req, res) => res
  .send({
    message: 'Hello, welcome to the covid-flight tracking api. To make proper API calls, you will need an API token. Please request one.'
  }));

export default router;