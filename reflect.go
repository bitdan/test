package main

import (
	"fmt"
	"reflect"
)

func main() {
	var name string = "微客鸟窝"
	// TypeOf会返回变量的类型，比如int/float/struct/指针等
	reflectType := reflect.TypeOf(name)

	// valueOf返回变量的的值，此处为"微客鸟窝"
	reflectValue := reflect.ValueOf(name)

	fmt.Println("type: ", reflectType)   //type:  string
	fmt.Println("value: ", reflectValue) //value:  微客鸟窝
}
