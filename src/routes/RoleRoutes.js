/*importer express js pour manipuler les routes*/
const express = require('express');
/*importer le module Router de express js*/
const routerRoles = express.Router();
/*imporer roleController*/
const roleController = require('../controllers/RoleController');
const auth = require('../middleware/auth');
/*la route:=> roles/ajouter ,avec la m�thode POST */
//routerRoles.post('/ajouter', roleController.insert);
routerRoles.post('/ajouter', auth.verifyToken, async (req, res) => {
roleController.insert(req,res);
});

//afficher all
routerRoles.get('/', async (req, res) => {
roleController.afficherAll(req,res);
});


//supprimer
routerRoles.get('/details/:id', auth.verifyToken, async (req, res) => {
roleController.details(req,res);
});


//modifier
routerRoles.post('/modifier/:id', auth.verifyToken, async (req, res) => {
roleController.updateRole(req,res);
});

//d�tails par id
routerRoles.get('/supprimer/:id', auth.verifyToken, async (req, res) => {
roleController.supprimer(req,res);
});

module.exports = routerRoles