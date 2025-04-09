// script.js

// Elements
const pastDueContainer = document.querySelector(".past-due-container");
const creditCardsContainer = document.querySelector(".credit-cards-container");
const pastDebtsContainer = document.querySelector(".past-debts-container");
const extraContainer = document.querySelector(".extra-container");

const pastDueBills = document.querySelector(".past-due-bills");
const creditCards = document.querySelector(".credit-cards");
const pastDebts = document.querySelector(".past-debts");
const extra = document.querySelector(".extra-option");

const totalRemovedBox = document.querySelector(".total-removed-box");
const callButton = document.querySelector(".callButton");

/**
 * Displays "Checking..." inside a container with a dot effect,
 * and when finished, removes the text and shows the final element.
 *
 * @param {HTMLElement} container - The container that will display "Checking..."
 * @param {HTMLElement} element   - The final content to be displayed upon completion
 * @param {boolean} isFirst       - If it's the first container (to remove delays)
 */
function showCheckingInContainer(container, element, isFirst = false) {
  return new Promise((resolve) => {
    // 1) Measure the height of "Checking..."
    const tempMessage = document.createElement("p");
    tempMessage.classList.add("checking-message");
    tempMessage.textContent = "Checking...";
    tempMessage.style.visibility = "hidden";
    tempMessage.style.position = "absolute";
    document.body.appendChild(tempMessage);

    const requiredHeight = tempMessage.offsetHeight;
    document.body.removeChild(tempMessage);

    // Assign that height as a minimum to the container


    // 2) Create the actual Checking message
    const checkingMessage = document.createElement("p");
    checkingMessage.classList.add("checking-message");
    checkingMessage.textContent = "Checking"; // dots will be added

    let dotCount = 0;
    const maxDots = 3;
    let checkingInterval;
    let checkingTimeout;

    // -- Outer delay --
    // For the first container: 0 ms
    // For the following: 500 ms
    setTimeout(() => {
      container.classList.add("container-slide-in");
      container.style.minHeight = requiredHeight + 34 + "px";
      container.style.padding = "3% 5%";

      // -- Inner delay (before placing "Checking...") --
      // For the first container: 0 ms
      // For the following: 1000 ms
      setTimeout(() => {
        container.appendChild(checkingMessage);

        // Interval that adds dots every 500 ms
        checkingInterval = setInterval(() => {
          if (dotCount < maxDots) {
            dotCount++;
            checkingMessage.textContent = "Checking " + ".".repeat(dotCount);

            // Blink
            checkingMessage.classList.remove("short-blink");
            void checkingMessage.offsetWidth; // reflow
            checkingMessage.classList.add("short-blink");
          } else {
            clearInterval(checkingInterval);
            clearTimeout(checkingTimeout);
            container.removeChild(checkingMessage);

            // Show the final element
            element.classList.remove("hidden");
            setTimeout(() => {
              element.classList.add("show");
              element.querySelectorAll("span").forEach(span => {
                span.style.visibility = "visible";
              });
              container.classList.add("visible-after");
            }, 50);

            setTimeout(() => resolve(), 100);
          }
        }, 500);

        // 2s timeout in case it doesn't reach 3 dots
        checkingTimeout = setTimeout(() => {
          clearInterval(checkingInterval);
          container.removeChild(checkingMessage);

          element.classList.remove("hidden");
          setTimeout(() => {
            element.classList.add("show");
            container.classList.add("visible-after");
            element.querySelectorAll("span").forEach(span => {
              span.style.visibility = "visible";
            });
          }, 50);

          setTimeout(() => resolve(), 100);
        }, 2000);

      }, isFirst ? 0 : 1000);  // (B) ← remove delay for the first container

    }, isFirst ? 0 : 500);      // (A) ← remove 500ms delay for the first container
  });
}

// Animation flow
async function startAnimation() {
  // First call: remove both delays
  await showCheckingInContainer(pastDueContainer, pastDueBills, true);

  // Subsequent calls: with delay
  await showCheckingInContainer(creditCardsContainer, creditCards);
  await showCheckingInContainer(pastDebtsContainer, pastDebts);
  await showCheckingInContainer(extraContainer, extra);

  // Show Total Removed and the button after the main flow
  setTimeout(() => {
    totalRemovedBox.classList.remove("hidden");
    totalRemovedBox.querySelectorAll("span").forEach(span => {
      span.style.visibility = "visible";
    });
    totalRemovedBox.classList.add("slide-in");
    setTimeout(() => totalRemovedBox.classList.add("show"), 50);

    callButton.classList.remove("hidden");
    callButton.classList.add("slide-in");
    setTimeout(() => callButton.classList.add("show"), 50);
  }, 1000);
}

// Start the animation when the page loads
document.addEventListener("DOMContentLoaded", () => {
  startAnimation();
});