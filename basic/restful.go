package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

var users = []User{
	{ID: 1, Name: "张三"},
	{ID: 2, Name: "李四"},
	{ID: 3, Name: "王五"},
}

func main() {

	http.HandleFunc("/users", handleUsers)
	http.ListenAndServe(":8080", nil)
}

func handleUsers(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "get":
		// w.WriteHeader(http.StatusOK)
		// fmt.Fprintln(w, "ID:1,Name:张三")
		// fmt.Fprintln(w, "ID:2,Name:李四")
		// fmt.Fprintln(w, "ID:3,Name:王五")
		users, err := json.Marshal(users)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			fmt.Fprint(w, "{\"message\":\""+err.Error()+"\"}")
		} else {
			w.WriteHeader(http.StatusOK)
			w.Write(users)
		}
	default:
		w.WriteHeader(http.StatusNotFound)
		fmt.Fprintln(w, "{\"message\":\"not found\"}")
	}

}

type User struct {
	ID   int
	Name string
}
