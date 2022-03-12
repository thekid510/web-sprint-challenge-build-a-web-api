// Write your "actions" router here!
const express = require("express")
const Actions = require("./actions-model")
const { checkId, checkAction }= require('./actions-middlware')

const router = express.Router()

router.get("/", (req, res, next)=> {
    Actions.get()
        .then((action)=>{
            res.status(200).json(action)
        })
        .catch(err =>{
            next(err)
        })
});

router.get("/:id", checkId, (req, res)=> {
    res.status(200).json(req.action)
});

router.post("/", checkAction,(req, res,next)=> {
    Actions.insert(req.body)
        .then((action)=>{
            res.status(201).json(action)
        })
        .catch(next)
});

router.put("/:id", checkId, checkAction, (req, res, next)=> {
    Actions.update(req.params.id, req.body)
     .then(()=> {
         if(req.body === undefined){
             res.status(400).json({ message: "missing body"})
         } else{
             res.status(200).json({
                 id: req.params.id,
                 ...req.body,
             });
         }
     })
     .catch(next)
});

router.delete("/:id", checkId, async (req, res, next)=> {
    const removeAction = await Actions.get(req.params.id);
        Actions.remove(req.params.id)
            .then(()=> {
                res.status(200).json(removeAction)
            })
            .catch(next)
});

module.exports = router;