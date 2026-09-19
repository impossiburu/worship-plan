/*
=====================================================
FORBUILDER

storage.js

Работа с localStorage
=====================================================
*/



/*
=====================================================
Сохранить план
=====================================================
*/

function savePlan(){
    try{
        localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(state));
    } catch(error) {
        console.error("Ошибка сохранения:", error);
    }
}

/*
=====================================================
Загрузить план
=====================================================
*/

function loadPlan(){
    const saved = localStorage.getItem(CONFIG.STORAGE_KEY);

    if (!saved) {
        state = createEmptyPlan();
        return;
    }

    try{
        const data = JSON.parse(saved);

        if (!data.version) {
            data.version = CONFIG.VERSION;
        }

        state = data;

        /*
        Добавляем новые настройки
        для старых сохранений
        */

        if (!state.printSettings) {
            state.printSettings = {
                compact:false,
                fontSize:17,
                hideEmpty:true
            };
        }
    } catch(error) {
        console.error("Ошибка загрузки плана:", error);
        state = createEmptyPlan();
    }
}

/*
=====================================================
Очистить план
=====================================================
*/

function clearPlan(){
    state = createEmptyPlan();
    savePlan();
}
