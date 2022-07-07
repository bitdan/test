Project xxx cannot reference itself
eclipse导入jar包时发现了这个错误

解决办法：
修改.settings目录下的org.eclipse.wst.common.component,与正常项目中的该文件对比发现下方红色语句有区别。

```xml
<?xml version="1.0" encoding="UTF-8"?> <project-modules id="moduleCoreId" project-version="1.5.0"> <wb-module deploy-name="wlbx"> <wb-resource deploy-path="/" source-path="/WebContent"/> <wb-resource deploy-path="/WEB-INF/classes" source-path="/"/> <property name="context-root" value="wlbx"/> <property name="java-output-path" value="build/classes"/> </wb-module> </project-modules>
```

以上是我个人遇见的报错地方,将<wb-resource deploy-path="/WEB-INF/classes" source-path="/"/>修改为：

<wb-resource deploy-path="/WEB-INF/classes" source-path="/src"/> 