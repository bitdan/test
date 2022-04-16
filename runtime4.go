package main

import (
	"fmt"
	"runtime"
	"time"
)

func A() {
	for i := 0; i < 10; i++ {
		fmt.Println("a", i)
	}
}

func B() {
	for i := 0; i < 10; i++ {
		fmt.Println("b", i)
	}
}
func main() {
	// runtime.GOMAXPROCS(1)
	runtime.GOMAXPROCS(2)
	go A()
	go B()
	time.Sleep(time.Second)
}
