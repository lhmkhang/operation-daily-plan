var filename = 'styles/js/data/report_information.json';
var calculatorfilename = 'styles/js/data/calculator.json';
var listprojectfilename = 'styles/js/data/project_design.json';
var migrationplanfilename = "styles/js/data/migration_plan.json";
var automationprocessfilename = "styles/js/data/automation_process.json"
var taskfilename = "styles/js/data/task.json";

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

const loadCalculatorJSON = (callback) => {
    const xObj = new XMLHttpRequest();
    xObj.overrideMimeType("application/json");
    // 1. replace './data.json' with the local path of your file
    xObj.open('GET', calculatorfilename, true);
    xObj.onreadystatechange = () => {
        if (xObj.readyState === 4 && xObj.status === 200) {
            // 2. call your callback function
            callback(xObj.responseText);
        }
    };
    xObj.send(null);
}

const loadMigrationPlan = (callback) => {
    const xObj = new XMLHttpRequest();
    xObj.overrideMimeType("application/json");
    // 1. replace './data.json' with the local path of your file
    xObj.open('GET', migrationplanfilename, true);
    xObj.onreadystatechange = () => {
        if (xObj.readyState === 4 && xObj.status === 200) {
            // 2. call your callback function
            callback(xObj.responseText);
        }
    };
    xObj.send(null);
}

const loadAutomationProcess = (callback) => {
    const xObj = new XMLHttpRequest();
    xObj.overrideMimeType("application/json");
    // 1. replace './data.json' with the local path of your file
    xObj.open('GET', automationprocessfilename, true);
    xObj.onreadystatechange = () => {
        if (xObj.readyState === 4 && xObj.status === 200) {
            // 2. call your callback function
            callback(xObj.responseText);
        }
    };
    xObj.send(null);
}

const loadTaskList = (callback) => {
    const xObj = new XMLHttpRequest();
    xObj.overrideMimeType("application/json");
    // 1. replace './data.json' with the local path of your file
    xObj.open('GET', taskfilename, true);
    xObj.onreadystatechange = () => {
        if (xObj.readyState === 4 && xObj.status === 200) {
            // 2. call your callback function
            callback(xObj.responseText);
        }
    };
    xObj.send(null);
}

const loadListJSON = (callback) => {
    const xObj = new XMLHttpRequest();
    xObj.overrideMimeType("application/json");
    xObj.open('GET', listprojectfilename, true);
    xObj.onreadystatechange = () => {
        if (xObj.readyState === 4 && xObj.status === 200) {
            callback(xObj.responseText);
        }
    };
    xObj.send(null);
}

const calcuPercent = (tableName, f, n) => {
    loadCalculatorJSON((response) => {
        const json = JSON.parse(response);
        let percent = 0;

        //Automation - Maximize
        if (tableName === "Automation") {
            var calcu = json.Calculator.Maximize_Efficiency.Automation;
            const A = n;
            const E = f.Expect;
            percent = eval(calcu + "*100").toFixed(0);
            var tblRow = "<tr>" + "<td>End of " + f.Quarter + " Quarter</td>" +
                "<td>" + f.Expect + "</td>" +
                "<td>" + n + "</td>" +
                "<td>" + percent + "%" + "</td>" + "</tr>"
            $(tblRow).appendTo("#automation_table tbody");
        }

        //Migration - Maximize
        if (tableName === "Migration") {
            var calcu = json.Calculator.Maximize_Efficiency.Migration;
            const A = n;
            const E = f.Expect;
            percent = eval(calcu + "*100").toFixed(0);
            var tblRow = "<tr>" + "<td>End of " + f.Quarter + " Quarter</td>" +
                "<td>" + f.Expect + "</td>" +
                "<td>" + n + "</td>" +
                "<td>" + percent + "%" + "</td>" + "</tr>"
            $(tblRow).appendTo("#migration_table tbody");
        }

        //Nagative - Customer
        if (tableName === "Customer_Negative") {
            let value_2022 = f.Value_2022;
            let value_2023 = f.Actual;
            let target = f.Target;
            let actual_per = (100 - (value_2023 / value_2022) * 100).toFixed(2);
            var calcu = json.Calculator.Customer_Satisfaction.Negative;
            const A = actual_per;
            const E = n;
            percent = eval(calcu + "*100").toFixed(0);
            var tblRow = "<tr>" + "<td>End of " + f.Quarter + " Quarter</td>" +
                "<td>" + value_2022 + "</td>" +
                "<td>" + value_2023 + "</td>" +
                "<td>" + target + "</td>" +
                "<td>" + n + "%" + "</td>" +
                "<td>" + actual_per + "%" + "</td>" +
                "<td>" + percent + "%" + "</td>" +
                "</tr>"
            $(tblRow).appendTo("#negative_table tbody");
        }

        //Positive Customer
        if (tableName === "Customer_Positive") {
            let value_2022 = f.Value_2022;
            let value_2023 = f.Actual;
            let target = f.Target;
            let actual_per = ((value_2023 / value_2022) * 100 - 100).toFixed(2);
            var calcu = json.Calculator.Customer_Satisfaction.Positive;
            const A = actual_per;
            const E = n;
            percent = eval(calcu + "*100").toFixed(0);
            var tblRow = "<tr>" + "<td>End of " + f.Quarter + " Quarter</td>" +
                "<td>" + value_2022 + "</td>" +
                "<td>" + value_2023 + "</td>" +
                "<td>" + target + "</td>" +
                "<td>" + n + "%" + "</td>" +
                "<td>" + actual_per + "%" + "</td>" +
                "<td>" + percent + "%" + "</td>" +
                "</tr>"
            $(tblRow).appendTo("#positive_table tbody");
        }

        //Project Design
        if (tableName === "Project_Design") {
            var actual_percent = (f.New_DGS3) / f.New_Project * 100;
            let actual_per_fix = actual_percent.toFixed(2);
            var calcu = json.Calculator.Internal_Process_Improvement.Project_Design;
            const A = actual_per_fix;
            const E = n;
            percent = eval(calcu + "*100").toFixed(0);
            var tblRow = "<tr>" + "<td>End of " + f.Quarter + " Quarter</td>" +
                "<td>" + f.New_Project + "</td>" +
                "<td>" + f.New_DGS3 + "</td>" +
                "<td>" + n + "%" + "</td>" +
                "<td>" + actual_per_fix + "%" + "</td>" +
                "<td>" + percent + "%" + "</td>" +
                "<td class='text_align_td'>" + f.Notes + "</td>" +
                "</tr>"
            $(tblRow).appendTo("#project_design_table tbody");
        }

        //Incident Bounce - Incident Report
        if (tableName === "Incident_Bounce") {
            var actual_number = (1 - (f.Total_Incident_Unbounce / f.Total_Incident)) * 100
            let actual_per_fix = actual_number.toFixed(0);
            var calcu = json.Calculator.Internal_Process_Improvement.Incident.Incident_Bounce;
            const A = actual_per_fix;
            const E = n;
            percent = eval(calcu + "*100").toFixed(0);
            if (percent > 100) {
                percent = 100;
            } else if (percent < 0) {
                percent = 0;
            }
            var tblRow = "<tr>" + "<td>End of " + f.Quarter + " Quarter</td>" +
                "<td>" + f.Total_Incident + "</td>" +
                "<td>" + f.Total_Incident_Unbounce + "</td>" +
                "<td>" + n + "%" + "</td>" +
                "<td>" + actual_per_fix + "%" + "</td>" +
                "<td>" + percent + "%" + "</td>" +
                "</tr>"
            $(tblRow).appendTo("#ibounce_table tbody");
        }

        //Task Manual
        if (tableName === "Task_Manual") {
            let actual_per = 100 - (f.Actual / f.Total) * 100;
            let actual_per_fix = actual_per.toFixed(2);
            var calcu = json.Calculator.Internal_Process_Improvement.Task_Manual;
            const A = actual_per_fix;
            const E = n;
            percent = eval(calcu + "*100").toFixed(0);
            var tblRow = "<tr>" + "<td>End of " + f.Quarter + " Quarter</td>" +
                "<td>" + f.Total + "</td>" +
                "<td>" + f.Actual + "</td>" +
                "<td>" + f.Target + "</td>" +
                "<td>" + n + "%" + "</td>" +
                "<td>" + actual_per_fix + "%" + "</td>" +
                "<td>" + percent + "%" + "</td>" +
                "</tr>"
            $(tblRow).appendTo("#manual_task_table tbody");
        }

    });
}

const calcuPercentPlus = (tableName, f, total_actual, t) => {
    loadCalculatorJSON((response) => {
        const json = JSON.parse(response);
        //Incident Number - Incident Report
        if (tableName === "Incident_Number") {
            var percent;
            if (t.Target > total_actual) {
                var percent = 100;
            } else {
                var calcu = json.Calculator.Internal_Process_Improvement.Incident.Incident_Number;
                const A = total_actual;
                const T = t.Target;
                percent = eval(calcu + "*100").toFixed(0);
            }
            var tblRow = "<tr>" + "<td>End of " + f.Quarter + " Quarter</td>" +
                "<td>" + f.Actual + "</td>" +
                "<td>" + total_actual + "</td>" +
                "<td>" + t.Total_2022 + "</td>" +
                "<td>" + t.Target + "</td>" +
                "<td>" + percent + "%" + "</td>" +
                "</tr>"
            $(tblRow).appendTo("#inumber_table tbody");
        }

        //Improve Ideas
        if (tableName === "Improve_Ideas") {
            var calcu = json.Calculator.Internal_Process_Improvement.Improvement_Ideas;
            const A = t;
            const E = total_actual;
            percent = eval(calcu + "*100").toFixed(0);
            var tblRow = "<tr>" + "<td>End of " + f.Quarter + " Quarter</td>" +
                "<td>" + total_actual + "</td>" +
                "<td>" + t + "</td>" +
                "<td>" + percent + "%" + "</td>" +
                "</tr>"
            $(tblRow).appendTo("#ideas_table tbody");
        }
    });
}

const loadMainTable = () => {
    loadJSON((response) => {
        const json = JSON.parse(response);
        let sum_Actual_Auto = 0;
        let sum_Actual_Migra = 0;

        //Automation - Maximize
        $.each(json.Maximize_Efficiency.Automation_Process, function (i, f) {
            sum_Actual_Auto += f.Actual;
            calcuPercent("Automation", f, sum_Actual_Auto)
        });

        //Migration - Maximize
        $.each(json.Maximize_Efficiency.Project_Migration, function (i, f) {
            sum_Actual_Migra += f.Actual;
            calcuPercent("Migration", f, sum_Actual_Migra)
        });

        //Negative - Customer Satisfaction
        var captionNegative = document.getElementById("caption_negative");
        if (captionNegative != null) {
            captionNegative.innerHTML = json.Customer_Satisfaction.Negative.Caption;
            $.each(json.Customer_Satisfaction.Negative.Data, function (i, f) {
                let expect_per = json.Customer_Satisfaction.Negative.Expect_Per;
                calcuPercent("Customer_Negative", f, expect_per)
            })
        }

        //Positive -  Customer Satisfaction
        var captionPositive = document.getElementById("caption_positive");
        if (captionPositive != null) {
            var caption_String = json.Customer_Satisfaction.Positive.Caption;
            captionPositive.innerHTML = caption_String;
            $.each(json.Customer_Satisfaction.Positive.Data, function (i, f) {
                let expect_per = json.Customer_Satisfaction.Positive.Expect_Per;
                calcuPercent("Customer_Positive", f, expect_per)
            })
        }

        //Project Design
        var captionPdpage = document.getElementById("caption_pdpage");
        if (captionPdpage) {
            if (json && json.Internal_Process_Improvement && json.Internal_Process_Improvement.Project_Design) {
                captionPdpage.innerHTML = json.Internal_Process_Improvement.Project_Design.Caption;
                $.each(json.Internal_Process_Improvement.Project_Design.Data, function (i, f) {
                    var target_percent = json.Internal_Process_Improvement.Project_Design.Target_Per;
                    calcuPercent("Project_Design", f, target_percent);
                });
            }
        }

        //Incident Bounce - Incident Report
        var captionIbounce = document.getElementById("caption_ibounce");
        if (captionIbounce) {
            if (json && json.Internal_Process_Improvement && json.Internal_Process_Improvement.Incident && json.Internal_Process_Improvement.Incident.Incident_Bounce) {
                captionIbounce.innerHTML = json.Internal_Process_Improvement.Incident.Incident_Bounce.Caption;
                $.each(json.Internal_Process_Improvement.Incident.Incident_Bounce.Data, function (i, f) {
                    var target_percent = json.Internal_Process_Improvement.Incident.Incident_Bounce.Target_Per;
                    calcuPercent("Incident_Bounce", f, target_percent);
                });
            }
        }

        //Incident Number - Incident Report
        var captionInumber = document.getElementById("caption_inumber");
        if (captionInumber) {
            // Check if json is defined and has the expected structure
            if (json && json.Internal_Process_Improvement && json.Internal_Process_Improvement.Incident && json.Internal_Process_Improvement.Incident.Incident_Number) {
                captionInumber.innerHTML = json.Internal_Process_Improvement.Incident.Incident_Number.Caption;
                var t = json.Internal_Process_Improvement.Incident.Incident_Number;
                var total_actual = 0;
                $.each(json.Internal_Process_Improvement.Incident.Incident_Number.Data, function (i, f) {
                    total_actual += f.Actual;
                    calcuPercentPlus("Incident_Number", f, total_actual, t);
                });
            }
        }

        //Task Manual
        var captionMtpage = document.getElementById("caption_mtpage");
        if (captionMtpage) {
            if (json && json.Internal_Process_Improvement && json.Internal_Process_Improvement.Task_Manual) {
                captionMtpage.innerHTML = json.Internal_Process_Improvement.Task_Manual.Caption;
                $.each(json.Internal_Process_Improvement.Task_Manual.Data, function (i, f) {
                    let target_percent = json.Internal_Process_Improvement.Task_Manual.Target_Per;
                    calcuPercent("Task_Manual", f, target_percent);
                });
            }
        }

        //Improve Ideas
        var captionIdpage = document.getElementById("caption_idpage");
        if (captionIdpage) {
            if (json && json.Internal_Process_Improvement && json.Internal_Process_Improvement.Improvement_Ideas) {
                captionIdpage.innerHTML = json.Internal_Process_Improvement.Improvement_Ideas.Caption;
                let total_ideas = 0;
                $.each(json.Internal_Process_Improvement.Improvement_Ideas.Data, function (i, f) {
                    let target = json.Internal_Process_Improvement.Improvement_Ideas.Target;
                    total_ideas += f.Data.length;
                    calcuPercentPlus("Improve_Ideas", f, target, total_ideas);
                });
            }
        }
    });
}

const loadChart = function () {
    loadJSON((response) => {
        // 3. parse JSON string into JSON Object
        const json = JSON.parse(response);
        // 4. render to your page
        var LC_Automation = document.getElementById("Automation_Process_Chart");
        var LC_Migration = document.getElementById("Migration_Process_Chart");
        var LC_Customer = document.getElementById("feedbackChart");
        var LC_Project = document.getElementById("projectDesignChart");
        var LC_InBounce = document.getElementById("Incident_Bounce_Chart");
        var LC_InNumber = document.getElementById("Incident_Number_Chart");
        var LC_Task = document.getElementById("TaskChart");
        var LC_Improve = document.getElementById("improveIdeaChart");

        if (LC_Migration != null) {
            let labelName = [];
            let expectData = [];
            let actualData = [];
            let idList = [];
            let sum_Actual = 0;
            $.each(json.Maximize_Efficiency.Project_Migration, function (i, f) {
                labelName.push("End of " + f.Quarter + " Quarter");
                expectData.push(f.Expect);
                sum_Actual += f.Actual;
                actualData.push(sum_Actual);
                idList.push(f.ID);
            });

            var chart_migration = new Chart(LC_Migration,
                {
                    type: "bar",
                    data: {
                        labels: labelName,
                        secretVal: idList,
                        datasets: [
                            {
                                label: "Expect",
                                backgroundColor: "red",
                                borderColor: "rgba(54, 162, 235, 1)",
                                borderWidth: 1,
                                data: expectData,
                                barPercentage: 0.8,
                                categoryPercentage: 0.5,
                            },
                            {
                                label: "Actual",
                                backgroundColor: "blue",
                                borderColor: "rgba(255, 159, 64, 1)",
                                borderWidth: 1,
                                data: actualData,
                                barPercentage: 0.8,
                                categoryPercentage: 0.5,
                            }
                        ]
                    },
                    options: {
                        scales: {
                            xAxes: [
                                {
                                    ticks: {
                                        display: true
                                    }
                                }
                            ],
                            yAxes: [{
                                display: true,
                                ticks: {
                                    beginAtZero: true,
                                }
                            }]
                        },
                        legend: {
                            display: true,
                            position: "bottom"
                        },
                        title: {
                            display: true,
                            text: "Chart of Migration Process 2023",
                            fontSize: 25,
                            fontColor: "blue",
                            fontWeight: "bold",
                            padding: 40
                        },
                        hover: {
                            animationDuration: 0,
                        },
                        animation: {
                            onComplete: function () {
                                var ctx = chart_migration.chart.ctx;
                                chart_migration.data.datasets.forEach(function (dataset, i) {
                                    var meta = chart_migration.getDatasetMeta(i);
                                    meta.data.forEach(function (bar, index) {
                                        var data = dataset.data[index];
                                        ctx.fillStyle = 'black';
                                        ctx.font = '16px Arial';
                                        var text = data.toString();
                                        var xPos = bar._model.x;
                                        var yPos = bar._model.y;
                                        ctx.textAlign = 'center';
                                        ctx.textBaseline = 'bottom';
                                        ctx.fillText(text, xPos, yPos);
                                    });
                                });
                            }
                        },
                        onClick: function (e, activeElements) {
                            if (activeElements && activeElements.length > 0) {
                                var selectedIndex = activeElements[0]._index;
                                var clickedID = this.data.secretVal[selectedIndex];
                                show_migration_chart_detail(clickedID);
                            }
                        }
                    }
                }
            );
        }
        if (LC_Automation != null) {
            let labelName = [];
            let expectData = [];
            let actualData = [];
            let idList = [];
            let total_Actual = 0;
            $.each(json.Maximize_Efficiency.Automation_Process, function (i, f) {
                total_Actual += f.Actual;
                labelName.push("End of " + f.Quarter + " Quarter");
                expectData.push(f.Expect);
                actualData.push(total_Actual);
                idList.push(f.Quarter);
            });
            var char_automation = new Chart(LC_Automation,
                {
                    type: "bar",
                    data: {
                        labels: labelName,
                        secretVal: idList,
                        datasets: [
                            {
                                label: "Expect",
                                backgroundColor: "red",
                                borderColor: "rgba(54, 162, 235, 1)",
                                borderWidth: 1,
                                data: expectData,
                                barPercentage: 0.8,
                                categoryPercentage: 0.5,
                            },
                            {
                                label: "Actual",
                                backgroundColor: "blue",
                                borderColor: "rgba(255, 159, 64, 1)",
                                borderWidth: 1,
                                data: actualData,
                                barPercentage: 0.8,
                                categoryPercentage: 0.5,
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        scales: {
                            xAxes: [
                                {
                                    ticks: {
                                        display: true
                                    }
                                }
                            ],
                            yAxes: [{
                                display: true,
                                ticks: {
                                    beginAtZero: true,
                                }
                            }]
                        },
                        legend: {
                            display: true,
                            position: "bottom"
                        },
                        title: {
                            display: true,
                            text: "Chart of Automation Process 2023",
                            fontSize: 25,
                            fontColor: "blue",
                            fontWeight: "bold",
                            padding: 40
                        },
                        hover: {
                            animationDuration: 0,
                        },
                        animation: {
                            onComplete: function () {
                                var ctx = char_automation.chart.ctx;
                                char_automation.data.datasets.forEach(function (dataset, i) {
                                    var meta = char_automation.getDatasetMeta(i);
                                    meta.data.forEach(function (bar, index) {
                                        var data = dataset.data[index];
                                        ctx.fillStyle = 'black';
                                        ctx.font = '16px Arial';
                                        var text = data.toString();
                                        var xPos = bar._model.x;
                                        var yPos = bar._model.y;
                                        ctx.textAlign = 'center';
                                        ctx.textBaseline = 'bottom';
                                        ctx.fillText(text, xPos, yPos);
                                    });
                                });
                            }
                        },
                        onClick: function (e, activeElements) {
                            if (activeElements && activeElements.length > 0) {
                                var selectedIndex = activeElements[0]._index;
                                var clickedID = this.data.secretVal[selectedIndex];
                                show_automation_chart_detail(clickedID);
                            }
                        }
                    }
                }
            );
        }
        if (LC_Customer != null) {
            let labelName = [];
            let expectData = [];
            let actualData_Q2 = [];
            let actualData_Q3 = [];

            //Positive
            labelName.push("Positive");
            let posivive_expect = json.Customer_Satisfaction.Positive.Expect_Per;
            expectData.push(posivive_expect);

            $.each(json.Customer_Satisfaction.Positive.Data, function (i, f) {
                let value_2022 = f.Value_2022;
                let value_2023 = f.Actual;
                let actual_per = ((value_2023 / value_2022) * 100 - 100).toFixed(0);
                if (f.Quarter === "2nd") {
                    actualData_Q2.push(actual_per);
                } else if (f.Quarter === "3rd") {
                    actualData_Q3.push(actual_per);
                }
            });

            //Negative
            labelName.push("Negative");
            let negative_expect = json.Customer_Satisfaction.Negative.Expect_Per;
            expectData.push(negative_expect);

            $.each(json.Customer_Satisfaction.Negative.Data, function (i, f) {
                let value_2022 = f.Value_2022;
                let value_2023 = f.Actual;
                let actual_per = (100 - (value_2023 / value_2022) * 100).toFixed(0);
                if (f.Quarter === "2nd") {
                    actualData_Q2.push(actual_per);
                } else if (f.Quarter === "3rd") {
                    actualData_Q3.push(actual_per);
                }
            });

            var chart_customer = new Chart(LC_Customer,
                {
                    type: "bar",
                    data: {
                        labels: labelName,
                        datasets: [
                            {
                                label: "Expect",
                                backgroundColor: "red",
                                borderColor: "rgba(54, 162, 235, 1)",
                                borderWidth: 1,
                                data: expectData,
                                barPercentage: 0.8,
                                categoryPercentage: 0.5,
                            },
                            {
                                label: "End Q2",
                                backgroundColor: "blue",
                                borderColor: "rgba(255, 159, 64, 1)",
                                borderWidth: 1,
                                data: actualData_Q2,
                                barPercentage: 0.8,
                                categoryPercentage: 0.5,
                            },
                            {
                                label: "End Q3",
                                backgroundColor: "green",
                                borderColor: "rgba(255, 255, 64, 1)",
                                borderWidth: 1,
                                data: actualData_Q3,
                                barPercentage: 0.8,
                                categoryPercentage: 0.5,
                            }
                        ]
                    },
                    options: {
                        scales: {
                            xAxes: [
                                {
                                    ticks: {
                                        display: true
                                    }
                                }
                            ],
                            yAxes: [{
                                display: true,
                                ticks: {
                                    beginAtZero: true,
                                    callback: function (value) {
                                        return value + "%"; // Add % to ticks
                                    },
                                }
                            }]
                        },
                        legend: {
                            display: true,
                            position: "bottom"
                        },
                        title: {
                            display: true,
                            text: "Chart of Customer Feedback 2023",
                            fontSize: 25,
                            fontColor: "blue",
                            fontWeight: "bold",
                            padding: 40
                        },
                        hover: {
                            animationDuration: 0,
                        },
                        animation: {
                            onComplete: function () {
                                var ctx = chart_customer.chart.ctx;
                                chart_customer.data.datasets.forEach(function (dataset, i) {
                                    var meta = chart_customer.getDatasetMeta(i);
                                    meta.data.forEach(function (bar, index) {
                                        var data = dataset.data[index];
                                        ctx.fillStyle = 'black';
                                        ctx.font = '16px Arial';
                                        var text = data.toString() + "%";
                                        var xPos = bar._model.x;
                                        var yPos = bar._model.y;
                                        ctx.textAlign = 'center';
                                        ctx.textBaseline = 'bottom';
                                        ctx.fillText(text, xPos, yPos);
                                    });
                                });
                            }
                        }
                    }
                }
            );
        }
        if (LC_Project != null) {
            let labelName = [];
            let expectData = [];
            let actualData = [];
            let idList = [];
            $.each(json.Internal_Process_Improvement.Project_Design.Data, function (i, f) {
                var target_percent = json.Internal_Process_Improvement.Project_Design.Target_Per;
                var actual_percent = (f.New_DGS3) / f.New_Project * 100;
                let actual_per_fix = actual_percent.toFixed(2);
                labelName.push("End of " + f.Quarter + " Quarter");
                expectData.push(target_percent);
                actualData.push(actual_per_fix);
                idList.push(f.Quarter);
            });

            var chart_project = new Chart(LC_Project,
                {
                    type: "bar",
                    data: {
                        labels: labelName,
                        secretVal: idList,
                        datasets: [
                            {
                                label: "Expect",
                                backgroundColor: "red",
                                borderColor: "rgba(54, 162, 235, 1)",
                                borderWidth: 1,
                                data: expectData,
                                barPercentage: 0.8,
                                categoryPercentage: 0.5,
                            },
                            {
                                label: "Actual",
                                backgroundColor: "blue",
                                borderColor: "rgba(255, 159, 64, 1)",
                                borderWidth: 1,
                                data: actualData,
                                barPercentage: 0.8,
                                categoryPercentage: 0.5,
                            }
                        ]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    callback: function (value) {
                                        return value + "%"; // Add % to ticks
                                    },
                                }
                            }]
                        },
                        legend: {
                            display: true,
                            position: "bottom"
                        },
                        title: {
                            display: true,
                            text: "Chart of Project Design By OPS 2023",
                            fontSize: 25,
                            fontColor: "blue",
                            fontWeight: "bold",
                            padding: 40
                        },
                        hover: {
                            animationDuration: 0,
                        },
                        animation: {
                            onComplete: function () {
                                var ctx = chart_project.chart.ctx;
                                chart_project.data.datasets.forEach(function (dataset, i) {
                                    var meta = chart_project.getDatasetMeta(i);
                                    meta.data.forEach(function (bar, index) {
                                        var data = dataset.data[index];
                                        ctx.fillStyle = 'black';
                                        ctx.font = '16px Arial';
                                        var text = data.toString() + "%";
                                        var xPos = bar._model.x;
                                        var yPos = bar._model.y;
                                        ctx.textAlign = 'center';
                                        ctx.textBaseline = 'bottom';
                                        ctx.fillText(text, xPos, yPos);
                                    });
                                });
                            }
                        },
                        onClick: function (e) {
                            var activePoints = chart_project.getElementsAtEvent(e);
                            var selectedIndex = activePoints[1]._index;
                            show_list_pd_table(this.data.secretVal[selectedIndex]);
                        }
                    }
                }
            );
        }
        if (LC_InBounce != null) {
            let labelName = [];
            let expectData = [];
            let actualData = [];
            let idList = [];
            $.each(json.Internal_Process_Improvement.Incident.Incident_Bounce.Data, function (i, f) {
                var target_percent = json.Internal_Process_Improvement.Incident.Incident_Bounce.Target_Per;
                var actual_number = (1 - (f.Total_Incident_Unbounce / f.Total_Incident)) * 100
                let actual_per_fix = actual_number.toFixed(0);
                labelName.push("End of " + f.Quarter + " Quarter");
                expectData.push(target_percent);
                actualData.push(actual_per_fix);
                idList.push(f.ID);
            });

            var chart_InBounce = new Chart(LC_InBounce,
                {
                    type: "bar",
                    data: {
                        labels: labelName,
                        secretVal: idList,
                        datasets: [
                            {
                                label: "Target",
                                backgroundColor: "red",
                                borderColor: "rgba(54, 162, 235, 1)",
                                borderWidth: 1,
                                data: expectData,
                                barPercentage: 0.8,
                                categoryPercentage: 0.5,
                            },
                            {
                                label: "Actual",
                                backgroundColor: "blue",
                                borderColor: "rgba(255, 159, 64, 1)",
                                borderWidth: 1,
                                data: actualData,
                                barPercentage: 0.8,
                                categoryPercentage: 0.5,
                            }
                        ]
                    },
                    options: {
                        scales: {
                            xAxes: [
                                {
                                    ticks: {
                                        display: true
                                    }
                                }
                            ],
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    callback: function (value) {
                                        return value + "%"; // Add % to ticks
                                    },
                                }
                            }]
                        },
                        legend: {
                            display: true,
                            position: "bottom"
                        },
                        title: {
                            display: true,
                            text: "Chart of Incident Bounce 2023",
                            fontSize: 25,
                            fontColor: "blue",
                            fontWeight: "bold",
                            padding: 40
                        },
                        hover: {
                            animationDuration: 0,
                        },
                        animation: {
                            onComplete: function () {
                                var ctx = chart_InBounce.chart.ctx;

                                chart_InBounce.data.datasets.forEach(function (dataset, i) {
                                    var meta = chart_InBounce.getDatasetMeta(i);
                                    meta.data.forEach(function (bar, index) {
                                        var data = dataset.data[index];
                                        ctx.fillStyle = 'black';
                                        ctx.font = '16px Arial';
                                        var text = data.toString() + "%";

                                        var xPos = bar._model.x;
                                        var yPos = bar._model.y;

                                        ctx.textAlign = 'center';
                                        ctx.textBaseline = 'bottom';

                                        ctx.fillText(text, xPos, yPos);
                                    });
                                });
                            }
                        }
                    }
                }
            );
        }
        if (LC_InNumber != null) {
            let labelName = [];
            let expectData = [];
            let actualData = [];
            let idList = [];
            var t = json.Internal_Process_Improvement.Incident.Incident_Number;
            var total_actual = 0;
            $.each(json.Internal_Process_Improvement.Incident.Incident_Number.Data, function (i, f) {
                total_actual += f.Actual;
                labelName.push("End of " + f.Quarter + " Quarter");
                expectData.push(t.Target);
                actualData.push(total_actual);
                idList.push(f.ID);
            });

            var chart_InNumber = new Chart(LC_InNumber,
                {
                    type: "bar",
                    data: {
                        labels: labelName,
                        secretVal: idList,
                        datasets: [
                            {
                                label: "Target",
                                backgroundColor: "red",
                                borderColor: "rgba(54, 162, 235, 1)",
                                borderWidth: 1,
                                data: expectData,
                                barPercentage: 0.8,
                                categoryPercentage: 0.5,
                            },
                            {
                                label: "Actual",
                                backgroundColor: "blue",
                                borderColor: "rgba(255, 159, 64, 1)",
                                borderWidth: 1,
                                data: actualData,
                                barPercentage: 0.8,
                                categoryPercentage: 0.5,
                            }
                        ]
                    },
                    options: {
                        scales: {
                            xAxes: [
                                {
                                    ticks: {
                                        display: true
                                    }
                                }
                            ],
                            yAxes: [{
                                display: true,
                                ticks: {
                                    beginAtZero: true,
                                }
                            }]
                        },
                        legend: {
                            display: true,
                            position: "bottom"
                        },
                        title: {
                            display: true,
                            text: "Chart of Incident Number 2023",
                            fontSize: 25,
                            fontColor: "blue",
                            fontWeight: "bold",
                            padding: 40
                        },
                        hover: {
                            animationDuration: 0,
                        },
                        animation: {
                            onComplete: function () {
                                var ctx = chart_InNumber.chart.ctx;

                                chart_InNumber.data.datasets.forEach(function (dataset, i) {
                                    var meta = chart_InNumber.getDatasetMeta(i);
                                    meta.data.forEach(function (bar, index) {
                                        var data = dataset.data[index];
                                        ctx.fillStyle = 'black';
                                        ctx.font = '16px Arial';
                                        var text = data.toString();

                                        var xPos = bar._model.x;
                                        var yPos = bar._model.y;

                                        ctx.textAlign = 'center';
                                        ctx.textBaseline = 'bottom';

                                        ctx.fillText(text, xPos, yPos);
                                    });
                                });
                            }
                        }
                    }
                }
            );
        }
        if (LC_Task != null) {
            let labelName = [];
            let expectData = [];
            let actualData = [];
            let idList = [];
            $.each(json.Internal_Process_Improvement.Task_Manual.Data, function (i, f) {
                let actual_per = 100 - (f.Actual / f.Total) * 100;
                let actual_per_fix = actual_per.toFixed(2);
                let target_percent = json.Internal_Process_Improvement.Task_Manual.Target_Per;
                labelName.push("End of " + f.Quarter + " Quarter");
                expectData.push(target_percent);
                actualData.push(actual_per_fix);
                idList.push(f.Quarter);
            });
            var chart_Task = new Chart(LC_Task,
                {
                    type: "bar",
                    data: {
                        labels: labelName,
                        secretVal: idList,
                        datasets: [
                            {
                                label: "Target",
                                backgroundColor: "red",
                                borderColor: "rgba(54, 162, 235, 1)",
                                borderWidth: 1,
                                data: expectData,
                                barPercentage: 0.8,
                                categoryPercentage: 0.5,
                            },
                            {
                                label: "Actual",
                                backgroundColor: "blue",
                                borderColor: "rgba(255, 159, 64, 1)",
                                borderWidth: 1,
                                data: actualData,
                                barPercentage: 0.8,
                                categoryPercentage: 0.5,
                            }
                        ]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    callback: function (value) {
                                        return value + "%"; // Add % to ticks
                                    },
                                }
                            }]
                        },
                        legend: {
                            display: true,
                            position: "bottom"
                        },
                        title: {
                            display: true,
                            text: "Chart of Improvement 2023",
                            fontSize: 25,
                            fontColor: "blue",
                            fontWeight: "bold",
                            padding: 40
                        },
                        hover: {
                            animationDuration: 0,
                        },
                        animation: {
                            onComplete: function () {
                                var ctx = chart_Task.chart.ctx;
                                chart_Task.data.datasets.forEach(function (dataset, i) {
                                    var meta = chart_Task.getDatasetMeta(i);
                                    meta.data.forEach(function (bar, index) {
                                        var data = dataset.data[index];
                                        ctx.fillStyle = 'black';
                                        ctx.font = '16px Arial';
                                        var text = data.toString() + "%";
                                        var xPos = bar._model.x;
                                        var yPos = bar._model.y;
                                        ctx.textAlign = 'center';
                                        ctx.textBaseline = 'bottom';
                                        ctx.fillText(text, xPos, yPos);
                                    });
                                });
                            }
                        },
                        onClick: function (e) {
                            var activePoints = chart_Task.getElementsAtEvent(e);
                            var selectedIndex = activePoints[1]._index;
                            show_mt_chart_detail(this.data.secretVal[selectedIndex]);
                        }
                    }
                }
            );
        }
        if (LC_Improve != null) {
            let labelName = [];
            let expectData = [];
            let actualData = [];
            let idList = [];
            let total_ideas = 0;
            $.each(json.Internal_Process_Improvement.Improvement_Ideas.Data, function (i, f) {
                var target = json.Internal_Process_Improvement.Improvement_Ideas.Target;
                total_ideas += f.Data.length;
                labelName.push(f.Name);
                expectData.push(target);
                actualData.push(total_ideas);
                idList.push(f.Quarter);
            });

            var chart_Improve = new Chart(LC_Improve,
                {
                    type: "bar",
                    data: {
                        labels: labelName,
                        secretVal: idList,
                        datasets: [
                            {
                                label: "Expect",
                                backgroundColor: "red",
                                borderColor: "rgba(54, 162, 235, 1)",
                                borderWidth: 1,
                                data: expectData,
                                barPercentage: 0.8,
                                categoryPercentage: 0.5,
                            },
                            {
                                label: "Actual",
                                backgroundColor: "blue",
                                borderColor: "rgba(255, 159, 64, 1)",
                                borderWidth: 1,
                                data: actualData,
                                barPercentage: 0.8,
                                categoryPercentage: 0.5,
                            }
                        ]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                }
                            }]
                        },
                        legend: {
                            display: true,
                            position: "bottom"
                        },
                        title: {
                            display: true,
                            text: "Chart of Improvement Ideas 2023",
                            fontSize: 25,
                            fontColor: "blue",
                            fontWeight: "bold",
                            padding: 40
                        },
                        hover: {
                            animationDuration: 0,
                        },
                        animation: {
                            onComplete: function () {
                                var ctx = chart_Improve.chart.ctx;
                                chart_Improve.data.datasets.forEach(function (dataset, i) {
                                    var meta = chart_Improve.getDatasetMeta(i);
                                    meta.data.forEach(function (bar, index) {
                                        var data = dataset.data[index];
                                        ctx.fillStyle = 'black';
                                        ctx.font = '16px Arial';
                                        var text = data.toString();
                                        var xPos = bar._model.x;
                                        var yPos = bar._model.y;
                                        ctx.textAlign = 'center';
                                        ctx.textBaseline = 'bottom';
                                        ctx.fillText(text, xPos, yPos);
                                    });
                                });
                            }
                        },
                        onClick: function (e) {
                            var activePoints = chart_Improve.getElementsAtEvent(e);
                            var selectedIndex = activePoints[1]._index;
                            show_list_id_table(this.data.secretVal[selectedIndex]);
                        }
                    }
                }
            );
        }
    });
}

const show_automation_chart_detail = (selectedID) => {
    loadAutomationProcess((response) => {
        const json = JSON.parse(response);
        $("#automation_table_detail").empty();
        $("#automation_table_title").empty();
        $.each(json.Automation_Process, function (i, f) {
            if (f.Quarter === selectedID) {
                if (f.Data.length > 0) {
                    var tblTitle = "<h2 class='font-control'>List for Automation Process of " + f.Quarter + " Quarter</h2>";
                    $(tblTitle).appendTo("#automation_table_title");
                    var tblData = "<thead class='header'>" +
                        "<tr>" + "<th>No</th>" +
                        "<th>Team</th>" +
                        "<th>Project Name</th>" +
                        "<th>PIC</th>" +
                        "<th>Description</th>" +
                        "</tr>" + "</thead>" + "<tbody>";
                    $.each(f.Data, function (j, g) {
                        tblData += "<tr>" + "<td>" + [j + 1] + "</td>" +
                            "<td>" + g.Team + "</td>" +
                            "<td class='text_align_td'>" + g.Project_Name + "</td>" +
                            "<td class='text_align_td'>" + g.PIC + "</td>" +
                            "<td class='text_align_td'>" + g.Description + "</td>" +
                            "</tr>"
                    });
                    tblData += "</tbody>";
                    $(tblData).appendTo("#automation_table_detail");
                }
            }
        });
    });
}

const show_migration_chart_detail = (selectedID) => {
    loadMigrationPlan((response) => {
        const json = JSON.parse(response);
        $("#migration_table_detail").empty();
        $("#migration_table_title").empty();

        $.each(json.Migration_Plan, function (i, f) {
            if (f.Quarter === selectedID) {
                var tblTitle = "<h2 class='font-control'>List for Migration Process of " + f.Quarter + " 2023</h2>";
                $(tblTitle).appendTo("#migration_table_title");
                var tblData = "<thead class='header'>" +
                    "<tr>" + "<th>Code</th>" +
                    "<th>Project Name</th>" +
                    "<th>Groups</th>" +
                    "<th>Manager</th>" +
                    "</tr>" + "</thead>" + "<tbody>";
                $.each(f.Project_List, function (j, g) {
                    tblData += "<tr>" + "<td>" + g["Project Code"] + "</td>" +
                        "<td>" + g["Project Name"] + "</td>" +
                        "<td class='text_align_td'>" + g.Group + "</td>" +
                        "<td class='text_align_td'>" + g["Project Managers"] + "</td>" +
                        "</tr>"
                });
                tblData += "</tbody>";
                $(tblData).appendTo("#migration_table_detail");
            }
        });
    });
}

const show_list_pd_table = (selectedID) => {
    loadListJSON((response) => {
        const json = JSON.parse(response);
        $("#pd_detail_div").empty();
        $.each(json.Project_Design, function (i, f) {
            if (f.Quarter === selectedID) {
                var tblRow = "<h2>Table of List Detail Project Design By OPS on " + selectedID + " Quarter of 2023</h2>" +
                    "<div class='table-responsive'>" +
                    "<table border='2' class='table table-bordered table-hover' id='bigTbl'>" +
                    "<thead class='header'>" +
                    "<tr>" +
                    "<th>Customer Name</th>" +
                    "<th>Project Code</th>" +
                    "<th>Project Name</th>" +
                    "<th>Project Description</th>" +
                    "<th>Offline Project's Application</th>" +
                    "<th>Active Status</th>" +
                    "<th>Approve Status</th>" +
                    "</tr>" +
                    "</thead>" +
                    "<tbody id='myTable'>";
                $.each(f.Data, function (j, g) {
                    var customer_name = g["Customer name"] || "";
                    var project_code = g["Project Code"] || "";
                    var project_name = g["Project Name"] || "";
                    var project_decription = g["Project Description"] || "";
                    var application = g["Offline Project's Application"] || "";
                    var active_status = g["Active Status"] || "";
                    var approve_status = g["Approve Status"] || "";
                    tblRow += "<tr>" + "<td class='text_align_td'>" + customer_name + "</td>" +
                        "<td>" + project_code + "</td>" +
                        "<td class='text_align_td'>" + project_name + "</td>" +
                        "<td class='text_align_td'>" + project_decription + "</td>" +
                        "<td>" + application + "</td>" +
                        "<td>" + active_status + "</td>" +
                        "<td>" + approve_status + "</td>" +
                        "</tr>"
                }
                );
                tblRow += "</tbody></table></div>";
                $(tblRow).appendTo("#pd_detail_div");
            }
        });
    });
}

const show_mt_chart_detail = function (selectQuarter) {
    loadTaskList((response) => {
        const json = JSON.parse(response);
        $("#chart_title").empty();
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);
        const zValue = [["Type", "Value"]];
        let total_remain_task = 0;
        let total_automatic_task = 0;
        let title = "";

        $.each(json.Task, function (i, f) {
            if (selectQuarter === f.Quarter) {
                title = f.Quarter;
                $.each(f.Data, function (j, k) {
                    if (k.Status === "Manual") {
                        total_remain_task += 1;
                    } else {
                        total_automatic_task += 1;
                    }
                });
            }
        });

        zValue.push(["Manual", total_remain_task]);
        zValue.push(["Automation", total_automatic_task]);

        function drawChart() {
            const data = google.visualization.arrayToDataTable(zValue);

            const options = {
                height: 400,
                width: 600,
                titlePosition: 'none',
                legend: {
                    position: 'bottom'
                },
                is3D: true
            };

            const chartContainer = document.getElementById('3DChart');
            const chart = new google.visualization.PieChart(chartContainer);

            function selectHandler() {
                var selectedItem = chart.getSelection()[0];
                if (selectedItem) {
                    var topping = data.getValue(selectedItem.row, 0);
                    show_chart_detail(selectQuarter, topping);
                }
            }

            google.visualization.events.addListener(chart, 'select', selectHandler);

            // Add style rule to show pointer cursor on hover
            $(chartContainer).css('cursor', 'pointer');

            chart.draw(data, options);
        }


        var titleChart = "<h2>Chart of Task Number on " + title + " Quarter</h2>";
        $(titleChart).appendTo("#chart_title");
    });
}

const show_chart_detail = (selectQuarter, selectedID) => {
    loadTaskList((response) => {
        const json = JSON.parse(response);
        $("#table_detail").empty();
        $("#table_title").empty();
        var tblTitle = "<h2 class='font-control'>Table of " + selectedID + " Task</h2>";
        $(tblTitle).appendTo("#table_title");
        var tblData = "<thead class='header'>" +
            "<tr>" + "<th>No</th>" +
            "<th>Team</th>" +
            "<th>Project Name</th>" +
            "<th>Description</th>" +
            "</tr>" + "</thead>" + "<tbody>";
        $.each(json.Task, function (j, k) {
            if (selectQuarter === k.Quarter) {
                $.each(k.Data, function (i, f) {
                    if (f.Status === selectedID) {
                        tblData += "<tr>" +
                            "<td>" + [i + 1] + "</td>" +
                            "<td>" + f.Team + "</td>";
                        if (f.ProjectName.constructor === Array) {
                            tblData += "<td class='text_align_td'>"
                            $.each(f.ProjectName, function (m, n) {
                                tblData += n + "<br/>";
                            });
                            tblData += "</td>"
                        } else {
                            tblData += "<td class='text_align_td'>" + f.ProjectName + "</td>";
                        }
                        tblData += "<td class='text_align_td'>" + f.Description + "</td>" + "</tr>";
                    }
                });
            }
        });
        tblData += "</tbody>";
        $(tblData).appendTo("#table_detail");
    });
}

const show_list_id_table = (selectedName) => {
    loadJSON((response) => {
        const json = JSON.parse(response);
        $("#ideas_detail_div").empty();
        var tblRow = "<h2>Table of List Improvement Ideas in " + selectedName + " Quarter of 2023</h2>" +
            "<table border='2' class='table table-bordered table-hover' id='bigTbl'>" +
            "<thead class='header'>" +
            "<tr>" +
            "<th>No</th>" +
            "<th>Team</th>" +
            "<th>Project Name</th>" +
            "<th>Project Description</th>" +
            "</tr>" +
            "</thead>" +
            "<tbody id='myTable'>";

        $.each(json.Internal_Process_Improvement.Improvement_Ideas.Data, function (i, f) {
            if (f.Quarter === selectedName) {
                $.each(f.Data, function (j, k) {
                    tblRow += "<tr>" + "<td>" + [j + 1] + "</td>" +
                        "<td>" + k.Team + "</td>" +
                        "<td class='text_align_td'>" + k.ProjectName + "</td>" +
                        "<td class='text_align_td'>" + k.Description + "</td>" +
                        "</tr>"
                });
            }
        });
        tblRow += "</tbody></table>";
        $(tblRow).appendTo("#ideas_detail_div");
    });
}

loadMainTable();
loadChart();

document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slider");
    let currentIndex = 0;
    const totalSlides = document.querySelectorAll(".slide").length;
    const currentSlideElement = document.getElementById("current-slide");
    const totalSlidesElement = document.getElementById("total-slides");

    function showSlide(index) {
        const slideWidth = document.querySelector(".slide").clientWidth;
        slider.style.transform = `translateX(${-index * slideWidth}px)`;
        updateSlideCounter();
    }

    function updateSlideCounter() {
        currentSlideElement.textContent = currentIndex + 1;
        totalSlidesElement.textContent = totalSlides;
    }

    window.nextSlide = function () {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    };

    window.prevSlide = function () {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(currentIndex);
    };

    // setInterval(window.nextSlide, 3000); // Auto slide every 3 seconds
});


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

