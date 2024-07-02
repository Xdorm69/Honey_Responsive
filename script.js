function scroll(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
scroll();

//GSAP Animations
//Landing Anims
gsap.from(".home-text" , {
    y:200,
    opacity:0,
})
gsap.from(".home-img" , {
    y:200,
    opacity:0,
    delay:0.15,
})

//Container

gsap.from(".container-box" , {
    scale:0,
    scrollTrigger:{
        trigger:".container-box",
        scroller:".main",
       // markers:true,
        start:"top 100%",
        end:"top 75%",
        scrub:2,
    }
})

//Our Shop Timeline
let tl = gsap.timeline({
    scrollTrigger: {
        trigger:".shop-content",
        scroller:".main",
        // markers:true,
        start:"top 70%",
        end:"top 50%",
        scrub:2,
        
    }
})
tl.from(".r1" , {
    x:100,
    opacity:0,
})
tl.from(".r2" , {
    x:100,
    opacity:0,
})
tl.from(".r3" , {
    x:100,
    opacity:0,
})
tl.from(".r4" , {
    x:100,
    opacity:0,
})

//Review Animations Timeline
let tl2 = gsap.timeline({
    scrollTrigger: {
        trigger:".review-content",
        scroller:".main",
        // markers:true,
        start:"top 70%",
        end:"top 50%",
        scrub:2,
    }
})
tl2.from(".b1" , {
    y:100,
    opacity:0,
})
tl2.from(".b2" , {
    y:100,
    opacity:0,
})
tl2.from(".b3" , {
    y:100,
    opacity:0,
})
const header = document.querySelector("header");
window.addEventListener("scroll" , ()=>{
    header.classList.toggle("sticy" , window.scrollY > 80)
})

let menu = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");

menu.onclick = () => {
    menu.classList.toggle("bx-x");
    navlist.classList.toggle("open");
}

window.onscroll = () => {
    menu.classList.remove("bx-x");
    navlist.classList.remove("open");
}