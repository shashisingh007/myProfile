async function loadComponent(id, file) {
  const response = await fetch(file)
  const text = await response.text()
  document.getElementById(id).innerHTML = text
}

async function loadPortfolio() {

  await loadComponent("header", "./components/header.html")
  await loadComponent("footer", "./components/footer.html")

  const response = await fetch("./data.json")
  const data = await response.json()

  // helper function to safely get element
  const el = (id) => document.getElementById(id)

  // HERO SECTION
  if (el("name")) el("name").innerText = data.personal.name
  if (el("title")) el("title").innerText = data.personal.title
  if (el("tagline")) el("tagline").innerText = data.personal.tagline

  if (el("profileImage")) el("profileImage").src = data.personal.profileImage

  if (el("downloadResume")) el("downloadResume").href = data.personal.resume

  if (el("linkedinBtn")) el("linkedinBtn").href = data.personal.linkedin
  if (el("githubBtn")) el("githubBtn").href = data.personal.github


  // HEADER LINKS
  if (el("headerName")) el("headerName").innerText = data.personal.name

  if (el("headerLinkedin")) el("headerLinkedin").href = data.personal.linkedin
  if (el("headerGithub")) el("headerGithub").href = data.personal.github
  if (el("headerEmail")) el("headerEmail").href = data.personal.email


  // SUMMARY
  if (el("summary")) el("summary").innerText = data.summary


  // CORE COMPETENCIES
  if (data.coreCompetencies && el("competenciesContainer")) {

    let compHTML = ""

    data.coreCompetencies.forEach(c => {
      compHTML += `<span class="competency">${c}</span>`
    })

    el("competenciesContainer").innerHTML = compHTML
  }


  // SKILLS
  if (data.skills && el("skillsContainer")) {

    let skillHTML = ""

    for (const category in data.skills) {

      skillHTML += `<div class="skill-card">
      <h3>${category}</h3>`

      data.skills[category].forEach(skill => {
        skillHTML += `<span class="skill">${skill}</span>`
      })

      skillHTML += `</div>`
    }

    el("skillsContainer").innerHTML = skillHTML
  }


  // EXPERIENCE
  if (data.experience && el("experienceContainer")) {

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

    el("experienceContainer").innerHTML = expHTML
  }


  // PROJECTS
  if (data.projects && el("projectsContainer")) {

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

    el("projectsContainer").innerHTML = projHTML
  }


  // CERTIFICATIONS
  if (data.certifications && el("certificationsContainer")) {

    let certHTML = ""

    data.certifications.forEach(cert => {
      certHTML += `<li>${cert}</li>`
    })

    el("certificationsContainer").innerHTML = certHTML
  }


  // EDUCATION
  if (data.education && el("educationContainer")) {

    el("educationContainer").innerHTML = `
      <h3>${data.education.degree} — ${data.education.field}</h3>
      <p>${data.education.institution}</p>
      <p>${data.education.location}</p>
      <p>${data.education.year}</p>
    `
  }


  // ACHIEVEMENTS
  if (data.achievements && el("achievementsContainer")) {

    let achHTML = ""

    data.achievements.forEach(a => {
      achHTML += `<li>${a}</li>`
    })

    el("achievementsContainer").innerHTML = achHTML
  }


  // FOOTER
  if (el("footerName")) el("footerName").innerText = data.personal.name

  if (el("footerLinkedin")) el("footerLinkedin").href = data.personal.linkedin
  if (el("footerGithub")) el("footerGithub").href = data.personal.github
  if (el("footerEmail")) el("footerEmail").href = data.personal.email

}

loadPortfolio()