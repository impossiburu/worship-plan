/*
=====================================================
FORBUILDER

app.js

Запуск приложения и обработчики интерфейса
=====================================================
*/

document.addEventListener("DOMContentLoaded", initApp);


/*
=====================================================
Инициализация
=====================================================
*/

async function initApp() {
    loadPlan();
    await loadHymns();
    bindEvents();

    render();
}

/*
=====================================================
Все события интерфейса
=====================================================
*/

function bindEvents(){
    /*Новый пункт*/

    document.getElementById("addItemButton").addEventListener("click", () => {
        state.items.push(createItem());
        savePlan();

        render();
    });

    /*Новый гимн*/

    document.getElementById("addHymnButton").addEventListener("click", () => {
        state.items.push(createHymn());
        savePlan();

        render();
    });

    /*Название*/

    document.getElementById("planTitle").addEventListener("input", event => {
        state.title = event.target.value;
        savePlan();

        renderPreview();
    });

    /*Дата*/

    document.getElementById("planDate").addEventListener("input", event => {
        state.date = event.target.value;
        savePlan();

        renderPreview();
    });

    /*Общее примечание*/

    document.getElementById("planNote").addEventListener("input", event => {
        state.note = event.target.value;
        savePlan();

        renderPreview();   
    });

    /*Режим редактирования*/

    document.getElementById("editModeButton").addEventListener("click", () => {
        appMode = "edit";
        switchMode();
    });

    /*Предпросмотр*/

    document.getElementById("previewModeButton").addEventListener("click", () => {
        appMode = "preview";
        switchMode();
    });

    /*
    Очистить
    */

    document.getElementById("clearButton").addEventListener("click", () => {
        if (confirm("Очистить текущий план?")) {
            clearPlan();
            render();
        }
    });

    /*Печать*/

    document.getElementById("printButton").addEventListener("click", () => {
        window.print();
    });


    document.getElementById("exportButton").addEventListener("click", () => {
        exportPlan();
    });

    document.getElementById("importButton").addEventListener("click", () => {
        document.getElementById("importFile").click();
    });

    document.getElementById("importFile").addEventListener("change", event => {
        const file = event.target.files[0];

        if (file) {
            importPlan(file);
        }

        event.target.value="";
    });

    /*
    =====================================================
    Настройки печати
    =====================================================
    */


    document.getElementById("compactPrint").addEventListener("change", event => {
        state.printSettings.compact = event.target.checked;
        savePlan();

        renderPreview();
    });

    document.getElementById("printFontSize").addEventListener("input", event => {
        state.printSettings.fontSize = Number(event.target.value);
        savePlan();

        renderPreview();
    });

    document.getElementById("hideEmptyPrint").addEventListener("change", event => {
        state.printSettings.hideEmpty = event.target.checked;
        savePlan();

        renderPreview();
    });
}

/*
=====================================================
Переключение режима
=====================================================
*/

function switchMode(){
    const editor = document.getElementById("editor");
    const preview = document.getElementById("preview");
    const editButton = document.getElementById("editModeButton");
    const previewButton = document.getElementById("previewModeButton");

    if (appMode === "edit") {
        editor.classList.remove("hidden");
        preview.classList.add("hidden");
        editButton.classList.add("active");
        previewButton.classList.remove("active");
    } else {
        renderPreview();
        editor.classList.add("hidden");
        preview.classList.remove("hidden");
        previewButton.classList.add("active");
        editButton.classList.remove("active");
    }
}
