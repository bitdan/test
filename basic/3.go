package main

import (
	"fmt"
)

func myfunc() {
	fmt.Println("B")
}

func myfunc1() {
	fmt.Println("11111")
}

func main() {
	defer myfunc()
	fmt.Println("A")
	defer myfunc1()
	name := "go"
	defer fmt.Println(name)

	name = "ptj"
	fmt.Println(name)
}
