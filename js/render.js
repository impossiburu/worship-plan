/*
=====================================================
FORBUILDER

render.js

Отрисовка интерфейса
=====================================================
*/

function render(){
    renderEditor();
    renderHeader();
    renderPrintSettings();
    renderPreview();
}

/*
=====================================================
Редактор
=====================================================
*/

function renderEditor(){
    const editor = document.getElementById("editor");
    editor.innerHTML = "";
    state.items.forEach(item => {
        const component = createComponent(item);
        if (component) {
            editor.appendChild(component);
        }
    });
}

/*
=====================================================
Верхние поля
=====================================================
*/

function renderHeader(){
    document.getElementById("planTitle").value = state.title || "";
    document.getElementById("planDate").value = state.date || "";
    document.getElementById("planNote").value =state.note || "";
}

function renderPrintSettings(){
    const settings = state.printSettings;

    if (!settings) {
        return;
    }

    document.getElementById("compactPrint").checked = settings.compact;
    document.getElementById("printFontSize").value = settings.fontSize;
    document.getElementById("hideEmptyPrint").checked = settings.hideEmpty;
}

/*
=====================================================
Предпросмотр документа
=====================================================
*/

function renderPreview(){
    const settings =
    state.printSettings || {
        compact:false,
        fontSize:17,
        hideEmpty:true
    };
    console.log(state.printSettings)

    const preview = document.getElementById("preview");
    let html = "";

    /*
    Заголовок
    */

    if (state.title) {
        html += `
            <div class="print-header">
                <h1>
                    ${escapeHtml(state.title)}
                </h1>
            `;

        if (state.date) {
            html += `<div class="print-date">${formatDate(state.date)}</div>`;
        }

        html += `</div>`;
    }

    /*
    Общее примечание
    */

    if (state.note) {
        html += `<div class="print-note">${escapeHtml(state.note)}</div>`;
    }

    /*
    Основные пункты
    */

    html += `<div class="print-items ${settings.compact ? "compact" : ""}" style=" font-size:${settings.fontSize}px;">`;

    let number = 1;
    state.items.forEach(item => {
        if (item.type === "item") {
            html += `
                <div class="print-item ${item.bold ? "print-bold" : ""}">
                    <div class="item-number">
                        ${number}.
                    </div>
                    <div class="item-content">
                        <div>
                            ${escapeHtml(item.text)}
                        </div>
                        ${item.note ? `<div class="item-note">${escapeHtml(item.note)}</div>` : ""}
                    </div>
                </div>`;
                number++;
            }

            if (item.type === "hymn") {
                html += `
                    <div class="print-hymn">
                        <span>
                            Гимн:
                        </span>
                        ${escapeHtml(item.hymn)}
                    </div>
                `;
            }
        }
    );
    html += `</div>`;
    preview.innerHTML = html;
}

/*
=====================================================
Вспомогательные функции
=====================================================
*/

function escapeHtml(value){
    if (!value) {
        return "";
    }

    return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function formatDate(date){
    const parts = date.split("-");

    if (parts.length !== 3) {
        return date;
    }

    return `${parts[2]}.${parts[1]}.${parts[0]}`;
}


// function renderPreview(){


//     const preview =
//         document.getElementById(
//             "preview"
//         );



//     let html = "";



//     if(state.title){


//         html +=
//         `<h1>${state.title}</h1>`;

//     }



//     if(state.date){


//         html +=
//         `<p>${state.date}</p>`;

//     }



//     if(state.note){


//         html +=
//         `<p>${state.note}</p>`;

//     }




//     state.items.forEach(
//         item=>{


//             if(item.type==="item"){



//                 html +=
//                 `
//                 <div>

//                     <strong>
//                     ${
//                         item.bold
//                         ? item.text
//                         : ""
//                     }
//                     </strong>

//                     ${
//                         !item.bold
//                         ? item.text
//                         : ""
//                     }


//                     ${
//                         item.note
//                         ?
//                         `<br><small>${item.note}</small>`
//                         :
//                         ""
//                     }

//                 </div>
//                 `;


//             }



//             if(item.type==="hymn"){


//                 html +=
//                 `
//                 <div>
//                     🎵 ${item.hymn}
//                 </div>
//                 `;


//             }


//         }
//     );



//     preview.innerHTML =
//         html;


// }
