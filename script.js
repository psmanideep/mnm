/*=====================================================
            M&M CONSULTING
=====================================================*/

document.addEventListener("DOMContentLoaded", () => {

    stickyHeader();

    smoothScroll();

    activeMenu();

    revealAnimation();

    statsCounter();

    typingEffect();

    backToTop();

    testimonialSlider();

    timelineAnimation();

    techAnimation();

    contactForm();

    updateYear();

});


/*=====================================================
        Sticky Header
=====================================================*/

function stickyHeader(){

    const header=document.querySelector(".header");

    window.addEventListener("scroll",()=>{

        header.classList.toggle(
            "scrolled",
            window.scrollY>60
        );

    });

}


/*=====================================================
        Smooth Scroll
=====================================================*/

function smoothScroll(){

    document.querySelectorAll('a[href^="#"]').forEach(link=>{

        link.addEventListener("click",e=>{

            e.preventDefault();

            const target=document.querySelector(link.getAttribute("href"));

            if(target){

                target.scrollIntoView({

                    behavior:"smooth"

                });

            }

        });

    });

}


/*=====================================================
        Active Menu
=====================================================*/

function activeMenu(){

    const sections=document.querySelectorAll("section");

    const navLinks=document.querySelectorAll(".navbar a");

    window.addEventListener("scroll",()=>{

        let current="";

        sections.forEach(section=>{

            const top=section.offsetTop-120;

            if(window.scrollY>=top){

                current=section.id;

            }

        });

        navLinks.forEach(link=>{

            link.classList.remove("active");

            if(link.getAttribute("href")==="#"+current){

                link.classList.add("active");

            }

        });

    });

}


/*=====================================================
        Reveal Animation
=====================================================*/

function revealAnimation(){

    const elements=document.querySelectorAll(

        ".service-card,.why-card,.timeline-item,.testimonial-card,.tech-grid span,.contact-info,.contact-form"

    );

    const observer=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },{

        threshold:.15

    });

    elements.forEach(el=>{

        el.classList.add("fade-up");

        observer.observe(el);

    });

}


/*=====================================================
        Counter
=====================================================*/

function statsCounter(){

    const counters=document.querySelectorAll(".stat h2");

    let started=false;

    window.addEventListener("scroll",()=>{

        if(started) return;

        const stats=document.querySelector(".stats");

        if(!stats) return;

        if(stats.getBoundingClientRect().top<window.innerHeight-100){

            started=true;

            counters.forEach(counter=>{

                const text=counter.innerText;

                const target=parseInt(text.replace(/\D/g,""));

                const suffix=text.replace(/[0-9]/g,"");

                let value=0;

                const step=Math.ceil(target/80);

                const timer=setInterval(()=>{

                    value+=step;

                    if(value>=target){

                        value=target;

                        clearInterval(timer);

                    }

                    counter.innerText=value+suffix;

                },20);

            });

        }

    });

}


/*=====================================================
        Typing Effect
=====================================================*/

function typingEffect(){

    const text=document.querySelector(".hero-content span");

    if(!text) return;

    const words=[

        "Digital Solutions",

        "Enterprise Software",

        "Cloud Platforms",

        "AI Applications",

        "Modern Websites"

    ];

    let word=0;

    let letter=0;

    let deleting=false;

    function type(){

        const current=words[word];

        if(!deleting){

            text.innerHTML=current.substring(0,letter++);

            if(letter>current.length){

                deleting=true;

                setTimeout(type,1200);

                return;

            }

        }

        else{

            text.innerHTML=current.substring(0,--letter);

            if(letter===0){

                deleting=false;

                word=(word+1)%words.length;

            }

        }

        setTimeout(type,deleting?45:90);

    }

    type();

}


/*=====================================================
        Back To Top
=====================================================*/

function backToTop(){

    const button=document.createElement("button");

    button.innerHTML='<i class="fa-solid fa-arrow-up"></i>';

    button.className="backToTop";

    document.body.appendChild(button);

    button.onclick=()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    };

    window.addEventListener("scroll",()=>{

        button.classList.toggle(

            "show",

            window.scrollY>400

        );

    });

}


/*=====================================================
        Testimonial Slider
=====================================================*/

function testimonialSlider(){

    const track=document.querySelector(".testimonial-track");

    if(!track) return;

    let index=0;

    function slide(){

        const cards=track.children;

        let visible=3;

        if(window.innerWidth<768){

            visible=1;

        }

        else if(window.innerWidth<992){

            visible=2;

        }

        const width=cards[0].offsetWidth+30;

        index++;

        if(index>cards.length-visible){

            index=0;

        }

        track.style.transform=

            `translateX(-${index*width}px)`;

    }

    setInterval(slide,3500);

}


/*=====================================================
        Timeline Animation
=====================================================*/

function timelineAnimation(){

    const items=document.querySelectorAll(".timeline-item");

    if(!items.length) return;

    const observer=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("active");

            }

        });

    },{

        threshold:.5

    });

    items.forEach(item=>observer.observe(item));

}


/*=====================================================
        Technology Hover
=====================================================*/

function techAnimation(){

    const tech=document.querySelectorAll(".tech-grid span");

    tech.forEach(item=>{

        item.addEventListener("mouseenter",()=>{

            item.style.transform="translateY(-10px) scale(1.08)";

        });

        item.addEventListener("mouseleave",()=>{

            item.style.transform="";

        });

    });

}


/*=====================================================
        Contact Form
=====================================================*/

function contactForm(){

    const form=document.querySelector(".contact-form");

    if(!form) return;

    form.addEventListener("submit",e=>{

        e.preventDefault();

        const fields=form.querySelectorAll("input,textarea");

        let valid=true;

        fields.forEach(field=>{

            if(field.value.trim()===""){

                field.style.borderColor="#ef4444";

                valid=false;

            }

            else{

                field.style.borderColor="#e5e7eb";

            }

        });

        if(!valid){

            alert("Please fill all fields.");

            return;

        }

        const btn=form.querySelector("button");

        btn.innerHTML="Sending...";

        btn.disabled=true;

        setTimeout(()=>{

            btn.innerHTML="Message Sent ✓";

            btn.style.background="#16a34a";

            form.reset();

            setTimeout(()=>{

                btn.innerHTML="Send Message";

                btn.disabled=false;

                btn.style.background="";

            },2000);

        },1500);

    });

}


/*=====================================================
        Footer Year
=====================================================*/

function updateYear(){

    const year=document.querySelector(".copyright");

    if(year){

        year.innerHTML=

        `© ${new Date().getFullYear()} M&M. All Rights Reserved.`;

    }

}