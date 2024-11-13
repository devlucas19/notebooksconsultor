// models/Equipamento.js
const mongoose = require('mongoose');

const equipamentoSchema = new mongoose.Schema({
  os: { type: String, required: true },
  codigo: { type: String, required: true },
  situacao: { type: String, required: true },
});

const Equipamento = mongoose.model('Equipamento', equipamentoSchema);

module.exports = Equipamento;
