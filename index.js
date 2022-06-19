// Your code here
function createEmployeeRecord(info){
    return {
        firstName:info[0],
        familyName:info[1],
        title:info[2],
        payPerHour:info[3],
        timeInEvents:[],
        timeOutEvents:[],
    }
}
function createEmployeeRecords(records){
    return records.map((info) =>{
        return createEmployeeRecord(info)
    })
}

function createTimeInEvent(employee,dateStamp){
    let [date, hour] = dateStamp.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour,10),
        date,
    })
    return employee;
}

function createTimeOutEvent(employee,dateStamp){
    let [date, hour] = dateStamp.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour,10),
        date,
    })
    return employee;
}

const hoursWorkedOnDate = (employee, dateSort)=>{
    let timeIn = employee.timeInEvents.find((event)=>{
        return event.date === dateSort
    }
    )
    let timeOut = employee.timeOutEvents.find((event)=>{
        return event.date === dateSort
    }

    )
    if(timeIn && timeOut){
        return timeOut.hour - timeIn.hour
    }
    else{
        return 0
    }
}


function wagesEarnedOnDate(employee, dateSort){
    let hours = hoursWorkedOnDate(employee, dateSort)
    return hours * employee.payPerHour
}
const allWagesFor = employee=>{
    let wages = []
    employee.timeInEvents.forEach((event)=>{
        wages.push(wagesEarnedOnDate(employee, event.date))
    }
    )
    return wages
}

const findEmployeeByFirstName = (scrArray, first)=>{
    return scrArray.find(function(rec){
      return rec.firstName === firstName
    })
  }
const calculatePayroll =(arrayOfEmployeeRecords)=>{
    return arrayOfEmployeeRecords.reduce((memo,rec)=>{
      return memo + allWagesFor(rec)
    },0)
  }