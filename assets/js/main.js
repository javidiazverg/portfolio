/*==================== MENU SHOW & HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav_link');

function linkAction(){
    //const navMenu = document.getElementById('nav-menu')
    //When we click on each nav_link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills_content');
const skillsHeader = document.querySelectorAll('.skills_header')

function toggleSkills(){
    let itemClass = this.parentNode.className

    for(i = 0; i < skillsContent.length; i++){
        skillsContent[i].className = 'skills_content skills_close'
        /*Cuando hay click en el titulo se cierra(iterando por todos hasta que pilla el que toca)otorgandole el classname de cerrado*/
    }
    if(itemClass === 'skills_content skills_close'){
        this.parentNode.className = 'skills_content skills_open'
        /*A no ser que este cerrado, entonces se abre cuando hace el mismo click*/
    }
}

skillsHeader.forEach((el) =>{
    el.addEventListener('click', toggleSkills )
})

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]');/*coge el data-target como una string*/
const tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab =>{
    tab.addEventListener('click', () =>{
        const target = document.querySelector(tab.dataset.target)
        /*recurre al id*/

        tabContents.forEach(tabContent =>{
            tabContent.classList.remove('qualification_active')
            /*Elimina el att. activo (que se muestra) cuando hay click en lo que hay dentro de las tabs*/
        })
        target.classList.add('qualification_active')
        /*El target elegido con el click se pone en activo(se muestra)el id en lo que hay dentro de las tabs*/

        tabs.forEach(tab =>{
            tab.classList.remove('qualification_active')
            /*Elimina el att. activo (que se muestra) cuando hay click,en todas las tabs*/
        })
        tab.classList.add('qualification_active')
        /*Crea el att. activo (que se muestra) cuando hay click en una de las tabs*/
    })
})

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll('.services_modal');
const modalBtns = document.querySelectorAll('.services_button');
const modalCloses = document.querySelectorAll('.services_modal-close');

let modal = function(modalClick){
    modalViews[modalClick].classList.add('active-modal')
    /*Cuando se le da a un modal en concreto se pone en activo*/
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () =>{
        modal(i)
        /*Cuando existe el evento de click llama a la var concreta(boton concreto)*/
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () =>{
        modalViews.forEach((modalView) =>{
            modalView.classList.remove('active-modal')
            /*Cuando hay un click en cerrar se cierran todos los modal y se le quita el activo a todos los modal*/
        })
    })
})

/*==================== PORTFOLIO SWIPER  ====================*/
let swiperPortfolio = new Swiper(".portfolio_container", {
    cssMode: true,
    loop:true,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable:true,
    },
  });

/*==================== TESTIMONIAL ====================*/
let swiperTestimonial = new Swiper(".testimonial_container", {
    loop:true,
    grabCursor: true,
    spaceBetween: 48,

    pagination: {
      el: ".swiper-pagination",
      clickable:true,
      dynamicBullets: true,
    },
    breakpoints:{
        568:{
            slidesPerView: 2,
        }
    }

  });

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset
    /*La cantidad que se desplaza*/

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight /*El alto de un elemento*/
        const sectionTop = current.offsetTop - 50;/*distancia del elemento actual respecto al borde superior del nodo -50*/
        sectionId = current.getAttribute('id')/*es la id actual*/

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){ /*es igual o menor*/
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 100 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-sun' ? 'add' : 'remove'](iconTheme)
}
//Estos ultimos tres parrafos es para que cuando actualice siga manteniendo la misma eleccion 

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

