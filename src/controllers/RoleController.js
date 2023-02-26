const RoleModel = require('../models/Role');
/*Insérer un nouveau role dans la table role*/
exports.insert = (req, res) => {
    const role_nouveau = new RoleModel(req.body);
    console.log(req.body);
    /*Vérifier si tout les champs sont rempli*/
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.send(400).send({ success: false, message: 'Erreur tous les champs sont obligatoires' });
    } else {
        RoleModel.insert(role_nouveau, (err, role) => {
            if (err)
                /*si erreur envoyer l'erreur*/
                res.send(err);
            /*si Ok envoyer un objet json de la forme:
            {
                status:true;
                message:"le role est bien ajouté",
                data:id du role inséré
            }
            
            */
            res.json({ status: true, message: 'Le role est bien ajoute', data: role.insertId })
        })
    }
}




/*Afficher tout les roles*/
exports.afficherAll = (req, res) => {
    RoleModel.afficherAll((err, roles) => {
        if (err)
            /*si erreur envoyer l'erreur*/
            res.send(err);
        /*sinon envoyer la liste des roles*/
        res.send(roles)
    })
}
