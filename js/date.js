var d = new Date("2022-03-03");
var ye = d.getFullYear();
var mo = (d.getMonth()+1).toString().padStart(2,'0');
var da = d.getDate().toString().padStart(2,'0');
var time = ye+'-'+mo+'-'+da;

d=d.setDate(d.getDate()+1);
d=new Date(d);

function Appendzero(obj)
{
    if(obj<10) return "0" +""+ obj;
    else return obj;
}

function removingworkrelationsday() {
    var t='2020-01-01'
    var dateTime=new Date(t);
    dateTime = dateTime.setDate(dateTime.getDate()+1);
    dateTime = new Date(dateTime);
    var year = dateTime.getFullYear(); // 获取年
    var month = dateTime.getMonth() + 1;// 获取月
    var day = dateTime.getDate(); // 获取当日
    var str = year + "年" + Appendzero(month) + "月" + Appendzero(day) + "日";
    return str;
}

//console.log(removingworkrelationsday());

var js="1234567890";
var t=js.substring(js.length-6,js.length);
//console.log(t);

var t1="基苏木哈哈哈哈";
var t2="基苏木";
if (t1.search("基苏木")!=-1){
    console.log(t1);
}


