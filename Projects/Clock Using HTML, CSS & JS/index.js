let alarm = false,
  stpwatch = false,
  timer = false,
  tim = "",
  hrt = "",
  mint = "",
  sect = "",
  hrs = 0,
  mins = 0,
  secs = 1;

const aud = new Audio("alarm.mp3");

function setAlarm() {
  alarm = true;
}
function setTimer() {
  tim = document.getElementById("timer_inp").value;
  hrt = tim.split("-")[0];
  mint = tim.split("-")[1];
  sect = tim.split("-")[2];

  document.getElementsByClassName("time_span")[0].classList.remove("d-none");
  document.getElementById("timer_inp").value = "";
  timer = true;
}
function setStp() {
  document.getElementsByClassName("stp")[0].classList.remove("d-none");
  document.getElementsByClassName("strt")[0].classList.add("d-none");
  stpwatch = true;
}
function stopS() {
  document.getElementsByClassName("stp")[0].classList.add("d-none");
  document.getElementsByClassName("strt")[0].classList.remove("d-none");
  stpwatch = false;
  document.getElementById("stp_time").innerText = "";
  hrs = 0;
  mins = 0;
  secs = 1;
}
function checkA() {
  setAlarm();
  alert("Alarm Set");
}
function checkS() {
  setStp();
}
function checkT() {
  setTimer();
}
function hide() {
  let all = document.getElementsByClassName("d");
  for (let i = 0; i < all.length; i++) {
    all[i].classList.add("d-none");
  }
}

setInterval(() => {
  d = new Date();
  htime = d.getHours();
  mtime = d.getMinutes();
  stime = d.getSeconds();

  if (alarm) {
    let alrm = document.getElementById("inp").value;
    let hra = alrm.split("-")[0];
    let mina = alrm.split("-")[1];
    if (hra == htime && mina == mtime) {
      alert("Alarm rings");
      aud.play();
      alarm = false;
      document.getElementById("inp").value = "";
    }
  }
  if (stpwatch) {
    if (hrs == 0) {
      document.getElementById("stp_time").innerText =
        mins + "min " + secs + "s";
      if (mins == 0) {
        document.getElementById("stp_time").innerText = secs + "s";
      } else {
        document.getElementById("stp_time").innerText =
          mins + "min " + secs + "s";
      }
    } else {
      document.getElementById("stp_time").innerText =
        hrs + "hr " + mins + "min " + secs + "s";
    }

    if (secs == 59) {
      if (mins != 59) {
        mins++;
        secs = 0;
      } else {
        if (hrs != 24) {
          hrs++;
          mins = 0;
          secs = 0;
        }
      }
    } else {
      secs++;
    }
  }
  if (timer) {
    if (hrt == 0) {
      document.getElementsByClassName("time_span")[0].innerText =
        mint + "min " + sect + "s";
      if (mint == 0) {
        document.getElementsByClassName("time_span")[0].innerText = sect + "s";
      } else {
        document.getElementsByClassName("time_span")[0].innerText =
          mint + "min " + sect + "s";
      }
    } else {
      document.getElementsByClassName("time_span")[0].innerText =
        hrt + "hr " + mint + "min " + sect + "s";
    }

    if (sect == 0) {
      if (mint != 0) {
        mint--;
        sect = 59;
      } else {
        if (hrt != 0) {
          hrt--;
          mint = 59;
          sect = 59;
        } else {
          aud.play();
          alert("Timer Ends");
          timer = false;
        }
      }
    } else {
      sect--;
    }
  } else {
    document.getElementsByClassName("time_span")[0].classList.add("d-none");
  }

  hrotation = 30 * htime + mtime / 2 + (1 / 120) * mtime;
  mrotation = 6 * mtime + (1 / 10) * stime;
  srotation = 6 * stime;

  hour.style.transform = `rotate(${hrotation}deg)`;
  minute.style.transform = `rotate(${mrotation}deg)`;
  second.style.transform = `rotate(${srotation}deg)`;
}, 1000);

document.getElementById("alrm").addEventListener("mouseover", () => {
  hide();
  document.getElementsByClassName("alarm")[0].classList.remove("d-none");
});
document.getElementById("stp").addEventListener("mouseover", () => {
  hide();
  document.getElementsByClassName("stpwatch")[0].classList.remove("d-none");
});
document.getElementById("tmr").addEventListener("mouseover", () => {
  hide();
  document.getElementsByClassName("timer")[0].classList.remove("d-none");
});
