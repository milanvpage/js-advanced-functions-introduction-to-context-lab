// Your code here
// The payroll system
  // populates a record from an Array
  function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    // populates a firstName field from the 0th element, familyName field from the 1th element..etc
    return {
      firstName: firstName,
      familyName: familyName,
      title: title,
      payPerHour: payPerHour,
      // initializes a field, timeInEvents, to hold an empty Array
      timeInEvents: [],
      // initializes a field, timeOutEvents, to hold an empty Array
      timeOutEvents: []
    };
  };

  // Converts each nested Array into an employee record and accumulates it to a new Array
function createEmployeeRecords(arrOfArrays){
    return arrOfArrays.map(createEmployeeRecord)
  };

  // it adds a timeIn event Object to an employee's record of timeInEvents 
// when provided an employee record and Date/Time String and returns the updated record
function createTimeInEvent(employeeRec, dateStamp) { // dateStamp => "YYYY-MM-DD HHMM"
    let timeInEvent = {
      // creates the correct type
      type: "TimeIn",
      // extracts the correct hour - 1300
      hour: parseInt((dateStamp).split(" ")[1]),
      // extracts the correct date - 2018-01-01
      date: dateStamp.split(" ")[0] 
    };
    employeeRec.timeInEvents.push(timeInEvent);
    return employeeRec;
  };

  // Add timeOut event Object to an employee's record of timeOutEvents when provided an 
// employee rec and Date/Time String and returns the updated record
function createTimeOutEvent(employeeRec, dateStamp) {
    let timeOutEvent = {
      // creates the correct type
      type: "TimeOut",
      // extracts the correct hour - 1300
      hour: parseInt((dateStamp).split(" ")[1]),
      // extracts the correct date - 2018-01-01
      date: dateStamp.split(" ")[0] 
    }
    employeeRec.timeOutEvents.push(timeOutEvent);
    return employeeRec;
  }

  // calculates the hours worked when given an employee record and a date ("YYYY-MM-DD")
function hoursWorkedOnDate(employeeRec, date) {
    let timeIn = employeeRec.timeInEvents.find(event => event.date === date);
    let timeOut = employeeRec.timeOutEvents.find(event => event.date === date);
    let hoursWorked = (timeOut.hour - timeIn.hour)/100;
    return hoursWorked;
  };
  
  // multiplies the hours worked by the employee's rate per hour
  function wagesEarnedOnDate(employeeRec, date) {
    let hoursWorked = hoursWorkedOnDate(employeeRec, date);
    let payOwed = hoursWorked * employeeRec.payPerHour;
    return payOwed;
  };
  
  // Given an employee record with MULTIPLE date-matched timeInEvent and timeOutEvent
  // aggregates all the dates' wages and adds them together
  function allWagesFor(employeeRec) {
    // find available dates
    const datesWorked = employeeRec.timeInEvents.map(event => event.date);
    const allWagesArray = datesWorked.map(date => wagesEarnedOnDate(employeeRec, date));
    const totalWages = allWagesArray.reduce((total, wageOfDay) => (total + wageOfDay), 0);
    return totalWages;
  };
  
  // Given an array of multiple employees
  // aggregates all the dates' wages and adds them together
  function calculatePayroll(employeesRecs) {
    const totalPay = employeesRecs.reduce((total, employeeRec) => total + allWagesFor(employeeRec), 0);
    return totalPay;
  };
  
  function findEmployeeByFirstName(srcArray, firstName) {
    const employee = srcArray.find(employeeRec => employeeRec.firstName === firstName);
    return employee;
  };
