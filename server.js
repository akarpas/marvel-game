const app = require('./app.js');
const port = 5050;

app.listen(port, function () {
  console.log("Server is running on "+ port +" port");
});