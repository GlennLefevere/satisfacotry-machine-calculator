const express = require('express');
const router = express.Router();
const webpush = require('web-push');

/* GET api listing. */
router.get('/', function (req, res) {
  res.send('api works');
});

router.post('/notifications', function (req, res) {
  const subs = req.body.subscribers;

  const notificationPayload = {
    "notification": req.body.notification
  };

  Promise.all(subs.map(sub => webpush.sendNotification(sub, JSON.stringify(notificationPayload))))
    .then(() => res.status(200).json({message: 'Newsletter sent successfully.'}))
    .catch(err => {
      console.error("Error sending notification, reason: ", err);
      res.sendStatus(500);
    });
});

module.exports = router;
