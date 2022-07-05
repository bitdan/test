1.MyEclipse工具下载,



<img src="https://s2.loli.net/2022/06/30/yTIYKDl83Soq2JN.png" alt="image-20220620133736214" style="zoom: 33%;" />

地址

```stylus
http://gitlab.sunda.top/oa/ecology7.0.git
```

​    3.   导入项目， **import-->projects from git -->URL, 填写地址, 账号密码

<img src="https://s2.loli.net/2022/06/30/XaxJz7bRd8rATWF.png" alt="image-20220620133431508" style="zoom:50%;" />

<img src="https://s2.loli.net/2022/06/30/cPBCXZ4jW7fNrM9.png" alt="image-20220620133503484" style="zoom:50%;" />

<img src="https://s2.loli.net/2022/06/30/UNFwJxAOtEgLQ6h.png" alt="image-20220620133527630" style="zoom:50%;" />



<img src="https://s2.loli.net/2022/06/30/nalybtk723OArm5.png" alt="image-20220620155215756" style="zoom: 50%;" />

next

<img src="https://s2.loli.net/2022/06/30/HiYgwqtMnvOuxUd.png" alt="image-20220620160132308" style="zoom:50%;" />

next

<img src="https://s2.loli.net/2022/06/30/AMCb4rQlGunEIZ8.png" alt="image-20220620160210111" style="zoom:50%;" />



等待分析结束, 选择呢第一项

![image-20220620164607327](https://s2.loli.net/2022/06/30/PLKrfOch15bN2xi.png)



5.右键项目配置build path , 如果导入依赖包有错误, 先删除, 然后添加 webroot/web-inf/lib 下面的所有包;



<img src="https://s2.loli.net/2022/06/30/4cjZQlVqNbdvuaW.png" alt="image-20220620144110712" style="zoom:50%;" />

jdk为1.6

<img src="https://s2.loli.net/2022/06/30/mNBclMgWFZitACd.png" alt="image-20220620144538450" style="zoom:50%;" />



编译路径和改为        ecology7/WebRoot/classbean

<img src="https://s2.loli.net/2022/06/30/Bm9QLfweyFErotY.png" alt="image-20220623122021183" style="zoom:50%;" />





<img src="https://s2.loli.net/2022/06/30/5Ato1SdLCMQ64Ov.png" alt="image-20220623151956401" style="zoom:50%;" />

6. 设置容器resin , windows-->preferences

<img src="https://s2.loli.net/2022/06/30/7ji3TgulxURdJ9r.png" alt="image-20220620144640574" style="zoom:50%;" />

MyEclipse-->server-->resin-->configure resin 3.x

<img src="https://s2.loli.net/2022/06/30/FWhtq9fErlX3ZQR.png" alt="image-20220620144734745" style="zoom: 33%;" />



选择容器路径, 容器包在 

<img src="https://s2.loli.net/2022/06/30/7uNo45rztE6JX2G.png" alt="image-20220620144848576" style="zoom: 50%;" />

同时设置容器jdk 也是1.6 

<img src="https://s2.loli.net/2022/06/30/kXNLlcq4mI6hyT8.png" alt="image-20220620144953534" style="zoom: 33%;" />

7.运行项目 ,右键项目 run as-->3 MyEclipse server application-->选择resin 

<img src="https://s2.loli.net/2022/06/30/BDiHMtcxOGmEXP8.png" alt="image-20220620145056719" style="zoom:33%;" />

<img src="https://s2.loli.net/2022/06/30/gAONH67mhG9C2c8.png" alt="image-20220620145200576" style="zoom: 50%;" />





