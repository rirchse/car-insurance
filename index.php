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
  // echo get_template_directory_uri(); 
?>
<!-- /dataset.json -->


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
                </form>
            </div>
        </div>
    </div>

    <?php echo $_SERVER["HTTP_HOST"]; ?>
    
      <?php if($_SERVER["HTTP_HOST"] == 'localhost'){ ?>
      <script>
        const zipcodefile = 'zipcode.json';
        const jsonfile = 'full_ymm_dataset_1990_2025.json';
      </script>
      <script src="calculation-scripts.js"></script>
      
      <?php } else { ?>
        <script>
          const zipcodefile = '<?php echo get_template_directory_uri(); ?>/jsonfile/zipcode.json';
          const jsonfile = '<?php echo get_template_directory_uri(); ?>/jsonfile/full_ymm_dataset_1990_2025.json';
        </script>
        <script src="<?php echo get_template_directory_uri(); ?>/'calculation_scripts.js'"></script>
      <?php } ?>
  
</body>
</html>
