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
            result(err,null);
        }else{
        /*retourne la liste des roles*/
            result(null,res);
        }
    })

}


//vérifier si un attribut est vide
Role.verifier=function(role)
{
if(role.nom=='')
return true;
};



/*Exporter la classe pour pouvoir l'importer dans le controller */
module.exports= Role;