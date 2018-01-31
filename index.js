const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const { hello } = require('./routes')

const PORT = process.env.PORT || 3030

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
