package main

import (
	"fmt"
	"time"
)

func main() {
	timer1 := time.NewTimer(2 * time.Second)
	t1 := time.Now()
	fmt.Printf("t1 :%v\n", t1)
	t2 := <-timer1.C
	fmt.Printf("t2: %v\n", t2)

	// timer2 := time.NewTicker(time.Second)
	// for {
	// 	<-timer2.C
	// 	fmt.Println("时间到")
	// }
	//time.Sleep(time.Second)
	timer3 := time.NewTimer(2 * time.Second)
	<-timer3.C
	fmt.Println("2秒到")
	<-time.After(2 * time.Second)
	fmt.Println("2秒到")

	time4 := time.NewTimer(2 * time.Second)
	go func() {
		<-time4.C
		fmt.Println("定时器执行了")
	}()
	b := time4.Stop()
	if b {
		fmt.Println("time4关闭")
	}
}
