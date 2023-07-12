//Active Navbar
var lists = document.getElementsByClassName("list");

// Loop through the buttons and add the active class to the current/clicked button
for (var i = 0; i < lists.length; i++) {
    lists[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
} 