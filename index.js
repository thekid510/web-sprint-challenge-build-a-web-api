/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, please read the README word for word, don't worry, you got this
in every task there may be trouble, but if you worry you make it double, don't worry, you got this
r server into this file and start it!
*/

require('dotenv').config()
const express = require('express')
const server = require('./api/server')

server.use(express.json());

const port = process.env.PORT || 9000;

server.listen(port, ()=> {
    console.log(`Server listening on `, port)
})

