function goToBottom() { document.location.href = "#here"; document.getElementById("list").style.display = "none"; }
function clearSearch() { document.getElementById("input").value = ""; document.getElementById("clearSearch").style.display = "none"; code_selection("all") }
function showList() { document.getElementById("list").style.display = "block"; }
function closeList() { document.getElementById("list").style.display = "none"; }
function search() {
var iin = document.getElementById("input").value; code_selection(iin);
if (iin == "") { document.getElementById("clearSearch").style.display = "none"; } else { document.getElementById("clearSearch").style.display = "block"; }
}

code_selection("all")
function code_selection(c) {
var x, i;
x = document.getElementsByClassName("code");
if (c == "all") c = "";
for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
}
}

function w3AddClass(element, name) {
var i, arr1, arr2;
arr1 = element.className.split(" ");
arr2 = name.split(" ");
for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) { element.className += " " + arr2[i]; }
}
}

function w3RemoveClass(element, name) {
var i, arr1, arr2;
arr1 = element.className.split(" ");
arr2 = name.split(" ");
for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
    arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
}
element.className = arr1.join(" ");
}



// When the user clicks on the button, scroll to the top of the document
function topFunction() {
document.body.scrollTop = 0;
document.documentElement.scrollTop = 0;
}