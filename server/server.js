const app = require('./app.js');

app.set('port', 3000);

app.listen(3000, () => {
  console.log('Express server is running on localhost:3000')
})