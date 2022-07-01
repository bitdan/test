package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func main() {
	resp, err := http.Get("https://www.baidu.com/")
	if err != nil {
		fmt.Println("get fail,err:", err)
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("read from res.body failed ,err:", err)
	}
	fmt.Println(string(body))
}
