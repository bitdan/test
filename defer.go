package main

import (
	"fmt"
)

func fun1() (res int) {
	defer func() {
		res++
	}()
	return 1
}
func main() {
	fmt.Println(fun1())
	return
}
