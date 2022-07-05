> 由于公司最近更换接口，导致不少数据异常，需要找到所有可能发生异常的数据

处理方法：替换所需字段名即可

```sql
select object_name(id) objName,Name as colName 
from syscolumns 
where (name like'字段名') and id in(select id from sysobjects where xtype='u')
order by objname 
```

