package test1

import "fmt"

func main() {
	var slice1 []int = make([]int, 4)
	slice1[0] = 11
	slice1[1] = 23
	slice1[2] = 35
	slice1[3] = 46

	for index, value := range slice1 {
		fmt.Printf("slice at %d is :%d\n", index, value)
	}
}
