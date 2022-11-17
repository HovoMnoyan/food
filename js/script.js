"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");
     function hideTabContenet() {
        tabsContent.forEach(item => {
            item.classList.add("hide");
            item.classList.remove("show", "fade");
        });
        //Tabs
        tabs.forEach(item => {
            item.classList.remove("tabheader__item_active");
        });
     }
     function showTabContent (i = 0) {
        tabsContent[i].classList.add("show","fade");
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add("tabheader__item_active");
     }
     hideTabContenet();
     showTabContent();
     tabsParent.addEventListener("click", (event) => {
        const target = event.target;
        if (target && target.classList.contains("tabheader__item")) {
                tabs.forEach((item, i) => {
                    if (target == item) {
                        hideTabContenet();
                        showTabContent(i); 
                    }
                });
               
        }
     });
     //Timer
     const deadLine = "2021-11-11";

     function getTimeRemaining(endtime) {
        let days,hours,seconds,minutes;
        const t = Date.parse(endtime) - Date.parse(new Date());
        if(t <= 0) {
            days = hours = minutes = seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            minutes = Math.floor((t / (1000 * 60)) % 60);
            seconds = Math.floor((t / 1000) % 60);
        }
       
        return {
            "total": t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
     }

     function getZero(num) {
        if(num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
     }
     function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector("#days"),
              hours = timer.querySelector("#hours"),
              minutes = timer.querySelector("#minutes"),
              seconds = timer.querySelector("#seconds"),
              timeInterval = setInterval(updateClock, 1000);
            updateClock();
              function updateClock() {
                const t = getTimeRemaining(endtime);
                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);

                if(t.total <= 0) {
                    clearInterval(timeInterval);
                }
              }
     }
     setClock(".timer", deadLine );
     //modal
     const modalTrigger = document.querySelectorAll("[data-modal]"),
        modal = document.querySelector(".modal"),
        modalCloseBtn = document.querySelector("[data-close]");

    function modalClose () {
        
        modal.classList.remove("show");
        modal.classList.add("hide");
        document.body.style.overflow = "";
           
    }

    function openModal () {
        modal.classList.toggle("show");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";
        clearInterval(modalTImerId);
    }

    modalTrigger.forEach((btn) => {
        btn.addEventListener("click", () => {
        openModal ();
});
    });

modalCloseBtn.addEventListener("click", () => {
    modalClose();
});
modal.addEventListener("click", (e) => {
        if(e.target === modal) {
            modalClose();
        }
        
    });
document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
        modalClose();
    }
});
const modalTImerId = setTimeout(openModal , 5000);

function showModalByScroll () {
    if(window.pageYOffset + document.documentElement.clientHeight >= document.
        documentElement.scrollHeight - 3) {
            openModal();
            window.removeEventListener("scroll", showModalByScroll);
        }
       
}

window.addEventListener("scroll", showModalByScroll);

});