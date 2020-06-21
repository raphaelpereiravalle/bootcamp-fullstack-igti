'use strict';

let inputName = null, btnBusca = null, statistic = null, user = null, divMain = null, divLoading = null;
let atributoArray = [];
let filter = [];
let numberFormat = Intl.NumberFormat("pt-BR");

window.addEventListener('load', () => {
    inputName = document.querySelector('#busca');
    btnBusca = document.querySelector('#btnBusca');
    statistic = document.querySelector('#statistic');
    user = document.querySelector('#user');
    divMain = document.querySelector('#divMain');
    divLoading = document.querySelector("#loading");
    btnBusca.classList.add('disabled');
    btnBusca.addEventListener('click', searchForName);
    
    fetchUrl();
    init();
});

function preventFormSubmit() {
    function handleFormSubmit(event) {
      event.preventDefault();
    }
  
   var form = document.querySelector('form');
   form.addEventListener('submit', handleFormSubmit);
}

// Funcção para carregar URL e dados para o array
// Cabeçalho da função decorada com a palavra-chave async
async function fetchUrl() {

    const url = await fetch("https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo");
    const json = await url.json();

    atributoArray = json.results.map((data) => {
        // Destructuring 
        const { name, picture, dob, gender } = data;

        return {
            name: name.first + ' ' + name.last,
            picture: picture.thumbnail,
            age: dob.age,
            gender: gender === 'male' ? 'M' : 'F'
        };
    });
    load();
}

const init = () => {
    const onKeyUpName = (event) => {
        let hasText = !!event.target.value && event.target.value.trim() !== '';

        if(hasText){
            btnBusca.classList.remove('disabled');            
        }else{
            btnBusca.classList.add('disabled');
            loadBox();
        }

        if(hasText && event.key == 'Enter'){
            searchForName();
        }
    }

    inputName.addEventListener('keyup', onKeyUpName);
    loadBox();
}

const loadBox = () =>{
    user.innerHTML = "<h2>Nenhum usuário filtrado</h2>";
    statistic.innerHTML = "<h2>Nada a ser exibido</h2>";
}

const searchForName = () => {

    let name = inputName.value.toLowerCase().trim();

    filter = atributoArray.filter(p => {
        return p.name.toLowerCase().includes(name);
    });

    filter = sortName(filter);
    
    divUser(filter);
    divStatistic(filter);
}

const sortName = () => {
    return filter.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });
}

function divUser(filter) {

    let bodyHTML = `<h3>${filter.length} Usúario (s) encontrado (s)</h3>`;
     
    filter.forEach((data, index) => {
        
        const { name, picture, age } = data;

        const datasHtml = `<div class="card-panel grey lighten-5 z-depth-1">
                                <div class="row valign-wrapper">
                                    <div class="col s2">
                                        <img class="circle responsive-img" src="${picture}"> 
                                    </div>
                                    <div class="col s10 font">
                                        ${name}, ${age} anos
                                    </div>
                                </div>
                            </div>`; 

        bodyHTML += datasHtml;
    });

    user.innerHTML = bodyHTML;
}

function divStatistic(filter) {
    // Carregar funções
    let male = countMale(filter);
    let female = countFemale(filter);
    let sum = sumAge(filter);
    let average = avgAge(filter);

    let bodyHTML = `<h3>Estatística</h3>`;

    // Templante literals
    const datasHtml = `<div class="card-panel lighten-5 z-depth-1">
                            <div class="text">Sexo masculino: <strong>${male}</strong></div>
                            <div class="text">Sexo feminino: <strong>${female}</strong></div>
                            <div class="text">Soma das idade (s): <strong>${sum}</strong></div>
                            <div class="text">Média das idade (s): <strong>${average}</strong></div>
                        </div>`;
                                                
    statistic.innerHTML = bodyHTML += datasHtml;
}

// Cálculo o total do sexo masculino 
function countMale(filter) {
    const totalMale = filter.filter(person => { 
        return person.gender === 'M'
    }).length;

    return totalMale;
}

// Cálculo o total do sexo feminino
function countFemale(filter) {
    const totalFemale = filter.filter(person => { 
        return person.gender === 'F'
    }).length;

    return totalFemale;
}

// Cálculo da soma das idades
function sumAge(filter) {
    const totalAges = filter.reduce((accumulator, current) => {
        return accumulator + current.age;
    }, 0);

    return totalAges;
}

// Cálculo da média das idades
function avgAge(filter) {
    const avgAges = filter.reduce((accumulator, current) => accumulator + current.age, 0) / filter.length;
    return avgAges;
}

function load() {
    setTimeout(showPage, 2000);
}

function showPage() {
    divLoading.classList.add('hidden');
    divMain.classList.remove('hidden');
}
