// P5.js experiment boilerplate
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
var result;
var dmax = 0;

//var table;
//var rows = [];
var al = []
result = new p5.Table();

var quakes = [];

function preload() {
  result = loadTable('all_day2.csv','header');
 // console.log("hi");
}

// the god damn callback doesn't work at all

// function getQuakes(data){
//  // make objects from the json
//  console.log("ok");
//  asdasd;

//  for(var i=0; i<data.length; i++){
//   quakes[i] = new Quake(data[i]);
//    }
// }


function setup() {

  console.log(result);
  // console.log(result.rows.length);
  // for (var i = 0; i < result.rows.length; i++) {
  //   for (var j = 0; j < result.columns.length; j++ ) {
  //     console.log(result.columns[j] +': '+ result.rows[i].getString(j) );
  //   }
  //   console.log('---');
  // }
//  console.log(result.rows[2].getString(5));

	createCanvas(windowWidth, windowHeight);
	x=windowWidth/2;
	y=windowHeight/2;

      noStroke();

  // text(result[23],20,80);


  // loadJSON("table.json", makeStates);


  // var i;

  //var rows = result.findRows('AL', 'Recipient_State');
  
  // console.log(rows[34].getFloat("Dollar_Amount_Invested"));

  // for (var i = 0; i < rows.length; i++){
  //   al[i] = rows[i].getFloat("Dollar_Amount_Invested");
  // }

   //console.log(al[3]);


  for (var i=0; i<result.getRowCount();i++) {
  
    var d = result.rows[i].get(3);
  
    if(parseFloat(d)>dmax) dmax=parseFloat(d);
  
  }

  for (var i=0; i<result.getRowCount();i++) {

    //var g = result.getRow(i);

    var t = result.rows[i].get(0);
    var d = result.rows[i].get(3);
    var m = result.rows[i].get(4);
    var p = result.rows[i].get(13);
  //conssdfsole.log(quakes.length);

    quakes[i] = new Quake(t,d,m,p);
    //i++;
  }


  
 console.log(dmax); 

//  console.log(message);

}


function Quake(t,d,m,p){

  var hr = t.charAt(11) + t.charAt(12);
  var mn = t.charAt(14) + t.charAt(15);

  // time → x | depth → y

  p=p.substr(1);


  //cheating here, need to find max time in the data
  x = (parseFloat(hr)*60 + parseFloat(mn) - 4*60-8)*width/1440;
  if(x<0) x=width+x;

  y = parseFloat(d);
  y = map(y,0,dmax+50,height/5,height-50);
  
  var mag = parseFloat(m);

 // console.log(mag);
  
  var pos = new p5.Vector(x,y);  

  this.display = function(){
  
    fill(255,50,50,20);
    noStroke();
    var r = mag*mag;
    if(r<1) r=1;
    // bad code lazy eugene
    
    ellipse(pos.x,pos.y,r,r);
    
    // noFill();
    // stroke(255,30);

    fill(255,70,70,100);

    for(var i=0;i<2;i++){
        ellipse(pos.x,pos.y,0.6*r,0.6*r);
        r=0.6*r;
    }

    if(mag>4.5){ 
      var text = createP(p);
      text.id("sub");
      text.position(pos.x+13,pos.y-13);
    }
    var m = new p5.Vector(mouseX,mouseY);
    


    if(m.dist(pos)<1+mag*mag){

      var text = createDiv("<b>"+mag+"</b> RS, "+d+" km deep");
      text.id("top");
      text.position(pos.x-2,0.06*height);
      
      var text = createDiv(hr+":"+mn+", "+p);
      text.id("sub");
      text.position(pos.x-2,0.06*height+20);


      stroke(255,30);
      line(pos.x,pos.y,pos.x,0.06*height+32);


    }

    }
    
    //   text(p,pos.x+5,pos.y+20);
    //   text(d,pos.x+5,pos.y+40);
    // 
  

  

}

function draw(){
  stats.begin();
  removeElements();

  background(20,20,30);

  noStroke();

  fill(255,255,255,4);
  var yl = map(50,0,dmax+50,height/5,height-50);
  rect(0,height/5,width,height/5-yl-2);
  rect(0,height/5,width,4*(height/5-yl-2)/5);
  rect(0,height/5,width,3*(height/5-yl-2)/5);
  rect(0,height/5,width,2*(height/5-yl-2)/5);
  rect(0,height/5,width,(height/5-yl-2)/5);




  fill(0,0,0,50);
  var yl = map(10,0,dmax+50,height/5,height-50);
  rect(0,yl,width,height/5-yl);


  fill(255,0,0,6);



  var yl = map(10,0,dmax+50,height/5,height-50);
  rect(0,yl-2,width,height-yl-2);

  var yl = map(100,0,dmax+50,height/5,height-50);
  rect(0,yl-2,width,height-yl-2);

  var yl = map(350,0,dmax+50,height/5,height-50);
  rect(0,yl-2,width,height-yl-2);

  

      var text = createP("EARTHQUAKES FEED: PAST DAY");
      text.id("top");
      text.position(12,10);

      var text = createP("USGS Earthquakes");
      text.id("sub");
      text.style("text-align:right;");
      text.position(width-125,10);


  for(var i=0;i<quakes.length;i++)
  quakes[i].display();
  
  var zero = map(0,0,dmax+50,height/5,height-50);
  var ten = map(10,0,dmax+50,height/5,height-50);
  var hundr = map(100,0,dmax+50,height/5,height-50);



  stroke(255,30);


  //cheating again, max time
  for(var i=4;i<28;i++)
  {  var x = (60*(i-4)-8)*width/1440;
    line(x,height/5,x,height/5-6);
    
    if(i%3==0){
     var text = createP(i%24+":00");
      text.id("tiny");
      text.position(x,height/5-22);   
  }
}

  for(var i = 0; i<floor(dmax/100)+1;i++){
    var yl = map(i*100,0,dmax+50,height/5,height-50);
    
    //if(i==0) line(0,yl-3,width,yl-3);
    line(0,yl-3,6,yl-3);

    if(i>0){
    var text = createP(i*100+" km");
      text.id("tiny");
      text.position(10,yl-12);
    }
  }

  var yl = map(-50,0,dmax+50,height/5,height-50);
  line(0,yl-3,6,yl-3);
    var text = createP("Stratosphere");
      text.id("tiny");
      text.position(10,yl-12);
    




  


    // r = table.length;
    // console.log(r);

  stats.end();
}

