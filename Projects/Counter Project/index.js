let inc = document.querySelectorAll("button")[1];
let dec = document.querySelectorAll("button")[0];
let h = document.querySelectorAll(".curr");
let b = document.querySelectorAll(".before");

let num = 0;

inc.onclick = () => {
  htN(1);
  ntH();
};
dec.onclick = () => {
  htN(-1);
  ntH();
};

function put(s, cr) {
  b[cr].innerHTML = s;
  console.log(b[cr]);
  h[cr].innerHTML !== s ? b[cr].classList.add("translate") : "";
  setTimeout(() => {
    h[cr].innerHTML = s;
    b[cr].classList.remove("translate");
  }, 500);
}
function htN(k) {
  num = parseInt(h[0].innerHTML + h[1].innerHTML + h[2].innerHTML) + k;
}
function ntH() {
  let crr = 0;
  for (let i = 0; i < 3 - num.toString().length; i++, crr++) {
    put("0", crr);
  }
  for (let j = 0; j < num.toString().length; j++, crr++) {
    let s = num.toString().charAt(j);
    put(s, crr);
  }
  crr = 0;
}
