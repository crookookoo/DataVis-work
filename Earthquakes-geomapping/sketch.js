var canvas;
var quakes = [];
var mags = [];

var slidy;
 
function setup() {
  canvas = createCanvas(windowWidth, windowHeight); // full window p5 canvas
  canvas.parent('map'); // make p5 and leaflet use the same canvas (and z-index)
  leaflet();  // load leaflet functions and creat map and defined view
  loadStrings("http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.csv", parseSource);  // load source, parse when done

  var text = createDiv('');
      text.id("top-bg");
      text.position(0,0);

  var text = createDiv('<b>Earthquakes last week</b>');
      text.id("top");
      text.position(30,35);

  slidy = createSlider(0,100,1);
      slidy.id("top");
      slidy.position(30,35);

  var text = createDiv('Min magnitude');
      text.id("top");
      text.position(width-250,35);

  // var text = createDiv('0');
  //     text.id("tiny");
  //     text.position(width-143,50);

  // var text = createDiv('10');
  //     text.id("tiny");
  //     text.position(width-52,50);

  sl = createDiv(slidy.value()/10 +" RS");
      sl.id("tiny");
      sl.position(width-146+slidy.value(),20);


}

var sl;

function draw() {
  // ellipse(mouseX, mouseY, 10, 10);  // check what's going on in p5 canvas layer
  background(35,35,35);

  for(var i=1; i<mags.length;i++)
  {
    if(mags[i]<slidy.value()/10)
      quakes[i].setRadius(0);
    else
      quakes[i].setRadius(mags[i]);
  }
  sl.remove();


  sl = createDiv(slidy.value()/10 + " RS");
      sl.id("tiny");
      sl.position(width-146+slidy.value(),20);
}


function clr(mag){
  switch (floor(mag)){
    case 0:
      return '#556e95';
      break;

    case 1:
      return '#7a7f73';
      break;
     
    case 2:
      return '#ae9042';
      break;
     
    case 3:
      return '#ce8e26';
      break;
      
    case 4:
      return '#dd6c21';
      break;
     
    case 5:
      return '#e34121';
      break;
     
    case 6:
      return '#e61e21';
      break;
     
    case 7:
      return '#e90221';
      break;
     
    case 8:
      return '#e80022';
      break;
    
    case 9:
      return '#ff0027';
      break;
}
}

function parseSource(data) {
  for (var i = 1; i < data.length; i++) {
  	var row = split(data[i], ",");	// split every row by the comma
    mags[i] = row[4];
    quakes[i] = L.circleMarker([row[1], row[2]],{
       //radius : row[4]*row[4]*200,
       stroke: true,
       color: '#232323',
       weight: 1,
       opacity: 0.3,  
       fillOpacity: 0.8,
    	 fillColor: clr(row[4]),
    	 //opacity: row[4]*10
    });

    var t = row[0];
    var hr = t.charAt(11) + t.charAt(12);
    var mn = t.charAt(14) + t.charAt(15);

    var p=row[13].substr(1);

    quakes[i].addTo(map).setRadius(mags[i]).bindPopup("<b>"+row[4]+"</b> RS, "+row[3]+" km deep" + " <br> " + hr+":"+mn+", "+p);  // make new labeled markers at lat, lon, 
    
    quakes[i].on('mouseover', function (e) {
            this.openPopup();
        });
    quakes[i].on('mouseout', function (e) {
            this.closePopup();
        });

//row[4]*row[4]/3

  }
}