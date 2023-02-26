/*Importer le module mysql qui permet de gérer les transaction dans une base de données mysql */
var mysql = require('mysql2');
const md5 = require('md5');

//créer une connexion à la base de données
var con = mysql.createConnection({
    host: "localhost", /*le serveur de la base de données*/
    user: "root", /*Utilisateur de la base de données*/
    password: "root",/*le mot de passe de l'utilisateur de la base de données*/
    port: "3306", /*le serveur de la base de données*/
});

/*Créer la base de données */
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE if not exists ventesappDB", function (err, result) {
        if (err) throw err;
        /*se connecter à la base de données crée puis créer les tables */
        var con = mysql.createConnection({
            host: "localhost", /*le serveur de la base de données*/
            user: "root", /*Utilisateur de la base de données*/
            password: "root",/*le mot de passe de l'utilisateur de la base de données*/
            port: "3306", /*le serveur de la base de données*/
            database: "ventesappDB" /*le nom de la base de données à Créer manullement*/
        });

        //se connecter en utlisant con crée
        con.connect(function (err) {
            /*err:contient error de connexion*/
            /*afficher erreur de connexion s'il existe*/
            if (err) throw err;
            /*pas d'erreur donc on peut exécuter des requête sql */
            /*Créer la table produit */
            var sql = "CREATE table if not exists  roles(id int primary key AUTO_INCREMENT,nom varchar(25) not null unique )";
            /*Exécuter la requete sql crée*/
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("Roles produit est crée");
            });
        });

        //insérer un jeu de teste
        con.connect(function (err) {
            if (err) throw err;
            var sql = "insert into  roles(id,nom)  values(1,'Admin')";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("Bien inséré");
            });
        });


        con.connect(function (err) {
            if (err) throw err;
            var sql = "CREATE TABLE if not exists utilisateurs (id int primary key NOT NULL AUTO_INCREMENT,nom varchar(25) not null,email varchar(25) unique not null,password varchar(250) not null,photo varchar(100) not null,active boolean default 0,idRole int null,constraint foreign key(idrole) references roles(id) on delete cascade on update cascade)";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("Table utilisateurs est crée");
            });
        });


        //insérer un utilisateur Admin
        con.connect(function (err) {
            if (err) throw err;
            //crypter le mot de passe
            let password_Cryptee = "fixabc";
            password_Cryptee = md5(password_Cryptee.toString());

            var sql = "insert into utilisateurs(id,nom,email,idRole,active,photo,password)values(1,'superAdmin','email@Fixwins',1,1,'pic1.jpg','" + password_Cryptee + "')";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("Bien inséré");
            });
        });


        con.connect(function (err) {
            if (err) throw err;
            var sql = "CREATE table if not exists produits(id int primary key AUTO_INCREMENT, nom varchar(25) not null, marque varchar(25) not null, photo varchar(100) , prix float default 0,qtestock float  default 0)";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("Table produits est crée");
            });
        });



        con.connect(function (err) {
            if (err) throw err;
            var sql = "CREATE table if not exists ventes( id int primary key AUTO_INCREMENT,idproduit int not null,idUtilisateur int not null,datevente date not null,qteVendue  float,constraint foreign key(idproduit) references produits(id) on delete cascade on update cascade, constraint foreign key(idUtilisateur) references utilisateurs(id) on delete cascade on update cascade )";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("Table ventes est crée");
            });
        });



    });
});