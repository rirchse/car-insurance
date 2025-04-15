let formdata = {
  vehicles: {
    list: [],
    current: []
  },
  drivers: {
    list: [],
    current: {
      names: [],
      general: [],
      dob: [],
      incidents: {
        part:[],
        accident: [],
        ticket: [],
        dui: []
      }
    }
  },
  owner: {
    insurance: [],
    address: [],
    contact: []
  }
};

let incidents = {
  forward : [],
  backward : []
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
  if(number >= 100){
    number = 100;
  }
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

function createZIPCodePanel(e)
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
      '<div class="more-options inner-wrap-btn">'+
        '<button class="show-more" onclick="brands(this)" value="next">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 +24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />'+
          '</svg>'+
          'Continue...'+
        '</button>'+
      '</div>'+
    '</div>'+
  '</div>';

  if(vehicleCounter == 0 && e.value == 'back')
  {
    increasePercent(-10);
  }
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
        if(vehicleCounter == 0){
          //increase value for every action
          increasePercent(10);
        }

        // execute brands
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
      if(formdata.vehicles.current[0] == b){
        btn.setAttribute('class', 'input active');
      }
      btn.setAttribute('onclick', 'checkBrands(this)');
      btn.setAttribute('name', b);
      btn.innerHTML = '<div class="input-wrap">'+
        '<img width="150" height="100" src="'+imgdata[b]+'" alt="'+b+'">'+
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
  }) // Use the data
  .catch(error => console.error('Error loading JSON:', error));

  if(vehicleCounter == 0 && e.value == 'next')
  {
    increasePercent(10);
  }

  if(vehicleCounter == 0 && e.value == 'back')
  {
    increasePercent(-10);
  }
}

function checkBrands(e)
{
  // let brand = formdata.vehicles.current;
  // console.log(brand[0]);
  //increase value for every action
  if(vehicleCounter == 0)
  {
    increasePercent(10);
  }
  //call to the write years
  writeYears(e);

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
      if(formdata.vehicles.current[1] == b){
        btn.setAttribute('class', 'input active');
      }
      btn.setAttribute('onclick', 'checkYears(this)');
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
    back.innerHTML = '<button class="back" onclick="brands(this)" value="back"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
    '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
    '</svg> Back </div>';
    container.appendChild(back);

    if(vehicleCounter == 0 && e.value == 'back')
    {
      increasePercent(-15);
    }

    // store brand to the object
    formdata.vehicles.current[0] = brand;
    console.log(formdata.vehicles.current);
  }) // Use the data
  .catch(error => console.error('Error loading JSON:', error));
}

function checkYears(e)
{
  // let brand = formdata.vehicles.current;
  // console.log(brand[1]);
  //increase value for every action
  if(vehicleCounter == 0)
  {
    increasePercent(15);
  }
  //call to the write years
  models(e);

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
    if(formdata.vehicles.current[2] == b){
      btn.setAttribute('class', 'input active');
    }
    btn.setAttribute('name', b);
    btn.setAttribute('onclick', 'checkModel(this)');
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
    // store year to the vehicle object
    formdata.vehicles.current[1] = year;
    console.log(formdata.vehicles.current);
  }

  if(vehicleCounter == 0 && e.value == 'back')
  {
    increasePercent(-10);
  }
}) // Use the data
.catch(error => console.error('Error loading JSON:', error));
}

function checkModel(e)
{
  //increase value for every action
  if(vehicleCounter == 0)
  {
    increasePercent(10);
  }
  owner(e);
}

function owner(e)
{
  let own = formdata.vehicles.current;
  container.innerHTML = '<div class="step step-number step-content-basic">'+
  '<h4>'+(vehicleCounter > 0 ? countArr[vehicleCounter]+' Vehicle' : "")+' </h4>'+
  '<h2>Vehicle Ownership</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="model">'+
      '<button class="input '+(own[3] == 'Finance' ? 'active': '')+'" onclick="checkOwner(this)">Finance</button>'+
      '<button class="input '+(own[3] == 'Lease' ? 'active': '')+'" onclick="checkOwner(this)">Lease</button>'+
      '<button class="input '+(own[3] == 'Own' ? 'active': '')+'" onclick="checkOwner(this)">Own</button>'+
      '<button class="input '+(own[3] == 'Other' ? 'active': '')+'" onclick="checkOwner(this)">Other</button>'+
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
    // store model to the vehicle object
    formdata.vehicles.current[2] = e.name;
    console.log(formdata.vehicles.current);
  }

  if(vehicleCounter == 0 && e.value == 'back'){
    increasePercent(-10);
  }
}

function checkOwner(e)
{
  //increase value for every action
  if(vehicleCounter == 0)
  {
    increasePercent(10);
  }
  milage(e);
}

function milage(e)
{
  let mile = formdata.vehicles.current;
  container.innerHTML = '<div class="step step-number step-content-basic">'+
  '<h4>'+(vehicleCounter > 0 ? countArr[vehicleCounter]+' Vehicle' : "")+' </h4>'+
  '<h2>Annual Mileage</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="model">'+
      '<button class="input '+(mile[4] == 'Under 5,000' ? 'active': '')+'" onclick="checkMilage(this)">Under 5,000</button>'+
      '<button class="input '+(mile[4] == '5,001-10,000' ? 'active': '')+'" onclick="checkMilage(this)">5,001-10,000</button>'+
      '<button class="input '+(mile[4] == '10,001-15,000' ? 'active': '')+'" onclick="checkMilage(this)">10,001-15,000</button>'+
      '<button class="input '+(mile[4] == '15,000+' ? 'active': '')+'" onclick="checkMilage(this)">15,000+</button>'+
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
    //store owner to the vehicle object
    formdata.vehicles.current[3] = e.innerHTML;
    console.log(formdata.vehicles.current);
  }
  if(vehicleCounter == 0 && e.value == 'back'){
    increasePercent(-10);
  }
}

function checkMilage(e)
{
  //increase value for every action
  if(vehicleCounter == 0)
  {
    increasePercent(10);
  }
  coverage(e);
}

function coverage(e)
{
  let cover = formdata.vehicles.current;
  container.innerHTML = '<div class="step step-number step-content-basic">'+
  '<h4>'+(vehicleCounter > 0 ? countArr[vehicleCounter]+' Vehicle' : "")+' </h4>'+
  '<h2>Desired Coverage Level</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="model">'+
      '<button class="input '+(cover[5] == 'Superior' ? 'active': '')+'" onclick="checkCoverage(this)">Superior</button>'+
      '<button class="input '+(cover[5] == 'Standard' ? 'active': '')+'" onclick="checkCoverage(this)">Standard</button>'+
      '<button class="input '+(cover[5] == 'Basic' ? 'active': '')+'" onclick="checkCoverage(this)">Basic</button>'+
      '<button class="input '+(cover[5] == 'State' ? 'active': '')+'" onclick="checkCoverage(this)">State</button>'+
      '<button class="input '+(cover[5] == 'Minimum' ? 'active': '')+'" onclick="checkCoverage(this)">Minimum</button>'+
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
    //store milage to the vehicle object
    formdata.vehicles.current[4] = e.innerHTML;
    console.log(formdata.vehicles.current);
  }
  if(vehicleCounter == 0 && e.value == 'back'){
    increasePercent(-9);
  }
}

function checkCoverage(e)
{
  //increase value for every action
  if(vehicleCounter == 0)
  {
    increasePercent(9);
  }
  anotherVehicle(e);
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
    // increasePercent(5);
    //store coverage to the vehicle object
    formdata.vehicles.current[5] = e.innerHTML;
    formdata.vehicles.list.push(formdata.vehicles.current);
    console.log(formdata.vehicles.current);
  }
}

function checkAnotherVehicle(e)
{
  if(e.name == 'Yes')
  {
    vehicleCounter++;
    brands(e);
    formdata.vehicles.current = [];
  }
}

function insurance(e)
{
  let insure = formdata.owner.insurance;
  console.log(insure);
  container.innerHTML = '<div class="step step-number step-content-basic">'+
  '<h2>Insurance Details</h2>'+
  '<form action="#" id="insuranceForm">'+
    '<div class="inner-wrap">'+
      '<h4 style="text-align: left;">Current Insurance Carier</h4>'+
      '<select name="career" id="insurance_carrier" class="select-box-carrier carier" onchange="checkErr(this)">'+
          '<option data-placeholder="true"></option>'+
          '<option value="Other"'+(insure[0] == 'Other'? 'selected':'')+'>Other</option>'+
          '<option value="Not Currently Insured"'+(insure[0] == 'Not Currently Insured'? 'selected':'')+'>Not Currently Insured</option>'+
          '<option value="21st Century"'+(insure[0] == '21st Century'? 'selected':'')+'>21st Century</option>'+
          '<option value="AAA"'+(insure[0] == 'AAA'? 'selected':'')+'>AAA</option>'+
          '<option value="Allstate"'+(insure[0] == 'Allstate'? 'selected':'')+'>Allstate</option>'+
          '<option value="American Family"'+(insure[0] == 'American Family'? 'selected':'')+'>American Family</option>'+
          '<option value="Bristol West"'+(insure[0] == 'Bristol West'? 'selected':'')+'>Bristol West</option>'+
          '<option value="Dairyland Insurance"'+(insure[0] == 'Dairyland Insurance'? 'selected':'')+'>Dairyland Insurance</option>'+
          '<option value="Direct General"'+(insure[0] == 'Direct General'? 'selected':'')+'>Direct General</option>'+
          '<option value="Elephant"'+(insure[0] == 'Elephant'? 'selected':'')+'>Elephant</option>'+
          '<option value="Erie Insurance"'+(insure[0] == 'Erie Insurance'? 'selected':'')+'>Erie Insurance</option>'+
          '<option value="Esurance"'+(insure[0] == 'Esurance'? 'selected':'')+'>Esurance</option>'+
          '<option value="Farm Bureau/Farm Family/Rural"'+(insure[0] == 'Farm Bureau/Farm Family/Rural'? 'selected':'')+'>Farm Bureau/Farm Family/Rural</option>'+
          '<option value="Farmers"'+(insure[0] == 'Farmers'? 'selected':'')+'>Farmers</option>'+
          '<option value="Farmers Insurance"'+(insure[0] == 'Farmers Insurance'? 'selected':'')+'>Farmers Insurance</option>'+
          '<option value="Gainsco"'+(insure[0] == 'Gainsco'? 'selected':'')+'>Gainsco</option>'+
          '<option value="Geico"'+(insure[0] == 'Geico'? 'selected':'')+'>Geico</option>'+
          '<option value="Liberty Mutual"'+(insure[0] == 'Liberty Mutual'? 'selected':'')+'>Liberty Mutual</option>'+
          '<option value="Mercury"'+(insure[0] == 'Mercury'? 'selected':'')+'>Mercury</option>'+
          '<option value="Nationwide"'+(insure[0] == 'Nationwide'? 'selected':'')+'>Nationwide</option>'+
          '<option value="Plymouth Rock"'+(insure[0] == 'Plymouth Rock'? 'selected':'')+'>Plymouth Rock</option>'+
          '<option value="Progressive"'+(insure[0] == 'Progressive'? 'selected':'')+'>Progressive</option>'+
          '<option value="Prudential"'+(insure[0] == 'Prudential'? 'selected':'')+'>Prudential</option>'+
          '<option value="SafeAuto"'+(insure[0] == 'SafeAuto'? 'selected':'')+'>SafeAuto</option>'+
          '<option value="Safeco"'+(insure[0] == 'Safeco'? 'selected':'')+'>Safeco</option>'+
          '<option value="State Farm"'+(insure[0] == 'State Farm'? 'selected':'')+'>State Farm</option>'+
          '<option value="The General"'+(insure[0] == 'The General'? 'selected':'')+'>The General</option>'+
          '<option value="The Hartford"'+(insure[0] == 'The Hartford'? 'selected':'')+'>The Hartford</option>'+
          '<option value="Travelers"'+(insure[0] == 'Travelers'? 'selected':'')+'>Travelers</option>'+
          '<option value="USAA"'+(insure[0] == 'USAA'? 'selected':'')+'>USAA</option>'+
      '</select>'+
      '<p class="error" id="carrier_err"></p>'+
      '<h4 style="text-align: left;">Continuous Coverage</h4>'+
      '<select name="coverage" id="insurance_coverage" class="select-box-coverage coverage" onchange="checkErr(this)">'+
          '<option data-placeholder="true"></option>'+
          '<option value="Less Than 6 Months" '+(insure[1] == 'Less Than 6 Months'? 'selected':'')+'>Less Than 6 Months</option>'+
          '<option value="6 Months" '+(insure[1] == '6 Months'? 'selected':'')+'>6 Months</option>'+
          '<option value="1 Year" '+(insure[1] == '1 Year'? 'selected':'')+'>1 Year</option>'+
          '<option value="2 Years" '+(insure[1] == '2 Years'? 'selected':'')+'>2 Years</option>'+
          '<option value="3 Years" '+(insure[1] == '3 Years'? 'selected':'')+'>3 Years</option>'+
          '<option value="3 to 5 Years" '+(insure[1] == '3 to 5 Years'? 'selected':'')+'>3 to 5 Years</option>'+
          '<option value="More Than 5 Years" '+(insure[1] == 'More Than 5 Years'? 'selected':'')+'>More Than 5 Years</option>'+
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
          formdata.owner.insurance = [career.value, coverage.value];

          addDriver();
        }

    });
}

/** ------------------ Add Driver Section --------------- */
function addDriver()
{
  let driver = formdata.drivers.current.general;
  container.innerHTML = '<div class="step step-number step-content-basic">'+
  '<h5 style="color: #666">'+countArr[driverCounter]+' Driver</h5>'+
  '<h2>Gender</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="model">'+
      '<button class="input '+(driver[0] == 'Male' ? 'active' : '')+'" onclick="driverMaritalStatus(this)">Male</button>'+
      '<button class="input '+(driver[0] == 'Female' ? 'active' : '')+'" onclick="driverMaritalStatus(this)">Female</button>'+
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
  let driver = formdata.drivers.current.general;
  container.innerHTML = '<div class="step step-number step-content-basic three-items">'+
  '<h5 style="color: #666">'+countArr[driverCounter]+' Driver</h5>'+
  '<h2>Marital Status</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="model">'+
      '<button class="input '+(driver[1] == 'Married' ? 'active' : '')+'" onclick="birthMonth(this)">Married</button>'+
      '<button class="input '+(driver[1] == 'Single' ? 'active' : '')+'" onclick="birthMonth(this)">Single</button>'+
      '<button class="input '+(driver[1] == 'Divorced' ? 'active' : '')+'" onclick="birthMonth(this)">Divorced</button>'+
      '<button class="input '+(driver[1] == 'Domestic Partner' ? 'active' : '')+'" onclick="birthMonth(this)">Domestic Partner</button>'+
      '<button class="input '+(driver[1] == 'Separated' ? 'active' : '')+'" onclick="birthMonth(this)">Separated</button>'+
      '<button class="input '+(driver[1] == 'Widowed' ? 'active' : '')+'" onclick="birthMonth(this)">Widowed</button>'+
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
      // increasePercent(5);
    }
  
    //store gender to driver array
    formdata.drivers.current.general[0] = e.innerHTML;
  
    console.log(formdata);
  }
}

function birthMonth(e)
{
  let dob = formdata.drivers.current.dob;
  container.innerHTML = '<div class="step step-number step-content-basic three-items">'+
  '<h5 style="color: #666">'+countArr[driverCounter]+' Driver</h5>'+
  '<h2>Birth Month</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="model">'+
      '<button class="input '+(dob[0] == 'January'? 'active' : '')+'" onclick="birthDay(this)">January</button>'+
      '<button class="input '+(dob[0] == 'February'? 'active' : '')+'" onclick="birthDay(this)">February</button>'+
      '<button class="input '+(dob[0] == 'March'? 'active' : '')+'" onclick="birthDay(this)">March</button>'+
      '<button class="input '+(dob[0] == 'April'? 'active' : '')+'" onclick="birthDay(this)">April</button>'+
      '<button class="input '+(dob[0] == 'May'? 'active' : '')+'" onclick="birthDay(this)">May</button>'+
      '<button class="input '+(dob[0] == 'June'? 'active' : '')+'" onclick="birthDay(this)">June</button>'+
      '<button class="input '+(dob[0] == 'July'? 'active' : '')+'" onclick="birthDay(this)">July</button>'+
      '<button class="input '+(dob[0] == 'August'? 'active' : '')+'" onclick="birthDay(this)">August</button>'+
      '<button class="input '+(dob[0] == 'September'? 'active' : '')+'" onclick="birthDay(this)">September</button>'+
      '<button class="input '+(dob[0] == 'October'? 'active' : '')+'" onclick="birthDay(this)">October</button>'+
      '<button class="input '+(dob[0] == 'November'? 'active' : '')+'" onclick="birthDay(this)">November</button>'+
      '<button class="input '+(dob[0] == 'December'? 'active' : '')+'" onclick="birthDay(this)">December</button>'+
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
      // increasePercent(5);
    }
  
    //store marital status to the drivers general array
    formdata.drivers.current.general[1] = e.innerHTML;
  
    console.log(formdata.drivers.current.general);
  }
}

function birthDay(e)
{
  let dob = formdata.drivers.current.dob;
  container.innerHTML = '<div class="step step-number step-content-basic three-items">'+
  '<h5 style="color: #666">'+countArr[driverCounter]+' Driver</h5>'+
  '<h2>Birth Day</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="birth_day">'+
    '</div>'+
  '</div>'+
  '<div class="back-to-prev">'+
      '<button class="back" onclick="birthMonth(this)" name="" value="back">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
  '</div>';
  
  for(let d = 1; d < 31; d++)
  {
    let day = document.createElement('button');
    day.setAttribute('class', 'input');
    if(dob[1] == d){
      day.setAttribute('class', 'input active');
    }
    day.setAttribute('onclick', 'birthYear(this)');
    day.value = d;
    day.innerHTML = d;
    document.getElementById('birth_day').appendChild(day);
  }

  if(e.value != 'back')
  {
    //increase value for every action
    if(driverCounter == 0)
    {
      // increasePercent(3);
    }
  
    //birth day store to current.dob array
    formdata.drivers.current.dob[0] = e.innerHTML;
  
    console.log(formdata.drivers.current.dob);
  }
}

function birthYear(e)
{
  let dob = formdata.drivers.current.dob;
  container.innerHTML = '<div class="step step-number step-content-basic three-items">'+
    '<h5 style="color: #666">'+countArr[driverCounter]+' Driver</h5>'+
    '<h2>Birth Year</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="birth_year">'+
    '</div>'+
    '<div class="back-to-prev">'+
      '<button class="back" onclick="birthDay(this)" name="" value="back">'+
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
    if(dob[2] == d){
      y.setAttribute('class', 'input active');
    }
    y.setAttribute('onclick', 'incident(this)');
    y.innerHTML = d;
    document.getElementById('birth_year').appendChild(y);
  }

  if(e.value != 'back')
  {
    //increase value for every action
    if(driverCounter == 0)
    {
      // increasePercent(2);
    }
  
    //birth day push to birthDate array
    formdata.drivers.current.dob[1] = e.innerHTML;
  
    console.log(formdata.drivers.current);
  }
}
// birthYear();

function incident(e)
{
  let dob = formdata.drivers.current.dob;
  let parts = formdata.drivers.current.incidents.part;
  
  container.innerHTML = '<div class="step step-number step-content-basic five-items">'+
  '<h5 style="color: #666">'+countArr[driverCounter]+' Driver</h5>'+
  '<h2>Incidents In The Past 3 Years</h2>'+
    '<div class="inner-wrap checkbox-wrap" id="incident">'+
      '<div class="incident-item">'+
        '<p>Had an accident</p>'+
        '<p>'+
            '<label class="radio-wrap">Yes'+
                '<input type="radio" name="accident" onchange="checkIncident(this)" value="Yes" '+(parts.includes('accident')? 'checked':'')+'>'+
                '<span class="checkmark"></span>'+
            '</label>'+
            '<label class="radio-wrap">No'+
                '<input type="radio" name="accident" onchange="checkIncident(this)" value="No" '+(!parts.includes('accident')? 'checked':'')+'>'+
                '<span class="checkmark"></span>'+
            '</label>'+
        '</p>'+
    '</div>'+
    '<div class="incident-item">'+
        '<p>Received a ticket</p>'+
        '<p>'+
            '<label class="radio-wrap">Yes'+
                '<input type="radio" name="ticket" onchange="checkIncident(this)" value="Yes" '+(parts.includes('ticket')? 'checked':'')+'>'+
                '<span class="checkmark"></span>'+
            '</label>'+
            '<label class="radio-wrap">No'+
                '<input type="radio" name="ticket" onchange="checkIncident(this)" value="No" '+(!parts.includes('ticket')? 'checked':'')+'>'+
                '<span class="checkmark"></span>'+
            '</label>'+
        '</p>'+
    '</div>'+
    '<div class="incident-item">'+
        '<p>Received a DUI</p>'+
        '<p>'+
            '<label class="radio-wrap">Yes'+
                '<input type="radio" name="dui" onchange="checkIncident(this)" value="Yes" '+(parts.includes('dui')? 'checked':'')+'>'+
                '<span class="checkmark"></span>'+
            '</label>'+
            '<label class="radio-wrap">No'+
                '<input type="radio" name="dui" onchange="checkIncident(this)" value="No" '+(!parts.includes('dui')? 'checked':'')+'>'+
                '<span class="checkmark"></span>'+
            '</label>'+
        '</p>'+
    '</div>'+
    '<div class="incident-item">'+
        '<p>Required SR-22?</p>'+
        '<p>'+
          '<label class="radio-wrap">Yes'+
              '<input type="radio" name="sr-22" onchange="checkIncident(this)" value="Yes" '+(parts.includes('Yes')? 'checked':'')+'>'+
              '<span class="checkmark"></span>'+
          '</label>'+
          '<label class="radio-wrap">No'+
              '<input type="radio" name="sr-22" onchange="checkIncident(this)" value="No" '+(parts == '' || parts.includes('No')? 'checked':'')+'>'+
              '<span class="checkmark"></span>'+
          '</label>'+
        '</p>'+
    '</div>'+
  '</div>'+
  '<div class="back-to-prev">'+
      '<button class="back" onclick="birthYear(this)" name="" value="back">'+
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

  if(e != null && e.value != 'back')
  {
    //increase value for every action
    if(driverCounter == 0)
    {
      // increasePercent(5);
    }
  
    //birth year push to birthDate array
    formdata.drivers.current.dob[2] = e.innerHTML;
    console.log(formdata.drivers.current.dob);
  }
}

// incident();


/** selects incidents parts  */
function checkIncident(e)
{
  let parts = formdata.drivers.current.incidents.part;
  if(e.value == 'Yes')
  {
    if(e.name == 'sr-22')
    {
      let i = parts.indexOf('No');
      if(i != -1){
        parts.splice(i, 1);
      }
      parts.push(e.value);
    }
    else
    {
      parts.push(e.name);
      incidents.forward.push(e.name);
    }
  }
  else
  {
    if(e.name == 'sr-22')
    {
      let i = parts.indexOf('Yes');
      if(i !== -1)
      {
        parts.splice(i, 1);
      }
      parts.push(e.value);
    }
    else
    {
      let index = parts.indexOf(e.name);
      if(index !== -1)
      {
        parts.splice(index, 1);
        incidents.forward.splice(index, 1);
      }
    }
  }

  console.log(parts);
  // console.log(incidents.forward);
}

function accident(e)
{
  let act = formdata.drivers.current.incidents.accident;
  container.innerHTML ='<div class="step step-number step-content-basic three-items">'+
  '<h5 style="color: #666">'+countArr[driverCounter]+' Driver</h5>'+
  '<h2>Accident Details</h2>'+
  '<form action=#" id="accidentForm">'+
    '<div class="inner-wrap column-wrap" id="incident">'+
      '<div class="half-width">'+
      '<h4 style="text-align: left;">Month</h4>'+
      '<select name="month" id="accident_month" class="select-box-accident-month" onchange="checkErr(this)">'+
          '<option data-placeholder="true"></option>'+
          '<option value="January" '+(act[0] == 'January'? 'selected' : '')+'>January</option>'+
          '<option value="February" '+(act[0] == 'February'? 'selected' : '')+'>February</option>'+
          '<option value="March" '+(act[0] == 'March'? 'selected' : '')+'>March</option>'+
          '<option value="April" '+(act[0] == 'April'? 'selected' : '')+'>April</option>'+
          '<option value="May" '+(act[0] == 'May'? 'selected' : '')+'>May</option>'+
          '<option value="June" '+(act[0] == 'June'? 'selected' : '')+'>June</option>'+
          '<option value="July" '+(act[0] == 'July'? 'selected' : '')+'>July</option>'+
          '<option value="August" '+(act[0] == 'August'? 'selected' : '')+'>August</option>'+
          '<option value="September" '+(act[0] == 'September'? 'selected' : '')+'>September</option>'+
          '<option value="October" '+(act[0] == 'October'? 'selected' : '')+'>October</option>'+
          '<option value="November" '+(act[0] == 'November'? 'selected' : '')+'>November</option>'+
          '<option value="December" '+(act[0] == 'December'? 'selected' : '')+'>December</option>'+
      '</select>'+
  '</div>'+
  '<div class="half-width">'+
      '<h4 style="text-align: left;">Year</h4>'+
      '<select name="year" id="accident_year" class="select-box-accident-year" onchange="checkErr(this)">'+
          '<option data-placeholder="true"></option>'+
          '<option value="2024" '+(act[1] == '2024'? 'selected' : '')+'>2024</option>'+
          '<option value="2023" '+(act[1] == '2023'? 'selected' : '')+'>2023</option>'+
          '<option value="2022" '+(act[1] == '2022'? 'selected' : '')+'>2022</option>'+
          '<option value="2021" '+(act[1] == '2021'? 'selected' : '')+'>2021</option>'+
      '</select>'+
  '</div>'+
  '<div class="full-width">'+
      '<h4 style="text-align: left;">Accident Description</h4>'+
      '<select name="description" id="accident_desc" class="select-box-accident-desc" onchange="checkErr(this)">'+
          '<option data-placeholder="true"></option>'+
          '<option value="Other" '+(act[2] == 'Other'? 'selected' : '')+'>Other</option>'+
          '<option value="Other Vehicle Hit Yours" '+(act[2] == 'Other Vehicle Hit Yours'? 'selected' : '')+'>Other Vehicle Hit Yours</option>'+
          '<option value="Vehicle Damaged Avoiding Accident" '+(act[2] == 'Vehicle Damaged Avoiding Accident'? 'selected' : '')+'>Vehicle Damaged Avoiding Accident</option>'+
          '<option value="Vehicle Hit Pedestrian" '+(act[2] == 'Vehicle Hit Pedestrian'? 'selected' : '')+'>Vehicle Hit Pedestrian</option>'+
          '<option value="Vehicle Hit Property" '+(act[2] == 'Vehicle Hit Property'? 'selected' : '')+'>Vehicle Hit Property</option>'+
          '<option value="Vehicle Hit Vehicle" '+(act[2] == 'Vehicle Hit Vehicle'? 'selected' : '')+'>Vehicle Hit Vehicle</option>'+
      '</select>'+
  '</div>'+
  '<div class="full-width">'+
      '<h4 style="text-align: left;">At Fault?</h4>'+
      '<select name="fault" id="accident_fault" class="select-box-accident-year" onchange="checkErr(this)">'+
          '<option data-placeholder="true"></option>'+
          '<option value="Yes" '+(act[3] == 'Yes'? 'selected' : '')+'>Yes</option>'+
          '<option value="No" '+(act[3] == 'No'? 'selected' : '')+'>No</option>'+
      '</select>'+
  '</div>'+
  '<div class="full-width">'+
      '<h4 style="text-align: left;">Damaged</h4>'+
      '<select name="damage" id="accident_damage" class="select-box-accident-year" onchange="checkErr(this)">'+
          '<option data-placeholder="true"></option>'+
          '<option value="Both" '+(act[4] == 'Both'? 'selected' : '')+'>Both</option>'+
          '<option value="No Damage" '+(act[4] == 'No Damage'? 'selected' : '')+'>No Damage</option>'+
          '<option value="People" '+(act[4] == 'People'? 'selected' : '')+'>People</option>'+
          '<option value="Property" '+(act[4] == 'Property'? 'selected' : '')+'>Property</option>'+
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
      '<button type="button" class="back" onclick="backIncident(this)" name="back" value="accident">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
      '<button type="submit" class="next" onclick="checkAccidentForm(this)" name="1"> Next'+
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
      formdata.drivers.current.incidents.accident = [month.value, year.value, description.value, fault.value, damage.value];

      console.log(formdata.drivers.current.incidents.accident);

      //push accident key to the backward object
      incidents.backward.push('accident');

      nextIncident(e);
    }

  });
}

function ticket(e)
{
  let act = formdata.drivers.current.incidents.ticket;
  container.innerHTML = '<div class="step step-number step-content-basic three-items">'+
  '<h5 style="color: #666">'+countArr[driverCounter]+' Driver</h5>'+
  '<h2>Ticket Details</h2>'+
  '<form action="#" id="ticketForm">'+
    '<div class="inner-wrap column-wrap" id="incident">'+
    '<div class="half-width">'+
      '<h4 style="text-align: left;">Month</h4>'+
      '<select name="month" id="ticket_month" class="select-box-ticket-month" onchange="checkErr(this)">'+
          '<option data-placeholder="true"></option>'+
          '<option value="January" '+(act[0] == 'January'? 'selected' : '')+'>January</option>'+
          '<option value="February" '+(act[0] == 'February'? 'selected' : '')+'>February</option>'+
          '<option value="March" '+(act[0] == 'March'? 'selected' : '')+'>March</option>'+
          '<option value="April" '+(act[0] == 'April'? 'selected' : '')+'>April</option>'+
          '<option value="May" '+(act[0] == 'May'? 'selected' : '')+'>May</option>'+
          '<option value="June" '+(act[0] == 'June'? 'selected' : '')+'>June</option>'+
          '<option value="July" '+(act[0] == 'July'? 'selected' : '')+'>July</option>'+
          '<option value="August" '+(act[0] == 'August'? 'selected' : '')+'>August</option>'+
          '<option value="September" '+(act[0] == 'September'? 'selected' : '')+'>September</option>'+
          '<option value="October" '+(act[0] == 'October'? 'selected' : '')+'>October</option>'+
          '<option value="November" '+(act[0] == 'November'? 'selected' : '')+'>November</option>'+
          '<option value="December" '+(act[0] == 'December'? 'selected' : '')+'>December</option>'+
      '</select>'+
  '</div>'+
  '<div class="half-width">'+
      '<h4 style="text-align: left;">Year</h4>'+
      '<select name="year" id="ticket_year" class="select-box-accident-year" onchange="checkErr(this)">'+
          '<option data-placeholder="true"></option>'+
          '<option value="2025" '+(act[1] == '2025'? 'selected' : '')+'>2025</option>'+
          '<option value="2024" '+(act[1] == '2024'? 'selected' : '')+'>2024</option>'+
          '<option value="2023" '+(act[1] == '2023'? 'selected' : '')+'>2023</option>'+
          '<option value="2022" '+(act[1] == '2022'? 'selected' : '')+'>2022</option>'+
      '</select>'+
  '</div>'+
  '<div class="full-width">'+
      '<h4 style="text-align: left;">Ticket Description</h4>'+
      '<select name="description" id="ticket_desc" class="select-box-accident-desc" onchange="checkErr(this)">'+
          '<option data-placeholder="true"></option>'+
          '<option value="Careless Driving" '+(act[2] == 'Careless Driving'? 'selected' : '')+'>Careless Driving</option>'+
          '<option value="Carpool Lane Violaion" '+(act[2] == 'Carpool Lane Violaion'? 'selected' : '')+'>Carpool Lane Violaion</option>'+
          '<option value="Child Not In Car Seat" '+(act[2] == 'Child Not In Car Seat'? 'selected' : '')+'>Child Not In Car Seat</option>'+
          '<option value="Defective Equipment" '+(act[2] == 'Defective Equipment'? 'selected' : '')+'>Defective Equipment</option>'+
          '<option value="Defective Vehicle Reduced Violation" '+(act[2] == 'Defective Vehicle Reduced Violation'? 'selected' : '')+'>Defective Vehicle Reduced Violation</option>'+
          '<option value="Driving Without A license" '+(act[2] == 'Driving Without A license'? 'selected' : '')+'>Driving Without A license</option>'+
          '<option value="Excessive Noise" '+(act[2] == 'Excessive Noise'? 'selected' : '')+'>Excessive Noise</option>'+
          '<option value="Exhibition Driving" '+(act[2] == 'Exhibition Driving'? 'selected' : '')+'>Exhibition Driving</option>'+
          '<option value="Expired Drivers License" '+(act[2] == 'Expired Drivers License'? 'selected' : '')+'>Expired Drivers License</option>'+
          '<option value="Expired Emissions" '+(act[2] == 'Expired Emissions'? 'selected' : '')+'>Expired Emissions</option>'+
          '<option value="Expired Registration" '+(act[2] == 'Expired Registration'? 'selected' : '')+'>Expired Registration</option>'+
          '<option value="Failure To Obey Traffic Signal" '+(act[2] == 'Failure To Obey Traffic Signal'? 'selected' : '')+'>Failure To Obey Traffic Signal</option>'+
          '<option value="Failure To Signal" '+(act[2] == 'Failure To Signal'? 'selected' : '')+'>Failure To Signal</option>'+
          '<option value="Failure To Stop" '+(act[2] == 'Failure To Stop'? 'selected' : '')+'>Failure To Stop</option>'+
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
      '<button type="button" class="back" onclick="backIncident(this)" name="back" value="ticket">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
      '<button type="submit" class="next" onclick="checkTicketForm(this)" name="2"> Next'+
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
      formdata.drivers.current.incidents.ticket = [month.value, year.value, description.value];

      console.log(formdata.drivers.current.incidents.ticket);
    
      incidents.backward.push('ticket');

      nextIncident(e);
    }

  });
}

function dui(e)
{
  let act = formdata.drivers.current.incidents.dui;
  container.innerHTML = '<div class="step step-number step-content-basic three-items">'+
  '<h5 style="color: #666">'+countArr[driverCounter]+' Driver</h5>'+
  '<h2>DUI Details</h2>'+
  '<form action="#" id="duiForm">'+
    '<div class="inner-wrap column-wrap" id="incident">'+
    '<div class="half-width">'+
      '<h4 style="text-align: left;">Month</h4>'+
      '<select name="month" id="dui_month" class="select-box-dui-month" onchange="checkErr(this)">'+
          '<option data-placeholder="true"></option>'+
          '<option value="January" '+(act[0] == 'January'? 'selected' : '')+'>January</option>'+
          '<option value="February" '+(act[0] == 'February'? 'selected' : '')+'>February</option>'+
          '<option value="March" '+(act[0] == 'March'? 'selected' : '')+'>March</option>'+
          '<option value="April" '+(act[0] == 'April'? 'selected' : '')+'>April</option>'+
          '<option value="May" '+(act[0] == 'May'? 'selected' : '')+'>May</option>'+
          '<option value="June" '+(act[0] == 'June'? 'selected' : '')+'>June</option>'+
          '<option value="July" '+(act[0] == 'July'? 'selected' : '')+'>July</option>'+
          '<option value="August" '+(act[0] == 'August'? 'selected' : '')+'>August</option>'+
          '<option value="September" '+(act[0] == 'September'? 'selected' : '')+'>September</option>'+
          '<option value="October" '+(act[0] == 'October'? 'selected' : '')+'>October</option>'+
          '<option value="November" '+(act[0] == 'November'? 'selected' : '')+'>November</option>'+
          '<option value="December" '+(act[0] == 'December'? 'selected' : '')+'>December</option>'+
      '</select>'+
  '</div>'+
  '<div class="half-width">'+
      '<h4 style="text-align: left;">Year</h4>'+
      '<select name="year" id="dui_year" class="select-box-dui-year" onchange="checkErr(this)">'+
          '<option data-placeholder="true"></option>'+
          '<option value="2025" '+(act[1] == '2025'? 'selected' : '')+'>2025</option>'+
          '<option value="2024" '+(act[1] == '2024'? 'selected' : '')+'>2024</option>'+
          '<option value="2023" '+(act[1] == '2023'? 'selected' : '')+'>2023</option>'+
          '<option value="2022" '+(act[1] == '2022'? 'selected' : '')+'>2022</option>'+
      '</select>'+
  '</div>'+
  '<div class="full-width">'+
      '<h4 style="text-align: left;">State</h4>'+
      '<select name="state" id="dui_state" class="select-box-dui-state" onchange="checkErr(this)">'+
          '<option data-placeholder="true"></option>'+
          '<option value="Alabama" '+(act[2] == 'Alabama'? 'selected' : '')+'>Alabama</option>'+
          '<option value="Alaska" '+(act[2] == 'Alaska'? 'selected' : '')+'>Alaska</option>'+
          '<option value="Arizona" '+(act[2] == 'Arizona'? 'selected' : '')+'>Arizona</option>'+
          '<option value="Arkansas" '+(act[2] == 'Arkansas'? 'selected' : '')+'>Arkansas</option>'+
          '<option value="California" '+(act[2] == 'California'? 'selected' : '')+'>California</option>'+
          '<option value="Colorado" '+(act[2] == 'Colorado'? 'selected' : '')+'>Colorado</option>'+
          '<option value="Connecticut" '+(act[2] == 'Connecticut'? 'selected' : '')+'>Connecticut</option>'+
          '<option value="Delaware" '+(act[2] == 'Delaware'? 'selected' : '')+'>Delaware</option>'+
          '<option value="Florida" '+(act[2] == 'Florida'? 'selected' : '')+'>Florida</option>'+
          '<option value="Georgia" '+(act[2] == 'Georgia'? 'selected' : '')+'>Georgia</option>'+
          '<option value="Hawaii" '+(act[2] == 'Hawaii'? 'selected' : '')+'>Hawaii</option>'+
          '<option value="Idaho" '+(act[2] == 'Idaho'? 'selected' : '')+'>Idaho</option>'+
          '<option value="Illinois" '+(act[2] == 'Illinois'? 'selected' : '')+'>Illinois</option>'+
          '<option value="Indiana" '+(act[2] == 'Indiana'? 'selected' : '')+'>Indiana</option>'+
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
      '<button type="button" class="back" onclick="backIncident(this)" name="back" value="dui">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
      '<button type="submit" class="next" onclick="checkDuiForm(this)" name="3"> Next'+
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
      formdata.drivers.current.incidents.dui = [month.value, year.value, state.value];

      console.log(formdata.drivers.current.incidents.dui);

      incidents.backward.push('dui');

      nextIncident(e);
    }

  });
}

function driverName()
{
  let first_name = '', last_name = '';
  let names = formdata.drivers.current.names;
  if(names[0])
  {
    first_name = names[0];
  }
  if(names[1])
  {
    last_name = names[1];
  }
  
  container.innerHTML = '<div class="step step-number step-content-basic three-items">'+
    '<h5 style="color: #666">'+countArr[driverCounter]+' Driver</h5>'+
    '<h2>Name</h2>'+
    '<form action="#" id="driverNameForm">'+
      '<div class="inner-wrap column-wrap" id="incident">'+
      '<div class="full-width">'+
        // '<h4 style="text-align: left;">Legal First Name</h4>'+
        '<div class="inner-wrap inner-wrap-input">'+
          '<div class="field-wrap">'+
            '<div class="input-field-wrap">'+
              '<input type="text" placeholder="First Name" name="first_name" onkeyup="checkErrInput(this)" value="'+first_name+'" required>'+
              '<label>First Name</label>'+
            '</div>'+
          '</div>'+
        '</div>'+
        // '<h4 style="text-align: left;" class="mt-20">Legal Last Name</h4>'+
        '<div class="inner-wrap inner-wrap-input">'+
          '<div class="field-wrap">'+
            '<div class="input-field-wrap">'+
                '<input type="text" placeholder="Last Name" name="last_name" onkeyup="checkErrInput(this)" value="'+last_name+'" required>'+
                '<label>Last Name</label>'+
            '</div>'+
          '</div>'+
        '</div>'+
    '</div>'+
    '<div class="back-to-prev">'+
      '<button type="button" class="back" onclick="backIncident(this)" name="back" value="sr-22">'+
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
      '<button type="submit" class="next" onclick="checkNameForm(this)" name="4"> Next'+
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
      formdata.drivers.current.names = [first_name.value, last_name.value];

      console.log(formdata.drivers.current.names);

      // incidents.backward.push('sr-22');

      anotherDriver();

      //increase value for every action
      if(driverCounter == 0)
      {
        increasePercent(0);
      }
    }

  });
}

/** ------------------- next incident ------------ */
function nextIncident(e)
{
  if(incidents.forward.includes('accident'))
  {
    accident(e);
    incidents.forward.splice(incidents.forward.indexOf('accident'), 1);
  }
  else if(incidents.forward.includes('ticket'))
  {
    ticket(e);
    incidents.forward.splice(incidents.forward.indexOf('ticket'), 1);
  }
  else if(incidents.forward.includes('dui'))
  {
    dui(e);
    incidents.forward.splice(incidents.forward.indexOf('dui'), 1);
  }
  else
  {
    driverName();
  }
  
  console.log(incidents);
}

/** ------------------- back incident ------------ */
function backIncident(e)
{
  incidents.forward.push(e.value);
  console.log(incidents.forward);

  if(incidents.backward.includes('dui'))
  {
    dui(e);
    // incidents.forward.push(e.value);
    incidents.backward.splice(incidents.backward.indexOf('dui'), 1);
  }
  else if(incidents.backward.includes('ticket'))
  {
    ticket(e);
    // incidents.forward.push(e.value);
    incidents.backward.splice(incidents.backward.indexOf('ticket'), 1);
  }
  else if(incidents.backward.includes('accident'))
  {
    accident(e);
    // incidents.forward.push(e.value);
    incidents.backward.splice(incidents.backward.indexOf('accident'), 1);
  }
  else
  {
    incident();
  }

  console.log(incidents);
}

function anotherDriver()
{
  container.innerHTML = '<div class="step step-number step-content-basic yes-no-box">'+
  '<h2>Add Another Driver? (Save Additional 20%)</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="moreDriver">'+
      '<button class="input" onclick="checkAnotherDriver(this)" value="YES">YES</button>'+
      '<button class="input" onclick="ownerAddress(this)" value="NO">NO</button>'+
    '</div>'+
  '</div>'+
  '<div class="back-to-prev">'+
      '<button class="back" onclick="backIncident(this)" name="back">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
  '</div>';

  formdata.drivers.list.push(formdata.drivers.current);
  console.log(formdata.drivers);

}

// anotherDriver();

function checkAnotherDriver(e)
{
  if(e.value == 'YES')
  {
    driverCounter++;

    formdata.drivers.current = {
      names: [],
      general: [],
      dob: [],
      incidents : {
        part: [],
        accident: [],
        ticket: [],
        dui: []
      }
    };
    addDriver();
  }
}

/** ------------------ Owner Details -------------------- */
function ownerAddress()
{
  let address = '', zip = '', state = '', city = '';
  let addr = formdata.owner.address;
  if(addr[0])
  {
    address = addr[0];
  }
  if(addr[1])
  {
    zip = addr[1];
  }
  if(addr[2])
  {
    state = addr[2];
  }
  if(addr[3])
  {
    city = addr[3];
  }
  container.innerHTML = '<div class="step step-number step-content-basic">'+
  '<h2>Current Address</h2>'+
  '<form action="#" id="addressForm">'+
  '<div class="inner-wrap column-wrap">'+
    '<div class="full-width">'+
      '<h4 style="text-align: left;">Street Address</h4>'+
      '<div class="input-field-wrap">'+
          '<input id="autocomplete" type="text" name="address" placeholder="Address" onkeyup="fillInAddress()" value="'+address+'" required>'+
          '<label for="">Address</label>'+
      '</div>'+
      // '<input id="autocomplete" type="text" name="address" placeholder="Street Address" onkeyup="fillInAddress()" value="'+address+'">'+
    '</div>'+
    '<div class="half-width">'+
        '<h4 style="text-align: left;">Zip Code</h4>'+
        '<div class="input-field-wrap">'+
            '<input type="text" name="zip" placeholder="Zip" onkeyup="checkErrInput(this)" id="zip" value="'+zip+'" required>'+
            '<label for="">Zip</label>'+
        '</div>'+
    '</div>'+
    '<div class="half-width">'+
        '<h4 style="text-align: left;">State</h4>'+
        '<select name="state" id="address_state" class="select-box-address-state" onchange="checkErr(this);">'+
            '<option data-placeholder="true"></option>'+
            '<option value="Alabama" '+(state == 'Alabama'? 'selected' : '')+'>Alabama</option>'+
            '<option value="Alaska" '+(state == 'Alaska'? 'selected' : '')+'>Alaska</option>'+
            '<option value="Arizona" '+(state == 'Arizona'? 'selected' : '')+'>Arizona</option>'+
            '<option value="Arkansas" '+(state == 'Arkansas'? 'selected' : '')+'>Arkansas</option>'+
            '<option value="California" '+(state == 'California'? 'selected' : '')+'>California</option>'+
            '<option value="Colorado" '+(state == 'Colorado'? 'selected' : '')+'>Colorado</option>'+
            '<option value="Connecticut" '+(state == 'Connecticut'? 'selected' : '')+'>Connecticut</option>'+
            '<option value="Delaware" '+(state == 'Delaware'? 'selected' : '')+'>Delaware</option>'+
            '<option value="Florida" '+(state == 'Florida'? 'selected' : '')+'>Florida</option>'+
            '<option value="Georgia" '+(state == 'Georgia'? 'selected' : '')+'>Georgia</option>'+
            '<option value="Hawaii" '+(state == 'Hawaii'? 'selected' : '')+'>Hawaii</option>'+
            '<option value="Idaho" '+(state == 'Idaho'? 'selected' : '')+'>Idaho</option>'+
            '<option value="Illinois" '+(state == 'Illinois'? 'selected' : '')+'>Illinois</option>'+
            '<option value="Indiana" '+(state == 'Indiana'? 'selected' : '')+'>Indiana</option>'+
            '<option value="...">...</option>'+
        '</select>'+
      '</div>'+
      '<div class="full-width">'+
          '<h4 style="text-align: left;">City</h4>'+
          '<div class="input-field-wrap">'+
              '<input type="text" name="city" placeholder="City" onkeyup="checkErrInput(this)" id="city" value="'+city+'" required>'+
              '<label for="">City</label>'+
          '</div>'+
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
      formdata.owner.address = [address.value, zip.value, state.value, city.value];

      console.log(formdata.owner.address);

      ownership();

      //increase value for every action
      increasePercent(0);
    }

  });
}

function ownership()
{
  let contact = formdata.owner.contact;
  container.innerHTML = '<div class="step step-number step-content-basic">'+
  '<h2>Home Ownership</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="model">'+
      '<button class="input '+(contact[0] == 'OWN' ? 'active' : '')+'" onclick="emailAddress(this)">OWN</button>'+
      '<button class="input '+(contact[0] == 'RENT' ? 'active' : '')+'" onclick="emailAddress(this)">RENT</button>'+
      '<button class="input '+(contact[0] == 'OTHER' ? 'active' : '')+'" onclick="emailAddress(this)">OTHER</button>'+
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
  let email = '';
  let contact = formdata.owner.contact;
  container.innerHTML = '<div class="step step-number step-content-basic">'+
  '<h2>Email Address</h2>'+
    '<div class="inner-wrap column-wrap>'+
      '<div class="full-width">'+
        // '<h4 style="text-align: left;">Email Address</h4>'+
        '<div class="input-field-wrap">'+
            '<input type="email" id="email" name="phone" placeholder="Email" onkeyup="checkEmail(this)" value=" '+email+'" required>'+
            '<label for="">Email Address</label>'+
        '</div>'+
        // '<input type="email" id="email" placeholder="Email Address" onkeyup="checkEmail(this)" value=" '+email+'" required>'+
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
    increasePercent(0);
  }
}

function getQuote(e)
{
  let phone = '';
  let contact = formdata.owner.contact;
  container.innerHTML = '<div class="step step-number step-content-basic">'+
    '<h2>Last Step, Get Your Quotes</h2>'+
      '<div class="inner-wrap column-wrap>'+
        '<div class="full-width">'+
          '<h4 style="text-align: left;">Phone Number</h4>'+
          '<input type="text" id="phone" name="phone" placeholder="555-555-5555" onkeyup="checkPhone(this)" value=" '+phone+'" required>'+
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

    // console.log(data);
    sendToServer();
    thankYou();

    //increase value for every action
    increasePercent(1);

    // document.getElementById('result').textContent = JSON.stringify(formdata, null, 4);
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

function sendToServer()
{
  let serialized = JSON.stringify(formdata);

  fetch('https://services.leadconnectorhq.com/hooks/BiDDLrh6kezD2kEObkPo/webhook-trigger/c3d3342e-d75d-47cc-bffc-c6d642f5fbf4', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content // if using Laravel
    },
    body: serialized
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    alert('We have received your query. Our team will meet you soon. Thank you')
  })
  .catch(error => {
    console.error('Error:', error);
  });
  
}