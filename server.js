const app = require('./app');
const port = process.env.PORT || 5050;

app.listen(port, function () {
  console.log("Server is running on "+ port +" port");
});