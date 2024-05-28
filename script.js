'use strict';

///////////////////////////////////////
// Modal window

const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const nav = document.querySelector('.nav');

const btnsOpenModalWindow = document.querySelectorAll(
  '.btn--show-modal-window'
);
const message = document.createElement('div');
const header = document.querySelector('.header');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModalWindow = function (e) {
  e.preventDefault();
  modalWindow.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModalWindow = function () {
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModalWindow.forEach(item => {
  item.addEventListener('click', openModalWindow);

})

btnCloseModalWindow.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
    closeModalWindow();
}
});
// for (let i = 0; i < btnsOpenModalWindow.length; i++)
  //   btnsOpenModalWindow[i].addEventListener('click', openModalWindow);

// btnCloseModalWindow.addEventListener('click', closeModalWindow);
// overlay.addEventListener('click', closeModalWindow);

// document.addEventListener('keydown', function (e) {
//   if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
//     closeModalWindow();
//   }
// });
message.classList.add('cookie-message');
message.innerHTML = `Мы используем на этом сайте cookie для улучшения функциональности. <button class="btn btn--close-cookie">OK!</button>`;
header.append(message);
message.style.backgroundColor = '#076785';
message.style.width = `120%`;
message.style.height = Number.parseFloat(getComputedStyle(message).height)+ 50 + 'px';
document.querySelector('.btn--close-cookie')
  .addEventListener('click', () => {
    message.remove();
  })


btnScrollTo.addEventListener('click', function(){
  const section1Coords = section1.getBoundingClientRect();
  // window.scrollTo({
  //   left : section1Coords.left + window.pageXOffset,
  //   top : section1Coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // });
  section1.scrollIntoView({
    behavior : 'smooth'
  })
})
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabContents = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function(e){
    const clickedButton = e.target.closest('.operations__tab');

  if (!clickedButton) return;
    tabs.forEach(item => item.classList.remove('operations__tab--active'))
    clickedButton.classList.add('operations__tab--active');
    tabContents.forEach(item => item.classList.remove('operations__content--active'))
    document.querySelector(`.operations__content--${clickedButton.dataset.tab}`).classList.add('operations__content--active')

})
const navLinksHoverAnimation = function (e) {
  if (e.target.classList.contains('nav__link')){
    const linkOver = e.target;
    const siblingLinks = linkOver.closest('.nav__links').querySelectorAll('.nav__link');
    const logo = linkOver.closest('.nav').querySelector('img');
    const logoText = linkOver.closest('.nav').querySelector('.nav__text');
    siblingLinks.forEach(el => {
      if (el !== linkOver) el.style.opacity = this;
    })
    logo.style.opacity = this;
    logoText.style.opacity = this;
  }
}
//Работа с аргументами про помощи bind () / this
nav.addEventListener('mouseover', navLinksHoverAnimation.bind(0.4)
)

nav.addEventListener('mouseout', navLinksHoverAnimation.bind(1))

//Sticky navigation
// const section1Coords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function(e) {
//   if (window.scrollY > section1Coords.top){
//     nav.classList.add('sticky')
//   }else {
//     nav.classList.remove('sticky')
//   }
//
// })

//Sticky navigation - Intersection Observer API
// const observerCallback = function(entries, observer) {
//   entries.forEach( entry => console.log(entry))
// };
// const observerOptions = {
//   root : null,
//   threshold : [0, 0.2],
// }
// const observer = new IntersectionObserver(observerCallback, observerOptions);
// observer.observe(section1)


const getStickyNav = function(entries) {
   const entry = entries[0];
   if (!entry.isIntersecting) {
     nav.classList.add('sticky')
   }else {
     nav.classList.remove('sticky')
   }
   console.log(entry)
}
const observer = new IntersectionObserver(getStickyNav, {
  root : null,
  threshold: 0,
})
observer.observe(header);











