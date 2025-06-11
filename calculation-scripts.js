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
let countArr = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th'];

let trustFormCert = '';
setTimeout(() => {
  let trustForm = document.querySelector('[name="xxTrustedFormCertUrl"]');
  trustFormCert = trustForm.value;
}, 4000);

let container = document.getElementById('container');
let percent_line = document.getElementById('percent-line');
let percent_number = document.getElementById('percent-number');
let loading = document.getElementById('loading2');

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

// generate ip address
let ipaddress = '';
function generateIP(){
  fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    // console.log('Your IP address is:', data.ip);
    ipaddress = data.ip;
  })
  .catch(error => {
    console.error('Error fetching IP:', error);
  });

}
generateIP();

// check all error and set the border color
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
  var numbers = e.value.replace(/\D/g, ''),
  char = {0:'(', 3:') ', 6:'-'};
  e.value = '';
  for(var i = 0; i < numbers.length; i++)
  {
    e.value += (char[i]||'') + numbers[i];
  }

  const regex = /^(?:\+1\s?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
  if(e.value == '' || !regex.test(e.value)){
    e.style.borderColor = 'red';
    e.parentNode.nextElementSibling.innerHTML = 'Invalid Phone Number';
    return false;
  }
  else{
    e.style.borderColor = '#ddd';
    e.parentNode.nextElementSibling.innerHTML = '';
    return true;
  }
}

//check local storage data
function checkLocalStorage(){
  if(localStorage.getItem('localdata')){
    return true;
  }
  return false;
}

function createZIPCodePanel(e)
{
  let html = '<div class="step step-1">'+
    '<h2>Enter Your Zip Code</h2>'+
    '<form action="#" name="zipForm" onsubmit="event.preventDefault()">'+
    '<div class="step step-1 step-content-basic">'+
    
      '<div class="field-wrap">'+
        '<div class="input-field-wrap">'+
          '<input type="text" id="zipcode" required>'+
          '<label for="">Zip code</label>'+
        '</div>'+
        '<span class="error-msg" id="result"></span>'+
      '</div>'+
      '<div class="field-wrap">'+
        '<button class="action-btn btn" onclick="ZIPCode(this)">Get Started</button>'+
      '</div>';

      if(e != null && e.value == 'back')
      {
      html += '<div class="more-options inner-wrap-btn">'+
        '<button class="show-more" onclick="brands(this)" value="next">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 +24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />'+
          '</svg>'+
          'Continue...'+
        '</button>'+
      '</div>';
      }
    html += '</form>'+
    '</div>';

    // show home information text
    homeInfo('Yes');
    commonAgent('No');
    // reset footer form
    let footerform = document.getElementById('footerZipForm');
    footerform.zipcode.value = '';


  container.innerHTML = html;

  if(vehicleCounter == 0 && e.value == 'back')
  {
    increasePercent(-6);
  }

  if(vehicleCounter > 0 && e.value == 'back')
  {
    anotherVehicle();
  }
}

// Homepage more information section
function homeInfo(view)
{
  let heroWrap = document.querySelector('.hero-wrap');
  let featureText = document.querySelector('.features-wrap');
  let featureText2 = document.querySelector('.how-it-works-wrap');
  if(view == 'Yes')
  {
    featureText.style.display = 'block';
    featureText2.style.display = 'block';
    heroWrap.style.display = 'block';
  }
  else if(view == 'No')
  {
    featureText.style.display = 'none';
    featureText2.style.display = 'none';
    heroWrap.style.display = 'none';
  }
}

function commonAgent(view)
{
  let text = document.querySelectorAll('.common-agents-wrap');
  text.forEach((v) => {
    if(view == 'Yes')
    {
      v.style.display = 'block';
    }
    else if(view == 'No')
    {
      v.style.display = 'none';
    }
  });
  
}

// check zip code
function ZIPCode(e)
{
  let zipcode = e.form.elements.zipcode;
  let result = zipcode.parentNode.nextElementSibling;

  fetch(zipcodefile) // Path to your JSON file
  .then(response => response.json()) // Parse JSON response
  .then(data => {
    const zipSet = new Set(data);
    if(zipSet.has(parseInt(zipcode.value)))
    {
      if(vehicleCounter == 0){
        //increase value for every action
        increasePercent(6);
      }

      // execute brands
      brands(e);
      result.innerHTML = '';
      homeInfo('No');
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      commonAgent('Yes');
    }
    else
    {
      checkErrInput(zipcode);
      result.innerHTML = 'Invalid ZIP Code';
    }

  }) // Use the data
  .catch(error => console.error('Error loading JSON:', error));
}

//write brand
function brands(e)
{
  // hide home page information
  homeInfo('No');

  commonAgent('Yes');

  let xvehicle = formdata.vehicles.current[0];
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
      if(xvehicle && xvehicle[0] == b){
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
    back.innerHTML = '<button class="back" value="back" onclick="'+(checkLocalStorage() ? 'checkLocalData()' : 'createZIPCodePanel(this)')+'">'+
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
    '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
    '</svg> Back </button>';
    container.appendChild(back);
  }) // Use the data
  .catch(error => console.error('Error loading JSON:', error));

  if(e.value == 'next')
  {
    if(vehicleCounter == 0){
      increasePercent(6);
    }
  }

  if(e.value == 'back')
  {
    if(vehicleCounter == 0){
      increasePercent(-6);
    }
  }
}

function checkBrands(e)
{
  //increase value for every action
  if(vehicleCounter == 0)
  {
    increasePercent(6);
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
      increasePercent(-6);
    }

    // store brand to the object
    formdata.vehicles.current[0] = [brand, e.firstElementChild.firstElementChild.src];
  }) // Use the data
  .catch(error => console.error('Error loading JSON:', error));
}

function checkYears(e)
{
  //increase value for every action
  if(vehicleCounter == 0)
  {
    increasePercent(6);
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
  }

  if(vehicleCounter == 0 && e.value == 'back')
  {
    increasePercent(-6);
  }
}) // Use the data
.catch(error => console.error('Error loading JSON:', error));
}

function checkModel(e)
{
  //increase value for every action
  if(vehicleCounter == 0)
  {
    increasePercent(6);
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
  }

  if(vehicleCounter == 0 && e.value == 'back'){
    increasePercent(-6);
  }
}

function checkOwner(e)
{
  //increase value for every action
  if(vehicleCounter == 0)
  {
    increasePercent(6);
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
  }
  if(vehicleCounter == 0 && e.value == 'back'){
    increasePercent(-6);
  }
}

function checkMilage(e)
{
  //increase value for every action
  if(vehicleCounter == 0)
  {
    increasePercent(6);
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
  }
  if(vehicleCounter == 0 && e.value == 'back'){
    increasePercent(-6);
  }
}

function checkCoverage(e)
{
  //increase value for every action
  if(vehicleCounter == 0)
  {
    increasePercent(6);
  }
  anotherVehicle(e);
}

function anotherVehicle(e)
{
  container.innerHTML = '<div class="step step-number step-content-basic yes-no-box">'+
  '<h2>Add Another Vehicle?</h2>'+
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

  commonAgent('Yes');
  
  if(e.value != 'back')
  {
    //store coverage to the vehicle object
    formdata.vehicles.current[5] = e.innerHTML;
    formdata.vehicles.list.push(formdata.vehicles.current);

    //data restore to the localStorage
    if(localStorage.getItem('localdata'))
    {
      let localdata = JSON.parse(localStorage.getItem('localdata'));
      localdata.vehicles.list.push(formdata.vehicles.current);
      localStorage.setItem('localdata', JSON.stringify(localdata));
    }
  }
}

function checkAnotherVehicle(e)
{
  if(e.name == 'Yes')
  {
    let vlist = formdata.vehicles.list.length;
    vehicleCounter = vlist++;
    formdata.vehicles.current = [];
    brands(e);
  }
}

function insurance(e)
{
  // common agent text hide this section
  commonAgent('No');

  if(localStorage.getItem('localdata'))
  {
    localStorage.removeItem('submitted');
    checkLocalData();
  }

  let insure = formdata.owner.insurance;
  if(localStorage.getItem('localdata')){
    insure = JSON.parse(localStorage.getItem('localdata')).owner.insurance;
  }
  
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
      '<button class="back" onclick="'+(checkLocalStorage() ? 'checkLocalData()' : 'anotherVehicle(this)')+'" name="" value="back">'+
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

  if(e.value == 'back') {
    increasePercent(-5);
    if(driverCounter > 0){
      driverCounter--;
      anotherDriver();
    }
  }

  styleLoad();
}

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

          if(localStorage.getItem('localdata'))
          {
            let local = JSON.parse(localStorage.getItem('localdata'));
            local.owner.insurance = [career.value, coverage.value];
            localStorage.setItem('localdata', JSON.stringify(local));

            localStorage.removeItem('submitted');

            checkLocalData();
          }
          else
          {
            // increase percentage
            increasePercent(5);
            addDriver();
          }
        }

    });
}

/** ------------------ Add Driver Section --------------- */
function addDriver(e)
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
      '<button class="back" onclick="'+(checkLocalStorage() ? 'checkLocalData()' : 'insurance(this)')+'" name="back" value="back">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
  '</div>';

  if(e != null && e.value != 'back'){
    if(driverCounter == 0){
      increasePercent(5);
    }
  }

  if(e != null && e.value == 'back'){
    if(driverCounter == 0){
      increasePercent(-5);
    }
  }
}

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
      '<button class="back" onclick="addDriver(this)" name="back" value="back">'+
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
  
    //store gender to driver array
    formdata.drivers.current.general[0] = e.innerHTML;
  }

  if(e.value == 'back'){
    if(driverCounter == 0){
      increasePercent(-5);
    }
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
      '<button class="back" onclick="driverMaritalStatus(this)" name="back" value="back">'+
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
  
    //store marital status to the drivers general array
    formdata.drivers.current.general[1] = e.innerHTML;
  }

  if(e.value == 'back'){
    if(driverCounter == 0){
      increasePercent(-5);
    }
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
      increasePercent(5);
    }
  
    //birth day store to current.dob array
    formdata.drivers.current.dob[0] = e.innerHTML;
  }
  if(e.value == 'back'){
    if(driverCounter == 0){
      increasePercent(-5);
    }
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
      increasePercent(5);
    }
  
    //birth day push to birthDate array
    formdata.drivers.current.dob[1] = e.innerHTML;
  }

  if(e.value == 'back'){
    if(driverCounter == 0)
    {
      // increasePercent(-5);
    }
  }
}

function incident(e)
{
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
        '<p>Tickets or Claims in the Last 3 Years?</p>'+
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
              '<input type="radio" name="sr-22" onchange="checkIncident(this)" value="No" '+(!parts.includes('Yes') || parts.includes('No')? 'checked':'')+'>'+
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
    // if(driverCounter == 0)
    // {
    //   // increasePercent(5);
    // }
  
    //birth year push to birthDate array
    formdata.drivers.current.dob[2] = e.innerHTML;
  }

  if(e.value == 'back'){
    if(driverCounter == 0)
    {
      // increasePercent(-5);
    }
  }
}

// incident(null);

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
      }

      let i = incidents.forward.indexOf(e.name);
      if(i !== -1)
      {
        incidents.forward.splice(i, 1);
      }
    }
  }
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
    
      incidents.backward.push('ticket');

      nextIncident(e);
    }

  });
}

function dui(e)
{
  let state = '';
  let addr = formdata.drivers.current.incidents.dui;
  if(addr[2])
  {
    state = addr[2];
  }
  // state array creation
  let statelist = '<option value="">State</option>\n';
  Object.entries(statedata).forEach(([k, s]) => {
    statelist += '<option value="'+k+'" '+(state ? 'selected' : '')+'>'+s+'</option>\n';
  });

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
        statelist+
      '</select>'+
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

      incidents.backward.push('dui');

      nextIncident(e);
    }

  });
}

function driverName(e)
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
        '<div class="inner-wrap inner-wrap-input">'+
          '<div class="field-wrap">'+
            '<div class="input-field-wrap">'+
              '<input type="text" placeholder="First Name" name="first_name" onkeyup="checkErrInput(this)" value="'+first_name+'" required>'+
              '<label>First Name</label>'+
            '</div>'+
          '</div>'+
        '</div>'+
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
      '<button type="button" class="back" onclick="backIncident(this)" name="back" value="back">'+
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
  '</div>'+
  '</div>'+
  '<div class="common-agents-wrap">'+
      '<div class="agent-wrap">'+
        '<img src="https://eraseyourbills.com/wp-content/plugins/insurance-quotes/assets/img/lady.jpg" alt="Agent">'+
        '<p>'+
          '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512">'+
            '<path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>'+
          '</svg>'+
          '<span>Your information is safe and secure</span>'+
        '</p>'+
      '</div>'+
    '</div>';

  if(e.value != 'back'){
    if(driverCounter == 0){
      // increasePercent(5);
    }
  }

  if(e.value == 'back'){
    if(driverCounter == 0){
      // increasePercent(-5);
    }
  }
}

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

      anotherDriver(e);
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
  else if(incidents.forward.includes('dui'))
  {
    dui(e);
    incidents.forward.splice(incidents.forward.indexOf('dui'), 1);
  }
  else
  {
    driverName(e);
  }
}

/** ------------------- back incident ------------ */
function backIncident(e)
{
  incidents.forward.push(e.value);

  if(incidents.backward.includes('dui'))
  {
    dui(e);
    incidents.backward.splice(incidents.backward.indexOf('dui'), 1);
  }
  else if(incidents.backward.includes('accident'))
  {
    accident(e);
    incidents.backward.splice(incidents.backward.indexOf('accident'), 1);
  }
  else
  {
    incident(e);
  }
  
}

function anotherDriver(e)
{
  container.innerHTML = '<div class="step step-number step-content-basic yes-no-box">'+
  '<h2>Add Another Driver?</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="moreDriver">'+
      '<button class="input" onclick="checkAnotherDriver(this)" value="YES">YES</button>'+
      '<button class="input" onclick="ownerAddress(this)" value="NO">NO</button>'+
    '</div>'+
  '</div>'+
  '<div class="back-to-prev">'+
    '<button class="back" onclick="backIncident(this)" name="back" value="back">'+
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
        '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
      '</svg> Back '+
    '</button>'+
  '</div>';

  if(e != null && e.value != 'back')
  {
    formdata.drivers.list.push(formdata.drivers.current);

    if(localStorage.getItem('localdata')){
      let local = JSON.parse(localStorage.getItem('localdata'));
      local.drivers.list.push(formdata.drivers.current);
      localStorage.setItem('localdata', JSON.stringify(local));

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

      //remove submitted counter
      localStorage.removeItem('submitted');
      checkLocalData();
    }
  }

}

// anotherDriver(null);

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
function ownerAddress(e)
{
  let address = '', zip = '', state = '', city = '', country = '';
  let addr = formdata.owner.address;
  if(localStorage.getItem('localdata')){
    addr = JSON.parse(localStorage.getItem('localdata')).owner.address;
  }
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
  if(addr[4])
  {
    country = addr[4];
  }

  // state array creation
  let statelist = '<option value="">State</option>\n';
  Object.entries(statedata).forEach(([k, s]) => {
    statelist += '<option value="'+k+'" '+(state ? 'selected' : '')+'>'+s+'</option>\n';
  });

  container.innerHTML = '<div class="step step-number step-content-basic">'+
  '<h2>Current Address</h2>'+
  '<form action="#" id="addressForm" novalidate>'+
  '<div class="inner-wrap column-wrap">'+
    '<div class="full-width">'+
      '<div class="input-field-wrap">'+
          '<input type="text" name="address" maxlength="30" id="autocomplete" placeholder="Address" onkeyup="fillInAddress(event, this)" value="'+address+'" required>'+
          '<label for="">Address</label>'+
      '</div>'+
    '</div>'+
    '<div class="half-width">'+
        '<div class="input-field-wrap">'+
            '<input type="text" name="zip" placeholder="Zip" onkeyup="checkErrInput(this)" id="zip" value="'+zip+'" required>'+
            '<label for="">Zip</label>'+
        '</div>'+
    '</div>'+
    '<div class="half-width">'+
        '<select name="state" id="address_state" class="select-box-address-state" onchange="checkErr(this);" required>'+
            statelist+
        '</select>'+
      '</div>'+
      '<div class="half-width">'+
          '<div class="input-field-wrap">'+
              '<input type="text" name="city" placeholder="City" onkeyup="checkErrInput(this)" id="city" value="'+city+'" required>'+
              '<label for="">City</label>'+
          '</div>'+
      '</div>'+
      '<div class="half-width">'+
          '<div class="input-field-wrap">'+
              '<input type="text" name="country" placeholder="Country" onkeyup="checkErrInput(this)" id="country" value="'+country+'" required>'+
              '<label for="">Country</label>'+
          '</div>'+
      '</div>'+
    '</div>'+
    '<div class="back-to-prev">'+
      '<button class="back" onclick="'+(checkLocalStorage() ? 'checkLocalData()' : 'anotherDriver(this)')+'" name="back" value="back">'+
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
  '</div>'+
  '<div class="common-agents-wrap">'+
    '<div class="agent-wrap">'+
      '<img src="https://eraseyourbills.com/wp-content/plugins/insurance-quotes/assets/img/lady.jpg" alt="Agent">'+
      '<p>'+
        '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512">'+
          '<path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>'+
        '</svg>'+
        '<span>Companies require this in order to provide an accurate quote</span>'+
      '</p>'+
    '</div>'+
    '</div>';

  if(e.value == 'back'){
    increasePercent(-2);
  }

  styleLoad();
  initAutocomplete();
}

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
    let country = form.elements['country'];

    let checkAddr = checkErrInput(address);
    let checkZip = checkErrInput(zip);
    let checkState = checkErr(state);
    let checkCity = checkErrInput(city);
    let checkCountry = checkErrInput(country);

    if(checkAddr && checkZip && checkState && checkCity && checkCountry)
    {
      //increase value for every action
      increasePercent(2);

      formdata.owner.address = [address.value, zip.value, state.value, city.value, country.value];
      
      if(localStorage.getItem('localdata'))
      {
        let local = JSON.parse(localStorage.getItem('localdata'));
        local.owner.address = [address.value, zip.value, state.value, city.value, country.value];
        localStorage.setItem('localdata', JSON.stringify(local));

        // remove submit count from local data
        localStorage.removeItem('submitted');
        
        checkLocalData();
      }
      else
      {
        ownership(e);
      }
    }

  });
}

function ownership(e)
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
      '<button class="back" onclick="'+(checkLocalStorage()? 'checkLocalData()': 'ownerAddress(this)')+'" name="back" value="back">'+
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
          '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
  '</div>';
  
  if(e.value != 'back'){
    // increasePercent(2);
  }

  if(e.value == 'back'){
    increasePercent(-2);
  }
  
}

function emailAddress(e)
{
  let email = '';
  let contact = formdata.owner.contact;

  if(localStorage.getItem('localdata')){
    contact = JSON.parse(localStorage.getItem('localdata')).owner.contact;
  }

  if(contact[1])
  {
    email = contact[1];
  }

  container.innerHTML = '<div class="step step-number step-content-basic">'+
  '<h2>Email Address</h2>'+
    '<div class="inner-wrap column-wrap>'+
      '<div class="full-width">'+
        '<div class="input-field-wrap">'+
            '<input type="email" id="email" name="email" placeholder="Email" onkeyup="checkEmail(this)" value="'+email+'" required>'+
            '<label for="">Email Address</label>'+
        '</div>'+
      '</div>'+
    '<div class="back-to-prev">'+
        '<button class="back" onclick="'+(checkLocalStorage() ? 'checkLocalData()' : 'ownership(this)')+'" name="back" value="back">'+
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

    if(e.value != 'back')
    {
      increasePercent(2);
      formdata.owner.contact[0] = e.innerHTML;

      if(localStorage.getItem('localdata')){
        let local = JSON.parse(localStorage.getItem('localdata'));
        local.owner.contact[0] = e.innerHTML;
        localStorage.setItem('localdata', JSON.stringify(local));

        // remove submit count from local data
        localStorage.removeItem('submitted');

        checkLocalData();
      }
    }
    if(e.value == 'back'){
      increasePercent(-2);
    }
}

function emailForm(e)
{
  let email = document.getElementById('email');

  if(checkEmail(email))
  {
    formdata.owner.contact[1] = email.value;
    if(localStorage.getItem('localdata')){
      let local = JSON.parse(localStorage.getItem('localdata'));
      local.owner.contact[1] = email.value;
      localStorage.setItem('localdata', JSON.stringify(local));

      // remove submit count from local data
      localStorage.removeItem('submitted');

      checkLocalData();
    }
    else
    {
      getQuote(e);
    }
    
    //increase value for every action
    increasePercent(2);
  }
}

function getQuote(e)
{
  let phone = '';
  let contact = formdata.owner.contact;

  if(localStorage.getItem('localdata')){
    contact = JSON.parse(localStorage.getItem('localdata')).owner.contact;
  }

  if(contact[2])
  {
    phone = contact[2];
  }

  container.innerHTML = '<div class="step step-number step-content-basic">'+
    '<h5 style="color: #0070e9; text-transform: uppercase;">Last Step: Phone Number</h5>'+
    '<h2 style="text-transform: uppercase;">Contact Number</h2>'+
    '<div class="inner-wrap column-wrap">'+
          '<div class="full-width">'+
              '<div class="input-field-wrap">'+
                  '<input type="text" id="phone" name="phone" placeholder="555-555-5555" onkeyup="checkPhone(this)" value="'+phone+'" required maxlength="14">'+
                  '<label for="">Phone number</label>'+
              '</div>'+
              '<span class="error-msg"></span>'+
          '</div>'+
      '</div>'+
      '<div class="field-wrap">'+
          '<button class="action-btn btn get-my-quote" onclick="checkQuote(this)">Submit</button>'+
      '</div>'+
      '<div class="common-agents-wrap" style="margin: 0 auto;">'+
        '<div class="agent-wrap">'+
            '<img src="https://eraseyourbills.com/wp-content/plugins/insurance-quotes/assets/img/lady.jpg" alt="Agent">'+
            '<p>'+
                '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>'+
                '<span>Your car insurance quotes are ready</span>'+
            '</p>'+          
        '</div>'+
      '</div>'+
  '</div>'+
  '<div class="container">'+
    '<h4>'+
      '<pre id="result" style="display:block"></pre>'+
    '</h4>'+
  '</div>'+
  '<div class="tcpa-wrap">'+
      '<form><p><label><input type="hidden" id="leadid_tcpa_disclosure"/> We take your privacy seriously. By clicking the "Submit" button above, I give my express written consent by electronic signature to [Publisher Name] and its <a href="https://www.px.com/offer-guidelines/top-auto-insurance-companies-in-us/">Marketing Partners, agents, affiliates or third parties</a> acting on its behalf to receive marketing communications, or to obtain additional information for such purposes via telephone calls or SMS/MMS text message, calls using a live agent, automatic telephone dialing system, artificial or AI generated voice/pre-recorded message, or email from this website and/or partner companies or their agents at the landline or wireless number I provided, even if my number/email is currently listed on any federal, state, or company Do Not Call/Do Not Email list. Carrier message and data rates may apply. I understand that my consent is not required as a condition of purchasing any goods or services and that I may revoke my consent at any time. I also acknowledge that I am at least 18 years of age and I have read and agree to this website\'s <a href="https://eraseyourbills.com/privacy-policy/" target="_blank">Privacy Policy</a> and <a href="https://eraseyourbills.com/terms-of-use/" target="_blank">Terms and Conditions</a>.</label></p></form>'+
  '</div>';
  if(e != null && e.value == 'back'){
    increasePercent(-2);
  }
}

function checkQuote(e)
{
  let phone = document.getElementById('phone');

  if(checkPhone(phone))
  {
    formdata.owner.contact[2] = phone.value;

    if(localStorage.getItem('localdata')){
      let local = JSON.parse(localStorage.getItem('localdata'));
      local.owner.contact[2] = phone.value;
      localStorage.setItem('localdata', JSON.stringify(local));

      // remove submit count from local data
      localStorage.removeItem('submitted');

      checkLocalData();
      // sendToServer();
    }
    else
    {
      //store data to the local storage
      localStorage.setItem('localdata', JSON.stringify(formdata));
      checkLocalData();
      loading.style.display = 'block';
      sendToServer();
    }

    //increase value for every action
    increasePercent(2);
  }
}

function thankYou()
{
  container.innerHTML = '<div class="step step-1 step-content-basic">'+
    // '<h2>🎉 Thank You!</h2>'+
    // '<h3 class="thanks-subtitle">Your Free Car Insurance Quote is on Its Way</+h3>'+
    // '<p class="thanks-body">Thank you for taking the time to complete your car +insurance quote request. Our team is reviewing your details, and you’ll receive your personalized quote shortly.</p>'+
    // '<hr class="thanks-separator">'+
    // '<h3>Check out our other services</h3>'+
    // '<div class="thanks-links">'+
    //   '<a href="#">Home Insurance</a>'+
    //   '<a href="#">Life Insurance</a>'+
    //   '<a href="#">Health Insurance</a>'+
    //   '<a href="#">Business Insurance</a>'+
    // '</div>'+
    // '<hr class="thanks-separator">'+
    // '<button class="action-btn btn continue" onclick="checkLocalData()">Continue...</button>'+
    '<div class="agent-wrap">'+
      '<img src="https://eraseyourbills.com/wp-content/plugins/insurance-quotes/assets/img/lady.jpg" alt="Agent">'+
      '<p>'+
        '<span>Thanks for the information! An agent will contact you shortly.</span>'+
      '</p>'+
    '</div>'+
  '</div>';
}

function dateFormat(input)
{
  const date = new Date(input);

  // Pad month and day with leading zero if needed
  const formatted = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  return formatted;
}

function formatObjectWithLineBreaks(data) {
  // Convert top-level object to array of nested objects
  const entries = Object.values(data);

  return entries.map(obj =>
    Object.entries(obj)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n') // new line after every key-value pair
  ).join('\n\n'); // separate multiple objects with extra line
}


// function sendToLeadProsper(form)
// {
  
// }

// send data to the go heigh level
function sendToServer()
{
  let leadid_token = document.getElementById('leadid_token');
  let formData = {
    LeadiD: leadid_token.value,
    vehicles:[],
    drivers:[],
    owner:[]
  };
  let local = JSON.parse(localStorage.getItem('localdata'));
  local.vehicles.list.forEach((v, n) => {
    formData.vehicles.push({
      VehicleMake:v[0][0],
      VehicleYear:v[1],
      VehicleModel:v[2],
      VehicleOwnership:v[3],
      AnnualMileage:v[4],
      DesiredCoverageLevel:v[5]
    });
  });

  local.drivers.list.forEach((d, n) => {

    formData.drivers.push({
      FirstName: d.names[0],
      LastName: d.names[1],
      Gender: d.general[0],
      MaritalStatus: d.general[1],
      BirthDate: d.dob[0]+' '+d.dob[1]+' '+d.dob[2],
      IncidentAccident: d.incidents.part.includes('accident') ? 'Yes': 'No',
      IncidentTicket: d.incidents.part.includes('ticket') ? 'Yes': 'No',
      IncidentDui: d.incidents.part.includes('dui') ? 'Yes': 'No',
      IncidentSr22: d.incidents.part.includes('Yes') ? 'Yes': 'No',

      AccidentMonth: d.incidents.accident[0],
      AccidentYear: d.incidents.accident[1],
      AccidentDescription: d.incidents.accident[2],
      AccidentFault: d.incidents.accident[3],
      AccidentDamaged: d.incidents.accident[4],

      DuiMonth: d.incidents.dui[0],
      DuiYear: d.incidents.dui[1],
      DuiState: d.incidents.dui[2],
    });
  });

  formData.owner = {
    address: local.owner.address[0],
    zip: local.owner.address[1],
    state: local.owner.address[2],
    city: local.owner.address[3],
    country: local.owner.address[4],
    CurrentInsuranceCarier: local.owner.insurance[0],
    ContinuousCoverage: local.owner.insurance[1],
    owner: local.owner.contact[0],
    email: local.owner.contact[1],
    phone: local.owner.contact[2],
  };

  //array to object conversion
  let vehiclesObj = Object.assign({}, formData.vehicles);
  formData.vehicles = vehiclesObj;

  let driverObj = Object.assign({}, formData.drivers);
  formData.drivers = driverObj;
  
  loading.style.display = 'block';

  // let serialized = JSON.stringify(formData);

  // fetch('https://services.leadconnectorhq.com/hooks/BiDDLrh6kezD2kEObkPo/webhook-trigger/c3d3342e-d75d-47cc-bffc-c6d642f5fbf4', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content // if using Laravel
  //   },
  //   body: serialized
  // })
  // .then(response => response.json())
  // .then(data => {
  //   console.log('Success:', data);
  //   if(data.id){
  //     localStorage.setItem('submitted', true);
  //     document.getElementById('getMyQuote').style.display = 'none';
  //     document.getElementById('ThankYouMsg').style.display = 'block';
  //   }
  // })
  // .catch(error => {
  //   console.error('Error:', error);
  // });

  let form = formData;

  // send data to lead prosper
  let lpdata = {
    "lp_campaign_id": "27824",
    "lp_supplier_id": "81192",
    "lp_key": "y7kmilnvgc632w",
    "lp_action": "test",
    "lp_subid1": "",
    "lp_subid2": "",
    "first_name": form.drivers[0].FirstName,
    "last_name": form.drivers[0].LastName,
    "email": form.owner.email,
    "phone": form.owner.phone.replace(/\D/g, ''),
    "date_of_birth": dateFormat(form.drivers[0].BirthDate),
    "gender": form.drivers[0].Gender,
    "address": form.owner.address,
    "city": form.owner.city,
    "state": form.owner.state,
    "zip_code": form.owner.zip,
    "ip_address": ipaddress,
    "user_agent": navigator.userAgent,
    "landing_page_url": "https://eraseyourbills.com/auto/",
    "jornaya_leadid": form.LeadiD,
    "trustedform_cert_url": trustFormCert,
    "tcpa_text": "We take your privacy seriously. By clicking the 'Submit' button above, I give my express written consent by electronic signature to [Publisher Name] and its <a href='https://www.px.com/offer-guidelines/top-auto-insurance-companies-in-us/'>Marketing Partners, agents, affiliates or third parties</a> acting on its behalf to receive marketing communications, or to obtain additional information for such purposes via telephone calls or SMS/MMS text message, calls using a live agent, automatic telephone dialing system, artificial or AI generated voice/pre-recorded message, or email from this website and/or partner companies or their agents at the landline or wireless number I provided, even if my number/email is currently listed on any federal, state, or company Do Not Call/Do Not Email list. Carrier message and data rates may apply. I understand that my consent is not required as a condition of purchasing any goods or services and that I may revoke my consent at any time. I also acknowledge that I am at least 18 years of age and I have read and agree to this website\'s <a href='https://eraseyourbills.com/privacy-policy/' target='_blank'>Privacy Policy</a> and <a href='https://eraseyourbills.com/terms-of-use/' target='_blank'>Terms and Conditions</a>.",
    "v_click_id": "", //month
    "credit_rating": "", //Unsure
    "currently_insured": "", //Yes/No
    "current_insurance": form.owner.CurrentInsuranceCarier,
    "current_coverage_start": "", //1998-06-02
    "current_coverage_expiry": "", //1954-05-29
    "current_coverage_type": "", //Premium
    "continuously_insured": form.owner.ContinuousCoverage,
    "requested_coverage_type": "", //Not Insured
    "requested_bodily_injury": "", //50/100
    "requested_property_damage": "", //139
    "multiple_drivers": form.drivers.length > 1 ? "Yes" : "No",
    "multiple_vehicles": form.vehicles.length > 1 ? "Yes" : "No",
    "home_owner": "", //Yes/No
    "married": "", //Yes/No
    "active_military": "", //Yes/No
    "status": "",
    "vehicle_1_year": form.vehicles[0].VehicleYear,
    "vehicle_1_make": form.vehicles[0].VehicleMake,
    "vehicle_1_model": form.vehicles[0].VehicleModel,
    "vehicle_1_trim": "", //Tuesday
    "vehicle_1_vin": "", //Sunday
    "vehicle_1_ownership": form.vehicles[0].VehicleOwnership,
    "vehicle_1_abs": "", //Yes/No
    "vehicle_1_alarm": "", //Yes/No
    "vehicle_1_useage": "", //Commute Work
    "vehicle_1_annual_miles": form.vehicles[0].AnnualMileage,
    "vehicle_1_weekly_days": "", //156
    "vehicle_1_collision": "", //$500
    "vehicle_1_comprehensive": "", //$100
    "driver_1_first_name": form.drivers[0].FirstName,
    "driver_1_last_name": form.drivers[0].LastName,
    "driver_1_dob": form.drivers[0].BirthDate,
    "driver_1_relationship": "", //Spouse
    "driver_1_license_status": "", //International
    "driver_1_license_state": "", //FL
    "driver_1_licensed_age": "", //192
    "driver_1_occupation": "", //Teacher
    "driver_1_education": "", //High School Diploma
    "driver_1_marital_status": form.drivers[0].MaritalStatus,
    "driver_1_employment_length": "", //122
    "driver_1_residence": "", //Other
    "driver_1_residence_length": "", //447
    "vehicle_2_year": form.vehicles.length > 1 ? form.vehicles[1].VehicleYear : "",
    "vehicle_2_make": form.vehicles.length > 1 ? form.vehicles[1].VehicleMake : "",
    "vehicle_2_model": form.vehicles.length > 1 ? form.vehicles[1].VehicleModel : "",
    "vehicle_2_trim": "", //gray
    "vehicle_2_vin": "", //fuchsia
    "vehicle_2_ownership": form.vehicles.length > 1 ? form.vehicles[1].VehicleOwnership : "",
    "vehicle_2_abs": "", //Yes/No
    "vehicle_2_alarm": "", //Yes/No
    "vehicle_2_useage": "", //Commute School
    "vehicle_2_annual_miles": form.vehicles.length > 1 ? form.vehicles[1].AnnualMileage : "",
    "vehicle_2_weekly_days": "", //912
    "vehicle_2_collision": "", //$2000
    "vehicle_2_comprehensive": "", //$1500
    "vehicle_3_year": form.vehicles.length > 2 ? form.vehicles[2].VehicleYear : "",
    "vehicle_3_make": form.vehicles.length > 2 ? form.vehicles[2].VehicleMake : "",
    "vehicle_3_model": form.vehicles.length > 2 ? form.vehicles[2].VehicleModel : "",
    "vehicle_3_trim": "", //Friday
    "vehicle_3_vin": "", //Thursday
    "vehicle_3_ownership": form.vehicles.length > 2 ? form.vehicles[2].VehicleOwnership : "",
    "vehicle_3_abs": "", //Yes/No
    "vehicle_3_alarm": "", //Yes/No
    "vehicle_3_useage": "", //Commute Work
    "vehicle_3_annual_miles": form.vehicles.length > 2 ? form.vehicles[2].AnnualMileage : "",
    "vehicle_3_weekly_days": "", //244
    "vehicle_3_collision": "", //$250
    "vehicle_3_comprehensive": "", //$1000
    "driver_2_first_name": form.drivers.length > 1 ? form.drivers[1].FirstName : "",
    "driver_2_last_name": form.drivers.length > 1 ? form.drivers[1].LastName : "",
    "driver_2_dob": form.drivers.length > 1 ? form.drivers[1].BirthDate : "",
    "driver_2_relationship": "", //Self
    "driver_2_license_status": "", //Other
    "driver_2_license_state": "", //FL
    "driver_2_licensed_age": "", //676
    "driver_2_occupation": "", //College Professor
    "driver_2_education": "", //Masters Degree
    "driver_2_marital_status": form.drivers.length > 1 ? form.drivers[1].MaritalStatus : "",
    "driver_2_employment_length": "", //310
    "driver_2_residence": "", //Other
    "driver_2_residence_length": "", //669
    "driver_3_first_name": form.drivers.length > 2 ? form.drivers[2].FirstName : "",
    "driver_3_last_name": form.drivers.length > 2 ? form.drivers[2].LastName : "",
    "driver_3_dob": form.drivers.length > 2 ? form.drivers[2].BirthDate : "",
    "driver_3_relationship": "", //Self
    "driver_3_license_status": "", //Suspended
    "driver_3_license_state": "", //FL
    "driver_3_licensed_age": "", //484
    "driver_3_occupation": "", //Teacher
    "driver_3_education": "", //Bachelors Degree
    "driver_3_marital_status": form.drivers.length > 2 ? form.drivers[2].MaritalStatus : "",
    "driver_3_employment_length": "", //286
    "driver_3_residence": "", //Own
    "driver_3_residence_length": "" //523
  };  

  console.log(lpdata);
  let serialized = JSON.stringify(lpdata);
  // console.log(serialized);

  fetch('https://api.leadprosper.io/direct_post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content // if using Laravel
    },
    body: serialized
  })
  .then(response => response.json())
  .then(data => {

    setTimeout(() => {
      loading.style.display = 'none';
    }, 2000);

    console.log('lp result:', data);

    if(data.id){
      localStorage.setItem('submitted', true);
      document.getElementById('getMyQuote').style.display = 'none';
      loading.style.display = 'none';
      document.getElementById('ThankYouMsg').style.display = 'block';
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });

  // send to the another server
  // const leadProsper = sendToLeadProsper(formData);
  // console.log(leadProsper);
  
}

// check local data exist
function checkLocalData()
{
  let vehicleList = '', driverList = '';
  let localdata = localStorage.getItem('localdata');
  if(localdata){
    let parseData = JSON.parse(localdata);
    if(parseData.vehicles.list)
    {
      parseData.vehicles.list.forEach((v, n) => {
        vehicleList += '<p>'+
          '<img src="'+v[0][1]+'" alt="" width="50">'+
          '<span>'+v[0][0]+'</span>'+
          '<span class="xbtn" onclick="removeVehicle(this)" id="'+n+'">x</span>'+
        '</p>';
      });
    }
    
    if(parseData.drivers.list){
      parseData.drivers.list.forEach((d, n) => {
        driverList += '<p>'+
          '<svg class="" width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><rect fill="#FFF" width="48" height="48" rx="24"></rect><g transform="translate(16 12)" stroke="#000" stroke-width="2"><circle cx="8.471" cy="5.647" r="5.647"></circle><path d="M16.941 24A8.47 8.47 0 0 0 0 24"></path></g></g></svg>'+
          '<span>'+d.names[0]+'</span>'+
          '<span>'+d.names[1]+'</span>'+
          '<span class="xbtn" onclick="removeDriver(this)" id="'+n+'">x</span>'+
      '</p>';
      });
    }

    let html = '<div class="welcome-back-wrap">'+
        '<h5 style="color: #0070e9; text-transform: uppercase;">Welcome Back <strong>'+parseData.drivers.list[0].names[0]+'</strong>!</h5>'+
        '<h2 style="text-transform: uppercase;">Your Auto Quotes Are Almost Ready For You!</h2>'+
        '<div class="continue-btn">'+
          '<button class="action-btn btn get-my-quote" onclick="sendToServer(this)" value="" id="getMyQuote">Get my Quote<span class="notifiy">1</span></button>'+
        '</div>'+
        '<p id="ThankYouMsg" style="margin-top:15px; color:green; display:none">Thank You</p>'+
        '<div class="toogle-btn-wrap">'+
          '<a href="#" class="toogle-btn-text" onclick="showHide(this)">'+
            'See your information'+
            '<svg class="" width="24" height="24" viewBox="0 0 24 24" fill="none" style="transform: rotate(0deg);"><path d="M7 10L12 15L17 10" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>'+
          '</a>'+
        '</div>'+
        '<div class="saved-data-wrap hide">'+
            '<div class="data-item">'+
              '<div class="data-column item-title">'+
                '<p>Your Vehicles </p>'+
              '</div>'+
              '<div class="data-column item-details">'+
                '<div class="item-details-content">'+
                vehicleList+
                '</div>'+
                '<br>'+
                '<a href="#" class="toogle-btn-text" onclick="editAddVehicle(this)">'+
                  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
                      '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>'+
                  '</svg>'+
                  'Add another vehicle'+
                '</a>'+
              '</div>'+
            '</div>'+
            '<div class="data-item">'+
              '<div class="data-column item-title">'+
                  '<p>Listed Drivers</p>'+
              '</div>'+
              '<div class="data-column item-details">'+
                '<div class="item-details-content">'+
                  driverList+
                '</div>'+
                '<br>'+
                '<a href="#" class="toogle-btn-text" onclick="editAddDriver(this)" value="add-more">'+
                  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
                    '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>'+
                  '</svg>'+
                  'Add another driver'+
                '</a>'+
              '</div>'+
            '</div>'+
            '<div class="data-item">'+
              '<div class="data-column item-title">'+
                '<p>Insured</p>'+
              '</div>'+
              '<div class="data-column item-details">'+
                '<div class="item-details-content">'+
                  '<p>'+parseData.owner.insurance[0]+'</p>'+
                  '<p>'+parseData.owner.insurance[1]+'</p>'+
                '</div>'+
                '<div class="item-details-action">'+
                  '<button class="edit" onclick="insurance(this)">Change</button>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="data-item">'+
              '<div class="data-column item-title">'+
                '<p>Address</p>'+
              '</div>'+
              '<div class="data-column item-details">'+
                '<div class="item-details-content">'+
                  '<p>'+parseData.owner.address[0]+' <br> '+parseData.owner.address[1]+'<br>'+parseData.owner.address[2]+'<br>'+parseData.owner.address[3]+'<br>'+parseData.owner.address[4]+'</p>'+
                '</div>'+
                '<div class="item-details-action">'+
                  '<button class="edit" onclick="ownerAddress(this)">Change</button>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="data-item">'+
              '<div class="data-column item-title">'+
                '<p>Home Ownership</p>'+
              '</div>'+
              '<div class="data-column item-details">'+
                '<div class="item-details-content">'+
                  '<p>'+parseData.owner.contact[0]+'</p>'+
                '</div>'+
                '<div class="item-details-action">'+
                  '<button class="edit" onclick="ownership(this)">Change</button>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="data-item">'+
              '<div class="data-column item-title">'+
                '<p>Email</p>'+
              '</div>'+
              '<div class="data-column item-details">'+
                '<div class="item-details-content">'+
                  '<p>'+parseData.owner.contact[1]+'</p>'+
                '</div>'+
                '<div class="item-details-action">'+
                  '<button class="edit" onclick="emailAddress()">Change</button>'+
                  '<hr><!-- just for showing -->'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="data-item">'+
              '<div class="data-column item-title">'+
                '<p>Contact</p>'+
              '</div>'+
              '<div class="data-column item-details">'+
                '<div class="item-details-content">'+
                  '<p>'+parseData.owner.contact[2]+'</p>'+
                '</div>'+
                '<div class="item-details-action">'+
                  '<button class="edit" onclick="getQuote()">Change</button>'+
                  '<hr><!-- just for showing -->'+
                '</div>'+
              '</div>'+
            '</div>'+
        '</div>'+
        '<div class="agent-wrap">'+
          '<img src="https://eraseyourbills.com/wp-content/plugins/insurance-quotes/assets/img/lady.jpg" alt="Agent">'+
          '<p>'+
            '<span>Thanks for the information! An agent will contact you shortly.</span>'+
          '</p>'+            
        '</div>'+
    '</div>';

    container.innerHTML = html;

    document.getElementById('localClearBtn').style.display = 'block';
    
    increasePercent(75);
    styleLoad();

    // on reload the page and call to the checkLocalData() then check the data submitted.
    setTimeout(function(){
      if(localStorage.getItem('submitted')){
        document.getElementById('getMyQuote').style.display = 'none';
      }
    }, 0);
  }
}

// check if user already stored all data to the localstorage
checkLocalData();

// user query data edit section
function editAddVehicle(e)
{
  let local = JSON.parse(localStorage.getItem('localdata'));
  if(local.vehicles.list){
    vehicleCounter = local.vehicles.list.length;
  }
  formdata.vehicles.current = [];
  brands(e);
}

// user driver query data edit section
function editAddDriver(e){
  let local = JSON.parse(localStorage.getItem('localdata'));
  if(local.drivers.list){
    driverCounter = local.drivers.list.length;
  }
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
  addDriver(e);
}

function removeLocal(e)
{
  document.getElementById('localClearBtn').style.display = 'none';
  increasePercent(-75);
  localStorage.removeItem('localdata');
  localStorage.removeItem('submitted');
  createZIPCodePanel();
}

// remove vehicle
function removeVehicle(e)
{
  let local = JSON.parse(localStorage.getItem('localdata'));
  if(local.vehicles.list.length > 1)
  {
    local.vehicles.list.splice(e.id, 1);
    localStorage.setItem('localdata', JSON.stringify(local));
    e.parentNode.style.display = 'none';
    document.getElementById('getMyQuote').style.display = 'block';
  }
  else
  {
    alert('Please add more vehicles to remove this one.');
  }
}

// remove vehicle
function removeDriver(e)
{
  let local = JSON.parse(localStorage.getItem('localdata'));
  if(local.drivers.list.length > 1)
  {
    local.drivers.list.splice(e.id, 1);
    localStorage.setItem('localdata', JSON.stringify(local));
    e.parentNode.style.display = 'none';
    document.getElementById('getMyQuote').style.display = 'block';
  }
  else
  {
    alert('Please add more drivers to remove this one.');
  }
}

// show hide local data form
function showHide(e)
{
  let panel = e.parentNode.nextElementSibling;
  panel.classList.toggle('hide');  
}