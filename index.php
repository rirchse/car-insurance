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
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
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
            </div>
        </div>
    </div>

    <?php echo $_SERVER["HTTP_HOST"]; ?>
    
      <?php if($_SERVER["HTTP_HOST"] == 'localhost'){ ?>
      <link rel="stylesheet" href="styles.css">
      <script>
        const zipcodefile = 'zipcode.json';
        const jsonfile = 'full_ymm_dataset_1990_2025.json';
      </script>
      <script src="calculation-scripts.js"></script>
      
      <?php } else { ?>
        <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/styles.css">
        <script>
          const zipcodefile = '<?php echo get_template_directory_uri(); ?>/jsonfile/zipcode.json';
          const jsonfile = '<?php echo get_template_directory_uri(); ?>/jsonfile/full_ymm_dataset_1990_2025.json';
        </script>
        <script src="<?php echo get_template_directory_uri(); ?>/calculation_scripts.js"></script>
      <?php } ?>
  
</body>
</html>
