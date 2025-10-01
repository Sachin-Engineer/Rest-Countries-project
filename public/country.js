const leftDetail = document.querySelector('.left-detail img')
const rightDetail = document.querySelector('.right-detail')
const button = document.querySelector('.btn-container button')
const themeSwitch = document.querySelector('.theme-switch')
const themeSwitchText = document.querySelector('.theme-switch span')

const countryName = new URLSearchParams(window.location.search).get('name')

button.addEventListener('click', () => {
    window.history.back()
})

fetch(`https://rest-countries-project-phi.vercel.app/api/countries/name?name=${encodeURIComponent(countryName)}`)
    .then(Response => Response.json())
    .then(data => {
        // Find the exact match for the country from the API response
        const country = data.find(c => c.name === countryName);

        if (!country) {
            rightDetail.innerHTML = `<h2>Country not found.</h2>`;
            return;
        }

        leftDetail.src = country.flag;

        rightDetail.innerHTML = `
            <h2 class="country-name">${country.name}</h2>

            <div class="sub-detail">
                <div class="left">
                    <p><b>Native Name:</b>&nbsp; ${country.nativeName}</p>
                    <p><b>Population:</b>&nbsp; ${country.population.toLocaleString('en-IN')}</p>
                    <p><b>Region:</b>&nbsp; ${country.region}</p>
                    <p><b>Sub Region:</b>&nbsp; ${country.subregion}</p>
                    <p><b>Capital:</b>&nbsp; ${country.capital ? country.capital : 'No Capital'}</p>
                </div>

                <div class="right">
                    <p><b>Top Level Domain:</b>&nbsp; ${country.topLevelDomain.join(', ')}</p>
                    <p><b>Currencies:</b>&nbsp; ${country.currencies ? country.currencies.map(c => c.name).join(', ') : 'No Currencies'}</p>
                    <p><b>Language:</b>&nbsp; ${country.languages.map(lang => lang.name).join(', ')}</p>
                </div>
            </div>

            <div class="border-countries">
                <b>Border Countries:</b>
                <div class="border-countries-btn-box">
                </div>
            </div>
        `;
        const borderCountries = document.querySelector('.border-countries');
        const borderCountriesBox = document.querySelector('.border-countries-btn-box');

        if (country.borders && country.borders.length > 0) {
            country.borders.map(borderAlphaCode => {
                fetch(`https://rest-countries-project-phi.vercel.app/api/alpha?code=${encodeURIComponent(borderAlphaCode)}`)
                    .then(Response => Response.json())
                    .then(borderCountry => {
                        const btn = document.createElement('button');
                        btn.textContent = borderCountry.name;
                        borderCountriesBox.append(btn)
                        btn.addEventListener('click', () => {
                            const url = new URL(window.location.href);
                            url.searchParams.set('name', borderCountry.name);
                            window.location.href = url.toString();
                        });
                    });
            });
        } else {
            borderCountries.classList.add('hidden');
        }
    });

if (localStorage.getItem('darkmode') === 'active') {
    document.body.classList.add('darkmode')
    themeSwitchText.textContent = 'Light Mode'
}

themeSwitch.addEventListener('click', () => {
    document.body.classList.toggle('darkmode')
    if (document.body.classList.contains('darkmode')) {
        localStorage.setItem('darkmode', 'active')
        themeSwitchText.textContent = 'Light Mode'
    } else {
        localStorage.setItem('darkmode', null)
        themeSwitchText.textContent = 'Dark Mode'
    }
})