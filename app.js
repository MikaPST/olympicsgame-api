const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static('public'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,'src', 'views'));

// Ajouter les routes via les routers
const indexRouter = require('./src/routers/index.router');
app.use('/api', indexRouter);

// Connexion à la base de données
require('./src/database/mysql');

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serveur lancé sur le port ${port} 🚀`);
    console.log(`Cliquez sur le lien http://localhost:3000/api/index/`);
});

