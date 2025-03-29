

let container = document.getElementById('container');
let percent_line = document.getElementById('percent-line');
let percent_number = document.getElementById('percent-number');

function increasePercent(increase)
{
let number = Number(percent_number.getAttribute('number')) + increase;
percent_number.innerHTML = number+'%';
percent_number.style.left = number+'%';
percent_line.style.width = number+'%';
percent_number.setAttribute('number', number);
}
// check zip code
function ZIPCode()
{
let zipcode = document.getElementById('zipcode');
let result = document.getElementById('result');

fetch(zipcodefile) // Path to your JSON file
.then(response => response.json()) // Parse JSON response
.then(data => {
  data.zipcodes.forEach((zip) =>{
    if(zip == zipcode.value)
    {
      //increase value for every action
      increasePercent(10);
      writeYears();
      result.innerHTML = '';
    }
    else
    {
      result.innerHTML = 'Invalid ZIP Code';
    }
    // console.log(zip);
  });
  // console.log(data.zipcodes[0]);

}) // Use the data
.catch(error => console.error('Error loading JSON:', error));
}

// read years
function writeYears()
{
container.innerHTML = '<h2>Vehicle Year</h2>';
fetch(jsonfile) // Path to your JSON file
.then(response => response.json()) // Parse JSON response
.then(data => {
  const years = Object.keys(data);

  years.forEach((b) =>{
    let btn = document.createElement('button');
    btn.setAttribute('class', 'btn btn-lg btn-info');
    btn.setAttribute('onclick', 'brand(this)');
    btn.setAttribute('name', b);
    btn.innerHTML = b;
    container.appendChild(btn);
  });

  //increase value for every action
  increasePercent(10);
}) // Use the data
.catch(error => console.error('Error loading JSON:', error));
}

//write brand
function brand(e)
{
fetch(jsonfile) // Path to your JSON file
.then(response => response.json()) // Parse JSON response
.then(data => {
  const brands = Object.keys(data[e.getAttribute('name')]);
  container.innerHTML = '<h2>Vehicle Brands</h2>';
  brands.forEach((b) =>{
    let btn = document.createElement('button');
    btn.setAttribute('class', 'btn btn-lg btn-success');
    btn.setAttribute('onclick', 'model(this)');
    btn.setAttribute('name', b);
    btn.setAttribute('year', e.getAttribute('name'));
    btn.innerHTML = b;
    container.appendChild(btn);
  });
  
  //increase value for every action
  increasePercent(10);
}) // Use the data
.catch(error => console.error('Error loading JSON:', error));
}

//write model
function model(e)
{
fetch(jsonfile) // Path to your JSON file
.then(response => response.json()) // Parse JSON response
.then(data => {
  const year = e.getAttribute('year');
  const models = Object.values(data[year][e.getAttribute('name')]);
  container.innerHTML = '<h2>Vehicle Models</h2>';
  models.forEach((b) =>{
    let btn = document.createElement('button');
    btn.setAttribute('class', 'btn btn-lg btn-success');
    btn.setAttribute('onclick', 'number(this)');
    btn.innerHTML = b;
    container.appendChild(btn);
  });

  //increase value for every action
  increasePercent(10);
}) // Use the data
.catch(error => console.error('Error loading JSON:', error));
}

function number(e)
{
alert('No nested data in JSON file for '+e.innerHTML+' next step!');
}