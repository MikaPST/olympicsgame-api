const pool = require('../database/mysql');

class AthletesController {

    //Returns country and sport for a given athlete
    async getAthleteDetails(req, res) {

        pool.getConnection((err, connection) => {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            connection.query("SELECT country,sport from athletes WHERE name LIKE'%" + req.body.name + "%'", (err, rows) => {
                if (err) throw err;
                connection.release();

                if (rows.length > 0) {
                    res.json({
                        "text": "Voici les informations sur l'athlète " + req.body.name + "<br>" + "Son pays est" + rows[0]['country'] + "<br>" + "Son sport est " + rows[0]['sport']
                    })
                }
                else {
                    res.json({ "text": "Aucun athlète trouvé avec ce nom 🙃" })
                }
            });

        });
    }

    //Returns all the athletes in a given sport/discipline
    async getDisciplineAthletes(req, res) {

        pool.getConnection((err, connection) => {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            connection.query("SELECT * from athletes WHERE sport LIKE'%" + req.body.sport + "%'", (err, rows) => {
                if (err) throw err;
                connection.release();

                if (rows.length > 0) {
                    let sportAthletesList = "";
                    for (let i = 0; i < rows.length; i++) {
                        let rowInfo = rows[i]["name"] + "<br>";
                        sportAthletesList += rowInfo;
                    }
                    res.json({
                        "text": sportAthletesList
                    })
                } else {
                    res.json({ "text": "Aucun athlète trouvé pour cette discipline 🙃" })
                }
            });

        });
    }

    //Returns all countries for all athletes that take part in the Olympics
    async getCountriesAthletes(req, res) {

        pool.getConnection((err, connection) => {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            connection.query("SELECT DISTINCT country from athletes", (err, rows) => {
                if (err) throw err;
                connection.release();

                if (rows.length > 0) {
                    let countriesList = "";
                    for (let i = 0; i < rows.length; i++) {
                        let rowInfo = rows[i]["country"] + "<br>";
                        countriesList += rowInfo;
                    }
                    res.json({
                        "text": countriesList
                    })
                } 
            });

        });
    }

    //Returns the list of all athletes for a given country
    async getCountryAthletes(req, res) {

        pool.getConnection((err, connection) => {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            connection.query("SELECT * from athletes WHERE country LIKE'%" + req.body.country + "%'", (err, rows) => {
                if (err) throw err;
                connection.release();

                if (rows.length > 0) {
                    let countryAthletesList = "";
                    for (let i = 0; i < rows.length; i++) {
                        let rowInfo = rows[i]["name"] + "<br>";
                        countryAthletesList += rowInfo;
                    }
                    res.json({
                        "text": countryAthletesList
                    })
                } else {
                    res.json({ "text": "Aucun athlète trouvé pour ce pays 🙃" })
                }
            });

        });
    }

    //Returns list of athletes for a given country and a given sport/discipline
    async getCountryDisciplineAthletes(req, res) {

        pool.getConnection((err, connection) => {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            connection.query("SELECT * from athletes WHERE country LIKE'%" + req.body.country + "%' AND sport LIKE'%" + req.body.sport + "%'", (err, rows) => {
                if (err) throw err;
                connection.release();

                if (rows.length > 0) {
                let sportCountryAthletesList = "";
                for (let i = 0; i < rows.length; i++) {
                    let rowInfo = rows[i]["name"] + "<br>";
                    sportCountryAthletesList += rowInfo;
                }
                res.json({
                    "text": sportCountryAthletesList
                })
                }
                else{
                    res.json({ "text": "Aucun athlète trouvé pour ce pays et cette discipline 🙃" })
                }
            });

        });
    }

}

module.exports = AthletesController;