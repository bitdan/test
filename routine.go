package main

import (
	"fmt"
	"runtime"
)

func main() {

	fmt.Println("cpus:", runtime.NumCPU())               // 返回当前系统的CPU核数量
	fmt.Println("goroot:", runtime.GOROOT())             //
	fmt.Println("NumGoroutine:", runtime.NumGoroutine()) // 返回真该执行和排队的任务总数
	fmt.Println("archive:", runtime.GOOS)                // 目标操作系统
}
