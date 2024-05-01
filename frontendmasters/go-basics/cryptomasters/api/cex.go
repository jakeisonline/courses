package api

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"

	"jakeisonline.com/go/cryptomasters/datatypes"
)

const apiUrl = "https://cex.io/api/ticker/%s/USD"

func GetRate(currency string) (*datatypes.Rate, error) {
	if len(currency) != 3 {
		return nil, fmt.Errorf("3 characters required, but %d received", len(currency))
	}
	upCurrency := strings.ToUpper(currency)
	resp, err := http.Get(fmt.Sprintf(apiUrl, upCurrency))
	if err != nil {
		return nil, err // Only pointer returns can take nil
	}

	var response Response

	if resp.StatusCode == http.StatusOK {
		bodyBytes, err := io.ReadAll(resp.Body)
		if err != nil {
			return nil, err
		}
		err = json.Unmarshal(bodyBytes, &response)
		if err != nil {
			return nil, err
		}

	} else {
		return nil, fmt.Errorf("status code received: %v", resp.StatusCode)
	}

	rate := datatypes.Rate{Currency: currency, Price: response.Bid}
	return &rate, nil
}
