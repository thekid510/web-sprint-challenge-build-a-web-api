// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model')
const { checkId, checkProject } = require('./projects-middleware')

const router = express.Router()

router.get("/", (req, res, next)=> {
    Projects.get()
        .then((proj)=> {
            res.status(200).json(proj)
        })
        .catch(err => {
            next(err)
        });
});

router.get("/:id", checkId, (req, res)=> {
    res.status(200).json(req.project)
})

router.post('/', checkProject, (req, res, next)=> {
    Projects.insert(req.body)
        .then(proj =>{
            res.status(201).json(proj)
        })
        .catch(next)
});

router.put("/:id", checkId, checkProject, (req, res, next)=> {
    Projects.update(req.params.id, req.body)
       .then(()=>{
           if(req.body.completed === undefined){
               res.status(400).json({ message: "fields missing"});

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
    const removedProject = await Projects.get(req.params.id);
    Projects.remove(req.params.id)
        .then(()=> {
            res.status(200).json(removedProject);
        })
        .catch(next);
});

router.get("/:id/actions", checkId, (req, res, next)=> {
    Projects.getProjectActions(req.params.id)
        .then((action)=> {
            res.status(200).json(action)
        })
        .catch(next)
});

  
module.exports = router;
