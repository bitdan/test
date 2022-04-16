package main

import "fmt"

var name string = "go"

func myfunc() string {
	defer func() {
		name = "python"
	}()

	fmt.Printf("myfunc 函数里的name：%s\n", name)
	return name
}

func set_data(x int) {
	defer func() {
		if err := recover(); err != nil {
			fmt.Println(err)
		}
	}()
	var arr [10]int
	arr[x] = 88
}

func sum(args ...int) (sum int) {
	for _, v := range args {
		sum += v
	}
	return sum
}

func Sum(args ...int) int {
	result := sum(args...)
	return result
}
func myprintf(args ...interface{}) {
	for _, v := range args {
		switch v.(type) {
		case int:
			fmt.Println(v, "is an int value")
		case string:
			fmt.Println(v, "is an string value")
		case int64:
			fmt.Println(v, "is an int64 value")
		default:
			fmt.Println(v, "is an unkown type")
		}
	}
}
func test(s string, n ...int) string {
	var x int
	for _, i := range n {
		x += i
	}
	return fmt.Sprint(s, x)
}

func double(a int) (int, int) {
	b := a * 2
	return a, b
}
func main() {
	myname := myfunc()
	fmt.Printf("main 函数里的name: %s\n", name)
	fmt.Println("main 函数里的myname: ", myname)
	set_data(20)
	fmt.Println("everything is ok")
	fmt.Println(sum(1, 2, 3))
	var v1 int = 1
	var v2 int64 = 345
	var v3 string = "hello"
	var v4 float32 = 1.23
	myprintf(v1, v2, v3, v4)
	s := []int{1, 2, 3, 4}
	res := test("sum : %d", s...)
	println(res)
	fmt.Println(Sum(1, 2, 3))
	a, b := double(2)
	fmt.Println(a, b)
}
