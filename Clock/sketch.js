// P5.js experiment bolerplate
// Eugene Krivoruchko

// - - - - - - - - - - -

// STATS
     
    var stats = new Stats();
    stats.setMode( 0 );

    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    
    stats.domElement.style.display = 'none';         //  ←
    
    document.body.appendChild( stats.domElement );

// - - - - - - - - - - -

// DAT.GUI

// window.onload = function() {
//   var gui = new dat.GUI();

//   gui.add(window, 'rad', 10, 1000);
 
// };

// - - - - - - - - - - -

function setup() {

	createCanvas(windowWidth, windowHeight);
	x=windowWidth/2;
	y=windowHeight/2;

  r = 1/2 * 8/PI * min(width,height);
  theta = PI/12 + hour()*PI/6 - PI/2;

  cx = width/2 - r*cos(theta);
  cy = height/2- r*sin(theta);

}

function draw(){
  stats.begin();

// Color scheme
  night=true;
  if(hour()>6 && hour()<18) night=false;

  bg = color(30,30,35);
  if(night) hr = color(0);
       else hr = color(230); 
  mn = color(236,64,99);

 	 background(bg);

   noFill();
   strokeCap(SQUARE);
   strokeWeight(3);

// Full circle
// stroke(50);
// ellipse(cx,cy,2*r,2*r);

// Hour arc

   strokeWeight(5);
   stroke(hr);
   arc(cx,cy,2*r,2*r,theta-PI/12,theta+PI/12)

// Marks
   
   strokeWeight(10);
   dth = 0.0005;
   dr = 110;
   arc(cx,cy,2*r+dr,2*r+dr, theta-dth,theta+dth);
   arc(cx,cy,2*r+dr,2*r+dr, theta-PI/24-dth,theta-PI/24+dth);
   arc(cx,cy,2*r+dr,2*r+dr, theta+PI/24-dth,theta+PI/24+dth);

// Minutes arc

   strokeWeight(5);
   mindec = map(minute(),0,59,0,1);
   stroke(mn);
   arc(cx,cy,2*r+50,2*r+50,theta-PI/12,theta-PI/12+mindec*PI/6)

// Seconds bulb
   
   strokeWeight(second()/5);
   strokeCap(ROUND);
   arc(cx,cy,2*r+50,2*r+50,theta-PI/12+mindec*PI/6-0.001,theta-PI/12+mindec*PI/6-0.0005)

  stats.end();
}

