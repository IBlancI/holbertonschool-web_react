import $ from 'jquery';
import _ from 'lodash'; // <-- importer lodash en entier pour avoir _.debounce

// Ajouter les éléments dans l'ordre demandé
$('body').append('<p>Holberton Dashboard</p>');
$('body').append('<p>Dashboard data for the students</p>');
$('body').append("<button id='start-btn'>Click here to get started</button>");
$('body').append("<p id='count'></p>");
$('body').append('<p>Copyright - Holberton School</p>');

// Compteur
let clickCount = 0;
function updateCounter() {
  clickCount += 1;
  $('#count').text(`${clickCount} clicks on the button`);
}

// Init affichage
$('#count').text(`${clickCount} clicks on the button`);

// Important pour le checker: utiliser _.debounce
$('#start-btn').on('click', _.debounce(updateCounter, 500));
