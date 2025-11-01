const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

const menuData = [
  {
    category: 'starters',
    name: 'Paneer Tikka',
    price: '₹280',
    rating: 5,
    img:'Balsamic Paneer Tikka Skewers.jpeg',
    description: 'Cubes of cottage cheese marinated in spiced yogurt and grilled.'
  },
  {
    category: 'starters',
    name: 'Vegetable Samosa',
    price: '₹150',
    rating: 4,
    img: 'SAMOSA_ An Iconic Delight.jpeg',
    description: 'Crispy pastry filled with spiced potatoes and peas.'
  },
  {
    category: 'mains',
    name: 'Butter Chicken',
    price: '₹450',
    rating: 5,
    img: 'Classic Butter Chicken.jpeg',
    description: 'Grilled chicken simmered in a creamy tomato and butter sauce.'
  },
  {
    category: 'mains',
    name: 'Chole Bhature',
    price: '₹320',
    rating: 5,
    img: 'chole_bhature.jpeg',
    description: 'Spicy chickpea curry served with fluffy fried bread.'
  },
  {
    category: 'mains',
    name: 'Chicken Biryani',
    price: '₹380',
    rating: 5,
    img: 'Chicken Dum Biryani - Coolinarco_com.jpeg',
    description: 'Fragrant basmati rice cooked with chicken and spices.'
  },
  {
    category: 'desserts',
    name: 'Chocolate Brownie',
    price: '₹220',
    rating: 5,
    img: 'chcolate_brownie.jpeg',
    description: 'A rich, fudgy chocolate brownie served with vanilla ice cream.'
  },
  {
    category: 'beverages',
    name: 'Mixed Fruit Drink',
    price: '₹160',
    rating: 4,
    img: 'mixed_fruit_drink.jpeg',
    description: 'A refreshing blend of seasonal fresh fruits and juices.'
  },
  {
    category: 'desserts',
    name: 'Gulab Jamun',
    price: '₹120',
    rating: 5,
    img: 'Gulaabjamun_.jpeg',
    description: 'Soft milk-solid balls soaked in a sweet rose-flavored syrup.'
  },
  {
    category: 'beverages',
    name: 'Mango Lassi',
    price: '₹140',
    rating: 4,
    img: 'Mango Lassi.jpeg',
    description: 'A refreshing yogurt-based drink blended with sweet mangoes.'
  },
  
];

const menuGrid = document.getElementById('menuGrid');
const filterBtns = document.querySelectorAll('.filter-btn');

function renderMenu(items) {
  menuGrid.innerHTML = '';
  items.forEach(item => {
    const menuItem = document.createElement('div');
    menuItem.classList.add('menu-item');
    menuItem.dataset.category = item.category;

    menuItem.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="menu-info">
        <div class="menu-header">
          <h3>${item.name}</h3>
          <span class="price">${item.price}</span>
        </div>
        <p>${item.description}</p>
        <div class="rating">
          ${'★'.repeat(item.rating)}${'☆'.repeat(5 - item.rating)}
        </div>
      </div>
    `;
    menuGrid.appendChild(menuItem);
  });
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    if (filter === 'all') {
      renderMenu(menuData);
    } else {
      const filteredData = menuData.filter(item => item.category === filter);
      renderMenu(filteredData);
    }
  });
});

renderMenu(menuData);

const reservationForm = document.getElementById('reservationForm');

reservationForm.addEventListener('submit', (e) => {
  e.preventDefault(); 
  
  const name = document.getElementById('name').value;
  alert(`✅ Thank you, ${name}! Your table reservation has been received.`);
  
  reservationForm.reset();
});