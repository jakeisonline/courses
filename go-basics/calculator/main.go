package main

import "fmt"

func main() {
	var operation string
	var number1, number2 int

	fmt.Println("CALCULATOR GO 1.0")
	fmt.Println("=================")
	fmt.Println("Which operation do you want to perform? (add, subtract, multiply, divide)?")
	fmt.Scanf("%s", &operation)
	fmt.Println("Enter first number:")
	fmt.Scanf("%d", &number1)
	fmt.Println("Enter second number:")
	fmt.Scanf("%d", &number2)
	fmt.Print("Calculated number is: ")
	switch operation {
	case "add":
		fmt.Print(number1 + number2)
	case "subtract":
		fmt.Print(number1 - number2)
	case "multiple":
		fmt.Print(number1 * number2)
	case "divide":
		fmt.Print(number1 / number2)
	}
	// Avoid termainls warning of no newline (e.g. %)
	fmt.Print("\n")
}
