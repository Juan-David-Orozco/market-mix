const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const session = require('express-session')
const flash = require('express-flash')

//Enrutadores
const rutasUsers = require('./routes/users')
const rutasProducts = require('./routes/products')

const app = express();

app.use(cors())
app.use(morgan("dev"));
app.use(express.json());
app.use(session({ secret: 'token-muy-secreto', resave: true, saveUninitialized: true }));
app.use(flash())

// routes
app.use('/products', rutasProducts);
app.use('/users', rutasUsers);

/*
app.get('/', (req, res) => {
  res.send("Bienvenido al Servidor")
})
*/

app.listen(9000, function(){
  console.log("Servidor iniciado port 9000");
})

