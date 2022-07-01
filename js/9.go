package main

import (
	"fmt"
	"reflect"
)

type Student struct {
	name string
}

func main() {

	var a int = 50
	v := reflect.ValueOf(a) // 返回Value类型对象，值为50
	t := reflect.TypeOf(a)  // 返回Type类型对象，值为int
	fmt.Println(v, t, v.Type(), t.Kind())

	var b [5]int = [5]int{5, 6, 7, 8}
	fmt.Println(reflect.TypeOf(b), reflect.TypeOf(b).Kind(), reflect.TypeOf(b).Elem()) // [5]int array int

	var Pupil Student
	p := reflect.ValueOf(Pupil) // 使用ValueOf()获取到结构体的Value对象

	fmt.Println(p.Type()) // 输出:Student
	fmt.Println(p.Kind()) // 输出:struct

}
