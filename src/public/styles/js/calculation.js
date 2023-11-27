var filename = 'data/calculator.json';

const loadJSON = (callback) => {
    const xObj = new XMLHttpRequest();
    xObj.overrideMimeType("application/json");
    // 1. replace './data.json' with the local path of your file
    xObj.open('GET', filename, true);
    xObj.onreadystatechange = () => {
        if (xObj.readyState === 4 && xObj.status === 200) {
            // 2. call your callback function
            callback(xObj.responseText);
        }
    };
    xObj.send(null);
}

$(document).ready(function () {
    $('#myselection').on('change', function () {
        var getValue = $(this).val();
        $("div.hiddenDiv").hide();
        $("#show" + getValue).show();
        $("#showIPI select").prop('selectedIndex', 0);
    });
});

$(document).ready(function () {
    $('#selectionIPI').on('change', function () {
        var getValue = $(this).val();
        $("div.hiddenDiv").hide();
        $("#showIPI").show();
        $("#show" + getValue).show();
    });
});

function checkValidate() {
    var txtCal = document.getElementById("txtAutoCalculation").value;
    var txtError = document.getElementById("lbAutoError");
    var btnTest = document.getElementById("btnAutoTest");
    var btnSave = document.getElementById("btnAutoSave");
    var calPattern = /^[AE0-9()+\-\*/,.]+$/;
    if (!calPattern.test(txtCal)) {
        txtError.innerHTML = "Calculation format invalid !";
        btnTest.disabled = true;
        btnTest.classList.add("button-diable");
        btnTest.classList.remove("button-7")
    } else {
        txtError.innerHTML = "";
        btnTest.disabled = false;
        btnTest.classList.remove("button-diable");
        btnTest.classList.add("button-7")
    }
    btnSave.disabled = true;
    btnSave.classList.add("button-diable");
    btnSave.classList.remove("button-7")
};

function testAutoValue() {
    var btnTest = document.getElementById("btnAutoTest");
    var btnSave = document.getElementById("btnAutoSave");
    var txtCal = document.getElementById("txtAutoCalculation").value;
    var txtError = document.getElementById("lbAutoError");
    if (!btnTest.disabled) {
        try {
            var txtCal = document.getElementById("txtAutoCalculation").value;
            var A = parseInt(document.getElementById("txtAM1").textContent);
            var E = parseInt(document.getElementById("txtEM1").textContent);
            var result = eval(txtCal);
            var percent_result = (result * 100).toFixed(0);
            document.getElementById("txtRM1").innerHTML = percent_result + "%";

            A = parseInt(document.getElementById("txtAM2").textContent);
            E = parseInt(document.getElementById("txtEM2").textContent);
            var result1 = eval(txtCal);
            var percent_result1 = (result1 * 100).toFixed(0);
            document.getElementById("txtRM2").innerHTML = percent_result1 + "%";

            if (!(result === undefined || result1 === undefined)) {
                btnSave.disabled = false;
                btnSave.classList.remove("button-diable");
                btnSave.classList.add("button-7")
            }

        } catch (error) {
            txtError.innerHTML = "Error calculation format !!! Please check again !";
        }
    }
}

// function saveAutoValue() {
//     loadJSON((response) => {
//         var btnSave = document.getElementById("btnAutoSave");
//         var txtCal = document.getElementById("txtAutoCalculation").value;
//         if (!btnSave.disabled) {
//             const json = JSON.parse(response);
//             json.Calculator.Maximize_Efficiency.Automation = txtCal;
//             console.log(json.Calculator.Maximize_Efficiency.Automation)
//             var LC = document.getElementById("auto_text_span");
//             LC.innerText = txtCal
//             var updatedJsonData = JSON.stringify(json, null, 2);
//             var updatedBlob = new Blob([updatedJsonData], { type: 'application/json' });
//         }
//     });
// }

const loadAutomationData = () => {
    loadJSON((response) => {
        const json = JSON.parse(response);
        var auto_calculation = "=" + json.Calculator.Maximize_Efficiency.Automation;
        var LC = document.getElementById("auto_text_span");
        LC.innerText = auto_calculation;
    });
}

const loadMigrationData = () => {
    loadJSON((response) => {
        const json = JSON.parse(response);
        var auto_calculation = "=" + json.Calculator.Maximize_Efficiency.Migration;
        var LC = document.getElementById("migration_text_span");
        LC.innerText = auto_calculation;
    });
}

const loadNegativeData = () => {
    loadJSON((response) => {
        const json = JSON.parse(response);
        var auto_calculation = "=" + json.Calculator.Customer_Satisfaction.Negative;
        var LC = document.getElementById("negative_text_span");
        LC.innerText = auto_calculation;
    });
}

const loadPositiveData = () => {
    loadJSON((response) => {
        const json = JSON.parse(response);
        var auto_calculation = "=" + json.Calculator.Customer_Satisfaction.Positive;
        var LC = document.getElementById("positive_text_span");
        LC.innerText = auto_calculation;
    });
}

const loadProDesData = () => {
    loadJSON((response) => {
        const json = JSON.parse(response);
        var auto_calculation = "=" + json.Calculator.Internal_Process_Improvement.Project_Design;
        var LC = document.getElementById("prodes_text_span");
        LC.innerText = auto_calculation;
    });
}

const loadIncidentData = () => {
    loadJSON((response) => {
        const json = JSON.parse(response);
        var auto_calculation = "=" + json.Calculator.Internal_Process_Improvement.Incident;
        var LC = document.getElementById("incident_text_span");
        LC.innerText = auto_calculation;
    });
}

const loadTaskManualData = () => {
    loadJSON((response) => {
        const json = JSON.parse(response);
        var auto_calculation = "=" + json.Calculator.Internal_Process_Improvement.Task_Manual;
        var LC = document.getElementById("taskmanual_text_span");
        LC.innerText = auto_calculation;
    });
}

const loadIdeasData = () => {
    loadJSON((response) => {
        const json = JSON.parse(response);
        var auto_calculation = "=" + json.Calculator.Internal_Process_Improvement.Improvement_Ideas;
        var LC = document.getElementById("ideas_text_span");
        LC.innerText = auto_calculation;
    });
}

loadAutomationData();
loadMigrationData();
loadNegativeData();
loadPositiveData();
loadProDesData();
loadIncidentData();
loadTaskManualData();
loadIdeasData();

$(document).ready(function () {
    var nav = $(".navbar");
    var navHeight = nav.outerHeight();

    // Set initial state
    setNavbarState();

    $(window).scroll(function () {
        setNavbarState();
    });

    $(window).resize(function () {
        setNavbarState(); // Update on window resize
    });

    function setNavbarState() {
        var scrollPos = $(window).scrollTop();
        var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var screenwidth = screen.width;

        // Check if zoom level is less than a certain threshold
        if (windowWidth / screenwidth > 0.8 && scrollPos > navHeight) {
            nav.addClass("fixed-top");
        } else {
            nav.removeClass("fixed-top");
        }
    }
});