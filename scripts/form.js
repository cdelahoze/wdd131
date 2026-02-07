// Output the current year in the first paragraph (con comprobación DOM)
const _cy = document.getElementById('currentyear');
if (_cy) {
  _cy.innerHTML = '&#169; ' + new Date().getFullYear() + ' Cristian Moisés De La Hoz Escorcia';
}

// Output the last modified date in the second paragraph (con comprobación DOM)
const _lm = document.getElementById('lastModified');
if (_lm) {
  _lm.innerHTML = 'Last Modified: ' + document.lastModified;
}

const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

document.addEventListener('DOMContentLoaded', () => {
  // Populate product select when on the form page
  const productSelect = document.getElementById('product');
  if (productSelect) {
    products.forEach((p) => {
      const opt = document.createElement('option');
      opt.value = p.id; // use id for value
      opt.textContent = p.name; // display name
      productSelect.appendChild(opt);
    });
  }

  // If this is the review confirmation page, increment stored counter
  const isReviewPage = window.location.pathname.endsWith('review.html') || window.location.href.includes('review.html');
  if (isReviewPage) {
    const key = 'reviewsCompleted';
    const prev = parseInt(localStorage.getItem(key) || '0', 10);
    const next = prev + 1;
    localStorage.setItem(key, String(next));
    const counterEl = document.getElementById('reviewsCount');
    if (counterEl) {
      counterEl.textContent = `Total reviews submitted: ${next}`;
    }
  }
});

