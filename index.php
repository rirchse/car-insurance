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
    <title>Get Your Free Insurance Quote Now | Erase Your Bills</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
    <link href="https://unpkg.com/slim-select@latest/dist/slimselect.css" rel="stylesheet">
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
        <div class="container">
            <div class="form-wrap" id="container">
              <div class="step step-1 step-content-basic">
                  <h2>Enter Your Zip Code</h2>
                  <div class="inner-wrap inner-wrap-input">
                      <div class="field-wrap">
                            <div class="input-field-wrap">
                                <input type="text" id="zipcode">
                                <label for="">Zip code</label>
                            </div>
                            <span class="error-msg" id="result"></span>
                      </div>
                      <div class="field-wrap">
                        <button class="action-btn btn" onclick="ZIPCode()">Get Started</button>
                      </div>
                  </div>
              </div>
            </div>
        </div>

        <div class="container">
            <h4>
                <pre id="result" style="display:none"></pre>
            </h4>
        </div>
        <div class="footer-bar"></div>
        <footer class="container footer-wrap">
            <p>
                <a href="/terms">Terms and Conditions</a>
                <a href="/privacy">Privacy Policy</a>
            </p>
        </footer>
    </div>

    <!-- <script src="https://unpkg.com/slim-select@latest/dist/slimselect.min.js"></script> -->
    <script src="https://unpkg.com/slim-select@latest/dist/slimselect.min.js"></script>
    <script>

        function styleLoad()
        {
            let insurance_carrier = new SlimSelect({
                select: '#insurance_carrier',
                settings: {
                    placeholderText: 'Continuous Coverage',
                    showSearch: false, 
                    focusSearch: false, 
                }
            });
            
            let insurance_coverage = new SlimSelect({
                select: '#insurance_coverage',
                settings: {
                    placeholderText: 'Continuous Coverage',
                    showSearch: false, 
                    focusSearch: false, 
                }
            });

            let accident_month = new SlimSelect({
                select: '#accident_month',
                settings: {
                    placeholderText: 'Month',
                    showSearch: false, 
                    focusSearch: false, 
                }
            });

            let accident_year = new SlimSelect({
                select: '#accident_year',
                settings: {
                    placeholderText: 'Year',
                    showSearch: false, 
                    focusSearch: false, 
                }
            });

            let accident_desc = new SlimSelect({
                select: '#accident_desc',
                settings: {
                    placeholderText: 'Accident Description',
                    showSearch: false, 
                    focusSearch: false, 
                }
            });
            let accident_fault = new SlimSelect({
                select: '#accident_fault',
                settings: {
                    placeholderText: 'At Fault?',
                    showSearch: false, 
                    focusSearch: false, 
                }
            });
            let accident_damage = new SlimSelect({
                select: '#accident_damage',
                settings: {
                    placeholderText: 'Damaged',
                    showSearch: false, 
                    focusSearch: false, 
                }
            });
            let ticket_month = new SlimSelect({
                select: '#ticket_month',
                settings: {
                    placeholderText: 'Month',
                    showSearch: false, 
                    focusSearch: false, 
                }
            });
            let ticket_year = new SlimSelect({
                select: '#ticket_year',
                settings: {
                    placeholderText: 'Year',
                    showSearch: false, 
                    focusSearch: false, 
                }
            });
            let ticket_desc = new SlimSelect({
                select: '#ticket_desc',
                settings: {
                    placeholderText: 'Ticket Description',
                    showSearch: false, 
                    focusSearch: false, 
                }
            });
            let dui_month = new SlimSelect({
                select: '#dui_month',
                settings: {
                    placeholderText: 'Month',
                    showSearch: false, 
                    focusSearch: false, 
                }
            });
            let dui_year = new SlimSelect({
                select: '#dui_year',
                settings: {
                    placeholderText: 'Year',
                    showSearch: false, 
                    focusSearch: false, 
                }
            });
            let dui_state = new SlimSelect({
                select: '#dui_state',
                settings: {
                    placeholderText: 'State',
                    showSearch: false, 
                    focusSearch: false, 
                }
            });
            let address_state = new SlimSelect({
                select: '#address_state',
                settings: {
                    placeholderText: 'State',
                    showSearch: false, 
                    focusSearch: false, 
                }
            });
        }

        styleLoad();
            
    </script>

    <!-- <?php echo $_SERVER["HTTP_HOST"]; ?> -->
    
      <?php if($_SERVER["HTTP_HOST"] == 'localhost' || $_SERVER["HTTP_HOST"] == 'onenazmul.dev'){ ?>
      <link rel="stylesheet" href="styles.css">
      <script>
        const zipcodefile = 'zipcode.json?v=1.10';
        const jsonfile = 'full_ymm_dataset_1990_2025.json';
      </script>
      <script src="calculation-scripts.js?v=0.120"></script>
      
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
