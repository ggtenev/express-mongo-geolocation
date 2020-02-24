const express = require('express')
const router = express.Router()
const Ninja = require('../models/ninja')

//GET A LIST OF NINJAS
router.get('/ninjas', (req,res) => {
    Ninja.geoNear(
        {type:'Point', coordinates:[parseFloat(req.query.lng), parseFloat(req.query.lat)]},
        {maxDistance:100000, spherical:true}
    ).then((talents) => {
       res.send(talents)
    })
})

//ADD NINJA
router.post('/ninjas', (req,res,next) => {
    Ninja.create(req.body).then((ninja) => {
     res.send(ninja)
    }).catch(next)
})

//UPDATE A NINJA
router.put('/ninjas/:id', (req,res,next) => {
    Ninja.findByIdAndUpdate({_id:req.params.id, },req.body).then(() => {
        Ninja.findOne({_id:req.params.id, }).then( talent => {
            res.send(talent)
        })
    })
    
})

//DELETE A NINJA
router.delete('/ninjas/:id', (req,res,next) => {
    Ninja.findByIdAndRemove({_id:req.params.id}).then((talent) => {
      res.send(talent)
    })
    res.send({type:'DELETE'})
})

module.exports = router;