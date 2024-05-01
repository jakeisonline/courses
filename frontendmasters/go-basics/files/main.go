package main

import (
	"fmt"

	"jakeisonline.com/go/filesmanagement/utils"
)

func main() {
	filePath := "data/text.txt"
	content, err := utils.ReadTextFile(filePath)
	if err == nil {
		fmt.Println(content)
		newContent := fmt.Sprintf("Original: %v\nDouble Original: %v%v", content, content, content)
		utils.WriteToFile(filePath+".output.txt", newContent)
	} else {
		fmt.Printf("ERROR: %v", err)
	}
}
