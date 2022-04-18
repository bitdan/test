package main

import (
	"fmt"
	"sync"
	"sync/atomic"
	"time"
)

var num int64
var wg sync.WaitGroup
var l sync.Mutex

func add() {
	num = num + 1
	wg.Done()
}

func mutexadd() {
	l.Lock()
	num = num + 1
	l.Unlock()
	wg.Done()
}

func atomicAdd() {
	atomic.AddInt64(&num, 1)
	wg.Done()
}
func main() {
	start := time.Now()
	for i := 0; i < 20000; i++ {
		wg.Add(1)
		// go add()
		// 		18838
		// 5.4964ms
		go mutexadd()
		// 		20000
		// 5.996ms
		go atomicAdd()
	}
	wg.Wait()
	end := time.Now()
	fmt.Println(num)
	fmt.Println(end.Sub(start))
}
