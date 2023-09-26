const express = require("express");
const Router = express.Router()
const usersController = require('../controllers/users.controller');

Router.get('/', usersController.findAll)
Router.get('/:_id/logs?', usersController.findById)
Router.post('/', usersController.storeUser)
Router.post('/:_id/exercises', usersController.storeUserExercise)

module.exports = Router;