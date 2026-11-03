function renderProjectMarkdown(markdown) {
  const fragment = document.createDocumentFragment();
  let paragraph = [];
  let list;

  function appendInlineMarkdown(element, text) {
    const markdownPattern = /(!?)\[([^\]]*)\]\(([^)]+)\)/g;
    let position = 0;
    let match;

    while ((match = markdownPattern.exec(text))) {
      element.appendChild(document.createTextNode(text.slice(position, match.index)));
      let url;
      try {
        url = new URL(match[3], window.location.origin);
      } catch {
        url = null;
      }

      if (match[1] === '!' && url && ['http:', 'https:'].includes(url.protocol)) {
        const image = document.createElement('img');
        image.src = url.href;
        image.alt = match[2];
        image.loading = 'lazy';
        image.decoding = 'async';
        element.appendChild(image);
      } else if (!match[1] && url && ['http:', 'https:', 'mailto:'].includes(url.protocol)) {
        const link = document.createElement('a');
        link.href = url.href;
        link.textContent = match[2];
        if (url.protocol !== 'mailto:' && url.origin !== window.location.origin) {
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
        }
        element.appendChild(link);
      } else {
        element.appendChild(document.createTextNode(match[0]));
      }
      position = markdownPattern.lastIndex;
    }

    element.appendChild(document.createTextNode(text.slice(position)));
  }

  function flushParagraph() {
    if (!paragraph.length) return;
    const element = document.createElement('p');
    appendInlineMarkdown(element, paragraph.join(' '));
    fragment.appendChild(element);
    paragraph = [];
  }

  markdown.split(/\r?\n/).forEach(line => {
    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    const listItem = line.match(/^\s*[-*]\s+(.+)$/);

    if (!line.trim()) {
      flushParagraph();
      list = null;
    } else if (heading) {
      flushParagraph();
      list = null;
      const element = document.createElement(`h${heading[1].length}`);
      element.textContent = heading[2];
      fragment.appendChild(element);
    } else if (listItem) {
      flushParagraph();
      if (!list) {
        list = document.createElement('ul');
        fragment.appendChild(list);
      }
      const element = document.createElement('li');
      appendInlineMarkdown(element, listItem[1]);
      list.appendChild(element);
    } else {
      list = null;
      paragraph.push(line.trim());
    }
  });

  flushParagraph();
  return fragment;
}

async function loadProjectPage() {
  const page = document.querySelector('.project-page');
  const slug = page.dataset.projectSlug;

  try {
    const response = await fetch(`/_projects/${encodeURIComponent(slug)}.json`);
    if (!response.ok) throw new Error(`Failed to load project: ${slug}`);
    const project = await response.json();

    document.title = `${project.title} | Future Inventions Lab`;
    document.querySelector('.project-title').textContent = project.title;
    document.querySelector('.project-body').replaceChildren(
      renderProjectMarkdown(project.body)
    );

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
