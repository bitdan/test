package main

import (
	"fmt"
	"time"
)

func main() {
	pipline := make(chan int)
	go func() {
		fmt.Println("准备发送数据:100")
		pipline <- 100
	}()

	go func() {
		num := <-pipline
		fmt.Printf("接收到的数据是: %d", num)
	}()

	time.Sleep(1)
}
