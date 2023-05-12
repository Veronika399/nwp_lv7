const passport = require("passport");
const { genPassword } = require("../database/passwordUtils");
const User = require("../model/user");

exports.login = (req, res) => {
    res.status(200).json({ user: {id: req.user.id, username: req.user.username}, msg: 'Uspješno ste prijavljeni!'});
}

exports.user = (req, res) => {
    if(req.isAuthenticated()){
        res.status(200).json( { id: req.user.id, username: req.user.username} );
    }else{
        res.status(401).send('Neovlašteno');
    }
}

exports.logout = (req, res) => {
    if(req.user){
        req.logout();
        res.status(200).send('Odjavljeni ste!');
    }
    else{
        res.status(401).send('Neovlašteno');
    }
}

exports.register = (req, res) => {
    if(!req.body){
        res.status(400).send({ message: "Sadržaj ne smije biti prazan!"});
        return;
    }

    const user = User.find({username: req.body.username})
        .then(user => {
            if(user.length){
                return res.status(400).send({message:'Korisnik s ovim imenom već postoji!'});
            }
            else{
                const saltHash = genPassword(req.body.password);
                const newUser = new User({
                    username : req.body.username,
                    hash: saltHash.hash,
                    salt: saltHash.salt
                })

                newUser.save()
                    .then((user) => {
                        req.login(user, err =>{
                            if(err){
                                console.log(err);
                            }
                            return res.status(200).send({user: {id: user._id, username: user.username}, message: 'Uspješno registriran!'});
                        })
                    })
                    .catch(err => {
                        res.status(500).send({ message: `Greška pri registraciji korisnika!`});
                    })
            }
        })
        .catch(err => {
            console.log(err);
        });

}