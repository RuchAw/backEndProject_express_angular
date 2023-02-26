const UtilisateurModel = require('../models/Utilisateur');
/*Permet de gérer les chemin des dossier et les fichiers*/
var path = require("path");
const md5 = require('md5');
const jwt = require('jsonwebtoken');

/*Insérer un nouveau utilisateur dans la table utilisateur*/
exports.insert = (req, ress) => {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        ress.send({ status: 0, data: err });
    } else {
        // console.log(req.body);


        let utilisateur_nouveau = {
            nom: '',
            email: '',
            idRole: '',
            password: '',
            photo: '',
            active: 0,
        }


        //récupérer userInfo envoyé par Angular
        utilisateur_nouveau = JSON.parse(req.body.userInfo);
        //Crypter le mot de passe 
        utilisateur_nouveau.password = md5(utilisateur_nouveau.password);


        /*Récupérer le fichier */
        const file = req.files.file;
        const fileName = file.name;
        let chemin = path.join(__dirname, '..', '..');
        chemin = chemin + "\\public\\photo_Utilisateurs\\";

        /*file.move file to chemin*/
        file.mv(chemin + "\\" + fileName, (err) => {
            if (!err) {
                /*Ajouter photo à l'objet utilisateur reçu*/
                utilisateur_nouveau.photo = "photo_Utilisateurs/" + fileName;



                /*Appler la méthode insert du UtilisateurModel*/
                UtilisateurModel.insert(utilisateur_nouveau, (err2, utilisateur) => {
                    console.log("utilisateur_nouveau");
                    console.log(utilisateur_nouveau);
                    if (err2) {
                        console.log(err2);
                        ress.send({ status: 0, data: err2 });
                    } else {
                        //let token = jwt.sign({ data:utilisateur }, 'secret')
                        ress.send({ status: 2, data: "ok" });
                    }

                });
            }

            else {
                ress.send({ status: 0, data: err });
            }
        });
    }
}




exports.connexion = (req, ress) => {
    if (req.body.email == '' && req.body.password == '') {
        res.send({ status: 0, data: err });
    }
    else {

        const email = req.body.email;
        const password = md5(req.body.password.toString());

        UtilisateurModel.connexion(email, password, (err2, utilisateur) => {
            //si Erreur
            if (err2) {
                ress.send({ status: 0, data: "champs obligatoires" });
            }
            //si OK
            else {

                //vérifier si login et password sont correcte
                if (utilisateur.length > 0) {
                    //Vérifier si le compte de l'utilisateur est active
                    if (utilisateur[0].active == 1) {
                        let token = jwt.sign({ data: utilisateur }, 'secret')
                        ress.send({ status: 1, data: utilisateur, token: token });
                    }

                    //le compte existe mais n'est pas active
                    else {
                        ress.send({ status: 2, data: "non active" });

                    }
                }

                //Login incorrecte
                else {
                    ress.send({ status: 0, data: "erreur login" });

                }
            }


        });
    }
}
