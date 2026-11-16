async function loadProjectPage() {
  const page = document.querySelector('.project-page');
  const slug = page.dataset.projectSlug;

  try {
    const response = await fetch(`/_projects/${encodeURIComponent(slug)}.json`);
    if (!response.ok) throw new Error(`Failed to load project: ${slug}`);
    const project = await response.json();

    document.title = `${project.title} | Future Inventions Lab`;
    document.querySelector('.project-title').textContent = project.title;
    document.querySelector('.project-body').replaceChildren(renderPageMarkdown(project.body));

    if (project.thumbnail) {
      const image = document.querySelector('.project-image-content');
      image.alt = project.title;
      image.addEventListener('error', () => {
        image.hidden = true;
        document.querySelector('.project-image-placeholder').hidden = false;
      }, { once: true });
      image.src = project.thumbnail;
      image.hidden = false;
      document.querySelector('.project-image-placeholder').hidden = true;
    }
  } catch (error) {
    console.error(error);
    document.querySelector('.project-body').textContent = 'This project page could not be loaded.';
  }
}

loadProjectPage();
