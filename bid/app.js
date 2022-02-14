const express = require('express');
const app = express()
const port = 3001
const bet = require('./routes/bet.route')
let helmet = require('helmet')

app.use(express.json())
app.use(helmet())
// app.use(express.urlencoded({ extended: true }))
app.use('/api/v1', bet)

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})