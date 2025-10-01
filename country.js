const leftDetail = document.querySelector('.left-detail img')
const rightDetail = document.querySelector('.right-detail')
const button = document.querySelector('.btn-container button')
const themeSwitch = document.querySelector('.theme-switch')
const themeSwitchText = document.querySelector('.theme-switch span')

const countryName = new URLSearchParams(window.location.search).get('name')

button.addEventListener('click', () => {
    window.history.back()
})

fetch(`https://rest-countries-project-lac.vercel.app/api/countries/name/${countryName}`)
    .then(Response => Response.json())
    .then(data => {
        const strictMatch = data.filter(country => country.name === countryName)
        leftDetail.src = strictMatch[0].flag

        rightDetail.innerHTML = `
            <h2 class="country-name">${strictMatch[0].name}</h2>

            <div class="sub-detail">
                <div class="left">
                    <p><b>Native Name:</b>&nbsp; ${strictMatch[0].nativeName}</p>
                    <p><b>Population:</b>&nbsp; ${strictMatch[0].population.toLocaleString('en-IN')}</p>
                    <p><b>Region:</b>&nbsp; ${strictMatch[0].region}</p>
                    <p><b>Sub Region:</b>&nbsp; ${strictMatch[0].subregion}</p>
                    <p><b>Capital:</b>&nbsp; ${strictMatch[0].capital ? strictMatch[0].capital : 'No Capital'}</p>
                </div>

                <div class="right">
                    <p><b>Top Level Domain:</b>&nbsp; ${strictMatch[0].topLevelDomain}</p>
                    <p><b>Currencies:</b>&nbsp; ${strictMatch[0].currencies ? strictMatch[0].currencies[0].name : 'No Currencies'}</p>
                    <p><b>Language:</b>&nbsp; ${strictMatch[0].languages.map(langData => langData.name).join(', ')}</p>
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

        strictMatch[0].borders ?
            strictMatch[0].borders.map(borderAlphaCode => {
                fetch(`https://rest-countries-project-lac.vercel.app/api/alpha/${borderAlphaCode}`)
                    .then(Response => Response.json())
                    .then(country => {
                        const btn = document.createElement('button')
                        // console.log(country.name)
                        btn.textContent = country.name
                        borderCountriesBox.append(btn)
                        btn.addEventListener('click', () => {
                            const url = new URL(window.location.href);
                            url.searchParams.set('name', country.name);
                            window.location.href = url.toString();
                        });
                    })
            }) :
            borderCountries.classList.add('hidden')
    })

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