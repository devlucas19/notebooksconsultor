const express = require('express');
const app = express();
const cors = require('cors')
const routes = require('./routes')
const connectDB = require('./database')
const dotenv = require('dotenv')

dotenv.config()

const PORT = process.env.PORT;

connectDB()

app.use(express.json());
app.use(cors())
app.use(routes)

app.listen(PORT, () => {
  console.log(`Servidor rodando`);
});
