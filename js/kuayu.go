package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
)

type Res struct {
	Datas      []Datas `json:"datas"`
	Total      int     `json:"total"`
	TraceID    string  `json:"traceID"`
	Code       string  `json:"code"`
	Success    bool    `json:"success"`
	Msg        string  `json:"msg"`
	Datasource string  `json:"datasource"`
}
type Datas struct {
	ACCOUNTNO       string      `json:"ACCOUNTNO"`
	CURRENCYNO      string      `json:"CURRENCYNO"`
	CANCELDATE      interface{} `json:"CANCELDATE"`
	USAGEID         interface{} `json:"USAGEID"`
	SWIFTCODE       interface{} `json:"SWIFT_CODE"`
	ACTCLTNO        interface{} `json:"ACT_CLTNO"`
	CTID            string      `json:"CTID"`
	OPENACCOUNTDATE string      `json:"OPENACCOUNTDATE"`
	FOREIGNTYPE     string      `json:"FOREIGNTYPE"`
	CLTNO           string      `json:"CLTNO"`
	NATUREID        string      `json:"NATUREID"`
	OUTFLAG         string      `json:"OUT_FLAG"`
	ISONLY          interface{} `json:"IS_ONLY"`
	CANCELREASON    interface{} `json:"CANCELREASON"`
	UPDATETIME      string      `json:"UPDATE_TIME"`
	MEMORYNAME      interface{} `json:"MEMORYNAME"`
	CNREMARK        interface{} `json:"CNREMARK"`
	ACCOUNTNAME     string      `json:"ACCOUNTNAME"`
	TOPOS           interface{} `json:"TO_POS"`
	APPMODE         interface{} `json:"APPMODE"`
	POSID           interface{} `json:"POSID"`
	SIGNER          interface{} `json:"SIGNER"`
	CNAPSNAME       string      `json:"CNAPS_NAME"`
	ISGRP           interface{} `json:"ISGRP"`
	RESULTEXP       string      `json:"RESULT_EXP"`
	CNAPSCODE       string      `json:"CNAPS_CODE"`
}

func setupCORS(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func HandlerHttp(w http.ResponseWriter, r *http.Request) {
	setupCORS(&w)
	if r.Method == "callback" {

		u, err := url.Parse(r.RequestURI)
		if err != nil {
			fmt.Println("parse error ", err)
			fmt.Printf("u type is %T, u is %#v\n", u, u)
		}
	}
	// w.Write([]byte("hello, world"))
	fmt.Println("URL ", r.RequestURI)
	requestBody := new(bytes.Buffer)
	json.NewEncoder(requestBody).Encode(r.RequestURI)
	url := "http://192.168.106.118:7001/FDLKF/webservice/rest/TxServiceGateway/gateway"
	req, err := http.NewRequest("POST", url, requestBody)
	req.Header.Set("Content-Type", "application/json")
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
	fmt.Println(resp.StatusCode)
	body, _ := ioutil.ReadAll(resp.Body)

	fmt.Println("response Body:", string(body))
	rel := Res{}
	jsonerr := json.Unmarshal(body, &rel)
	if jsonerr != nil {
		log.Fatal(jsonerr)
	}
	fmt.Println(rel.Success)
	fmt.Println(rel.Datas[0].ACCOUNTNO)
}

func main() {
	http.HandleFunc("/", HandlerHttp)
	http.ListenAndServe("127.0.0.1:5500", nil)
}
