const projectsContainer = document.querySelector('#projectsContainer')
const header = document.querySelector('#header')

let prevY = window.pageYOffset;

let projects;

const getProjects = async () => {
  return fetch('/Baichik.github.io/static/projects.json')
    .then(response => response.json())
    .then(data => projects = data)
    .catch(e => console.error(e))
}

const ProjectCard = (title, description, links) => {
  const projectCard = document.createElement('div')
  projectCard.classList.add('project-card')
  projectCard.classList.add('flex-column')

  const titleElement = document.createElement('div')
  titleElement.classList.add('title')
  titleElement.innerHTML = title

  const descriptionElement = document.createElement('div')
  descriptionElement.classList.add('description')
  descriptionElement.innerHTML = description

  const linksElement = document.createElement('div')
  linksElement.classList.add('links')

  const githubLink = document.createElement('a')
  const icon = document.createElement('i')

  icon.classList.add('fab')
  icon.classList.add('fa-github')
  icon.classList.add('link-icon')
  githubLink.appendChild(icon)
  githubLink.setAttribute('href', links[0])

  linksElement.appendChild(githubLink)

  if (links[1]) {
    const firebaseLink = document.createElement('a')
    const icon = document.createElement('i')

    icon.classList.add('fas')
    icon.classList.add('fa-database')
    icon.classList.add('link-icon')
    firebaseLink.appendChild(icon)
    firebaseLink.setAttribute('href', links[1])

    linksElement.appendChild(firebaseLink)
  }

  projectCard.appendChild(titleElement)
  projectCard.appendChild(descriptionElement)
  projectCard.appendChild(linksElement)

  return projectCard
}

const initProjects = async () => {
  await getProjects()
  projects.map((project) => {
    projectsContainer.appendChild(ProjectCard(project.title, project.description, project.links))
  })
}

initProjects()

const onScroll = () => {

  let currentY = window.pageYOffset

  if (currentY > prevY) {
    header.style.top = '-100px'
  } else {
    header.style.top = '0'
  }

  prevY = currentY
}

window.addEventListener('scroll', onScroll)