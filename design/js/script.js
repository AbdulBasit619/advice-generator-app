////// Activating Strict Mode
'use strict';

////////////////////////////////
///// SELECTING ELEMENTS

const adviceNumber = document.querySelector('.heading--senary');
const adviceText = document.querySelector('.advice');

const btnDice = document.querySelector('.dice');

const divider = document.querySelector('.divider');

////////////////////////////////
///// IMPlEMENTING FUNCTIONALITY

// Changing divider image according to viewport width
window.addEventListener('load', function () {
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  if (vw < 600) {
    divider.setAttribute('src', './images/pattern-divider-mobile.svg');
  } else {
    divider.setAttribute('src', './images/pattern-divider-desktop.svg');
  }
});

window.addEventListener('resize', function () {
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  if (vw < 600) {
    divider.setAttribute('src', './images/pattern-divider-mobile.svg');
  } else {
    divider.setAttribute('src', './images/pattern-divider-desktop.svg');
  }
});

// Loading and displaying Advice from advice API

// Remember that AdviceSlip API documentation says that 'Advice is cached for 2 seconds. Any repeat-request within 2 seconds will return the same piece of advice.'. So for a different advice, try reloading the page or clicking the dice button after 2 seconds.

const URL = `https://api.adviceslip.com/advice`;

function showAdvice(id, advice) {
  adviceNumber.textContent = adviceNumber.textContent
    .split(' ')
    .slice(0, 2)
    .concat(id)
    .join(' ');

  adviceText.textContent = [
    adviceText.textContent.charAt(0),
    adviceText.textContent.slice(1, -1).replace(/^.*$/, advice),
    adviceText.textContent.charAt(adviceText.textContent.length - 1),
  ].join('');
}

async function getAdvice() {
  try {
    const res = await fetch(URL);

    if (!res.ok) throw new Error('ADVICE NOT FOUND!');

    const data = await res.json();

    const { id, advice } = data.slip;

    showAdvice(id, advice);
  } catch (err) {
    console.error(err);
  }
}

window.addEventListener('load', getAdvice);
btnDice.addEventListener('click', getAdvice);
// btnDice.addEventListener('touchStart', getAdvice);
