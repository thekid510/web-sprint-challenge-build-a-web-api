// add middlewares here related to projects
const Projects = require('./projects-model')

async function checkId(req, res, next){
    try {
        const validProject = await Projects.get(req.params.id);
        if(validProject){
            req.project = validProject
            next()
        } else{
            next({ status:404, message:"Project was not found"});
        }
    } catch (err) {
        next(err)
    }
}

function checkProject(req, res, next){
    if (!req.body.name || !req.body.description) {
        res.status(400).json({ message:"all text fields required"});
    } else {
        next()
    }
}

module.exports = {
    checkId,
    checkProject
}