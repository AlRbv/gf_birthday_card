const candleBox = document.querySelector('.candles');
const candles = candleBox.querySelectorAll('.candle');
const cake = document.querySelector('.cake');
const boom = document.querySelector('.boom');
const doorWrap = document.querySelector('.door_wrap');
const sleep = ms => new Promise(r => setTimeout(r, ms));
const horse = document.querySelector('.horse_wrap');
const present = document.querySelector('.present_wrap');
let out = 0;

document.querySelectorAll('.wave').forEach(el => {
  const text = el.textContent;
  el.setAttribute('aria-label', text);
  el.innerHTML = text.split('').map((c, i) =>
    `<span aria-hidden="true" style="animation-delay:${(i * 0.07).toFixed(2)}s">${c === ' ' ? '&nbsp;' : c}</span>`
  ).join('');
});

document.querySelectorAll('.wave2').forEach(el => {
  const text = el.textContent;
  el.setAttribute('aria-label', text);
  el.innerHTML = text.split('').map((c, i) =>
    `<span aria-hidden="true" style="animation-delay:${(i * 0.07).toFixed(2)}s">${c === ' ' ? '&nbsp;' : c}</span>`
  ).join('');
});

function explode() {
  if (boom) {
    boom.classList.remove('gone');
    boom.src = boom.src;
  }
  setTimeout(() => boom && boom.classList.add('gone'), 1200);
}

function fitDoor() {
  const wrap = document.querySelector('.door_wrap');
  if (!wrap) return;
  const sec = wrap.closest('section');
  wrap.style.setProperty('--fit', Math.min(4, Math.max(
    sec.clientWidth / wrap.offsetWidth,
    sec.clientHeight / wrap.offsetHeight
  )));
}
fitDoor();
addEventListener('resize', fitDoor);

candleBox.addEventListener('click', e => {
  const c = e.target.closest('.candle');
  if (!c || c.classList.contains('out')) return;

  c.classList.add('out');
  out++;

  if (out === candles.length) {
    const msg = document.querySelector('#cakeMsg');
    if (msg) msg.textContent = 'SURPRISE!!!!';

    setTimeout(() => {
      explode();
      cake.classList.add('done');
    }, 1000);

    setTimeout(() => {
      explode();
      cake.classList.add('done2');
    }, 4000);
  }
});

if (doorWrap) {
  let knocks = 0;
  doorWrap.addEventListener('click', e => {
    knocks++;
    if (knocks < 3) {
      doorWrap.classList.remove('shake');
      void doorWrap.offsetWidth;
      doorWrap.classList.add('shake');
      return;
    }
    doorWrap.classList.add('open');
    sleep(1000).then(() => {
      fitDoor();
    doorWrap.classList.add('zoom');
    });
    sleep(1200).then(() => {
      doorWrap.classList.add('zoom');
    });
    sleep(2000).then(() => {
      if (horse) horse.classList.add('move');
    });
    sleep(4000).then(() => {
      if (present) present.classList.add('move')
    });
    sleep(5300).then(() => {
      if (present) present.classList.add('move2')
    });
});
};

console.log('card.js loaded');