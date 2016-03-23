"use strict";

const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;

//use app directory for static files
app.use(express.static(path.join(__dirname, '/app')));

// default route
app.get("/",() => {
  res.sendFile(path.resolve('app/index.html'));
});

app.listen(PORT,() => {
  console.log(`Listening on port ${PORT}`);
});
