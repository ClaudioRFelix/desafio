const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())

app.get('/registration/:email', (req, res) => {
  const response = {
    record: {},
    status: 'OK'
  }
  try {
    let sessions = {}
    sessions = JSON.parse(fs.readFileSync('sessions.json'))
    response.record = sessions[req.params.email]
    if (!!response.record) {
      response.status = 'NO'
    }
    res.json(response)
  } catch (exception) {}
})

app.post('/registration', (req, res) => {
  record = {
    email: req.body.email,
    senha: req.body.senha,
    ind_pessoa: req.body.ind_pessoa,
    nome: req.body.nome,
    cpf: req.body.cpf,
    nascimento: req.body.nascimento,
    cnpj: req.body.cnpj,
    abertura: req.body.abertura,
    telefone: req.body.telefone
  } 
  const response = {
    record: {},
    status: 'OK'
  }
  try {
    let sessions = {}
    sessions = JSON.parse(fs.readFileSync('sessions.json'))
    if (!!sessions[req.body.email]) {
      response.status = 'NO'
    } else {
      response.record = record
      sessions[req.body.email] = record
      fs.writeFile('sessions.json', JSON.stringify(sessions, null, 2), (err)=> {})  
    }
    res.json(response)
  } catch (exception) {}    
})

app.put('/registration/:email', (req, res) => {
  record = {
    email: req.params.email,
    senha: req.body.senha,
    ind_pessoa: req.body.ind_pessoa,
    nome: req.body.nome,
    cpf: req.body.cpf,
    nascimento: req.body.nascimento,
    cnpj: req.body.cnpj,
    abertura: req.body.abertura,
    telefone: req.body.telefone
  }  
  const response = {
    record: {},
    status: 'OK'
  }
  try {
    let sessions = {}
    sessions = JSON.parse(fs.readFileSync('sessions.json'))
    if (!!sessions[req.params.email]) {
      response.record = record
      sessions[req.params.email] = record
      fs.writeFile('sessions.json', JSON.stringify(sessions, null, 2), (err)=> {})
    } else {
      response.status = 'NO'
    }
    res.json(response)
  } catch (exception) {}
})

app.delete('/registration/:email', (req, res) => {
  const response = {
    status: 'OK'
  }
  try {
    let sessions = {}
    sessions = JSON.parse(fs.readFileSync('sessions.json'))
    if (!!sessions[req.params.email]) {
      delete sessions[req.params.email]
      fs.writeFile('sessions.json', JSON.stringify(sessions, null, 2), (err)=> {})    
    } else {
      response.status = 'NO'
    }
    res.json(response)
  } catch (exception) {}
})

app.listen(port, () => console.log(`Server Desafio ${port}!`))
