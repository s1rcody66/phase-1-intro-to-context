// Your code here
let createEmployeeRecord = (row) => ({
    firstName: row[0],
    familyName: row[1],
    title: row[2],
    payPerHour: row[3],
    timeInEvents: [],
    timeOutEvents: []
});

let createEmployeeRecords = (employeeRowData) => employeeRowData.map
    (row => createEmployeeRecord(row));

let createTimeInEvent = (employee, dateStamp) => {
    let [date, hour] = dateStamp.split('');
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    });
    return employee;
}

let createTimeOutEvent = (employee, dateStamp) => {
    let [date, hout] = dateStamp.split('');
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hout, 10),
        date,
    });
    return employee;
}

let hoursWorkedOnDate = (employee, wantedDate) => {
    let inEvent = employee.timeInEvents.find(e => e.date === wantedDate);
    let outEvent = employee.timeOutEvents.find(e => e.date === wantedDate);

    if (inEvent && outEvent) {
        return (outEvent.hour - inEvent.hour) / 100;
    }
    return 0;
}

let wagesEarnedOnDate = (employee, wantedDate) => {
    let hours = hoursWorkedOnDate(employee, wantedDate);
    let paymentRate = employee.payPerHour;
    return hours * paymentRate;
}

let allWagesFor =  (employee) => {
    let overallWages = 0;
    let suitableDates = employee.timeInEvents.map(e=>e.date);
    for (let date of suitableDates){
        overallWages += wagesEarnedOnDate(employee, date);
    }
    return overallWages;

}

let calculatePayroll = (employees) => {
    let overallPayRoll = 0;
    for(let employee of employees){
        overallPayRoll+= allWagesFor(employee);
    }
    return overallPayRoll;

};
