/* LOAD COMPONENTS */

async function loadComponent(id,file){

const element=document.getElementById(id)

if(!element) return

try{

const response=await fetch(file)

const html=await response.text()

element.innerHTML=html

}catch(err){

console.log("Component load error",file)

}

}


/* SAFE DOM HELPERS */

function setText(id,value){

const el=document.getElementById(id)

if(el) el.innerText=value

}

function setHref(id,value){

const el=document.getElementById(id)

if(el) el.href=value

}

function setSrc(id,value){

const el=document.getElementById(id)

if(el) el.src=value

}



/* STAR GENERATOR */

function generateStars(level){

let stars=""

for(let i=1;i<=5;i++){

if(i<=level){

stars+="★"

}else{

stars+="☆"

}

}

return stars

}



/* LOAD PORTFOLIO */

async function loadPortfolio(){

await loadComponent("header","./components/header.html")

await loadComponent("footer","./components/footer.html")

let data

try{

const response=await fetch("./data.json")

data=await response.json()

}catch(err){

console.error("JSON load error")

return

}



/* HERO */

setSrc("profileImage",data.personal.profileImage)

setHref("downloadResume",data.personal.resume)

setHref("linkedinBtn",data.personal.linkedin)

setHref("githubBtn",data.personal.github)

setText("name",data.personal.name)

setText("title",data.personal.title)

setText("tagline",data.personal.tagline)



/* HEADER */

setText("headerName",data.personal.name)

setHref("headerLinkedin",data.personal.linkedin)

setHref("headerGithub",data.personal.github)

setHref("headerEmail",data.personal.email)



/* SUMMARY */

setText("summaryText",data.summary)



/* COMPETENCIES */

const comp=document.getElementById("competenciesContainer")

if(comp && data.coreCompetencies){

comp.innerHTML=data.coreCompetencies
.map(c=>`<span class="competency">${c}</span>`)
.join("")

}



/* SKILLS WITH STAR RATING */

const skills=document.getElementById("skillsContainer")

if(skills && data.skills){

let html=""

for(const category in data.skills){

html+=`<div class="skill-card"><h3>${category}</h3>`

data.skills[category].forEach(skill=>{

let level=3

if(skill.toLowerCase().includes("aws")) level=5
if(skill.toLowerCase().includes("terraform")) level=5
if(skill.toLowerCase().includes("kubernetes")) level=4
if(skill.toLowerCase().includes("docker")) level=4
if(skill.toLowerCase().includes("python")) level=3
if(skill.toLowerCase().includes("jenkins")) level=4

html+=`

<div class="skill">

<span>${skill}</span>

<span class="skill-stars">${generateStars(level)}</span>

</div>

`

})

html+=`</div>`

}

skills.innerHTML=html

}



/* EXPERIENCE TIMELINE */

const exp=document.getElementById("experienceContainer")

if(exp && data.experience){

exp.innerHTML=data.experience.map(job=>`

<div class="timeline-item">

<div class="timeline-dot"></div>

<div class="timeline-content">

<h3>${job.role}</h3>

<h4>${job.company}</h4>

<p class="duration">${job.duration} | ${job.location}</p>

<ul>

${job.responsibilities.map(r=>`<li>${r}</li>`).join("")}

</ul>

</div>

</div>

`).join("")

}



/* PROJECTS */

const projects=document.getElementById("projectsContainer")

if(projects && data.projects){

projects.innerHTML=data.projects.map(p=>`

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

const cert=document.getElementById("certificationsContainer")

if(cert && data.certifications){

cert.innerHTML=data.certifications
.map(c=>`<li>${c}</li>`)
.join("")

}



/* EDUCATION */

const edu=document.getElementById("educationContainer")

if(edu && data.education){

edu.innerHTML=`

<h3>${data.education.degree} — ${data.education.field}</h3>

<p>${data.education.institution}</p>

<p>${data.education.location}</p>

<p>${data.education.year}</p>

`

}



/* ACHIEVEMENTS */

const ach=document.getElementById("achievementsContainer")

if(ach && data.achievements){

ach.innerHTML=data.achievements
.map(a=>`<li>${a}</li>`)
.join("")

}



/* FOOTER */

setText("footerName",data.personal.name)

setHref("footerLinkedin",data.personal.linkedin)

setHref("footerGithub",data.personal.github)

setHref("footerEmail",data.personal.email)

}



/* INIT */

document.addEventListener("DOMContentLoaded",loadPortfolio)