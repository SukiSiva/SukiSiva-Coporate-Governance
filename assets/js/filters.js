/**
 * GOVERNORA - Client-Side Filtering (filters.js)
 * Filtering and live search for Case Studies and Insights / Blog
 */

(function () {
  'use strict';

  // 1. Case Study Filters
  function initCaseStudyFilters() {
    const filterButtons = document.querySelectorAll('[data-case-filter]');
    const caseCards = document.querySelectorAll('[data-case-category]');

    if (filterButtons.length === 0 || caseCards.length === 0) return;

    filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        filterButtons.forEach(b => b.classList.remove('active', 'btn-gov-primary'));
        filterButtons.forEach(b => b.classList.add('btn-gov-outline'));
        
        btn.classList.add('active', 'btn-gov-primary');
        btn.classList.remove('btn-gov-outline');

        const filterValue = btn.getAttribute('data-case-filter');

        caseCards.forEach(card => {
          const category = card.getAttribute('data-case-category');
          if (filterValue === 'all' || category === filterValue || category.includes(filterValue)) {
            card.style.display = '';
            card.classList.remove('d-none');
          } else {
            card.style.display = 'none';
            card.classList.add('d-none');
          }
        });
      });
    });
  }

  // 2. Blog Search & Category Filters
  function initBlogFilters() {
    const searchInput = document.querySelector('#blogSearchInput');
    const blogCategoryPills = document.querySelectorAll('[data-blog-filter]');
    const blogItems = document.querySelectorAll('.blog-article-item');
    const noResults = document.querySelector('#blogNoResults');

    if (!blogItems.length) return;

    let currentCategory = 'all';
    let searchQuery = '';

    function filterBlog() {
      let visibleCount = 0;

      blogItems.forEach(item => {
        const itemCategory = item.getAttribute('data-blog-category') || '';
        const titleText = item.querySelector('.article-title')?.textContent.toLowerCase() || '';
        const excerptText = item.querySelector('.article-excerpt')?.textContent.toLowerCase() || '';

        const matchesCategory = currentCategory === 'all' || itemCategory === currentCategory;
        const matchesSearch = !searchQuery || titleText.includes(searchQuery) || excerptText.includes(searchQuery);

        if (matchesCategory && matchesSearch) {
          item.style.display = '';
          item.classList.remove('d-none');
          visibleCount++;
        } else {
          item.style.display = 'none';
          item.classList.add('d-none');
        }
      });

      if (noResults) {
        if (visibleCount === 0) {
          noResults.classList.remove('d-none');
        } else {
          noResults.classList.add('d-none');
        }
      }
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        filterBlog();
      });
    }

    blogCategoryPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        blogCategoryPills.forEach(p => p.classList.remove('active', 'btn-gov-primary'));
        blogCategoryPills.forEach(p => p.classList.add('btn-gov-outline'));

        pill.classList.add('active', 'btn-gov-primary');
        pill.classList.remove('btn-gov-outline');

        currentCategory = pill.getAttribute('data-blog-filter') || 'all';
        filterBlog();
      });
    });

    filterBlog();
  }

  document.addEventListener('DOMContentLoaded', () => {
    initCaseStudyFilters();
    initBlogFilters();
  });
})();
