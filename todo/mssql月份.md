可显示07 , 08

```sql
SQLSERVER获取当前时间月份为两位数
–获取当前时间月份为两位数

SELECT RIGHT('00'+CAST(MONTH(GETDATE()) AS VARCHAR(2)),2)




–获取当前时间上月月份为两位数

SELECT RIGHT('00'+CAST(MONTH(DATEADD(MONTH,-1, GETDATE())) AS VARCHAR(2)),2)


```

