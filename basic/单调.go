package main

import "fmt"

func isMonotonic(nums []int) bool {
	inc, dec := true, true
	for i := 0; i < len(nums)-1; i++ {
		if nums[i] > nums[i+1] {
			inc = false
		}
		if nums[i] < nums[i+1] {
			dec = false
		}
	}
	return inc || dec
}

func main() {
	var test = [...]int{1, 2, 2, 3}
	flag := isMonotonic(test[:])
	fmt.Println(flag)
}
