const app = require('./app.js');

const port = process.env.PORT || 3000

app.set('port', port);

app.listen(3000, () => {
  console.log(`Express server is running on ${port}`)
})