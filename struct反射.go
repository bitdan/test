package main

import (
	"fmt"
	"reflect"
)

type Address struct {
	City string
}

type Person struct {
	Name    string
	Age     uint
	Address // 匿名字段
}

func (p Person) Hello() {
	fmt.Println("我是无尘啊")
}

func main() {
	//p := Person{Name:"无尘",Age:18,Address:Address{City:"北京"}}  //map形式初始化
	p := Person{"无尘", 18, Address{"北京"}}

	// 获取目标对象
	t := reflect.TypeOf(p)
	fmt.Println("t:", t)

	// .Name()可以获取去这个类型的名称
	fmt.Println("类型的名称:", t.Name())

	// 获取目标对象的值类型
	v := reflect.ValueOf(p)
	fmt.Println("v:", v)

	// .NumField()获取其包含的字段的总数
	for i := 0; i < t.NumField(); i++ {
		// 从0开始获取Person所包含的key
		key := t.Field(i)
		// interface方法来获取key所对应的值
		value := v.Field(i).Interface()
		fmt.Printf("第%d个字段是：%s:%v = %v \n", i+1, key.Name, key.Type, value)
	}
	// 取出这个City的详情打印出来
	fmt.Printf("%#v\n", t.FieldByIndex([]int{2, 0}))
	// .NumMethod()来获取Person里的方法
	for i := 0; i < t.NumMethod(); i++ {
		m := t.Method(i)
		fmt.Printf("第%d个方法是：%s:%v\n", i+1, m.Name, m.Type)
	}
}
