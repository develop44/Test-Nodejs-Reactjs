<<<<<<< HEAD

L'installation de l'application:

1- git clone https://github.com/develop44/Test-Nodejs-Reactjs.git
2- Taper la commande "npm install" dans les deux dossiers Frontend et backend pour installer le dossier node_modules.
3- Taper la commande "npm start" dans les deux dossiers frontend et backend
4- Taper localhost:3000 dans le browser.
5- Créer une base de données s'appelle "gestion_parking_db" 

=======
# Deploiement de l'application BlackParking construit avec NodeJS, React et Mysql en détail :

## Outils nécessaires pour l'application

1. Mysql
2. NodeJS v.14.17 de préférence
3. Un navigateur pour tester
3. git cli

### Une fois ces outils sont installés vous devez exécuter en ordre les étapes suivantes

1. Clonner le projet avec la commande suivante
```Shell
git clone https://github.com/develop44/Test-Nodejs-Reactjs.git
```

2. Créer une base de donnée pour l'application, en suite allez dans le répertoire backend puis configurer le fichier config.js avec les paramètres de votre base de données. 
les lignes à configurer sont les suivantes:
```JavaScript
const dbname = "nom_de_ma_base_de_données";
const dbpass = "mon_mot_de_passe";
const dbuser = "utilisateur_de_ma_base_de_données";
```
3. Toujours dans le répertoire backend vous devez installer les dépendances avec la commande suivantes:
```Shell
npm install
```
4. Puis lancer le backend avec la commande suivantes:
```Shell
npm start
```

5. Retournez dans le répertoire front-end
6. Exécuter la commande suivante pour installer les dépendances
```Shell
npm install
```
7. puis lancer le frontend avec la commande
```Shell
npm start
```

>Si tout c'est bien passer alors l'application roule et vous pourrez  visiter 
[localhost:3000](http://localhost:3000/ "Localhost")

>>>>>>> fde681fdbb0884ad82a624814d3d20358770fa4e