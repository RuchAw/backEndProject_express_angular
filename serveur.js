const express = require('express');
const bodyParser = require('body-parser');
const fileupload = require("express-fileupload");


/*Pemert d'authoriser la consommation des api à partir d'un autre serveur
dans ce cas projet React */
const cors = require('cors');
const app = express();
/*activer le cros domaine */
app.use(cors())

/*activer fileupload*/
app.use(fileupload());

/*Définir le dossier /public en tant qu'un dossier public So on a pas besoin de passer par 
le controller afin d'afficher son contenu 
*/
app.use('/public', express.static('public'))

const port = 8081;
// activer le traitement des request de type  application/x-www-form-rulencoded
app.use(bodyParser.urlencoded({ extended: false }));

//activer le traitement des request de type application/json
//app.use(bodyParser.json());
app.use(express.json());

//importer le fichier de routage pour les utilisateurs
const routerUtilisateurs = require('./src/routes/UtilisateurRoutes');
/*Créer les apis pour Utiliatuer*/
app.use('/apis/utilisateurs/', routerUtilisateurs);


//importer le fichier de routage pour les roles
const routerRoles = require('./src/routes/RoleRoutes');
/*Créer les apis pour Utiliatuer*/
app.use('/apis/roles/', routerRoles);


/*Démarer le serveur backEnd*/
app.listen(port, () => {
    console.log('Backend is live port : 8081');

});