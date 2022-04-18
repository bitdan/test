package main

import (
	"fmt"
	"sync"
)

var wg sync.WaitGroup

func he(i int) {
	defer wg.Done()
	fmt.Println("HIHIHIHI", i)

}
func main() {

	for i := 0; i < 20; i++ {
		wg.Add(1)
		go he(i)
	}
	wg.Wait()
	fmt.Println("main goroutine")
}
