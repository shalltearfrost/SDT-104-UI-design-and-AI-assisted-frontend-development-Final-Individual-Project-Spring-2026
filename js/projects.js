(() => {
  'use strict';

  // ---------- Data ----------

  const PROJECTS = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'Web Design',
      description: 'Modern e-commerce solution with seamless checkout experience',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1080&q=80',
      tags: ['React', 'Tailwind', 'Figma'],
      year: '2024',
    },
    {
      id: 2,
      title: 'Banking Mobile App',
      category: 'Mobile Design',
      description: 'Secure and intuitive mobile banking experience',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1080&q=80',
      tags: ['iOS', 'Android', 'Figma'],
      year: '2024',
    },
    {
      id: 3,
      title: 'EcoLife Brand Identity',
      category: 'Branding',
      description: 'Complete brand identity for sustainable lifestyle company',
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1080&q=80',
      tags: ['Logo', 'Guidelines', 'Illustrator'],
      year: '2023',
    },
    {
      id: 4,
      title: 'Dashboard UI Kit',
      category: 'UI/UX',
      description: 'Comprehensive admin dashboard with analytics',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1080&q=80',
      tags: ['Dashboard', 'Analytics', 'Figma'],
      year: '2024',
    },
    {
      id: 5,
      title: 'Fitness Tracking App',
      category: 'Mobile Design',
      description: 'Health and wellness app with personalized workouts',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1080&q=80',
      tags: ['React Native', 'Health', 'Figma'],
      year: '2023',
    },
    {
      id: 6,
      title: 'Restaurant Website',
      category: 'Web Design',
      description: 'Beautiful restaurant website with online ordering',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1080&q=80',
      tags: ['Next.js', 'Ordering', 'Figma'],
      year: '2023',
    },
    {
      id: 7,
      title: 'SaaS Product Design',
      category: 'UI/UX',
      description: 'Enterprise SaaS platform for team collaboration',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1080&q=80',
      tags: ['SaaS', 'Enterprise', 'Figma'],
      year: '2024',
    },
    {
      id: 8,
      title: 'Travel App Interface',
      category: 'Mobile Design',
      description: 'Discover and book amazing travel experiences',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1080&q=80',
      tags: ['Travel', 'Booking', 'Figma'],
      year: '2023',
    },
    {
      id: 9,
      title: 'Tech Startup Branding',
      category: 'Branding',
      description: 'Modern brand identity for AI-powered startup',
      image: 'https://images.unsplash.com/photo-1620207418302-439b387441b0?w=1080&q=80',
      tags: ['AI', 'Tech', 'Illustrator'],
      year: '2024',
    },
  ];

  const CATEGORIES = ['All', 'Web Design', 'Mobile Design', 'Branding', 'UI/UX'];


  // ---------- State & DOM ----------

  const state = { category: 'All', query: '' };

  const dom = {
    grid:    null,
    count:   null,
    empty:   null,
    search:  null,
    chips:   null,
  };


  // ---------- Rendering ----------

  const buildCardHTML = ({ image, title, year, tags, category, description }) => {
    const tagsHTML = tags.map(t => `<span class="card__tag">${t}</span>`).join('');

    return `
      <div class="card__image-wrap">
        <img class="card__image" src="${image}" alt="${title}" loading="lazy">
        <div class="card__overlay">
          <div>
            <div class="card__year">${year}</div>
            <div class="card__tags">${tagsHTML}</div>
          </div>
        </div>
      </div>
      <div class="card__body">
        <div class="card__category">${category}</div>
        <h3 class="card__title">${title}</h3>
        <p class="card__text">${description}</p>
      </div>
    `;
  };

  const createCard = (project) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = buildCardHTML(project);
    return card;
  };

  const matchesFilters = (project) => {
    const q = state.query.toLowerCase();
    const matchesCategory = state.category === 'All' || project.category === state.category;
    const matchesQuery = !q
      || project.title.toLowerCase().includes(q)
      || project.description.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  };

  const render = () => {
    const visible = PROJECTS.filter(matchesFilters);

    dom.grid.innerHTML = '';
    visible.forEach(p => dom.grid.appendChild(createCard(p)));

    dom.count.textContent = `Showing ${visible.length} of ${PROJECTS.length} projects`;
    dom.empty.hidden = visible.length !== 0;
    dom.grid.hidden  = visible.length === 0;
  };


  // ---------- Filters ----------

  const buildChips = () => {
    dom.chips.innerHTML = '';

    CATEGORIES.forEach(category => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'filters__chip';
      chip.classList.toggle('filters__chip--active', category === state.category);
      chip.textContent = category;

      chip.addEventListener('click', () => {
        state.category = category;
        dom.chips.querySelectorAll('.filters__chip').forEach(c => {
          c.classList.toggle('filters__chip--active', c.textContent === category);
        });
        render();
      });

      dom.chips.appendChild(chip);
    });
  };

  const initClearButton = () => {
    const clearBtn = document.querySelector('[data-clear-filters]');
    if (!clearBtn) return;

    clearBtn.addEventListener('click', () => {
      state.category = 'All';
      state.query    = '';
      dom.search.value = '';
      buildChips();
      render();
    });
  };


  // ---------- Bootstrap ----------

  document.addEventListener('DOMContentLoaded', () => {
    dom.grid   = document.querySelector('[data-projects-grid]');
    dom.count  = document.querySelector('[data-projects-count]');
    dom.empty  = document.querySelector('[data-projects-empty]');
    dom.search = document.querySelector('[data-projects-search]');
    dom.chips  = document.querySelector('[data-projects-chips]');

    if (!dom.grid) return;

    buildChips();
    initClearButton();

    dom.search.addEventListener('input', (e) => {
      state.query = e.target.value;
      render();
    });

    render();
  });
})();
