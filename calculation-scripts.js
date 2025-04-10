let formdata = {
  vehicles: {
    list: [],
    current: []
  },
  drivers: {
    list: [],
    current: {
      general: [],
      dob: [],
      incidents: {
        part:[],
        accident: [],
        ticket: [],
        dui: [],
        sr22: []
      }
    }
  },
  owner: {
    insurance: [],
    address: [],
    contact: []
  }
};

let year = '', brand = '', model = '';
let vehicleCounter = 0, driverCounter = 0;
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
}

// // check all error and set the border color
function checkErr(e)
{
  let elm = e.nextElementSibling;
  if(e.value == ''){
    elm.style.borderColor = 'red';
    return false;
  }
  else{
    elm.style.borderColor = '#ddd';
    return true;
  }    
}

// check error input
function checkErrInput(e)
{
  // let elm = e.nextElementSibling;
  if(e.value == ''){
    e.style.borderColor = 'red';
    return false;
  }
  else{
    e.style.borderColor = '#ddd';
    return true;
  }
}

// check valid email address
function checkEmail(e)
{
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(e.value == '' || !regex.test(e.value)){
    e.style.borderColor = 'red';
    return false;
  }
  else{
    e.style.borderColor = '#ddd';
    return true;
  }
}

// check valid email address
function checkPhone(e)
{
  const regex = /^(?:\+1\s?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
  if(e.value == '' || !regex.test(e.value)){
    e.style.borderColor = 'red';
    e.nextElementSibling.innerHTML = 'Invalid Phone Number';
    return false;
  }
  else{
    e.style.borderColor = '#ddd';
    e.nextElementSibling.innerHTML = '';
    return true;
  }
}

function createZIPCodePanel()
{
  container.innerHTML = '<div class="step step-1">'+
    '<h2>Zip</h2>'+
    '<div class="step step-1 step-content-basic">'+
    
      '<div class="field-wrap">'+
          '<div class="input-field-wrap">'+
              '<input type="text" id="zipcode" required>'+
              '<label for="">Zip code</label>'+
          '</div>'+
          '<span class="error-msg" id="result"></span>'+
      '</div>'+
      '<div class="field-wrap">'+
        '<button class="action-btn btn" onclick="ZIPCode()">Get Started Now</button>'+
      '</div>'+
    '</div>'+
  '</div>';
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
      // writeYears(null);
      brands(null);
      result.innerHTML = '';
    }
    else
    {
      checkErrInput(zipcode);
      result.innerHTML = 'Invalid ZIP Code';
    }
    // console.log(zip);
  });
  // console.log(data.zipcodes[0]);

}) // Use the data
.catch(error => console.error('Error loading JSON:', error));
}

//write brand
function brands(e)
{
  let number = 0;
  container.innerHTML = '<div class="step step-make">'+
  '<h4>'+(vehicleCounter > 0 ? countArr[vehicleCounter]+' Vehicle' : "")+' </h4>'+
  '<h2>Vehicle Make</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="make">'+
    '</div>'+
  '</div>';

  fetch(jsonfile) // Path to your JSON file
  .then(response => response.json()) // Parse JSON response
  .then(data => {
    const brands = Object.keys(data);
    brands.forEach((b, n) => {
      number += n;
      let btn = document.createElement('button');
      btn.setAttribute('class', 'input');
      btn.setAttribute('onclick', 'writeYears(this)');
      btn.setAttribute('name', b);
      btn.innerHTML = '<div class="input-wrap">'+
        '<img width="150" height="100" src="img/'+b+'.webp" alt="'+b+'">'+
        '<span>'+b+'</span>'+
      '</div>';

      if (e != null && e.value == 'more') {
        document.getElementById('make').appendChild(btn);
      } else if (e == null && n < 12 || e != null && n < 12) {
        document.getElementById('make').appendChild(btn);
      }
    });

    let moreBtn = document.createElement('div');
    moreBtn.setAttribute('class', 'more-options inner-wrap-btn');
    moreBtn.innerHTML = 
      '<button class="show-more" value="more" onclick="brands(this)">'+
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 +24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
          '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />'+
          '</svg>'+
        'Load More...'+
      '</button>';

    if(number > 12 && e == null || e.value != 'more' && number > 12 )
    {
      container.appendChild(moreBtn);
    }

    //create back button
    let back = document.createElement('div');
    back.setAttribute('class', 'back-to-prev');
    back.innerHTML = '<button class="back" value="back" onclick="createZIPCodePanel(this)">'+
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
    '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
    '</svg> Back </button>';
    container.appendChild(back);  
    
    if(e.value != 'back')
    {
      //increase value for every action
      if(vehicleCounter == 0)
      {
        increasePercent(5);
      }
    }
  }) // Use the data
  .catch(error => console.error('Error loading JSON:', error));
}

// read years
function writeYears(e)
{
  let number = 0;
  container.innerHTML = '<div class="step step-2" id="">'+
  '<h4>'+(vehicleCounter > 0 ? countArr[vehicleCounter]+' Vehicle' : "")+' </h4>'+
  '<h2>Vehicle Year</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="year">'+
    '</div>'+
  '</div>';

  fetch(jsonfile) // Path to your JSON file
  .then(response => response.json()) // Parse JSON response
  .then(data => {
    brand = e.getAttribute('name');
    const years = Object.keys(data[brand]);
    years.sort((a,b) => b - a);
    years.forEach((b, n) => {
      number += n;
      let btn = document.createElement('button');
      btn.setAttribute('class', 'input');
      btn.setAttribute('onclick', 'models(this)');
      btn.setAttribute('name', b);
      btn.innerHTML = b;

      if (e.value == 'more') {
        document.getElementById('year').appendChild(btn);
      } else if (e.value != 'more' && n < 12) {
        document.getElementById('year').appendChild(btn);
      }
      
    });
    
    let moreBtn = document.createElement('div');
    moreBtn.setAttribute('class', 'more-options inner-wrap-btn');
    moreBtn.innerHTML = 
      '<button class="show-more" value="more" onclick="writeYears(this)" name="'+brand+'">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 +24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />'+
          '</svg>'+
          'Load More...'+
      '</button>';

    if (e.value != 'more' && number > 12)
    {
      container.appendChild(moreBtn);
    }

    //create back button
    let back = document.createElement('div');
    back.setAttribute('class', 'back-to-prev');
    back.innerHTML = '<button class="back" onclick="brands(this)"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
    '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
    '</svg> Back </div>';
    container.appendChild(back);

    //increase value for every action
    if(vehicleCounter == 0)
    {
      increasePercent(5);
    }
    formdata.vehicles.current.push(brand);
    console.log(formdata);
  }) // Use the data
  .catch(error => console.error('Error loading JSON:', error));
}

//write model
function models(e)
{
  let number = 0;
  container.innerHTML = '<div class="step step-make">'+
  '<h4>'+(vehicleCounter > 0 ? countArr[vehicleCounter]+' Vehicle' : "")+' </h4>'+
  '<h2>Vehicle Model</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="model">'+
    '</div>'+
  '</div>';

fetch(jsonfile) // Path to your JSON file
.then(response => response.json()) // Parse JSON response
.then(data => {
  year = e.getAttribute('name');
  const models = Object.values(data[brand][year]);
  models.forEach((b, n) => {
    number += n;
    let btn = document.createElement('button');
    btn.setAttribute('class', 'input');
    btn.setAttribute('name', b);
    btn.setAttribute('onclick', 'owner(this)');
    btn.innerHTML = b;

    if (e.value == 'more') {
      document.getElementById('model').appendChild(btn);
    } else if (e.value != 'more' && n < 12) {
      document.getElementById('model').appendChild(btn);
    }
  });
    
  let moreBtn = document.createElement('div');
  moreBtn.setAttribute('class', 'more-options inner-wrap-btn');
  moreBtn.innerHTML = 
    '<button class="show-more" value="more" onclick="models(this)" name="'+year+'">'+
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 +24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
            '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />'+
        '</svg>'+
        'Load More...'+
    '</button>';

  if (e.value != 'more' && number > 12)
  {
    container.appendChild(moreBtn);
  }

  //create back button
  let back = document.createElement('div');
  back.setAttribute('class', 'back-to-prev');
  back.innerHTML = '<button class="back" onclick="writeYears(this)" name="'+brand+'" value="back">'+
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
  '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
  '</svg> Back';
  container.appendChild(back);

  if(e.value != 'back')
  {
    //increase value for every action
    if(vehicleCounter == 0)
    {
      increasePercent(5);
    }

    formdata.vehicles.current.push(year);
    console.log(formdata);
  }
}) // Use the data
.catch(error => console.error('Error loading JSON:', error));
}

function owner(e)
{
  container.innerHTML = '<div class="step step-number step-content-basic">'+
  '<h4>'+(vehicleCounter > 0 ? countArr[vehicleCounter]+' Vehicle' : "")+' </h4>'+
  '<h2>Vehicle Ownership</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="model">'+
      '<button class="input" onclick="milage(this)">Finance</button>'+
      '<button class="input" onclick="milage(this)">Lease</button>'+
      '<button class="input" onclick="milage(this)">Own</button>'+
      '<button class="input" onclick="milage(this)">Other</button>'+
    '</div>'+
  '</div>'+
  '<div class="back-to-prev">'+
      '<button class="back" onclick="models(this)" name="'+year+'" value="back">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
  '</div>';

  if(e.value != 'back')
  {
    //increase value for every action
    if(vehicleCounter == 0)
    {
      increasePercent(3);
    }

    formdata.vehicles.current.push(e.name);
    console.log(formdata);
  }
}

function milage(e)
{
  container.innerHTML = '<div class="step step-number step-content-basic">'+
  '<h4>'+(vehicleCounter > 0 ? countArr[vehicleCounter]+' Vehicle' : "")+' </h4>'+
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
    if(vehicleCounter == 0)
    {
      increasePercent(2);
    }

    formdata.vehicles.current.push(e.innerHTML);
    console.log(formdata);
  }  
}

function coverage(e)
{
  container.innerHTML = '<div class="step step-number step-content-basic">'+
  '<h4>'+(vehicleCounter > 0 ? countArr[vehicleCounter]+' Vehicle' : "")+' </h4>'+
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
    if(vehicleCounter == 0)
    {
      increasePercent(3);
    }

    formdata.vehicles.current.push(e.innerHTML);
    console.log(formdata);
  }
}

function anotherVehicle(e)
{
  let html = '';
  // if(vehicles)
  // {
  //   html+='<table class="table">'+
  //   '<tr>'+
  //     '<th>SL NO.</th>'+
  //     '<th>Year</th>'+
  //     '<th>Make</th>'+
  //     '<th>Model</th>'+
  //     '<th>Finance</th>'+
  //     '<th>Milage</th>'+
  //   '</tr>';
  //   vehicles.forEach((arr, n) => {
  //     html+='<tr>'+
  //     '<td>'+(n+1)+'</td>';

  //     arr.forEach((v) => {
  //       html+='<td>'+v+'</td>';
  //     });
  //     html+='</tr>';
  //   });
  //   html+='</table>';
  // };

  // html = '';

  // console.log(html);

  container.innerHTML = '<div class="step step-make">'+
    // '<h3>Selected Vehicles</h3>'+
      html+
  '</div>'+
  '<div class="step step-number step-content-basic yes-no-box">'+
  '<h2>Add Another Vehicle? (Save Additional 20%)</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="model">'+
      '<button class="input" onclick="checkAnotherVehicle(this)" name="Yes">YES</button>'+
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
    formdata.vehicles.list.push(formdata.vehicles.current);
    formdata.vehicles.current = [];
  }
}

function checkAnotherVehicle(e)
{
  vehicleCounter++;
  if(e.name == 'Yes')
  {
    brands();
  }
}

function insurance(e)
{
  container.innerHTML = '<div class="step step-number step-content-basic">'+
  '<h2>Insurance Details</h2>'+
  '<form action="#" id="insuranceForm">'+
    '<div class="inner-wrap">'+
      '<h4 style="text-align: left;">Current Insurance Carier</h4>'+
      '<select name="career" id="insurance_carrier" class="select-box-carrier carier" onchange="checkErr(this)">'+
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
      '<p class="error" id="carrier_err"></p>'+
      '<h4 style="text-align: left;">Continuous Coverage</h4>'+
      '<select name="coverage" id="insurance_coverage" class="select-box-coverage coverage" onchange="checkErr(this)">'+
          '<option data-placeholder="true"></option>'+
          '<option value="Less Than 6 Months">Less Than 6 Months</option>'+
          '<option value="6 Months">6 Months</option>'+
          '<option value="1 Year">1 Year</option>'+
          '<option value="2 Years">2 Years</option>'+
          '<option value="3 Years">3 Years</option>'+
          '<option value="3 to 5 Years">3 to 5 Years</option>'+
          '<option value="More Than 5 Years">More Than 5 Years</option>'+
      '</select>'+
      '<p class="error" id="coverage_err"></p>'+
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
  let form = document.querySelector('#insuranceForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        let career = form.elements['career'];
        let coverage = form.elements['coverage'];

        let carrierCheck = checkErr(career);
        let coverageCheck = checkErr(coverage);
        
        if(carrierCheck && coverageCheck)
        {
          formdata.owner.insurance.push(career.value, coverage.value);

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

// addDriver();

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
    if(driverCounter == 0)
    {
      increasePercent(5);
    }
  
    //data push to vehicle array
    formdata.drivers.current.general.push(e.innerHTML);
  
    console.log(formdata);
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
    if(driverCounter == 0)
    {
      increasePercent(5);
    }
  
    //data push to vehicle array
    formdata.drivers.current.general.push(e.innerHTML);
  
    console.log(formdata);
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
    if(driverCounter == 0)
    {
      increasePercent(3);
    }
  
    //birth month push to birthDate array
    formdata.drivers.current.dob.push(e.innerHTML);
  
    console.log(formdata);
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
    if(driverCounter == 0)
    {
      increasePercent(2);
    }
  
    //birth day push to birthDate array
    formdata.drivers.current.dob.push(e.innerHTML);
  
    console.log(formdata);
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
    if(driverCounter == 0)
    {
      increasePercent(5);
    }
  
    //birth year push to birthDate array
    formdata.drivers.current.dob.push(e.innerHTML);
  
    console.log(formdata);
  }
}

// incident();


/** check incidents */
function checkIncident(e)
{
  let parts = formdata.drivers.current.incidents.part;
  if(e.value == 'Yes')
  {
    parts.push(e.name);
  }
  else
  {
    let index = parts.indexOf(e.name);
    if(index !== -1)
    {
      parts.splice(index, 1);
    }
  }

  console.log(parts);
}

function accident(e)
{
  e.parentNode.parentNode.style.display = 'none';

  let htmlForm = document.createElement('div');
  htmlForm.setAttribute('class', 'step step-number step-content-basic three-items');
  htmlForm.innerHTML = '<h5 style="color: #666">'+countArr[driverCounter]+' Driver</h5>'+
  '<h2>Accident Details</h2>'+
  '<form action=#" id="accidentForm">'+
    '<div class="inner-wrap column-wrap" id="incident">'+
      '<div class="half-width">'+
      '<h4 style="text-align: left;">Month</h4>'+
      '<select name="month" id="accident_month" class="select-box-accident-month" onchange="checkErr(this)">'+
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
      '<select name="year" id="accident_year" class="select-box-accident-year" onchange="checkErr(this)">'+
          '<option data-placeholder="true"></option>'+
          '<option value="2024">2024</option>'+
          '<option value="2023">2023</option>'+
          '<option value="2022">2022</option>'+
          '<option value="2021">2021</option>'+
      '</select>'+
  '</div>'+
  '<div class="full-width">'+
      '<h4 style="text-align: left;">Accident Description</h4>'+
      '<select name="description" id="accident_desc" class="select-box-accident-desc" onchange="checkErr(this)">'+
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
      '<select name="fault" id="accident_fault" class="select-box-accident-year" onchange="checkErr(this)">'+
          '<option data-placeholder="true"></option>'+
          '<option value="yes">Yes</option>'+
          '<option value="no">No</option>'+
      '</select>'+
  '</div>'+
  '<div class="full-width">'+
      '<h4 style="text-align: left;">Damaged</h4>'+
      '<select name="damage" id="accident_damage" class="select-box-accident-year" onchange="checkErr(this)">'+
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
      '<button class="back" onclick="getBack(this)" name="'+brand+'">'+
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
    '</form>';

    container.appendChild(htmlForm);

  styleLoad();
}

// accident();

/** -------------------- check accident form ------------ */
function checkAccidentForm(e)
{
  let form = document.querySelector('#accidentForm');
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    let month = form.elements['month'];
    let year = form.elements['year'];
    let description = form.elements['description'];
    let fault = form.elements['fault'];
    let damage = form.elements['damage'];

    // check error
    let checkMonth = checkErr(month);
    let checkYear = checkErr(year);
    let checkDesc = checkErr(description);
    let checkFault = checkErr(fault);
    let checkDamage = checkErr(damage);

    if(checkMonth && checkYear && checkDesc && checkFault && checkDamage)
    {
      let accidents = formdata.drivers.current.incidents.accident;
      accidents.push(month.value, year.value, description.value, fault.value, damage.value);

      console.log(accidents);

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
      '<select name="month" id="ticket_month" class="select-box-ticket-month" onchange="checkErr(this)">'+
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
      '<select name="year" id="ticket_year" class="select-box-accident-year" onchange="checkErr(this)">'+
          '<option data-placeholder="true"></option>'+
          '<option value="2025">2025</option>'+
          '<option value="2024">2024</option>'+
          '<option value="2023">2023</option>'+
          '<option value="2022">2022</option>'+
      '</select>'+
  '</div>'+
  '<div class="full-width">'+
      '<h4 style="text-align: left;">Ticket Description</h4>'+
      '<select name="description" id="ticket_desc" class="select-box-accident-desc" onchange="checkErr(this)">'+
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
      //     '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 +24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
      //         '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />'+
      //     '</svg>'+
      //     'Add another ticket'+
      //   '</button>'+
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

    let month = form.elements['month'];
    let year = form.elements['year'];
    let description = form.elements['description'];

    let checkMonth = checkErr(month);
    let checkYear = checkErr(year);
    let checkDesc = checkErr(description);

    if(checkMonth && checkYear && checkDesc)
    {
      let tickets = formdata.drivers.current.incidents.ticket;
      tickets.push(month.value, year.value, description.value);

      console.log(tickets);

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
      '<select name="month" id="dui_month" class="select-box-dui-month" onchange="checkErr(this)">'+
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
      '<select name="year" id="dui_year" class="select-box-dui-year" onchange="checkErr(this)">'+
          '<option data-placeholder="true"></option>'+
          '<option value="2025">2025</option>'+
          '<option value="2024">2024</option>'+
          '<option value="2023">2023</option>'+
          '<option value="2022">2022</option>'+
      '</select>'+
  '</div>'+
  '<div class="full-width">'+
      '<h4 style="text-align: left;">State</h4>'+
      '<select name="state" id="dui_state" class="select-box-dui-state" onchange="checkErr(this)">'+
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

    let month = form.elements['month'];
    let year = form.elements['year'];
    let state = form.elements['state'];

    let checkMonth = checkErr(month);
    let checkYear = checkErr(year);
    let checkState = checkErr(state);


    if(checkMonth && checkYear && checkState)
    {
      let dui = formdata.drivers.current.incidents.dui;
      dui.push(month.value, year.value, state.value);

      console.log(dui);

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
        '<div class="inner-wrap inner-wrap-input">'+
          '<div class="field-wrap">'+
            '<div class="input-field-wrap">'+
              '<input type="text" placeholder="Legal First Name" name="first_name" onkeyup="checkErrInput(this)">'+
              '<label>First Name</label>'+
            '</div>'+
          '</div>'+
        '</div>'+
        '<h4 style="text-align: left;" class="mt-20">Legal Last Name</h4>'+
        '<div class="inner-wrap inner-wrap-input">'+
          '<div class="field-wrap">'+
            '<div class="input-field-wrap">'+
            '<input type="text" placeholder="Legal Last Name" name="last_name" onkeyup="checkErrInput(this)">'+
            '<label>Last Name</label>'+
          '</div>'+
        '</div>'+
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

    let first_name = form.elements['first_name'];
    let last_name = form.elements['last_name'];
    
    let checkFirst = checkErrInput(first_name);
    let checkLast = checkErrInput(last_name);

    if(checkFirst && checkLast)
    {
      let sr22 = formdata.drivers.current.incidents.sr22;
      sr22.push(first_name.value, last_name.value);

      console.log(sr22);

      nextIncident(e);

      //increase value for every action
      if(driverCounter == 0)
      {
        increasePercent(2);
      }
    }

  });
}

/** ------------------- next incident ------------ */
let incidentIndex = 0;
function nextIncident(e)
{
  let parts = formdata.drivers.current.incidents.part;
  if(e.name == 'back'){
    incidentIndex--;
  }

  let order = ['accident', 'ticket', 'dui', 'sr-22'];
  parts.sort((a, b) => order.indexOf(a) - order.indexOf(b));

  if(parts[incidentIndex] == 'accident')
  {
    accident(e);
    if(e.name == 'back'){
      incidentIndex--;
    }else{
      incidentIndex++;
    }
  }
  else if(parts[incidentIndex] == 'ticket')
  {
    ticket(e);
    if(e.name == 'back'){
      incidentIndex--;
    }else{
      incidentIndex++;
    }
  }
  else if(parts[incidentIndex] == 'dui')
  {
    dui(e);
    if(e.name == 'back'){
      incidentIndex--;
    }else{
      incidentIndex++;
    }
  }
  else if(parts[incidentIndex] == 'sr-22')
  {
    driverName(e);
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

  formdata.drivers.list.push(formdata.drivers.current);
  // formdata.drivers.current.general = [];
  // formdata.drivers.current.dob = [];
  // formdata.drivers.current.incidents.part = [];
  // formdata.drivers.current.incidents.accident = [];
  // formdata.drivers.current.incidents.ticket = [];
  // formdata.drivers.current.incidents.dui = [];
  // formdata.drivers.current.incidents.sr22 = [];
  console.log(formdata.drivers);

}

// anotherDriver();

/** ------------------ Owner Details -------------------- */
function ownerAddress()
{
  container.innerHTML = '<div class="step step-number step-content-basic">'+
  '<h2>Current Address</h2>'+
  '<form action="#" id="addressForm">'+
  '<div class="inner-wrap column-wrap">'+
    '<div class="full-width">'+
      '<h4 style="text-align: left;">Street Address</h4>'+
      '<input id="autocomplete" type="text" name="address" placeholder="Street Address" onkeyup="fillInAddress()">'+
    '</div>'+
    '<div class="half-width">'+
        '<h4 style="text-align: left;">Zip Code</h4>'+
        '<input type="text" name="zip" placeholder="Zip Code" onkeyup="checkErrInput(this)" id="zip">'+
    '</div>'+
    '<div class="half-width">'+
        '<h4 style="text-align: left;">State</h4>'+
        '<select name="state" id="address_state" class="select-box-address-state" onchange="checkErr(this);">'+
            '<option data-placeholder="true"></option>'+
            '<option value="Alabama">Alabama</option>'+
            '<option value="Alaska">Alaska</option>'+
            '<option value="Arizona">Arizona</option>'+
            '<option value="Arkansas">Arkansas</option>'+
            '<option value="California">California</option>'+
            '<option value="Colorado">Colorado</option>'+
            '<option value="Connecticut">Connecticut</option>'+
            '<option value="Delaware">Delaware</option>'+
            '<option value="Florida">Florida</option>'+
            '<option value="Georgia">Georgia</option>'+
            '<option value="Hawaii">Hawaii</option>'+
            '<option value="Idaho">Idaho</option>'+
            '<option value="Illinois">Illinois</option>'+
            '<option value="Indiana">Indiana</option>'+
            '<option value="...">...</option>'+
        '</select>'+
      '</div>'+
      '<div class="full-width">'+
          '<h4 style="text-align: left;">City</h4>'+
          '<input type="text" name="city" placeholder="City" onkeyup="checkErrInput(this)" id="city">'+
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
  initAutocomplete();
}

// ownerAddress('e');

/** -------------------- check accident form ------------ */
function checkAddressForm(e)
{
  let form = document.querySelector('#addressForm');
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    let address = form.elements['address'];
    let zip = form.elements['zip'];
    let state = form.elements['state'];
    let city = form.elements['city'];

    let checkAddr = checkErrInput(address);
    let checkZip = checkErrInput(zip);
    let checkState = checkErr(state);
    let checkCity = checkErrInput(city);

    if(checkAddr && checkZip && checkState && checkCity)
    {
      formdata.owner.address.push(address.value, zip.value, state.value, city.value);

      console.log(formdata.owner.address);

      ownership();

      //increase value for every action
      increasePercent(5);
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
      '<button class="input" onclick="emailAddress(this)">OTHER</button>'+
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
        '<input type="email" id="email" placeholder="Email Address" onkeyup="checkEmail(this)">'+
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

    formdata.owner.contact.push(e.innerHTML);
    console.log(formdata.owner.contact);
}
// emailAddress();

function emailForm(e)
{
  let email = document.getElementById('email');

  if(checkEmail(email))
  {
    formdata.owner.contact.push(email.value);
    getQuote(e);

    //increase value for every action
    increasePercent(5);
  }
}

function getQuote(e)
{
  container.innerHTML = '<div class="step step-number step-content-basic">'+
    '<h2>Last Step, Get Your Quotes</h2>'+
      '<div class="inner-wrap column-wrap>'+
        '<div class="full-width">'+
          '<h4 style="text-align: left;">Phone Number</h4>'+
          '<input type="text" id="phone" name="phone" placeholder="555-555-5555" onkeyup="checkPhone(this)">'+
          // '<input type="text" placeholder="Phone Number" class="error">'+
          '<span class="error-msg"></span>'+
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

  if(checkPhone(phone))
  {
    formdata.owner.contact.push(phone.value);

    // let data = {
    //   'vehicles': vehicles,
    //   'drivers': drivers,
    //   'owner': ownerArr
    // }

    // console.log(data);
    thankYou();

    //increase value for every action
    increasePercent(12);

    document.getElementById('result').textContent = JSON.stringify(formdata, null, 4);
  }
}

function thankYou()
{
  container.innerHTML = '<div class="step step-1 step-content-basic">'+
    '<h2>🎉 Thank You!</h2>'+
    '<h3 class="thanks-subtitle">Your Free Car Insurance Quote is on Its Way</+h3>'+
    '<p class="thanks-body">Thank you for taking the time to complete your car +insurance quote request. Our team is reviewing your details, and you’ll receive your personalized quote shortly.</p>'+
    '<hr class="thanks-separator">'+
    '<h3>Check out our other services</h3>'+
    '<div class="thanks-links">'+
      '<a href="#">Home Insurance</a>'+
      '<a href="#">Life Insurance</a>'+
      '<a href="#">Health Insurance</a>'+
      '<a href="#">Business Insurance</a>'+
    '</div>'+
  '</div>';
}

function getBack(e){
  console.log(e.parentNode.parentNode);
  e.parentNode.parentNode.previousElementSibling.style.display = 'block';
  // e.parentNode.parentNode.style.display = 'none';
}