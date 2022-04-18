package main

import "fmt"

var resume chan int

func intergers() chan int {
	yield := make(chan int)
	count := 0
	go func() {
		for {
			yield <- count
			count++
		}
	}()
	return yield
}
func gernerateInterger() int {
	return <-resume
}
func main() {
	resume = intergers()
	fmt.Println(gernerateInterger())
	fmt.Println(gernerateInterger())
	fmt.Println(gernerateInterger())
}
