/*
=====================================================
FORBUILDER

components.js

Создание UI компонентов плана
=====================================================
*/

/*
=====================================================
Получить шаблон из HTML
=====================================================
*/

function getTemplate(id){
    const template = document.getElementById(id);

    return template.content.firstElementChild.cloneNode(true);
}

/*
=====================================================
Создание карточки пункта
=====================================================
*/

function createItemComponent(item){
    const card = getTemplate("itemTemplate");
    const textInput = card.querySelector(".item-text");
    const noteInput = card.querySelector(".item-note");
    const boldCheckbox = card.querySelector(".item-bold");
    const deleteButton = card.querySelector(".delete-button");

    /*
    Заполнение данных
    */

    textInput.value = item.text || "";
    noteInput.value = item.note || "";
    boldCheckbox.checked = item.bold || false;

    /*
    Изменение текста
    */

    textInput.addEventListener("input", () => {
        item.text = textInput.value;
        updateHymnSuggestions(this.value);
        savePlan();
        renderPreview();
    });

    /*
    Изменение примечания
    */

    noteInput.addEventListener("input", () => {
        item.note = noteInput.value;
        savePlan();
        renderPreview();
    });

    /*
    Жирный текст
    */

    boldCheckbox.addEventListener("change", () =>{ 
        item.bold = boldCheckbox.checked;
        savePlan();
        renderPreview();
    });

    /*
    Удаление
    */

    deleteButton.addEventListener("click", () => {
        state.items = state.items.filter(element => element.id !== item.id);
        savePlan();
        render();
    });

    return card;
}

/*
=====================================================
Создание карточки гимна
=====================================================
*/

function createHymnComponent(item){
    const card = getTemplate("hymnTemplate");
    const input = card.querySelector(".hymn-input");
    const deleteButton = card.querySelector(".delete-button");
    input.value = item.hymn || "";

    /*
    Выбор гимна
    */

    input.addEventListener("input", () => {
        item.hymn = input.value;
        updateHymnSuggestions(input.value);
        savePlan();
        renderPreview();
    });

    /*
    Удаление
    */

    deleteButton.addEventListener("click", () => {
        state.items = state.items.filter(element => element.id !== item.id);
        savePlan();
        render();
    });

    return card;
}

/*
=====================================================
Создание компонента по типу
=====================================================
*/

function createComponent(item){
    switch(item.type){
        case "item":
            return createItemComponent(item);
        case "hymn":
            return createHymnComponent(item);
        default:
            console.warn("Неизвестный тип:", item.type);
            return null;
    }
}
