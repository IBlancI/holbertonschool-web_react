import $ from "jquery";
import "./header.css";

console.log('Init header');

const $header = $("<header></header>");
const $logo = $('<div id="logo"></div>');
const $title = $("<h1>Holberton Dashboard</h1>");

$header.append($logo, $title);
$("body").prepend($header);
