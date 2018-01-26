const express = require('express')
const zerorpc = require("zerorpc")
const bodyParser = require('body-parser')
const app = express()
const client = new zerorpc.Client()
const cors = require('cors')
const { hello } = require('./routes')

const PORT = process.env.PORT || 3030
client.connect("tcp://127.0.0.1:4242");

// app.get('/', (req, res) => res.send('Hello World!'))
app.use(cors())
   .use(bodyParser.urlencoded({ extended: true }))
   .use(bodyParser.json())
   .use(hello)
   .use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  .use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
      message: err.message,
      error: app.get('env') === 'development' ? err : {}
    })
})

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))


// let name = 'Name2'

// client.invoke("hello", name, function(error, res, more) {
//     console.log(res);
// });