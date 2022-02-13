const express = require('express');
const app = express()
const port = 3001

const bid = require('./routes/bid.route')

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use('/bid', bidRoute)
app.use('/bid', bid)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})