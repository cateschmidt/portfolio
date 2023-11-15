

// Java Script for image hover (lazy loading)

let imagesToLoad = document.querySelectorAll('img[data-src]');

const imageOptions = {
    threshold: 1
}

const loadImages = (image) => {
    image.setAttribute('src', image.getAttribute('data-src'));
    image.onload = () => {
        image.removeAttribute('data-src');
    };
};

if('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((items, imageObserver) => {
      items.forEach((item) => {
        if(item.isIntersecting) {
          loadImages(item.target);
          imageObserver.unobserve(item.target);
        }
      });
    }, imageOptions );
    imagesToLoad.forEach((img) => {
      imageObserver.observe(img);
    });
  } else {
    imagesToLoad.forEach((img) => {
      loadImages(img);
    });
  }

  // Portfolio page DOM

const requestURL = 'https://cateschmidt.github.io/portfolio/data.json';
const table = document.querySelector('.table');
const grid = document.querySelector('#grid');
const cards = document.querySelector('.cards');
const displayItems = document.querySelector('.displayItems');


async function getData(requestURL) {
    const response = await fetch(requestURL);
    if (response.ok) {
        const data = await response.json();
        // console.log(data);
        const projects = data['projects'];

        projects.forEach(project => {
            displayCards(project);
        });

        grid.addEventListener('click', () => {
            table.innerHTML = '';
            cards.innerHTML = '';
            projects.forEach(project => {
                displayCards(project);
            });
        });
    }
}

getData(requestURL);

function displayCards(project) {
    let card = document.createElement('section');

    // Project Image
    let image = document.createElement('img');
    image.setAttribute('src', project.logo);
    image.setAttribute('alt', `${project.name} Logo`);
    card.appendChild(image);
    
    // Project Name
    let h2 = document.createElement('h2');
    h2.textContent = project.name;
    card.appendChild(h2);

    // // Business Type
    // let type = document.createElement('p');
    // type.textContent = business.type;
    // card.appendChild(type);

    // Project Languages/Technologies
    let languages = document.createElement('p');
    languages.textContent = project.lang.lang1 + ' ' + ' ' + project.lang.lang2 + ' ' + project.lang.lang3 + ' ' + project.lang.lang4;
    card.appendChild(languages);

    // // Business Phone
    // let phone = document.createElement('p');
    // phone.textContent = business.phone;
    // card.appendChild(phone);

    // Project Website
    let website = document.createElement('a');
    website.setAttribute('href', project.website);
    website.textContent = 'Website';
    card.appendChild(website);

    // Append card to the DOM 
    document.querySelector('div.cards').appendChild(card);
}



 