function countSubArray(nums) {
    let ans = 0;
    let pre = 0;
    for (_ in nums) {
        pre += 1;
        ans += pre;
    }
    return ans;
}


Math.formatFloat = function (f, digit) {
    var m = Math.pow(10, digit);
    return parseInt(f * m, 10) / m;
}
jfje = 64.29709199999999
var t = Math.formatFloat(jfje, 2);
let array = [1, 3, 4, 1];
//console.log(t);
//console.log(countSubArray(array));

var state = "{\"totalAmount\":1,\"vendorId\":\"696\",\"merTradeNo\":\"7a5f8719\"}";

var jg = state.replace(new RegExp('\\\\', 'g'), "");

// var test='{"data": "{\"e\":[{\"scope\":\"KE01/KE03/KE05/KF31\",\"forenetaddr\":\"http://41.84.157.138:8088/sundaprd\",\"internetaddr\":\"http://192.168.20.5:8088/sundaprd\",\"country\":\"肯尼亚\"},{\"scope\":\"KE04\",\"forenetaddr\":\"http://41.90.245.147:8088/sundaprd\",\"internetaddr\":\"http://192.168.28.5:8088/sundaprd\",\"country\":\"肯尼亚 基苏木\"},{\"scope\":\"KF31\",\"forenetaddr\":\"http://41.220.231.94:8088/sundaprd\",\"internetaddr\":\"http://192.168.98.5:8088/sundaprd\",\"country\":\"肯尼亚 肯纸尿裤工厂\"},{\"scope\":\"KF01/KF64/KF62\",\"forenetaddr\":\"http://154.72.41.74:8088/sundaprd\",\"internetaddr\":\"http://192.168.27.5:8088/sundaprd\",\"country\":\"肯尼亚 肯尼亚陶瓷厂\"},{\"scope\":\"TZ03/TF05\",\"forenetaddr\":\"http://41.220.133.27:8088/sundaprd\",\"internetaddr\":\"http://192.168.40.5:8088/sundaprd\",\"country\":\"坦桑 阿鲁沙\"},{\"scope\":\"TZ02/TF04\",\"forenetaddr\":\"http://154.0.155.20:8088/sundaprd\",\"internetaddr\":\"http://192.168.45.5:8088/sundaprd\",\"country\":\"坦桑 姆万扎\"},{\"scope\":\"TZ01/TF02/TF03/TF12\",\"forenetaddr\":\"http://196.45.141.198:8088/sundaprd\",\"internetaddr\":\"http://192.168.30.5:8088/sundaprd\",\"country\":\"坦桑 坦桑达市贸易\"},{\"scope\":\"TF02/TF03/TF11/TF12\",\"forenetaddr\":\"http://196.45.141.198:8086/sundaprd\",\"internetaddr\":\"http://192.168.30.25:8086/sundaprd\",\"country\":\"坦桑 坦桑陶瓷厂\"},{\"scope\":\"KEDS\",\"forenetaddr\":\"http://196.45.141.198:8087/sundaprd\",\"internetaddr\":\"http://192.168.30.7:8087/sundaprd\",\"country\":\"坦桑 坦桑洗衣粉厂\"},{\"scope\":\"UG01\",\"forenetaddr\":\"http://129.205.5.70:8088/sundaprd\",\"internetaddr\":\"http://192.168.41.5:8088/sundaprd\",\"country\":\"乌干达\"},{\"scope\":\"ZM61\",\"forenetaddr\":\"http://41.175.27.142:8088/sundaprd\",\"internetaddr\":\"http://192.168.120.5:8088/sundaprd\",\"country\":\"赞比亚 赞比亚陶瓷厂\"},{\"scope\":\"ZM01\",\"forenetaddr\":\"http://41.175.27.142:8088/sundaprd\",\"internetaddr\":\"http://192.168.42.5:8088/sundaprd\",\"country\":\"赞比亚\"}],\"w\":[{\"scope\":\"BJ01\",\"forenetaddr\":\"http://81.91.232.206:8088/sundaprd\",\"internetaddr\":\"http://192.168.183.5:8088/sundaprd\",\"country\":\"贝宁 贝宁贸易\"},{\"scope\":\"BJ31\",\"forenetaddr\":\"\",\"internetaddr\":\"\",\"country\":\"贝宁 贝宁纸尿裤\"},{\"scope\":\"BF01\",\"forenetaddr\":\"http://41.223.234.46:8088/sundaprd\",\"internetaddr\":\"http://192.168.73.5:8088/sundaprd\",\"country\":\"布基纳法索\"},{\"scope\":\"GN01\",\"forenetaddr\":\"http://102.176.162.21:8088/sundaprd\",\"internetaddr\":\"http://192.168.61.5:8088/sundaprd\",\"country\":\"几内亚\"},{\"scope\":\"GH01/GF01/GF02/GF03/GF04/GF06/GF07/GF31/GF35/GH03/GH04/GH05/RE01\",\"forenetaddr\":\"http://41.66.247.178:8088/sundaprd\",\"internetaddr\":\"http://192.168.52.5:8088/sundaprd\",\"country\":\"加纳 阿克拉\"},{\"scope\":\"\",\"forenetaddr\":\"\",\"internetaddr\":\"http://192.168.165.19:8087/sundaprd\",\"country\":\"加纳 阿克拉快消\"},{\"scope\":\"GH02/GF05\",\"forenetaddr\":\"http://102.176.103.250:8088/sundaprd\",\"internetaddr\":\"http://192.168.60.5:8088/sundaprd\",\"country\":\"加纳 库马西\"},{\"scope\":\"GF33\",\"forenetaddr\":\"http://102.176.103.250:8087/sundaprd\",\"internetaddr\":\"http://192.168.60.9:8087/sundaprd\",\"country\":\"加纳 库马西\"},{\"scope\":\"GF01\",\"forenetaddr\":\"http://41.66.247.178:8088/sundaprd\",\"internetaddr\":\"http://192.168.52.5:8088/sundaprd\",\"country\":\"加纳 房地产/加纳洗衣厂\"},{\"scope\":\"CM01\",\"forenetaddr\":\"http://80.75.19.122:8088/sundaprd\",\"internetaddr\":\"http://192.168.71.5:8088/sundaprd\",\"country\":\"喀麦隆 喀麦隆贸易\"},{\"scope\":\"CM02\",\"forenetaddr\":\"http://102.132.19.197:8088/sundaprd\",\"internetaddr\":\"http://192.168.79.5:8088/sundaprd\",\"country\":\"喀麦隆 喀麦隆雅温得\"},{\"scope\":\"CI01\",\"forenetaddr\":\"http://160.154.63.6:8088/sundaprd\",\"internetaddr\":\"http://192.168.70.5:8088/sundaprd\",\"country\":\"科特\"},{\"scope\":\"\",\"forenetaddr\":\"http://154.205.0.173:8088/sundaprd\",\"internetaddr\":\"http://192.168.176.5:8088/sundaprd\",\"country\":\"尼日利亚 尼日利亚贸易\"},{\"scope\":\"SN61/SN62\",\"forenetaddr\":\"http://41.214.117.34:8088/sundaprd\",\"internetaddr\":\"http://192.168.75.5:8088/sundaprd/\",\"country\":\"塞内 塞内陶瓷厂\"},{\"scope\":\"SN31\",\"forenetaddr\":\"http://41.219.16.106:8087/sundaprd\",\"internetaddr\":\"http:/192.168.72.7:8087/sundaprd\",\"country\":\"塞内 塞内纸尿裤\"},{\"scope\":\"SN01\",\"forenetaddr\":\"http://41.202.79.53:8088/sundaprd\",\"internetaddr\":\"http://192.168.72.5:8088/sundaprd\",\"country\":\"塞内 塞内加尔\"}]}"}';
// var res=test.replace(new RegExp('\\\\','g'),"");
// var t=eval("(" + res + ")");
// console.log(res);
//console.log(t);

var test2 = '0303/0304/0305/0307/0325/0726/3103/3104/3105/3107/3159/3164/3169/3171/3172/3176/3178';
var test3 = test2.replace(new RegExp('\\\\', 'g'), "")
//console.log(test3)

var sumdf = 0;

var ss = "20"

var tt = sumdf + parseInt(ss);
//console.log(tt);

var d = new Date();
var ye = d.getFullYear();
var mo = (d.getMonth() + 1).toString().padStart(2, '0');
var da = d.getDate().toString().padStart(2, '0');
var time = ye + '-' + mo + '-' + da;
//console.log(time);

function checkEnglishandnumbers(s) {
    var reg = new RegExp(/^[0-9a-zA-Z_]{0,}$/);
    return reg.test(s);
}

function checkChinese(s) {
    var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
    return reg.test(s);
}

function containSpecial(s) {
    var containSpecial = RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;) (\:) (\')(\")(\,)(\.)(\/)  (\<)(\>)(\?)(\)]+/);
    return (containSpecial.test(s));
}
//中文校验
function checkChinese(s) {
    var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
    return reg.test(s);
}

function containSpecialCN(s) {
    var containSpecialCN = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]")
    return (containSpecialCN.test(s));
}
var opp = "";
//console.log(checkChinese(opp));
// console.log(checkEnglishandnumbers(opp));
var riqi='2022-06-03'
t1=riqi.split('-')
// console.log(t1[1])

var ttt="202112"
// console.log(ttt.substr(4,6))
var tmp = {};
tmp.code = 'ACCACK';
tmp.datasource = 'datasource';
tmp.traceID = '123456';
var inner={};
inner.ACCOUNTNO='117010100100733866';
inner.CURRENCYNO='CNY';
var list=[];
list.push(inner);
tmp.datas=list;
console.log(JSON.stringify(tmp))
console.log(JSON.stringify({ x: 5, y: 6 }));


jQuery.ajax({
    url: 'http://192.168.106.118:7001/FDLKF/webservice/rest/TxServiceGateway/gateway',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json;charset=UTF-8',
    data: JSON.stringify(tmp),
    success: function (re) {
        console.log(re);
        alert(JSON.stringify(re));
    }
});
var script = document.createElement('script');
script.type = 'text/javascript';

// 传参一个回调函数名给后端，方便后端返回时执行这个在前端定义的回调函数
script.src = 'http://192.168.106.118:7001/FDLKF/webservice/rest/TxServiceGateway/gateway';
document.head.appendChild(script);

// 回调执行函数
function handleCallback(res) {
    alert(JSON.stringify(res));
}
