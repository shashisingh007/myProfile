async function loadComponent(id, file) {
  const element = document.getElementById(id)
  if (!element) return

  try {
    const response = await fetch(file)
    const text = await response.text()
    element.innerHTML = text
  } catch (err) {
    console.error("Error loading component:", file, err)
  }
}

function setText(id, value) {
  const el = document.getElementById(id)
  if (el) el.innerText = value
}

function setHref(id, value) {
  const el = document.getElementById(id)
  if (el) el.href = value
}

function setSrc(id, value) {
  const el = document.getElementById(id)
  if (el) el.src = value
}

async function loadPortfolio() {

  await loadComponent("header", "./components/header.html")
  await loadComponent("footer", "./components/footer.html")

  let data
  try {
    const response = await fetch("./data.json")
    data = await response.json()
  } catch (err) {
    console.error("Error loading JSON", err)
    return
  }

  // HERO
  setText("name", data.personal.name)
  setText("title", data.personal.title)
  setText("tagline", data.personal.tagline)

  setSrc("profileImage", data.personal.profileImage)

  setHref("downloadResume", data.personal.resume)
  setHref("linkedinBtn", data.personal.linkedin)
  setHref("githubBtn", data.personal.github)

  // HEADER
  setText("headerName", data.personal.name)
  setHref("headerLinkedin", data.personal.linkedin)
  setHref("headerGithub", data.personal.github)
  setHref("headerEmail", data.personal.email)

  // SUMMARY
  setText("summary", data.summary)

  // COMPETENCIES
  const compContainer = document.getElementById("competenciesContainer")
  if (compContainer && data.coreCompetencies) {
    compContainer.innerHTML = data.coreCompetencies
      .map(c => `<span class="competency">${c}</span>`)
      .join("")
  }

  // SKILLS
  const skillsContainer = document.getElementById("skillsContainer")
  if (skillsContainer && data.skills) {

    let html = ""

    for (const category in data.skills) {

      html += `<div class="skill-card"><h3>${category}</h3>`

      data.skills[category].forEach(skill => {
        html += `<span class="skill">${skill}</span>`
      })

      html += `</div>`
    }

    skillsContainer.innerHTML = html
  }

  // EXPERIENCE
  const expContainer = document.getElementById("experienceContainer")
  if (expContainer && data.experience) {

    expContainer.innerHTML = data.experience.map(job => `

      <div class="experience-card">

        <h3>${job.role} — ${job.company}</h3>

        <p class="duration">${job.duration} | ${job.location}</p>

        <ul>
          ${job.responsibilities.map(r => `<li>${r}</li>`).join("")}
        </ul>

      </div>

    `).join("")
  }

  // PROJECTS
  const projContainer = document.getElementById("projectsContainer")
  if (projContainer && data.projects) {

    projContainer.innerHTML = data.projects.map(project => `

      <div class="project-card">

        <h3>${project.name}</h3>

        <p class="category">${project.category}</p>

        <p>${project.description}</p>

        <p class="impact">${project.impact}</p>

        <div class="tech">

          ${project.technologies.map(t => `<span>${t}</span>`).join("")}

        </div>

      </div>

    `).join("")
  }

  // CERTIFICATIONS
  const certContainer = document.getElementById("certificationsContainer")
  if (certContainer && data.certifications) {

    certContainer.innerHTML = data.certifications
      .map(cert => `<li>${cert}</li>`)
      .join("")
  }

  // EDUCATION
  const eduContainer = document.getElementById("educationContainer")
  if (eduContainer && data.education) {

    eduContainer.innerHTML = `

      <h3>${data.education.degree} — ${data.education.field}</h3>

      <p>${data.education.institution}</p>

      <p>${data.education.location}</p>

      <p>${data.education.year}</p>

    `
  }

  // ACHIEVEMENTS
  const achContainer = document.getElementById("achievementsContainer")
  if (achContainer && data.achievements) {

    achContainer.innerHTML = data.achievements
      .map(a => `<li>${a}</li>`)
      .join("")
  }

  // FOOTER
  setText("footerName", data.personal.name)
  setHref("footerLinkedin", data.personal.linkedin)
  setHref("footerGithub", data.personal.github)
  setHref("footerEmail", data.personal.email)

}

document.addEventListener("DOMContentLoaded", loadPortfolio)