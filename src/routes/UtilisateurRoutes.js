/*importer express js pour manipuler les routes*/
const express = require('express');
/*importer le module Router de express js*/
const routerUtilisateurs = express.Router();
/*imporer utilisateurController*/
const utilisateurController = require('../controllers/UtilisateurController');

routerUtilisateurs.post('/inscription', utilisateurController.insert);


routerUtilisateurs.post('/connexion', utilisateurController.connexion);


//tester la connexion 
const auth = require('../middleware/auth');
routerUtilisateurs.get('/profile', auth.verifyToken, async (req, res) => {


});

module.exports = routerUtilisateurs