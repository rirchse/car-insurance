let formdata = {
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
  editmode: "",
  incidents:{
    backward: [],
    forward: []
  },
  owner: {
    insurance: [],
    address: [],
    contact: []
  },
  vehicles: {
    list: [],
    current: []
  },
  zipcode: ""
};

let year = '', brand = '', model = '', editmode = '';
let vehicleCounter = 0, driverCounter = 0;
let countArr = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th'];

let container = document.getElementById('container');
let percent_line = document.getElementById('percent-line');
let percent_number = document.getElementById('percent-number');
let loading = document.getElementById('loading2');

function increasePercent(number)
{
  percent_number.innerHTML = number+'%';
  percent_number.style.left = number+'%';
  percent_line.style.width = number+'%';
  percent_number.setAttribute('number', number);
}

// generate ip address
let ipaddress = '';
(function generateIP(){
  fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    ipaddress = data.ip;
  })
  .catch(error => {
    console.error('Error fetching IP:', error);
  });

})();

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

function setLocalData(data)
{
  localStorage.setItem('localdata', JSON.stringify(data));
}

// current data store to the localstorage
function getLocalData()
{
  const localData = localStorage.getItem('localdata');
  if(localData)
  {
    let localdata = JSON.parse(localData);
    return localdata; 
  }

  return null;
}

//change very page url
function setPageUrl(page)
{
  const url = new URL(window.location.href);
  url.searchParams.set('page', page);

  // Update URL without reload
  window.history.pushState({}, '', url);
}

// current page store to localstorage
function setCurrentPage(page)
{
  localStorage.setItem('currentPage', page);
}

// onload check current page
function checkCurrentPage()
{
  console.log('formdata:', formdata);

  brand = formdata.vehicles.current[0] ? formdata.vehicles.current[0][0] : '';
  year = formdata ? formdata.vehicles.current[1] : '';

  const currentPage = localStorage.getItem('currentPage');

  if(currentPage == 'zip-code')
  {
    createZIPCodePanel(null);
    homeInfo('Yes');
  }
  else if(currentPage == 'vehicle-make')
  {
    homeInfo('No');
    brands(null);
  }
  else if(currentPage == 'vehicle-year')
  {
    homeInfo('No');
    let e = document.createElement('button');
    e.setAttribute('name', formdata.vehicles.current?formdata.vehicles.current[0][0]:'');
    writeYears(e);
  }
  else if(currentPage == 'vehicle-model')
  {
    homeInfo('No');
    brand = formdata.vehicles.current?formdata.vehicles.current[0][0]:'';
    year = formdata.vehicles.current?formdata.vehicles.current[1]:'';
    let e = document.createElement('button');
    e.setAttribute('name', formdata.vehicles.current[1]);
    models(e);
  }
  else if(currentPage == 'vehicle-ownership')
  {
    homeInfo('No');
    owner(null);
  }
  else if(currentPage == 'annual-mileage')
  {
    homeInfo('No');
    milage(null);
  }
  else if(currentPage == 'desired-coverage-level')
  {
    homeInfo('No');
    coverage(null);
  }
  else if(currentPage == 'add-another-vehicle')
  {
    homeInfo('No');
    anotherVehicle(null);
  }
  else if(currentPage == 'insurance-details')
  {
    homeInfo('No');
    insurance(null);
  }
  else if(currentPage == 'gender')
  {
    homeInfo('No');
    addDriver(null);
  }
  else if(currentPage == 'marital-status')
  {
    homeInfo('No');
    driverMaritalStatus(null);
  }
  else if(currentPage == 'birth-month')
  {
    homeInfo('No');
    birthMonth(null);
  }
  else if(currentPage == 'birth-day')
  {
    homeInfo('No');
    birthDay(null);
  }
  else if(currentPage == 'birth-year')
  {
    homeInfo('No');
    birthYear(null);
  }
  else if(currentPage == 'incidents-in-the-past-3-years')
  {
    homeInfo('No');
    incident(null);
  }
  else if(currentPage == 'accident-details')
  {
    homeInfo('No');
    accident(null);
  }
  else if(currentPage == 'dui-details')
  {
    homeInfo('No');
    dui(null);
  }
  else if(currentPage == 'driver-name')
  {
    homeInfo('No');
    driverName(null);
  }
  else if(currentPage == 'add-another-driver')
  {
    homeInfo('No');
    anotherDriver(null);
  }
  else if(currentPage == 'current-address')
  {
    homeInfo('No');
    ownerAddress(null);
  }
  else if(currentPage == 'home-ownership')
  {
    homeInfo('No');
    ownership(null);
  }
  else if(currentPage == 'email-address')
  {
    homeInfo('No');
    emailAddress(null);
  }
  else if(currentPage == 'contact-number')
  {
    homeInfo('No');
    getQuote(null);
  }
  else if(currentPage == 'thank-you')
  {
    homeInfo('No');
    checkLocalData();
  }
  else
  {
    createZIPCodePanel(null);
    homeInfo('Yes');
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

function createZIPCodePanel(e)
{
  setPageUrl('home-page');
  setCurrentPage('home-page');

  let html = '<div class="step step-1">'+
    '<h2>Enter Your Zip Code</h2>'+
    '<form action="#" name="zipForm" onsubmit="event.preventDefault()">'+
    '<div class="step step-1 step-content-basic">'+
    
      '<div class="field-wrap">'+
        '<div class="input-field-wrap">'+
          '<input type="text" id="zipcode" required value="'+(getLocalData() ? getLocalData().zipcode:'')+'">'+
          '<label for="">Zip code</label>'+
        '</div>'+
        '<span class="error-msg" id="result"></span>'+
      '</div>'+
      '<div class="field-wrap">'+
        '<button class="action-btn btn" onclick="ZIPCode(this)">Get Started</button>'+
      '</div>';

      if(getLocalData())
      {
      html += '<div class="more-options inner-wrap-btn">'+
        '<button type="button" class="show-more" onclick="brands(this)" value="next">'+
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

  if(vehicleCounter == 0)
  {
    increasePercent(25); // 25%
  }
  else
  {
    increasePercent(67); // 25%
  }
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
      formdata.zipcode = zipcode.value;
      setLocalData(formdata);

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
  setPageUrl('vehicle-make');
  setCurrentPage('vehicle-make');
  
  // hide home page information
  homeInfo('No');

  commonAgent('Yes');

  let xvehicle = formdata.vehicles.current[0];
  vehicleCounter = formdata.vehicles.list.length;

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
      if(xvehicle && xvehicle[0] == b || brand == b){
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
    back.innerHTML = '<button type="button" class="back" value="back" onclick="'+(formdata.vehicles.list.length > 0 ? 'anotherVehicle(this)' : 'createZIPCodePanel(this)')+'">'+
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
    '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
    '</svg> Back </button>';
    container.appendChild(back);
  }) // Use the data
  .catch(error => console.error('Error loading JSON:', error));


  if(vehicleCounter == 0)
  {
    increasePercent(31); // 31%
  }
  else
  {
    increasePercent(67); // 25%
  }
  
}

function checkBrands(e)
{
  formdata.vehicles.current[0] = [e.name, e.firstElementChild.firstElementChild.src];
  setLocalData(formdata);

  //call to the write years
  writeYears(e);

}

// read years
function writeYears(e)
{
  setPageUrl('vehicle-year');
  setCurrentPage('vehicle-year');

  vehicleCounter = formdata.vehicles.list.length;

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
      if(formdata.vehicles.current[1] == b || year == b){
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

    if(vehicleCounter == 0)
    {
      increasePercent(37); // 37%
    }
    else
    {
      increasePercent(67); // 25%
    }

    // store brand to the object
    formdata.vehicles.current[0] = [brand, e.firstElementChild.firstElementChild.src];
  }) // Use the data
  .catch(error => console.error('Error loading JSON:', error));
}

function checkYears(e)
{
  formdata.vehicles.current[1] = e.name;
  setLocalData(formdata);

  //call to the write years
  models(e);

}

//write model
function models(e)
{
  setPageUrl('vehicle-model');
  setCurrentPage('vehicle-model');

  let model = '';

  vehicleCounter = formdata.vehicles.list.length;
  model = formdata.vehicles.current[2];

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
    if(formdata.vehicles.current[2] == b || model == b){
      btn.setAttribute('class', 'input active');
    }
    btn.setAttribute('name', b);
    btn.setAttribute('onclick', 'checkModel(this)');
    btn.innerHTML = b;

    if (e != null && e.value == 'more') {
      document.getElementById('model').appendChild(btn);
    } else if (e != null && e.value != 'more' && n < 12) {
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

  if (e != null && e.value != 'more' && number > 12)
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

  if(e != null && e.value != 'back')
  {
    // store year to the vehicle object
    formdata.vehicles.current[1] = year;
  }

  if(vehicleCounter == 0)
  {
    increasePercent(43); // 43%
  }
  else
  {
    increasePercent(67); // 25%
  }
}) // Use the data
.catch(error => console.error('Error loading JSON:', error));
}

function checkModel(e)
{
  formdata.vehicles.current[2] = e.name;
  setLocalData(formdata);

  owner(e);
}

function owner(e)
{
  setPageUrl('vehicle-ownership');
  setCurrentPage('vehicle-ownership');

  let own = formdata.vehicles.current;
  vehicleCounter = formdata.vehicles.list.length;

  container.innerHTML = '<div class="step step-number step-content-basic">'+
  '<h4>'+(vehicleCounter > 0 ? countArr[vehicleCounter]+' Vehicle' : "")+' </h4>'+
  '<h2>Vehicle Ownership</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="model">'+
      '<button class="input '+(own[3] == 'Own Paid Off' ? 'active': '')+'" onclick="checkOwner(this)" value="Own Paid Off">Own Paid Off</button>'+
      '<button class="input '+(own[3] == 'Own Financed' ? 'active': '')+'" onclick="checkOwner(this)" value="Own Financed">Own Financed</button>'+
      '<button class="input '+(own[3] == 'Leased' ? 'active': '')+'" onclick="checkOwner(this)" value="Leased">Leased</button>'+
    '</div>'+
  '</div>'+
  '<div class="back-to-prev">'+
      '<button class="back" onclick="models(this)" name="'+year+'" value="back">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
  '</div>';

  if(vehicleCounter == 0)
  {
    increasePercent(49); //49%
  }
  else
  {
    increasePercent(67); // 25%
  }
}

function checkOwner(e)
{
  formdata.vehicles.current[3] = e.value;
  setLocalData(formdata);
  
  milage(e);
}

function milage(e)
{
  setPageUrl('annual-mileage');
  setCurrentPage('annual-mileage');
 
  let mile = formdata.vehicles.current;
  vehicleCounter = formdata.vehicles.list.length;

  container.innerHTML = '<div class="step step-number step-content-basic">'+
  '<h4>'+(vehicleCounter > 0 ? countArr[vehicleCounter]+' Vehicle' : "")+' </h4>'+
  '<h2>Annual Mileage</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="model">'+
      '<button class="input '+(mile[4] == '2000' ? 'active': '')+'" onclick="checkMilage(this)" value="2000">2000</button>'+
      '<button class="input '+(mile[4] == '5000' ? 'active': '')+'" onclick="checkMilage(this)" value="5000">5000</button>'+
      '<button class="input '+(mile[4] == '10000' ? 'active': '')+'" onclick="checkMilage(this)" value="10000">10000</button>'+
      '<button class="input '+(mile[4] == '15000' ? 'active': '')+'" onclick="checkMilage(this)" value="15000">15000</button>'+
      '<button class="input '+(mile[4] == '20000' ? 'active': '')+'" onclick="checkMilage(this)" value="20000">20000</button>'+
    '</div>'+
  '</div>'+
  '<div class="back-to-prev">'+
      '<button class="back" onclick="owner(this)" name="'+brand+'" value="back">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
  '</div>';

  if(vehicleCounter == 0)
  {
    increasePercent(55); //55%
  }
  else
  {
    increasePercent(67); // 25%
  }
}

function checkMilage(e)
{
  formdata.vehicles.current[4] = e.value;
  setLocalData(formdata);

  coverage(e);
}

function coverage(e)
{
  setPageUrl('desired-coverage-level');
  setCurrentPage('desired-coverage-level');
 
  let cover = formdata.vehicles.current;
  vehicleCounter = formdata.vehicles.list.length;

  container.innerHTML = '<div class="step step-number step-content-basic">'+
  '<h4>'+(vehicleCounter > 0 ? countArr[vehicleCounter]+' Vehicle' : "")+' </h4>'+
  '<h2>Desired Coverage Level</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="model">'+
      '<button class="input '+(cover[5] == 'Superior' ? 'active': '')+'" onclick="checkCoverage(this)" value="Superior">Superior</button>'+
      '<button class="input '+(cover[5] == 'Standard' ? 'active': '')+'" onclick="checkCoverage(this)" value="Standard">Standard</button>'+
      '<button class="input '+(cover[5] == 'Basic' ? 'active': '')+'" onclick="checkCoverage(this)" value="Basic">Basic</button>'+
      '<button class="input '+(cover[5] == 'State' ? 'active': '')+'" onclick="checkCoverage(this)" value="State">State</button>'+
      '<button class="input '+(cover[5] == 'Minimum' ? 'active': '')+'" onclick="checkCoverage(this)" value="Minimum">Minimum</button>'+
    '</div>'+
  '</div>'+
  '<div class="back-to-prev">'+
      '<button class="back" onclick="milage(this)" name="'+brand+'" value="back">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
  '</div>';
  
  if(vehicleCounter == 0)
  {
    increasePercent(61); //61%
  }
  else
  {
    increasePercent(67); // 25%
  }
}

function checkCoverage(e)
{
  formdata.vehicles.current[5] = e.value;
  setLocalData(formdata);

  anotherVehicle(e);
}

function anotherVehicle(e)
{
  setPageUrl('add-another-vehicle');
  setCurrentPage('add-another-vehicle');

  container.innerHTML = '<div class="step step-number step-content-basic yes-no-box">'+
  '<h2>Add Another Vehicle?</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="model">'+
      '<button class="input" onclick="checkAnotherVehicle(this)" name="Yes">YES</button>'+
      '<button class="input" onclick="checkAnotherVehicle(this)" name="No">NO</button>'+
    '</div>'+
  '</div>';

  commonAgent('Yes');

  increasePercent(67); //67%
}

function checkAnotherVehicle(e)
{
  //store coverage to the vehicle object
  formdata.vehicles.current[6] = e.innerHTML;

  if(e.name == 'Yes')
  {
    const nullVehicle = Array.from(formdata.vehicles.current, x => x ?? null);

    if(!nullVehicle.some(item => item === null))
    {
      formdata.vehicles.list.push(formdata.vehicles.current);
      formdata.vehicles.current = [];
      brand = '', year = '';

      vehicleCounter = formdata.vehicles.list.length;
    }

    if(formdata.vehicles.list.length >= 3)
    {
      alert('We are accepting up to 3 vehicles');

      if(formdata.editmode == 'Yes')
      {
        localStorage.removeItem('submitted');
        checkLocalData();
      }
      else
      {
        insurance(e);
      }
    }
    else
    {
      brands(e);
    }

    setLocalData(formdata);
    
  }
  else if(e.name == 'No')
  {
    if(formdata.editmode == 'Yes')
    {
      localStorage.removeItem('submitted');
      formdata.vehicles.list.push(formdata.vehicles.current);
      formdata.vehicles.current = [];
      formdata.editmode = '';
      checkLocalData();
    }
    else
    {
      insurance(e);
    }
    setLocalData(formdata);
    
  }
}

function insurance(e)
{
  setPageUrl('insurance-details');
  setCurrentPage('insurance-details');

  let insure = formdata.owner.insurance;
  // common agent text hide this section
  commonAgent('No');
  
  container.innerHTML = '<div class="step step-number step-content-basic">'+
  '<h2>Insurance Details</h2>'+
  '<form action="#" id="insuranceForm">'+
    '<div class="inner-wrap">'+
      '<h4 style="text-align: left;">Current Insurance Carier</h4>'+
      '<select name="career" id="insurance_carrier" class="select-box-carrier carier" onchange="checkErr(this)">'+
          '<option data-placeholder="true"></option>'+
          '<option value="Other"'+(insure[0] == 'Other'? 'selected':'')+'>Other</option>'+
          '<option value="Not Currently Listed"'+(insure[0] == 'Not Currently Listed'? 'selected':'')+'>Not Currently Listed</option>'+
          '<option value="21st Century"'+(insure[0] == '21st Century'? 'selected':'')+'>21st Century</option>'+
          '<option value="AAA"'+(insure[0] == 'AAA'? 'selected':'')+'>AAA</option>'+
          '<option value="American Family"'+(insure[0] == 'American Family'? 'selected':'')+'>American Family</option>'+
          '<option value="Dairyland"'+(insure[0] == 'Dairyland'? 'selected':'')+'>Dairyland</option>'+
          '<option value="Direct Auto"'+(insure[0] == 'Direct Auto'? 'selected':'')+'>Direct Auto</option>'+
          '<option value="Erie"'+(insure[0] == 'Erie'? 'selected':'')+'>Erie</option>'+
          '<option value="Esurance"'+(insure[0] == 'Esurance'? 'selected':'')+'>Esurance</option>'+
          '<option value="Farm Bureau"'+(insure[0] == 'Farm Bureau'? 'selected':'')+'>Farm Bureau</option>'+
          '<option value="Farmers"'+(insure[0] == 'Farmers'? 'selected':'')+'>Farmers</option>'+
          '<option value="Foremost"'+(insure[0] == 'Foremost'? 'selected':'')+'>Foremost</option>'+
          '<option value="Gainsco"'+(insure[0] == 'Gainsco'? 'selected':'')+'>Gainsco</option>'+
          '<option value="GEICO Good2go"'+(insure[0] == 'GEICO Good2go'? 'selected':'')+'>GEICO Good2go</option>'+
          '<option value="Liberty Mutual"'+(insure[0] == 'Liberty Mutual'? 'selected':'')+'>Liberty Mutual</option>'+
          '<option value="Mercury"'+(insure[0] == 'Mercury'? 'selected':'')+'>Mercury</option>'+
          '<option value="Nationwide"'+(insure[0] == 'Nationwide'? 'selected':'')+'>Nationwide</option>'+
          '<option value="Plymouth Rock"'+(insure[0] == 'Plymouth Rock'? 'selected':'')+'>Plymouth Rock</option>'+
          '<option value="Progressive"'+(insure[0] == 'Progressive'? 'selected':'')+'>Progressive</option>'+
          '<option value="Safeco"'+(insure[0] == 'Safeco'? 'selected':'')+'>Safeco</option>'+
          '<option value="State Farm"'+(insure[0] == 'State Farm'? 'selected':'')+'>State Farm</option>'+
          '<option value="The General"'+(insure[0] == 'The General'? 'selected':'')+'>The General</option>'+
          '<option value="Travelers"'+(insure[0] == 'Travelers'? 'selected':'')+'>Travelers</option>'+
          '<option value="USAA"'+(insure[0] == 'USAA'? 'selected':'')+'>USAA</option>'+
      '</select>'+
      '<p class="error" id="carrier_err"></p>'+
      '<h4 style="text-align: left;">Continuous Coverage</h4>'+
      '<select name="coverage" id="insurance_coverage" class="select-box-coverage coverage" onchange="checkErr(this)">'+
          '<option data-placeholder="true"></option>'+
          '<option value="0" '+(insure[1] == '0'? 'selected':'')+'>0</option>'+
          '<option value="6 months" '+(insure[1] == '6 months'? 'selected':'')+'>6 months</option>'+
          '<option value="1 year" '+(insure[1] == '1 year'? 'selected':'')+'>1 year</option>'+
          '<option value="1-3 years" '+(insure[1] == '1-3 years'? 'selected':'')+'>1-3 years</option>'+
          '<option value="3-5 years" '+(insure[1] == '3-5 years'? 'selected':'')+'>3-5 years</option>'+
          '<option value="5+ years" '+(insure[1] == '5+ years'? 'selected':'')+'>5+ years</option>'+
      '</select>'+
      '<p class="error" id="coverage_err"></p>'+
    '</div>'+
    '<div class="back-to-prev">'+
      '<button type="button" class="back" onclick="'+(formdata.editmode == 'Yes' ? 'checkLocalData()' : 'anotherVehicle(this)')+'" name="" value="back">'+
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

  if(e != null && e.value == 'back')
  {
    if(driverCounter > 0)
    {
      anotherDriver();
    }
  }
  increasePercent(67); //67%

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

          if(formdata.editmode == 'Yes')
          {
            localStorage.removeItem('submitted');
            formdata.editmode = '';

            checkLocalData();
          }
          else
          {
            addDriver();
          }

          setLocalData(formdata);
        }

    });
}

/** ------------------ Add Driver Section --------------- */
function addDriver(e)
{
  setPageUrl('gender');
  setCurrentPage('gender');

  let driver = formdata.drivers.current.general;
  driverCounter = formdata.drivers.list.length;

  container.innerHTML = '<div class="step step-number step-content-basic">'+
  '<h5 style="color: #666">'+countArr[driverCounter]+' Driver</h5>'+
  '<h2>Gender</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="model">'+
      '<button class="input '+(driver[0] == 'Male' ? 'active' : '')+'" onclick="driverMaritalStatus(this)" value="Male">Male</button>'+
      '<button class="input '+(driver[0] == 'Female' ? 'active' : '')+'" onclick="driverMaritalStatus(this)" value="Female">Female</button>'+
    '</div>'+
  '</div>'+
  '<div class="back-to-prev">'+
      '<button class="back" onclick="'+(formdata.editmode == 'Yes' ? 'checkLocalData()' : 'insurance(this)')+'" name="back" value="back">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
  '</div>';

  if(driverCounter == 0)
  {
    increasePercent(72); //72%
  }
  else
  {
    increasePercent(92); //92%
  }
}

function driverMaritalStatus(e)
{
  setPageUrl('marital-status');
  setCurrentPage('marital-status');

  let driver = formdata.drivers.current.general;
  driverCounter = formdata.drivers.list.length;

  container.innerHTML = '<div class="step step-number step-content-basic three-items">'+
  '<h5 style="color: #666">'+countArr[driverCounter]+' Driver</h5>'+
  '<h2>Marital Status</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="model">'+
      '<button class="input '+(driver[1] == 'Married' ? 'active' : '')+'" onclick="birthMonth(this)" value="Married">Married</button>'+
      '<button class="input '+(driver[1] == 'Single' ? 'active' : '')+'" onclick="birthMonth(this)" value="Single">Single</button>'+
      '<button class="input '+(driver[1] == 'Divorced' ? 'active' : '')+'" onclick="birthMonth(this)" value="Divorced">Divorced</button>'+
      '<button class="input '+(driver[1] == 'Domestic Partner' ? 'active' : '')+'" onclick="birthMonth(this)" value="Domestic Partner">Domestic Partner</button>'+
      '<button class="input '+(driver[1] == 'Separated' ? 'active' : '')+'" onclick="birthMonth(this)" value="Separated">Separated</button>'+
      '<button class="input '+(driver[1] == 'Widowed' ? 'active' : '')+'" onclick="birthMonth(this)" value="Widowed">Widowed</button>'+
    '</div>'+
  '</div>'+
  '<div class="back-to-prev">'+
      '<button class="back" onclick="addDriver(this)" name="back" value="back">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
  '</div>';

  //increase value for every action
  if(driverCounter == 0)
  {
    increasePercent(77); //77%
  }
  else
  {
    increasePercent(92); //92%
  }

  if(e != null && e.value != 'back')
  {
    //store gender to driver array
    formdata.drivers.current.general[0] = e.value;
    setLocalData(formdata);
  }
}

function birthMonth(e)
{
  setPageUrl('birth-month');
  setCurrentPage('birth-month');

  let dob = formdata.drivers.current.dob;
  driverCounter = formdata.drivers.list.length;

  container.innerHTML = '<div class="step step-number step-content-basic three-items">'+
  '<h5 style="color: #666">'+countArr[driverCounter]+' Driver</h5>'+
  '<h2>Birth Month</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="model">'+
      '<button class="input '+(dob[0] == 'January'? 'active' : '')+'" onclick="birthDay(this)" value="January">January</button>'+
      '<button class="input '+(dob[0] == 'February'? 'active' : '')+'" onclick="birthDay(this)" value="February">February</button>'+
      '<button class="input '+(dob[0] == 'March'? 'active' : '')+'" onclick="birthDay(this)" value="March">March</button>'+
      '<button class="input '+(dob[0] == 'April'? 'active' : '')+'" onclick="birthDay(this)" value="April">April</button>'+
      '<button class="input '+(dob[0] == 'May'? 'active' : '')+'" onclick="birthDay(this)" value="May">May</button>'+
      '<button class="input '+(dob[0] == 'June'? 'active' : '')+'" onclick="birthDay(this)" value="June">June</button>'+
      '<button class="input '+(dob[0] == 'July'? 'active' : '')+'" onclick="birthDay(this)" value="July">July</button>'+
      '<button class="input '+(dob[0] == 'August'? 'active' : '')+'" onclick="birthDay(this)" value="August">August</button>'+
      '<button class="input '+(dob[0] == 'September'? 'active' : '')+'" onclick="birthDay(this)" value="September">September</button>'+
      '<button class="input '+(dob[0] == 'October'? 'active' : '')+'" onclick="birthDay(this)" value="October">October</button>'+
      '<button class="input '+(dob[0] == 'November'? 'active' : '')+'" onclick="birthDay(this)" value="November">November</button>'+
      '<button class="input '+(dob[0] == 'December'? 'active' : '')+'" onclick="birthDay(this)" value="December">December</button>'+
    '</div>'+
  '</div>'+
  '<div class="back-to-prev">'+
      '<button class="back" onclick="driverMaritalStatus(this)" name="back" value="back">'+
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
              '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
  '</div>';

  //increase value for every action
  if(driverCounter == 0)
  {
    increasePercent(82); //82%
  }
  else
  {
    increasePercent(92); //92%
  }

  if(e != null && e.value != 'back')
  {
    //store marital status to the drivers general array
    formdata.drivers.current.general[1] = e.value;
    setLocalData(formdata);
  }
}

function birthDay(e)
{
  setPageUrl('birth-day');
  setCurrentPage('birth-day');

  let dob = formdata.drivers.current.dob;
  driverCounter = formdata.drivers.list.length;

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
  
  for(let d = 1; d <= 31; d++)
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

  //increase value for every action
  if(driverCounter == 0)
  {
    increasePercent(87); //87%
  }
  else
  {
    increasePercent(92); //92%
  }

  if(e != null && e.value != 'back')
  {  
    //birth day store to current.dob array
    formdata.drivers.current.dob[0] = e.value;
    setLocalData(formdata);
  }
}

function birthYear(e)
{
  setPageUrl('birth-year');
  setCurrentPage('birth-year');

  let dob = formdata.drivers.current.dob;
  driverCounter = formdata.drivers.list.length;

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
    y.value = d;
    y.innerHTML = d;
    document.getElementById('birth_year').appendChild(y);
  }

  //increase value for every action
  if(driverCounter == 0)
  {
    increasePercent(92); //92%
  }
  else
  {
    increasePercent(92); //92%
  }

  if(e != null && e.value != 'back')
  {
    //birth day push to birthDate array
    formdata.drivers.current.dob[1] = e.value;
    setLocalData(formdata);
  }
}

function incident(e)
{
  setPageUrl('incidents-in-the-past-3-years');
  setCurrentPage('incidents-in-the-past-3-years');

  let parts = formdata.drivers.current.incidents.part;
  driverCounter = formdata.drivers.list.length;
  
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
    //birth year push to birthDate array
    formdata.drivers.current.dob[2] = e.value;
    setLocalData(formdata);
  }

  increasePercent(92); // 92%
  
}

/** selects incidents parts  */
function checkIncident(e)
{
  let parts = formdata.drivers.current.incidents.part;
  let incidents = formdata.incidents;

  if(e != null && e.value == 'Yes')
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

  console.log('check incident:', incidents.forward);

  formdata.drivers.current.incidents.part = parts;
  formdata.incidents = incidents;
  setLocalData(formdata);
}

function accident(e)
{
  setPageUrl('accident-details');
  setCurrentPage('accident-details');

  let act = formdata.drivers.current.incidents.accident;
  driverCounter = formdata.drivers.list.length;

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
  
    increasePercent(92) //92%

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
      formdata.incidents.backward.push('accident');
      setLocalData(formdata);

      nextIncident(e);
    }

  });
}

function ticket(e)
{
  setPageUrl('driver-ticket');
  setCurrentPage('driver-ticket');

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
  
  increasePercent(92) //92%

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
    
      formdata.incidents.backward.push('ticket');
      setLocalData(formdata);

      nextIncident(e);
    }

  });
}

function dui(e)
{
  setPageUrl('dui-details');
  setCurrentPage('dui-details');

  let state = '';
  let addr = formdata.drivers.current.incidents.dui;
  let act = formdata.drivers.current.incidents.dui;
  driverCounter = formdata.drivers.list.length;

  if(addr[2])
  {
    state = addr[2];
  }
  // state array creation
  let statelist = '<option value="">State</option>\n';
  Object.entries(statedata).forEach(([k, s]) => {
    statelist += '<option value="'+k+'" '+(state ? 'selected' : '')+'>'+s+'</option>\n';
  });

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
  
  increasePercent(92) //92%

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
      setLocalData(formdata);

      formdata.incidents.backward.push('dui');

      nextIncident(e);
    }

  });
}

function driverName(e)
{
  setPageUrl('driver-name');
  setCurrentPage('driver-name');

  let first_name = '', last_name = '';
  let names = formdata.drivers.current.names;
  driverCounter = formdata.drivers.list.length;

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

    if(driverCounter == 0)
    {
      increasePercent(92) //92%
    }
    else
    {
      increasePercent(92) //92%
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
      setLocalData(formdata);

      anotherDriver(e);
    }

  });
}

/** ------------------- next incident ------------ */
function nextIncident(e)
{
  let incidents = formdata.incidents;
  if(incidents.forward.includes('accident'))
  {
    let index = incidents.forward.indexOf('accident');
    incidents.forward.splice(index, 1);
    accident(e);
  }
  else if(incidents.forward.includes('dui'))
  {
    let index = incidents.forward.indexOf('dui')
    incidents.forward.splice(index, 1);
    dui(e);
  }
  else
  {
    driverName(e);
  }

  formdata.incidents = incidents;
  setLocalData(formdata);
}

/** ------------------- back incident ------------ */
function backIncident(e)
{
  formdata.incidents.forward.push(e.value);
  let incidents = formdata.incidents;

  if(incidents.backward.includes('dui'))
  {
    let index = incidents.backward.indexOf('dui');
    incidents.backward.splice(index, 1);
    dui(e);
  }
  else if(incidents.backward.includes('accident'))
  {
    let index = incidents.backward.indexOf('accident');
    incidents.backward.splice(index, 1);
    accident(e);
  }
  else
  {
    incident(e);
  }

  formdata.incidents = incidents;
  setLocalData(formdata);  
}

function anotherDriver(e)
{
  setPageUrl('add-another-driver');
  setCurrentPage('add-another-driver');

  container.innerHTML = '<div class="step step-number step-content-basic yes-no-box">'+
  '<h2>Add Another Driver?</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="moreDriver">'+
      '<button class="input" onclick="checkAnotherDriver(this)" value="YES">YES</button>'+
      '<button class="input" onclick="checkAnotherDriver(this)" value="NO">NO</button>'+
    '</div>'+
  '</div>';
  
  increasePercent(92) //92%
}

function checkAnotherDriver(e)
{
  if(e.value == 'YES')
  {
    driverCounter = formdata.drivers.list.length + 1;

    if(formdata.drivers.current.names.length > 0)
    {
      formdata.drivers.list.push(formdata.drivers.current);

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

      formdata.incidents = {
        backward : [],
        forward : []
      };
    }

    setLocalData(formdata);

    if(formdata.drivers.list.length >= 3)
    {
      alert('We are accepting up to 3 drivers.');
      if(formdata.editmode == 'Yes')
      {
        checkLocalData();
      }
      else
      {
        ownerAddress(e);
      }
    }
    else
    {
      addDriver();
    }
  }
  else if(e.value == 'NO')
  {
    if(formdata.editmode == 'Yes')
    {
      localStorage.setItem('submitted', true);
      formdata.drivers.list.push(formdata.drivers.current);
      //remove submitted counter
      localStorage.removeItem('submitted');
      formdata.editmode = '';
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

      formdata.incidents = {
        backward : [],
        forward : []
      };

      setLocalData(formdata);
      checkLocalData();
    }
    else
    {
      ownerAddress(e);
    }
  }
}

/** ------------------ Owner Details -------------------- */
function ownerAddress(e)
{
  let loading1 = document.getElementById('loading');
  loading1.style.display = 'block';

  setPageUrl('current-address');
  setCurrentPage('current-address');

  let address = '', zip = '', state = '', city = '', country = '';
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
  if(addr[4])
  {
    country = addr[4];
  }

  // state array creation
  let statelist = '<option value="">State</option>\n';
  setTimeout(()=> {
    Object.entries(statedata).map(([k, s]) => {
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
      '<button class="back" onclick="'+(formdata.editmode == 'Yes' ? 'checkLocalData()' : 'anotherDriver(this)')+'" name="back" value="back">'+
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
  
    increasePercent(92) //92%

  initAutocomplete();
  styleLoad();

  loading1.style.display = 'none';
  }, 1000);
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
      formdata.owner.address = [address.value, zip.value, state.value, city.value, country.value];

      let local = getLocalData();
      
      if(local && formdata.editmode == 'Yes')
      {
        // remove submit count from local data
        localStorage.removeItem('submitted');
        formdata.editmode = '';
        checkLocalData();
      }
      else
      {
        ownership(e);
      }

      setLocalData(formdata);
    }

  });
}

function ownership(e)
{
  setPageUrl('home-ownership');
  setCurrentPage('home-ownership');

  let contact = formdata.owner.contact;

  container.innerHTML = '<div class="step step-number step-content-basic">'+
  '<h2>Home Ownership</h2>'+
    '<div class="inner-wrap inner-wrap-btn" id="model">'+
      '<button class="input '+(contact[0] == 'OWN' ? 'active' : '')+'" onclick="checkOwnership(this)" value="OWN">OWN</button>'+
      '<button class="input '+(contact[0] == 'RENT' ? 'active' : '')+'" onclick="checkOwnership(this)" value="RENT">RENT</button>'+
      '<button class="input '+(contact[0] == 'OTHER' ? 'active' : '')+'" onclick="checkOwnership(this)" value="OTHER">OTHER</button>'+
    '</div>'+
  '</div>'+
  '<div class="back-to-prev">'+
      '<button class="back" onclick="'+(formdata.editmode == 'Yes' ? 'checkLocalData()': 'ownerAddress(this)')+'" name="back" value="back">'+
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
          '<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />'+
          '</svg> Back '+
      '</button>'+
  '</div>';

  increasePercent(94) //94%  
}

function checkOwnership(e)
{
  if(e != null)
  {
    // increasePercent(2);
    formdata.owner.contact[0] = e.value;

    if(formdata.editmode == 'Yes')
    {
      // remove submit count from local data
      localStorage.removeItem('submitted');
      formdata.editmode = '';
      checkLocalData();
    }
    else
    {
      emailAddress(e);
    }
    setLocalData(formdata);
  }
  
}

function emailAddress(e)
{
  setPageUrl('email-address');
  setCurrentPage('email-address');

  let email = '';
  let contact = formdata.owner.contact;

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
        '<button class="back" onclick="'+(formdata.editmode == 'Yes' ? 'checkLocalData()' : 'ownership(this)')+'" name="back" value="back">'+
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

    increasePercent(96) //96%
}

function emailForm(e)
{
  let email = document.getElementById('email');

  if(checkEmail(email))
  {
    formdata.owner.contact[1] = email.value;

    if(formdata.editmode == 'Yes'){

      // remove submit count from local data
      localStorage.removeItem('submitted');
      formdata.editmode = '';
      checkLocalData();
    }
    else
    {
      getQuote(e);
    }
    setLocalData(formdata);
  }
}

function getQuote(e)
{
  setPageUrl('contact-number');
  setCurrentPage('contact-number');

  let phone = '';
  let contact = formdata.owner.contact;

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
      '<form><p><label><input type="hidden" id="leadid_tcpa_disclosure"/> We take your privacy seriously. By clicking the "Submit" button above, I give my express written consent by electronic signature to Erase Your Bills and its <a href="#" onclick="event.preventDefault(); openModal()" id="openModal">Marketing Partners, agents, affiliates or third parties</a> acting on its behalf to receive marketing communications, or to obtain additional information for such purposes via telephone calls or SMS/MMS text message, calls using a live agent, automatic telephone dialing system, artificial or AI generated voice/pre-recorded message, or email from this website and/or partner companies or their agents at the landline or wireless number I provided, even if my number/email is currently listed on any federal, state, or company Do Not Call/Do Not Email list. Carrier message and data rates may apply. I understand that my consent is not required as a condition of purchasing any goods or services and that I may revoke my consent at any time. I also acknowledge that I am at least 18 years of age and I have read and agree to this website\'s <a href="https://eraseyourbills.com/privacy-policy/" target="_blank">Privacy Policy</a> and <a href="https://eraseyourbills.com/terms-of-use/" target="_blank">Terms and Conditions</a>.</label></p></form>'+
  '</div>';
  
  increasePercent(98) //98%
}

function checkQuote(e)
{
  let phone = document.getElementById('phone');

  if(checkPhone(phone))
  {
    formdata.owner.contact[2] = phone.value;

    const nullVehicle = Array.from(formdata.vehicles.current, x => x ?? null);

    if(!nullVehicle.some(item => item === null) && formdata.vehicles.list.length <= 3)
    {
      formdata.vehicles.list.push(formdata.vehicles.current);
      formdata.vehicles.current = [];
      brand = '', year = '';
    }

    if(formdata.drivers.current.names.length > 0 && formdata.drivers.list.length <= 3)
    {
      formdata.drivers.list.push(formdata.drivers.current);
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

    formdata.incidents = {
      forward: [],
      backward: []
    };

    setLocalData(formdata);

    if(formdata.editmode == 'Yes')
    {
      // remove submit counter from local data
      localStorage.removeItem('submitted');
      formdata.editmode = '';
      setLocalData(formdata);

      // check formdata stored to the localstoage
      checkLocalData();
    }
    else
    {
      checkLocalData();
      loading.style.display = 'block';
      sendToServer();
      localStorage.setItem('submitted', true);
    }
    setCurrentPage('thank-you');
  }
}

function thankYou()
{
  container.innerHTML = '<div class="step step-1 step-content-basic">'+
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

// send data to the go heigh level
function sendToServer()
{
  setPageUrl('thank-you');

  let leadid_token = document.getElementById('leadid_token');
  let formData = {
    LeadiD: leadid_token.value,
    vehicles:[],
    drivers:[],
    owner:[]
  };
  let local = JSON.parse(localStorage.getItem('localdata'));
  local.vehicles.list.forEach((v, n) => {
    if(v.length > 0){
      formData.vehicles.push({
        VehicleMake:v[0][0],
        VehicleYear:v[1],
        VehicleModel:v[2],
        VehicleOwnership:v[3],
        AnnualMileage:v[4],
        DesiredCoverageLevel:v[5]
      });
    }
  });

  local.drivers.list.forEach((d, n) => {
    if(d){
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
    }
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

  let form = formData;

  // send data to lead prosper
  let lpdata = {
    "lp_campaign_id": "27824",
    "lp_supplier_id": "81192",
    "lp_key": "y7kmilnvgc632w",
    // "lp_action": "test",
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
    "tcpa_text": "We take your privacy seriously. By clicking the 'Submit' button above, I give my express written consent by electronic signature to Erase Your Bills and its <a href='#' id='openModal'>Marketing Partners, agents, affiliates or third parties</a> acting on its behalf to receive marketing communications, or to obtain additional information for such purposes via telephone calls or SMS/MMS text message, calls using a live agent, automatic telephone dialing system, artificial or AI generated voice/pre-recorded message, or email from this website and/or partner companies or their agents at the landline or wireless number I provided, even if my number/email is currently listed on any federal, state, or company Do Not Call/Do Not Email list. Carrier message and data rates may apply. I understand that my consent is not required as a condition of purchasing any goods or services and that I may revoke my consent at any time. I also acknowledge that I am at least 18 years of age and I have read and agree to this website\'s <a href='https://eraseyourbills.com/privacy-policy/' target='_blank'>Privacy Policy</a> and <a href='https://eraseyourbills.com/terms-of-use/' target='_blank'>Terms and Conditions</a>.",
    "v_click_id": v_click_id, //month
    "credit_rating": "", //Unsure
    "currently_insured": form.owner.CurrentInsuranceCarier == 'Not Currently Listed' ? 'No': 'Yes', //Yes/No
    "current_insurance": form.owner.CurrentInsuranceCarier,
    "current_coverage_start": "", //1998-06-02
    "current_coverage_expiry": "", //1954-05-29
    "current_coverage_type": "", //Premium
    "continuously_insured": form.owner.ContinuousCoverage,
    "requested_coverage_type": "", //Not Insured
    "requested_bodily_injury": "", //50/100
    "requested_property_damage": "", //139
    "multiple_drivers": Object.values(formData.drivers).length > 1 ? "Yes" : "No",
    "multiple_vehicles": Object.values(form.vehicles).length > 1 ? "Yes" : "No",
    "home_owner": form.owner.owner == 'OWN' ? 'Yes': 'No', //Yes/No
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
    "vehicle_1_coverage_level": form.vehicles[0].DesiredCoverageLevel,
    "driver_1_first_name": form.drivers[0].FirstName,
    "driver_1_last_name": form.drivers[0].LastName,
    "driver_1_dob": dateFormat(form.drivers[0].BirthDate),
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
    "vehicle_2_year": Object.values(form.vehicles).length > 1 ? form.vehicles[1].VehicleYear : "",
    "vehicle_2_make": Object.values(form.vehicles).length > 1 ? form.vehicles[1].VehicleMake : "",
    "vehicle_2_model": Object.values(form.vehicles).length > 1 ? form.vehicles[1].VehicleModel : "",
    "vehicle_2_trim": "", //gray
    "vehicle_2_vin": "", //fuchsia
    "vehicle_2_ownership": Object.values(form.vehicles).length > 1 ? form.vehicles[1].VehicleOwnership : "",
    "vehicle_2_abs": "", //Yes/No
    "vehicle_2_alarm": "", //Yes/No
    "vehicle_2_useage": "", //Commute School
    "vehicle_2_annual_miles": Object.values(form.vehicles).length > 1 ? form.vehicles[1].AnnualMileage : "",
    "vehicle_2_weekly_days": "", //912
    "vehicle_2_collision": "", //$2000
    "vehicle_2_comprehensive": "", //$1500
    "vehicle_2_coverage_level": Object.values(form.vehicles).length > 1 ? form.vehicles[1].DesiredCoverageLevel : "",
    "vehicle_3_year": Object.values(form.vehicles).length > 2 ? form.vehicles[2].VehicleYear : "",
    "vehicle_3_make": Object.values(form.vehicles).length > 2 ? form.vehicles[2].VehicleMake : "",
    "vehicle_3_model": Object.values(form.vehicles).length > 2 ? form.vehicles[2].VehicleModel : "",
    "vehicle_3_trim": "", //Friday
    "vehicle_3_vin": "", //Thursday
    "vehicle_3_ownership": Object.values(form.vehicles).length > 2 ? form.vehicles[2].VehicleOwnership : "",
    "vehicle_3_abs": "", //Yes/No
    "vehicle_3_alarm": "", //Yes/No
    "vehicle_3_useage": "", //Commute Work
    "vehicle_3_annual_miles": Object.values(form.vehicles).length > 2 ? form.vehicles[2].AnnualMileage : "",
    "vehicle_3_weekly_days": "", //244
    "vehicle_3_collision": "", //$250
    "vehicle_3_comprehensive": "", //$1000
    "vehicle_3_coverage_level": Object.values(form.vehicles).length > 2 ? form.vehicles[2].DesiredCoverageLevel : "",
    "driver_2_first_name": Object.values(form.drivers).length > 1 ? form.drivers[1].FirstName : "",
    "driver_2_last_name": Object.values(form.drivers).length > 1 ? form.drivers[1].LastName : "",
    "driver_2_dob": Object.values(form.drivers).length > 1 ? dateFormat(form.drivers[1].BirthDate) : "",
    "driver_2_relationship": "", //Self
    "driver_2_license_status": "", //Other
    "driver_2_license_state": "", //FL
    "driver_2_licensed_age": "", //676
    "driver_2_occupation": "", //College Professor
    "driver_2_education": "", //Masters Degree
    "driver_2_marital_status": Object.values(form.drivers).length > 1 ? form.drivers[1].MaritalStatus : "",
    "driver_2_employment_length": "", //310
    "driver_2_residence": "", //Other
    "driver_2_residence_length": "", //669
    "driver_3_first_name": Object.values(form.drivers).length > 2 ? form.drivers[2].FirstName : "",
    "driver_3_last_name": Object.values(form.drivers).length > 2 ? form.drivers[2].LastName : "",
    "driver_3_dob": Object.values(form.drivers).length > 2 ? dateFormat(form.drivers[2].BirthDate) : "",
    "driver_3_relationship": "", //Self
    "driver_3_license_status": "", //Suspended
    "driver_3_license_state": "", //FL
    "driver_3_licensed_age": "", //484
    "driver_3_occupation": "", //Teacher
    "driver_3_education": "", //Bachelors Degree
    "driver_3_marital_status": Object.values(form.drivers).length > 2 ? form.drivers[2].MaritalStatus : "",
    "driver_3_employment_length": "", //286
    "driver_3_residence": "", //Own
    "driver_3_residence_length": "" //523
  };  

  console.log(lpdata);
  let serialized = JSON.stringify(lpdata);
  // console.log(serialized);

  // fetch('https://api.leadprosper.io/direct_post', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content // if using Laravel
  //   },
  //   body: serialized
  // })
  // .then(response => response.json())
  // .then(data => {

  //   setTimeout(() => {
  //     loading.style.display = 'none';
  //   }, 2000);

  //   console.log('lp result:', data);

  //   if(data.id){
  //     localStorage.setItem('submitted', true);
  //     document.getElementById('getMyQuote').style.display = 'none';
  //     loading.style.display = 'none';
  //     document.getElementById('ThankYouMsg').style.display = 'block';
  //   }
  // })
  // .catch(error => {
  //   console.error('Error:', error);
  // });

  // just for test
    localStorage.setItem('submitted', true);
    document.getElementById('getMyQuote').style.display = 'none';
    loading.style.display = 'none';
    document.getElementById('ThankYouMsg').style.display = 'block';
  
}

// check local data exist
function checkLocalData()
{
  let page = 'thank-you';

  if(!localStorage.getItem('submitted'))
  {
    page = 're-submit';
  }

  setPageUrl(page);
  setCurrentPage('thank-you');

  let vehicleList = '', driverList = '';
  if(formdata)
  {
    // hide homepage addtional information
    homeInfo('No');
    if(formdata.vehicles.list)
    {
      formdata.vehicles.list.forEach((v, n) => {
        if(v.length > 0)
        {
          vehicleList += '<p>'+
            '<img src="'+v[0][1]+'" alt="" width="50">'+
            '<span>'+v[0][0]+'</span>'+
            '<span class="xbtn" onclick="removeVehicle(this)" id="'+n+'">x</span>'+
          '</p>';
        }
      });
    }
    
    if(formdata.drivers.list)
    {
      formdata.drivers.list.forEach((d, n) => {
        if(d)
        {
          driverList += '<p>'+
            '<svg class="" width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><rect fill="#FFF" width="48" height="48" rx="24"></rect><g transform="translate(16 12)" stroke="#000" stroke-width="2"><circle cx="8.471" cy="5.647" r="5.647"></circle><path d="M16.941 24A8.47 8.47 0 0 0 0 24"></path></g></g></svg>'+
            '<span>'+d.names[0]+'</span>'+
            '<span>'+d.names[1]+'</span>'+
            '<span class="xbtn" onclick="removeDriver(this)" id="'+n+'">x</span>'+
        '</p>';
        }
      });
    }

    let html = '<div class="welcome-back-wrap">'+
        '<h5 style="color: #0070e9; text-transform: uppercase;">Hey <strong>'+formdata.drivers.list[0].names[0]+'</strong>!</h5>'+
        '<h2 style="text-transform: uppercase;">Your Auto Quotes Are Almost Ready For You!</h2>'+
        '<div class="continue-btn">'+
          '<button class="action-btn btn get-my-quote" onclick="sendToServer(this)" value="" id="getMyQuote">Get my Quote<span class="notifiy">1</span></button>'+
        '</div>'+
        '<div id="ThankYouMsg" class="welcome-back-wrap" style="display:none">'+
        '<p style="margin-top:15px; color:green;">Thank You</p><br>'+
          '<div class="related-topics-wrap">'+
            '<h4>Related Topics</h4>'+
            '<div class="related-topics-inner">'+
                '<a href="https://answersconfidential.com/finance/ways-to-cut-your-auto-insurance-costs-in-2025-en-us/?segment=rsoc.qa.answersconfidential.001&headline=Smart+Ways+to+Lower+Auto+Insurance+in+2025&forceKeyA=Save+Money+on+Car+Insurance+This+Year&forceKeyB=Tips+to+Cut+Auto+Premiums+Fast&forceKeyC=Lower+Your+Auto+Insurance+Bill+Today&forceKeyD=Affordable+Car+Insurance+Plans&forceKeyE=Compare+Auto+Insurance+Quotes+Easily"><img src="https://eraseyourbills.com/wp-content/uploads/2025/06/SE1-optimized.webp" alt="SE1" /></a>'+
                '<a href="https://answersconfidential.com/finance/auto-insurance-trends-and-choices-for-2025-en-us/?segment=rsoc.qa.answersconfidential.001&headline=Explore+Auto+Insurance+Trends+and+Smart+Choices+for+2025&forceKeyA=Top+Auto+Insurance+Trends+in+2025&forceKeyB=Compare+Insurance+Options+Now&forceKeyC=Find+Better+Auto+Coverage+in+2025&forceKeyD=2025+Car+Insurance+Tips+for+Drivers&forceKeyE=Save+More+on+Auto+Insurance+Today"><img src="https://eraseyourbills.com/wp-content/uploads/2025/06/SE2-optimized.webp" alt="SE2" /></a>'+
                '<a href="https://answersconfidential.com/finance/senior-auto-insurance-savings-opportunities-en-us/?segment=rsoc.qa.answersconfidential.001&headline=Smart+Auto+Insurance+Savings+for+Seniors+in+2025&forceKeyA=best+auto+insurance+rates+in+{state}&forceKeyB=best+auto+insurance+rates+in+{city}&forceKeyC=cheapest+car+insurance+in+{state}&forceKeyD=car+insurance+for+seniors+over+60&forceKeyE=cheapest+car+insurance+for+seniors"><img src="https://eraseyourbills.com/wp-content/uploads/2025/06/SE3-optimized.webp" alt="SE3" /></a>'+
                '<a href="https://answersconfidential.com/general/affordable-auto-insurance-for-new-drivers-en-us/?segment=rsoc.qa.answersconfidential.001&headline=Affordable+Auto+Insurance+Options+for+New+Drivers&forceKeyA=car+insurance+for+first-time+drivers&forceKeyB=best+auto+insurance+for+teens+and+new+drivers&forceKeyC=affordable+insurance+for+young+drivers&forceKeyD=cheapest+new+driver+car+insurance&forceKeyE=compare+auto+rates+for+new+drivers"><img src="https://eraseyourbills.com/wp-content/uploads/2025/06/SE4-optimized.webp" alt="SE4" /></a>'+
                '<a href="https://answersconfidential.com/finance/benefits-of-auto-insurance-family-plans-en-us/?segment=rsoc.qa.answersconfidential.001&headline=Benefits+of+Auto+Insurance+Plans+for+Families&forceKeyA=save+with+family+auto+insurance+plans&forceKeyB=multi-car+insurance+discounts&forceKeyC=best+car+insurance+for+families&forceKeyD=auto+insurance+for+households+with+teen+drivers&forceKeyE=family+bundle+auto+insurance+quotes"><img src="https://eraseyourbills.com/wp-content/uploads/2025/06/SE5-optimized.webp" alt="SE5" /></a>'+
                '<a href="https://answersconfidential.com/finance/benefits-of-bundling-home-and-auto-insurance-en-us/?segment=rsoc.qa.answersconfidential.001&headline=Home+and+Auto+Insurance+Bundle+Savings&forceKeyA=Save+More+By+Bundling+Home+And+Auto+Insurance&forceKeyB=Best+Bundle+Insurance+Plans+2025&forceKeyC=Multi-Policy+Insurance+Discounts&forceKeyD=Compare+Home+And+Auto+Insurance+Bundle+Quotes&forceKeyE=How+To+Bundle+Home+And+Car+Insurance+For+Less"><img src="https://eraseyourbills.com/wp-content/uploads/2025/06/SE6-optimized.webp" alt="SE6" /></a>'+
            '</div>'+
            '<a href="https://answersconfidential.com/finance/ways-to-cut-your-auto-insurance-costs-in-2025-en-us/?segment=rsoc.qa.answersconfidential.001&headline=Smart+Ways+to+Lower+Auto+Insurance+in+2025&forceKeyA=Save+Money+on+Car+Insurance+This+Year&forceKeyB=Tips+to+Cut+Auto+Premiums+Fast&forceKeyC=Lower+Your+Auto+Insurance+Bill+Today&forceKeyD=Affordable+Car+Insurance+Plans&forceKeyE=Compare+Auto+Insurance+Quotes+Easily" class="related-read-more">Read more</a>'+
          '</div>'+
        '</div>'+
        '<div class="toogle-btn-wrap">'+
          '<a class="toogle-btn-text" onclick="showHide(this)">'+
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
                '<a href="#" class="toogle-btn-text" onclick="editData(this)" name="vehicle">'+
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
                '<a href="#" class="toogle-btn-text" onclick="editData(this)" value="add-more" name="driver">'+
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
                  '<p>'+formdata.owner.insurance[0]+'</p>'+
                  '<p>'+formdata.owner.insurance[1]+'</p>'+
                '</div>'+
                '<div class="item-details-action">'+
                  '<button class="edit" onclick="editData(this)" name="insurance">Change</button>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="data-item">'+
              '<div class="data-column item-title">'+
                '<p>Address</p>'+
              '</div>'+
              '<div class="data-column item-details">'+
                '<div class="item-details-content">'+
                  '<p>'+formdata.owner.address[0]+' <br> '+formdata.owner.address[1]+'<br>'+formdata.owner.address[2]+'<br>'+formdata.owner.address[3]+'<br>'+formdata.owner.address[4]+'</p>'+
                '</div>'+
                '<div class="item-details-action">'+
                  '<button class="edit" onclick="editData(this)" name="ownerAddress">Change</button>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="data-item">'+
              '<div class="data-column item-title">'+
                '<p>Home Ownership</p>'+
              '</div>'+
              '<div class="data-column item-details">'+
                '<div class="item-details-content">'+
                  '<p>'+formdata.owner.contact[0]+'</p>'+
                '</div>'+
                '<div class="item-details-action">'+
                  '<button class="edit" onclick="editData(this)" name="ownerContact">Change</button>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="data-item">'+
              '<div class="data-column item-title">'+
                '<p>Email</p>'+
              '</div>'+
              '<div class="data-column item-details">'+
                '<div class="item-details-content">'+
                  '<p>'+formdata.owner.contact[1]+'</p>'+
                '</div>'+
                '<div class="item-details-action">'+
                  '<button class="edit" onclick="editData(this)" name="email">Change</button>'+
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
                  '<p>'+formdata.owner.contact[2]+'</p>'+
                '</div>'+
                '<div class="item-details-action">'+
                  '<button class="edit" onclick="editData(this)" name="contact">Change</button>'+
                  '<hr><!-- just for showing -->'+
                '</div>'+
              '</div>'+
            '</div>'+
        '</div>'+
        '<div class="agent-wrap">'+
          '<img src="https://eraseyourbills.com/wp-content/plugins/insurance-quotes/assets/img/lady.jpg" alt="Agent">'+
          '<p>'+
            '<span>An agent will contact you shortly.</span>'+
          '</p>'+            
        '</div>'+
    '</div>';

    container.innerHTML = html;

    document.getElementById('localClearBtn').style.display = 'block';
    
    increasePercent(100); //100%

    styleLoad();

    // on reload the page and call to the checkLocalData() then check the data submitted.
    setTimeout(function()
    {
      if(localStorage.getItem('submitted')){
        document.getElementById('getMyQuote').style.display = 'none';
      }

      if(document.getElementById('getMyQuote').style.display == 'none')
      {
        // how thank you page
        document.getElementById('ThankYouMsg').style.display = 'block';
      }
    }, 0);
  }
}

// user query data edit section
function editAddVehicle(e)
{
  if(formdata.vehicles.list)
  {
    vehicleCounter = formdata.vehicles.list.length;
  }
  formdata.vehicles.current = [];
  
  brands(e);
}

// user driver query data edit section
function editAddDriver(e)
{
  if(formdata.drivers.list)
  {
    driverCounter = formdata.drivers.list.length;
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

  formdata.incidents = {
    forward : [],
    backward : []
  };
  
  addDriver(e);
}

function removeLocal(e)
{
  percent_line.style.width = '25%';
  percent_number.style.left = '25%';
  percent_number.innerHTML = '25%';
  percent_number.number = '25%';

  localStorage.removeItem('localdata');
  localStorage.removeItem('submitted');
  localStorage.removeItem('currentPage');
  formdata = {
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
    editmode: "",
    incidents:{
      backward: [],
      forward: []
    },
    owner: {
      insurance: [],
      address: [],
      contact: []
    },
    vehicles: {
      list: [],
      current: []
    },
    zipcode: ""
  };

  brand = '', year = '';

  document.getElementById('localClearBtn').style.display = 'none';

  setPageUrl('home-page');
  setCurrentPage('home-page');

  createZIPCodePanel();
}

// remove vehicle
function removeVehicle(e)
{
  if(formdata.vehicles.list.length > 1)
  {
    formdata.vehicles.list.splice(e.id, 1);
    setLocalData(formdata);
    localStorage.removeItem('submitted');

    e.parentNode.style.display = 'none';
    document.getElementById('getMyQuote').style.display = 'inline-block';
    document.getElementById('ThankYouMsg').style.display = 'none';
  }
  else
  {
    alert('Add another vehicle to remove this one.');
  }
}

// remove vehicle
function removeDriver(e)
{
  if(formdata.drivers.list.length > 1)
  {
    formdata.drivers.list.splice(e.id, 1);
    setLocalData(formdata);
    localStorage.removeItem('submitted');

    e.parentNode.style.display = 'none';
    document.getElementById('getMyQuote').style.display = 'inline-block';
    document.getElementById('ThankYouMsg').style.display = 'none';
  }
  else
  {
    alert('Add another driver to remove this one.');
  }
}

// show hide local data form
function showHide(e)
{
  let panel = e.parentNode.nextElementSibling;
  panel.classList.toggle('hide');  
}

function editData(e)
{
  document.getElementById('ThankYouMsg').style.display = 'block';
  formdata.editmode = 'Yes';

  if(e.name == 'insurance')
  {
    insurance(e);
  }
  else if(e.name == 'vehicle')
  {
    if(formdata.vehicles.list.length >= 3)
    {
      alert('We are accepting up to 3 vehicles.');
      checkLocalData();
    }
    else
    {
      editAddVehicle(e);
    }
  }
  else if(e.name == 'driver')
  {
    if(formdata.drivers.list.length >= 3)
    {
      alert('We are accepting up to 3 drivers.');
      checkLocalData();
    }
    else
    {
      editAddDriver(e);
    }
  }
  else if(e.name == 'ownerAddress')
  {
    ownerAddress(e);
  }
  else if(e.name == 'ownerContact')
  {
    ownership(e);
  }
  else if(e.name == 'email')
  {
    emailAddress(e);
  }
  else if(e.name == 'contact')
  {
    getQuote(e);
  }

  setLocalData(formdata);
}

// onload check current page
window.addEventListener('DOMContentLoaded', () => {
  const local = getLocalData();

  console.log('localdata:', local);

  if(local){
    formdata = local;
  }

  checkCurrentPage();
});