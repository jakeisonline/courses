package utils

import (
	"os"
)

func ReadTextFile(filename string) (string, error) {
	content, err := os.ReadFile(filename)
	if err == nil {
		return string(content), nil
	} else {
		return "", err
	}
}
