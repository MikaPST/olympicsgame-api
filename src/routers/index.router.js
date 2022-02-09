const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const MedalsController = require('../controllers/medals.controller');
const medalsController = new MedalsController();

const AthletesController = require('../controllers/athletes.controller');
const athletesController = new AthletesController();

const CoachesController = require('../controllers/coaches.controller');
const coachesController = new CoachesController();

const TeamsController = require('../controllers/teams.controller');
const teamsController = new TeamsController();

//Affichage de l'IHM de Watson
router.get('/index/', async (req, res) => {
    res.render('index');
});

//Pour webhook watson
router.post('/index/', async (req, res) => {


    let entity = req.body.element; //récupère le paramètre dans le POST correspondant à la clé element
    let process = req.body.process;

    //Surement a dégager
    // let country = req.body.country; //récupère le paramètre dans le POST correspondant à la clé country
    // let sport = req.body.sport;
    // let discipline = req.body.discipline; //référence uniqument a la colonne discipline de la table teams
    // let name = req.body.name;


    if (typeof entity !== 'undefined' && typeof process !== 'undefined') {

        switch (entity) {
            case 'athletes':
                switch (process) {
                    //Returns all countries for all athletes
                    case 'getCountriesAthletes':
                        athletesController.getCountriesAthletes(req, res);
                        break;
                    //Returns country and sport for a given athlete
                    case 'getAthleteDetails':
                        athletesController.getAthleteDetails(req, res);
                        break;

                    //Returns all the athletes in a given sport (sport attribute required in req)
                    case 'getDisciplineAthletes':
                        athletesController.getDisciplineAthletes(req, res)
                        break;

                    //Returns the list of all athletes for a given country
                    case 'getCountryAthletes':
                        athletesController.getCountryAthletes(req, res);
                        break;

                    //Returns list of athletes for a given country and a given sport/discipline
                    case 'getCountryDisciplineAthletes':
                        athletesController.getCountryDisciplineAthletes(req, res);
                        break;
                }
                break;

            case 'coaches':

                switch (process) {
                    //Return info for a given coach name
                    case 'getCoachDetail':
                        coachesController.getCoachDetail(req, res);
                        break;

                    //Returns all the coaches for a given country
                    case 'getCoachesCountry':
                        coachesController.getCoachesCountry(req, res);
                        break;

                    //Returns all the coaches for a given sport
                    case 'getCoachesSport':
                        coachesController.getCoachesSport(req, res);
                        break;

                    //Returns all the coaches for a given country and a given sport
                    case 'getCoachesCountrySport':
                        coachesController.getCoachesCountrySport(req, res);
                        break;

                }
                break;

            case 'medals':

                switch (process) {

                    //Get the medals for a given country
                    case 'getCountryMedals':
                        medalsController.getCountryMedals(req, res);
                        break;

                    //Returns the country that has the highest number of medals
                    case 'getMaxCountryMedals':
                        medalsController.getMaxCountryMedals(req, res);
                        break;

                    //Returns the country that has the lowest number of medals
                    case 'getMinCountryMedals':
                        medalsController.getMinCountryMedals(req, res);
                        break;

                    //Returns the total amount of medals 
                    case 'getTotalCountryMedals':
                        medalsController.getTotalCountryMedals(req, res);
                        break;

                    //Returns the nb of medals per type (gold,silver or bronze) and per country
                    case 'getCountryMedalType':
                        medalsController.getCountryMedalsType(req, res);
                        break;

                }
                break;

            case 'teams':

                switch (process) {

                    //Returns the list of all sports/categories for a given country.
                    case 'getCategoriesCountry':
                        //Voir comment intégrer les sports généraux + sports d'équipes de la table teams
                        teamsController.getCategoriesCountry(req, res);
                        break;

                    //Returns the list of all existing sport categories
                    case 'getSportCategories':
                        teamsController.getSportCategories(req, res);
                        break;

                    //Returns the list of all countries for a given sport/category
                    case 'getSportsCountry':
                        teamsController.getSportsCountries(req, res);
                        break;

                }
                break;
        }
    }
});

module.exports = router;