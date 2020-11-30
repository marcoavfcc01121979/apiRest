const express = require('express');

const server = express();

server.use(express.json())

const cursos = ['Node JS', 'JavaScript', 'React Native']

// middlewares global
server.use((req, res, next) => {
  console.log(`Url chamada: ${req.url}`)
  return next()
})

const checkCurso = (req, res, next) => {
  if(!req.body.name) {
    return res.status(400).json({ error: 'Nome do curso é obrigatorio.' })
  }
  return next()
}

const checkId = (req, res, next) => {
  if(!cursos[req.params.index]) {
    return res.status(400).json({ error: 'Este curso não existe!' })
  }
  return next()
}

server.get('/curso', (req, res) => {
  return res.json(cursos)
})

server.get('/curso/:index', checkId ,(req, res) => {
  const { index } = req.params

  return res.json(cursos[index])
})

server.post('/curso', checkCurso, (req, res) => {
  const name = req.body;
  cursos.push(name)

  return res.status(201).json(cursos)
})

server.put('/curso/:index', checkCurso,(req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  cursos[index] = name;

  return res.json(cursos)
})

server.delete('/curso/:index', (req, res) => {
  const { index } = req.params;

  cursos.splice(index, 1);
  return res.json(cursos);
})

/*server.get('/curso', (req, res) => {
  const nome = req.query.nome;

  return res.json({ curso: `hello world! ${nome}` })
})*/

server.listen(3000, () => {
  console.log('Servidor rodando');
})