/*
=====================================================
FORBUILDER

file.js

Импорт и экспорт JSON файлов
=====================================================
*/





/*
=====================================================
Экспорт плана
=====================================================
*/


function exportPlan(){


    const data =
        JSON.stringify(
            state,
            null,
            4
        );



    const blob =
        new Blob(
            [
                data
            ],
            {
                type:
                "application/json"
            }
        );



    const url =
        URL.createObjectURL(
            blob
        );



    const link =
        document.createElement(
            "a"
        );



    const date =
        new Date()
        .toISOString()
        .split("T")[0];



    link.href =
        url;



    link.download =
        `forbuilder-${date}.json`;



    document.body.appendChild(
        link
    );


    link.click();


    document.body.removeChild(
        link
    );


    URL.revokeObjectURL(
        url
    );


}








/*
=====================================================
Проверка структуры JSON
=====================================================
*/


function validatePlan(data){



    if(
        typeof data !== "object"
        ||
        data === null
    ){

        return false;

    }



    if(
        !Array.isArray(
            data.items
        )
    ){

        return false;

    }



    return true;


}







/*
=====================================================
Импорт плана
=====================================================
*/


function importPlan(file){


    const reader =
        new FileReader();




    reader.onload =
        function(event){



            try{


                const data =
                    JSON.parse(
                        event.target.result
                    );



                if(
                    !validatePlan(data)
                ){

                    alert(
                        "Неверный формат файла"
                    );


                    return;

                }





                state =
                    data;



                savePlan();


                render();



                alert(
                    "План успешно загружен"
                );


            }


            catch(error){


                alert(
                    "Ошибка чтения JSON"
                );


                console.error(
                    error
                );


            }


        };





    reader.readAsText(
        file
    );


}
