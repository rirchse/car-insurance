<?php 
/**
 *  Template Name: The CAR Form 
 */ 
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Multistep form</title>
    <style>
        .logo-img {
            max-width: 200px;
        }
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        .container{
            max-width: 1200px;
            margin: 0 auto;
        }
        .inner-wrap {
            margin-top: 25px;
        }
        .inner-wrap-btn {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            margin-top: 25px;
            gap: 15px;
        }
        .inner-wrap-btn button {
            flex: 0 0 20%;
            max-width: calc(20% - 15px);
            text-align: center;
            padding: 10px;
            font-size: 18px;
            width: 100%;
        }
        button{
            cursor: pointer;
        }
        .step {
            text-align: center;
            margin: 30px 0;
        }
        .progess-bar {
            background: #ddd;
            position: relative;
            height: 2px;
            width: 100%;
            margin: 25px 0 50px;
        }
        .progress-indicator {
            position: absolute;
            left: 25%;
            top: 50%;
            transform: translateY(-50%);
            background: #fff;
            box-shadow: 0 6px 25px 0px rgb(154 159 165);
            padding: 10px 15px;
            border-radius: 25px;
            color: #3d99fe;
        }
        .progess-active-line {
            position: absolute;
            left: 0;
            top: 0;
            height: 2px;
            background: #3d9afe;
            width: 25%;
        }
        span.error-msg {
            color: red;
            margin: 5px 0 0;
            display: block;
        }
        input {
            display: block;
            width: 100%;
            margin: 0;
            padding: 10px;
        }
        .btn{ padding:15px;font-size:22px; margin:10px}
        .btn-block{width: 100%; margin:0}
    </style>
</head>
<body>
<?php
  echo get_template_directory_uri(); 
?>
/dataset.json


    <div class="wrap">
        <header class="container">
            <img src="https://darkslateblue-mouse-951357.hostingersite.com/wp-content/uploads/2025/03/Main-Logo-EYB-SVG.png" alt="logo" class="logo-img">
        </header>
        <div class="progess-bar">
            <div id="percent-line" class="progess-active-line" style="width: 25%;"></div>
            <div id="percent-number" class="progress-indicator" style="left: 25%;" number="25">25%</div>
        </div>
        <div class="container" id="container">
            <div class="form-wrap">
                <form action="#">
                    <div class="step step-1">
                        <h2>Zip</h2>
                        <div class="inner-wrap inner-wrap-input">
                            <div class="field-wrap">
                                <input type="text" id="zipcode" placeholder="Zip Code">
                                <span class="error-msg" id="result"></span>
                            </div>
                            <div class="field-wrap">
                              <button class="btn btn-block" onclick="ZIPCode()">Get Started Now</button>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="step step-2">
                        <h2>Vehicle Year</h2>
                        <div class="inner-wrap inner-wrap-btn">
                            <button>2025</button>
                            <button>2025</button>
                            <button>2025</button>
                            <button>2025</button>
                            <button>2025</button>
                            <button>2025</button>
                            <button>2025</button>
                            <button>2025</button>
                            <button>2025</button>
                            <button>2025</button>
                            <button>2025</button>
                        </div>
                    </div> -->
                </form>
            </div>
        </div>
    </div>
    
    <script>
      const zipcodefile = '<?php echo get_template_directory_uri();?>/jsonfile/zipcode.json';
      // const zipcodefile = 'zipcode.json';
      const jsonfile = '<?php echo get_template_directory_uri();?>/jsonfile/full_ymm_dataset_1990_2025.json';
      // const jsonfile = 'full_ymm_dataset_1990_2025.json';

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
  </script>
  
</body>
</html>
