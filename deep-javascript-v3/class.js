/* # `class`

In this exercise, you will refactor some code that manages student enrollment records for a workshop, from the namespace pattern to the `class` pattern.

## Instructions

1. Define a class called `Helpers` that includes the functions that are not `this`-aware.

2. Define a class called `Workshop` that extends `Helpers`, which includes all the other functions. Hint: `constructor()` and `super()`.

3. Instantiate the `Workshop` class as `deepJS`.
*/

class Helpers {
  sortByNameAsc(record1, record2) {
    if (record1.name < record2.name) return -1;
    else if (record1.name > record2.name) return 1;
    else return 0;
  }
  printRecord(record) {
    console.log(
      `${record.name} (${record.id}): ${record.paid ? "Paid" : "Not Paid"}`
    );
  }
  getStudentId(record) {
    return record.id;
  }
};

class Workshop extends Helpers {
  constructor() {
    super();
    this.currentEnrollment = [];
    this.studentRecords = [];
  }
  addStudent(id, name, paid) {
    this.studentRecords.push({ id, name, paid });
  }
  enrollStudent(id) {
    if (!this.currentEnrollment.includes(id)) {
      this.currentEnrollment.push(id);
    }
  }
  printCurrentEnrollment() {
    this.printRecords(this.currentEnrollment);
  }
  enrollPaidStudents() {
    this.currentEnrollment = this.paidStudentsToEnroll();
    this.printCurrentEnrollment();
  }
  remindUnpaidStudents() {
    this.remindUnpaid(this.currentEnrollment);
  }
  getStudentFromId(studentId) {
    return this.studentRecords.find(matchId);

    // *************************

    function matchId(record) {
      return record.id == studentId;
    }
  }
  printRecords(recordIds) {
    var records = recordIds.map(this.getStudentFromId.bind(this));

    records.sort(this.sortByNameAsc);

    records.forEach(this.printRecord);
  }
  remindUnpaid(recordIds) {
    var unpaidIds = recordIds.filter(this.notYetPaid.bind(this));

    this.printRecords(unpaidIds);
  }
  paidStudentsToEnroll() {
    var recordsToEnroll = this.studentRecords.filter(
      this.needToEnroll.bind(this)
    );

    var idsToEnroll = recordsToEnroll.map(this.getStudentId);

    return [...this.currentEnrollment, ...idsToEnroll];
  }
  needToEnroll(record) {
    return record.paid && !this.currentEnrollment.includes(record.id);
  }
  notYetPaid(studentId) {
    var record = this.getStudentFromId(studentId);
    return !record.paid;
  }
}

// ********************************

const deepJS = new Workshop;

deepJS.addStudent(311, "Frank", /*paid=*/ true);
deepJS.addStudent(410, "Suzy", /*paid=*/ true);
deepJS.addStudent(709, "Brian", /*paid=*/ false);
deepJS.addStudent(105, "Henry", /*paid=*/ false);
deepJS.addStudent(502, "Mary", /*paid=*/ true);
deepJS.addStudent(664, "Bob", /*paid=*/ false);
deepJS.addStudent(250, "Peter", /*paid=*/ true);
deepJS.addStudent(375, "Sarah", /*paid=*/ true);
deepJS.addStudent(867, "Greg", /*paid=*/ false);

deepJS.enrollStudent(410);
deepJS.enrollStudent(105);
deepJS.enrollStudent(664);
deepJS.enrollStudent(375);

deepJS.printCurrentEnrollment();
console.log("----");
deepJS.enrollPaidStudents();
console.log("----");
deepJS.remindUnpaidStudents();

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
