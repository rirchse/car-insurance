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
    <meta name="csrf-token" content="">
    <meta http-equiv="Cache-Control" content="no-store" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />

    <title>Get Your Free Insurance Quote Now | Erase Your Bills</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
    <link href="https://unpkg.com/slim-select@latest/dist/slimselect.css" rel="stylesheet">
    <script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCBWy_-MFB31rLeyEJzApqSZhEjmuEHrtg&libraries=places"
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

            let country = '';
            let city = '';
            let state = '';
            let stateKey = '';
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
                        state = component.long_name;
                        stateKey = component.short_name;
                    }
                    if (types.includes('locality')) {
                        city = component.long_name;
                    }
                    if (types.includes('country')) {
                        country = component.long_name;
                    }
                });

                document.getElementById('city').value = city;
                document.getElementById('country').value = country;
                document.getElementById('zip').value = zip;

                let address_state = document.getElementById('address_state');

                let create = document.createElement('option');
                create.value = stateKey;
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

        // function checkWord(event, e)
        // {
        //     if(event.key === " " || event.keyCode === 32){
        //         const text = e.value.trim();
        //         const words = text === ''? 0 : text.split(/\s+/).length;
        //         console.log(words);
        //         if(words){
        //             initAutocomplete();
        //         }
        //     }
        // }
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
        <div class="container" id="localClearBtn" style="display:none">
            <div class="start-scratch-wrap">
                <a href="#" onclick="removeLocal(this);" class="start-from-begining">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-small">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" clip-rule="evenodd" />
                    </svg>
                    Clear Everything and Start Over
                </a>
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
                <!--<div class="agent-wrap">
                 <img src="https://coverageprofessor.com/images/forms/lady.png" alt="Agent">
                <p>
                    <span>Call an expert &nbsp; </span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="agent-checkbox"><path fill-rule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clip-rule="evenodd" /> </svg>
                    <a href="tel:(888) 745-8398">(888) 745-8398</a>
                </p> -->
                </div>

                <div id="loading" style="position:fixed; top:0; left:0; text-align:center; width:100%;height:100%;background:#fff">
                    <img style="margin-top:20%" src="loading-waiting.gif" alt="" width=50>
                </div>

            </div>
        </div>

        <div class="footer-bar"></div>
        <footer class="container footer-wrap">
            <p>
                <a href="#">Terms and Conditions</a>
                <a href="#">Privacy Policy</a>
            </p>
        </footer>
    </div>

    <!-- <script src="https://unpkg.com/slim-select@latest/dist/slimselect.min.js"></script> -->
    <script src="https://unpkg.com/slim-select@latest/dist/slimselect.min.js"></script>
    <script>
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';            
        }, 500);

        let localClearBtn = document.getElementById('localClearBtn');
        if(localStorage.getItem('localdata')){
            localClearBtn.style.display = 'block';
        }
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
    
      <?php if($_SERVER["HTTP_HOST"] == 'localhost:8888' || $_SERVER["HTTP_HOST"] == 'localhost' || $_SERVER["HTTP_HOST"] == 'onenazmul.dev'){ ?>
      <link rel="stylesheet" href="styles.css?v=0.114">
      <script>
        const zipcodefile = 'zipcode.json?v=1.120';
        const jsonfile = 'merged_make_year_model.json?v=0.122';
        const imgfile = 'img.json?v=0.121';
        const statefile = 'states.min.json';

        // let zipcodes = [];
        // document.addEventListener('DOMContentLoaded', () => {
        //     fetch(zipcodefile)
        //     .then(response => response.json())
        //     .then(data => {
        //         zipcodes = data;
        //     })
        //     .catch(error => console.error('Error Loading JSON:', error));
        // });

        let imgdata = [];
        document.addEventListener('DOMContentLoaded', () => {
            fetch(imgfile)
            .then(response => response.json())
            .then(data => {
                imgdata = data;
            })
            .catch(error => console.error('Error Loading JSON:', error));
        });
        
        let statedata = [];
        document.addEventListener('DOMContentLoaded', () => {
            fetch(statefile)
            .then(response => response.json())
            .then(data => {
                statedata = data;
            })
            .catch(error => console.error('Error Loading JSON:', error));
        });
        
      </script>
      <script src="calculation-scripts.js?v=1.227"></script>
      
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
