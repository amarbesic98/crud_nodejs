const Users = require('../model/model')

exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new user
    const user = new Users({
        name : req.body.name,
        email : req.body.email,
        gender: req.body.gender,
        status : req.body.status
    })

    // save user in the database
    user
        .save(user)
        .then(data => {
           // res.send(data)
            res.redirect('/');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}



exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Users.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        Users.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
}


exports.update = (req,res)=>{
    if(!req.body){
        return res.status(404).send({message:"data to update can not be emprty"})
    }

    const id = req.params.id //url parametar id
    Users.findByIdAndUpdate(id, req.body, {
        new:true,
        runValidators:true,
    }).then(data =>{
        if(!data){
            res.status(404).send({message:"cannot update user with thad id"})
        }
        else {
            res.send(data)
        }
    }).catch(err=>{
        res.status(500).send({message:"error update user inf"})
    })

} 

exports.delete = (req, res)=>{
    const id = req.params.id;

    Users.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}