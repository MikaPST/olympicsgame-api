const Athlete = require('../models/athlete.model');
const ObjectId = require('mongoose').Types.ObjectId;
const pool = require('../database/mysql');

class TeamsController {

    //Returns the list of all sports/categories for a given country.
    async getCountryCategories(req, res) {

        pool.getConnection((err, connection) => {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            connection.query("SELECT DISTINCT sport FROM athletes WHERE country LIKE'%" + req.body.country + "%'", (err, rows) => {
                if (err) throw err;
                connection.release();

                if (rows.length > 0) {
                    let countryCategoriesList = "";
                    for (let i = 0; i < rows.length; i++) {
                        let rowInfo = rows[i]["sport"] + "<br>";
                        countryCategoriesList += rowInfo;
                    }
                    res.json({
                        "text": countryCategoriesList
                    })
                } else {
                    res.json({ "text": "Aucun sport trouvé pour ce pays 🙃" })
                }
            });

        });
    }

    //Returns the list of all countries for a given sport/category
    async getSportsCountries(req, res) {

        pool.getConnection((err, connection) => {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            connection.query("SELECT DISTINCT country from athletes WHERE sport LIKE'%" + req.body.sport + "%'", (err, rows) => {
                if (err) throw err;
                connection.release();

                if (rows.length > 0) {
                    let countrySportsList = "";
                    for (let i = 0; i < rows.length; i++) {
                        let rowInfo = rows[i]["country"] + "<br>";
                        countrySportsList += rowInfo;
                    }
                    res.json({
                        "text": countrySportsList
                    })
                } else {
                    res.json({ "text": "Aucun pays trouvé pour ce sport 🙃" });
                }
            });

        });
    }

    //Returns the list of all existing sport categories
    async getSportCategories(req, res) {

        pool.getConnection((err, connection) => {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            connection.query("SELECT DISTINCT sport FROM athletes", (err, rows) => {
                if (err) throw err;
                connection.release();

                if (rows.length > 0) {
                    let sportsList = "";
                    for (let i = 0; i < rows.length; i++) {
                        let rowInfo = rows[i]["sport"] + "<br>";
                        sportsList += rowInfo;
                    }
                    res.json({
                        "text": sportsList
                    })
                }
                else {
                    res.json({ "text": "Erreur, aucun sport trouvé veuillez réassayer plus tard 🙃" });
                }
            });

        });
    }

}

module.exports = TeamsController;