package main

import (
	"fmt"

	"jakeisonline.com/go/cryptomasters/api"
)

func main() {
	rate, err := api.GetRate("BTC")
	if err == nil {
		fmt.Printf("Rate for %v is %.2f\n", rate.Currency, rate.Price)
	}
}
