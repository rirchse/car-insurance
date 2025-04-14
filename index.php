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
    <script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB1fXk1aYT3j2QqnUVlNvKDCV1Zf4qDHHQ&libraries=places"
        async
        defer>
    </script>
    <script>
        let autocomplete;

        function initAutocomplete() {
            const input = document.getElementById('autocomplete');
            autocomplete = new google.maps.places.Autocomplete(input, {
                types: ['geocode'],
                componentRestrictions: { country: 'us' } // Change to your country if needed
            });

            // This listener will trigger when a place is selected (not on every keyup)
            autocomplete.addListener('place_changed', fillInAddress);
        }

        function fillInAddress() {
            const place = autocomplete.getPlace();

            let city = '';
            let state = '';
            let zip = '';

            if (place.address_components) {
                place.address_components.forEach(component => {
                    const types = component.types;
                    types.includes('postal_code') === true;
                    console.log(types.includes('postal_code') === true);
                    
                    if (types.includes('postal_code')) {
                        zip = component.long_name;
                    }
                    if (types.includes('administrative_area_level_1')) {
                        state = component.short_name;
                    }
                    if (types.includes('locality')) {
                        city = component.long_name;
                    }
                });

                document.getElementById('city').value = city;
                // document.getElementById('state').value = state;
                document.getElementById('zip').value = zip;

                let address_state = document.getElementById('address_state');               

                let create = document.createElement('option');
                create.innerHTML = state;
                address_state.prepend(create);

                const slim = new SlimSelect({ select: '#address_state' });
                setTimeout(() => {
                    slim.setSelected('1'); // Select the newly added top option
                }, 100);
            }
        }

        // This function just helps force place_changed on keyup (optional)
        function triggerAutocomplete() {
            // Manually trigger place_changed by simulating 'Enter' key
            const input = document.getElementById('autocomplete');
            const e = new KeyboardEvent('keydown', { keyCode: 13 });
            input.dispatchEvent(e);
        }

        window.initAutocomplete = initAutocomplete;
    </script>
</head>
<body onload="initAutocomplete()">
<?php
  // echo get_template_directory_uri(); 
?>
<!-- /dataset.json -->
    <div class="wrap">
        <header class="container">
            <img src="logo-erase-your-bill.png" alt="logo" class="logo-img">
        </header>
        <div class="container">
            <div class="progess-bar">
                <div id="percent-line" class="progess-active-line" style="width: 25%;"></div>
                <div id="percent-number" class="progress-indicator" style="left: 25%;" number="25">25%</div>
            </div>
        </div>
        <div class="container">
            <div class="form-wrap" id="container">
              <div class="step step-1 step-content-basic">
                  <h2>Enter Your Zip Code</h2>
                  <div class="inner-wrap inner-wrap-input">
                      <div class="field-wrap">
                            <div class="input-field-wrap">
                                <input type="text" id="zipcode" required>
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
                <pre id="result" style="display:block"></pre>
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
        function resetForm()
        {
            let addressForm = document.querySelector('#addressForm');addressForm.reset()
        }

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
        const jsonfile = 'merged_make_year_model.json';
      </script>
      <script src="calculation-scripts.js?v=0.170"></script>
      
      <?php } else { ?>
        <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/styles.css">
        <script>
          const zipcodefile = '<?php echo get_template_directory_uri(); ?>/jsonfile/zipcode.json';
          const jsonfile = '<?php echo get_template_directory_uri(); ?>/jsonfile/merged_make_year_model.json';
        </script>
        <script src="<?php echo get_template_directory_uri(); ?>/calculation_scripts.js"></script>
      <?php } ?>

</body>
</html>
