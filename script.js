
const countriesContainer = document.querySelector('.countries-container')
const searchBox = document.querySelector('.search-by-name input')
const filterByRegion = document.querySelector('#search-by-region')
const themeSwitch = document.querySelector('.theme-switch')
const themeSwitchText = document.querySelector('.theme-switch span')

fetch("http://localhost:3000/countries")
    .then(response => response.json())
    .then(data => {
        renderCountries(data)
    })

searchBox.addEventListener('input', (e) => {
    if (searchBox.value) {
    fetch(`http://localhost:3000/countries/name/${searchBox.value}`)
            .then(response => response.json())
            .then(data => {
                renderCountries(data)
            })
    } else {
    fetch("http://localhost:3000/countries")
            .then(response => response.json())
            .then(data => {
                renderCountries(data)
            })
    }
})

filterByRegion.addEventListener('change', (e) => {
    fetch(`http://localhost:3000/countries/region/${filterByRegion.value}`)
        .then(response => response.json())
        .then(data => {
            renderCountries(data)
        })
})

function renderCountries(data) {
    countriesContainer.innerHTML = "";
    if (!Array.isArray(data)) {
        countriesContainer.innerHTML = '<p style="padding:2rem;font-size:1.2rem;">No countries found.</p>';
        return;
    }
    data.forEach(country => {
        const card = document.createElement('a');
        card.classList.add('card');
        card.href = `/country.html?name=${country.name}`;
        card.innerHTML = `
                <img loading="lazy" src="${country.flags.png}" alt="Flag of ${country.name}">
                <div class="country-info">
                    <h3>${country.name}</h3>
                    <div class="text-box">
                        <p class="population"><b>Population:</b>&nbsp; ${country.population.toLocaleString('en-IN')}</p>
                        <p class="region"><b>Region:</b>&nbsp; ${country.region}</p>
                        <p class="capital"><b>Capital:</b>&nbsp; ${country.capital ? country.capital : 'No capital'}</p>
                    </div>
                </div>
            `;
        countriesContainer.append(card);
    });
}

if(localStorage.getItem('darkmode') === 'active') {
    document.body.classList.add('darkmode')
    themeSwitchText.textContent = 'Light Mode'
}

themeSwitch.addEventListener('click', () => {
    document.body.classList.toggle('darkmode')
    if(document.body.classList.contains('darkmode')) {
        localStorage.setItem('darkmode', 'active')
        themeSwitchText.textContent = 'Light Mode'
    } else {
        localStorage.setItem('darkmode', null)
        themeSwitchText.textContent = 'Dark Mode'
    }
})