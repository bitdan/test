package main

import (
	"context"
	"fmt"
	"sync"
	"time"
)

var wg sync.WaitGroup

func worker(ctx context.Context) {
	go worker2(ctx)
loop:
	for {
		fmt.Println("worker")
		time.Sleep(time.Second)
		select {
		case <-ctx.Done():
			break loop
		default:
		}
	}
	wg.Done()
}

func worker2(ctx context.Context) {
	go worker3(ctx)
loop:
	for {
		fmt.Println("worker2")
		time.Sleep(time.Second)
		select {
		case <-ctx.Done():
			break loop
		default:
		}
	}
	wg.Done()
}
func worker3(ctx context.Context) {
loop:
	for {
		fmt.Println("worker3")
		time.Sleep(time.Second)
		select {
		case <-ctx.Done():
			break loop
		default:
		}
	}
	wg.Done()
}
func main() {
	ctx, cancel := context.WithCancel(context.Background())
	wg.Add(2)
	go worker(ctx)
	go worker3(ctx)
	time.Sleep(time.Second * 3)
	cancel()
	wg.Wait()
	fmt.Println("over")
}
