let res = document.getElementById("res"),
  secs = document.getElementById("secs"),
  minutes = document.getElementById("minutes"),
  hours = document.getElementById("hours"),
  days = document.getElementById("days"),
  mon = document.getElementById("mon"),
  btn = document.getElementById("btn"),
  err = document.getElementById("err");

function calc() {
  let end = document.getElementById("end").value;

  if (end == "now" || end == "today") {
    setInterval(() => {
      calcM();
    }, 1000);
  } else {
    calcM();
  }
}
function calcM() {
  let d = new Date(),
    day = d.getDate(),
    month = d.getMonth() + 1,
    year = d.getFullYear(),
    hour = 0,
    min = 0,
    sec = 0;

  let start = document.getElementById("start").value,
    end = document.getElementById("end").value,
    syear = (smon = sday = eyear = emon = eday = 0),
    firs = true;

  if (start == "" || end == "") {
    firs = true;
  } else {
    firs = false;
  }

  if (start == "birth") {
    start = "14/07/2003";
  }
  if (end == "now" || end == "today") {
    end = (day + "/" + month + "/" + year).toString();
    (hour = d.getHours()), (min = d.getMinutes()), (sec = d.getSeconds());
  }

  let sc = check(start),
    ec = check(end);

  if (ec - sc >= 0) {
    let str = start.split("/"),
      en = end.split("/");

    (syear = str[2]), (smon = str[1]), (sday = str[0]);
    (eyear = en[2]), (emon = en[1]), (eday = en[0]);
    err.innerText = "";
  } else {
    res.innerHTML =
      secs.innerHTML =
      minutes.innerHTML =
      hours.innerHTML =
      days.innerHTML =
      mon.innerHTML =
        "";
    err.innerText = firs ? "Please Enter a Date" : "Please Enter a valid Date";
    console.log(firs);
    return;
  }
  let rday = eday - sday,
    rmon = emon - smon,
    ryear = eyear - syear;

  if (rday < 0) {
    adAr = [1, -2, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1];
    rday = 30 + adAr[smon - 1] + rday;
    rmon--;
  }
  if (rmon < 0) {
    rmon = 12 + rmon;
    ryear--;
  }

  let td = totDay(rday, smon, emon, rmon, syear, eyear, ryear) - 1;
  secs.innerHTML = `${format(
    true,
    td * 24 * 60 * 60 + hour * 24 * 60 + min * 60 + sec
  )} <span>seconds</span>`;
  minutes.innerHTML =
    format(true, td * 24 * 60 + hour * 24 + min) + "<span>minutes</span>";
  hours.innerHTML = `${format(true, td * 24 + hour)} <span>hours</span>`;
  days.innerHTML = `${format(true, td)} <span>days</span>`;
  mon.innerHTML = `${format(
    true,
    totMon(rmon, ryear)
  )} <span>months and</span> ${rday} <span>days</span>`;
  res.innerHTML = `${format(
    true,
    ryear
  )} <span>years and</span> ${rmon} <span>months and</span> ${rday} <span>days</span>`;
}
function totMon(rmonth, ryear) {
  let tmon = 0;
  if (ryear > 0) {
    tmon += ryear * 12;
  }
  tmon += rmonth;
  return tmon;
}
function totDay(rday, smonth, emonth, rmonth, syear, eyear, ryear) {
  tday = 0;
  if (syear != eyear) {
    tday += ryear * 365;
    for (let y = syear; y <= eyear; y++) {
      if (y % 4 == 0) {
        tday++;
      }
    }
    if (syear % 4 == 0 && smonth > 2) {
      tday--;
    } else if (eyear % 4 == 0 && emonth < 2) {
      tday--;
    }
  }
  tday += 30 * rmonth + addDay(smonth, emonth);
  return tday + rday;
}
function addDay(smon, emon, year = 0) {
  let add = 0;
  addAr = [1, -2, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1];
  if (year > 0) {
    add += year * 7;
  }
  for (let i = smon - 1; i < emon; i++) {
    add += addAr[i];
  }
  return add;
}
function format(ind, numb) {
  let num = numb.toString();

  if (!(num.length < 4)) {
    let s = "",
      ty = ind ? 2 : 3,
      len = ind ? num.length - 3 : num.length,
      loop = len % ty,
      i = loop,
      min = ty == 3 ? 3 : 0;

    s += loop != 0 ? num.substring(0, loop) + "," : "";
    while (i < len - min) {
      s += num.substring(i, i + ty) + ",";
      i += ty;
    }
    s += ind ? num.substring(i, len + 3) : num.substring(i, len);
    return s;
  } else return num;
}
function check(val) {
  let adAr = [1, -2, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1];
  let sp = val.split("/");
  if (
    !(sp[0] > 30 + adAr[sp[1] - 1] && sp[0 < 1]) &&
    !(sp[1] > 12 && sp[1] < 1)
  ) {
    return sp[2];
  } else return -99999;
}

btn.click();
