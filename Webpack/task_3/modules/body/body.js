import $ from "jquery";
import _ from "lodash";
import "./body.css";

let count = 0;

const $main = $("<main></main>");
const $btn = $('<button id="click-btn">Click me</button>');
const $count = $('<span id="count">0</span>');

$btn.on("click", _.debounce(() => {
  count += 1;
  $count.text(String(count));
}, 100));

$main.append($btn, $count);
$("body").append($main);
