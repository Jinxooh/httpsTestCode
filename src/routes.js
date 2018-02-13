const express = require('express');

const router = express.Router();
router.get('/', (req, res) => {
  console.log('hello1');
  res.json({ success: true });
});

router.post('/', (req, res) => {
  console.log('hello2');
  res.json({ success: false });
});

module.exports = router;
