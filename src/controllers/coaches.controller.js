const Athlete = require('../models/athlete.model');
const ObjectId = require('mongoose').Types.ObjectId;
const pool = require('../database/mysql');

class CoachesController {


    //Return info for a given coach name
    async getCoachDetail(req, res) {

        pool.getConnection((err, connection) => {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            connection.query("SELECT * from coaches WHERE name LIKE'%" + req.body.name + "%'", (err, rows) => {
                if (err) throw err;
                connection.release();

                if (rows.length > 0) {
                    res.json({
                        "text": "Voici les informations sur le coach " + req.body.name + "<br>" + "Son pays est " + rows[0]['country'] + "<br>" + "Son sport est " + rows[0]['sport']
                    })
                }
                else {
                    res.json({ "text": "Aucun coach trouvé avec ce nom 🙃" })
                }
            });

        });
    }

    //Returns all the coaches for a given country
    async getCoachesCountry(req, res) {

        pool.getConnection((err, connection) => {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            connection.query("SELECT * from coaches WHERE country LIKE'%" + req.body.country + "%'", (err, rows) => {
                if (err) throw err;
                connection.release();

                let coachesCountryList = "";
                if (rows.length > 0) {
                    for (let i = 0; i < rows.length; i++) {
                        let rowInfo = rows[i]["name"] + "<br>";
                        coachesCountryList += rowInfo;
                    }
                    res.json({
                        "text": coachesCountryList
                    });
                } else {
                    res.json({ "text": "Aucun coach trouvé pour ce pays 🙃" })
                }
        
            });

        });
    }

    //Returns all the coaches for a given sport
    async getCoachesSport(req, res) {

        pool.getConnection((err, connection) => {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            connection.query("SELECT * from coaches WHERE sport LIKE'%" + req.body.sport + "%'", (err, rows) => {
                if (err) throw err;
                connection.release();

                let coachesSportList = "";
                if (rows.length > 0) {
                    for (let i = 0; i < rows.length; i++) {
                        let rowInfo = rows[i]["name"] + "<br>";
                        coachesSportList += rowInfo;
                    }
                    res.json({
                        "text": coachesSportList
                    });
                } else {
                    res.json({ "text": "Aucun coach trouvé pour ce sport 🙃" })
                }
            });

        });
    }

    //Returns all the coaches for a given country and a given sport
    async getCoachesCountrySport(req, res) {

        pool.getConnection((err, connection) => {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            connection.query("SELECT * from coaches WHERE country LIKE'%" + req.body.country + "%'" + " AND sport LIKE '%" + req.body.sport + "%'", (err, rows) => {
                if (err) throw err;
                connection.release();

                let coachesCountrySportList = "";
                if (rows.length > 0) {
                    for (let i = 0; i < rows.length; i++) {
                        let rowInfo = rows[i]["name"] + "<br>";
                        coachesCountrySportList += rowInfo;
                    }
                    res.json({
                        "text": coachesCountrySportList
                    });
                } else {
                    res.json({ "text": "Aucun coach trouvé pour ce sport et ce pays 🙃" })
                }

            });

        });
    }

}

module.exports = CoachesController;