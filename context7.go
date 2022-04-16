package main

import (
	"context"
	"fmt"
	"sync"
	"time"
)

type traceCode string

var wg sync.WaitGroup

func worker(ctx context.Context) {
	key := traceCode("trace_code")
	traceCode, ok := ctx.Value(key).(string)
	if !ok {
		fmt.Printf("invalid trace code")
	}
loop:
	for {
		fmt.Printf("worker ,trace code:%s\n", traceCode)
		time.Sleep(time.Millisecond * 10)
		select {
		case <-ctx.Done():
			break loop
		default:
		}
	}
	fmt.Println("worker done")
	wg.Done()
}
func main() {
	ctx, cancel := context.WithTimeout(context.Background(), time.Millisecond*50)
	ctx = context.WithValue(ctx, traceCode("TRACE_CODE"), "1234566")
	wg.Add(1)
	go worker(ctx)
	time.Sleep(time.Second * 5)
	cancel()
	wg.Wait()
	fmt.Println("over")
}
