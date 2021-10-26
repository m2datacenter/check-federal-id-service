const express = require('express')
const bodyParser = require('body-parser')
const {cpf, cnpj} = require('cpf-cnpj-validator')

const app = express()
app.use(bodyParser.json())

app.post('/check-federal-id', (req, res) => {
    const params = req.body

    const num = params.federalId.replace(/\D+/g, '')


    if (num.length == 11) {
    cpf.isValid(num) ? res.send({
        valid: 1,
        type: 'cpf',
        message: params.success}) : res.send({
            valid: 0,
            type: 'cpf',
            message: params.error})
    }

    else if (num.length == 14) {
    cnpj.isValid(num) ? res.send({
        valid: 1,
        type: 'cnpj',
        message: params.success}) : res.send({
            valid: 0,
            type: 'cnpj',
            message: params.error})
    } else {

        res.send({valid: 0, message: params.error})
    }

})


app.listen(3333, ()=> console.log('start server'))
