var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/:date?', (req, res) => {
  if (!req.params.date) {
    const currentDate = new Date();
    res.json({
      unix: currentDate.getTime(),
      utc: new Date(currentDate).toUTCString()
    });
  } else {
    const date = req.params.date;

    if (date.includes('-') || date.includes(' ')) {
      const temp = new Date(date);

      if (temp.toString() === 'Invalid Date') {
        res.json({ error: 'Invalid Date' });
      }

      res.json({ unix: temp.getTime(), utc: temp.toUTCString() });
    } else {
      const temp = new Date(+date);

      if (temp.toString() === 'Invalid Date') {
        res.json({ error: 'Invalid Date' });
      }
      res.json({ unix: temp.getTime(), utc: temp.toUTCString() });
    }
  }
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
