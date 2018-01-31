const router = require('express').Router()
const zerorpc = require("zerorpc")
const client = new zerorpc.Client()
client.connect("tcp://127.0.0.1:4242");


router.get('/:name', (req, res, next) => {
    const name = req.params.name
    console.log(name)
    client.invoke("bye", name, function(error, res, more) {
        console.log(res)
    });
  })


module.exports = router