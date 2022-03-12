// add middlewares here related to actions
const Action = require('./actions-model')

async function checkId(req, res, next){
    try {
        const validAction = await Action.get(req.params.id);
         if(validAction){
             req.action = validAction
             next();
         } else{
             next({ status:404, message: "action not found!"})
         }
    } catch (err) {
        next(err)
    }
}

function checkAction (req, res, next){
    if(!req.body.name || !req.body.description || !req.body.notes){
        res.status(400).json({ message: "Please fill all required fields"})
    } else{
        next()
    }
}
module.exports ={
    checkId,
    checkAction
}