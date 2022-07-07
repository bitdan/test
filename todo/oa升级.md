```sql
select 
wb.workflowname,
wa.customervalue

from workflow_addinoperate wa 
join workflow_base  wb 
on wa.workflowid=wb.id
where 
customervalue  like '%action%'
order by workflowname
```



接口

```sql
select a.workflowname,nodename+': '+a.customervalue
from(

select t2.workflowname,t3.nodename,workflowid,objid,customervalue from workflow_addinoperate t1
join workflow_base t2 on t1.workflowId = t2.id
join workflow_nodebase t3 on t1.objid = t3.id
  where t1.customervalue like 'action.%'


  ) a
  where workflowname!=''
  order by workflowname

```

dml

```sql
  select 
  b.workflowname,
  b.nodename+'--'+a.dmlcussql
  from 
  (
  select t2.dmlactionname,t1.* from dmlactionsqlset t1 
  left join dmlactionset t2 on t1.actionid = t2.id
  ) a
  join

  (select t1.dmlactionname,t2.workflowname,t3.nodename from dmlactionset t1 
  left join workflow_base t2 on t1.workflowId = t2.id
  left join workflow_nodebase t3 on t1.nodeid = t3.id

) b
on a.dmlactionname=b.dmlactionname

```

