const express = require('express')
const routes = express.Router()
const Equipamento = require('./models/Equipamento');
const Usuario = require('./models/Admin')

routes.get('/equipamentos', async (req,res) =>{
    try {
        const equipamentos = await Equipamento.find();  
        res.status(200).json(equipamentos);  
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
})

routes.post('/equipamento', async (req, res) => {
  const { os, codigo } = req.body; // Agora os dados vêm no corpo da requisição
  try {
    const equipamento = await Equipamento.findOne({ os, codigo });
    if (equipamento) {
      res.json(equipamento);
    } else {
      res.status(404).json({ message: 'Equipamento não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
});



routes.post('/login', async (req, res) => {
  const { usuario, senha } = req.body;

  try {
    const usuarioEncontrado = await Usuario.findOne({ usuario, senha });

    if (usuarioEncontrado) {
      res.status(200).json({ success: true, message: 'Login bem-sucedido', usuario: usuarioEncontrado });
    } else {
      res.status(401).json({ success: false, message: 'Usuário ou senha incorretos' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
});


routes.post('/adicionar', async (req,res)=>{
    try {
        const novoEquipamento = new Equipamento(req.body);
        await novoEquipamento.save();
        res.status(201).json(novoEquipamento);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
})

routes.put('/equipamentos/:id', async (req, res) => {
  const { id } = req.params;
  const { os, codigo, situacao } = req.body;

  try {
    const equipamento = await Equipamento.findByIdAndUpdate(
      id,
      { os, codigo, situacao },
      { new: true } // Retorna o equipamento atualizado
    );

    if (!equipamento) {
      return res.status(404).json({ message: 'Equipamento não encontrado' });
    }

    return res.status(200).json(equipamento); // Retorna o equipamento atualizado
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao atualizar o equipamento' });
  }
});

// Backend - Rota de exclusão
routes.delete('/equipamentos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const equipamento = await Equipamento.findByIdAndDelete(id);

    if (!equipamento) {
      return res.status(404).json({ message: 'Equipamento não encontrado' });
    }

    return res.status(200).json({ message: 'Equipamento excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir o equipamento:', error);
    return res.status(500).json({ message: 'Erro ao excluir o equipamento', error: error.message });
  }
});



module.exports = routes