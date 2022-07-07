##### 1.修改数据库字段信息, 可直接在自定义表单编辑字段, 修改后数据可直接同步到数据库



`

OA 组织架构  部门, 岗位, 代办转化为业务流

门户, 知识, 流程，



7.0版本， jsp，会升级9.0，前后分离，react

tomcat， 

开发判断问题

resin  3.0   jdk 是1.6.0.17

看resin.conf



90

先在测试系统

map转java, 编译为class最后运行

交由中间件

前端html, css,jquery,ajax要求熟悉

指定标签

spring 里面的 bean  

jsp里面文件内容

后端的

请求的action 控制请求流转  用户需求

sqlserver  表结构, 是需要比较了解的

spring boot, 微服务, 接口对接,理解实际业务

用户需求,  对接OA

 stq800, 

表单流程id, 配置性质, 管理员熟悉后, 从开发的角度





周五的

测试账号



模型:  单例

js,jquery 重点练习

java , sql, 解耦合

设置 工作流程 路径

实现某一个接口, 历史查重，流程到达这一个点，达到就可以处理，

线里面附加操作，走哪条线，线里面的代码，节点是自己写

风险把控，价值改造



**下拉框， 字段能带出其他字段的值，测试环境，OA流程**  例如1009

节点前后，  一个是修改为有效,当前浏览者有权限

开发工具， 表结构， 39密码，数据库账号密码，abap开发是差不多，

任务1：
1、取出有效部门文档的数量
2、分部/部门阅读日志统计

```sql
select  Count( *) from DocDetail
where docstatus=1     
624844

docReadTag 怎么看不同部门
```

任务2:
1、有效人力资源花名册
2、分部/部门 各类状态的人员数量

```sql
select   *
from HrmResource
where loginid !=' '
order by id desc

select count(status) as counts
from HrmResource
where loginid!=' ' 
group by status

1  417
2  10
3  1563
4  1
```

任务3:
1、流程耗时统计表（每个流程发起到当前花费时间）
2、待办事宜最多人员的排名报表（按分部、按部门、按人员）

```sql
select 
lastoperatedate,lastoperatetime
createdate,createtime
from workflow_requestbase 
order by createdate

SELECT DATEDIFF(minute,
                ' ',
                ' ')
                
select lastoperatedate from workflow_requestbase 
```

对于不明确的需求反复思考需要什么

满意度考察

先批到进去 需要谁去做

自己创建

在HrmResource里面的各种id是直接对应其他表的id的，例如，a.departmentid=b.id

##### 包含运输的部门

```sql
select 
a.workcode as 编号,
a.lastname as 姓名,
b.firstdep as 分部,
b.departmentname as 部门,
e.lastname as  直接上级,
d.jobtitlename as 岗位,
a.telephone as 电话,
a.mobile as 手机,
a.email as 电子邮件,
a.loginid as 登录名,
a.seclevel as 安全级别
from HrmResource as a
left join HrmDepartment as b
on a.departmentid=b.id
left join HrmSubCompany as c
on a.subcompanyid1 =c.id
left join HrmJobTitles as d
on a.jobtitle=d.id
left join HrmResource as e
on a.id=e.id
where a.status<4 and b.departmentname like '%运输%'
order by a.workcode
```



```sql
sp_help [table_name]
```

你可以获得有关表的所有信息，包括所有外键。



sappzh sap编号这个具体是对应哪些表呢



##### 查询异常单

```sql
select t1.*,t3.workflowname from
(select requestid,cz,sappzh,riqi,'formtable_main_125' as  tbn from formtable_main_125 where sappzh like '%--0000'
union all 
select requestid,cz,sappzh,riqi,'formtable_main_131' as  tbn from formtable_main_131 where sappzh like '%--0000'
union all 
select requestid,cz,sappzh,riqi,'formtable_main_177'as  tbn  from formtable_main_177 where sappzh like '%--0000'
union all 
select requestid,cz,sappzh,riqi,'formtable_main_202'as  tbn  from formtable_main_202 where sappzh like '%--0000'
union all 
select requestid,cz,sappzh,riqi,'formtable_main_310' as  tbn from formtable_main_310 where sappzh like '%--0000'
union all 
select requestid,cz,sappzh,riqi,'formtable_main_350' as tbn from formtable_main_350 where sappzh like '%--0000'
union all 
select requestid,cz,sappzh,riqi,'formtable_main_407'as tbn  from formtable_main_407 where sappzh like '%--0000'
union all 
select requestid,cz,sappzh,workflowdate,'formtable_main_413'as tbn  from formtable_main_413 where sappzh like '%--0000') 
as  t1
left join workflow_requestbase as t2
on t1.requestId =t2.requestId
left join workflow_base as t3 
on t2.workflowid =t3.id
where t2.currentnodetype = 3
order by t1.requestId
```



sql server 查询某数据库中包含某字段的所有表格

例如查找包含sappzh的

```sql
select object_name(id) objName,Name as colName 
from syscolumns 
where (name like'sappzh') and id in(select id from sysobjects where xtype='u')
order by objname
```

```
objName	            colName --0000
formtable_main_113	sappzh
formtable_main_125	sappzh  √
formtable_main_126	sappzh
formtable_main_131	sappzh  √
formtable_main_166	sappzh
formtable_main_177	sappzh  √
formtable_main_191	sappzh
formtable_main_193	sappzh  
formtable_main_200	sappzh
formtable_main_201	sappzh
formtable_main_202	sappzh  √
formtable_main_203	sappzh
formtable_main_204	sappzh
formtable_main_205	sappzh
formtable_main_206	sappzh
formtable_main_21	sappzh
formtable_main_210	sappzh
formtable_main_211	sappzh
formtable_main_213	sappzh
formtable_main_216	sappzh
formtable_main_217	sappzh
formtable_main_218	sappzh
formtable_main_238	sappzh
formtable_main_241	sappzh
formtable_main_310	sappzh  √
formtable_main_350	sappzh  √
formtable_main_375	sappzh
formtable_main_380	sappzh
formtable_main_407	sappzh  √
formtable_main_413	sappzh  √
formtable_main_426	sappzh
formtable_main_433	sappzh 
formtable_main_445	sappzh 
formtable_main_50	sappzh
formtable_main_503	sappzh
formtable_main_51	sappzh
saptab	sappzh
```

```
=VLOOKUP(C3,'[10.04(1).XLSX]Sheet1'!$K:$L,2,0)
```

流程超时未处理

流程公示优化

 拉取已完成事项 : 操作时间 接收时间

 以及未完成事项: 接收时间,当前时间

均需要考虑流程有效性, 比如多次退回, 多次到达某人, 只考虑审批, 提交的, 代理的的情况  计算一个时间维度2021年, 人员有效性, 只考虑在职, 不考虑退回原始节点

部门id  

  base current requestbase 

梳理一级部门清单, 汇总到一级部门, 可以我们部门     

结合流程超时表  

排出不考虑的流程 

计算某一时间是否超时, 算出1, 2超时的流程 做一个变量 例如三天

存储过程,  





0904  0901



39是测试系统



##### 

##### 查询fieldid对应名字

```sql
SELECT
	a.id,
	b.labelname 
FROM
	workflow_billfield a
	LEFT JOIN htmllabelinfo b ON a.fieldlabel= b.indexid 
WHERE
	a.billid=- 471
	AND b.languageid=7
	ORDER BY a.id
```

/ecology7/WebRoot/sunda/xy/page/it/oa_sap.jsp
