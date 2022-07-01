package main

import (
	"fmt"
	"net/http"
	"reflect"
)

func myfunc(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "hi")
}

func main() {
	// 更多http.Server的字段可以根据情况初始化
	// server := http.Server{
	//     Addr:         ":8080",
	//     ReadTimeout:  0,
	//     WriteTimeout: 0,
	// }
	server := http.Server{
		Addr:         ":8080",
		ReadTimeout:  0,
		WriteTimeout: 0,
	}
	mux := http.NewServeMux()
	server.Handler = mux
	//http.HandleFunc("/", myfunc)
	mux.HandleFunc("/", myfunc)
	server.ListenAndServe()
	var x float64 = 3.4
	fmt.Println(reflect.TypeOf(x))
}
