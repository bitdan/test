package main

import (
	"fmt"
	"os"
)

func main() {
	b := make([]byte, 1024)
	f, err := os.Open("./2.go")
	_, err = f.Read(b)
	defer f.Close()
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(string(b))
}
