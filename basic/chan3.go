package main

import (
	"sync"
	"time"
)

func main() {
	c := make(chan string, 2)
	var wg sync.WaitGroup
	wg.Add(2)
	go func() {
		defer wg.Done()
		c <- `first`
		c <- `second`
	}()
	go func() {
		defer wg.Done()
		time.Sleep(time.Second * 1)
		println(`第一个:` + <-c)
		println(`第二个:` + <-c)
	}()
	wg.Wait()
}
