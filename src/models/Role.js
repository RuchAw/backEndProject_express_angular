/*importer le fichier de configuration de connexion à la base de données*/
var connexion = require('./../../config/config');
/*Créer un objet de type Produit*/
var Role = function(role){
this.id = role.id;
this.nom = role.nom;
};

/**1.insert**/
/*Ajouter à l'objet Role la fonction insert qui permet d'ajouter un role dans la table role*/
Role.insert = function (role, result) {
/*role :sera renseigner par le controlleur contenant l'objet à insérer dans la table role
result:un objet qui contiendra la réponse à envoyer au controlleur :RoleController
*/
/*Exécuter la requêtes SQL insert into role*/
connexion.query("INSERT INTO roles set ?", role, function (err, res) {
/*
function (err, res):la méthode de callback sera exécuté aprés l'exécution de la commande insert into
err:contient l'erreur sql reçu
res:contient la reponse de la methode query
*/
/*Si la fonction query délenche une erreur*/
if(err) {
console.log("error: ", err);
result(err, null);
}
/*Si la fonction query s'exécute sans erreur on envoie res.insertId :c'est la valeur de la primary key de l'objet inséré */
else{
console.log(res.insertId);
result(null, res.insertId);
}
});
}

/**Afficher tout les roles**/
Role.afficherAll = (result) =>{
    connexion.query('SELECT * FROM roles', (err, res)=>{
        if(err){
            result(null,err);
        }else{
        /*retourne la liste des roles*/
            result(null,res);
        }
    })

}

/*Supprimer un role par son ID*/
Role.supprimer = (id, result)=>{
    connexion.query('DELETE FROM roles WHERE id=?', [id], (err, res)=>{
        if(err){
            result(null, err);
        }else{
            result(null, res);
        }
    })
}

/*Chercher un Role par son id*/
Role.details = (id, result)=>{
    connexion.query('SELECT * FROM roles WHERE id=?', id, (err, res)=>{
        if(err){
            result(null, err);
        }else{
            result(null, res);
        }
    })
}

/*Modifier un role*/
Role.updateRole = (id, role_nouveau, result)=>{
    connexion.query("UPDATE roles SET nom=? WHERE id = ?", 
    [role_nouveau.nom,id],
    (err, res)=>{
        if(err){
            result(null, err);
        }else{
            result(null, res);
        }
    });

}


/*Exporter la classe pour pouvoir l'importer dans le controller */
module.exports= Role;