function cls(val) {
  return document.getElementsByClassName(val);
}
function id(val) {
  return document.getElementById(val);
}

let tll = id("tl-l");
let tlr = id("tl-r");

function update() {
  let ff = tll.value.split("\n"),
    s = "";

  for (let i = 0; i < ff.length; i++) {
    let tx = ff[i],
      cH = 0,
      li = false,
      arr = false,
      hc = false,
      br = false,
      cmnt = false;

    for (let j = 0; j < tx.length; j++) {
      if (tx[0] != "/") {
        if (tx[j] == "#") {
          if (tx[1] == "c") {
            hc = true;
          }
          cH++;
        } else if (tx[0] == "-" && tx[1] == " ") {
          li = true;
          break;
        } else if (tx[0] == ">" && tx[1] == " ") {
          arr = true;
        } else if (tx.substring(0, 2) == "br") {
          br = true;
        } else {
          break;
        }
      } else {
        cmnt = true;
      }
    }
    if (!cmnt) {
      if (!(cH == 0) && cH <= 6) {
        if (hc) {
          s += `<h${cH} style="text-align:center;">${analyze(
            tx.substring(cH + 1)
          )}</h${cH}>`;
        } else {
          s += "<br />";
          s += `<h${cH}>${analyze(tx.substring(cH))}</h${cH}>`;
        }
        if (cH == 1) {
          s += "<hr />";
        }
      } else if (li) {
        s += `<li>${analyze(tx.substring(2))}</li>`;
      } else if (arr) {
        s += `<p class="highlight">${analyze(tx.substring(2))}</p>`;
      } else if (br) {
        s += `<br />`;
      } else {
        s += `<p>${analyze(tx)}</p>`;
      }
    }
  }
  tlr.innerHTML = s;
}
function analyze(val) {
  let s = "",
    llb = 0,
    atit = "",
    ahrf = "",
    lp = 0,
    lb = 0,
    fbh = false,
    lt = "";

  for (let i = 0; i < val.length; i++) {
    if (val[i] == "[") {
      for (let g = i + 1; g < val.length; g++) {
        if (val[g] == "]" && val[g + 1] == "(") {
          atit = val.substring(i + 1, g);
          for (let b = g; b < val.length; b++) {
            if (val[b] == ")") {
              ahrf = val.substring(g + 2, b);
              s += val.substring(llb, i);
              s += `<a href="${ahrf}">${analyze(atit)}</a>`;
              i = b;
              llb = b + 1;
              break;
            }
          }
          break;
        } else if (val[g] == "]") {
          atit = val.substring(i + 1, g);
          s += val.substring(llb, i);
          s += `<a>${atit}</a>`;
          i = g;
          llb = g + 1;
          break;
        } else if (val[g] == "[") {
          break;
        }
      }
    }
    if (val[i] == "{") {
      for (let g = i + 1; g < val.length; g++) {
        if (val[g] == "}") {
          atit = val.substring(i + 1, g);
          s += val.substring(llb, i);
          s += `<span class="cap"><strong>${atit}</strong></span>`;
          i = g;
          llb = g + 1;
          break;
        } else if (val[g] == "{") {
          break;
        }
      }
    }
    if (val[i] == "-" && val[i + 1] == ">") {
      for (let g = i + 1; g < val.length; g++) {
        if (g == val.length - 1) {
          let afir = val.substring(i + 2, i + 3);
          atit = val.substring(i + 3);
          s += val.substring(llb, i);
          s += `<span><strong>${afir.toUpperCase() + atit}</strong> </span>`;
          i = g;
          llb = g + 1;
        }
        if (val[g] == " ") {
          let afir = val.substring(i + 2, i + 3);
          atit = val.substring(i + 3, g);
          s += val.substring(llb, i);
          s += `<span><strong>${afir.toUpperCase() + atit}</strong> </span>`;
          i = g;
          llb = g + 1;
          break;
        }
      }
    }
    if (val[i] == "`") {
      for (let g = i + 1; g < val.length; g++) {
        if (val[g] == "`") {
          atit = val.substring(i + 1, g);
          s += val.substring(llb, i);
          s += `<span class="red">${atit}</span>`;
          i = g;
          llb = g + 1;
          break;
        }
      }
    }
    if (val[i] == "*") {
      for (let g = i + 1; g < val.length; g++) {
        if (g == val.length - 1) {
          atit = val.substring(i + 1);
          s += val.substring(llb, i);
          s += `<span class="cap">${atit} </span>`;
          i = g;
          llb = g + 1;
        }
        if (val[g] == " ") {
          atit = val.substring(i + 1, g);
          s += val.substring(llb, i);
          s += `<span class="cap">${atit} </span>`;
          i = g;
          llb = g + 1;
          break;
        }
      }
    }
    if (val[i] == "^") {
      for (let g = i + 1; g < val.length; g++) {
        if (val[g] == "^") {
          atit = val.substring(i + 1, g);
          s += val.substring(llb, i);
          s += `<span class="upr">${atit}</span>`;
          i = g;
          llb = g + 1;
          break;
        }
      }
    }
  }
  s += val.substring(llb);

  return `${s}`;
}
update();

// window.addEventListener("resize", () => {
//   console.log("window is resizing");
// });

// let bl = cls("box-l")[0];
// tll.addEventListener("keydown", (e) => {
//   console.log(e);
  //   if (e.target != bl && e.target != tll) {
  //     tll.style.visibility = "hidden";
  //   } else {
  //     tll.style.visibility = "visible";
  //   }
  // });
  // document.addEventListener("mousemove", (e) => {
// });