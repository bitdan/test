月度使用频次

```sql
select convert(varchar(7),lastoperatedate,120) 日期,COUNT(*) 次数, wb.workflowname
from workflow_requestbase wr
left join workflow_base   wb on  wb.id=wr.workflowid

group by convert(varchar(7),lastoperatedate,120),wb.workflowname
having convert(varchar(7),lastoperatedate,120)='2022-02'
and COUNT(*)>=30
order by 日期 desc,次数 desc

```

```stylus

2017-09 长度 7   varchar(7)

2017-09-01 长度10   varchar(10)

```

