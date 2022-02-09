# Documentation OlympicGames API

Organized by **elements** (big title) and **processes** (function names within elements).

for each process a couple parameters might be needed:

- sport

- name

- country

# athletes

> Returns all countries for all athletes

**getCountriesAthletes**

> Returns country and sport for a given athlete

**getAthleteDetails**

> Returns all the athletes in a given sport (sport attribute required in req)

**getDisciplineAthletes**

> Returns the list of all athletes for a given country

**getCountryAthlete**

> Returns list of athletes for a given country and a given sport/discipline

**getCountryDisciplineAthletes**

# coaches

> Return info for a given coach name

**getCoachDetail**

> Returns all the coaches for a given country

**getCoachesCountry**

> Returns all the coaches for a given sport

**getCoachesSport**

> Returns all the coaches for a given country and a given sport

**getCoachesCountrySport**

# medals

> Get the medals for a given country

**getCountryMedals**

> Returns the country that has the highest number of medals

**maxCountryMedals**

> Returns the country that has the lowest number of medals

**minCountryMedals**

> Returns the total amount of medals

**totalCountryMedals**

> Returns the nb of medals per type (gold,silver or bronze) and per country

**countryMedalType**

# teams

> Returns the list of all sports/categories for a given country.

**getCountryCategories**


> Returns the list of all existing sport categories

**getSportCategories**

> Returns the list of all countries for a given sport/category

**getSportsCountry**
