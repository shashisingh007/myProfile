/* ======================================================
DEVOPS PORTFOLIO ENGINE
Author: Shashi Kumar Singh
Architecture: Modular Frontend Controller
====================================================== */

const App = {

data:null,


/* ======================================================
INITIALIZE APPLICATION
====================================================== */

init: async function(){

this.consoleBanner()

await this.loadComponents()

await this.loadData()

this.renderAll()

this.initializeInteractions()

},



/* ======================================================
CONSOLE BANNER
====================================================== */

consoleBanner(){

console.log(
"%c DevOps Portfolio Engine Loaded ",
"background:#0ea5e9;color:#020617;font-weight:bold;padding:6px;border-radius:4px"
)

},



/* ======================================================
LOAD COMPONENTS
====================================================== */

loadComponents: async function(){

await Promise.all([

this.loadComponent("header","components/header.html"),
this.loadComponent("footer","components/footer.html")

])

},



loadComponent: async function(id,file){

try{

const res=await fetch(file)

const html=await res.text()

document.getElementById(id).innerHTML=html

}

catch(e){

console.error("Component load error:",file)

}

},



/* ======================================================
LOAD DATA.JSON
====================================================== */

loadData: async function(){

try{

const res=await fetch("data.json")

this.data=await res.json()

console.log("Portfolio data loaded")

}

catch(e){

console.error("data.json failed to load")

}

},



/* ======================================================
RENDER EVERYTHING
====================================================== */

renderAll(){

if(!this.data) return

this.renderHero()

this.renderHeaderLinks()

this.renderFooterLinks()

this.renderContact()

this.renderSummary()

this.renderCompetencies()

this.renderSkills()

this.renderTools()

this.renderExperience()

this.renderProjects()

this.renderCertifications()

this.renderEducation()

this.renderAchievements()

this.renderTraining()

this.renderGitHubActivity()

},



/* ======================================================
UTILITY FUNCTIONS
====================================================== */

setText(id,value){

const el=document.getElementById(id)

if(el) el.innerText=value

},

setHref(id,value){

const el=document.getElementById(id)

if(el) el.href=value

},

setSrc(id,value){

const el=document.getElementById(id)

if(el) el.src=value

},

stars(level){

let stars=""

for(let i=1;i<=5;i++){

stars+= i<=level ? "★":"☆"

}

return stars

},



/* ======================================================
HERO
====================================================== */

renderHero(){

const p=this.data.personal

this.setText("name",p.name)
this.setText("title",p.title)
this.setText("tagline",p.tagline)

this.setSrc("profileImage",p.profileImage)

this.setHref("downloadResume",p.resume)

this.setHref("linkedinBtn",p.linkedin)
this.setHref("githubBtn",p.github)
this.setHref("whatsappBtn",p.whatsapp)

},



/* ======================================================
HEADER LINKS
====================================================== */

renderHeaderLinks(){

const p=this.data.personal

this.setText("headerName",p.name)

this.setHref("headerLinkedin",p.linkedin)
this.setHref("headerGithub",p.github)
this.setHref("headerEmail","mailto:"+p.email)
this.setHref("headerWhatsapp",p.whatsapp)

},



/* ======================================================
FOOTER LINKS
====================================================== */

renderFooterLinks(){

const p=this.data.personal

this.setText("footerName",p.name)

this.setHref("footerLinkedin",p.linkedin)
this.setHref("footerGithub",p.github)
this.setHref("footerEmail","mailto:"+p.email)
this.setHref("footerWhatsapp",p.whatsapp)

},



/* ======================================================
CONTACT BAR
====================================================== */

renderContact(){

const p=this.data.personal

this.setText("emailText",p.email)
this.setText("phoneText",p.phone)
this.setText("locationText",p.location)

this.setHref("contactEmailBtn","mailto:"+p.email)
this.setHref("contactLinkedinBtn",p.linkedin)
this.setHref("contactGithubBtn",p.github)

},



/* ======================================================
SUMMARY
====================================================== */

renderSummary(){

this.setText("summaryText",this.data.summary)

},



/* ======================================================
COMPETENCIES
====================================================== */

renderCompetencies(){

const container=document.getElementById("competenciesContainer")

if(!container) return

container.innerHTML=this.data.coreCompetencies

.map(c=>`<span class="competency">${c}</span>`)

.join("")

},



/* ======================================================
SKILLS
====================================================== */

renderSkills(){

const container=document.getElementById("skillsContainer")

let html=""

for(const category in this.data.skills){

html+=`

<div class="skill-card">

<h3>${category}</h3>

`

this.data.skills[category].forEach(skill=>{

html+=`

<div class="skill">

<span>${skill.name}</span>

<span class="skill-stars">${this.stars(skill.level)}</span>

</div>

`

})

html+=`</div>`

}

container.innerHTML=html

},



/* ======================================================
DEVOPS TOOLS GRID
====================================================== */

renderTools(){

const container=document.getElementById("toolsContainer")

let tools=[]

for(const cat in this.data.skills){

this.data.skills[cat].forEach(s=>tools.push(s.name))

}

tools=[...new Set(tools)]

container.innerHTML=tools.map(t=>

`<div class="tool-card">

<span>${t}</span>

</div>`

).join("")

},



/* ======================================================
EXPERIENCE
====================================================== */

renderExperience(){

const container=document.getElementById("experienceContainer")

container.innerHTML=this.data.experience.map(job=>`

<div class="experience-card">

<div class="experience-header">

<img src="${job.logo}" class="company-logo">

<div class="experience-meta">

<h3>${job.role}</h3>
<h4>${job.company}</h4>
<p class="duration">${job.duration}</p>

</div>

</div>

<ul>

${job.responsibilities.map(r=>`<li>${r}</li>`).join("")}

</ul>

</div>

`).join("")

},



/* ======================================================
PROJECTS
====================================================== */

renderProjects(){

const container=document.getElementById("projectsContainer")

container.innerHTML=this.data.projects.map(p=>`

<div class="project-card">

<h3>${p.name}</h3>

<p>${p.description}</p>

<div class="tech">

${p.technologies.map(t=>`<span class="tech-badge">${t}</span>`).join("")}

</div>

</div>

`).join("")

},



/* ======================================================
CERTIFICATIONS
====================================================== */

renderCertifications(){

const container=document.getElementById("certificationsContainer")

container.innerHTML=this.data.certifications

.map(c=>`<li>${c}</li>`)

.join("")

},



/* ======================================================
EDUCATION
====================================================== */

renderEducation(){

const e=this.data.education

document.getElementById("educationContainer").innerHTML=

`<h3>${e.degree}</h3>
<p>${e.institution}</p>
<p>${e.year}</p>`

},



/* ======================================================
ACHIEVEMENTS
====================================================== */

renderAchievements(){

const container=document.getElementById("achievementsContainer")

container.innerHTML=this.data.achievements

.map(a=>`<li>${a}</li>`)

.join("")

},



/* ======================================================
TRAINING
====================================================== */

renderTraining(){

const container=document.getElementById("trainingContainer")

if(!this.data.training) return

container.innerHTML=this.data.training.map(t=>`

<div class="training-card">

<h3>${t.role}</h3>
<h4>${t.organization}</h4>
<p>${t.description}</p>

</div>

`).join("")

},



/* ======================================================
GITHUB ACTIVITY GRAPH
====================================================== */

renderGitHubActivity(){

const graph=document.querySelector(".github-graph img")

if(!graph) return

graph.src=`https://ghchart.rshah.org/38bdf8/${this.data.personal.githubUser}`

},



/* ======================================================
INTERACTIONS
====================================================== */

initializeInteractions(){

this.enableSmoothScroll()

this.highlightNavigation()

},



/* ======================================================
SMOOTH SCROLL
====================================================== */

enableSmoothScroll(){

document.querySelectorAll("a[href^='#']").forEach(link=>{

link.addEventListener("click",function(e){

e.preventDefault()

document.querySelector(this.getAttribute("href"))

.scrollIntoView({

behavior:"smooth"

})

})

})

},



/* ======================================================
ACTIVE NAVIGATION
====================================================== */

highlightNavigation(){

const sections=document.querySelectorAll("section")

const navLinks=document.querySelectorAll(".nav-links a")

window.addEventListener("scroll",()=>{

let current=""

sections.forEach(sec=>{

const top=sec.offsetTop-120

if(scrollY>=top) current=sec.getAttribute("id")

})

navLinks.forEach(a=>{

a.classList.remove("active")

if(a.getAttribute("href")==="#"+current){

a.classList.add("active")

}

})

})

}

}



/* ======================================================
START APP
====================================================== */

document.addEventListener("DOMContentLoaded",()=>{

App.init()

})