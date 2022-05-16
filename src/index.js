const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const session = require('express-session')
const flash = require('express-flash')

const pool = require('./database')
//Enrutadores
const rutasUsers = require('./routes/users')
const rutasProducts = require('./routes/products')

const app = express();

app.use(cors())
app.use(morgan("dev"));
app.use(express.json());
app.use(session({ secret: 'token-muy-secreto', resave: true, saveUninitialized: true }));
app.use(flash())
app.use(express.static('public'))

// routes
app.use('/products', rutasProducts);
app.use('/users', rutasUsers);


app.get('/', (req, res) => {
  res.send("Bienvenido al Servidor")
})

app.post('/procesar_inicio', async (req, res) => {
  const { email, password } = req.body;
  const consulta = `
      SELECT *
      FROM usuario
      WHERE
      email = $1 AND
      password = $2
    `
  const response = await pool.query(consulta, [email, password]);
  const usuario = response.rows[0]
  console.log(usuario)
  if(usuario){
    req.session.usuario = usuario
  }
})


app.listen(9000, function(){
  console.log("Servidor iniciado port 9000");
})

