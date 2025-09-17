


function getFirstDayOfMonth(year: number, month: number): number {
    return new Date(year, month, 1).getDay();
}

function getNumberofDaysInCurrMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
}

function getNumberofDaysInPrevMonth(year: number, month: number): number {
    return new Date(year, month, 0).getDate();
}


const firstDay = new Date(2025,0,1).getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
console.log('firstDay',firstDay);
console.log('getFirstDayOfMonth',getFirstDayOfMonth(2025,8)); // September 2025
console.log('getNumberofDaysInPrevMonth', getNumberofDaysInPrevMonth(2025,8)); 
console.log('getNumberofDaysInCurrMonth', getNumberofDaysInCurrMonth(2025,8)); 