package main

import (
	"fmt"
	"sync"
)

var wg sync.WaitGroup

func heoo() {
	defer wg.Done()
	fmt.Println("helolo goroutine")
}
func main() {
	wg.Add(1)
	go heoo()
	fmt.Println("main goroutine done")
	wg.Wait()
}
