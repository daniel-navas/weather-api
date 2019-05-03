# Weather API

This API give access to 5 day weather forecast in any city, using the data of the public API [openweathermap](https://openweathermap.org)

## Endpoints

### Register

Description: Register user
Method: `POST`
Route: `/api/users/register`
Example body: `{ "email": "danielnavasm@gmail.com", "password": "qwertyui" }`

### Login

Description: Login user
Method: `POST`
Route: `/api/users/login`
Example body: `{ "email": "danielnavasm@gmail.com", "password": "qwertyui" }`

### Forecast

Description: You can search weather forecast for 5 days with data every 3 hours by city name
Method: `GET`
Route: `/api/weather/?city={city name}&country={country code}`
Parameters: use ISO 3166 country codes

### History

Description: Get the search history for the current user
Method: `GET`
Route: `/api/weather/history`

## Project Setup

To run project locally:

- Clone repo
- `npm install` in root directory
- Run mongodb and add your uri to `secrets.js` file
- `npm start` to run the proyect
