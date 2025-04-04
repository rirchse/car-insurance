let vehicles = [];
let vehicle = [];
let incidents = [];
let incidentsArr = []; //incident main array
let insuranceArr = [];
let drivers = [];
let birthDate = [];
let accidentArr = [];
let ticketArr = [];
let duiArr = [];
let sr22Arr = [];
let ownerArr = [];
let addressArr = [];

let year = '';
let brand = '';
let driverCounter = 0;
let countArr = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'];


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

  // console.log(vehicles);
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
      writeYears(null);
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
function writeYears(e)
{
  container.innerHTML = '<div class="step step-2" id="">'+
  '<h2>Vehicle Year</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="year">'+
    '</div>'+
  '</div>';

fetch(jsonfile) // Path to your JSON file
.then(response => response.json()) // Parse JSON response
.then(data => {
  const years = Object.keys(data);
  years.sort((a,b) => b - a);
  years.forEach((b) =>{
    let btn = document.createElement('button');
    btn.setAttribute('class', 'input');
    btn.setAttribute('onclick', 'brands(this)');
    btn.setAttribute('name', b);
    btn.innerHTML = b;
    document.getElementById('year').appendChild(btn);
  });

  //create back button
  let back = document.createElement('div');
  back.setAttribute('class', 'back-to-prev');
  back.innerHTML = '<button class="back" onclick="createZIPCodePanel()"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
  '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
  '</svg> Back </div>';
  container.appendChild(back);

  //increase value for every action
  increasePercent(10);
}) // Use the data
.catch(error => console.error('Error loading JSON:', error));
}

function createZIPCodePanel()
{
  container.innerHTML = '<div class="step step-1">'+
    '<h2>Zip</h2>'+
    '<div class="step step-1 step-content-basic">'+
      '<div class="field-wrap">'+
          '<input type="text" id="zipcode" placeholder="Zip Code">'+
          '<span class="error-msg" id="result"></span>'+
      '</div>'+
      '<div class="field-wrap">'+
        '<button class="action-btn btn" onclick="ZIPCode()">Get Started Now</button>'+
      '</div>'+
    '</div>'+
  '</div>';
}
//write brand
function brands(e)
{
  container.innerHTML = '<div class="step step-make">'+
  '<h2>Vehicle Make</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="make">'+
    '</div>'+
  '</div>';

fetch(jsonfile) // Path to your JSON file
.then(response => response.json()) // Parse JSON response
.then(data => {
  year = e.getAttribute('name');
  const brands = Object.keys(data[year]);
  brands.forEach((b) => {
    let btn = document.createElement('button');
    btn.setAttribute('class', 'input');
    btn.setAttribute('onclick', 'models(this)');
    btn.setAttribute('name', b);
    btn.innerHTML = '<div class="input-wrap">'+
    '<img width="150" height="100" src="img/'+b+'.webp" alt="'+b+'">'+
      '<span>'+b+'</span>'+
    '</div>';
    document.getElementById('make').appendChild(btn);
  });

  //create back button
  let back = document.createElement('div');
  back.setAttribute('class', 'back-to-prev');
  back.setAttribute('onclick', 'writeYears(this)');
  back.innerHTML = '<button class="back" value="back">'+
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
  '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
  '</svg> Back </button>';
  container.appendChild(back);  
  
  if(e.value != 'back')
  {
    //increase value for every action
    increasePercent(5);

    //data push to vehicle array
    vehicle.push(year);

    // console.log(vehicle);
  }
}) // Use the data
.catch(error => console.error('Error loading JSON:', error));
}

//write model
function models(e)
{
  container.innerHTML = '<div class="step step-make">'+
  '<h2>Vehicle Model</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="model">'+
    '</div>'+
  '</div>';

fetch(jsonfile) // Path to your JSON file
.then(response => response.json()) // Parse JSON response
.then(data => {
  brand = e.getAttribute('name');
  const models = Object.values(data[year][brand]);
  models.forEach((b) =>{
    let btn = document.createElement('button');
    btn.setAttribute('class', 'input');
    btn.setAttribute('onclick', 'owner(this)');
    btn.innerHTML = b;
    document.getElementById('model').appendChild(btn);
  });

  //create back button
  let back = document.createElement('div');
  back.setAttribute('class', 'back-to-prev');
  back.innerHTML = '<button class="back" onclick="brands(this)" name="'+year+'" value="back">'+
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
  '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
  '</svg> Back';
  container.appendChild(back);

  if(e.value != 'back')
  {
    //increase value for every action
    increasePercent(5);

    //data push to vehicle array
    vehicle.push(brand);

    // console.log(vehicle);
  }
}) // Use the data
.catch(error => console.error('Error loading JSON:', error));
}

function owner(e)
{
  container.innerHTML = '<div class="step step-number step-content-basic">'+
  '<h2>Vehicle Ownership</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="model">'+
      '<button class="input" onclick="milage(this)">Finance</button>'+
      '<button class="input" onclick="milage(this)">Lease</button>'+
      '<button class="input" onclick="milage(this)">Own</button>'+
      '<button class="input" onclick="milage(this)">Other</button>'+
    '</div>'+
  '</div>'+
  '<div class="back-to-prev">'+
      '<button class="back" onclick="models(this)" name="'+brand+'" value="back">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
  '</div>';

  if(e.value != 'back')
  {
    //increase value for every action
    increasePercent(5);

    //data push to vehicle array
    vehicle.push(e.innerHTML);

    // console.log(vehicle);
  }
}

function milage(e)
{
  container.innerHTML = '<div class="step step-number step-content-basic">'+
  '<h2>Annual Mileage</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="model">'+
      '<button class="input" onclick="coverage(this)">Under 5,000</button>'+
      '<button class="input" onclick="coverage(this)">5,001-10,000</button>'+
      '<button class="input" onclick="coverage(this)">10,001-15,000</button>'+
      '<button class="input" onclick="coverage(this)">15,000+</button>'+
    '</div>'+
  '</div>'+
  '<div class="back-to-prev">'+
      '<button class="back" onclick="owner(this)" name="'+brand+'" value="back">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
  '</div>';

  if(e.value != 'back')
  {
    //increase value for every action
    increasePercent(5);

    //data push to vehicle array
    vehicle.push(e.innerHTML);

    // console.log(vehicle);
  }  
}

function coverage(e)
{
  container.innerHTML = '<div class="step step-number step-content-basic">'+
  '<h2>Desired Coverage Level</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="model">'+
      '<button class="input" onclick="anotherVehicle(this)">Superior</button>'+
      '<button class="input" onclick="anotherVehicle(this)">Standard</button>'+
      '<button class="input" onclick="anotherVehicle(this)">Basic</button>'+
      '<button class="input" onclick="anotherVehicle(this)">State</button>'+
      '<button class="input" onclick="anotherVehicle(this)">Minimum</button>'+
    '</div>'+
  '</div>'+
  '<div class="back-to-prev">'+
      '<button class="back" onclick="milage(this)" name="'+brand+'" value="back">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
  '</div>';

  if(e.value != 'back')
  {
    //increase value for every action
    increasePercent(5);

    //data push to vehicle array
    vehicle.push(e.innerHTML);

    // console.log(vehicle);
  }
}

function anotherVehicle(e)
{
  container.innerHTML = '<div class="step step-number step-content-basic yes-no-box">'+
  '<h2>Add Another Vehicle? (Save Additional 20%)</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="model">'+
      '<button class="input" onclick="writeYears(this)" name="Yes">YES</button>'+
      '<button class="input" onclick="insurance(this)">NO</button>'+
    '</div>'+
  '</div>'+
  '<div class="back-to-prev">'+
      '<button class="back" onclick="coverage(this)" value="back">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
  '</div>';
  
  if(e.value != 'back')
  {
    //increase value for every action
    increasePercent(5);
  
    //data push to vehicle array
    vehicle.push(e.innerHTML);
    vehicles.push(vehicle);
  
    // console.log(vehicle);
    // console.log(vehicle, vehicles);
    vehicle = [];
  }
}


function insurance(e)
{
  container.innerHTML = '<div class="step step-number step-content-basic">'+
  '<h2>Insurance Details</h2>'+
  '<form action="#" id="insuranceForm">'+
    '<div class="inner-wrap">'+
      '<h4 style="text-align: left;">Current Insurance Carier</h4>'+
      '<select name="career" id="insurance_carrier" class="select-box-carrier carier">'+
          '<option data-placeholder="true"></option>'+
          '<option value="Other">Other</option>'+
          '<option value="Not Currently Insured">Not Currently Insured</option>'+
          '<option value="21st Century">21st Century</option>'+
          '<option value="AAA">AAA</option>'+
          '<option value="Allstate">Allstate</option>'+
          '<option value="American Family">American Family</option>'+
          '<option value="Bristol West">Bristol West</option>'+
          '<option value="Dairyland Insurance">Dairyland Insurance</option>'+
          '<option value="Direct General">Direct General</option>'+
          '<option value="Elephant">Elephant</option>'+
          '<option value="Erie Insurance">Erie Insurance</option>'+
          '<option value="Esurance">Esurance</option>'+
          '<option value="Farm Bureau/Farm Family/Rural">Farm Bureau/Farm Family/Rural</option>'+
          '<option value="Farmers">Farmers</option>'+
          '<option value="Farmers Insurance">Farmers Insurance</option>'+
          '<option value="Gainsco">Gainsco</option>'+
          '<option value="Geico">Geico</option>'+
          '<option value="Liberty Mutual">Liberty Mutual</option>'+
          '<option value="Mercury">Mercury</option>'+
          '<option value="Nationwide">Nationwide</option>'+
          '<option value="Plymouth Rock">Plymouth Rock</option>'+
          '<option value="Progressive">Progressive</option>'+
          '<option value="Prudential">Prudential</option>'+
          '<option value="SafeAuto">SafeAuto</option>'+
          '<option value="Safeco">Safeco</option>'+
          '<option value="State Farm">State Farm</option>'+
          '<option value="The General">The General</option>'+
          '<option value="The Hartford">The Hartford</option>'+
          '<option value="Travelers">Travelers</option>'+
          '<option value="USAA">USAA</option>'+
      '</select>'+
      '<h4 style="text-align: left;">Continuous Coverage</h4>'+
      '<select name="coverage" id="insurance_coverage" class="select-box-coverage coverage">'+
          '<option data-placeholder="true"></option>'+
          '<option value="Less Than 6 Months">Less Than 6 Months</option>'+
          '<option value="6 Months">6 Months</option>'+
          '<option value="1 Year">1 Year</option>'+
          '<option value="2 Years">2 Years</option>'+
          '<option value="3 Years">3 Years</option>'+
          '<option value="3 to 5 Years">3 to 5 Years</option>'+
          '<option value="More Than 5 Years">More Than 5 Years</option>'+
      '</select>'+
    '</div>'+
    '<div class="back-to-prev">'+
      '<button class="back" onclick="anotherVehicle(this)" name="" value="back">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
      '<button class="next" onclick="checkInsuranceForm()"> Next'+
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
          '<path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />'+
        '</svg>'+
      '</button>'+
    '</div>'+
    '</form>'+
  '</div>';

  styleLoad();
}

// insurance('e');

function checkInsuranceForm(e)
{
  // let form = document.getElementById('insuranceForm');
  let form = document.querySelector('#insuranceForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        let career = form.elements['career'];
        let coverage = form.elements['coverage'];
        if(career.value != '' && coverage.value != '')
        {
          insuranceArr.push(career.value);
          insuranceArr.push(coverage.value);

          drivers.push(insuranceArr);

          addDriver();
        }

    });
}

/** ------------------ Add Driver Section --------------- */
function addDriver()
{
  container.innerHTML = '<div class="step step-number step-content-basic">'+
  '<h5 style="color: #666">'+countArr[driverCounter]+' Driver</h5>'+
  '<h2>Gender</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="model">'+
      '<button class="input" onclick="driverMaritalStatus(this)">Male</button>'+
      '<button class="input" onclick="driverMaritalStatus(this)">Female</button>'+
    '</div>'+
  '</div>'+
  '<div class="back-to-prev">'+
      '<button class="back" onclick="insurance(this)" name="'+brand+'">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
  '</div>';
}

function driverMaritalStatus(e)
{
  container.innerHTML = '<div class="step step-number step-content-basic three-items">'+
  '<h5 style="color: #666">'+countArr[driverCounter]+' Driver</h5>'+
  '<h2>Marital Status</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="model">'+
      '<button class="input" onclick="birthMonth(this)">Married</button>'+
      '<button class="input" onclick="birthMonth(this)">Single</button>'+
      '<button class="input" onclick="birthMonth(this)">Divorced</button>'+
      '<button class="input" onclick="birthMonth(this)">Domestic Partner</button>'+
      '<button class="input" onclick="birthMonth(this)">Separated</button>'+
      '<button class="input" onclick="birthMonth(this)">Widowed</button>'+
      '<button class="input" onclick="birthMonth(this)">Unknown</button>'+
    '</div>'+
  '</div>'+
  '<div class="back-to-prev">'+
      '<button class="back" onclick="addDriver(this)" name="back">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
  '</div>';

  if(e.value != 'back')
  {
    //increase value for every action
    increasePercent(5);
  
    //data push to vehicle array
    drivers.push(e.innerHTML);
  
    // console.log(drivers);
  }
}

function birthMonth(e)
{
  container.innerHTML = '<div class="step step-number step-content-basic three-items">'+
  '<h5 style="color: #666">'+countArr[driverCounter]+' Driver</h5>'+
  '<h2>Birth Month</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="model">'+
      '<button class="input" onclick="birthDay(this)">January</button>'+
      '<button class="input" onclick="birthDay(this)">February</button>'+
      '<button class="input" onclick="birthDay(this)">March</button>'+
      '<button class="input" onclick="birthDay(this)">April</button>'+
      '<button class="input" onclick="birthDay(this)">May</button>'+
      '<button class="input" onclick="birthDay(this)">June</button>'+
      '<button class="input" onclick="birthDay(this)">July</button>'+
      '<button class="input" onclick="birthDay(this)">August</button>'+
      '<button class="input" onclick="birthDay(this)">September</button>'+
      '<button class="input" onclick="birthDay(this)">October</button>'+
      '<button class="input" onclick="birthDay(this)">November</button>'+
      '<button class="input" onclick="birthDay(this)">December</button>'+
    '</div>'+
  '</div>'+
  '<div class="back-to-prev">'+
      '<button class="back" onclick="driverMaritalStatus(this)" name="back">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
  '</div>';

  if(e.value != 'back')
  {
    //increase value for every action
    increasePercent(5);
  
    //data push to vehicle array
    drivers.push(e.innerHTML);
  
    // console.log(drivers);
  }
}

function birthDay(e)
{
  container.innerHTML = '<div class="step step-number step-content-basic three-items">'+
  '<h5 style="color: #666">'+countArr[driverCounter]+' Driver</h5>'+
  '<h2>Birth Day</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="birth_day">'+
    '</div>'+
  '</div>'+
  '<div class="back-to-prev">'+
      '<button class="back" onclick="birthMonth(this)" name="'+brand+'">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
  '</div>';
  
  for(let d = 1; d < 31; d++)
  {
    let day = document.createElement('button');
    day.setAttribute('class', 'input');
    day.setAttribute('onclick', 'birthYear(this)');
    day.innerHTML = d;
    document.getElementById('birth_day').appendChild(day);
  }

  if(e.value != 'back')
  {
    //increase value for every action
    increasePercent(5);
  
    //birth month push to birthDate array
    birthDate.push(e.innerHTML);
  
    // console.log(birthDate);
  }
}

function birthYear(e)
{
  container.innerHTML = '<div class="step step-number step-content-basic three-items">'+
    '<h5 style="color: #666">'+countArr[driverCounter]+' Driver</h5>'+
    '<h2>Birth Year</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="birth_year">'+
    '</div>'+
    '<div class="back-to-prev">'+
      '<button class="back" onclick="birthDay(this)" name="'+brand+'">'+
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
            '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
        '</svg> Back '+
      '</button>'+
    '</div>'+
  '</div>';

  for(let d = 2007; d > 1970; d--)
  {
    let y = document.createElement('button');
    y.setAttribute('class', 'input');
    y.setAttribute('onclick', 'incident(this)');
    y.innerHTML = d;
    document.getElementById('birth_year').appendChild(y);
  }

  if(e.value != 'back')
  {
    //increase value for every action
    increasePercent(5);
  
    //birth day push to birthDate array
    birthDate.push(e.innerHTML);
  
    // console.log(birthDate);
  }
}
// birthYear();

function incident(e)
{
  container.innerHTML = '<div class="step step-number step-content-basic five-items">'+
  '<h5 style="color: #666">'+countArr[driverCounter]+' Driver</h5>'+
  '<h2>Incidents In The Past 3 Years</h2>'+
    '<div class="inner-wrap checkbox-wrap" id="incident">'+
      '<div class="incident-item">'+
        '<p>Had an accident</p>'+
        '<p>'+
            '<label class="radio-wrap">Yes'+
                '<input type="radio" name="accident" onchange="checkIncident(this)" value="Yes">'+
                '<span class="checkmark"></span>'+
            '</label>'+
            '<label class="radio-wrap">No'+
                '<input type="radio" name="accident" checked="checked" onchange="checkIncident(this)" value="No">'+
                '<span class="checkmark"></span>'+
            '</label>'+
        '</p>'+
    '</div>'+
    '<div class="incident-item">'+
        '<p>Received a ticket</p>'+
        '<p>'+
            '<label class="radio-wrap">Yes'+
                '<input type="radio" name="ticket" onchange="checkIncident(this)" value="Yes">'+
                '<span class="checkmark"></span>'+
            '</label>'+
            '<label class="radio-wrap">No'+
                '<input type="radio" name="ticket" checked="checked" onchange="checkIncident(this)" value="No">'+
                '<span class="checkmark"></span>'+
            '</label>'+
        '</p>'+
    '</div>'+
    '<div class="incident-item">'+
        '<p>Received a DUI</p>'+
        '<p>'+
            '<label class="radio-wrap">Yes'+
                '<input type="radio" name="dui" onchange="checkIncident(this)" value="Yes">'+
                '<span class="checkmark"></span>'+
            '</label>'+
            '<label class="radio-wrap">No'+
                '<input type="radio" name="dui" checked="checked" onchange="checkIncident(this)" value="No">'+
                '<span class="checkmark"></span>'+
            '</label>'+
        '</p>'+
    '</div>'+
    '<div class="incident-item">'+
        '<p>Required SR-22?</p>'+
        '<p>'+
          '<label class="radio-wrap">Yes'+
              '<input type="radio" name="sr-22" onchange="checkIncident(this)" value="Yes">'+
              '<span class="checkmark"></span>'+
          '</label>'+
          '<label class="radio-wrap">No'+
              '<input type="radio" name="sr-22" checked="checked" onchange="checkIncident(this)" value="No">'+
              '<span class="checkmark"></span>'+
          '</label>'+
        '</p>'+
    '</div>'+
  '</div>'+
  '<div class="back-to-prev">'+
      '<button class="back" onclick="birthYear(this)" name="'+brand+'">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
      '<button class="next" onclick="nextIncident(this)" name="0"> Next'+
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
          '<path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />'+
        '</svg>'+
      '</button>'+
    '</div>'+
  '</div>';

  styleLoad();

  if(e.value != 'back')
    {
      //increase value for every action
      increasePercent(5);
    
      //birth year push to birthDate array
      birthDate.push(e.innerHTML);

      drivers.push(birthDate);
    
      console.log(drivers);
    }
}

// incident();


/** check incidents */
function checkIncident(e)
{
  if(e.value == 'Yes')
  {
    incidents.push(e.name);
  }
  else
  {
    let index = incidents.indexOf(e.name);
    if(index !== -1)
    {
      incidents.splice(index, 1);
    }
  }

  // console.log(incidents);
}

function accident(e)
{
  container.innerHTML = '<div class="step step-number step-content-basic three-items">'+
  '<h5 style="color: #666">'+countArr[driverCounter]+' Driver</h5>'+
  '<h2>Accident Details</h2>'+
  '<form action=#" id="accidentForm">'+
    '<div class="inner-wrap column-wrap" id="incident">'+
      '<div class="half-width">'+
      '<h4 style="text-align: left;">Month</h4>'+
      '<select name="month" id="accident_month" class="select-box-accident-month">'+
          '<option data-placeholder="true"></option>'+
          '<option value="January">January</option>'+
          '<option value="February">February</option>'+
          '<option value="March">March</option>'+
          '<option value="April">April</option>'+
          '<option value="May">May</option>'+
          '<option value="June">June</option>'+
          '<option value="July">July</option>'+
          '<option value="August">August</option>'+
          '<option value="September">September</option>'+
          '<option value="October">October</option>'+
          '<option value="November">November</option>'+
          '<option value="December">December</option>'+
      '</select>'+
  '</div>'+
  '<div class="half-width">'+
      '<h4 style="text-align: left;">Year</h4>'+
      '<select name="year" id="accident_year" class="select-box-accident-year">'+
          '<option data-placeholder="true"></option>'+
          '<option value="2024">2024</option>'+
          '<option value="2023">2023</option>'+
          '<option value="2022">2022</option>'+
          '<option value="2021">2021</option>'+
      '</select>'+
  '</div>'+
  '<div class="full-width">'+
      '<h4 style="text-align: left;">Accident Description</h4>'+
      '<select name="description" id="accident_desc" class="select-box-accident-desc">'+
          '<option data-placeholder="true"></option>'+
          '<option value="Other">Other</option>'+
          '<option value="Other Vehicle Hit Yours">Other Vehicle Hit Yours</option>'+
          '<option value="Vehicle Damaged Avoiding Accident">Vehicle Damaged Avoiding Accident</option>'+
          '<option value="Vehicle Hit Pedestrian">Vehicle Hit Pedestrian</option>'+
          '<option value="Vehicle Hit Property ">Vehicle Hit Property   </option>'+
          '<option value="Vehicle Hit Vehicle">Vehicle Hit Vehicle</option>'+
      '</select>'+
  '</div>'+
  '<div class="full-width">'+
      '<h4 style="text-align: left;">At Fault?</h4>'+
      '<select name="fault" id="accident_fault" class="select-box-accident-year">'+
          '<option data-placeholder="true"></option>'+
          '<option value="yes">Yes</option>'+
          '<option value="no">No</option>'+
      '</select>'+
  '</div>'+
  '<div class="full-width">'+
      '<h4 style="text-align: left;">Damaged</h4>'+
      '<select name="damage" id="accident_damage" class="select-box-accident-year">'+
          '<option data-placeholder="true"></option>'+
          '<option value="Both">Both</option>'+
          '<option value="No Damage">No Damage</option>'+
          '<option value="People">People</option>'+
          '<option value="Property">Property</option>'+
      '</select>'+
  '</div>'+
  '<div class="more-options inner-wrap-btn">'+
      // '<button class="show-more">'+
      //     '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 +24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
      //         '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />'+
      //     '</svg>'+
      //     'Add another accident'+
      //   '</button>'+
    '</div>'+
  '</div>'+
  '<div class="back-to-prev">'+
      '<button class="back" onclick="incident(this)" name="'+brand+'">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
      '<button class="next" onclick="checkAccidentForm(this)" name="1"> Next'+
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
          '<path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />'+
        '</svg>'+
      '</button>'+
    '</div>'+
    '</form>'+
  '</div>';

  styleLoad();
}

// accident();

/** -------------------- check accident form ------------ */
function checkAccidentForm(e)
{
  let form = document.querySelector('#accidentForm');
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    console.log(insurance_carrier);

    let month = form.elements['month'];
    let year = form.elements['year'];
    let description = form.elements['description'];
    let fault = form.elements['fault'];
    let damage = form.elements['damage'];

    if(month.value != '' && year.value != '' && description.value != '' && fault.value != '' && damage.value != '')
    {
      accidentArr.push(month.value);
      accidentArr.push(year.value);
      accidentArr.push(description.value);
      accidentArr.push(fault.value);
      accidentArr.push(damage.value);

      drivers.push(accidentArr);

      console.log(drivers);

      nextIncident(e);
    }

  });
}

function ticket(e)
{
  container.innerHTML = '<div class="step step-number step-content-basic three-items">'+
  '<h5 style="color: #666">'+countArr[driverCounter]+' Driver</h5>'+
  '<h2>Ticket Details</h2>'+
  '<form action="#" id="ticketForm">'+
    '<div class="inner-wrap column-wrap" id="incident">'+
    '<div class="half-width">'+
      '<h4 style="text-align: left;">Month</h4>'+
      '<select name="month" id="ticket_month" class="select-box-ticket-month">'+
          '<option data-placeholder="true"></option>'+
          '<option value="January">January</option>'+
          '<option value="February">February</option>'+
          '<option value="March">March</option>'+
          '<option value="April">April</option>'+
          '<option value="May">May</option>'+
          '<option value="June">June</option>'+
          '<option value="July">July</option>'+
          '<option value="August">August</option>'+
          '<option value="September">September</option>'+
          '<option value="October">October</option>'+
          '<option value="November">November</option>'+
          '<option value="December">December</option>'+
      '</select>'+
  '</div>'+
  '<div class="half-width">'+
      '<h4 style="text-align: left;">Year</h4>'+
      '<select name="year" id="ticket_year" class="select-box-accident-year">'+
          '<option data-placeholder="true"></option>'+
          '<option value="2025">2025</option>'+
          '<option value="2024">2024</option>'+
          '<option value="2023">2023</option>'+
          '<option value="2022">2022</option>'+
      '</select>'+
  '</div>'+
  '<div class="full-width">'+
      '<h4 style="text-align: left;">Ticket Description</h4>'+
      '<select name="description" id="ticket_desc" class="select-box-accident-desc">'+
          '<option data-placeholder="true"></option>'+
          '<option value="Careless Driving">Careless Driving</option>'+
          '<option value="Carpool Lane Violaion">Carpool Lane Violaion</option>'+
          '<option value="Child Not In Car Seat">Child Not In Car Seat</option>'+
          '<option value="Defective Equipment">Defective Equipment</option>'+
          '<option value="Defective Vehicle Reduced Violation">Defective Vehicle Reduced Violation</option>'+
          '<option value="Driving Without A license">Driving Without A license</option>'+
          '<option value="Excessive Noise">Excessive Noise</option>'+
          '<option value="Exhibition Driving">Exhibition Driving</option>'+
          '<option value="Expired Drivers License">Expired Drivers License</option>'+
          '<option value="Expired Emissions">Expired Emissions</option>'+
          '<option value="Expired Registration">Expired Registration</option>'+
          '<option value="Failure To Obey Traffic Signal">Failure To Obey Traffic Signal</option>'+
          '<option value="Failure To Signal">Failure To Signal</option>'+
          '<option value="Failure To Stop">Failure To Stop</option>'+
          '<option value="...">...</option>'+
          '<option value="...">...</option>'+
      '</select>'+
  '</div>'+
  '<div class="more-options inner-wrap-btn">'+
      '<button class="show-more">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 +24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />'+
          '</svg>'+
          'Add another ticket'+
        '</button>'+
    '</div>'+
  '</div>'+
  '<div class="back-to-prev">'+
      '<button class="back" onclick="accident(this)" name="back">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
      '<button class="next" onclick="checkTicketForm(this)" name="2"> Next'+
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
          '<path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />'+
        '</svg>'+
      '</button>'+
    '</div>'+
    '</form>'+
  '</div>';

  styleLoad();
}

// ticket();
/** -------------------- check accident form ------------ */
function checkTicketForm(e)
{
  let form = document.querySelector('#ticketForm');
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    // console.log(form);

    let month = form.elements['month'];
    let year = form.elements['year'];
    let description = form.elements['description'];

    if(month.value != '' && year.value != '' && description.value != '')
    {
      ticketArr.push(month.value);
      ticketArr.push(year.value);
      ticketArr.push(description.value);

      drivers.push(ticketArr);

      console.log(drivers);

      nextIncident(e);
    }

  });
}

function dui(e)
{
  container.innerHTML = '<div class="step step-number step-content-basic three-items">'+
  '<h5 style="color: #666">'+countArr[driverCounter]+' Driver</h5>'+
  '<h2>DUI Details</h2>'+
  '<form action="#" id="duiForm">'+
    '<div class="inner-wrap column-wrap" id="incident">'+
    '<div class="half-width">'+
      '<h4 style="text-align: left;">Month</h4>'+
      '<select name="month" id="dui_month" class="select-box-dui-month">'+
          '<option data-placeholder="true"></option>'+
          '<option value="January">January</option>'+
          '<option value="February">February</option>'+
          '<option value="March">March</option>'+
          '<option value="April">April</option>'+
          '<option value="May">May</option>'+
          '<option value="June">June</option>'+
          '<option value="July">July</option>'+
          '<option value="August">August</option>'+
          '<option value="September">September</option>'+
          '<option value="October">October</option>'+
          '<option value="November">November</option>'+
          '<option value="December">December</option>'+
      '</select>'+
  '</div>'+
  '<div class="half-width">'+
      '<h4 style="text-align: left;">Year</h4>'+
      '<select name="year" id="dui_year" class="select-box-dui-year">'+
          '<option data-placeholder="true"></option>'+
          '<option value="2025">2025</option>'+
          '<option value="2024">2024</option>'+
          '<option value="2023">2023</option>'+
          '<option value="2022">2022</option>'+
      '</select>'+
  '</div>'+
  '<div class="full-width">'+
      '<h4 style="text-align: left;">State</h4>'+
      '<select name="state" id="dui_state" class="select-box-dui-state">'+
          '<option data-placeholder="true"></option>'+
          '<option value="Careless Driving">Careless Driving</option>'+
          '<option value="Carpool Lane Violaion">Carpool Lane Violaion</option>'+
          '<option value="Child Not In Car Seat">Child Not In Car Seat</option>'+
          '<option value="Defective Equipment">Defective Equipment</option>'+
          '<option value="Defective Vehicle Reduced Violation">Defective Vehicle Reduced Violation</option>'+
          '<option value="Driving Without A license">Driving Without A license</option>'+
          '<option value="Excessive Noise">Excessive Noise</option>'+
          '<option value="Exhibition Driving">Exhibition Driving</option>'+
          '<option value="Expired Drivers License">Expired Drivers License</option>'+
          '<option value="Expired Emissions">Expired Emissions</option>'+
          '<option value="Expired Registration">Expired Registration</option>'+
          '<option value="Failure To Obey Traffic Signal">Failure To Obey Traffic Signal</option>'+
          '<option value="Failure To Signal">Failure To Signal</option>'+
          '<option value="Failure To Stop">Failure To Stop</option>'+
          '<option value="...">...</option>'+
          '<option value="...">...</option>'+
      '</select>'+
  '</div>'+
  '<div class="more-options inner-wrap-btn">'+
      // '<button class="show-more">'+
      //   '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 +24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
      //       '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />'+
      //   '</svg>'+
      //   'Add another DUI'+
      // '</button>'+
    '</div>'+
  '</div>'+
  '<div class="back-to-prev">'+
      '<button class="back" onclick="ticket(this)" name="back">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
      '<button class="next" onclick="checkDuiForm(this)" name="3"> Next'+
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
          '<path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />'+
        '</svg>'+
      '</button>'+
      '</div>'+
      '</form>'+
  '</div>';

  styleLoad();
}

// dui();

/** -------------------- check accident form ------------ */
function checkDuiForm(e)
{
  let form = document.querySelector('#duiForm');
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    // console.log(form);

    let month = form.elements['month'];
    let year = form.elements['year'];
    let state = form.elements['state'];

    if(month.value != '' && year.value != '' && state.value != '')
    {
      duiArr.push(month.value);
      duiArr.push(year.value);
      duiArr.push(state.value);

      drivers.push(duiArr);

      console.log(drivers);

      nextIncident(e);
    }

  });
}

function driverName()
{
  container.innerHTML = '<div class="step step-number step-content-basic three-items">'+
    '<h5 style="color: #666">'+countArr[driverCounter]+' Driver</h5>'+
    '<h2>Name</h2>'+
    '<form action="#" id="driverNameForm">'+
      '<div class="inner-wrap column-wrap" id="incident">'+
      '<div class="full-width">'+
        '<h4 style="text-align: left;">Legal First Name</h4>'+
        '<input type="text" placeholder="Legal First Name" name="first_name">'+
        '<h4 style="text-align: left;" class="mt-20">Legal Last Name</h4>'+
        '<input type="text" placeholder="Legal Last Name" name="last_name">'+
      '</div>'+
    '</div>'+
    '<div class="back-to-prev">'+
      '<button class="back" onclick="dui(this)" name="back">'+
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
      '<button class="next" onclick="checkNameForm(this)" name="4"> Next'+
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
          '<path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />'+
        '</svg>'+
      '</button>'+
      '</div>'+
    '</form>'+
  '</div>';
}

// driverName();

/** -------------------- check accident form ------------ */
function checkNameForm(e)
{
  let form = document.querySelector('#driverNameForm');
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    // console.log(form);

    let first_name = form.elements['first_name'];
    let last_name = form.elements['last_name'];

    if(first_name.value != '' && last_name.value != '')
    {
      sr22Arr.push(first_name.value);
      sr22Arr.push(last_name.value);

      drivers.push(sr22Arr);

      console.log(drivers);

      nextIncident(e);
    }

  });
}

/** ------------------- next incident ------------ */
let incidentIndex = 0;
function nextIncident(e)
{
  if(e.name == 'back'){
    incidentIndex--;
  }

  let order = ['accident', 'ticket', 'dui', 'sr-22'];
  incidents.sort((a, b) => order.indexOf(a) - order.indexOf(b));

  if(incidents[incidentIndex] == 'accident')
  {
    accident();
    if(e.name == 'back'){
      incidentIndex--;
    }else{
      incidentIndex++;
    }
  }
  else if(incidents[incidentIndex] == 'ticket')
  {
    ticket();
    if(e.name == 'back'){
      incidentIndex--;
    }else{
      incidentIndex++;
    }
  }
  else if(incidents[incidentIndex] == 'dui')
  {
    dui();
    if(e.name == 'back'){
      incidentIndex--;
    }else{
      incidentIndex++;
    }
  }
  else if(incidents[incidentIndex] == 'sr-22')
  {
    driverName();
    if(e.name == 'back'){
      incidentIndex--;
    }else{
      incidentIndex++;
    }
  }
  else
  {
    anotherDriver();
  }
  // console.log(incidentIndex);
}

function anotherDriver()
{
  driverCounter++;
  container.innerHTML = '<div class="step step-number step-content-basic yes-no-box">'+
  '<h2>Add Another Driver? (Save Additional 20%)</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="moreDriver">'+
      '<button class="input" onclick="addDriver(this)">YES</button>'+
      '<button class="input" onclick="ownerAddress(this)">NO</button>'+
    '</div>'+
  '</div>'+
  '<div class="back-to-prev">'+
      '<button class="back" onclick="driverName(this)" name="'+brand+'">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
  '</div>';
}

// anotherDriver();

/** ------------------ Owner Details -------------------- */
function ownerAddress(e)
{
  container.innerHTML = '<div class="step step-number step-content-basic">'+
  '<h2>Current Address-</h2>'+
  '<form action="#" id="addressForm">'+
  '<div class="inner-wrap column-wrap">'+
    '<div class="full-width">'+
      '<h4 style="text-align: left;">Street Address</h4>'+
      '<input type="text" name="address" placeholder="Street Address">'+
    '</div>'+
    '<div class="half-width">'+
        '<h4 style="text-align: left;">Zip Code</h4>'+
        '<input type="text" name="zip" placeholder="Zip Code">'+
    '</div>'+
    '<div class="half-width">'+
        '<h4 style="text-align: left;">State</h4>'+
        '<select name="state" id="address_state" class="select-box-address-state">'+
            '<option data-placeholder="true"></option>'+
            '<option value="Careless Driving">Careless Driving</option>'+
            '<option value="Carpool Lane Violaion">Carpool Lane Violaion</option>'+
            '<option value="Child Not In Car Seat">Child Not In Car Seat</option>'+
            '<option value="Defective Equipment">Defective Equipment</option>'+
            '<option value="Defective Vehicle Reduced Violation">Defective Vehicle Reduced Violation</option>'+
            '<option value="Driving Without A license">Driving Without A license</option>'+
            '<option value="Excessive Noise">Excessive Noise</option>'+
            '<option value="Exhibition Driving">Exhibition Driving</option>'+
            '<option value="Expired Drivers License">Expired Drivers License</option>'+
            '<option value="Expired Emissions">Expired Emissions</option>'+
            '<option value="Expired Registration">Expired Registration</option>'+
            '<option value="Failure To Obey Traffic Signal">Failure To Obey Traffic Signal</option>'+
            '<option value="Failure To Signal">Failure To Signal</option>'+
            '<option value="Failure To Stop">Failure To Stop</option>'+
            '<option value="...">...</option>'+
            '<option value="...">...</option>'+
        '</select>'+
      '</div>'+
      '<div class="full-width">'+
          '<h4 style="text-align: left;">City</h4>'+
          '<input type="text" name="city" placeholder="City">'+
      '</div>'+
    '</div>'+
    '<div class="back-to-prev">'+
      '<button class="back" onclick="anotherDriver(this)" name="'+brand+'">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
      '<button class="next" onclick="checkAddressForm(this)"> Next'+
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
          '<path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />'+
        '</svg>'+
      '</button>'+
    '</div>'+
    '</form>'+
  '</div>';

  styleLoad();
}

// ownerAddress('e');

/** -------------------- check accident form ------------ */
function checkAddressForm(e)
{
  let form = document.querySelector('#addressForm');
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    // console.log(form);

    let address = form.elements['address'];
    let zip = form.elements['zip'];
    let state = form.elements['state'];
    let city = form.elements['city'];

    if(address.value != '' && zip.value != '' && state.value != '' && city.value != '')
    {
      addressArr.push(address.value);
      addressArr.push(zip.value);
      addressArr.push(state.value);
      addressArr.push(city.value);

      ownerArr.push(addressArr);

      console.log(ownerArr);

      ownership();
    }

  });
}

function ownership()
{
  container.innerHTML = '<div class="step step-number step-content-basic">'+
  '<h2>Home Ownership</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="model">'+
      '<button class="input" onclick="emailAddress(this)">OWN</button>'+
      '<button class="input" onclick="emailAddress(this)">RENT</button>'+
      '<button class="input" onclick="emailAddress(this)">ANOTHER</button>'+
    '</div>'+
  '</div>'+
  '<div class="back-to-prev">'+
      '<button class="back" onclick="ownerAddress(this)" name="'+brand+'">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
  '</div>';
}

// ownership();

function emailAddress(e)
{
  container.innerHTML = '<div class="step step-number step-content-basic">'+
  '<h2>Email Address</h2>'+
    '<div class="inner-wrap column-wrap>'+
      '<div class="full-width">'+
        '<h4 style="text-align: left;">Email Address</h4>'+
        '<input type="email" id="email" placeholder="Email Address">'+
        // '<input type="email" placeholder="Email Address" class="error">'+
        // '<span class="error-msg">Invalid Email Address</span>'+
      '</div>'+
    '<div class="back-to-prev">'+
        '<button class="back" onclick="ownership(this)" name="'+brand+'">'+
            '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
                '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
            '</svg> Back '+
        '</button>'+
        '<button class="next" onclick="emailForm(this)"> Next'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
            '<path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />'+
          '</svg>'+
        '</button>'+
      '</div>'+
    '</div>';

    ownerArr.push(e.innerHTML);
}
// emailAddress();

function emailForm(e)
{
  let email = document.getElementById('email');
  if(email.value != '')
  {
    ownerArr.push(email.value);
    getQuote(e);
  }
}

function getQuote(e)
{
  container.innerHTML = '<div class="step step-number step-content-basic">'+
    '<h2>Last Step, Get Your Quotes</h2>'+
      '<div class="inner-wrap column-wrap>'+
        '<div class="full-width">'+
          '<h4 style="text-align: left;">Phone Number</h4>'+
          '<input type="text" id="phone" placeholder="Phone Number">'+
          // '<input type="text" placeholder="Phone Number" class="error">'+
          // '<span class="error-msg">Invalid Phone Number</span>'+
        '</div>'+
        '<div class="field-wrap">'+
          '<button class="action-btn btn" onclick="checkQuote(this)">Get My Quote</button>'+
        '</div>'+
      '</div>';
}

// getQuote(5);

function checkQuote(e)
{
  let phone = document.getElementById('phone');
  if(phone.value != '')
  {
    ownerArr.push(phone.value);

    let data = {
      'vehicles': vehicles,
      'incidents': incidents,
      'drivers': drivers,
      'owner': ownerArr
    }

    // console.log(data);

    document.getElementById('result').textContent = JSON.stringify(data, null, 4);
  }
}