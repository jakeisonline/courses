/* # Impurity

This is a two-part exercise to practice two techniques for containing function impurity.

## Instructions (Part 1)

In this part of the exercise, you will contain the function impurity of `sortStudentsByName(..)` using a wrapper function.

**NOTE:** Do not modify the contents of `sortStudentsByName(..)` for this exercise.

1. Move and modify `getStudentsByName(..)` so that it wraps around `sortStudentsByName(..)` (and calls it internally).

2. `getStudentsByName(..)` should receive the current list of students, and return a new sorted list of students.

3. Make sure that calling `getStudentsByName(..)` doesn't have a side-effect of modifying the global `students` array.

4. The `studentsTest1` and `studentsTest3` tests at the bottom of the exercise should all print `true`.

## Instructions (Part 2)

In this part of the exercise, you will contain the function impurity of `sortStudentsByID(..)` using an adapter function.

**NOTE:** Do not modify the contents of `sortStudentsByID(..)` for this exercise.

1. Modify `getStudentsByID(..)` so that it is an adapter that calls `sortStudentsByID(..)`.

2. `getStudentByID(..)` should receive the current list of students, and return a new sorted list of students.

3. Make sure that calling `getStudentsByID(..)` doesn't have a side-effect of modifying the global `students` array.

4. All tests (`studentsTest1`, `studentsTest2`, and `studentsTest3`) at the bottom of the exercise should all print `true`.
*/

"use strict";

var students = [
	{ id: 260, name: "Kyle" },
	{ id: 729, name: "Susan" },
	{ id: 42, name: "Frank" },
	{ id: 74, name: "Jessica" },
	{ id: 491, name: "Ally" }
];

function sortStudentsByID() {
	// Don't modify this function
	students.sort(function byID(s1,s2){
		return s1.id - s2.id;
	});
	return students;
}

// *************************************

// modify/move this function
function getStudentsByName(students) {
	students = [ ...students ];
	return sortStudentsByName();

	function sortStudentsByName() {
		// Don't modify this function
		students.sort(function byName(s1,s2){
			if (s1.name < s2.name) return -1;
			else if (s1.name > s2.name) return 1;
			else return 0;
		});
		return students;
	}
}

// modify/move this function
function getStudentsByID(currentStudents) {
	let originalStudents = [ ...students ];
	students = [ ...currentStudents ];
	let newStudents = sortStudentsByID();
	students = originalStudents;

	return newStudents;
}

// *************************************

var studentsTest1 = getStudentsByName(students);
console.log(studentsTest1[0].name === "Ally");
console.log(studentsTest1[1].name === "Frank");
console.log(studentsTest1[2].name === "Jessica");
console.log(studentsTest1[3].name === "Kyle");
console.log(studentsTest1[4].name === "Susan");

var studentsTest2 = getStudentsByID(students);
console.log(studentsTest2[0].id === 42);
console.log(studentsTest2[1].id === 74);
console.log(studentsTest2[2].id === 260);
console.log(studentsTest2[3].id === 491);
console.log(studentsTest2[4].id === 729);

var studentsTest3 = students;
console.log(studentsTest3[0].id === 260 && studentsTest3[0].name === "Kyle");
console.log(studentsTest3[1].id === 729 && studentsTest3[1].name === "Susan");
console.log(studentsTest3[2].id === 42 && studentsTest3[2].name === "Frank");
console.log(studentsTest3[3].id === 74 && studentsTest3[3].name === "Jessica");
console.log(studentsTest3[4].id === 491 && studentsTest3[4].name === "Ally");
