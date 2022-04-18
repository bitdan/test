package main

import (
	"log"
	"net/smtp"
	"sync"
	"time"

	"github.com/jordan-wright/email"
)

func main() {
	log.SetFlags(log.Lshortfile | log.LstdFlags)
	// 创建有5 个缓冲的通道，数据类型是  *email.Email
	ch := make(chan *email.Email, 5)
	p, err := email.NewPool(
		"smtp.qq.com:25",
		3, // 数量设置成 3 个
		smtp.PlainAuth("", "2682524207@qq.com", "eigzugjmnvfvecha", "smtp.qq.com"),
	)

	if err != nil {
		log.Fatal("email.NewPool error : ", err)
	}
	var wg sync.WaitGroup
	wg.Add(3)
	for i := 0; i < 3; i++ {
		go func(diffi int) {
			defer wg.Done()
			// 若 ch 无数据，则阻塞， 若 ch 关闭，则退出循环
			for e := range ch {
				// 超时时间 10 秒
				err := p.Send(e, 10*time.Second)
				if err != nil {

					log.Printf("p.Send error : %v , e = %v , i = %d\n", err, e, diffi)
				}
			}
		}(i)
	}
	//设置次数
	var cnt int = 1
	for i := 0; i < cnt; i++ {
		// e := email.NewEmail()
		// // 设置发送邮件的基本信息
		// e.From = "Duran <2682524207@qq.com>"
		// e.To = []string{"2682524207@qq.com"}
		// e.Subject = "test email.NewPool " + fmt.Sprintf("  the %d email", i)
		// e.Text = []byte(fmt.Sprintf("test email.NewPool , the %d email !", i))
		e := &email.Email{
			To:      []string{"2682524207@qq.com"},
			From:    "Duran write <2682524207@qq.com>",
			Subject: "想你了呀",
			Text:    []byte("hhhhhhhhhhhhh!"),
			HTML:    []byte("<h1> hhhhh</h1>"),
		}
		ch <- e
	}

	close(ch)
	// 等待子协程退出
	wg.Wait()
	log.Println("send successfully ... ")
}
