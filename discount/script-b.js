window.addEventListener('DOMContentLoaded', () => {
    // Minimum and maximum range
    const min = 15000;
    const max = 25000;
  
    // Generate random total amount automatically
    // const total = Math.floor(Math.random() * (max - min + 1)) + min;
  
  
    // Generate 4 partials within the specified ranges
    const partial1 = Math.floor(Math.random() * (560 - 240 + 1)) + 240;
    const partial2 = Math.floor(Math.random() * (340 - 120 + 1)) + 120;
    const partial3 = Math.floor(Math.random() * (760 - 420 + 1)) + 420;
    const partial4 = Math.floor(Math.random() * (890 - 220 + 1)) + 220;
  
    const total = partial1 + partial2 + partial3 + partial4;
  
    // Format numbers with commas
    const formatNumber = (num) => num.toLocaleString('en-US');
  
    // Inject values into the HTML
    document.querySelector('.past-due-bills .value').textContent = `$${formatNumber(partial1)}.00`;
    document.querySelector('.credit-cards .value').textContent = `$${formatNumber(partial2)}.00`;
    document.querySelector('.past-debts .value').textContent = `$${formatNumber(partial3)}.00`;
    document.querySelector('.extra-option .value').textContent = `$${formatNumber(partial4)}.00`;
  
    // Show the total
    document.querySelector('.total-removed-box .value').textContent = `$${formatNumber(total)}.00`;
  
    // // Remove 'hidden' class so they appear
    // document.querySelector('.past-due-bills').classList.remove('hidden');
    // document.querySelector('.credit-cards').classList.remove('hidden');
    // document.querySelector('.past-debts').classList.remove('hidden');
    // document.querySelector('.total-removed-box').classList.remove('hidden');
    // document.querySelector('.callButton').classList.remove('hidden');
  });