const add = (val) => {
  input.innerHTML += val;
};

const res = () => {
  input.innerHTML = Math.round(eval(input.innerHTML));
};

const clr = () => {
  input.innerHTML = "";
};

const del = () => {
  let val = input.innerHTML;
  input.innerHTML = val.substring(0, val.length - 1);
};

document.addEventListener("keydown", (e) => {
  if (e.which >= 96 && e.which <= 111) {
    add(e.key);
  } else if(e.which == 13) res();
  else if(e.which == 27) clr();
  else if(e.which == 8) del();
});
