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
    <!-- <title><?php //the_title(); ?> | <?php //bloginfo( 'name' ); ?></title> -->
    <title>Get Your Free Insurance Quote Now | Erase Your Bills</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
    <link href="https://unpkg.com/slim-select@latest/dist/slimselect.css" rel="stylesheet">
    <!-- wp 
    <link rel="stylesheet" href="<?php //echo plugin_dir_url(__FILE__) . 'assets/css/styles.css?v=1.0.3'; ?>">
    -->
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
        function fillInAddress(e) {
            const place = autocomplete.getPlace();
            let city = '', state = '', stateKey = '', zip = '', country = '';
            if (place.address_components) {
                place.address_components.forEach(component => {
                    const types = component.types;
                    types.includes('postal_code') === true;
                    
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
                document.getElementById('zip').value = zip;
                document.getElementById('city').value = city;
                document.getElementById('country').value = country;
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
            // remove country, state, city from address
            let addressId = document.getElementById('autocomplete');
            let longAddress = addressId.value;
            let streetAddr = longAddress.split(',')[0].trim();
            addressId.value = streetAddr;
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
    <script type="text/javascript">
		(function(c,l,a,r,i,t,y){
			c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
			t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
			y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
		})(window, document, "clarity", "script", "rike4nvy5u");
	</script>
	<!-- Google tag (gtag.js) -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-VGVYWDXZ1Q"></script>
	<script>
	  window.dataLayer = window.dataLayer || [];
	  function gtag(){dataLayer.push(arguments);}
	  gtag('js', new Date());

	  gtag('config', 'G-VGVYWDXZ1Q');
	</script>
	<script>
		!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init bs ws ge fs capture De calculateEventProperties $s register register_once register_for_session unregister unregister_for_session Is getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty xs Ss createPersonProfile Es gs opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing ys debug ks getPageViewId captureTraceFeedback captureTraceMetric".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
		posthog.init('phc_KghddFOt9EPidIvWD34tHvUm5W423Zaauou0P8acuE3', {
			api_host: 'https://us.i.posthog.com',
			person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
		})
	</script>
    <!-- Meta Pixel Code -->
    <script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '1504078287700108');
    fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=1504078287700108&ev=PageView&noscript=1"
    /></noscript>
    <!-- End Meta Pixel Code -->
    <!-- TikTok Pixel Code Start -->
    <script>
    !function (w, d, t) {
    w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
    var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
    ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};


    ttq.load('D12NCNBC77U8DLIL5MT0');
    ttq.page();
    }(window, document, 'ttq');
    </script>
    <!-- TikTok Pixel Code End -->
    <meta http-equiv="delegate-ch" content="sec-ch-ua https://clarlysindited.com; sec-ch-ua-mobile https://clarlysindited.com; sec-ch-ua-arch https://clarlysindited.com; sec-ch-ua-model https://clarlysindited.com; sec-ch-ua-platform https://clarlysindited.com; sec-ch-ua-platform-version https://clarlysindited.com; sec-ch-ua-bitness https://clarlysindited.com; sec-ch-ua-full-version-list https://clarlysindited.com; sec-ch-ua-full-version https://clarlysindited.com">
    <style>.dtpcnt{opacity: 0;}</style>
    <script>
        (function(c,d,f,h,t,b,n,u,k,l,m,e,p,v,q){function r(a){var c=d.cookie.match(new RegExp("(^| )"+a+"=([^;]+)"));return c?c.pop():f.getItem(a+"-expires")&&+f.getItem(a+"-expires")>(new Date).getTime()?f.getItem(a):null}q="https:"===c.location.protocol?"secure; ":"";c[b]||(c[b]=function(a){c[b].state.callbackQueue.push(a)},c[b].state={callbackQueue:[]},c[b].registerConversion=function(a){c[b].state.callbackQueue.push(a)},function(){(m=/[?&]cpid(=([^&#]*)|&|#|$)/.exec(c.location.href))&&m[2]&&(e=m[2],
    p=r("vl-"+e));var a=r("vl-cid"),b;"savedCid"!==u||!a||e&&"undefined"!==typeof e||(b=a);k=d.createElement("script");l=d.scripts[0];k.src=n+(-1===n.indexOf("?")?"?":"&")+"oref="+h(d.referrer)+"&ourl="+h(location[t])+"&opt="+h(d.title)+"&vtm="+(new Date).getTime()+(b?"&cid="+b:"")+(p?"&uw=no":"");l.parentNode.insertBefore(k,l);if(e){a="vl-"+e;b=q;var g=new Date;g.setTime(g.getTime()+864E5);d.cookie=a+"=1; "+b+"samesite=Strict; expires="+g.toGMTString()+"; path=/";f.setItem(a,"1");f.setItem(a+"-expires",
    g.getTime())}}())})(window,document,localStorage,encodeURIComponent,"href","dtpCallback","https://clarlysindited.com/d/.js","savedCid");
    </script>
    <noscript><link href="https://clarlysindited.com/d/.js?noscript=true&ourl=" rel="stylesheet"/></noscript>
</head>
<body onload="initAutocomplete()">
    <div class="wrap">
        <header class="container">
            <img src="https://eraseyourbills.com/wp-content/plugins/insurance-quotes/assets/img/logo-erase-your-bill.png" alt="logo" class="logo-img">
        </header>
        <div class="container">
            <div class="progess-bar">
                <div id="percent-line" class="progess-active-line" style="width: 25%;"></div>
                <div id="percent-number" class="progress-indicator" style="left: 25%;" number="25">25%</div>
            </div>
        </div>
        <div class="container" id="localClearBtn" style="display:none">
            <div class="start-scratch-wrap">
                <a onclick="removeLocal(this);" class="start-from-begining">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-small">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" clip-rule="evenodd" />
                    </svg>
                    Clear Everything and Start Over
                </a>
            </div>
        </div>
        <div class="container">
            <div class="form-wrap" id="container">
              <form action="#" name="zipForm" onsubmit="event.preventDefault()" >
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
                              <button class="action-btn btn" onclick="ZIPCode(this)">Get Started</button>
                          </div>
                      </div>
                  </div>
                    <p class="secure-banner">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 448 512"><path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z"/></svg>
                        We keep all your information 100% secure & confidential, always.
                    </p>
                </div>
              </form>
        </div>
        <div id="loading" class="loading">
          <img style="margin-top:20%" src="https://eraseyourbills.com/wp-content/plugins/insurance-quotes/assets/img/loading-waiting.gif" alt="" width=50>
        </div>
        <div id="loading2" class="loading" style="display:none">
          <img style="margin-top:20%" src="https://eraseyourbills.com/wp-content/plugins/insurance-quotes/assets/img/loading.gif" alt="" width=250>
        </div>
        <div class="hero-wrap">
            <img src="https://eraseyourbills.com/wp-content/uploads/2025/05/auto-page-banner-v2.png" alt="Hero">
        </div>
        <div class="common-agents-wrap" style="display: none">
            <div class="container">
                <div class="agent-wrap">
                    <img src="https://eraseyourbills.com/wp-content/plugins/insurance-quotes/assets/img/lady.jpg" alt="Agent">
                    <p>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512">
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                        </svg>
                        <span>Tell us what car you drive and we’ll look for the best rates</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="features-wrap">
        <div class="container">
            <h2>How To Start Saving On Your Car Insurance?</h2>
            <div class="feature-box-wrap">
                <div class="feature-box">
                    <div class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"><path fill="#163300" fill-rule="evenodd" d="M6.169 6.331a3 3 0 0 0-.833 1.6l-.338 1.912a1 1 0 0 0 1.159 1.159l1.912-.338a3 3 0 0 0 1.6-.833l3.07-3.07l2-2A.9.9 0 0 0 15 4.13A3.13 3.13 0 0 0 11.87 1a.9.9 0 0 0-.632.262l-2 2zm3.936-1.814L7.229 7.392a1.5 1.5 0 0 0-.416.8L6.6 9.4l1.208-.213l.057-.01a1.5 1.5 0 0 0 .743-.406l2.875-2.876a1.63 1.63 0 0 0-1.378-1.378m2.558.199a3.14 3.14 0 0 0-1.379-1.38l.82-.82a1.63 1.63 0 0 1 1.38 1.38zM8 2.25a.75.75 0 0 0-.75-.75H4.5a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h7a3 3 0 0 0 3-3V8.75a.75.75 0 0 0-1.5 0v2.75a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 11.5v-7A1.5 1.5 0 0 1 4.5 3h2.75A.75.75 0 0 0 8 2.25" clip-rule="evenodd"></path></svg>
                    </div>
                    <h3>Just a Few Basics</h3>
                    <p>Share a few simple details about you and your vehicle to help us tailor the best results to your needs.</p>
                </div>
                <div class="feature-box">
                    <div class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"><path fill="#163300" fill-rule="evenodd" d="m11.1 5.894l-.412.903l.671.732l1.356 1.48l-1.994-.227l-.986-.113l-.49.864l-.987 1.747l-.4-1.967l-.198-.972l-.973-.198l-1.966-.4l1.746-.989l.864-.489l-.112-.986l-.227-1.994L8.47 4.641l.732.67l.903-.411l1.826-.832zM7.02 1.276l2.465 2.26l3.043-1.387c.842-.384 1.708.483 1.325 1.324l-1.387 3.043l2.259 2.465c.625.682.069 1.774-.85 1.67l-3.323-.38l-1.646 2.911c-.456.805-1.666.613-1.85-.293l-.667-3.277l-3.277-.666c-.906-.185-1.098-1.395-.293-1.85l2.91-1.647l-.378-3.322c-.105-.92.987-1.476 1.669-.85M5.53 11.53a.75.75 0 1 0-1.06-1.06l-3.5 3.5a.75.75 0 1 0 1.06 1.06z" clip-rule="evenodd"></path></svg>
                    </div>
                    <h3>A Touch of Smart Tech</h3>
                    <p>Our intelligent matching system reviews thousands of insurance options and shows you only the most relevant and valid choices for your need.</p>
                </div>
                <div class="feature-box">
                    <div class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><path fill="#163300" d="M7.954 1.372a1 1 0 0 1 1.414-.15l3.262 2.664a1 1 0 0 1 .25 1.245A3 3 0 0 0 12 5h-.3l.298-.34l-1.718-1.403l-1.417 1.744H7.574l1.931-2.376l-.77-.629L6.337 5h-1.28zM10.5 10a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zM3 5.5a.5.5 0 0 1 .5-.5h.558l.795-1H3.5A1.5 1.5 0 0 0 2 5.5v6A2.5 2.5 0 0 0 4.5 14H12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H3.5a.5.5 0 0 1-.5-.5m0 6V6.915q.236.084.5.085H12a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H4.5A1.5 1.5 0 0 1 3 11.5"></path></svg>
                    </div>
                    <h3>Big Savings, Your Way</h3>
                    <p>Pick the policy that fits you best from a personalized list of options tailored to your needs.</p>
                </div>
            </div>
        </div>
    </div>
    <div class="how-it-works-wrap">
        <div class="container">
            <div class="how-inner">
                <div class="how-text">
                    <h2>How Does EraseYourBills.com Work?</h2>
                    <p>We use the information you provide about yourself and your vehicle to instantly compare options from a live database connected to dozens of top insurance providers. This allows us to deliver a personalized list of policies tailored specifically to your situation—only from carriers who are ready to insure you.</p>
                    <p>Why are personalized results so important? <br>Because too often, people waste hours filling out forms only to be rejected or shown irrelevant policies. With EraseYourBills.com, you get matched with real, relevant options all in one place—saving you time and frustration.</p>
                    <p>Best of all, our service is completely free, and there's never any obligation to purchase a policy.</p>
                    <hr>
                    <h4>Compare Between Top Carriers And Start Saving:</h4>
                    <form action="#" name="zipForm" onsubmit="event.preventDefault()" id="footerZipForm">
                      <div class="quick-get-start-wrap">
                          <div class="field-wrap">
                              <div class="input-field-wrap">
                                  <input type="text" id="zipcode" name="zipcode" required>
                                  <label for="">Zip code</label>
                              </div>
                              <span class="error-msg" id="result" name="result"></span>
                          </div>
                          <div class="field-wrap">
                              <button class="action-btn btn" onclick="ZIPCode(this)">Get Started</button>
                              <input type="hidden" name="reset">
                          </div>
                      </div>
                    </form>
                </div>
                <div class="how-image">
                    <img src="https://eraseyourbills.com/wp-content/uploads/2025/05/screenshot.png" alt="Phone">
                </div>
            </div>
        </div>
    </div>
    <div class="footer-wrap">
        <div class="footer-bar"></div>
        <footer class="container footer-wrap">
            <p>
                <a href="https://eraseyourbills.com/terms-of-use/" target="_blank">Terms and Conditions</a>
                <a href="https://eraseyourbills.com/privacy-policy/" target="_blank">Privacy Policy</a>
                <a href="https://eraseyourbills.com/advertising-disclosure/" target="_blank">Advertising Disclosure</a>
                <a href="https://eraseyourbills.com/ccpa/" target="_blank">CCPA</a>
                <a href="https://eraseyourbills.com/sms/" target="_blank">SMS Terms</a>
            </p>
            <br>
            <p style="font-weight: 300;">Disclaimer The operator of this website is not an insurance broker or an insurance company is not a representative or an agent to any broker or insurance company does not endorse any particular broker or insurance provider and does not make any insurance decisions. We will submit the information you provide to a broker and or an insurance company. This website does not constitute an offer or solicitation for automobile or other insurance. Providing your information on this site does not guarantee that you will be approved for automobile or other insurance. Not all insurance providers can or will insure your vehicle. The quotes rates or savings advertised by on this website are not necessarily available from all providers or advertisers. Your actual quotes rates or savings will vary based on many different factors like: Coverage Limits, Deductibles, Driving History, Education, Occupation Type, Vehicle Location and more. For questions regarding your insurance policy please contact your broker or insurance company directly. Residents of some states may not be eligible for insurance or may be subject to large premiums. You are under no obligation to use our website or service to initiate contact nor apply for insurance or any product with any broker or insurance compan. We receive compensation in the form of referral fees from the insurance carriers aggregators or other offers that we direct you to. Therefore the amount of compensation provided along with other factors may impact which policy or offer you are presented. The offer you receive may be coming from the company that bid the most for your information. This website does not always provide you with an offer with the best rates or terms. Our website does not include all companies or all available offers. We encourage you to research all available insurance policy options relative to your situation. All trademarks and copyrights are the property of their respective owners.</p>
            <br><p style="font-weight: 300;">This website is operated by "ADDRESS HERE"</p>
        </footer>
    </div>
    <!-- uniq token generated form -->
    <form>
      <input id="leadid_token" name="universal_leadid" type="hidden" value=""/>
    </form>
    <!-- script for slim select form butify library -->
    <script src="https://unpkg.com/slim-select@latest/dist/slimselect.min.js"></script>

    <script>
      let trustFormCert;
      let v_click_id;

        // setTimeout(() => {
        //     document.getElementById('loading').style.display = 'none';
        // }, 500);

        let localClearBtn = document.getElementById('localClearBtn');
        if(localStorage.getItem('localdata')){
            localClearBtn.style.display = 'block';
        }

        function resetForm()
        {
            let addressForm = document.querySelector('#addressForm');
            addressForm.reset();
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

    <!-- v_click_id -->
    <script>
      (() => {
        const urlParams = new URLSearchParams(window.location.search);
        v_click_id = urlParams.get('s1');
        console.log(v_click_id);
      })();
    </script>

    <!-- TrustedForm -->
    <script type="text/javascript">
        (function() {
          var tf = document.createElement('script');
          tf.type = 'text/javascript';
          tf.async = true;
          tf.src = ("https:" == document.location.protocol ? 'https' : 'http') +
            '://api.trustedform.com/trustedform.js?field=xxTrustedFormCertUrl&l=' +
            new Date().getTime() + Math.random();
          var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(tf, s);
          let trustForm = document.querySelector('[name="xxTrustedFormCertUrl"]');

          function getCertUrl(){
            const trustForm = document.querySelector('[name="xxTrustedFormCertUrl"]');
            if(trustForm)
            {
              trustFormCert = trustForm.value;
              document.getElementById('loading').style.display = 'none';
            }
            else
            {
              checkCertUrl();
            }
          }

          function checkCertUrl(){
            setTimeout(() => {
              getCertUrl();
              console.log(`second: ${trustFormCert}`);
            }, 500);
          }
          getCertUrl();
        })();
    </script>
    <noscript>
        <img src='https://api.trustedform.com/ns.gif' />
    </noscript>
    <!-- End TrustedForm -->
    <!-- <?php echo $_SERVER["HTTP_HOST"]; ?> -->
    <?php if($_SERVER["HTTP_HOST"] == 'localhost:8888' || $_SERVER["HTTP_HOST"] == 'localhost' || $_SERVER["HTTP_HOST"] == 'mediumslateblue-panther-459349.hostingersite.com'){ ?>
      <link rel="stylesheet" href="styles.css?v=1.2.15">
      <script>
        const zipcodefile = 'zipcode.json?v=1.120';
        const jsonfile = 'merged_make_year_model.json?v=0.122';
        const imgfile = 'img.json?v=0.121';
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
      <script src="calculation-scripts.js?v=2.7.85"></script>
      <?php } else { ?>
        <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/styles.css">
        <script>
          const zipcodefile = '<?php echo get_template_directory_uri(); ?>/jsonfile/zipcode.json';
          const jsonfile = '<?php echo get_template_directory_uri(); ?>/jsonfile/merged_make_year_model.json';
        </script>
        <script src="<?php echo get_template_directory_uri(); ?>/calculation_scripts.js?v=1.1.10"></script>
    <?php } ?>
      <!-- wp
          <script>
        const zipcodefile = '<?php //echo plugin_dir_url(__FILE__); ?>assets/zipcode.json';
        const jsonfile = '<?php //echo plugin_dir_url(__FILE__); ?>assets/merged_make_year_model.json';
        const imgfile = '<?php //echo plugin_dir_url(__FILE__); ?>assets/img.json';
        const statefile = '<?php //echo plugin_dir_url(__FILE__); ?>assets/states.min.json';
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
    <script src="<?php //echo plugin_dir_url(__FILE__); ?>assets/calculation-scripts.js?v=1.2.10"></script>
      -->
    <script id="LeadiDscript" type="text/javascript">
        (function() {
        var s = document.createElement('script');
        s.id = 'LeadiDscript_campaign';
        s.type = 'text/javascript';
        s.async = true;
        s.src = '//create.lidstatic.com/campaign/47944071-f203-65fd-c512-57ea50ad928b.js?snippet_version=2';
        var LeadiDscript = document.getElementById('LeadiDscript');
        LeadiDscript.parentNode.insertBefore(s, LeadiDscript);
      })();
    </script>
    <noscript><img src='//create.leadid.com/noscript.gif?lac=F6E70FD1-7E87-2E6D-DC76-545BC9524F88&lck=47944071-f203-65fd-c512-57ea50ad928b&snippet_version=2' /></noscript>
</body>
</html>