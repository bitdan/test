> 在公司摸鱼了一个多月，上周有开发任务了，在SAP里二次开发，做一个简单报表

##### 1.需求简介

以前出口货物保险费对账单是由保险公司提供，审单员进行打印张贴于OA进行提需审批；现保险公司不提供出口货物保险费对账单，需在SAP中开发相应出口货物保险费对账单报表。

##### 2.熟悉表和相关事务码

来了公司才了解SAP是什么，之前可谓一无所知，对公司的业务完全不了解，但是好在使用ABAP开发报表不是很难,在导师简单介绍基本语法后，基本就可以上手。

T-CODE：se16n 查询透明表

首先先熟悉要使用到的几个表,了解字段

![image-20210902085630448](https://i.loli.net/2021/09/02/CA7izahD5FRdT6g.png)

##### 3.报表开发

###### 1>.se38创建程序

![image-20210902090602992](https://i.loli.net/2021/09/02/R7hGOEJkDBwKUqb.png)

类型和状态是自己情况选择.

###### 2>.大致框架

主程序大致框架

首先定义好数据类型, 程序在屏幕的展示情况以及处理函数,建议新建三个子程序.

定义好子程序名,双击可建立.

![image-20210902110608320](https://i.loli.net/2021/09/02/ScREteuF2Bmoh85.png)

perform 函数道理类似

```abap
REPORT ztest_0902.
INCLUDE ztest_0902_data.       "定义数据类型
INCLUDE ztest_0902_screen.     "定义屏幕
INCLUDE ztest_0902_form.       "函数处理

START-OF-SELECTION.

  PERFORM frm_get_data.        "获取数据

  PERFORM frm_handle_data.     "处理数据

  IF t_result IS NOT INITIAL.  
    PERFORM frm_alv_show.      "不为空,展示报表
  ELSE.
    MESSAGE '没有符合的数据,请重新查询' TYPE 'S' DISPLAY LIKE 'E'.
  ENDIF.
```

###### 3>. ztest_0902_data

- 一般先定义输出表结构, 即需要展示的字段都放在一个结构里.

- 同时定义内表和工作区, 内表是临时的, 不会影响数据库中内容, 内表临时存放数据;

  工作区只能存放一条数据, 般在循环中处理.

- types自定义结构, 字段可以来自不同的表, 需要什么就声明什么

```abap
TABLES: zxdtpo,zxdtko,zxdtfe,zxdtgn.   "需要的表
TYPE-POOLS:slis.                       "类型池,里面有很多的类型

TYPES:BEGIN OF ty_result,             
  xdnum TYPE zxdtpo-xdnum,            "XDNUM  装箱单号
  matnr TYPE zxdtpo-matnr,            "matnr  物料号
  so_no TYPE zxdtko-so_no,            "SO_NO  SO号
  vouch TYPE zxdtko-vouch,            "VOUCH  单证员
  sport TYPE zxdtko-sport,            "sport  起运港
  bezei type tvknt-bezei,             "beizei 起运港中卫描述
  magrv TYPE zxdtko-magrv,            "MAGRV  柜型
  awert TYPE zxdtfe-awert,            "awert  实际金额
  waers TYPE zxdtfe-waers,            "waers  货币币种
  prodh TYPE zprodh_text-prodh,       "prodh  产品层次
  prodh_1 TYPE char200,
  vtext_1 TYPE char300,
  prodh_2 TYPE char200,
  vtext_2 TYPE char300,
  prodh_3 TYPE char200,
  vtext_3 TYPE char300,
  prodh_4 TYPE char200,
  vtext_4 TYPE char300,
END OF ty_result.

DATA:t_result TYPE TABLE OF ty_result.
DATA:w_result TYPE ty_result.

DATA:t_fieldcat TYPE slis_t_fieldcat_alv,
     w_fieldcat TYPE LINE OF slis_t_fieldcat_alv,
     t_layout TYPE slis_layout_alv.

TYPES: BEGIN OF ty_xdnum,
  xdnum TYPE zxdtpo-xdnum,
  matnr TYPE zxdtpo-matnr,
  so_no TYPE zxdtko-so_no,
  vouch TYPE zxdtko-vouch,
  sport TYPE zxdtko-sport,
  magrv TYPE zxdtko-magrv,
  awert TYPE zxdtfe-awert, "AWERT 出口货物平安险
  bezei TYPE tvknt-bezei,
  azdat TYPE zxdtgn-azdat, "AZDAT 实际装柜日期
END OF ty_xdnum.

DATA: t_xdnum TYPE STANDARD TABLE OF ty_xdnum,
      w_xdnum TYPE ty_xdnum.

TYPES: BEGIN OF ty_azdat,
  xdnum TYPE zxdtko-xdnum,
  azdat	TYPE zxdtgn-azdat,
END OF ty_azdat.

DATA: t_azdat TYPE TABLE OF ty_azdat,
      w_azdat TYPE ty_azdat.

TYPES: BEGIN OF ty_awert,
  xdnum TYPE zxdtko-xdnum,
  awert	TYPE zxdtfe-awert,
  waers TYPE zxdtfe-waers,
END OF ty_awert.

DATA:t_awert TYPE STANDARD TABLE OF ty_awert.
DATA:w_awert TYPE ty_awert.

*----装箱单对应所有物料
TYPES: BEGIN OF ty_prdha,
  xdnum TYPE zxdtko-xdnum,
  prdha TYPE mara-prdha,                  "prdha 产品层次
  prodh_1 TYPE zprodh_text-prodh_1,
  vtext_1 TYPE zprodh_text-vtext_1,
  prodh_2 TYPE zprodh_text-prodh_2,
  vtext_2 TYPE zprodh_text-vtext_2,
  prodh_3 TYPE zprodh_text-prodh_3,
  vtext_3 TYPE zprodh_text-vtext_3,
  prodh_4 TYPE zprodh_text-prodh_4,
  vtext_4 TYPE zprodh_text-vtext_4,
END OF ty_prdha.

DATA: t_prdha TYPE TABLE OF ty_prdha.
DATA: w_prdha TYPE ty_prdha.
```

###### 4>.ztest_0902_screen

定义选择屏幕, 这一步就很简单了

- 多值查询用SELECT-OPTIONS
- 单值查询 parameters

```abap
SELECTION-SCREEN:BEGIN OF BLOCK a1 WITH FRAME TITLE text-001.
SELECT-OPTIONS: s_xdnum FOR zxdtpo-xdnum OBLIGATORY, "装箱单号  必填
                s_azdat FOR zxdtgn-azdat.            "实际装柜日期
SELECTION-SCREEN:END OF BLOCK a1.
```

- 选择屏幕的文本元素

  <img src="https://i.loli.net/2021/09/02/2CeBDcn1sUNz34A.png" alt="image-20210902113421186" style="zoom:50%;" />

  <img src="https://i.loli.net/2021/09/02/c2zsrldUAtfmGoK.png" alt="image-20210902113442213" style="zoom:50%;" />

- 查询页面

![image-20210902113131409](https://i.loli.net/2021/09/02/mZMi1bwO7vzodPs.png)

###### 5>.ztest_0902_form

- 展示ALV, 创建子程序frm_alv_show,

  - frm_init_layout 初试化ALV布局, 可以自动根据数据长度调整列宽

  - frm_set_fieldset 设置ALV字段, **字段名必须大写**

    - 里面的frm_init_fieldcat通过using传递参数

  - frm_output_alv 调用 [ REUSE_ALV_GRID_DISPLAY ]输出

    需要填的参数对应填写即可

  <img src="https://i.loli.net/2021/09/02/wzZMJcWRPhgY7qi.png" alt="image-20210902114329375" style="zoom:50%;" />

  

```abap
*&---------------------------------------------------------------------*
*&      Form  frm_alv_show
*&---------------------------------------------------------------------*
*       text
*----------------------------------------------------------------------*
FORM frm_alv_show .
  PERFORM frm_init_layout.  "
  PERFORM frm_set_fieldset.
  PERFORM frm_output_alv.
ENDFORM.                    "frm_alv_show

*&---------------------------------------------------------------------*
*&      Form  frm_init_layout
*&---------------------------------------------------------------------*
*       text
*----------------------------------------------------------------------*
FORM frm_init_layout .
  t_layout-colwidth_optimize = 'x'.
  t_layout-zebra = 'x'.

ENDFORM.                    "frm_init_layout

*&---------------------------------------------------------------------*
*&      Form  frm_set_fieldset
*&---------------------------------------------------------------------*
*       text
*----------------------------------------------------------------------*
FORM frm_set_fieldset .
  PERFORM frm_init_fieldcat USING 'XDNUM' '装箱单号'.
  PERFORM frm_init_fieldcat USING 'SO_NO' 'SO号'.
  PERFORM frm_init_fieldcat USING 'VOUCH' '单证员'.
*  PERFORM frm_init_fieldcat USING 'SPORT' '起运港'.
  PERFORM frm_init_fieldcat USING 'BEZEI' '起运港名称'.
  PERFORM frm_init_fieldcat USING 'MAGRV' '柜型'.
  PERFORM frm_init_fieldcat USING 'AWERT' '出口货物平安险'.
  PERFORM frm_init_fieldcat USING 'WAERS' '币种'.
  PERFORM frm_init_fieldcat USING 'PRODH_1' '产品层次1编码'.
  PERFORM frm_init_fieldcat USING 'VTEXT_1' '产品层次1名称'.
  PERFORM frm_init_fieldcat USING 'PRODH_2' '产品层次2编码'.
  PERFORM frm_init_fieldcat USING 'VTEXT_2' '产品层次2名称'.
  PERFORM frm_init_fieldcat USING 'PRODH_3' '产品层次3编码'.
  PERFORM frm_init_fieldcat USING 'VTEXT_3' '产品层次3名称'.
  PERFORM frm_init_fieldcat USING 'PRODH_4' '产品层次4编码'.
  PERFORM frm_init_fieldcat USING 'VTEXT_4' '产品层次4名称'.
*  PERFORM frm_init_fieldcat USING 'PRODH' '产品层次'.

ENDFORM.                    "frm_set_fieldset

*&---------------------------------------------------------------------*
*&      Form  frm_init_fieldcat
*&---------------------------------------------------------------------*
*       text
*----------------------------------------------------------------------*
*      -->P_0022     text
*      -->P_0023     text
*----------------------------------------------------------------------*
FORM frm_init_fieldcat  USING  p_0022
                                p_0023.
  w_fieldcat-fieldname = p_0022.
  w_fieldcat-seltext_m = p_0023.
  APPEND w_fieldcat TO t_fieldcat.
ENDFORM.                    "frm_init_fieldcat

*&---------------------------------------------------------------------*
*&      Form  frm_output_alv
*&---------------------------------------------------------------------*
*       text
*----------------------------------------------------------------------*
FORM frm_output_alv .
  CALL FUNCTION 'REUSE_ALV_GRID_DISPLAY'
   EXPORTING
*     I_INTERFACE_CHECK                 = ' '
*     I_BYPASSING_BUFFER                = ' '
*     I_BUFFER_ACTIVE                   = ' '
     i_callback_program                = sy-repid
*     i_callback_pf_status_set          = 'F_STATUS'
*     I_CALLBACK_USER_COMMAND           = ' '
*     I_CALLBACK_TOP_OF_PAGE            = ' '
*     I_CALLBACK_HTML_TOP_OF_PAGE       = ' '
*     I_CALLBACK_HTML_END_OF_LIST       = ' '
*     I_STRUCTURE_NAME                  =
*     I_BACKGROUND_ID                   = ' '
*     I_GRID_TITLE                      =
*     I_GRID_SETTINGS                   =
     is_layout                         = t_layout
     it_fieldcat                       = t_fieldcat
*     IT_EXCLUDING                      =
*     IT_SPECIAL_GROUPS                 =
*     IT_SORT                           =
*     IT_FILTER                         =
*     IS_SEL_HIDE                       =
     i_default                         = 'X'
     i_save                            = 'A'
*     IS_VARIANT                        =
*     IT_EVENTS                         =
*     IT_EVENT_EXIT                     =
*     IS_PRINT                          =
*     IS_REPREP_ID                      =
*     I_SCREEN_START_COLUMN             = 0
*     I_SCREEN_START_LINE               = 0
*     I_SCREEN_END_COLUMN               = 0
*     I_SCREEN_END_LINE                 = 0
*     I_HTML_HEIGHT_TOP                 = 0
*     I_HTML_HEIGHT_END                 = 0
*     IT_ALV_GRAPHICS                   =
*     IT_HYPERLINK                      =
*     IT_ADD_FIELDCAT                   =
*     IT_EXCEPT_QINFO                   =
*     IR_SALV_FULLSCREEN_ADAPTER        =
*   IMPORTING
*     E_EXIT_CAUSED_BY_CALLER           =
*     ES_EXIT_CAUSED_BY_USER            =
    TABLES
      t_outtab                          = t_result  "需要输出的表
   EXCEPTIONS
     program_error                     = 1
     OTHERS                            = 2
            .
  IF sy-subrc <> 0.
*Implement suitable error handling here
  ENDIF.
ENDFORM.                    " FRM_OUTPUT_ALV

*&---------------------------------------------------------------------*
*&      Form  frm_get_data
*&---------------------------------------------------------------------*
*       text
*----------------------------------------------------------------------*
FORM frm_get_data .
  SELECT MAX( azdat ) AS azdat     "实际装箱日期
          xdnum
    FROM zxdtgn
    INTO CORRESPONDING FIELDS OF TABLE t_azdat
      WHERE xdnum IN s_xdnum
        GROUP BY xdnum.
  IF sy-subrc = 0.
    SORT t_azdat.
    IF s_azdat IS NOT INITIAL.
      DELETE t_azdat WHERE azdat NOT IN s_azdat.
    ENDIF.
  ENDIF.

  SELECT xdnum  "装箱单号
         so_no
         vouch  "单证员
         sport  "起运港
         magrv  "柜型
    FROM zxdtko
     INTO CORRESPONDING FIELDS OF TABLE t_xdnum
    WHERE xdnum IN s_xdnum.

  DATA:l_index TYPE sy-tabix.
  LOOP AT t_xdnum INTO w_xdnum.
    CLEAR:l_index.
    l_index = sy-tabix.
    READ TABLE t_azdat WITH KEY xdnum = w_xdnum-xdnum TRANSPORTING NO FIELDS.
    IF sy-subrc <> 0.
      DELETE t_xdnum INDEX l_index.
    ENDIF.
  ENDLOOP.

*出口货物平安险
  SELECT  xdnum
          awert   "实际金额
          waers   "货币
    FROM zxdtfe
    INTO CORRESPONDING FIELDS OF TABLE t_awert
    FOR ALL ENTRIES IN t_xdnum
     WHERE xdnum = t_xdnum-xdnum
       AND kscha = 'ZC62'.

*查物料
  LOOP AT t_xdnum INTO w_xdnum.
    SELECT DISTINCT
            b~xdnum
            a~prdha
            prodh_1
            vtext_1
            prodh_2
            vtext_2
            prodh_3
            vtext_3
            prodh_4
            vtext_4
      FROM mara AS a INNER JOIN zxdtpo AS b ON a~matnr = b~matnr
           LEFT JOIN zprodh_text AS c ON a~prdha = c~prodh
      APPENDING CORRESPONDING FIELDS OF TABLE t_prdha
      WHERE b~xdnum = w_xdnum-xdnum.
  ENDLOOP.

ENDFORM.                    "frm_get_data

*&---------------------------------------------------------------------*
*&      Form  frm_handle_data
*&---------------------------------------------------------------------*
*       text
*----------------------------------------------------------------------*
FORM frm_handle_data .
  CLEAR w_xdnum.
  CLEAR w_azdat.
  LOOP AT t_xdnum INTO w_xdnum.
    w_result-xdnum = w_xdnum-xdnum.
    w_result-so_no = w_xdnum-so_no.
    w_result-vouch = w_xdnum-vouch.
*    w_result-sport = w_xdnum-sport.
    w_result-magrv = w_xdnum-magrv.


    SELECT SINGLE bezei
      FROM tvknt
      INTO w_xdnum-bezei
      WHERE knote = w_xdnum-sport
        AND spras = '1'.

    w_result-bezei = w_xdnum-bezei.

    LOOP AT t_prdha INTO w_prdha WHERE xdnum = w_xdnum-xdnum.
      CONCATENATE
        w_result-prodh_1 w_prdha-prodh_1  INTO w_result-prodh_1 SEPARATED BY '/'.
      CONCATENATE
        w_result-vtext_1 w_prdha-vtext_1  INTO w_result-vtext_1 SEPARATED BY '/'.
      CONCATENATE
        w_result-prodh_2 w_prdha-prodh_2  INTO w_result-prodh_2 SEPARATED BY '/'.
      CONCATENATE
        w_result-vtext_2 w_prdha-vtext_2  INTO w_result-vtext_2 SEPARATED BY '/'.
      CONCATENATE
        w_result-prodh_3 w_prdha-prodh_3  INTO w_result-prodh_3 SEPARATED BY '/'.
      CONCATENATE
        w_result-vtext_3 w_prdha-vtext_3  INTO w_result-vtext_3 SEPARATED BY '/'.
      CONCATENATE
        w_result-prodh_4 w_prdha-prodh_4  INTO w_result-prodh_4 SEPARATED BY '/'.
      CONCATENATE
        w_result-vtext_4 w_prdha-vtext_4  INTO w_result-vtext_4 SEPARATED BY '/'.
    ENDLOOP.

    LOOP AT t_awert INTO w_awert WHERE xdnum = w_xdnum-xdnum.
      w_result-awert = w_awert-awert.
      w_result-waers = w_awert-waers.
      APPEND w_result TO t_result.
      CLEAR:w_result-awert.
    ENDLOOP.

    IF sy-subrc  <> 0.
      APPEND w_result TO t_result.
    ENDIF.

    CLEAR w_result.
  ENDLOOP.

ENDFORM.                    "frm_handle_data
```

- 获取数据 frm_get_data
  - INTO CORRESPONDING FIELDS OF TABLE XXX 把查询到的数据存放到内表中
  - IF sy-subrc = 0.  判断执行成功
- 处理数据 frm_handle_data
  - 使用工作区前清空工作区
  -  LOOP AT XXX INTO用来循环内表
  - APPEND w_result TO t_result 把工作区的内容添加到内表.

##### 4.效果

![image-20210902135157301](https://i.loli.net/2021/09/02/fc12xZWKnoqQVmk.png)