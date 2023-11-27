var filename2 = 'styles/js/data/report_information.json';

const loadJSON2 = (callback) => {
    const xObj = new XMLHttpRequest();
    xObj.overrideMimeType("application/json");
    // 1. replace './data.json' with the local path of your file
    xObj.open('GET', filename2, true);
    xObj.onreadystatechange = () => {
        if (xObj.readyState === 4 && xObj.status === 200) {
            // 2. call your callback function
            callback(xObj.responseText);
        }
    };
    xObj.send(null);
}

const loadSubMenu = () => {
    loadJSON2((response) => {
        // 3. parse JSON string into JSON Object
        const json = JSON.parse(response);
        // 4. render to your page
        let count = 0;
        let count2 = 0;
        for (let properties in json.Internal_Process_Improvement) {
            count2 = count2 + 1;
        }
        $.each(json.Internal_Process_Improvement, function (i, f) {
            var tblRow;
            if (f.Name === "Project Design Report") {
                tblRow = "<li>" + "<a class='dropdown-item' href='ProjectDesignReport.html'>" + f.Name + "</a></li>";
            } else if (f.Name === "Incident Report") {
                tblRow = "<li>" + "<a class='dropdown-item' href='IncidentPage.html'>" + f.Name + "</a></li>";
            } else if (f.Name === "Task Manual Report") {
                tblRow = "<li>" + "<a class='dropdown-item' href='ManualTaskPage.html'>" + f.Name + "</a></li>";
            } else if (f.Name === "Improvement Ideas Report") {
                tblRow = "<li>" + "<a class='dropdown-item' href='ImprovementIdeasPage.html'>" + f.Name + "</a></li>";
            }
            count = count + 1;
            if (count < count2) {
                tblRow += "<li><hr class='dropdown-divider' /></li>";
            }
            $(tblRow).appendTo("#submenu");
        });
    });
}

loadSubMenu();