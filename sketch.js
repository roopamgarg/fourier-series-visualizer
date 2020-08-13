let time = 0;
let slider;
function setup() {
  createCanvas(1200, 400);
    slider = createSlider(1,10,1)
}
wave_locations = [];
function getRadius(N) {
  if (N <= 0) return 0;
  return 100 * (4 / (N * PI));
}
const colors = [
    "#2EC4B6",
    "#EFDC05",
    "#EFDC05",
    "#E53A40",
    "#2EC4B6"
]
let positions = []

function getPosition(N, time) {
  let radius,
    x = 0,
    y = 0;
  for (i = 0; i < N; i++) {
    let n = i * 2 + 1;
    noFill();
    if(positions.length-1 < i){
        positions.push([]);
    }
    let radius = getRadius(n);
    stroke(colors[(n-1)%5]);
    ellipse(x, y, radius * 2);
    let prev_x = x,
      prev_y = y;
    x += radius * cos(n * time);
    y += radius * sin(n * time);
    line(prev_x, prev_y, x, y);

    ellipse(x, y, 8);

    stroke(0);
    noFill();

    fill(0);
    if(positions[i].length < 500){
        positions[i].push({x,y});
    }
    for(let k = 0; k < positions[i].length;k++){
        stroke(colors[(n-1)%5]);
        point(positions[i][k].x,positions[i][k].y)
    }


  }

  return { x, y, radius };
}
function draw() {
  background(255);
  translate(400, 200);
  radius = getRadius(1);

  let { x, y } = getPosition(slider.value(), time);
  wave_locations.unshift(y);
    stroke("#ef5285");
    strokeWeight(2)
  line(x, y, 210, y);

  //console.log(wave_locations);
  translate(210, 0);
  beginShape();
  for (let i = 0; i < wave_locations.length; i++) {
    stroke(0);
    noFill();
    vertex(i, wave_locations[i]);
  }
  endShape();
  time -= 0.05;
  if (wave_locations.length > 1000) {
    wave_locations.pop();
  }
}
