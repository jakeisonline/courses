package main

import (
	"fmt"

	"jakeisonline.com/go/types/data"
)

func main() {
	max := data.Instructor{Id: 3, LastName: "Firtman"}
	max.FirstName = "Maxmimilino"

	goCourse := data.Course{Id: 2, Name: "Go Fundamentals", Instructor: max}

	swiftWS := data.NewWorkshop("Swift with iOS", max)

	fmt.Printf("%v", goCourse)
	fmt.Printf("%v", swiftWS)

	var courses [2]data.Signable
	courses[0] = goCourse
	courses[1] = swiftWS

	for _, course := range courses {
		fmt.Println(course)
	}
}
