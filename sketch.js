let time = 0;
let slider,radiusSlider,speedSlider;
let STAGE_WIDTH = 800;
const STAGE_HEIGHT = 400;
const colors = [
  "#2EC4B6",
  "#EFDC05",
  "#EFDC05",
  "#E53A40",
  "#2EC4B6"
]
let positions = []


function setup() {
  STAGE_WIDTH = windowWidth;
  createCanvas(STAGE_WIDTH, STAGE_HEIGHT);
  //createCanvas(1200, 400);
    slider = createSlider(1,10,5);
    radiusSlider = createSlider(10,100,100);
    speedSlider = createSlider(1,100,50);

}
wave_locations = [];
function getRadius(N) {
  if (N <= 0) return 0;
  return (radiusSlider.value() || 100) * (4 / (N * PI));
}

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
    strokeWeight(0.5)
    ellipse(x, y, radius * 2);
    let prev_x = x,
      prev_y = y;
    x += radius * cos(n * time);
    y += radius * sin(n * time);
    stroke(0)
    line(prev_x, prev_y, x, y);
    fill(0)
    ellipse(x, y, 4);

    stroke(0);
    noFill();

    fill(0);
    if(positions[i].length < radiusSlider.value() * 100){
        positions[i].push({x,y});
    }
    for(let k = 0; k < positions[i].length;k++){
        stroke(colors[(n-1)%5]);
        strokeWeight(1.5)
        point(positions[i][k].x,positions[i][k].y)
    }


  }

  return { x, y, radius };
}
function draw() {
  background("#f7f7f7");
  strokeWeight(0.5)
  radiusSlider.changed(() => positions = [])

  line(0,STAGE_HEIGHT/2, STAGE_WIDTH,STAGE_HEIGHT/2)

  translate(300, 200);
  radius = getRadius(1);

  let { x, y } = getPosition(slider.value(), time);
  wave_locations.unshift(y);
    stroke("#ef5285");
    strokeWeight(1)
  line(x, y, 210, y);

  //console.log(wave_locations);
  translate(210, 0);
  beginShape();
  for (let i = 0; i < wave_locations.length; i++) {
    stroke(0);
    noFill();
    
      strokeWeight(1);
      vertex(i, wave_locations[i]);

    
  }
  endShape();
  time += speedSlider.value() / 1000;
  if (wave_locations.length > 1000) {
    wave_locations.pop();
  }
}
