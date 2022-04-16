package main

import "fmt"

func myfunc(iface interface{}) {
	fmt.Println(iface)
}

func myfunc1(ifaces ...interface{}) {
	for _, iface := range ifaces {
		fmt.Println(iface)
	}
}

func myfunc2(iface interface{}) {
	switch iface.(type) {
	case int:
		fmt.Println("参数类型是: int")
	case string:
		fmt.Println("参数类型是: string")
	}
}
func main() {
	var i interface{}
	i = 1
	fmt.Println(i)
	i = "heelo"
	fmt.Println(i)
	i = false
	fmt.Println(i)
	fmt.Printf("type : %T, value:%v\n", i, i)
	a := 10
	b := "hee"
	c := true
	myfunc(a)
	myfunc(b)
	myfunc(c)
	myfunc1(a, b, c)
	ant := make([]interface{}, 5)
	ant[0] = 11
	ant[1] = "jslng"
	ant[2] = []int{1, 2, 3, 4, 5}
	for _, v := range ant {
		fmt.Println(v)
	}
	myfunc2(a)
	myfunc2(b)
}
