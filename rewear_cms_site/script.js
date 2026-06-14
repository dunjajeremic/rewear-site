const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const fallbackProducts = [
  {
    "title": "Zara elegantni sako",
    "brand": "Zara",
    "category": "ženska",
    "size": "M",
    "condition": "Kao novo",
    "price": 3900,
    "tag": "Provereno",
    "image": ""
  },
  {
    "title": "Nike Air patike",
    "brand": "Nike",
    "category": "patike",
    "size": "42",
    "condition": "Odlično stanje",
    "price": 7500,
    "tag": "Original",
    "image": ""
  },
  {
    "title": "Mango kaput",
    "brand": "Mango",
    "category": "ženska",
    "size": "S",
    "condition": "Bez oštećenja",
    "price": 6200,
    "tag": "Novo u katalogu",
    "image": ""
  },
  {
    "title": "Tommy Hilfiger košulja",
    "brand": "Tommy Hilfiger",
    "category": "muška",
    "size": "L",
    "condition": "Vrlo dobro",
    "price": 4500,
    "tag": "Brendirano",
    "image": ""
  },
  {
    "title": "Guess torba",
    "brand": "Guess",
    "category": "aksesoari",
    "size": "Univerzalno",
    "condition": "Kao novo",
    "price": 8900,
    "tag": "Premium",
    "image": ""
  },
  {
    "title": "Adidas trenerka",
    "brand": "Adidas",
    "category": "muška",
    "size": "XL",
    "condition": "Dobro stanje",
    "price": 5200,
    "tag": "Sport",
    "image": ""
  },
  {
    "title": "Stradivarius haljina",
    "brand": "Stradivarius",
    "category": "ženska",
    "size": "M",
    "condition": "Nošeno jednom",
    "price": 2800,
    "tag": "Povoljno",
    "image": ""
  },
  {
    "title": "Converse All Star",
    "brand": "Converse",
    "category": "patike",
    "size": "39",
    "condition": "Vrlo dobro",
    "price": 4100,
    "tag": "Popularno",
    "image": ""
  }
];

let products = [...fallbackProducts];
const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
let activeFilter = 'sve';

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"]/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;'
  }[char]));
}

function formatRsd(value) {
  return new Intl.NumberFormat('sr-RS').format(Number(value || 0)) + ' RSD';
}

function normalizeProduct(product) {
  return {
    title: product.title || 'Oglas bez naziva',
    brand: product.brand || 'Brend',
    category: product.category || 'unisex',
    size: product.size || '-',
    condition: product.condition || 'Nije navedeno',
    price: Number(product.price || 0),
    tag: product.tag || 'Provereno',
    image: product.image || '',
    status: product.status || 'active'
  };
}

async function loadProducts() {
  try {
    const response = await fetch('content/data/products.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Nije moguće učitati oglase');
    const data = await response.json();
    if (Array.isArray(data.items)) {
      products = data.items.map(normalizeProduct).filter((product) => product.status !== 'inactive');
    }
  } catch (error) {
    products = fallbackProducts.map(normalizeProduct);
  } finally {
    renderProducts();
  }
}

function renderProducts() {
  if (!productGrid) return;

  const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
  const filteredProducts = products.filter((product) => {
    const matchesFilter = activeFilter === 'sve' || product.category === activeFilter;
    const content = `${product.title} ${product.brand} ${product.category} ${product.size} ${product.condition}`.toLowerCase();
    const matchesSearch = !query || content.includes(query);
    return matchesFilter && matchesSearch;
  });

  if (!filteredProducts.length) {
    productGrid.innerHTML = `<div class="product-card" style="grid-column: 1 / -1;"><div class="product-body"><h3>Nema rezultata</h3><p>Probaj drugi brend, veličinu ili kategoriju.</p></div></div>`;
    return;
  }

  productGrid.innerHTML = filteredProducts.map((product) => {
    const categoryLabel = product.category.charAt(0).toUpperCase() + product.category.slice(1);
    const image = product.image
      ? `<img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.title)}" loading="lazy" />`
      : '';

    return `
      <article class="product-card">
        <div class="product-visual${product.image ? ' has-image' : ''}" aria-hidden="${product.image ? 'false' : 'true'}">${image}</div>
        <div class="product-body">
          <div class="product-meta">
            <span>${escapeHtml(product.brand)}</span>
            <span>Vel. ${escapeHtml(product.size)}</span>
          </div>
          <h3>${escapeHtml(product.title)}</h3>
          <p>${escapeHtml(product.condition)} · ${escapeHtml(categoryLabel)}</p>
          <div class="product-price">
            <strong>${formatRsd(product.price)}</strong>
            <span class="product-tag">${escapeHtml(product.tag)}</span>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    activeFilter = button.dataset.filter;
    renderProducts();
  });
});

if (searchInput) {
  searchInput.addEventListener('input', renderProducts);
}

loadProducts();

const billingButtons = document.querySelectorAll('.billing-btn');
const priceCards = document.querySelectorAll('.price-card');

function priceForPeriod(monthly, months) {
  const discount = months === 6 ? 0.1 : months === 12 ? 0.2 : 0;
  return Math.round(monthly * months * (1 - discount));
}

function updatePrices(months) {
  priceCards.forEach((card) => {
    const monthly = Number(card.dataset.monthly);
    const amount = card.querySelector('.amount');
    const periodLabel = card.querySelector('.period-label');
    if (!amount || !periodLabel) return;

    amount.textContent = new Intl.NumberFormat('sr-RS').format(priceForPeriod(monthly, months));

    if (months === 1) {
      periodLabel.textContent = 'za 1 mesec';
    } else if (months === 6) {
      periodLabel.textContent = 'za 6 meseci · uključeno 10% popusta';
    } else {
      periodLabel.textContent = 'za 12 meseci · uključeno 20% popusta';
    }
  });
}

billingButtons.forEach((button) => {
  button.addEventListener('click', () => {
    billingButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    updatePrices(Number(button.dataset.period));
  });
});

const year = document.getElementById('year');
if (year) {
  year.textContent = new Date().getFullYear();
}
