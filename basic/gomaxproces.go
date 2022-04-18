package main

import (
	"fmt"
	"runtime"
	"sync"
)

func main() {
	runtime.GOMAXPROCS(1)
	var wg sync.WaitGroup
	wg.Add(2)
	fmt.Printf("Starting go routines")
	go func() {
		defer wg.Done()
		for char := 'a'; char < 'a'+26; char++ {
			fmt.Printf("%c", char)
		}
	}()
	go func() {
		defer wg.Done()
		for number := 1; number < 27; number++ {
			fmt.Printf("%d", number)
		}
	}()

	fmt.Println("\nWaiting to finish")
	wg.Wait()
	fmt.Println("\n terminating program")
}
