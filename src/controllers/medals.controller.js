const Athlete = require('../models/athlete.model');
const ObjectId = require('mongoose').Types.ObjectId;
const pool = require('../database/mysql');

class MedalsController {


    async list(req, res) {

        pool.getConnection((err, connection) => {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            connection.query('SELECT * from medals', (err, rows) => {
                if (err) throw err;
                connection.release();

                let medalsList = "";
                for (let i = 0; i < rows.length; i++) {
                    let rowInfo = "Le pays " + rows[i]["country_team"] + " a " + rows[i]["total"] + " médailles 🏅" + "<br>";
                    medalsList += rowInfo;
                }
                res.json({
                    "text": medalsList
                })
            });

        });

    }

    //Get the medals for a given country
    async getCountryMedals(req, res) {

        pool.getConnection((err, connection) => {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            connection.query("SELECT * from medals WHERE country_team LIKE'%" + req.body.country + "%'", (err, rows) => {
                if (err) throw err;
                connection.release();

                if (rows.length > 0) {
                    res.json({ "text": "Le pays " + rows[0]['country_team'] + " a gagné " + rows[0]['total'] + " médailles 🏅" });
                }
                else {
                    res.json({ "text": "Aucune médaille trouvée pour ce pays 🙃" })
                }
            });

        });
    }

    //Returns the number of medal for the given country and medal type
    async getCountryMedalsType(req, res) {

        pool.getConnection((err, connection) => {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            connection.query("SELECT " + req.body.medalType + " from medals WHERE country_team LIKE'%" + req.body.country + "%'", (err, rows) => {
                if (err) throw err;
                connection.release();

                if (rows.length > 0) {
                    res.json({ "text": "Le pays " + req.body.country + " a gagné " + rows[0][req.body.medalType] + "médailles de " + req.body.medalType + "🏅" });
                }
                else {
                    res.json({ "text": "Aucune médaille trouvée pour ce pays 🙃" })
                }

            });

        });
    }

    //Returns the total amount of medals 
    async getTotalCountryMedals(req, res) {

        pool.getConnection((err, connection) => {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            connection.query("SELECT SUM(total) as total from medals", (err, rows) => {
                if (err) throw err;
                connection.release();

                if (rows.length > 0) {
                    res.json({ "text": "Le nombre total de médailles est de" + rows[0]['total'] + "médailles 🏅" });
                }
                else {
                    res.json({ "text": "Erreur dans le calcul, veuillez réessayer 🙃" })
                }

            });

        });
    }

    //Returns the country that has the highest number of medals
    async getMaxCountryMedals(req, res) {

        pool.getConnection((err, connection) => {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            connection.query("SELECT country_team,total,gold,silver,bronze FROM medals WHERE total = (SELECT MAX(total) FROM medals)", (err, rows) => {
                if (err) throw err;
                connection.release();

                if (rows.length > 0) {
                    res.json({ "text": "Le pays qui a gagné le plus de médailles est " + rows[0]['country_team'] + " avec " + rows[0]['total'] + " médailles 🏅" });
                }
                else {
                    res.json({ "text": "Erreur dans le calcul, veuillez réessayer 🙃" })
                }
            });

        });
    }

    //Returns the country that has the lowest number of medals
    async getMinCountryMedals(req, res) {

        pool.getConnection((err, connection) => {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            connection.query("SELECT country_team,total,gold,silver,bronze FROM medals WHERE total = (SELECT MIN(total) FROM medals)", (err, rows) => {
                if (err) throw err;
                connection.release();

                if (rows.length == 1) {
                    res.json({ "text": "Le pays qui a gagné le moins de médailles est " + rows[0]['country_team'] + " avec " + rows[0]['total'] + " médailles 🏅" });
                }
                else if (rows.length > 1) {
                    let resp = "Les pays qui ont gagné le moins de médailles sont : <br>";

                    for (let i = 0; i < rows.length; i++) {
                        resp += rows[i]['country_team'] + " avec " + rows[i]['total'] + " médaille 🏅 <br>";
                    }
                    res.json({ "text": resp });
                }
                else {
                    res.json({ "text": "Erreur dans le calcul, veuillez réessayer 🙃" })
                }
            });

        });
    }

}

module.exports = MedalsController;