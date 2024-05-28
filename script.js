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
const lazyImages = document.querySelectorAll('img[data-src]');



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

const navHeight = nav.getBoundingClientRect().height;
const getStickyNav = function(entries) {
   const entry = entries[0];
   if (!entry.isIntersecting) {
     nav.classList.add('sticky')
   }else {
     nav.classList.remove('sticky')
   }
  //  console.log(entry)
}
const observer = new IntersectionObserver(getStickyNav, {
  root : null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
})
observer.observe(header);

// Lazy loading for img

const loadImages = function(entries, observer){
  const entry = entries[0];
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target)
};
const lazyImagesObserver = new IntersectionObserver(loadImages, {
  root : null,
  threshold : 0.5,
  // rootMargin : '200px'
});

lazyImages.forEach(image => lazyImagesObserver.observe(image))


//slider 
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const slidesNumber = slides.length;
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');



// slider.style.transform = `scale(0.35) translateX(-1000px)`;
// slider.style.overflow = 'visible';
const createDots = function () {
  slides.forEach(function(_,index) {
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide='${index}'></button>`)
  })
}
createDots();

const activeteCurrentDot = function (slide){
  document.querySelectorAll('.dots__dot').forEach(dot =>{
    dot.classList.remove('dots__dot--active');
  })
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}
activeteCurrentDot(currentSlide);


const moveToSlide = function (slide) {
  slides.forEach((item , index) => {
    item.style.transform = `translateX(${(index - slide) * 100}%)`;
  })
}
moveToSlide(0);

const nextSlide = function () {
  if (currentSlide === slidesNumber - 1) { 
    currentSlide = 0;
  }else {
    currentSlide++;
  }
  moveToSlide(currentSlide)
  activeteCurrentDot(currentSlide)

}
const previousSlide = function () {
  if (currentSlide === 0) { 
    currentSlide = slidesNumber - 1;
  }else {
    currentSlide--;
  }
  moveToSlide(currentSlide)
  activeteCurrentDot(currentSlide)

}

btnRight.addEventListener('click', nextSlide)
btnLeft.addEventListener('click', previousSlide)

document.addEventListener('keydown', function(e){
  // console.log(e);
  if (e.key === 'ArrowLeft') previousSlide();
  if (e.key === 'ArrowRight') nextSlide();
})
dotContainer.addEventListener('click', function(e){
  if (e.target.classList.contains('dots__dot')){
    const slide = e.target.dataset.slide;
    moveToSlide(slide);
    activeteCurrentDot(slide);
    
  }
});


// <button class="dots__dot" data-slide='0'></button>







