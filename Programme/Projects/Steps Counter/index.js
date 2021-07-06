const stp = document.querySelector(".steps");
const pcl = document.querySelector(".cm");
const hm = document.querySelector(".hm");
const container = document.querySelector(".container");
const pre = document.querySelector(".rm");
var mul = document.querySelector(".inp");
var i = -1;

//  ********************FUNCTIONS****************************
function updt() {
  if (mul.value != "") {
    i++;
    if (!(i == 0)) {
      stp.innerHTML = (i * mul.value).toString();
      pcl.innerHTML = i.toString() + " times Clicked";
    }
  }
}

function rest() {
  container.classList.remove("active");
  hm.classList.add("active");
  mul.focus();
  i = 0;
  mul.value = "";
  stp.innerHTML = "0";
  pcl.innerHTML = "Click Me";
}

// ************************EVENT LISTENERS************************
pcl.addEventListener("click", () => {
  updt();
});

pre.addEventListener("click", () => {
  rest();
});

mul.addEventListener("keydown", (e) => {
  console.log(e.which);
  if (e.which == 13) {
    if (mul.value == "") {
      alert("This Input field can not be EMPTY");
    } else {
      if ((i * mul.value).toString() == "NaN") {
        alert("Only Enter Numbers");
        mul.value = "";
      } else {
        hm.classList.remove("active");
        container.classList.add("active");
        stp.innerHTML = "0";
      }
    }
  }
});

document.body.addEventListener("keydown", (e) => {
  if ((e.which == 13 || e.which == 32) && (i * mul.value).toString() != "NaN") {
    updt();
  } else if (e.which == 27 || e.which == 8) {
    rest();
  }
});

window.onload = function () {
  hm.classList.add("active");
  mul.focus();
};
