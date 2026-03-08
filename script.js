/* ======================================================
DEVOPS PORTFOLIO ENGINE
Author: Shashi Kumar Singh
Elite DevOps / SRE Portfolio Controller
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

setTimeout(()=>{
this.initializeAnimations()
this.initializePipelineAnimation()
this.initializeJourneyAnimation()
},200)

},

/* ======================================================
CONSOLE BANNER
====================================================== */

consoleBanner(){

console.log(
"%c DevOps Portfolio Platform Loaded ",
"background:#38bdf8;color:#020617;font-weight:bold;padding:8px;border-radius:4px"
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

const el=document.getElementById(id)

if(el) el.innerHTML=html

}catch(e){

console.error("Component load error:",file)

}

},

/* ======================================================
LOAD DATA
====================================================== */

loadData: async function(){

try{

const res=await fetch("data.json")

this.data=await res.json()

console.log("Portfolio data loaded")

}catch(e){

console.error("Failed loading data.json")

}

},

/* ======================================================
RENDER ALL SECTIONS
====================================================== */

renderAll(){

if(!this.data) return

this.renderHero()

this.renderHeaderLinks()

this.renderFooterLinks()

this.renderMetrics()

this.renderContact()

this.renderSummary()

this.renderCompetencies()

this.renderSkills()

this.renderTools()

this.renderCompanies()

this.renderExperience()

this.renderProjects()

this.renderCertifications()

this.renderEducation()

this.renderAchievements()

this.renderTraining()

this.renderGitHubActivity()

},

/* ======================================================
UTILITY HELPERS
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

stars += i<=level ? "★":"☆"

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

this.setText("footerNameBottom",p.name)

this.setHref("footerPhone","tel:"+p.phone)

this.setText("footerPhone",p.phone)

this.setText("footerEmailText",p.email)

},

/* ======================================================
METRICS
====================================================== */

renderMetrics(){

const container=document.querySelector(".metrics-container")

if(!container || !this.data.metrics) return

container.innerHTML=this.data.metrics.map(m=>`

<div class="metric">

<h3 class="metric-number" data-value="${m.value.replace('+','')}">0</h3>

<p>${m.label}</p>

</div>

`).join("")

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

if(!container) return

let html=""

for(const category in this.data.skills){

html+=`<div class="skill-card"><h3>${category}</h3>`

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
TOOLS ECOSYSTEM (WITH ICON SUPPORT)
====================================================== */

renderTools(){

const container=document.getElementById("toolsContainer")

if(!container) return

let tools=[]

for(const cat in this.data.skills){

this.data.skills[cat].forEach(s=>tools.push(s.name))

}

tools=[...new Set(tools)]

container.innerHTML=tools.map(t=>{

const icon=t.toLowerCase().replace(/\s/g,"-")

return `

<div class="tool-card">

<img src="assets/tools/${icon}.png" alt="${t}" class="tool-icon">

<span>${t}</span>

</div>

`

}).join("")

},

/* ======================================================
COMPANY JOURNEY
====================================================== */

renderCompanies(){

const container=document.getElementById("companyJourney")

if(!container || !this.data.companies) return

container.innerHTML=this.data.companies.map((c,i)=>`

<div class="company-node">

<img src="${c.logo}" alt="${c.name}" class="company-icon">

<p>${c.name}</p>

</div>

${i < this.data.companies.length-1 ? `<div class="company-route-line"></div>` : ""}

`).join("")

},

/* ======================================================
EXPERIENCE
====================================================== */

renderExperience(){

const container=document.getElementById("experienceContainer")

if(!container) return

container.innerHTML=this.data.experience.map(job=>`

<div class="experience-card">

<div class="experience-header">

<img src="${job.logo}" class="company-logo">

<div>

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

if(!container) return

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

if(!container) return

container.innerHTML=this.data.certifications
.map(c=>`<li>${c}</li>`)
.join("")

},

/* ======================================================
EDUCATION
====================================================== */

renderEducation(){

const e=this.data.education

const container=document.getElementById("educationContainer")

if(!container) return

container.innerHTML=`

<h3>${e.degree}</h3>
<p>${e.institution}</p>
<p>${e.year}</p>

`

},

/* ======================================================
ACHIEVEMENTS
====================================================== */

renderAchievements(){

const container=document.getElementById("achievementsContainer")

if(!container) return

container.innerHTML=this.data.achievements
.map(a=>`<li>${a}</li>`)
.join("")

},

/* ======================================================
TRAINING
====================================================== */

renderTraining(){

const container=document.getElementById("trainingContainer")

if(!container || !this.data.training) return

container.innerHTML=this.data.training.map(t=>`

<div class="training-card">

<h3>${t.role}</h3>
<h4>${t.organization}</h4>
<p>${t.description}</p>

</div>

`).join("")

},

/* ======================================================
GITHUB ACTIVITY
====================================================== */

renderGitHubActivity(){

const graph=document.querySelector(".github-graph img")

if(!graph) return

const username=this.data.personal.github.split("/").pop()

graph.src=`https://ghchart.rshah.org/38bdf8/${username}`

},

/* ======================================================
INTERACTIONS
====================================================== */

initializeInteractions(){

document.querySelectorAll("a[href^='#']").forEach(link=>{

link.addEventListener("click",function(e){

e.preventDefault()

const target=document.querySelector(this.getAttribute("href"))

if(target){

target.scrollIntoView({behavior:"smooth"})

}

})

})

},

/* ======================================================
METRIC COUNTER ANIMATION
====================================================== */

initializeAnimations(){

const counters=document.querySelectorAll(".metric-number")

counters.forEach(counter=>{

const target=+counter.dataset.value

let count=0

const speed=20

const update=()=>{

count++

counter.innerText=count

if(count<target){

setTimeout(update,speed)

}

}

update()

})

},

/* ======================================================
PIPELINE ANIMATION
====================================================== */

initializePipelineAnimation(){

const nodes=document.querySelectorAll(".pipeline-node")

nodes.forEach((node,i)=>{

setTimeout(()=>{

node.classList.add("pipeline-active")

},i*400)

})

},

/* ======================================================
CAREER JOURNEY ANIMATION
====================================================== */

initializeJourneyAnimation(){

const nodes=document.querySelectorAll(".company-node")

nodes.forEach((node,i)=>{

setTimeout(()=>{

node.classList.add("journey-visible")

},i*500)

})

}

}

/* ======================================================
START APPLICATION
====================================================== */

document.addEventListener("DOMContentLoaded",()=>{

App.init()

})
