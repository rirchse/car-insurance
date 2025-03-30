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
    <script src="https://unpkg.com/slim-select@latest/dist/slimselect.min.js"></script>
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
    <hr><hr>
        <div class="wrap">
        <header class="container">
            <img src="https://darkslateblue-mouse-951357.hostingersite.com/wp-content/uploads/2025/03/Main-Logo-EYB-SVG.png" alt="logo" class="logo-img">
        </header>
        <div class="progess-bar">
            <div class="progess-active-line" style="width: 25%;"></div>
            <div class="progress-indicator" style="left: 25%;">25%</div>
        </div>
        <div class="container">
            <div class="form-wrap">
                <form action="#">
                    <div class="step step-1 step-content-basic">
                        <h2>Enter Your Zip Code</h2>
                        <div class="inner-wrap inner-wrap-input">
                            <div class="field-wrap">
                                <input type="text" placeholder="Zip Code">
                                <span class="error-msg">Invalid Zip code</span>
                            </div>
                            <div class="field-wrap">
                                <button class="action-btn btn">Get Started</button>
                            </div>
                        </div>
                    </div>

                    <div class="step step-make">
                        <h2>Vehicle Make</h2>
                        <div class="inner-wrap inner-wrap-btn">
                            <button class="input">
                                <div class="input-wrap">
                                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGwtb3BhY2l0eT0iLjAxIiBmaWxsPSIjRkZGIiBkPSJNMCAwaDQ4djQ4SDB6Ii8+PHBhdGggZD0iTTI0IDkuMjNjMy45NDUgMCA3LjY1NCAxLjUzNyAxMC40NDMgNC4zMjdBMTQuNjcyIDE0LjY3MiAwIDAgMSAzOC43NyAyNGMwIDMuOTQ1LTEuNTM2IDcuNjU0LTQuMzI2IDEwLjQ0M0ExNC42NzIgMTQuNjcyIDAgMCAxIDI0IDM4Ljc3YTE0LjY3MyAxNC42NzMgMCAwIDEtMTAuNDQzLTQuMzI2QTE0LjY3MiAxNC42NzIgMCAwIDEgOS4yMyAyNGMwLTguMTQ0IDYuNjI1LTE0Ljc3IDE0Ljc3LTE0Ljc3em0wIC41MTJjLTMuODA4IDAtNy4zODkgMS40ODMtMTAuMDgyIDQuMTc2QTE0LjE2NSAxNC4xNjUgMCAwIDAgOS43NDIgMjRjMCAzLjgwOCAxLjQ4MyA3LjM4OSA0LjE3NiAxMC4wODJBMTQuMTY0IDE0LjE2NCAwIDAgMCAyNCAzOC4yNThjNy44NjIgMCAxNC4yNTgtNi4zOTYgMTQuMjU4LTE0LjI1OCAwLTMuODA4LTEuNDgzLTcuMzktNC4xNzYtMTAuMDgyQTE0LjE2NSAxNC4xNjUgMCAwIDAgMjQgOS43NDJ6bTAgLjU4N2M3LjU1IDAgMTMuNjcgNi4xMiAxMy42NyAxMy42NzEgMCA3LjU1LTYuMTIgMTMuNjctMTMuNjcgMTMuNjdTMTAuMzMgMzEuNTUgMTAuMzMgMjQgMTYuNDUgMTAuMzMgMjQgMTAuMzN6bTAgNC45MzlhOC43MzMgOC43MzMgMCAxIDAgMCAxNy40NjUgOC43MzMgOC43MzMgMCAwIDAgMC0xNy40NjV6TTMyLjE3IDI0QTguMTcgOC4xNyAwIDAgMSAyNCAzMi4xN1YyNHpNMjQgMTUuODNWMjRoLTguMTdBOC4xNyA4LjE3IDAgMCAxIDI0IDE1Ljgzem04LjI0Mi0yLjAwNmwtMi4yNTcgMi45MDQuNjYuODA4IDIuMTMyLS44NzcuMDA4LjAwOS0xLjMwMiAxLjkwNC42NTQuODEzIDMuMzEtMS42MDQtLjU1Ny0uNjg4LTIuMTAzLjk5OCAxLjM1Ni0xLjkyLS41OTctLjczNy0yLjE2LjkyNyAxLjQxNC0xLjg1LS41NTgtLjY4N3ptLTE2LjIwNS43MDVjLS40ODItLjQwNS0uOTktLjA2LTEuMzU0LjM3NGwtMS43NTYgMi4wOTIgMi43NiAyLjMxNiAxLjg1Mi0yLjIwNmMuNDIzLS41MDQuNDg4LTEuMDA0LjA0NC0xLjQzNy0uMjktLjI4MS0uNzM3LS4zNjYtMS4xNTctLjEwNWEuOC44IDAgMCAwIC4wMDUtLjUzOGMtLjE4MS0uMzMtLjI0NC0uMzctLjM5NC0uNDk2em0uMjA1IDEuNzY5Yy4xMjUtLjE1LjQwNC0uMTkzLjU5Mi0uMDM1LjIxMy4xNzkuMjM0LjQ1LjA4OC42MjRsLTEuMSAxLjMxLS42ODktLjU3OXptLTEuMTc1LS44NzdjLjEyMi0uMTQ2LjM5OC0uMTQuNTc2LjAwOS4xOTUuMTY0LjE5NS4zOTYuMDY0LjU1MmwtMS4wNDMgMS4yNDMtLjY1Mi0uNTQ3em04LjAxNy00LjM0NWgtMS4wODJ2My41OThoLjcydi0yLjUxMmwuOTQ4IDIuNTEyaC43ODdsLjk0OC0yLjUxMnYyLjUxMmguNzJ2LTMuNTk4aC0xLjA4MmwtLjk3OSAyLjU2My0uOTgtMi41NjN6IiBmaWxsPSIjMDAwIi8+PC9nPjwvc3ZnPg==" alt="BMW" loading="lazy">
                                    <span>BMW</span>
                                </div>
                            </button>
                            <button class="input">
                                <div class="input-wrap">
                                    <img src="https://cheapautocover.com/images/makes/buick.png" alt="BMW" loading="lazy">
                                    <span>BMW</span>
                                </div>
                            </button>
                            <button class="input">
                                <div class="input-wrap">
                                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGwtb3BhY2l0eT0iLjAxIiBmaWxsPSIjRkZGIiBkPSJNMCAwaDQ4djQ4SDB6Ii8+PHBhdGggZD0iTTI0IDkuMjNjMy45NDUgMCA3LjY1NCAxLjUzNyAxMC40NDMgNC4zMjdBMTQuNjcyIDE0LjY3MiAwIDAgMSAzOC43NyAyNGMwIDMuOTQ1LTEuNTM2IDcuNjU0LTQuMzI2IDEwLjQ0M0ExNC42NzIgMTQuNjcyIDAgMCAxIDI0IDM4Ljc3YTE0LjY3MyAxNC42NzMgMCAwIDEtMTAuNDQzLTQuMzI2QTE0LjY3MiAxNC42NzIgMCAwIDEgOS4yMyAyNGMwLTguMTQ0IDYuNjI1LTE0Ljc3IDE0Ljc3LTE0Ljc3em0wIC41MTJjLTMuODA4IDAtNy4zODkgMS40ODMtMTAuMDgyIDQuMTc2QTE0LjE2NSAxNC4xNjUgMCAwIDAgOS43NDIgMjRjMCAzLjgwOCAxLjQ4MyA3LjM4OSA0LjE3NiAxMC4wODJBMTQuMTY0IDE0LjE2NCAwIDAgMCAyNCAzOC4yNThjNy44NjIgMCAxNC4yNTgtNi4zOTYgMTQuMjU4LTE0LjI1OCAwLTMuODA4LTEuNDgzLTcuMzktNC4xNzYtMTAuMDgyQTE0LjE2NSAxNC4xNjUgMCAwIDAgMjQgOS43NDJ6bTAgLjU4N2M3LjU1IDAgMTMuNjcgNi4xMiAxMy42NyAxMy42NzEgMCA3LjU1LTYuMTIgMTMuNjctMTMuNjcgMTMuNjdTMTAuMzMgMzEuNTUgMTAuMzMgMjQgMTYuNDUgMTAuMzMgMjQgMTAuMzN6bTAgNC45MzlhOC43MzMgOC43MzMgMCAxIDAgMCAxNy40NjUgOC43MzMgOC43MzMgMCAwIDAgMC0xNy40NjV6TTMyLjE3IDI0QTguMTcgOC4xNyAwIDAgMSAyNCAzMi4xN1YyNHpNMjQgMTUuODNWMjRoLTguMTdBOC4xNyA4LjE3IDAgMCAxIDI0IDE1Ljgzem04LjI0Mi0yLjAwNmwtMi4yNTcgMi45MDQuNjYuODA4IDIuMTMyLS44NzcuMDA4LjAwOS0xLjMwMiAxLjkwNC42NTQuODEzIDMuMzEtMS42MDQtLjU1Ny0uNjg4LTIuMTAzLjk5OCAxLjM1Ni0xLjkyLS41OTctLjczNy0yLjE2LjkyNyAxLjQxNC0xLjg1LS41NTgtLjY4N3ptLTE2LjIwNS43MDVjLS40ODItLjQwNS0uOTktLjA2LTEuMzU0LjM3NGwtMS43NTYgMi4wOTIgMi43NiAyLjMxNiAxLjg1Mi0yLjIwNmMuNDIzLS41MDQuNDg4LTEuMDA0LjA0NC0xLjQzNy0uMjktLjI4MS0uNzM3LS4zNjYtMS4xNTctLjEwNWEuOC44IDAgMCAwIC4wMDUtLjUzOGMtLjE4MS0uMzMtLjI0NC0uMzctLjM5NC0uNDk2em0uMjA1IDEuNzY5Yy4xMjUtLjE1LjQwNC0uMTkzLjU5Mi0uMDM1LjIxMy4xNzkuMjM0LjQ1LjA4OC42MjRsLTEuMSAxLjMxLS42ODktLjU3OXptLTEuMTc1LS44NzdjLjEyMi0uMTQ2LjM5OC0uMTQuNTc2LjAwOS4xOTUuMTY0LjE5NS4zOTYuMDY0LjU1MmwtMS4wNDMgMS4yNDMtLjY1Mi0uNTQ3em04LjAxNy00LjM0NWgtMS4wODJ2My41OThoLjcydi0yLjUxMmwuOTQ4IDIuNTEyaC43ODdsLjk0OC0yLjUxMnYyLjUxMmguNzJ2LTMuNTk4aC0xLjA4MmwtLjk3OSAyLjU2My0uOTgtMi41NjN6IiBmaWxsPSIjMDAwIi8+PC9nPjwvc3ZnPg==" alt="BMW" loading="lazy">
                                    <span>BMW</span>
                                </div>
                            </button>
                            <button class="input">
                                <div class="input-wrap">
                                    <img src="https://cheapautocover.com/images/makes/buick.png" alt="BMW" loading="lazy">
                                    <span>BMW</span>
                                </div>
                            </button>
                            <button class="input">2025</button>
                            <button class="input">2025</button>
                            <button class="input">2025</button>
                            <button class="input">2025</button>
                            <button class="input">2025</button>
                            <button class="input">2025</button>
                            <button class="input">2025</button>
                            <button class="input">2025</button>
                            <button class="input">2025</button>
                            <button class="input">2025</button>
                            <button class="show-more">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                Show more</button>
                            <button class="input">2025</button>
                            <button class="input">2025</button>
                            <div class="back-to-prev">
                                <button class="back">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                                    </svg>                                  
                                    Back
                                </button>
                            </div>
                            
                        </div>
                        <div class="more-options inner-wrap-btn">
                            <button class="show-more">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                Show all makes</button>
                            <button class="input">2025</button>
                            <button class="input">2025</button>
                        </div>
                    </div>

                    <div class="step step-2">
                        <h2>Vehicle Year</h2>
                        <div class="inner-wrap inner-wrap-btn">
                            <button class="input">2025</button>
                            <button class="input">2025</button>
                            <button class="input">2025</button>
                            <button class="input">2025</button>
                            <button class="input">2025</button>
                            <button class="input">2025</button>
                            <button class="input">2025</button>
                            <button class="input">2025</button>
                            <button class="input">2025</button>
                            <button class="input">2025</button>
                            <button class="input">2025</button>
                            <button class="show-more">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                Show more</button>
                            <button class="input">2025</button>
                            <button class="input">2025</button>
                            <div class="back-to-prev">
                                <button class="back">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                                    </svg>                                  
                                    Back
                                </button>
                            </div>
                            
                        </div>
                        <div class="more-options inner-wrap-btn">
                            <button class="show-more">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                Show all makes</button>
                            <button class="input">2025</button>
                            <button class="input">2025</button>
                        </div>
                    </div>
                    <div class="step step-3">
                        <h2>Vehicle Year</h2>
                        <div class="inner-wrap inner-wrap-btn">
                            <button class="input">2025</button>
                            <button class="input">2025</button>
                            <button class="input">2025</button>
                            <button class="input">2025</button>
                            <button class="input">2025</button>
                            <button class="input">2025</button>
                            <button class="input">2025</button>
                            <button class="input">2025</button>
                            <button class="input">2025</button>
                            <button class="input">2025</button>
                            <button class="input">2025</button>
                        </div>
                    </div>

                    <div class="step step-number step-content-basic five-items">
                        <h2>Vehicle Year</h2>
                        <div class="inner-wrap inner-wrap-btn">
                            <button class="input">2011</button>
                            <button class="input">2010</button>
                            <button class="input">2009</button>
                            <button class="input">2008</button>
                            <button class="input">2007</button>
                            <button class="input">2006</button>
                            <button class="input">2005</button>
                            <button class="input">2004</button>
                            <button class="input">2003</button>
                            <button class="input">2002</button>
                            <button class="input">2001</button>
                            <button class="input">2000</button>
                            <button class="input">1999</button>
                            <button class="input">1998</button>
                            <button class="input">1997</button>
                            <button class="input">1996</button>
                            <button class="input">1995</button>
                            <button class="input">1994</button>
                            <button class="input">1993</button>
                            <button class="input">1992</button>
                            <button class="input">1991</button>
                            <button class="input">1990</button>
                            <button class="input">1989</button>
                            <button class="input">1988</button>
                            <button class="input">1987</button>
                            <button class="input">1986</button>
                            <button class="input">1985</button>
                            <button class="input">1984</button>
                            <button class="input">1983</button>
                            <button class="input">1982</button>
                            <button class="input">1981</button>
                            <button class="input">1980</button>
                            <button class="input">1979</button>
                            <button class="input">1978</button>
                            <button class="input">1977</button>
                            <button class="input">1976</button>
                            <button class="input">1975</button>
                            <button class="input">1974</button>
                            <button class="input">1973</button>
                            <button class="input">1972</button>
                            <button class="input">1971</button>
                            <button class="input">1970</button>
                            <button class="input">1969</button>
                            <button class="input">1968</button>
                            <button class="input">1967</button>
                            <button class="input">1966</button>
                            <button class="input">1965</button>
                            <button class="input">1964</button>
                            <button class="input">1963</button>
                            <button class="input">1962</button>
                            <button class="input">1961</button>
                            <button class="input">1960</button>
                            <button class="input">1959</button>
                            <button class="input">1958</button>
                            <button class="input">1957</button>
                            <button class="input">1956</button>
                            <button class="input">1955</button>
                            <button class="input">1954</button>
                            <button class="input">1953</button>
                            <button class="input">1952</button>
                            <button class="input">1951</button>
                            <button class="input">1950</button>
                            <button class="input">1949</button>
                            <button class="input">1948</button>
                            <button class="input">1947</button>
                            <button class="input">1946</button>
                            <button class="input">1945</button>
                            <button class="input">1944</button>
                            <button class="input">1943</button>
                            <button class="input">1942</button>
                            <button class="input">1941</button>
                            <button class="input">1940</button>
                            <button class="input">1939</button>
                            <button class="input">1938</button>
                            <button class="input">1937</button>
                            <button class="input">1936</button>
                            <button class="input">1935</button>
                            <button class="input">1934</button>
                            <button class="input">1933</button>
                            <button class="input">1932</button>
                            <button class="input">1931</button>
                            <button class="input">1930</button>
                            <button class="input">1929</button>
                            <button class="input">1928</button>
                            <button class="input">1927</button>
                            <button class="input">1926</button>
                            <button class="input">1925</button>
                        </div>
                        <div class="back-to-prev">
                            <button class="back">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                                </svg>                                  
                                Back
                            </button>
                        </div>
                    </div>

                    <div class="step step-number step-content-basic five-items">
                        <h2>Vehicle Model</h2>
                        <div class="inner-wrap inner-wrap-btn">
                            <button class="input">2011</button>
                            <button class="input">2010</button>
                            <button class="input">2009</button>
                            <button class="input">2008</button>
                            <button class="input">2007</button>
                            <button class="input">2006</button>
                            <button class="input">2005</button>
                            <button class="input">2004</button>
                            <button class="input">2003</button>
                            <button class="input">2002</button>
                            <button class="input">2001</button>
                            <button class="input">2000</button>
                            <button class="input">1999</button>
                            <button class="input">1998</button>
                            <button class="input">1997</button>
                            <button class="input">1996</button>
                            <button class="input">1995</button>
                            <button class="input">1994</button>
                            <button class="input">1993</button>
                            <button class="input">1992</button>
                            <button class="input">1991</button>
                            <button class="input">1990</button>
                            <button class="input">1989</button>
                            <button class="input">1988</button>
                            <button class="input">1987</button>
                            <button class="input">1986</button>
                            <button class="input">1985</button>
                            <button class="input">1984</button>
                            <button class="input">1983</button>
                            <button class="input">1982</button>
                            <button class="input">1981</button>
                            <button class="input">1980</button>
                            <button class="input">1979</button>
                            <button class="input">1978</button>
                            <button class="input">1977</button>
                            <button class="input">1976</button>
                            <button class="input">1975</button>
                            <button class="input">1974</button>
                            <button class="input">1973</button>
                            <button class="input">1972</button>
                            <button class="input">1971</button>
                            <button class="input">1970</button>
                            <button class="input">1969</button>
                            <button class="input">1968</button>
                            <button class="input">1967</button>
                            <button class="input">1966</button>
                            <button class="input">1965</button>
                            <button class="input">1964</button>
                            <button class="input">1963</button>
                            <button class="input">1962</button>
                            <button class="input">1961</button>
                            <button class="input">1960</button>
                            <button class="input">1959</button>
                            <button class="input">1958</button>
                            <button class="input">1957</button>
                            <button class="input">1956</button>
                            <button class="input">1955</button>
                            <button class="input">1954</button>
                            <button class="input">1953</button>
                            <button class="input">1952</button>
                            <button class="input">1951</button>
                            <button class="input">1950</button>
                            <button class="input">1949</button>
                            <button class="input">1948</button>
                            <button class="input">1947</button>
                            <button class="input">1946</button>
                            <button class="input">1945</button>
                            <button class="input">1944</button>
                            <button class="input">1943</button>
                            <button class="input">1942</button>
                            <button class="input">1941</button>
                            <button class="input">1940</button>
                            <button class="input">1939</button>
                            <button class="input">1938</button>
                            <button class="input">1937</button>
                            <button class="input">1936</button>
                            <button class="input">1935</button>
                            <button class="input">1934</button>
                            <button class="input">1933</button>
                            <button class="input">1932</button>
                            <button class="input">1931</button>
                            <button class="input">1930</button>
                            <button class="input">1929</button>
                            <button class="input">1928</button>
                            <button class="input">1927</button>
                            <button class="input">1926</button>
                            <button class="input">1925</button>
                        </div>
                        <div class="back-to-prev">
                            <button class="back">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                                </svg>                                  
                                Back
                            </button>
                        </div>
                    </div>


                    <div class="step step-number step-content-basic">
                        <h2>Vehicle Ownership</h2>
                        <div class="inner-wrap inner-wrap-btn">
                            <button class="input">Finance</button>
                            <button class="input">Lease</button>
                            <button class="input">Own</button>
                            <button class="input">Other</button>
                        </div>
                        <div class="back-to-prev">
                            <button class="back">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                                </svg>                                  
                                Back
                            </button>
                        </div>
                    </div>

                    <div class="step step-number step-content-basic">
                        <h2>Annual Mileage</h2>
                        <div class="inner-wrap inner-wrap-btn">
                            <button class="input">Under 5,000</button>
                            <button class="input">5,001-10,000</button>
                            <button class="input">10,001-15,000</button>
                            <button class="input">15,000+ </button>
                        </div>
                        <div class="back-to-prev">
                            <button class="back">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                                </svg>                                  
                                Back
                            </button>
                        </div>
                    </div>

                    <div class="step step-number step-content-basic">
                        <h2>Desired Coverage Level</h2>
                        <div class="inner-wrap inner-wrap-btn">
                            <button class="input">Superior</button>
                            <button class="input">Standard</button>
                            <button class="input">Basic</button>
                            <button class="input">State</button>
                            <button class="input">Minimum</button>
                        </div>
                        <div class="back-to-prev">
                            <button class="back">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                                </svg>                                  
                                Back
                            </button>
                        </div>
                    </div>

                    <div class="step step-number step-content-basic yes-no-box">
                        <h2>Add Another Vehicle? (Save Additional 20%)</h2>
                        <div class="inner-wrap inner-wrap-btn">
                            <button class="input">YES</button>
                            <button class="input">NO</button>
                        </div>
                        <div class="back-to-prev">
                            <button class="back">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                                </svg>                                  
                                Back
                            </button>
                        </div>
                    </div>

                    <div class="step step-number step-content-basic">
                        <h2>Insurance Details</h2>
                        <div class="inner-wrap">
                            <h4 style="text-align: left;">Current Insurance Carier</h4>
                            <select name="" id="insurance_carrier" class="select-box-carrier">
                                <option data-placeholder="true"></option>
                                <option value="Other">Other</option>
                                <option value="Not Currently Insured">Not Currently Insured</option>
                                <option value="21st Century">21st Century</option>
                                <option value="AAA">AAA</option>
                                <option value="Allstate">Allstate</option>
                                <option value="American Family">American Family</option>
                                <option value="Bristol West">Bristol West</option>
                                <option value="Dairyland Insurance">Dairyland Insurance</option>
                                <option value="Direct General">Direct General</option>
                                <option value="Elephant">Elephant</option>
                                <option value="Erie Insurance">Erie Insurance</option>
                                <option value="Esurance">Esurance</option>
                                <option value="Farm Bureau/Farm Family/Rural">Farm Bureau/Farm Family/Rural</option>
                                <option value="Farmers">Farmers</option>
                                <option value="Farmers Insurance">Farmers Insurance</option>
                                <option value="Gainsco">Gainsco</option>
                                <option value="Geico">Geico</option>
                                <option value="Liberty Mutual">Liberty Mutual</option>
                                <option value="Mercury">Mercury</option>
                                <option value="Nationwide">Nationwide</option>
                                <option value="Plymouth Rock">Plymouth Rock</option>
                                <option value="Progressive">Progressive</option>
                                <option value="Prudential">Prudential</option>
                                <option value="SafeAuto">SafeAuto</option>
                                <option value="Safeco">Safeco</option>
                                <option value="State Farm">State Farm</option>
                                <option value="The General">The General</option>
                                <option value="The Hartford">The Hartford</option>
                                <option value="Travelers">Travelers</option>
                                <option value="USAA">USAA</option>
                            </select>

                            <h4 style="text-align: left;">Continuous Coverage</h4>
                            <select name="" id="insurance_coverage" class="select-box-coverage">
                                <option data-placeholder="true"></option>
                                <option value="Less Than 6 Months">Less Than 6 Months</option>
                                <option value="6 Months">6 Months</option>
                                <option value="1 Year">1 Year</option>
                                <option value="2 Years">2 Years</option>
                                <option value="3 Years">3 Years</option>
                                <option value="3 to 5 Years">3 to 5 Years</option>
                                <option value="More Than 5 Years">More Than 5 Years</option>
                            </select>
                        </div>
                        <div class="back-to-prev">
                            <button class="back">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                                </svg>                                  
                                Back
                            </button>
                        </div>
                    </div>

                    <div class="step step-number step-content-basic">
                        <h5 style="color: #666">1st Driver</h5>
                        <h2>Gender</h2>
                        <div class="inner-wrap inner-wrap-btn">
                            <button class="input">Male</button>
                            <button class="input">Female</button>
                        </div>
                        <div class="back-to-prev">
                            <button class="back">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                                </svg>                                  
                                Back
                            </button>
                        </div>
                    </div>

                    <div class="step step-number step-content-basic three-items">
                        <h5 style="color: #666">1st Driver</h5>
                        <h2>Marital Status</h2>
                        <div class="inner-wrap inner-wrap-btn">
                            <button class="input">Married</button>
                            <button class="input">Single</button>
                            <button class="input">Divorced</button>
                            <button class="input">Domestic Partner</button>
                            <button class="input">Separated</button>
                            <button class="input">Widowed</button>
                            <button class="input">Unknown</button>
                        </div>
                        <div class="back-to-prev">
                            <button class="back">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                                </svg>                                  
                                Back
                            </button>
                        </div>
                    </div>

                    <div class="step step-number step-content-basic three-items">
                        <h5 style="color: #666">1st Driver</h5>
                        <h2>Birth Month</h2>
                        <div class="inner-wrap inner-wrap-btn">
                            <button class="input">January</button>
                            <button class="input">February</button>
                            <button class="input">March</button>
                            <button class="input">April</button>
                            <button class="input">May</button>
                            <button class="input">June</button>
                            <button class="input">July</button>
                            <button class="input">August</button>
                            <button class="input">September</button>
                            <button class="input">October</button>
                            <button class="input">November</button>
                            <button class="input">December</button>
                        </div>
                        <div class="back-to-prev">
                            <button class="back">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                                </svg>                                  
                                Back
                            </button>
                        </div>
                    </div>

                    <div class="step step-number step-content-basic five-items">
                        <h5 style="color: #666">1st Driver</h5>
                        <h2>Birth Day</h2>
                        <div class="inner-wrap inner-wrap-btn">
                            <button class="input">1</button>
                            <button class="input">2</button>
                            <button class="input">3</button>
                            <button class="input">4</button>
                            <button class="input">5</button>
                            <button class="input">6</button>
                            <button class="input">7</button>
                            <button class="input">8</button>
                            <button class="input">9</button>
                            <button class="input">10</button>
                            <button class="input">11</button>
                            <button class="input">12</button>
                            <button class="input">13</button>
                            <button class="input">14</button>
                            <button class="input">15</button>
                            <button class="input">16</button>
                            <button class="input">17</button>
                            <button class="input">18</button>
                            <button class="input">19</button>
                            <button class="input">20</button>
                            <button class="input">21</button>
                            <button class="input">22</button>
                            <button class="input">23</button>
                            <button class="input">24</button>
                            <button class="input">25</button>
                            <button class="input">26</button>
                            <button class="input">27</button>
                            <button class="input">28</button>
                            <button class="input">29</button>
                            <button class="input">30</button>
                            <button class="input">31</button>
                        </div>
                        <div class="back-to-prev">
                            <button class="back">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                                </svg>                                  
                                Back
                            </button>
                        </div>
                    </div>

                    <div class="step step-number step-content-basic five-items">
                        <h5 style="color: #666">1st Driver</h5>
                        <h2>Birth Year</h2>
                        <div class="inner-wrap inner-wrap-btn">
                            <button class="input">2011</button>
                            <button class="input">2010</button>
                            <button class="input">2009</button>
                            <button class="input">2008</button>
                            <button class="input">2007</button>
                            <button class="input">2006</button>
                            <button class="input">2005</button>
                            <button class="input">2004</button>
                            <button class="input">2003</button>
                            <button class="input">2002</button>
                            <button class="input">2001</button>
                            <button class="input">2000</button>
                            <button class="input">1999</button>
                            <button class="input">1998</button>
                            <button class="input">1997</button>
                            <button class="input">1996</button>
                            <button class="input">1995</button>
                            <button class="input">1994</button>
                            <button class="input">1993</button>
                            <button class="input">1992</button>
                            <button class="input">1991</button>
                            <button class="input">1990</button>
                            <button class="input">1989</button>
                            <button class="input">1988</button>
                            <button class="input">1987</button>
                            <button class="input">1986</button>
                            <button class="input">1985</button>
                            <button class="input">1984</button>
                            <button class="input">1983</button>
                            <button class="input">1982</button>
                            <button class="input">1981</button>
                            <button class="input">1980</button>
                            <button class="input">1979</button>
                            <button class="input">1978</button>
                            <button class="input">1977</button>
                            <button class="input">1976</button>
                            <button class="input">1975</button>
                            <button class="input">1974</button>
                            <button class="input">1973</button>
                            <button class="input">1972</button>
                            <button class="input">1971</button>
                            <button class="input">1970</button>
                            <button class="input">1969</button>
                            <button class="input">1968</button>
                            <button class="input">1967</button>
                            <button class="input">1966</button>
                            <button class="input">1965</button>
                            <button class="input">1964</button>
                            <button class="input">1963</button>
                            <button class="input">1962</button>
                            <button class="input">1961</button>
                            <button class="input">1960</button>
                            <button class="input">1959</button>
                            <button class="input">1958</button>
                            <button class="input">1957</button>
                            <button class="input">1956</button>
                            <button class="input">1955</button>
                            <button class="input">1954</button>
                            <button class="input">1953</button>
                            <button class="input">1952</button>
                            <button class="input">1951</button>
                            <button class="input">1950</button>
                            <button class="input">1949</button>
                            <button class="input">1948</button>
                            <button class="input">1947</button>
                            <button class="input">1946</button>
                            <button class="input">1945</button>
                            <button class="input">1944</button>
                            <button class="input">1943</button>
                            <button class="input">1942</button>
                            <button class="input">1941</button>
                            <button class="input">1940</button>
                            <button class="input">1939</button>
                            <button class="input">1938</button>
                            <button class="input">1937</button>
                            <button class="input">1936</button>
                            <button class="input">1935</button>
                            <button class="input">1934</button>
                            <button class="input">1933</button>
                            <button class="input">1932</button>
                            <button class="input">1931</button>
                            <button class="input">1930</button>
                            <button class="input">1929</button>
                            <button class="input">1928</button>
                            <button class="input">1927</button>
                            <button class="input">1926</button>
                            <button class="input">1925</button>
                        </div>
                        <div class="back-to-prev">
                            <button class="back">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                                </svg>                                  
                                Back
                            </button>
                        </div>
                    </div>

                    <div class="step step-number step-content-basic five-items">
                        <h5 style="color: #666">1st Driver</h5>
                        <h2>Incidents In The Past 3 Years</h2>
                        <div class="inner-wrap checkbox-wrap">
                            <div class="incident-item">
                                <p>Had an accident</p>
                                <p>
                                    <label class="radio-wrap">Yes
                                        <input type="radio" name="had_accident">
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="radio-wrap">No
                                        <input type="radio" name="had_accident" checked="checked">
                                        <span class="checkmark"></span>
                                    </label>
                                </p>
                            </div>
                            <div class="incident-item">
                                <p>Received a ticket</p>
                                <p>
                                    <label class="radio-wrap">Yes
                                        <input type="radio" name="recived_ticket">
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="radio-wrap">No
                                        <input type="radio" name="recived_ticket" checked="checked">
                                        <span class="checkmark"></span>
                                    </label>
                                </p>
                            </div>
                            <div class="incident-item">
                                <p>Received a DUI</p>
                                <p>
                                    <label class="radio-wrap">Yes
                                        <input type="radio" name="received_dui">
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="radio-wrap">No
                                        <input type="radio" name="received_dui" checked="checked">
                                        <span class="checkmark"></span>
                                    </label>
                                </p>
                            </div>
                            <div class="incident-item">
                                <p>Required SR-22?</p>
                                <p>
                                    <label class="radio-wrap">Yes
                                        <input type="radio" name="require_sr">
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="radio-wrap">No
                                        <input type="radio" name="require_sr" checked="checked">
                                        <span class="checkmark"></span>
                                    </label>
                                </p>
                            </div>
                        </div>
                        <div class="back-to-prev">
                            <button class="back">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                                </svg>                                  
                                Back
                            </button>
                            <button class="next">
                                Next
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                                </svg>                                                                   
                                
                            </button>
                        </div>
                    </div>

                    <div class="step step-number step-content-basic three-items">
                        <h5 style="color: #666">1st Driver</h5>
                        <h2>Accident Details</h2>
                        <div class="inner-wrap column-wrap">
                            <div class="half-width">
                                <h4 style="text-align: left;">Month</h4>
                                <select name="" id="accident_month" class="select-box-accident-month">
                                    <option data-placeholder="true"></option>
                                    <option value="January">January</option>
                                    <option value="February">February</option>
                                    <option value="March">March</option>
                                    <option value="April">April</option>
                                    <option value="May">May</option>
                                    <option value="June">June</option>
                                    <option value="July">July</option>
                                    <option value="August">August</option>
                                    <option value="September">September</option>
                                    <option value="October">October</option>
                                    <option value="November">November</option>
                                    <option value="December">December</option>
                                </select>
                            </div>
                            <div class="half-width">
                                <h4 style="text-align: left;">Year</h4>
                                <select name="" id="accident_year" class="select-box-accident-year">
                                    <option data-placeholder="true"></option>
                                    <option value="2024">2024</option>
                                    <option value="2023">2023</option>
                                    <option value="2022">2022</option>
                                    <option value="2021">2021</option>
                                </select>
                            </div>
                            <div class="full-width">
                                <h4 style="text-align: left;">Accident Description</h4>
                                <select name="" id="accident_desc" class="select-box-accident-desc">
                                    <option data-placeholder="true"></option>
                                    <option value="Other">Other</option>
                                    <option value="Other Vehicle Hit Yours">Other Vehicle Hit Yours</option>
                                    <option value="Vehicle Damaged Avoiding Accident">Vehicle Damaged Avoiding Accident</option>
                                    <option value="Vehicle Hit Pedestrian">Vehicle Hit Pedestrian</option>
                                    <option value="Vehicle Hit Property ">Vehicle Hit Property   </option>
                                    <option value="Vehicle Hit Vehicle">Vehicle Hit Vehicle</option>
                                </select>
                            </div>
                            <div class="full-width">
                                <h4 style="text-align: left;">At Fault?</h4>
                                <select name="" id="accident_fault" class="select-box-accident-year">
                                    <option data-placeholder="true"></option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                            <div class="full-width">
                                <h4 style="text-align: left;">Damaged</h4>
                                <select name="" id="accident_damage" class="select-box-accident-year">
                                    <option data-placeholder="true"></option>
                                    <option value="Both">Both</option>
                                    <option value="No Damage">No Damage</option>
                                    <option value="People">People</option>
                                    <option value="Property">Property</option>
                                </select>
                            </div>
                            <div class="more-options inner-wrap-btn">
                                <button class="show-more">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    Add another accident</button>
                            </div>
                        </div>
                        <div class="back-to-prev">
                            <button class="back">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                                </svg>                                  
                                Back
                            </button>
                            <button class="next">
                                Next
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                                </svg>                                                                   
                                
                            </button>
                        </div>
                    </div>

                    <div class="step step-number step-content-basic three-items">
                        <h5 style="color: #666">1st Driver</h5>
                        <h2>Ticket Details</h2>
                        <div class="inner-wrap column-wrap">
                            <div class="half-width">
                                <h4 style="text-align: left;">Month</h4>
                                <select name="" id="ticket_month" class="select-box-ticket-month">
                                    <option data-placeholder="true"></option>
                                    <option value="January">January</option>
                                    <option value="February">February</option>
                                    <option value="March">March</option>
                                    <option value="April">April</option>
                                    <option value="May">May</option>
                                    <option value="June">June</option>
                                    <option value="July">July</option>
                                    <option value="August">August</option>
                                    <option value="September">September</option>
                                    <option value="October">October</option>
                                    <option value="November">November</option>
                                    <option value="December">December</option>
                                </select>
                            </div>
                            <div class="half-width">
                                <h4 style="text-align: left;">Year</h4>
                                <select name="" id="ticket_year" class="select-box-accident-year">
                                    <option data-placeholder="true"></option>
                                    <option value="2025">2025</option>
                                    <option value="2024">2024</option>
                                    <option value="2023">2023</option>
                                    <option value="2022">2022</option>
                                </select>
                            </div>
                            <div class="full-width">
                                <h4 style="text-align: left;">Ticket Description</h4>
                                <select name="" id="ticket_desc" class="select-box-accident-desc">
                                    <option data-placeholder="true"></option>
                                    <option value="Careless Driving">Careless Driving</option>
                                    <option value="Carpool Lane Violaion">Carpool Lane Violaion</option>
                                    <option value="Child Not In Car Seat">Child Not In Car Seat</option>
                                    <option value="Defective Equipment">Defective Equipment</option>
                                    <option value="Defective Vehicle Reduced Violation">Defective Vehicle Reduced Violation</option>
                                    <option value="Driving Without A license">Driving Without A license</option>
                                    <option value="Excessive Noise">Excessive Noise</option>
                                    <option value="Exhibition Driving">Exhibition Driving</option>
                                    <option value="Expired Drivers License">Expired Drivers License</option>
                                    <option value="Expired Emissions">Expired Emissions</option>
                                    <option value="Expired Registration">Expired Registration</option>
                                    <option value="Failure To Obey Traffic Signal">Failure To Obey Traffic Signal</option>
                                    <option value="Failure To Signal">Failure To Signal</option>
                                    <option value="Failure To Stop">Failure To Stop</option>
                                    <option value="...">...</option>
                                    <option value="...">...</option>
                                </select>
                            </div>
                            <div class="more-options inner-wrap-btn">
                                <button class="show-more">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    Add another ticket</button>
                            </div>
                        </div>
                        <div class="back-to-prev">
                            <button class="back">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                                </svg>                                  
                                Back
                            </button>
                            <button class="next">
                                Next
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                                </svg>                                                                   
                                
                            </button>
                        </div>
                    </div>

                    <div class="step step-number step-content-basic three-items">
                        <h5 style="color: #666">1st Driver</h5>
                        <h2>DUI Details</h2>
                        <div class="inner-wrap column-wrap">
                            <div class="half-width">
                                <h4 style="text-align: left;">Month</h4>
                                <select name="" id="dui_month" class="select-box-dui-month">
                                    <option data-placeholder="true"></option>
                                    <option value="January">January</option>
                                    <option value="February">February</option>
                                    <option value="March">March</option>
                                    <option value="April">April</option>
                                    <option value="May">May</option>
                                    <option value="June">June</option>
                                    <option value="July">July</option>
                                    <option value="August">August</option>
                                    <option value="September">September</option>
                                    <option value="October">October</option>
                                    <option value="November">November</option>
                                    <option value="December">December</option>
                                </select>
                            </div>
                            <div class="half-width">
                                <h4 style="text-align: left;">Year</h4>
                                <select name="" id="dui_year" class="select-box-dui-year">
                                    <option data-placeholder="true"></option>
                                    <option value="2025">2025</option>
                                    <option value="2024">2024</option>
                                    <option value="2023">2023</option>
                                    <option value="2022">2022</option>
                                </select>
                            </div>
                            <div class="full-width">
                                <h4 style="text-align: left;">State</h4>
                                <select name="" id="dui_state" class="select-box-dui-state">
                                    <option data-placeholder="true"></option>
                                    <option value="Careless Driving">Careless Driving</option>
                                    <option value="Carpool Lane Violaion">Carpool Lane Violaion</option>
                                    <option value="Child Not In Car Seat">Child Not In Car Seat</option>
                                    <option value="Defective Equipment">Defective Equipment</option>
                                    <option value="Defective Vehicle Reduced Violation">Defective Vehicle Reduced Violation</option>
                                    <option value="Driving Without A license">Driving Without A license</option>
                                    <option value="Excessive Noise">Excessive Noise</option>
                                    <option value="Exhibition Driving">Exhibition Driving</option>
                                    <option value="Expired Drivers License">Expired Drivers License</option>
                                    <option value="Expired Emissions">Expired Emissions</option>
                                    <option value="Expired Registration">Expired Registration</option>
                                    <option value="Failure To Obey Traffic Signal">Failure To Obey Traffic Signal</option>
                                    <option value="Failure To Signal">Failure To Signal</option>
                                    <option value="Failure To Stop">Failure To Stop</option>
                                    <option value="...">...</option>
                                    <option value="...">...</option>
                                </select>
                            </div>
                            <div class="more-options inner-wrap-btn">
                                <button class="show-more">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    Add another DUI</button>
                            </div>
                        </div>
                        <div class="back-to-prev">
                            <button class="back">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                                </svg>                                  
                                Back
                            </button>
                            <button class="next">
                                Next
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                                </svg>                                                                   
                                
                            </button>
                        </div>
                    </div>

                    <div class="step step-number step-content-basic">
                        <h5 style="color: #666">1st Driver</h5>
                        <h2>Name</h2>
                        <div class="inner-wrap column-wrap">
                            <div class="full-width">
                                <h4 style="text-align: left;">Legal First Name</h4>
                                <input type="text" placeholder="Legal First Name">
                                <h4 style="text-align: left;" class="mt-20">Legal Last Name</h4>
                                <input type="text" placeholder="Legal Last Name">
                            </div>
                        </div>
                        <div class="back-to-prev">
                            <button class="back">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                                </svg>                                  
                                Back
                            </button>
                            <button class="next">
                                Next
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                                </svg>                                                                   
                                
                            </button>
                        </div>
                    </div>

                    <div class="step step-number step-content-basic yes-no-box">
                        <h2>Add another driver? (Save Additional 20%)</h2>
                        <div class="inner-wrap inner-wrap-btn">
                            <button class="input">YES</button>
                            <button class="input">NO</button>
                        </div>
                        <div class="back-to-prev">
                            <button class="back">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                                </svg>                                  
                                Back
                            </button>
                        </div>
                    </div>

                    <div class="step step-number step-content-basic">
                        <h2>Current Address</h2>
                        <div class="inner-wrap column-wrap">
                            <div class="full-width">
                                <h4 style="text-align: left;">Street Address</h4>
                                <input type="text" placeholder="Street Address">
                            </div>
                            <div class="half-width">
                                <h4 style="text-align: left;">Zip Code</h4>
                                <input type="text" placeholder="Zip Code">
                            </div>
                            <div class="half-width">
                                <h4 style="text-align: left;">State</h4>
                                <select name="" id="address_state" class="select-box-address-state">
                                    <option data-placeholder="true"></option>
                                    <option value="Careless Driving">Careless Driving</option>
                                    <option value="Carpool Lane Violaion">Carpool Lane Violaion</option>
                                    <option value="Child Not In Car Seat">Child Not In Car Seat</option>
                                    <option value="Defective Equipment">Defective Equipment</option>
                                    <option value="Defective Vehicle Reduced Violation">Defective Vehicle Reduced Violation</option>
                                    <option value="Driving Without A license">Driving Without A license</option>
                                    <option value="Excessive Noise">Excessive Noise</option>
                                    <option value="Exhibition Driving">Exhibition Driving</option>
                                    <option value="Expired Drivers License">Expired Drivers License</option>
                                    <option value="Expired Emissions">Expired Emissions</option>
                                    <option value="Expired Registration">Expired Registration</option>
                                    <option value="Failure To Obey Traffic Signal">Failure To Obey Traffic Signal</option>
                                    <option value="Failure To Signal">Failure To Signal</option>
                                    <option value="Failure To Stop">Failure To Stop</option>
                                    <option value="...">...</option>
                                    <option value="...">...</option>
                                </select>
                            </div>
                            <div class="full-width">
                                <h4 style="text-align: left;">City</h4>
                                <input type="text" placeholder="City">
                            </div>
                        </div>
                        <div class="back-to-prev">
                            <button class="back">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                                </svg>                                  
                                Back
                            </button>
                            <button class="next">
                                Next
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                                </svg>                                                                   
                                
                            </button>
                        </div>
                    </div>

                    <div class="step step-number step-content-basic">
                        <h2>Home Ownership</h2>
                        <div class="inner-wrap inner-wrap-btn">
                            <button class="input">OWN</button>
                            <button class="input">RENT</button>
                            <button class="input">ANOTHER</button>
                        </div>
                        <div class="back-to-prev">
                            <button class="back">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                                </svg>                                  
                                Back
                            </button>
                        </div>
                    </div>

                    <div class="step step-number step-content-basic">
                        <h2>Email Address</h2>
                        <div class="inner-wrap column-wrap">
                            <div class="full-width">
                                <h4 style="text-align: left;">Email Address</h4>
                                <input type="email" placeholder="Email Address">
                                <input type="email" placeholder="Email Address" class="error">
                                <span class="error-msg">Invalid Email Address</span>
                            </div>
                        </div>
                        <div class="back-to-prev">
                            <button class="back">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                                </svg>                                  
                                Back
                            </button>
                            <button class="next">
                                Next
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                                </svg>                                                                   
                                
                            </button>
                        </div>
                    </div>

                    <div class="step step-number step-content-basic">
                        <h2>Last Step, Get Your Quotes</h2>
                        <div class="inner-wrap column-wrap">
                            <div class="full-width">
                                <h4 style="text-align: left;">Phone Number</h4>
                                <input type="text" placeholder="Phone Number">
                                <input type="text" placeholder="Phone Number" class="error">
                                <span class="error-msg">Invalid Phone Number</span>
                            </div>
                        </div>
                        <div class="field-wrap">
                            <button class="action-btn btn">Get My Quote</button>
                        </div>
                    </div>



                </form>
            </div>
        </div>
    </div>

    <?php echo $_SERVER["HTTP_HOST"]; ?>
    
      <?php if($_SERVER["HTTP_HOST"] == 'localhost' || $_SERVER["HTTP_HOST"] == 'onenazmul.dev'){ ?>
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
  <script>
        new SlimSelect({
            select: '#insurance_carrier',
            settings: {
                placeholderText: 'Current Insurance Carier',
                showSearch: false, 
                focusSearch: false, 
            }
        })
        new SlimSelect({
            select: '#insurance_coverage',
            settings: {
                placeholderText: 'Continuous Coverage',
                showSearch: false, 
                focusSearch: false, 
            }
        })
        new SlimSelect({
            select: '#accident_month',
            settings: {
                placeholderText: 'Month',
                showSearch: false, 
                focusSearch: false, 
            }
        })
        new SlimSelect({
            select: '#accident_year',
            settings: {
                placeholderText: 'Year',
                showSearch: false, 
                focusSearch: false, 
            }
        })
        new SlimSelect({
            select: '#accident_desc',
            settings: {
                placeholderText: 'Accident Description',
                showSearch: false, 
                focusSearch: false, 
            }
        })
        new SlimSelect({
            select: '#accident_fault',
            settings: {
                placeholderText: 'At Fault?',
                showSearch: false, 
                focusSearch: false, 
            }
        })
        new SlimSelect({
            select: '#accident_damage',
            settings: {
                placeholderText: 'Damaged',
                showSearch: false, 
                focusSearch: false, 
            }
        })
        new SlimSelect({
            select: '#ticket_month',
            settings: {
                placeholderText: 'Month',
                showSearch: false, 
                focusSearch: false, 
            }
        })
        new SlimSelect({
            select: '#ticket_year',
            settings: {
                placeholderText: 'Year',
                showSearch: false, 
                focusSearch: false, 
            }
        })
        new SlimSelect({
            select: '#ticket_desc',
            settings: {
                placeholderText: 'Ticket Description',
                showSearch: false, 
                focusSearch: false, 
            }
        })
        new SlimSelect({
            select: '#dui_month',
            settings: {
                placeholderText: 'Month',
                showSearch: false, 
                focusSearch: false, 
            }
        })
        new SlimSelect({
            select: '#dui_year',
            settings: {
                placeholderText: 'Year',
                showSearch: false, 
                focusSearch: false, 
            }
        })
        new SlimSelect({
            select: '#dui_state',
            settings: {
                placeholderText: 'State',
                showSearch: false, 
                focusSearch: false, 
            }
        })
        new SlimSelect({
            select: '#address_state',
            settings: {
                placeholderText: 'State',
                showSearch: false, 
                focusSearch: false, 
            }
        })
        
    </script>
</body>
</html>
