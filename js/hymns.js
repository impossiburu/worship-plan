/*
=====================================================
FORBUILDER

hymns.js

Работа с библиотекой гимнов
=====================================================
*/

let hymns = [];

/*
=====================================================
Загрузка hymns.json
=====================================================
*/

async function loadHymns(){
    try {
        const response =await fetch("data/hymns.json");

        if (!response.ok) {
            throw new Error("Файл гимнов не найден");
        }

        hymns = await response.json();

        fillHymnList();
    } catch(error){
        console.warn("Гимны не загружены:", error.message);
        hymns = [];
    }
}

/*
=====================================================
Заполнение datalist
=====================================================
*/
function fillHymnList(){
    const list = document.getElementById("hymnList");

    if (!list) {
        return;
    }

    list.innerHTML = "";

    hymns.forEach(hymn => {
        const option = document.createElement("option");
        option.value = hymn;
        list.appendChild(option);
    });
}

/*
=====================================================
Поиск гимнов
=====================================================
*/

function searchHymns(query){
    if (!query) {
        return hymns;
    }

    query = query.toLowerCase();

    return hymns.filter(hymn => {
        return hymn.toLowerCase().includes(query);
    });
}

/*
=====================================================
Динамический datalist

Обновляем варианты при вводе
=====================================================
*/
function updateHymnSuggestions(value){
    const list = document.getElementById("hymnList");

    if (!list) {
        return;
    }

    list.innerHTML="";

    searchHymns(value).slice(0,50).forEach(hymn => {
        const option = document.createElement("option");
        option.value = hymn;

        list.appendChild(option);    
    });

}
