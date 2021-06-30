const stp = document.querySelector(".steps");
const pcl = document.querySelector(".cm");
const pre = document.querySelector(".rm");
var mul = document.querySelector(".inp");
var i = 0;

pcl.addEventListener("click", () => {
    i++;
    stp.innerHTML = (i*(mul.value)).toString();
    pcl.innerHTML =  i.toString() +  " times Clicked";
});

pre.addEventListener("click", () => {
    i = 0;
    mul.value = "";
    stp.innerHTML = "0";
    pcl.innerHTML =  "Click Me";
});