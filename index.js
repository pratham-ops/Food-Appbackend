var express = require('express');
var app = express();
var mongo = require('./Db/conn.js');
mongo();
var port = process.env.PORT || 3000;
const path = require('path');


app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});



app.use(express.json());
app.use('/api', require('./Routes/CreateUser.js'));
app.use('/api', require('./Routes/Login.js'));
// app.use('/api', require('./Routes/GetData.js'));

// app.use(express.static(path.join(__dirname, '../build')));
// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, '../build/index.html'));
// });



app.get('/', function (req, res) {
  res.send('Hello World! Im Backend');
});


app.listen(port, function () {
  console.log(`Example app listening on port ${port} !`);
});
