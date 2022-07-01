package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
)

func main() {
	var buf bytes.Buffer
	encoder := json.NewEncoder(&buf)
	params := map[string]interface{}{
		"title":  "my title",
		"body":   "this is not important!",
		"author": "kevin",
		"type":   6,
	}
	if err := encoder.Encode(params); err != nil {
		fmt.Fprintln(os.Stderr, err)
		return
	}

	url := fmt.Sprintf("http://localhost:3333/articles/%d/update?device=%s", 5, "ios")
	req, err := http.NewRequest(http.MethodPost, url, &buf)
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		return
	}

	req.Header.Add("Authorization", "Bearer <jwt-token>")
	// req.Header.Set("Content-Type", "application/json")
	cli := http.Client{}
	resp, err := cli.Do(req)
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		return
	}

	io.Copy(os.Stdout, resp.Body)
}
