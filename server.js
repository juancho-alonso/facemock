var express = require('express');
var app = express();

app.use(express.static("./dist/facemock"));
app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: "./dist/facemock/"}
  );
  });
  app.listen(process.env.PORT || 8080);
