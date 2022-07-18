let projectData;
let portfolioGrid = document.getElementById("portfolio-grid");

const loadEvent = new Event("projectsLoaded");

document.addEventListener("DOMContentLoaded", loadProjects, false);

async function loadProjects() {
  const response = await fetch("/scripts/projects.json");
  projectData = await response.json();
  createPortfolio(projectData).then(document.dispatchEvent(loadEvent));
}

function createPortfolio(projects) {
  return new Promise((resolve) => {
    projects.forEach((project) => createItem(project));
    resolve("resolved");
  });
}

function createItem(project) {
  //Main div
  if (project.show) {
    const item = document.createElement("div");
    item.setAttribute("id", project.id);
    item.classList.add("portfolio-item");
    item.classList.add("show");
    project.categories.forEach((category) => item.classList.add(category));

    //Anchor
    const anchor = document.createElement("a");
    anchor.setAttribute("href", `works/${project.id}.html`);
    item.appendChild(anchor);

    //Thumbnail
    const thumbnail = document.createElement("img");
    thumbnail.setAttribute("src", project.thumbnail);
    anchor.appendChild(thumbnail);

    //Overlay
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    anchor.appendChild(overlay);
    const overlayText = document.createElement("div");
    overlayText.classList.add("overlay-text");
    overlay.appendChild(overlayText);

    //Header
    const header = document.createElement("div");
    header.classList.add("overlay-header");
    overlayText.appendChild(header);
    const title = document.createElement("div");
    title.classList.add("overlay-title");
    title.textContent = project.title;
    header.appendChild(title);
    const description = document.createElement("div");
    description.classList.add("overlay-description");
    description.textContent = project.description;
    header.appendChild(description);

    //Credits
    const credits = document.createElement("div");
    credits.classList.add("overlay-credits");
    credits.textContent = project.credits;
    overlayText.appendChild(credits);

    portfolioGrid.appendChild(item);
  }
}
