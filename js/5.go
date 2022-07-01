package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
)

type ALLmsg struct {
	Code       string `json:"code"`
	Datasource string `json:"datasource"`
	TraceID    string `json:"traceID"`
	INmsg      `json:"datas"`
}
type INmsg struct {
	CLTNO           string `json:"CLTNO"`
	ACTCLTNO        string `json:"ACT_ CLTNO"`
	ISGRP           string `json:"ISGRP"`
	APPMODE         string `json:"APPMODE"`
	SIGNER          string `json:"SIGNER"`
	TOPOS           string `json:"TO_POS"`
	ISONLY          string `json:"IS_ONLY"`
	POSID           string `json:"POSID"`
	OUTFLAG         string `json:"OUT_FLAG"`
	CNAPSCODE       string `json:"CNAPS_CODE"`
	SWIFTCODE       string `json:"SWIFT_CODE"`
	CNAPSNAME       string `json:"CNAPS_NAME"`
	OPENACCOUNTDATE string `json:"OPENACCOUNTDATE"`
	ACCOUNTNO       string `json:"ACCOUNTNO"`
	ACCOUNTNAME     string `json:"ACCOUNTNAME"`
	MEMORYNAME      string `json:"MEMORYNAME"`
	CURRENCYNO      string `json:"CURRENCYNO"`
	USAGEID         string `json:"USAGEID"`
	CTID            string `json:"CTID"`
	NATUREID        string `json:"NATUREID"`
	FOREIGNTYPE     string `json:"FOREIGNTYPE"`
	CNREMARK        string `json:"CNREMARK"`
	CANCELDATE      string `json:"CANCELDATE"`
	CANCELREASON    string `json:"CANCELREASON"`
	UPDATETIME      string `json:"UPDATE_TIME"`
	ACCOUNTTYPE     string `json:"ACCOUNT_TYPE"`
}

type RootName struct {
	Datas      []Datas `json:"datas"`
	Total      int     `json:"total"`
	TraceID    string  `json:"traceID"`
	Code       string  `json:"code"`
	Success    bool    `json:"success"`
	Msg        string  `json:"msg"`
	Datasource string  `json:"datasource"`
}
type Datas struct {
	CURRENCYNO string `json:"CURRENCYNO"`
	ACCOUNTNO  string `json:"ACCOUNTNO"`
	RETMSG     string `json:"RET_MSG"`
	RETURN     int    `json:"RETURN"`
}

func testPost2() {

	ba := ALLmsg{}
	ba.Code = "ACCAPPLY"
	ba.Datasource = "OA"
	ba.TraceID = "55555555"
	ba.INmsg.CLTNO = "001"
	ba.INmsg.ACTCLTNO = "77777"
	ba.INmsg.ISGRP = "1"
	ba.INmsg.APPMODE = "是否"
	ba.INmsg.SIGNER = "呜呜呜"
	ba.INmsg.TOPOS = "1"
	ba.INmsg.ISONLY = "1"
	ba.INmsg.POSID = "1111111111111111"
	ba.INmsg.OUTFLAG = "1"
	ba.INmsg.CNAPSCODE = "302100011018"
	ba.INmsg.SWIFTCODE = ""
	ba.INmsg.CNAPSNAME = "todo"
	ba.INmsg.OPENACCOUNTDATE = "2022-05-20"
	ba.INmsg.ACCOUNTNO = "999881"
	ba.INmsg.ACCOUNTNAME = "a999888"
	ba.INmsg.MEMORYNAME = "a999888"
	ba.INmsg.CURRENCYNO = "CNY"
	ba.INmsg.USAGEID = "1"
	ba.INmsg.CTID = "102"
	ba.INmsg.NATUREID = "1"
	ba.INmsg.FOREIGNTYPE = "1"
	ba.INmsg.CNREMARK = "add"
	ba.INmsg.CANCELDATE = ""
	ba.INmsg.CANCELREASON = ""
	ba.INmsg.UPDATETIME = "2022-05-23"
	ba.INmsg.ACCOUNTTYPE = "1"

	requestBody := new(bytes.Buffer)
	json.NewEncoder(requestBody).Encode(ba)
	//fmt.Println(requestBody)
	url := "http://192.168.106.118:7001/FDLKF/webservice/rest/TxServiceGateway/gateway"
	req, err := http.NewRequest("POST", url, requestBody)
	req.Header.Set("Content-Type", "application/json")
	client := &http.Client{}
	// resp, err := client.Do(req)
	resp, err := client.Post(url, "application/json", requestBody)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
	fmt.Println(resp.StatusCode)
	// fmt.Println("response Status:", resp.Status)
	// fmt.Println("response Headers:", resp.Header)
	body, _ := io.ReadAll(resp.Body)
	fmt.Println("response Body:", string(body))
	rel := RootName{}
	jsonerr := json.Unmarshal(body, &rel)
	if jsonerr != nil {
		log.Fatal(jsonerr)
	}
	fmt.Println(rel.Success)
	fmt.Println(rel.Datas[0].RETMSG)
}

func main() {
	testPost2()
}
