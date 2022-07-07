##### 要求

```
锐斌，MDM项目跟沈总汇报项目的时候需要以前在OA的流程耗时数据，麻烦你明天抽空帮我导一下OA 0915、0905、0904 的报表。
其中，0904只要“申请类别”是新增供应商；0905只要“申请类别”是新增客户；
我们想统计
1、整条流程从开始到结束的耗时
2、各个节点的处理耗时
时间范围：2020年1月1日~2021年7月31日
需要内容：流程编码、流程名称、各环节处理人的部门、各环节的接收时间、处理时间
```



##### 0915

```sql

select 
*,
datediff(hour,接收时间,操作时间) as 单节点处理时间
from
(
select 
a.requestid ,
wb.requestmark 流程编码 ,
b.workflowname 流程名称 , 
wd.departmentname 部门 ,
hr.lastname,
c.nodename 节点 ,
a.showorder,
a.receivedate + ' ' + a.receivetime AS 接收时间,
a.operatedate + ' ' + a.operatetime AS 操作时间
FROM         dbo.workflow_currentoperator AS a 
INNER JOIN dbo.workflow_base AS b ON a.workflowid = b.id 
INNER JOIN dbo.workflow_nodebase AS c ON a.nodeid = c.id 
INNER JOIN dbo.workflow_flownode AS e WITH (nolock) ON e.nodeid = c.id 
INNER JOIN dbo.workflow_requestbase AS wb ON wb.requestid = a.requestid 
INNER JOIN dbo.HrmResource AS hr ON a.userid = hr.id 
inner join HrmDepartment as hd on hr.departmentid=hd.id
join Udt_WorkFlow_Department  wd on  hd.id=wd.deptid
where b.workflowname='0915 SAP新增物料申请单'
and receivedate>='2020-01-01' 
and receivedate<='2021-07-31'
and a.showorder<=1
and a.operatedate!=''
and a.requestid=696608

) z

left join(

select
requestid, 
sum(DATEDIFF(HOUR,recdt,opedt))  as 总处理时间
from 
(
select 
a.requestid,
wb.requestmark,
b.workflowname, 
wd.departmentname,
hr.id userid,
hr.lastname, 
c.nodename,
a.nodeid,
a.receivedate + ' ' + a.receivetime AS recdt,
a.operatedate + ' ' + a.operatetime AS opedt

FROM         dbo.workflow_currentoperator AS a 
INNER JOIN dbo.workflow_base AS b ON a.workflowid = b.id 
INNER JOIN dbo.workflow_nodebase AS c ON a.nodeid = c.id 
INNER JOIN dbo.workflow_flownode AS e WITH (nolock) ON e.nodeid = c.id 
INNER JOIN dbo.workflow_requestbase AS wb ON wb.requestid = a.requestid 
INNER JOIN dbo.HrmResource AS hr ON a.userid = hr.id 
inner join HrmDepartment as hd on hr.departmentid=hd.id
join Udt_WorkFlow_Department  wd on  hd.id=wd.deptid
where  b.workflowname='0915 SAP新增物料申请单'
and receivedate>='2020-01-01' 
and receivedate<='2021-07-31'
and a.showorder<=1
and a.operatedate!=''

) y
group by requestid
) zz
on z.requestid=zz.requestid

order by   z.requestid,z.接收时间,z.操作时间


```





##### 0904

```sql

select 
*,
datediff(hour,接收时间,操作时间) as 单节点处理时间
from
(
select 
a.requestid ,
wb.requestmark 流程编码 ,
b.workflowname 流程名称 , 
wd.departmentname 部门 ,
c.nodename 节点 ,
a.receivedate + ' ' + a.receivetime AS 接收时间,
a.operatedate + ' ' + a.operatetime AS 操作时间
FROM         dbo.workflow_currentoperator AS a 
INNER JOIN dbo.workflow_base AS b ON a.workflowid = b.id 
INNER JOIN dbo.workflow_nodebase AS c ON a.nodeid = c.id 
INNER JOIN dbo.workflow_flownode AS e WITH (nolock) ON e.nodeid = c.id 
INNER JOIN dbo.workflow_requestbase AS wb ON wb.requestid = a.requestid 
INNER JOIN dbo.HrmResource AS hr ON a.userid = hr.id 
inner join HrmDepartment as hd on hr.departmentid=hd.id
join Udt_WorkFlow_Department  wd on  hd.id=wd.deptid
join formtable_main_117  fm on a.requestid=fm.requestId
where b.workflowname='0904 SAP供应商申请/修改流程'
and receivedate>='2020-01-01' 
and receivedate<='2021-07-31'
and a.showorder<=1
and sqlb=0
and a.operatedate!=''

) z

left join(

select
requestid, 
sum(DATEDIFF(HOUR,recdt,opedt))  as 总处理时间
from 
(
select 
a.requestid,
wb.requestmark,
b.workflowname, 
wd.departmentname,
c.nodename,
a.nodeid,
a.receivedate + ' ' + a.receivetime AS recdt,
a.operatedate + ' ' + a.operatetime AS opedt

FROM         dbo.workflow_currentoperator AS a 
INNER JOIN dbo.workflow_base AS b ON a.workflowid = b.id 
INNER JOIN dbo.workflow_nodebase AS c ON a.nodeid = c.id 
INNER JOIN dbo.workflow_flownode AS e WITH (nolock) ON e.nodeid = c.id 
INNER JOIN dbo.workflow_requestbase AS wb ON wb.requestid = a.requestid 
INNER JOIN dbo.HrmResource AS hr ON a.userid = hr.id 
inner join HrmDepartment as hd on hr.departmentid=hd.id
join Udt_WorkFlow_Department  wd on  hd.id=wd.deptid
join formtable_main_117  fm on a.requestid=fm.requestId
where   b.workflowname='0904 SAP供应商申请/修改流程'
and receivedate>='2020-01-01' 
and receivedate<='2021-07-31'
and a.showorder<=1
and sqlb=0
and a.operatedate!=''

) y
group by requestid
) zz
on z.requestid=zz.requestid

order by   z.requestid,z.接收时间,z.操作时间
```



##### 0905

```sql

select 
*,
datediff(hour,接收时间,操作时间) as 单节点处理时间
from
(
select 
a.requestid ,
wb.requestmark 流程编码 ,
b.workflowname 流程名称 , 
wd.departmentname 部门 ,
c.nodename 节点 ,
a.receivedate + ' ' + a.receivetime AS 接收时间,
a.operatedate + ' ' + a.operatetime AS 操作时间
FROM         dbo.workflow_currentoperator AS a 
INNER JOIN dbo.workflow_base AS b ON a.workflowid = b.id 
INNER JOIN dbo.workflow_nodebase AS c ON a.nodeid = c.id 
INNER JOIN dbo.workflow_flownode AS e WITH (nolock) ON e.nodeid = c.id 
INNER JOIN dbo.workflow_requestbase AS wb ON wb.requestid = a.requestid 
INNER JOIN dbo.HrmResource AS hr ON a.userid = hr.id 
inner join HrmDepartment as hd on hr.departmentid=hd.id
join Udt_WorkFlow_Department  wd on  hd.id=wd.deptid
join formtable_main_118  fm on a.requestid=fm.requestId
where b.workflowname='0905 SAP展厅客户档案失效'
and receivedate>='2020-01-01' 
and receivedate<='2021-07-31'
and a.showorder<=1
and sztype=0
and a.operatedate!=''

) z

left join(

select
requestid, 
sum(DATEDIFF(HOUR,recdt,opedt))  as 总处理时间
from 
(
select 
a.requestid,
wb.requestmark,
b.workflowname, 
wd.departmentname,
c.nodename,
a.nodeid,
a.receivedate + ' ' + a.receivetime AS recdt,
a.operatedate + ' ' + a.operatetime AS opedt

FROM         dbo.workflow_currentoperator AS a 
INNER JOIN dbo.workflow_base AS b ON a.workflowid = b.id 
INNER JOIN dbo.workflow_nodebase AS c ON a.nodeid = c.id 
INNER JOIN dbo.workflow_flownode AS e WITH (nolock) ON e.nodeid = c.id 
INNER JOIN dbo.workflow_requestbase AS wb ON wb.requestid = a.requestid 
INNER JOIN dbo.HrmResource AS hr ON a.userid = hr.id 
inner join HrmDepartment as hd on hr.departmentid=hd.id
join Udt_WorkFlow_Department  wd on  hd.id=wd.deptid
join formtable_main_118  fm on a.requestid=fm.requestId
where   b.workflowname='0905 SAP展厅客户档案失效'
and receivedate>='2020-01-01' 
and receivedate<='2021-07-31'
and a.showorder<=1
and sztype=0
and a.operatedate!=''

) y
group by requestid
) zz
on z.requestid=zz.requestid

order by   z.requestid,z.接收时间,z.操作时间
```

