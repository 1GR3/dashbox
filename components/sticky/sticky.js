
sticky = document.getElementById("sticky_1");
sticky_i_button = document.getElementsByClassName("i")[0];
sticky_i_button.addEventListener("click", flipSticky);
/*
sticky.onclick. = function() {alert("click");}

sticky.getElementsByClassName("i").onclick = function() {alert("click");}
*/


function flipSticky() {
  sticky.classList.toggle("flipped");
}

