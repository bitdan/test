package main

import (
	"fmt"
	"strings"
	"unsafe"
)

const (
	n1 = iota
	n2
	n3
	n4
)
const (
	_  = iota
	KB = 1 << (10 * iota)
	MB = 1 << (10 * iota)
	GB = 1 << (10 * iota)
	TB = 1 << (10 * iota)
	PB = 1 << (10 * iota)
)

func findRepeatNumber(nums []int) int {

	mapp := make(map[int]bool)
	for i := 0; i < len(nums); i++ {
		if mapp[i] {
			return nums[i]
		}
		mapp[i] = true
	}
	return -1
}

func main() {

	arr2 := [5]int{10, 20, 30, 40, 50}

	t := findRepeatNumber(arr2[:])
	fmt.Printf("%v\n", t)
	fmt.Println("KB", KB)
	s1 := "hell0"
	idX := strings.Index(s1, "l")
	fmt.Println("idX", idX)
	s2 := "pprof.cn波哥"
	for i := 0; i < len((s2)); i++ {
		fmt.Printf("%v(%c)", s2[i], s2[i])
	}
	fmt.Println()
	for _, r := range s2 {
		fmt.Printf("%v(%c)", r, r)
	}
	fmt.Println()
	myarr := []int{1}
	myarr = append(myarr, 2)
	myarr = append(myarr, 3, 4)
	myarr = append(myarr, []int{7, 8}...)
	myarr = append([]int{0}, myarr...)
	myarr = append(myarr[:5], append([]int{5, 6}, myarr[5:]...)...)
	fmt.Println(myarr)
	var a byte = 'A'
	var b uint8 = 'B'
	var c rune = 'C'
	fmt.Printf("a的值 %c \n b的值%c \n c占的空间的值%d\n", a, b, unsafe.Sizeof(c))
	var country string = "hello,圣诞节"
	var qwe string = `\n\r`
	fmt.Println(len(country))
	fmt.Println(qwe)
	ptr := new(int)
	fmt.Printf("ptr addr:\n", ptr)
	fmt.Printf("ptr vlue:", *ptr)
	d := 10
	e := &d // 取变量a的地址，将指针保存到b中
	fmt.Printf("type of b:%T\n", e)
	f := *e // 指针取值（根据指针去内存取值）
	fmt.Printf("type of c:%T\n", f)
	fmt.Printf("value of c:%v\n", f)
	g := 10
	fmt.Println(&g)
	h := &g
	*h = 20
	fmt.Println(g)

}
