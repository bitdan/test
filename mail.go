package main

import (
	"log"
	"net/smtp"
	"net/textproto"

	"github.com/jordan-wright/email"
)

func main() {
	// 简单设置 log 参数
	log.SetFlags(log.Lshortfile | log.LstdFlags)

	em := &email.Email{
		To:      []string{"2682524207@qq.com"},
		From:    "Duran write <2682524207@qq.com>",
		Subject: "发个邮件",
		Text:    []byte("hhhhhhhhhhhhh!"),
		HTML:    []byte("<h1> hhhhh</h1>"),
		Headers: textproto.MIMEHeader{},
	}
	//设置服务器相关的配置

	em.AttachFile("./chan.go")
	err := em.Send("smtp.qq.com:25", smtp.PlainAuth("", "2682524207@qq.com", "eigzugjmnvfvecha", "smtp.qq.com"))
	if err != nil {
		log.Fatal(err)
	}

	log.Println("send successfully ... ")
}
