'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const Route = use('Route');
Route.get('users/profile', 'UserController.getProfile');

Route.resource('users', 'UserController').apiOnly();
Route.resource('projects', 'ProjectController').apiOnly();
Route.post('/login', 'UserController.login');
Route.post('/doc', 'DocumentController.createDocument');
Route.get('/user/:id/projects','ProjectController.getUserProjects');
Route.post('/showdoc', 'DocumentController.getDocument');
Route.get('/mandate/:id', 'DocumentController.getMandate');


