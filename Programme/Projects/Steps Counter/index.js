const stp = document.querySelector(".steps");
const pcl = document.querySelector(".container p");
var i = 0;

pcl.addEventListener("click", () => {
    i++;
    stp.innerHTML = (i*14).toString();
    pcl.innerHTML =  i.toString() +  " times Clicked";
})