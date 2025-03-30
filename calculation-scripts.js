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
    btn.setAttribute('onclick', 'brands(this)');
    btn.setAttribute('name', b);
    btn.innerHTML = b;
    container.appendChild(btn);
  });

  //create back button
  let back = document.createElement('button');
  back.setAttribute('class', 'btn-bk');
  back.setAttribute('onclick', 'createZIPCodePanel()');
  back.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
  '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
  '</svg> Back';
  container.appendChild(back);

  //increase value for every action
  increasePercent(10);
}) // Use the data
.catch(error => console.error('Error loading JSON:', error));
}

function createZIPCodePanel()
{
  container.innerHTML = '<div class="form-wrap">'+
  '<div class="step step-1">'+
        '<h2>Zip</h2>'+
        '<div class="inner-wrap inner-wrap-input">'+
            '<div class="field-wrap">'+
                '<input type="text" id="zipcode" placeholder="Zip Code">'+
                '<span class="error-msg" id="result"></span>'+
            '</div>'+
            '<div class="field-wrap">'+
              '<button class="btn btn-block" onclick="ZIPCode()">Get Started Now</button>'+
            '</div>'+
        '</div>'+
      '</div>'+
    '</div>';
}

let year = '';
//write brand
function brands(e)
{
fetch(jsonfile) // Path to your JSON file
.then(response => response.json()) // Parse JSON response
.then(data => {
  year = e.getAttribute('name');
  const brands = Object.keys(data[year]);
  container.innerHTML = '<h2>Vehicle Make</h2>';
  brands.forEach((b) => {
    let btn = document.createElement('button');
    btn.setAttribute('class', 'btn btn-lg btn-success');
    btn.setAttribute('onclick', 'models(this)');
    btn.setAttribute('name', b);
    // btn.setAttribute('year', e.getAttribute('name'));
    btn.innerHTML = '<div class="make"><img width="150" height="100" src="img/'+b+'.webp" alt="'+b+'"><br>'+b+'</div>';
    container.appendChild(btn);
  });

  //create back button
  let back = document.createElement('button');
  back.setAttribute('class', 'btn-bk');
  back.setAttribute('onclick', 'writeYears(this)');
  back.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
  '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
  '</svg> Back';
  container.appendChild(back);
  
  
  //increase value for every action
  increasePercent(10);
}) // Use the data
.catch(error => console.error('Error loading JSON:', error));
}

let brand = '';

//write model
function models(e)
{
fetch(jsonfile) // Path to your JSON file
.then(response => response.json()) // Parse JSON response
.then(data => {
  brand = e.getAttribute('name');
  // const year = e.getAttribute('year');
  const models = Object.values(data[year][brand]);
  container.innerHTML = '<h2>Vehicle Models</h2>';

  models.forEach((b) =>{
    let btn = document.createElement('button');
    btn.setAttribute('class', 'btn btn-lg btn-success');
    btn.setAttribute('onclick', 'number(this)');
    btn.innerHTML = b;
    container.appendChild(btn);
  });

  //create back button
  let back = document.createElement('button');
  back.setAttribute('class', 'btn-bk');
  back.setAttribute('onclick', 'brands(this)');
  back.setAttribute('name', year);
  back.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
  '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
  '</svg> Back';
  container.appendChild(back);

  //increase value for every action
  increasePercent(10);
}) // Use the data
.catch(error => console.error('Error loading JSON:', error));
}

function owner(e)
{
  alert('No nested data in JSON file for '+e.innerHTML+' next step!');
}