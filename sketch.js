let dataSet;
let dataPoint;
let projectFont;
let radioButton;
let yearSelected;
let counterValue_Initial = 0;
let counterValue_Final = 0;

let counter2010 = 0;
let counter2011 = 0;
let counter2012 = 0;
let counter2013 = 0;
let counter2014 = 0;

let minTemp = 0;
let maxTemp = 0;
let minDewp = 0;
let maxDewp = 0;
let minPress;
let maxPress = 0;
let minPM25;
let maxPM25;

let circleDim = 0;

function preload()
{
  dataSet = loadJSON("https://dm-gy-6063-2023f-d.github.io/assets/homework/05/Beijing-PM2.5/Beijing-PM2.5.json");
  projectFont = loadFont("./Rubik.ttf");
}

function setup()
{
  createCanvas(windowWidth, windowHeight);
  background(0);
  dataPoint = Object.values(dataSet);

  radioButton = createRadio();
  radioButton.option('2010');
  radioButton.option('2011');
  radioButton.option('2012');
  radioButton.option('2013');
  radioButton.option('2014');
  
  radioButton.position(width/1.54, height-(height-175));
  radioButton.style("width","350px");
  radioButton.style("font-family","Rubik");
  radioButton.style("font-size","20px");

  for(let i=0; i<dataPoint.length; i++)
  {
    switch(dataPoint[i].year)
    {
      case 2010:
        counter2010++;
        break;
      case 2011:
        counter2011++;
        break;
      case 2012:
        counter2012++;
        break;
      case 2013:
        counter2013++;
        break;
      case 2014:
        counter2014++;
        break;
    }
  }
  
  textInit();
}

function circleStyleTemp(strokeForTemp)
{
  noFill();
  strokeWeight(1);
  if(strokeForTemp <= -10)
  {
    stroke('Cyan');
  }
  else if(strokeForTemp > -10 && strokeForTemp <= 5)
  {
    stroke('Blue');
  }
  else if(strokeForTemp > 5 && strokeForTemp <= 10)
  {
    stroke('Yellow');
  }
  else if(strokeForTemp > 10 && strokeForTemp <= 25)
  {
    stroke('Orange');
  }
  else if(strokeForTemp > 25)
  {
    stroke('Red');
  }
}

function circleStylePM25(strokeForPM25)
{
  noFill();
  strokeWeight(1);
  if(strokeForPM25 >= 0 && strokeForPM25 <= 100)
  {
    stroke('Chartreuse');
  }
  else if(strokeForPM25 > 100 && strokeForPM25 <= 250)
  {
    stroke('DarkGreen');
  }
  else if(strokeForPM25 > 250 && strokeForPM25 <= 400)
  {
    stroke('Yellow');
  }
  else if(strokeForPM25 > 400 && strokeForPM25 <= 500)
  {
    stroke('Orange');
  }
  else if(strokeForPM25 > 500)
  {
    stroke('Red');
  }
}

function circleStylePress(strokeForPress)
{
  noFill();
  strokeWeight(1);
  if(strokeForPress <= 1010)
  {
    stroke('GreenYellow');
  }
  else if(strokeForPress > 1010 && strokeForPress <= 1015)
  {
    stroke('LawnGreen');
  }
  else if(strokeForPress > 1015 && strokeForPress <= 1025)
  {
    stroke('MediumSpringGreen');
  }
  else if(strokeForPress > 1025 && strokeForPress <= 1035)
  {
    stroke('MediumSeaGreen');
  }
  else if(strokeForPress > 1035)
  {
    stroke('Green');
  }
}

function circleStyleDewp(strokeForDewp)
{
  noFill();
  strokeWeight(1);
  if(strokeForDewp <= -23)
  {
    stroke('Cyan');
  }
  else if(strokeForDewp > -23 && strokeForDewp <= -18)
  {
    stroke('DeepSkyBlue');
  }
  else if(strokeForDewp > -18 && strokeForDewp <= -10)
  {
    stroke('Blue');
  }
  else if(strokeForDewp > -10 && strokeForDewp <= -2)
  {
    stroke('DarkBlue');
  }
  else if(strokeForDewp > -2)
  {
    stroke('BlueViolet');
  }
}

function vizData(loopCounter_Initial, loopCounter_Final)
{
  for(let i=loopCounter_Initial; i<loopCounter_Final; i++)
  {
    minTemp = min(minTemp,dataPoint[i].TEMP);
    maxTemp = max(maxTemp,dataPoint[i].TEMP);

    minPM25 = min(minPM25,dataPoint[i]["pm2.5"]);
    maxPM25 = max(maxPM25,dataPoint[i]["pm2.5"]);

    minPress = min(minPress,dataPoint[i].PRES);
    maxPress = max(maxPress,dataPoint[i].PRES);

    minDewp = min(minDewp,dataPoint[i].DEWP);
    maxDewp = max(maxDewp,dataPoint[i].DEWP);
  }

  for(let i=loopCounter_Initial; i<loopCounter_Initial+1000; i++)
  {
    circleDim = map(dataPoint[i].TEMP, minTemp, maxTemp, 10, 400);
    circleStyleTemp(dataPoint[i].TEMP);
    ellipse(width/6, height/3.5, circleDim);

    circleDim = map(dataPoint[i]["pm2.5"], minPM25, maxPM25, 10, 350);
    circleStylePM25(dataPoint[i]["pm2.5"]);
    ellipse(width/2.5, height/3.5, circleDim);

    circleDim = map(dataPoint[i].PRES, minPress, maxPress, 10, 265);
    circleStylePress(dataPoint[i].PRES);
    ellipse(width/6, height/1.3, circleDim);

    circleDim = map(dataPoint[i].DEWP, minDewp, maxDewp, 5, 420);
    circleStyleDewp(dataPoint[i].DEWP);
    ellipse(width/2.5, height/1.3, circleDim);
  }
}

function textInit()
{
  fill(255);
  strokeWeight(0);
  textSize(32);
  textFont(projectFont);
  text("BEIJING AIR QUALITY", width/1.52, height-(height-100));
  textSize(15);
  fill(255,0,0);
  text("- INTERACTIVE DATA VISUALIZATION -", width/1.49, height-(height-122));

  fill(255);
  textSize(18);
  text("<< Select Year >>", width/1.41, height-(height-160));
}

function textGen()
{
  fill(255);
  strokeWeight(0);
  textSize(25);
  textFont(projectFont);
  text("TEMPERATURE", width/8.75, height/10);
  text("PM2.5", width/2.65, height/10);
  text("PRESSURE", width/8, height/1.75);
  text("DEW POINT", width/2.8, height/1.75);

  textInit();
}

function draw()
{
  yearSelected = radioButton.value();
  switch(yearSelected)
  {
    case '2010':
      counterValue_Initial = 0;
      counterValue_Final = counter2010;

      fill(0);
      strokeWeight(0);
      rect(0, 0, width, height);

      vizData(counterValue_Initial, counterValue_Final);
      textGen();
      break;

    case '2011':
      counterValue_Initial = counter2010;
      counterValue_Final = (counter2010 + counter2011);

      fill(0);
      strokeWeight(0);
      rect(0, 0, width, height);

      vizData(counterValue_Initial, counterValue_Final);
      textGen();
      break;

    case '2012':
      counterValue_Initial = counter2011;
      counterValue_Final = (counter2010 + counter2011 + counter2012);

      fill(0);
      strokeWeight(0);
      rect(0, 0, width, height);

      vizData(counterValue_Initial, counterValue_Final);
      textGen();
      break;

    case '2013':
      counterValue_Initial = counter2012;
      counterValue_Final = (counter2010 + counter2011 + counter2012 + counter2013);

      fill(0);
      strokeWeight(0);
      rect(0, 0, width, height);

      vizData(counterValue_Initial, counterValue_Final);
      textGen();
      break;

    case '2014':
      counterValue_Initial = counter2013;
      counterValue_Final = (counter2010 + counter2011 + counter2012 + counter2013 + counter2014);

      fill(0);
      strokeWeight(0);
      rect(0, 0, width, height);
      
      vizData(counterValue_Initial, counterValue_Final);
      textGen();
      break;
  }
}