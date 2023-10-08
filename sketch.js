let dataSet;
let dataPoint;
let yearSlider;
let yearSelected = 2010;
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
}

function setup()
{
  createCanvas(windowWidth, windowHeight);
  background(0);

  dataPoint = Object.values(dataSet);

  textSize(16);
  fill(255);
  text("Year Selected: ", width-250, height-(height-75));

  yearSlider = createSlider(yearSelected, 2014, yearSelected, 1);
  yearSlider.position(width-250,25);
  yearSlider.style("width", "200px");

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
}

function circleStyleTemp(strokeForTemp)
{
  noFill();
  strokeWeight(1);
  if(strokeForTemp <= -10)
  {
    stroke('Cyan');
  }
  else if(strokeForTemp > -10 && strokeForTemp <= 0)
  {
    stroke('Blue');
  }
  else if(strokeForTemp > 0 && strokeForTemp <= 20)
  {
    stroke('Yellow');
  }
  else if(strokeForTemp > 20 && strokeForTemp <= 35)
  {
    stroke('Orange');
  }
  else if(strokeForTemp > 35)
  {
    stroke('Red');
  }
}

function circleStylePM25(strokeForPM25)
{
  noFill();
  strokeWeight(1);
  if(strokeForPM25 >= 0 && strokeForPM25 <= 200)
  {
    stroke('Chartreuse');
  }
  else if(strokeForPM25 > 200 && strokeForPM25 <= 400)
  {
    stroke('DarkGreen');
  }
  else if(strokeForPM25 > 400 && strokeForPM25 <= 600)
  {
    stroke('Yellow');
  }
  else if(strokeForPM25 > 600 && strokeForPM25 <= 800)
  {
    stroke('Orange');
  }
  else if(strokeForPM25 > 800)
  {
    stroke('Red');
  }
}

function circleStylePress(strokeForPress)
{
  noFill();
  strokeWeight(1);
  if(strokeForPress <= 1000)
  {
    stroke('GreenYellow');
  }
  else if(strokeForPress > 1000 && strokeForPress <= 1010)
  {
    stroke('LawnGreen');
  }
  else if(strokeForPress > 1010 && strokeForPress <= 1025)
  {
    stroke('MediumSpringGreen');
  }
  else if(strokeForPress > 1025 && strokeForPress <= 1040)
  {
    stroke('MediumSeaGreen');
  }
  else if(strokeForPress > 1040)
  {
    stroke('Green');
  }
}

function circleStyleDewp(strokeForDewp)
{
  noFill();
  strokeWeight(1);
  if(strokeForDewp <= -20)
  {
    stroke('Cyan');
  }
  else if(strokeForDewp > -20 && strokeForDewp <= 0)
  {
    stroke('DeepSkyBlue');
  }
  else if(strokeForDewp > 0 && strokeForDewp <= 15)
  {
    stroke('Blue');
  }
  else if(strokeForDewp > 15 && strokeForDewp <= 25)
  {
    stroke('DarkBlue');
  }
  else if(strokeForDewp > 25)
  {
    stroke('Indigo');
  }
}

function vizTemp(loopCounter_Initial, loopCounter_Final)
{
  for(let i=loopCounter_Initial; i<loopCounter_Final; i++)
  {
    minTemp = min(minTemp,dataPoint[i].TEMP);
    maxTemp = max(maxTemp,dataPoint[i].TEMP);
  }

  for(let i=loopCounter_Initial; i<loopCounter_Initial+100; i++)
  {
    circleDim = map(dataPoint[i].TEMP, minTemp, maxTemp, 5, 350);
    circleStyleTemp(dataPoint[i].TEMP);
    ellipse(width/6, height/3, circleDim);
  }
}

function vizPM25(loopCounter_Initial, loopCounter_Final)
{
  for(let i=loopCounter_Initial; i<loopCounter_Final; i++)
  {
    minPM25 = min(minPM25,dataPoint[i]["pm2.5"]);
    maxPM25 = max(maxPM25,dataPoint[i]["pm2.5"]);
  }

  for(let i=loopCounter_Initial; i<loopCounter_Initial+100; i++)
  {
    circleDim = map(dataPoint[i]["pm2.5"], minPM25, maxPM25, 5, 350);
    circleStylePM25(dataPoint[i]["pm2.5"]);
    ellipse(width/2, height/3, circleDim);
  }
}

function vizPress(loopCounter_Initial, loopCounter_Final)
{
  for(let i=loopCounter_Initial; i<loopCounter_Final; i++)
  {
    minPress = min(minPress,dataPoint[i].PRES);
    maxPress = max(maxPress,dataPoint[i].PRES);
  }

  for(let i=loopCounter_Initial; i<loopCounter_Initial+100; i++)
  {
    circleDim = map(dataPoint[i].PRES, minPress, maxPress, 5, 200);
    circleStylePress(dataPoint[i].PRES);
    ellipse(width/6, height/1.5, circleDim);
  }
}

function vizDewp(loopCounter_Initial, loopCounter_Final)
{
  for(let i=loopCounter_Initial; i<loopCounter_Final; i++)
  {
    minDewp = min(minDewp,dataPoint[i].DEWP);
    maxDewp = max(maxDewp,dataPoint[i].DEWP);
  }

  for(let i=loopCounter_Initial; i<loopCounter_Initial+100; i++)
  {
    circleDim = map(dataPoint[i].DEWP, minDewp, maxDewp, 5, 350);
    circleStyleDewp(dataPoint[i].DEWP);
    ellipse(width/2, height/1.5, circleDim);
  }
}

function draw()
{
  yearSelected = yearSlider.value();
  switch(yearSelected)
  {
    case 2010:
      counterValue_Initial = 0;
      counterValue_Final = counter2010;

      fill(0);
      strokeWeight(0);
      rect(0, 0, width/1.5, height);
      vizTemp(counterValue_Initial, counterValue_Final);
      vizPM25(counterValue_Initial, counterValue_Final);
      vizPress(counterValue_Initial, counterValue_Final);
      vizDewp(counterValue_Initial, counterValue_Final);
      break;

    case 2011:
      counterValue_Initial = counter2010;
      counterValue_Final = (counter2010 + counter2011);

      fill(0);
      strokeWeight(0);
      rect(0, 0, width/1.5, height);
      vizTemp(counterValue_Initial, counterValue_Final);
      vizPM25(counterValue_Initial, counterValue_Final);
      vizPress(counterValue_Initial, counterValue_Final);
      vizDewp(counterValue_Initial, counterValue_Final);
      break;

    case 2012:
      counterValue_Initial = counter2011;
      counterValue_Final = (counter2010 + counter2011 + counter2012);

      fill(0);
      strokeWeight(0);
      rect(0, 0, width/1.5, height);
      vizTemp(counterValue_Initial, counterValue_Final);
      vizPM25(counterValue_Initial, counterValue_Final);
      vizPress(counterValue_Initial, counterValue_Final);
      vizDewp(counterValue_Initial, counterValue_Final);
      break;

    case 2013:
      counterValue_Initial = counter2012;
      counterValue_Final = (counter2010 + counter2011 + counter2012 + counter2013);

      fill(0);
      strokeWeight(0);
      rect(0, 0, width/1.5, height);
      vizTemp(counterValue_Initial, counterValue_Final);
      vizPM25(counterValue_Initial, counterValue_Final);
      vizPress(counterValue_Initial, counterValue_Final);
      vizDewp(counterValue_Initial, counterValue_Final);
      break;

    case 2014:
      counterValue_Initial = counter2013;
      counterValue_Final = (counter2010 + counter2011 + counter2012 + counter2013 + counter2014);

      fill(0);
      strokeWeight(0);
      rect(0, 0, width/1.5, height);
      vizTemp(counterValue_Initial, counterValue_Final);
      vizPM25(counterValue_Initial, counterValue_Final);
      vizPress(counterValue_Initial, counterValue_Final);
      vizDewp(counterValue_Initial, counterValue_Final);
      break;
  }
}

function mousePressed()
{
  noLoop();
}

function mouseReleased()
{
  loop();
}
