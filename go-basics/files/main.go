package main

import (
	"fmt"

	"jakeisonline.com/go/filesmanagement/utils"
)

func main() {
	content, err := utils.ReadTextFile("data/text.txt")
	if err != nil {
		fmt.Printf("ERROR: %v", err)
	} else {
		fmt.Println(content)
	}

}
