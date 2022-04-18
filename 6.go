package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"
)

type person struct {
	name string
	city string
	age  int8
}

type Animal struct {
	name string
}

func (a *Animal) move() {
	fmt.Printf("%s会动! \n", a.name)
}

type Dog struct {
	Feet int8
	*Animal
}

func (d *Dog) wang() {
	fmt.Printf("%s会汪汪汪~~~~\n", d.name)
}

func timestampDemo() {
	now := time.Now()
	timestamp1 := now.Unix()
	timestamp2 := now.UnixNano()
	fmt.Printf("current timestamp1 : %v \n", timestamp1)
	fmt.Printf("current timestamp2 : %v \n", timestamp2)
}

func main() {
	var p1 person
	p1.name = "ppp"
	p1.city = "广州"
	p1.age = 18
	fmt.Printf("p1 =%v \n", p1)
	fmt.Printf("p1=%#v\n", p1)
	d1 := &Dog{
		Feet: 4,
		Animal: &Animal{
			name: "乐乐",
		},
	}
	d1.wang()
	d1.move()
	timestampDemo()
	log.Println("这是一条普通日志")
	v := "putong"
	log.Printf("这是一条%s日志", v)
	log.Fatalln("chufa fatcl 的日志")
	log.Panicln("chufa  panic 的日志")

	resp, err := http.Get("http://www.51mg.com/")
	if err != nil {
		fmt.Println("get failed, err", err)
		return
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("read from resp.body failed ,err:", err)
		return
	}
	fmt.Print(string(body))
}
