/* LOAD HEADER / FOOTER */

async function loadComponent(id,file){

const element = document.getElementById(id)

if(!element) return

try{

const response = await fetch(file)

const html = await response.text()

element.innerHTML = html

}catch(err){

console.log("Component load error",file)

}

}


/* SAFE DOM HELPERS */

function setText(id,value){

const el = document.getElementById(id)

if(el) el.innerText = value

}

function setHref(id,value){

const el = document.getElementById(id)

if(el) el.href = value

}

function setSrc(id,value){

const el = document.getElementById(id)

if(el) el.src = value

}



/* HERO TYPE ANIMATION */

function typeEffect(element,text,speed=50){

let i=0

function typing(){

if(i < text.length){

element.innerHTML += text.charAt(i)

i++

setTimeout(typing,speed)

}

}

typing()

}



/* RADAR SKILLS CHART */

function createSkillsChart(){

const ctx = document.getElementById("skillsChart")

if(!ctx) return

new Chart(ctx,{

type:"radar",

data:{

labels:[

"AWS",

"Kubernetes",

"Terraform",

"CI/CD",

"Docker",

"Python",

"Monitoring"

],

datasets:[{

label:"Skill Level",

data:[9,8,9,9,8,7,8],

backgroundColor:"rgba(56,189,248,0.2)",

borderColor:"#38bdf8",

borderWidth:2,

pointBackgroundColor:"#38bdf8"

}]

},

options:{

plugins:{

legend:{

labels:{color:"#e2e8f0"}

}

},

scales:{

r:{

grid:{color:"#1e293b"},

angleLines:{color:"#1e293b"},

pointLabels:{color:"#e2e8f0"}

}

}

}

})

}



/* SCROLL ANIMATION */

function revealOnScroll(){

const elements = document.querySelectorAll(".section")

elements.forEach(el=>{

const windowHeight = window.innerHeight

const elementTop = el.getBoundingClientRect().top

if(elementTop < windowHeight - 100){

el.style.opacity = 1

el.style.transform = "translateY(0px)"

}

})

}

window.addEventListener("scroll",revealOnScroll)



/* LOAD PORTFOLIO */

async function loadPortfolio(){

await loadComponent("header","./components/header.html")

await loadComponent("footer","./components/footer.html")

let data

try{

const response = await fetch("./data.json")

data = await response.json()

}catch(err){

console.error("JSON load failed")

return

}



/* HERO */

setSrc("profileImage",data.personal.profileImage)

setHref("downloadResume",data.personal.resume)

setHref("linkedinBtn",data.personal.linkedin)

setHref("githubBtn",data.personal.github)

setText("title",data.personal.title)



const nameEl = document.getElementById("name")

if(nameEl){

typeEffect(nameEl,data.personal.name,80)

}

setText("tagline",data.personal.tagline)



/* HEADER */

setText("headerName",data.personal.name)

setHref("headerLinkedin",data.personal.linkedin)

setHref("headerGithub",data.personal.github)

setHref("headerEmail",data.personal.email)



/* SUMMARY */

setText("summaryText",data.summary)



/* COMPETENCIES */

const comp = document.getElementById("competenciesContainer")

if(comp && data.coreCompetencies){

comp.innerHTML = data.coreCompetencies

.map(c=>`<span class="competency">${c}</span>`)

.join("")

}



/* SKILLS */

const skills = document.getElementById("skillsContainer")

if(skills && data.skills){

let html=""

for(const category in data.skills){

html+=`<div class="skill-card"><h3>${category}</h3>`

data.skills[category].forEach(skill=>{

html+=`<span class="skill">${skill}</span>`

})

html+=`</div>`

}

skills.innerHTML = html

}



/* EXPERIENCE */

const exp = document.getElementById("experienceContainer")

if(exp && data.experience){

exp.innerHTML = data.experience.map(job=>`

<div class="experience-card">

<h3>${job.role} — ${job.company}</h3>

<p class="duration">${job.duration} | ${job.location}</p>

<ul>

${job.responsibilities.map(r=>`<li>${r}</li>`).join("")}

</ul>

</div>

`).join("")

}



/* PROJECTS */

const projects = document.getElementById("projectsContainer")

if(projects && data.projects){

projects.innerHTML = data.projects.map(p=>`

<div class="project-card">

<h3>${p.name}</h3>

<p class="category">${p.category}</p>

<p>${p.description}</p>

<p class="impact">${p.impact}</p>

<div class="tech">

${p.technologies.map(t=>`<span>${t}</span>`).join("")}

</div>

</div>

`).join("")

}



/* CERTIFICATIONS */

const cert = document.getElementById("certificationsContainer")

if(cert && data.certifications){

cert.innerHTML = data.certifications

.map(c=>`<li>${c}</li>`)

.join("")

}



/* EDUCATION */

const edu = document.getElementById("educationContainer")

if(edu && data.education){

edu.innerHTML = `

<h3>${data.education.degree} — ${data.education.field}</h3>

<p>${data.education.institution}</p>

<p>${data.education.location}</p>

<p>${data.education.year}</p>

`

}



/* ACHIEVEMENTS */

const ach = document.getElementById("achievementsContainer")

if(ach && data.achievements){

ach.innerHTML = data.achievements

.map(a=>`<li>${a}</li>`)

.join("")

}



/* FOOTER */

setText("footerName",data.personal.name)

setHref("footerLinkedin",data.personal.linkedin)

setHref("footerGithub",data.personal.github)

setHref("footerEmail",data.personal.email)



/* INIT CHART */

createSkillsChart()

}



/* INIT */

document.addEventListener("DOMContentLoaded",loadPortfolio)