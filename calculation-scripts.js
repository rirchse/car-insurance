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

let year = '';
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
  back.innerHTML = '<button class="back">'+
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
  '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
  '</svg> Back </button>';
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
  back.innerHTML = '<button class="back" onclick="brands(this)" name="'+year+'">'+
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
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
      '<button class="back" onclick="models(this)" name="'+brand+'">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
  '</div>';
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
      '<button class="back" onclick="owner(this)" name="'+brand+'">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
  '</div>';
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
      '<button class="back" onclick="milage(this)" name="'+brand+'">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
  '</div>';
}

function anotherVehicle(e)
{
  container.innerHTML = '<div class="step step-number step-content-basic yes-no-box">'+
  '<h2>Add Another Vehicle? (Save Additional 20%)</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="model">'+
      '<button class="input" onclick="writeYears(this)">YES</button>'+
      '<button class="input" onclick="insurance(this)">NO</button>'+
    '</div>'+
  '</div>'+
  '<div class="back-to-prev">'+
      '<button class="back" onclick="coverage(this)" name="'+brand+'">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
  '</div>';
}

function insurance(e)
{
  container.innerHTML = '<div class="step step-number step-content-basic">'+
  '<h2>Insurance Details</h2>'+
    '<div class="inner-wrap">'+
      '<h4 style="text-align: left;">Current Insurance Carier</h4>'+
      '<select name="" id="insurance_carrier" class="select-box-carrier">'+
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
      '<select name="" id="insurance_coverage" class="select-box-coverage">'+
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
  '</div>'+
  '<div class="back-to-prev">'+
      '<button class="back" onclick="anotherVehicle(this)" name="'+brand+'">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
  '</div>'+
  '<h2>Add another driver? (Save Additional 20%)</h2>'+
  '<div class="inner-wrap inner-wrap-btn">'+
      '<button class="input" onclick="addDriver()">YES</button>'+
      '<button class="input" onclick="ownerAddress()">NO</button>'+
  '</div>';
}

/** ------------------ Add Driver Section --------------- */
function addDriver()
{
  container.innerHTML = '<div class="step step-number step-content-basic">'+
  '<h5 style="color: #666">1st Driver</h5>'+
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

function driverMaritalStatus()
{
  container.innerHTML = '<div class="step step-number step-content-basic three-items">'+
  '<h5 style="color: #666">1st Driver</h5>'+
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
      '<button class="back" onclick="addDriver(this)" name="'+brand+'">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
  '</div>';
}

function birthMonth()
{
  container.innerHTML = '<div class="step step-number step-content-basic three-items">'+
  '<h5 style="color: #666">1st Driver</h5>'+
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
      '<button class="back" onclick="driverMaritalStatus(this)" name="'+brand+'">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
  '</div>';
}

function birthDay()
{
  let days = '';
  for(let d = 1; d < 31; d++)
  {
    days += '<button class="input" onclick="birthYear(this)">'+d+'</button>';
  }
  container.innerHTML = '<div class="step step-number step-content-basic three-items">'+
  '<h5 style="color: #666">1st Driver</h5>'+
  '<h2>Birth Day</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="model">'+
      days
    '</div>'+
  '</div>'+
  '<div class="back-to-prev">'+
      '<button class="back" onclick="birthMonth(this)" name="'+brand+'">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
  '</div>';
}

function birthYear()
{
  let days = '';
  for(let d = 2007; d > 1970; d--)
  {
    days += '<button class="input" onclick="birthYear(this)">'+d+'</button>';
  }
  container.innerHTML = '<div class="step step-number step-content-basic three-items">'+
  '<h5 style="color: #666">1st Driver</h5>'+
  '<h2>Birth Year</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="model">'+
      days
    '</div>'+
  '</div>'+
  '<div class="back-to-prev">'+
      '<button class="back" onclick="birthMonth(this)" name="'+brand+'">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
  '</div>';
}


/** ------------------ Owner Details -------------------- */
function ownerAddress(e)
{
  container.innerHTML = '<div class="step step-number step-content-basic">'+
  '<h2>Current Address</h2>'+
    '<div class="inner-wrap column-wrap>'+
    '<div class="full-width">'+
      '<h4 style="text-align: left;">Street Address</h4>'+
        '<input type="text" placeholder="Street Address">'+
    '</div>'+
    '<div class="half-width">'+
        '<h4 style="text-align: left;">Zip Code</h4>'+
        '<input type="text" placeholder="Zip Code">'+
    '</div>'+
    '<div class="half-width">'+
        '<h4 style="text-align: left;">State</h4>'+
        '<select name="" id="address_state" class="select-box-address-state">'+
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
        '<input type="text" placeholder="City">'+
    '</div>'+
    '</div>'+
  '</div>'+
  '<div class="back-to-prev">'+
      '<button class="back" onclick="addDriver(this)" name="'+brand+'">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
      '<button class="next" onclick="ownership()"> Next'+
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
          '<path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />'+
        '</svg>'+
      '</button>'+
  '</div>';
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

function emailAddress(e)
{
  container.innerHTML = '<div class="step step-number step-content-basic">'+
  '<h2>Email Address</h2>'+
    '<div class="inner-wrap column-wrap>'+
      '<div class="full-width">'+
        '<h4 style="text-align: left;">Email Address</h4>'+
        '<input type="email" placeholder="Email Address">'+
        '<input type="email" placeholder="Email Address" class="error">'+
        '<span class="error-msg">Invalid Email Address</span>'+
    '</div>'+
    '</div>'+
  '</div>'+
  '<div class="back-to-prev">'+
      '<button class="back" onclick="ownership(this)" name="'+brand+'">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
      '<button class="next" onclick="getQuote()"> Next'+
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
          '<path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />'+
        '</svg>'+
      '</button>'+
  '</div>';
}

function getQuote(e)
{
  container.innerHTML = '<div class="step step-number step-content-basic">'+
    '<h2>Last Step, Get Your Quotes</h2>'+
      '<div class="inner-wrap column-wrap>'+
        '<div class="full-width">'+
          '<h4 style="text-align: left;">Phone Number</h4>'+
          '<input type="text" placeholder="Phone Number">'+
          '<input type="text" placeholder="Phone Number" class="error">'+
          '<span class="error-msg">Invalid Phone Number</span>'+
        '</div>'+
      '</div>'+
    '<div class="field-wrap">'+
      '<button class="action-btn btn" onclick="ZIPCode()">Get Started Now</button>'+
    '</div>'+
    '</div>'+
  '</div>';
}