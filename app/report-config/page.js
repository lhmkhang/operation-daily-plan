'use client'
import style from '@/styles/ReportConfig.module.css';
import ButtonComponent from '@/components/base/Button';
import TableComponent from '@/components/base/Table';

const jsonData = [
    {
        "ID": "01",
        "Report Name": "Maximize Efficiency Report",
        "User Create": "loilm",
        "Date Create": "01.12.2023"
    },
    {
        "ID": "02",
        "Report Name": "Customer Satisfaction Report",
        "User Create": "loilm",
        "Date Create": "01.12.2023"
    },
    {
        "ID": "03",
        "Report Name": "Project Design Report",
        "Group": "Internal Process Improvement Report",
        "User Create": "loilm",
        "Date Create": "01.12.2023"
    },
    {
        "ID": "04",
        "Report Name": "Incident Report",
        "Group": "Internal Process Improvement Report",
        "User Create": "loilm",
        "Date Create": "01.12.2023"
    },
    {
        "ID": "05",
        "Report Name": "Task Manual Report",
        "Group": "Internal Process Improvement Report",
        "User Create": "loilm",
        "Date Create": "01.12.2023"
    },
    {
        "ID": "06",
        "Report Name": "Improvement Ideas Report",
        "Group": "Internal Process Improvement Report",
        "User Create": "loilm",
        "Date Create": "01.12.2023"
    },
    {
        "ID": "07",
        "Report Name": "Improvement Ideas Report",
        "Group": "Internal Process Improvement Report",
        "User Create": "loilm",
        "Date Create": "01.12.2023"
    },
    {
        "ID": "08",
        "Report Name": "Improvement Ideas Report",
        "Group": "Internal Process Improvement Report",
        "User Create": "loilm",
        "Date Create": "01.12.2023"
    },
    {
        "ID": "09",
        "Report Name": "Improvement Ideas Report",
        "Group": "Internal Process Improvement Report 1",
        "User Create": "loilm",
        "Date Create": "01.12.2023"
    },
    {
        "ID": "10",
        "Report Name": "Improvement Ideas Report",
        "Group": "Internal Process Improvement Report 2",
        "User Create": "loilm 123",
        "Date Create": "01.12.2023"
    },
    {
        "ID": "11",
        "Report Name": "Improvement Ideas Report",
        "Group": "Internal Process Improvement Report 3",
        "User Create": "loilm",
        "Date Create": "03.12.2023"
    },
    {
        "ID": "12",
        "Report Name": "Improvement Ideas Report",
        "Group": "Internal Process Improvement Report",
        "User Create": "loilm",
        "Date Create": "12.12.2023"
    },
    {
        "ID": "13",
        "Report Name": "Improvement Ideas Report",
        "Group": "Internal Process Improvement Report",
        "User Create": "loilm",
        "Date Create": "01.12.2023"
    },
    {
        "ID": "14",
        "Report Name": "Improvement Ideas Report",
        "Group": "Internal Process Improvement Report",
        "User Create": "loilm",
        "Date Create": "09.12.2023"
    },
    {
        "ID": "15",
        "Report Name": "Improvement Ideas Report",
        "Group": "Internal Process Improvement Report",
        "User Create": "loilm",
        "Date Create": "01.12.2023"
    },
    {
        "ID": "16",
        "Report Name": "Improvement Ideas Report",
        "Group": "Internal Process Improvement Report",
        "User Create": "loilm",
        "Date Create": "05.12.2023"
    },
    {
        "ID": "17",
        "Report Name": "Improvement Ideas Report",
        "Group": "Internal Process Improvement Report",
        "User Create": "loilm",
        "Date Create": "01.11.2023"
    },
    {
        "ID": "18",
        "Report Name": "Improvement Ideas Report",
        "Group": "Internal Process Improvement Report",
        "User Create": "loilm",
        "Date Create": "06.13.2023",
    }
]

let listInvisible = ["dateDifference"];

// Calculate the difference between the current date and each "Date Create"
jsonData.forEach(item => {
    const createDate = item['Date Create'];
    const [day, month, year] = createDate.split('.');
    const createDateObject = new Date(`${year}-${month}-${day}`);

    // Check if the parsing is successful
    if (createDateObject !== "InvalidDate") {
        item.dateDifference = (Math.abs(createDateObject - new Date()) / 1000 / 3600 / 24).toFixed();
    } else {
        // Set dateDifference to NaN in case of parsing error
        item.dateDifference = NaN;
    }
});

// Filter out objects with NaN dateDifference
const validObjects = jsonData.filter(item => !isNaN(item.dateDifference));

// Sort the valid data based on the calculated date difference
validObjects.sort((a, b) => a.dateDifference - b.dateDifference);

// Get the first 5 objects (closest to the current date)
const nearestObjects = validObjects.slice(0, 5);

const ReportConfig = () => {

    return (
        <div className={style.contain}>
            <div className={style.titleDiv}>
                <h3>Recent report</h3>
                <div className={style.middleDiv}></div>
                <ButtonComponent btnType="NewReport" btnValue="NEW REPORT" />
            </div>
            <div className={style.slideDiv}>
                {nearestObjects.map(items => {
                    return (
                        <div className={style.slide} key={items['ID']}>
                            <div className={style.slideElement}>
                                <h4>{items['Report Name']}</h4>
                                <p>{items['Date Create']}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div style={{ paddingTop: '3vh' }}>
                <TableComponent tblType="ListReport" tblDataString={jsonData} listInvisible={listInvisible} />
            </div>
        </div>
    )
}

export default ReportConfig;