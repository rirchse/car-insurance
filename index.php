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
                });

                document.getElementById('city').value = city;
                // document.getElementById('state').value = state;
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
                <a href="#" onclick="removeLocal()" class="start-from-begining">
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
            </div>
        </div>

        <div class="container">
            <div class="welcome-back-wrap">
                <h5 style="color: #0070e9; text-transform: uppercase;">Welcome Back <strong>First name</strong>!</h5>
                <h2 style="text-transform: uppercase;">Your Auto Quotes Are Almost Ready For You!</h2>
                <div class="continue-btn">
                    <button class="action-btn btn continue">Continue</button>
                    <button class="action-btn btn get-my-quote">Get my Quote<span class="notifiy">1</span></button>
                </div>
                <div class="toogle-btn-wrap">
                    <a href="#" class="toogle-btn-text">
                        See your information
                        <svg class="" width="24" height="24" viewBox="0 0 24 24" fill="none" style="transform: rotate(0deg);"><path d="M7 10L12 15L17 10" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    </a>
                </div>
                <div class="saved-data-wrap">
                    <div class="data-item">
                        <div class="data-column item-title">
                            <p>Your Vehicles </p>
                        </div>
                        <div class="data-column item-details">
                            <div class="item-details-content">
                            <p>
                                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGwtb3BhY2l0eT0iLjAxIiBmaWxsPSIjRkZGIiBkPSJNMCAwaDQ4djQ4SDB6Ii8+PHBhdGggZD0iTTI0IDEzLjY2MmMxMS4yMTYgMCAyMC4zMDggNC41NDYgMjAuMzA4IDEwLjE1MyAwIDUuNjA4LTkuMDkyIDEwLjE1NC0yMC4zMDggMTAuMTU0UzMuNjkyIDI5LjQyMyAzLjY5MiAyMy44MTVjMC01LjYwNyA5LjA5Mi0xMC4xNTMgMjAuMzA4LTEwLjE1M3ptMCAxLjI4Yy05Ljg4NiAwLTE3LjkyOSAzLjk4LTE3LjkyOSA4Ljg3MyAwIDQuODk0IDguMDQzIDguODc1IDE3LjkyOSA4Ljg3NXMxNy45MjgtMy45ODEgMTcuOTI4LTguODc1YzAtNC44OTMtOC4wNDItOC44NzQtMTcuOTI4LTguODc0em0xLjIxNSAzLjY5OGEuMjIuMjIgMCAwIDEgLjIyLjIxOHY5Ljg5YS4yMTYuMjE2IDAgMCAxLS4yMi4yMTdoLTIuNDRhLjIxNS4yMTUgMCAwIDEtLjIxOC0uMjE3di05LjI4M2EuMjAyLjIwMiAwIDAgMC0uMjA0LS4yMDNoLS4zMjhjLS4wMzEgMC0uMDMxLS4wMy0uMDMxLS4wNTN2LS41MTZjMC0uMDI0IDAtLjA1My4wMzEtLjA1M3ptOC41NTQgMGMuMTA3IDAgLjIzNy4wMTUuMjkuMTQ0bDMuMzMyIDkuOTE1YS4yMjcuMjI3IDAgMCAxLS4wMzYuMTkuMTg4LjE4OCAwIDAgMS0uMTU4LjA3NmgtMi4zOTRjLS4xMTggMC0uMjQtLjA5LS4yODktLjIxNWwtMi4wNjUtNi40MDdzLS4wMjUtLjA5LS4wOTgtLjA5Yy0uMDc2IDAtLjEuMDg5LS4xLjA5bC0yLjA0MyA2LjQwN2MtLjA0OC4xMjMtLjE3MS4yMTUtLjI4Ny4yMTVoLTIuMzk1YS4xOTMuMTkzIDAgMCAxLS4xNTgtLjA3Ni4yMi4yMiAwIDAgMS0uMDM3LS4xOWwzLjA3NS05LjE0MmEuMzQ3LjM0NyAwIDAgMCAuMDI0LS4xMTdjMC0uMTA3LS4wODItLjE3OC0uMjA0LS4xNzhoLS4yODFjLS4wMjcgMC0uMDU1LS4wMjctLjA1NS0uMDUzdi0uNTE2YzAtLjAyOC4wMjctLjA1NC4wNTUtLjA1NHptLTE5Ljc0NiAwYy4xMiAwIC4yMTcuMDk4LjIxNy4yMTh2My4yOTZjMCAuMDY2LjA0My4xMS4xMDguMTEuMDE2IDAgLjA4Ny0uMDA2LjE2LS4xMTNsMi4zMjMtMy4yNzVjLjA5Mi0uMTM1LjI1Ny0uMjM2LjM4My0uMjM2aDIuNjc0Yy4wNyAwIC4xMzUuMDQuMTcyLjEwNWEuMjA2LjIwNiAwIDAgMSAwIC4yMDlsLTIuOTgxIDQuMzk3YS4zMjcuMzI3IDAgMCAwLS4wNDYuMTM1YzAgLjAxNC4wMDQuMDIzLjAwNi4wMzQuMDAzLjAxNC4wMS4wMy4wMTguMDQ0LjAwNy4wMTEuMDExLjAyMS4wMjIuMDM3bDMuNTY2IDUuMDI1Yy4wNTQuMDc2LjA2My4xNTYuMDI2LjIyNmEuMjExLjIxMSAwIDAgMS0uMTczLjExM2gtMi44MTZjLS4xMjcgMC0uMjktLjEwMS0uMzgtLjIzN2wtMi43OTQtMy45MDUtLjAxLS4wMTRjLS4wMy0uMDQ0LS4wNjgtLjA5OS0uMTUtLjA5OS0uMDY5IDAtLjEwOC4wNDktLjEwOC4xMzR2My45MDRjMCAuMTItLjA5OC4yMTctLjIxNy4yMTdIMTEuNjVhLjIxNC4yMTQgMCAwIDEtLjIxNy0uMjE3di05LjI4M2EuMjAyLjIwMiAwIDAgMC0uMjA1LS4yMDNIMTAuOWMtLjAyNyAwLS4wNTQtLjAyNi0uMDU0LS4wNTN2LS41MTZjMC0uMDI4LjAyNi0uMDUzLjA1NC0uMDUzeiIgZmlsbD0iIzAwMCIvPjwvZz48L3N2Zz4=" alt="">
                                <span>KIA BORREGO</span>
                            </p>
                            </div>
                            <div class="item-details-action">
                                <button class="edit">Edit</button>
                            </div>
                        </div>
                    </div>
                    <div class="data-item">
                        <div class="data-column item-title">
                            <p>Listed Drivers</p>
                        </div>
                        <div class="data-column item-details">
                            <div class="item-details-content">
                            <p>
                            <svg class="" width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><rect fill="#FFF" width="48" height="48" rx="24"></rect><g transform="translate(16 12)" stroke="#000" stroke-width="2"><circle cx="8.471" cy="5.647" r="5.647"></circle><path d="M16.941 24A8.47 8.47 0 0 0 0 24"></path></g></g></svg>
                                <span>First name</span>
                                <span>Last name</span>
                            </p>
                            </div>
                            <div class="item-details-action">
                                <button class="edit">Edit</button>
                            </div>
                        </div>
                    </div>
                    <div class="data-item">
                        <div class="data-column item-title">
                            <p>Insured</p>
                        </div>
                        <div class="data-column item-details">
                            <div class="item-details-content">
                                <p>No</p>
                            </div>
                            <div class="item-details-action">
                                <button class="edit">Edit</button>
                            </div>
                        </div>
                    </div>
                    <div class="data-item">
                        <div class="data-column item-title">
                            <p>Address</p>
                        </div>
                        <div class="data-column item-details">
                            <div class="item-details-content">
                                <p>Address <br> Zip<br>City<br>State</p>
                            </div>
                            <div class="item-details-action">
                                <button class="edit">Edit</button>
                            </div>
                        </div>
                    </div>
                    <div class="data-item">
                        <div class="data-column item-title">
                            <p>Home Ownership</p>
                        </div>
                        <div class="data-column item-details">
                            <div class="item-details-content">
                                <p>Own</p>
                                <hr style="margin: 20px 0;"><!-- just for showing -->
                                <select name="year" id="dui_year" class="select-box-dui-year" onchange="checkErr(this)">
                                    <option data-placeholder="true"></option>
                                    <option value="Option 1">Option 1</option>
                                    <option value="Option 2">Option 2</option>
                                    <option value="Option 3">Option 3</option>
                                    <option value="Option 4">Option 4</option>
                                </select>
                            </div>
                            <div class="item-details-action">
                                <button class="edit">Edit</button>
                            </div>
                        </div>
                    </div>
                    <div class="data-item">
                        <div class="data-column item-title">
                            <p>Email</p>
                        </div>
                        <div class="data-column item-details">
                            <div class="item-details-content">
                                <p>fsda@lfdsa.com</p>
                                <hr style="margin: 20px 0;"><!-- just for showing -->
                                <div class="input-field-wrap">
                                    <input type="email" placeholder="Email" value="fsda@lfdsa.com" required>
                                    <label for="">Email Address</label>
                                </div>
                            </div>
                            <div class="item-details-action">
                                <button class="edit">Edit</button>
                                <hr><!-- just for showing -->
                                <button class="edit">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="agent-wrap">
                    <img src="https://coverageprofessor.com/images/forms/lady.png" alt="Agent">
                    <p>
                        <span>Call an expert</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="agent-checkbox"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm90.7 96.7c9.7-2.6 19.9 2.3 23.7 11.6l20 48c3.4 8.2 1 17.6-5.8 23.2L168 231.7c16.6 35.2 45.1 63.7 80.3 80.3l20.2-24.7c5.6-6.8 15-9.2 23.2-5.8l48 20c9.3 3.9 14.2 14 11.6 23.7l-12 44C336.9 378 329 384 320 384C196.3 384 96 283.7 96 160c0-9 6-16.9 14.7-19.3l44-12z"/></svg>
                        <a href="tel:(844) 857-9195">(844) 857-9195</a>
                    </p>
                    
                </div>
            </div>
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
      <link rel="stylesheet" href="styles.css?v=0.111">
      <script>
        const zipcodefile = 'zipcode.json?v=1.10';
        const jsonfile = 'merged_make_year_model.json';
        const imgfile = 'img.json';
        const statefile = 'states.min.json';

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
      <script src="calculation-scripts.js?v=0.210"></script>
      
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
