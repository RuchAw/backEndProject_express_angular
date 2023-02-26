/*importer le fichier de configuration de connexion à la base de données*/
var connexion = require('./../../config/config');
/*Créer un objet de type Utilisateur*/
var Utilisateur = function (utilisateur) {
    this.id = utilisateur.id;
    this.nom = utilisateur.nom;
    this.email = utilisateur.email;
    this.password = utilisateur.password;
    this.photo = utilisateur.photo;
    this.active = utilisateur.active;
    this.idRole = utilisateur.idRole;
};


/**1.Inscription**/
Utilisateur.insert = function (utilisateur_nouveau, result) {
    console.log(utilisateur_nouveau);
    connexion.query("INSERT INTO utilisateurs(email,nom,password,idrole,photo) values(?,?,?,?,?)", [utilisateur_nouveau.email, utilisateur_nouveau.nom, utilisateur_nouveau.password, utilisateur_nouveau.idRole, utilisateur_nouveau.photo], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });


}



/**Connexion**/
Utilisateur.connexion = (email, password, result) => {
    connexion.query('SELECT * FROM utilisateurs WHERE email=? and password=? ', [email, password], (err, res) => {

        if (err) {
            result(err, null);
        } else {
            result(null, res);
            // console.log(res);
        }
    })
}


//vérifier si un attribut est vide
Utilisateur.verifier = function (utilisateur) {
    if (utilisateur.nom == '' || utilisateur.email == '' || utilisateur.password == '' || utilisateur.photo == '' || utilisateur.idRole == '')
        return true;
};



/*Exporter la classe pour pouvoir l'importer dans le controller */
module.exports = Utilisateur;