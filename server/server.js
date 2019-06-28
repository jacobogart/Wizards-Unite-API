const app = require('./app.js');

// const port = process.env.PORT || 3000

// app.set('port', port);

app.listen(process.env.PORT || 3000, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});