<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js">
</script>
var tmp = {};
tmp.code = 'ACCACK';
tmp.datasource = 'datasource';
tmp.traceID = '123456';
var inner = {};
inner.ACCOUNTNO = '117010100100733866';
inner.CURRENCYNO = 'CNY';
var list = [];
list.push(inner);
tmp.datas = list;
var check = JSON.stringify(tmp);
// alert(tmp);
jQuery.ajax({
    url: 'http://192.168.106.118:7001/FDLKF/webservice/rest/TxServiceGateway/gateway',
    type: 'POST',
    contentType: 'application/json;charset=UTF-8',
    data: JSON.stringify(tmp),
    dataType: 'json',  //【这里要小心啊，不要用jsonp，一定是json】
    crossDomain: true,  //【这个很重要，一定要加】
    success: function (result) {
        console.log(result);
        // alert(result);
    },
    error: function (result) {
        console.log(result);
        // alert(result);
    }
});

$.ajax({
    url: 'xxxxxxx',
    type: 'POST',
    dataType: 'json',
    success: function(data) {
      console.log(data);
    },
    xhrFields: {
      withCredentials: true    // 此字段标识要跨域传数据
    },
    crossDomain: true
  });

  jQuery.ajax({
    url: 'http://192.168.106.118:7001/FDLKF/webservice/rest/TxServiceGateway/gateway',
    type: 'POST',
    contentType: 'application/json;charset=UTF-8',
    data: JSON.stringify(tmp),
    dataType: 'json',  //【这里要小心啊，不要用jsonp，一定是json】
    crossDomain: true,  //【这个很重要，一定要加】
    success: function (result) {
        console.log(result);
        alert("success"+result);
    },
    error: function (result) {
        console.log(result);
        alert("error"+result);
    }
});