package utils

import "os"

func WriteToFile(filename string, content string) error {
	return os.WriteFile(filename, []byte(content), 0644)
}
