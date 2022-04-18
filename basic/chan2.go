package main

import "fmt"

func fibonacci(mychan chan int) {
	n := cap(mychan)
	x, y := 1, 1
	for i := 0; i < n; i++ {
		mychan <- x
		x, y = y, x+y
	}
	close(mychan)
}
func main() {
	pipline := make(chan int, 10)
	go fibonacci(pipline)
	for k := range pipline {
		fmt.Println(k)
	}
}
