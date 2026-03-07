async function loadComponent(id, file) {
  const response = await fetch(file)
  const text = await response.text()
  document.getElementById(id).innerHTML = text
}

async function loadPortfolio() {

  await loadComponent("header", "components/header.html")
  await loadComponent("footer", "components/footer.html")

  const response = await fetch("data.json")
  const data = await response.json()

  // HERO SECTION

  document.getElementById("name").innerText = data.personal.name
  document.getElementById("title").innerText = data.personal.title
  document.getElementById("tagline").innerText = data.personal.tagline

  document.getElementById("profileImage").src = data.personal.profileImage

  document.getElementById("downloadResume").href = data.personal.resume

  document.getElementById("linkedinBtn").href = data.personal.linkedin
  document.getElementById("githubBtn").href = data.personal.github


  // HEADER LINKS

  document.getElementById("headerName").innerText = data.personal.name

  document.getElementById("headerLinkedin").href = data.personal.linkedin
  document.getElementById("headerGithub").href = data.personal.github
  document.getElementById("headerEmail").href = data.personal.email


  // SUMMARY

  document.getElementById("summary").innerText = data.summary


  // CORE COMPETENCIES

  let compHTML = ""

  data.coreCompetencies.forEach(c => {

    compHTML += `<span class="competency">${c}</span>`

  })

  document.getElementById("competenciesContainer").innerHTML = compHTML


  // SKILLS

  let skillHTML = ""

  for (const category in data.skills) {

    skillHTML += `<div class="skill-card">

      <h3>${category}</h3>`

    data.skills[category].forEach(skill => {

      skillHTML += `<span class="skill">${skill}</span>`

    })

    skillHTML += `</div>`
  }

  document.getElementById("skillsContainer").innerHTML = skillHTML


  // EXPERIENCE

  let expHTML = ""

  data.experience.forEach(job => {

    expHTML += `<div class="experience-card">

      <h3>${job.role} — ${job.company}</h3>

      <p class="duration">${job.duration} | ${job.location}</p>

      <ul>`

    job.responsibilities.forEach(r => {

      expHTML += `<li>${r}</li>`

    })

    expHTML += `</ul></div>`

  })

  document.getElementById("experienceContainer").innerHTML = expHTML


  // PROJECTS

  let projHTML = ""

  data.projects.forEach(project => {

    projHTML += `<div class="project-card">

      <h3>${project.name}</h3>

      <p class="category">${project.category}</p>

      <p>${project.description}</p>

      <p class="impact">${project.impact}</p>

      <div class="tech">`

    project.technologies.forEach(t => {

      projHTML += `<span>${t}</span>`

    })

    projHTML += `</div></div>`

  })

  document.getElementById("projectsContainer").innerHTML = projHTML


  // CERTIFICATIONS

  let certHTML = ""

  data.certifications.forEach(cert => {

    certHTML += `<li>${cert}</li>`

  })

  document.getElementById("certificationsContainer").innerHTML = certHTML


  // EDUCATION

  document.getElementById("educationContainer").innerHTML =

    `<h3>${data.education.degree} — ${data.education.field}</h3>
     <p>${data.education.institution}</p>
     <p>${data.education.location}</p>
     <p>${data.education.year}</p>`


  // ACHIEVEMENTS

  let achHTML = ""

  data.achievements.forEach(a => {

    achHTML += `<li>${a}</li>`

  })

  document.getElementById("achievementsContainer").innerHTML = achHTML


  // FOOTER

  document.getElementById("footerName").innerText = data.personal.name

  document.getElementById("footerLinkedin").href = data.personal.linkedin
  document.getElementById("footerGithub").href = data.personal.github
  document.getElementById("footerEmail").href = data.personal.email

}

loadPortfolio()