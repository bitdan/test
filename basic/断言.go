package main

import "fmt"

func whoAmi(a interface{}) {
	//1.不断言
	//程序报错：cannot convert a (type interface{}) to type string: need type assertion
	//fmt.Println(string(a))

	//2.非安全类型断言
	//fmt.Println(a.(string)) //无尘

	//3.安全类型断言
	value, ok := a.(string) //安全，断言失败，也不会panic，只是ok的值为false
	if !ok {
		fmt.Println("断言失败")
		return
	}
	fmt.Println(value) //无尘
}
func main() {
	str := "无尘"
	whoAmi(str)
}
