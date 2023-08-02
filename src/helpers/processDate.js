// Hàm để xác định ngày đầu tuần (Thứ Hai) của tuần tiếp theo từ ngày đã cho
function getNextWeekStart(startingDate) {
    const currentDate = new Date(startingDate);
    const dayOfWeek = currentDate.getDay();
    const daysUntilMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
    currentDate.setDate(currentDate.getDate() + daysUntilMonday);
    return currentDate;
}

// Hàm để tạo ra một mảng các ngày từ Thứ Hai đến Chủ Nhật của tuần tiếp theo từ ngày đã cho
function generateNextWeekDays(startingDate) {
    const days = [];
    const nextMonday = getNextWeekStart(startingDate);

    // Tạo mảng chứa các ngày từ Thứ Hai đến Chủ Nhật của tuần kế tiếp
    for (let i = 0; i < 7; i++) {
        const day = new Date(nextMonday);
        day.setDate(nextMonday.getDate() + i);
        days.push(day);
    }

    return days;
}

function getDatesInWeek(weekNumber, year) {
    const firstJanuary = new Date(year, 0, 1);
    const firstJanuaryDay = firstJanuary.getDay(); // Ngày trong tuần của ngày đầu tiên trong năm
    const firstWeekDay = 1; // Thứ 2 (Monday)

    // Xác định số ngày cần bỏ qua để đến tuần thứ weekNumber
    const daysToFirstWeek = firstWeekDay - firstJanuaryDay + (weekNumber - 1) * 7;

    // Tính toán ngày đầu tiên của tuần
    const firstWeekDate = new Date(year, 0, 1 + daysToFirstWeek);

    // Xác định các ngày trong tuần từ ngày đầu tiên
    const datesInWeek = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(firstWeekDate);
        date.setDate(firstWeekDate.getDate() + i);
        datesInWeek.push(date);
    }

    return datesInWeek;
}

function groupWeeksInMonth(year, month) {
    const weeks = [];
    const firstDateOfMonth = new Date(year, month, 1);
    const lastDateOfMonth = new Date(year, month + 1, 0);

    let currentWeek = [];
    let currentDate = new Date(firstDateOfMonth);

    while (currentDate <= lastDateOfMonth) {
        if (currentDate.getDay() === 1) {
            if (currentWeek.length > 0) {
                weeks.push([...currentWeek]);
            }
            currentWeek.length = 0;
        }

        if (currentDate.getMonth() === month) {
            // Điều chỉnh múi giờ về GMT+7
            const adjustedDate = new Date(currentDate.getTime() + 7 * 60 * 60 * 1000);
            currentWeek.push(adjustedDate);
        }

        currentDate.setDate(currentDate.getDate() + 1);
    }

    if (currentWeek.length > 0) {
        weeks.push([...currentWeek]);
    }

    return weeks;
}


/* function groupWeeksInMonth(year, month) {
    const weeks = [];
    const firstDateOfMonth = new Date(year, month, 1);
    const lastDateOfMonth = new Date(year, month + 1, 0);

    let currentWeek = [];
    let currentDate = new Date(firstDateOfMonth);

    while (currentDate <= lastDateOfMonth) {
        if (currentDate.getDay() === 1) {
            if (currentWeek.length > 0) {
                weeks.push([...currentWeek]);
            }
            currentWeek.length = 0;
        }

        if (currentDate.getMonth() === month) {
            currentWeek.push(new Date(currentDate));
        }

        currentDate.setDate(currentDate.getDate() + 1);
    }

    if (currentWeek.length > 0) {
        weeks.push([...currentWeek]);
    }

    return weeks;
} */

module.exports = { generateNextWeekDays, getDatesInWeek, groupWeeksInMonth };