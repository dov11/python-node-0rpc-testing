const express = require('express')
const zerorpc = require("zerorpc");
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))


const client = new zerorpc.Client();
let name = 'Name2'
client.connect("tcp://127.0.0.1:4242");

client.invoke("hello", name, function(error, res, more) {
    console.log(res);
});