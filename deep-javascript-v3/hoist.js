/* # Hoisting

In this exercise, you will refactor some code that manages student enrollment records for a workshop, to take advantage of function hoisting.

## Instructions

Refactor all inline function expressions to be function declarations. Place function declarations at the bottom (that is, below any executable code) of their respective scopes.

Also, pull function declarations to outer scopes if they don't need to be nested.
*/

// ********************************

var currentEnrollment = [410, 105, 664, 375];

var studentRecords = [
  { id: 313, name: "Frank", paid: true },
  { id: 410, name: "Suzy", paid: true },
  { id: 709, name: "Brian", paid: false },
  { id: 105, name: "Henry", paid: false },
  { id: 502, name: "Mary", paid: true },
  { id: 664, name: "Bob", paid: false },
  { id: 250, name: "Peter", paid: true },
  { id: 375, name: "Sarah", paid: true },
  { id: 867, name: "Greg", paid: false },
];

printRecords(currentEnrollment);
console.log("----");
currentEnrollment = paidStudentsToEnroll();
printRecords(currentEnrollment);
console.log("----");
remindUnpaid(currentEnrollment);

/*
	Bob (664): Not Paid
	Henry (105): Not Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Frank (313): Paid
	Henry (105): Not Paid
	Mary (502): Paid
	Peter (250): Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Henry (105): Not Paid
*/

function getStudentFromId(studentId) {
  return studentRecords.find(matchId);

  function matchId(record) {
    return record.id == studentId;
  }
}

function printRecords(recordIds) {
  let records = recordIds.map(getStudentFromId);

  records = sortByNameAsc(records);

  records.forEach(function printRecord(record) {
    console.log(
      `${record.name} (${record.id}): ${record.paid ? "Paid" : "Not Paid"}`
    );
  });
}

function sortByNameAsc(records) {
  records = records.sort(sortNames);
  return records;

  function sortNames(record1, record2) {
    if (record1.name < record2.name) return -1;
    else if (record1.name > record2.name) return 1;
    else return 0;
  }
}

function paidStudentsToEnroll() {
  const recordsToEnroll = studentRecords.filter(needToEnroll);
  const idsToEnroll = recordsToEnroll.map(getStudentId);

  return [...currentEnrollment, ...idsToEnroll];

  function needToEnroll(record) {
    return record.paid && !currentEnrollment.includes(record.id);
  }

  function getStudentId(record) {
    return record.id;
  }
}

function remindUnpaid(recordIds) {
  const unpaidIds = recordIds.filter(notYetPaid);

  printRecords(unpaidIds);

  function notYetPaid(studentId) {
    const record = getStudentFromId(studentId);
    return !record.paid;
  }
}
