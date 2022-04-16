package main

import (
	"fmt"
)

func main() {
	pipline := make(chan int, 10)
	fmt.Printf("管道有%d 个缓冲数据\n", cap(pipline))
	pipline <- 1
	fmt.Printf("管道中当前有 %d 个数据\n", len(pipline))
}
