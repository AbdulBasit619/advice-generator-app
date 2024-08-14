////// Activating Strict Mode
'use strict';

///////////////////////////////////
///// SELECTING ELEMENTS

const adviceNumber = document.querySelector('.heading--senary');
const adviceText = document.querySelector('.advice');

const btnDice = document.querySelector('.dice');

const divider = document.querySelector('.divider');

///////////////////////////////////
///// IMPLEMENTING FUNCTIONALITY

function implementDivider() {
  const vw = Math.max(
    this.document.documentElement.clientWidth || 0,
    this.window.innerWidth || 0
  );
  if (vw < 600) {
    divider.setAttribute('src', './images/pattern-divider-mobile.svg');
  } else {
    divider.setAttribute('src', './images/pattern-divider-desktop.svg');
  }
}

// Changing divider image according to viewport width
window.addEventListener('load', implementDivider);
window.addEventListener('resize', implementDivider);

// Loading and displaying advice from advice API

// Remember that AdviceSlip API documentation says that 'Advice is cached for 2 seconds. Any repeat request within 2 seconds will return the same piece of advice.' So for a different advice, try reloading the page or clicking the dice button after 2 seconds.

const URL = 'https://api.adviceslip.com/advice';

function showAdvice(id, advice) {
  adviceNumber.textContent = adviceNumber.textContent
    .split(' ')
    .slice(0, 2)
    .concat(id)
    .join(' ');

  adviceText.textContent = [
    adviceText.textContent.charAt(0),
    adviceText.textContent.slice(1, -1).replace(/^.*$/, advice), // /^.*$/ is a regular expression that checks for everything
    adviceText.textContent.charAt(adviceText.textContent.length - 1),
  ].join(' ');
}

async function getAdvice() {
  try {
    const res = await fetch(URL);

    if (!res.ok) throw new Error('ADVICE NOT FOUND!');

    const data = await res.json();

    const { id, advice } = data.slip; // Equivalent to const id = data.slip.id and const advice = data.slip.advice (this method is called destructuring)

    showAdvice(id, advice);
  } catch (err) {
    console.error(err);
  }
}

window.addEventListener('load', getAdvice); // Get advice whenever window loads
btnDice.addEventListener('click', getAdvice); // Get advice when btnDice is clicked
btnDice.addEventListener('touchstart', getAdvice); // Get advice when btnDice is tapped on a touchscreen
