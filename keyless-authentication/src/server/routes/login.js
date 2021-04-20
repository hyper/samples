const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const { ipcRenderer } = require('electron');

const router = express.Router();

// GET /callback
router.get('/callback', (req, res) => {
	res.json({ success: true });
	ipcRenderer.send('login-success', req.query);
});

module.exports = router;
