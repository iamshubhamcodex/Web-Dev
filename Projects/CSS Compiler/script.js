let css1 = document.querySelector("textarea");
let com = document.querySelector("p");

let ar = [
  "padding",
  "margin",
  "height",
  "width",
  "top",
  "left",
  "justify-content",
  "position",
  "justify-items",
  "box-sizing",
  "font-size",
  "display",
  "align-items",
  "border",
  "bottom",
  "border-radius",
  "content",
  "min-width",
  "max-width",
  "min-height",
  "max-height",
  "font-family",
  "background",
  "text-align",
  "flex-direction",
  "box-shadow",
  "flex",
  "color",
];
let hm = new Map();
let style = "";
let inB = false;
let tab = 0;

function getCss() {
  css = css1.value
    .replaceAll("\n", "")
    .replaceAll("\t", "")
    .replaceAll(",", ", ");
  let p1 = 0,
    p2 = 0;
  let tem = "";
  for (let a = 0; a < len(css); a++) {
    if (css.charAt(a) == "{") {
      tab++;
      inB = true;
      p2 = a + 1;
      tem += analyze(css.substring(p1, p2 - 1)) + " {\n";
      p1 = p2;
    } else if (css.charAt(a) == "}") {
      inB = false;
      p2 = a + 1;
      tem += conv(css.substring(p1, p2 - 1)) + "\n}\n";
      p1 = p2;
      tab--;
    }
  }
  tem += css.substring(p1, len(css));

  com.innerHTML = `<pre>${tem}</pre>`;
}
function analyze(val) {
  let retS = "";
  let p1 = (p2 = 0);
  for (let i = 0; i < len(val); i++) {
    if (val.charAt(i) === "," && inB) {
      p2 = i;
      retS += val.substring(p1, p2 + 1) + "\n";
      p1 = p2 + 2;
    } else if (val.charAt(i) === "*" && val.charAt(i + 1) === "/") {
      p2 = i;
      retS += val.substring(p1, p2 + 2) + "\n";
      p1 = p2 + 2;
    }
  }
  retS += val.substring(p1, len(val));
  return retS;
}
function len(val) {
  return val.length;
}
function conv(style) {
  let spSty = style.split(";"),
    styleUp = "";

  for (let j = 0; j < len(spSty); j++) {
    let change = spSty[j].trim().split(":"),
      ct = change[0].trim();

    if (ct.charAt(0) === "/") {
      for (let b = 1; b < len(ct); b++) {
        if (ct.charAt(b) === "/") {
          styleUp += " " + ct.substring(0, b + 1);
          ct = ct.substring(b + 1, ct.length).trim();
          break;
        }
      }
    }
    change[1] === undefined
      ? ""
      : (styleUp +=
          (j === 0 ? "" : "\n") +
          "\t" +
          (hm.get(ct) === undefined ? ct : hm.get(ct)) +
          " : " +
          change[1].trim() +
          ";");
  }
  return styleUp;
}
function fillM() {
  for (let i = 0; i < len(ar); i++) {
    let s,
      tar = ar[i],
      ars = tar.split("-");

    s = tar.includes("-")
      ? retSH(toS(ars[0].charAt(0)), toS(ars[1].charAt(0)), ars[0])
      : retS(tar, toS(tar.charAt(0)));
    hm.set(s, tar);
  }
}

function retSH(fir, sec, upf) {
  let ch = fir + "-" + sec;
  return check(ch) ? retSH(upf.substring(0, len(fir) + 1), sec, upf) : ch;
}

function retS(val, upv) {
  return check(upv) ? retS(val, val.substring(0, len(upv) + 1)) : upv;
}

function check(s) {
  return hm.has(s);
}

function toS(s) {
  return s.toString();
}

fillM();
getCss();
console.log(hm);
css1.addEventListener("keyup", () => {
  getCss();
});
