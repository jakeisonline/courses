function paidToString(paidBoolean) {
  return paidBoolean ? "Paid" : "Not Paid";
}

function sortByStudentName(students) {
  return students.sort((a, b) => 1 * a.name.localeCompare(b.name));
}

function getStudentById(studentId) {
  return studentRecords.find((student) => student.id === studentId);
}

function getManyStudentsById(students) {
  let matches = [];

  students.forEach((recordId) => {
    const match = getStudentById(recordId);

    if (match) {
      matches.push(match);
    }
  });

  return matches;
}

function paidStudentsToEnroll() {
  const studentIdsToEnroll = studentRecords
    .filter(
      (student) => !currentEnrollment.includes(student.id) && student.paid
    )
    .map((student) => student.id)
    .concat(currentEnrollment);

	return studentIdsToEnroll;
}

function printRecords(recordIds) {
  let matches = getManyStudentsById(recordIds);

  matches = sortByStudentName(matches);

  matches.forEach((match) => {
    console.log(`${match.name} (${match.id}): ${paidToString(match.paid)}`);
  });
}

function remindUnpaid(recordIds) {
	const students = getManyStudentsById(recordIds);

	const unpaidStudents = students
    .filter(
      (student) => !student.paid
    )
    .map((student) => student.id);

	printRecords(unpaidStudents);
}

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
