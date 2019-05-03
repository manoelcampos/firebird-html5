

var bird1;

setInterval(draw, 66);

window.onkeydown = function (event){
  const increment = Math.abs(speed);
  if(event.key == "ArrowUp"){
    dy -= increment;
  } else if (event.key == "ArrowDown") {
    dy += increment;
  } else if (event.key == "ArrowLeft") {
    speed = -increment;
  } else if (event.key == "ArrowRight") {
    speed = increment;
  }

  console.log(event);
}
