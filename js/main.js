// add function to hamburger (open close/nav)
const hamburger = document.querySelector(".mobile-nav-toggle");
hamburger.addEventListener("click", showMobileNav);
const nav = document.querySelector(".primary__nav");

// opens + closes nav
function showMobileNav(){
    hamburger.classList.toggle("active");
    nav.classList.toggle("active")
}
// add event to shorter button on click
const button = document.getElementById("shorten-button");
button.addEventListener("click", shortenURL);

const navItems = document.querySelectorAll(".primary__nav--list")
navItems.forEach(element => {
    element.addEventListener("click", ()=>{
        nav.classList.remove("active")
        hamburger.classList.remove("active");
    })
});

// fetches data + outputs value on page
function shortenURL(){
let input = document.getElementById("input");
// gets value from input and pastes it in the api link
const url = `https://api.shrtco.de/v2/shorten?url=${input.value}`;
const shortenError = document.querySelector(".error")
// html output container
const container = document.querySelector(".shorten__output")
let expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
if(input.value !== "" && input.value.match(expression) ){
fetch(url)
.then(res => res.json())
.then(data => {
    if(data.ok === true ){
        shortenError.style.display = "none";
        input.style.border = "0"
        container.innerHTML += `
        <div class="link-output bg-white">
        <div class="wrapper flex">
            <div class="link-copy">
                <p class="text-black overflow fs-400 letter-spacing-1">${data.result.original_link}</p>
                <p class="short-link text-cyan fs-400 letter-spacing-1">${data.result.short_link}</p>
            </div>

            <button class="link-output-button square-button block bg-cyan text-white fs-300" onclick='copyLink(event)'>Copy</button>
        </div>
    </div>
    `
    input.value = "";
    }else{
        shortenError.style.display = "block";
        input.style.border = "solid 3px #F46363";
        shortenError.innerHTML = "Please enter a valid link"
    }
}).catch(console.log("error"))
}else{
    shortenError.style.display = "block";
    input.style.border = "solid 3px #F46363";
    shortenError.innerHTML = "Please add a link"
}
}


// changes copy button + adds short link to clipboard
function copyLink(e){
    // event hold
    let item = e
    // selects short link
    let shortLink = item.target.parentNode.childNodes[1].childNodes[3]

    //changes clicked button text + background color
    item.target.innerHTML = "Copied!"
    item.target.style.backgroundColor = "#3A3054"
    item.target.style.padding = "0 2px 0 0"

   // Copy the short link
     navigator.clipboard.writeText(shortLink.innerHTML);
   
}