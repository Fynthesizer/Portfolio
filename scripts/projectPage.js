// Automatically populates the project page with the project data

let projectData;

const body = document.getElementsByTagName("body")[0];
const projectID = body.getAttribute("data-project-id");

const titleElement = document.querySelector("#project-title");
const subtitleElement = document.querySelector("#project-subtitle");

document.addEventListener("DOMContentLoaded", loadProjects, false);

async function loadProjects() {
  const response = await fetch("/scripts/projects.json");
  projectData = await response.json();
  const project = projectData.find((project) => {
    return project.id === projectID;
  });
  titleElement.innerHTML = project.title;
  subtitleElement.innerHTML = project.description;
}
