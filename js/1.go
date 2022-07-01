package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
)

type ALLmsg struct {
	Code       string  `json:"code"`
	Datasource string  `json:"datasource"`
	TraceID    string  `json:"traceID"`
	INmsg      []INmsg `json:"datas"`
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

func testPost() {

	// requestBody := fmt.Sprintf(`{
	requestBody := `{
		"code": "ACCAPPLY",
		"datasource": "OA",
		"traceID": "5641153615",
		"datas": [
			{
				"CLTNO": "001",
				"ACT_CLTNO": "aa212154",
				"ISGRP": "1",
				"APPMODE": "biu一声授权",
				"SIGNER": "李有权#李无权",
				"TO_POS": 1,
				"IS_ONLY": "1",
				"POSID": "12333",
				"OUT_FLAG": "1",
				"CNAPS_CODE": "302100011018",
				"SWIFT_CODE": "",
				"CNAPS_NAME": "中信银行安哥拉总行11111",
				"OPENACCOUNTDATE": "2022-05-11",
				"ACCOUNTNO": "a10102",
				"ACCOUNTNAME": "jc_00001",
				"MEMORYNAME": "jc_00001",
				"CURRENCYNO": "CNY",
				"USAGEID": "1",
				"CTID": "101",
				"NATUREID": "1",
				"FOREIGNTYPE": "1",
				"CNREMARK": "修改了",
				"CANCELDATE": "",
				"CANCELREASON": "",
				"UPDATE_TIME": "2022-05-18",
				"ACCOUNT_TYPE": "0"
			}
		]
	}`

	var jsonStr = []byte(requestBody)
	// jsonStr := strings.NewReader(requestBody)
	url := "http://192.168.106.118:7001/FDLKF/webservice/rest/TxServiceGateway/gateway"
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
	req.Header.Set("Content-Type", "application/json")
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
	// fmt.Println("response Status:", resp.Status)
	// fmt.Println("response Headers:", resp.Header)
	body, _ := ioutil.ReadAll(resp.Body)

	fmt.Println("response Body:", string(body))
	rel := RootName{}
	jsonerr := json.Unmarshal(body, &rel)
	if jsonerr != nil {
		log.Fatal(jsonerr)
	}
	fmt.Println(rel.Success)
	fmt.Println(rel.Datas[0].RETMSG)
}

func testPost2() {
	ba := ALLmsg{}
	ba.Code = "ACCAPPLY"
	ba.Datasource = "OA"
	ba.TraceID = "55555555"
	inm := INmsg{}
	inm.CLTNO = "001"
	inm.ACTCLTNO = "77777"
	inm.ISGRP = "1"
	inm.APPMODE = "df"
	inm.SIGNER = "呜呜呜"
	inm.TOPOS = "1"
	inm.ISONLY = "1"
	inm.POSID = "1111111111111111"
	inm.OUTFLAG = "1"
	inm.CNAPSCODE = "302100011018"
	inm.SWIFTCODE = ""
	inm.CNAPSNAME = "todo"
	inm.OPENACCOUNTDATE = "2022-05-20"
	inm.ACCOUNTNO = "999881"
	inm.ACCOUNTNAME = "a999888"
	inm.MEMORYNAME = "a999888"
	inm.CURRENCYNO = "CNY"
	inm.USAGEID = "1"
	inm.CTID = "102"
	inm.NATUREID = "1"
	inm.FOREIGNTYPE = "1"
	inm.CNREMARK = "add"
	inm.CANCELDATE = ""
	inm.CANCELREASON = ""
	inm.UPDATETIME = "2022-05-23"
	inm.ACCOUNTTYPE = "1"
	ba.INmsg = append(ba.INmsg, inm)

	requestBody := new(bytes.Buffer)
	json.NewEncoder(requestBody).Encode(ba)
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
