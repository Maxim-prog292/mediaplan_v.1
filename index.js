require("dotenv").config()
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routers = require('./routes/routes')
const path = require('path');

const PORT = process.env.PORT || 8800;

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.use('/dist', express.static('/dist'));
app.use(express.json());
app.use(cors());
app.use(cookieParser())

routers(app);

app.get(['/main', '/review/:id', '/review/edit/:id', '/add'], function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
const startServer = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Подключено к порту ${PORT}`);
    });
  } catch (error) {
    console.log(error)
  }
}
startServer()