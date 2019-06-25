//Install express server
const express = require('express');
const path = require('path');

const app = express();

app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    if (req.headers.host === 'your-app.herokuapp.com')
      return res.redirect(301, 'https://online-food-api.herokuapp.com/');
    if (req.headers['x-forwarded-proto'] !== 'https')
      return res.redirect('https://' + req.headers.host + req.url);
    else
      return next();
  } else
    return next();
});

app.use(express.static(__dirname + '/dist/online-food'));

app.get('/*', function (req, res) {

  res.sendFile(path.join(__dirname + '/dist/online-food/index.html'));
});

app.listen(process.env.PORT || 8080);