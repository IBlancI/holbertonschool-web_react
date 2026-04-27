import $ from "jquery";
import _ from "lodash";
import "../css/main.css";

// Logo at top
$("body").prepend('<div id="logo"></div>');

// Simple button + counter (counter on the right)
const $btn = $('<button id="click-btn">Click me</button>');
const $counter = $('<span id="count" class="counter">0</span>');
$("body").append($btn, $counter);

let count = 0;
$btn.on("click", () => {
  count += 1;
  $("#count").text(count);
});
