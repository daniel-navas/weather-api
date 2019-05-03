const express = require('express');
const http = require('http');

const User = require('../models/user');
const Log = require('../models/log');
const { authenticate } = require('../middleware/authenticate');

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const { city, country } = req.query;
    const { userId } = req.session;
    const user = await User.findById({ _id: userId }, { email: 1, _id: 0 });
    const { email } = user;
    const time = Date.now();

    console.log(email);
    const log = new Log({ city, country, user_email: email, time });
    await log.save();

    http
      .get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&mode=json&APPID=1eb8d9b3e7a857a70bdaaf83084e3a23`,
        (resp) => {
          let data = '';

          resp.on('data', (chunk) => {
            data += chunk;
          });

          resp.on('end', () => {
            res.json({
              forecast: JSON.parse(data),
            });
          });
        }
      )
      .on('error', (err) => {
        res.status(502).json({
          error: err.message,
        });
      });
  } catch (err) {
    res.status(401).json({
      errors: [
        {
          title: 'Unauthorized',
          detail: 'Not authorized to access this route',
          errorMessage: err.message,
        },
      ],
    });
  }
});

router.get('/history', authenticate, async (req, res) => {
  try {
    const { userId } = req.session;
    const user = await User.findById({ _id: userId }, { email: 1, _id: 0 });
    const { email } = user;

    const history = await Log.find({ user_email: email });

    res.json({
      history: history,
    });
  } catch (err) {
    res.status(401).json({
      errors: [
        {
          title: 'Unauthorized',
          detail: 'Not authorized to access this route',
          errorMessage: err.message,
        },
      ],
    });
  }
});

module.exports = router;
