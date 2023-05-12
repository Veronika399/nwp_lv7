const Projectdb = require('../model/project');

exports.find = (req,res)=>{
    if(!req.isAuthenticated()){
        return res.status(401).send('Niste ulogirani!');
    }

    if(req.query.id){
        const id = req.query.id;

        Projectdb.findById(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({
                        message: `Projekt sa ${id} nije pronađen!`
                    });
                }else{
                    res.json(data);
                }
            })
            .catch(err => {
                res.status(500).send({ message: `Pogreška pri dohvaćanju projekta s ID-om ${id}`});
            })
    }else{
        Projectdb.find()
            .then(project => {
                res.json(project)
            })
            .catch(err =>{
                res.status(500).send({ message: err.message || "Došlo je do pogreške prilikom dohvaćanja informacija o projektu!"});
            })
    }
}

exports.create = (req,res)=>{
    if (!req.isAuthenticated()){
        res.status(401).send({message: 'Niste ulogirani!'});
    }

    if(!req.body){
        res.status(400).send({ message: "Sadržaj ne smije biti prazan!"});
        return;
    }

    const project = new Projectdb({
        name : req.body.name,
        price: req.body.price,
        tasks_done: '',
        description: req.body.description,
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now()),
        owner: {
            id: req.user._id,
            username: req.user.username
        },
        members: [],
    });

    project
        .save(project)
        .then(data => {
            res.send(data)
        })
        .catch(err =>{
            res.status(500).send({
                message: err.message || "Došlo je do pogreške prilikom izrade novog projekta!"
            });
        });
}

exports.update = (req, res) => {
    if(!req.isAuthenticated()){
        return res.status(401).send('Niste ulogirani!');
    }

    if(!req.body){
        return res
            .status(400)
            .send({message:"Podaci za ažuriranje ne mogu biti prazni!"});
    }

    const id = req.params.id;

    Projectdb.findById(id)
        .then(project => {
            if(project.finished_at){
                return res.send(project);
            }
            project.updated_at = new Date(Date.now());
            if(project.owner.id === req.user._id.toString()){
                updateProject(id, req.body, res)
            }
            else if(project.members.find(member => member._id.equals(req.user._id))){
                project.tasks_done = req.body.tasks_done
                updateProject(id, project, res);
            }
            else{
                res.status(401).send('Neovlašteno');
            }
        })
}

function updateProject(id, data, res){
    Projectdb.findByIdAndUpdate(id, data, { new: true})
        .then(project => {
            if(!project){
                res.status(404).send({ message: `Nije moguće ažurirati projekt s ${id}.`})
            }else{
                res.send(project);
            }
        })
        .catch(err => {
            res.status(500).send({message: "Nevažeći podaci o projektu"});
        });
}

function deleteProject(id, res){
    Projectdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message: `Ne može se brisati s ID-om ${id}. Možda je ID pogrešan.`});
            }else{
                res.send({
                    message: "Projekt je uspješno obrisan!"
                });
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: `Nije moguće izbrisati projekt s${id}`
            })
        })
}

exports.delete = (req, res) => {
    if(!req.isAuthenticated()){
        return res.status(401).send('Niste ulogirani!');
    }

    const id = req.params.id;
    Projectdb.findById(id)
        .then(data => {
            if(data.owner.id !== req.user._id.toString()){
                return res.status(401).send({message: 'Samo vlasnik može izbrisati projekt'});
            }
            else{
                deleteProject(id, res);
            }
        }).catch(err => {
            res.status(500).send({ message: `Pogreška pri dohvaćanju projekta s ID-om ${id}`});
        })
    
}

exports.archive = (req, res) => {
    if(!req.isAuthenticated()){
        return res.status(401).send('Niste ulogirani!');
    }

    const id = req.params.id;


    Projectdb.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({
                    message: `Projekt s ${id} nije pronađen!`
                });
            }else{
                if(data.finished_at){
                    return res.status(400).send({message: 'Projekt je već arhiviran'});
                }
                else if(data.owner.id !== req.user._id.toString()){
                    return res.status(401).send({message: 'Samo vlasnik može arhivirati projekte!'});
                }else{
                    data.finished_at = new Date(Date.now());
                    updateProject(id, data, res);
                }
            }
        })
        .catch(err => {
            res.status(500).send({ message: `Pogreška pri dohvaćanju projekta s ID-om ${id}`});
        })

    
}

