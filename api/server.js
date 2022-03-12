const express = require('express');
const server = express();
const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')

server.use(express.json())
server.use(logger);
server.use("/api/actions",logger, actionsRouter);
server.use('/api/projects',logger, projectsRouter);
server.use(errorHandler);

function logger(req, res, next) {
    console.log(
      `[${new Date().toLocaleString()}] ${req.method} to ${req.url} from ${req.get(
        'Origin'
      )}`
    );
    next();
  }

server.get('/',(req, res)=> {
    res.send(`<h2>Freeze stop, middleware time! </h2>`);
});

function errorHandler(err, req, res, next) {
    res.status(err.status || 500).json({
    message: err.message,

    });
  }

module.exports = server;
