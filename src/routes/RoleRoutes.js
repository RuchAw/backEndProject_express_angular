/*importer express js pour manipuler les routes*/
const express = require('express');
/*importer le module Router de express js*/
const routerRoles = express.Router();
/*imporer roleController*/
const roleController = require('../controllers/RoleController');


/*Afficher tout les role*/
routerRoles.get('/', roleController.afficherAll);



//sécuriser l'accés à la route ajouter un role
const auth = require('../middleware/auth');
/*la route:=> roles/ajouter ,avec la méthode POST */
//routerRoles.post('/ajouter', roleController.insert);
routerRoles.post('/ajouter', auth.verifyToken, async (req, res) => {
roleController.insert(req,res);
});


module.exports = routerRoles