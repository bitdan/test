```sql
truncate table formtable_main_133_dt2
```

更新字段信息

```sql
alter table formtable_main_310_dt4 alter column fhmc  varchar(100) 
alter table formtable_main_310_dt4 alter column zhmc  varchar(100) 
```

```sql
INSERT INTO table_name
VALUES (value1,value2,value3,...);
第二种形式需要指定列名及被插入的值：

INSERT INTO table_name (column1,column2,column3,...)
VALUES (value1,value2,value3,...);

UPDATE table_name
SET column1=value1,column2=value2,...
WHERE some_column=some_value;

DELETE FROM table_name
WHERE some_column=some_value;

drop table <表名>
```



```sql
当前日期
select CONVERT(varchar(10),GETDATE(),120)
当前时间
SELECT CONVERT(VARCHAR(50),GETDATE(),108)
```





```
set profiling = 1;

show profiles;
```

回表是指，InnoDB在普通索引a上查到主键id的值后，再根据一个个主键id的值到主键索引上去查整行数据的过程。

1.当使用left join时，左表是驱动表，右表是被驱动表
2.当使用right join时，右表时驱动表，左表是驱动表
3.当使用join时，mysql会选择数据量比较小的表作为驱动表，大表作为被驱动表

小表驱动大表, 再给大表加上索引, 会大大加快速度

EXPLAIN语句分析出来的第一行的表即是驱动表



###### 重建表

alter table A engine=InnoDB命令来重建表
