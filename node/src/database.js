const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config()

// URL de conexão com o MongoDB 
const MONGO_URL = process.env.MONGO_URL

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
