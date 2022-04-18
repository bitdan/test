package main

import (
	"fmt"
	"runtime"
)

func main() {
	go func() {
		defer fmt.Println("a.defer")
		func() {
			defer fmt.Println("b.defer")
			runtime.Goexit()
			defer fmt.Println("c.defer")
			fmt.Println("B")
		}()
		fmt.Println("A")
	}()
	for {

	}
}
