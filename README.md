<p align="center">
	<img alt="logo" src="/.images/logo.png" height="80px">
</p>
<p align="center">
	<a href="https://gitee.com/Nebula-lowcode/nebulalowcode"><img src="https://img.shields.io/badge/Nebula-v1.6.0-brightgreen.svg"></a>
    <a href="https://gitee.com/Nebula-lowcode/nebulalowcode/blob/master/LICENSE"><img src="https://img.shields.io/github/license/mashape/apistatus.svg"></a>
</p>

**【星云低代码开发平台】项目介绍**

星云低代码，是一款面向**软件厂商**与**企业开发团队**的**低代码开发平台**。它并非传统的独立应用搭建工具，而是一个定位为 **“中间件”** 的强大开发引擎，旨在以极低的成本和极快的速度，为**您现有的成熟业务系统**注入专业的可视化开发能力。

### 🚀 核心特色：中间件模式，无缝共生
与传统低代码平台要求“推翻重建”不同，星云低代码采用**中间件集成模式**。它能像集成 Redis、MQ 一样，以前后端分离技术（前端支持IFrame/渲染器嵌入，后端支持Jar/DLL包集成）**无缝嵌入**您现有的ERP、MES、CRM、WMS等系统。**无需重构现有架构**，仅需约3人日即可完成对接，打通用户、权限、数据和业务，实现与现有系统的深度共生。

### 💪 强大内核：全栈可视化开发能力
我们严格遵循软件工程理念，提供等效于专业开发的全栈能力：
*   **前端开发**：基于 Vue 3 与 Ant Design，支持通过丰富组件、灵活布局与可视化事件流，构建复杂交互的企业级界面。
*   **后端开发**：提供类 Java 的可视化后端开发语言，支持变量、逻辑、循环、数据库事务、异常处理及外部接口调用，能编写从简单CRUD到复杂业务逻辑的核心接口。
*   **数据与集成**：支持直连 MySQL、Oracle、SQL Server、达梦、金仓等多种数据库，并具备强大的外部系统连接器，可轻松对接金蝶、用友、SAP、企业微信等第三方系统。

### 🔗 关键能力：混合开发与无限扩展
*   **与源码混合开发**：平台支持输出标准 Vue/Java 源代码，并实现双向同步。您可将最核心、性能要求最高的模块用源码攻坚，而将大量业务功能用低代码高效实现，二者完美融合，**突破传统低代码的能力边界**。
*   **组件桥接技术**：通过标准化配置，可将您现有系统中的专业业务组件（如特定报表引擎、审批流程）安全、快速地“桥接”为平台内的可拖拽可视化组件，**无限扩展平台的专业开发能力**，保护并复用现有技术资产。

### 🎯 典型应用场景
1.  **为现有产品增亮点**：快速为您的软件产品增加“低代码定制平台”功能，形成差异化竞争力。
2.  **高效响应定制化需求**：赋能实施、交付及企业IT人员，使其能直接在前线通过可视化方式快速开发定制功能，将核心研发团队从繁琐的定制需求中解放出来。
3.  **打破数据孤岛**：作为“系统粘合剂”，轻松实现跨系统（如ERP、MES、OA）的数据同步与业务流程对接。
4.  **从零构建新系统**：亦可作为独立的低代码平台，从零开始快速构建并独立部署专业的业务应用系统。

### ✨ 赋能团队，提升能效
星云低代码致力于赋能 **“兼职开发者”**（实施工程师、测试人员、产品经理、企业IT等），通过全栈可视化操作降低开发门槛。同时，它支持开发资源的模块化沉淀与跨项目复用，显著提升整体开发效率。

---

**我们相信，最好的工具应该融入现有生态，并释放团队的创造力。星云低代码，正是为这一目标而生。**

*   **产品官网**：[www.xingyunzuo.cn](http://www.xingyunzuo.cn)
*   **咨询合作**：欢迎通过官网或Issue进一步探讨。

## 在线体验

- [Demo地址](https://demo.xingyunzuo.com?from=gitee)
- [Pro Demo地址](https://k6mkvxshbd.feishu.cn/docx/TStwdS6cLoyZd1x5u9LcFMmlnhh?from=from_copylink)
- [试用向导](https://guide.xingyunzuo.com?from=gitee)
- [产品视频](https://www.bilibili.com/video/BV1Y1421B7bp/?spm_id_from=333.337.search-card.all.click&vd_source=88e98143bb8f9f941ea8b11e2c2bd157)

## 官方群聊

 [![QQ群](https://img.shields.io/badge/未满-768551975-brightgreen.svg)](http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=t_NuJNDKNwp21V1Nz_EPVfBGab_fCcMM&authKey=1XBPqVjp2sraSpzuy8YT8RfBvsb9fqYsbnLcwuVPrxRk2SS89x2S5hWcjCdPt0WJ&noverify=0&group_code=768551975)

## 快速启动

### 依赖
| 插件 | 版本  | 用途 |
|--- |-----| ----- |
| node.js | ≥16.20.2 |  JavaScript运行环境 |

### 启动前端

```
npm install
```
```
npm run dev
```

## 功能

| 功能             | 开源版本        | Pro 版本            |
| :--------------  | :--------------: | :-----------------: |
| 组件事件         |       ✅         |         ✅           |
| 页面事件         |       ✅         |         ✅           |
| 页面预览         |       ✅         |         ✅           |
| 页面渲染         |       ✅         |         ✅           |
| 布局组件         |       ✅         |         ✅           |
| 输入组件         |       ✅         |         ✅           |
| 图表组件         |       ✅         |         ✅           |
| 页面入参         |       ✅         |         ✅           |
| 管理页面框架     |       ❌         |         ✅           |
| 全局变量         |       ❌         |         ✅           |
| 页面变量         |       ❌         |         ✅           |
| 自定义组件       |       ❌         |         ✅           |
| 脚本函数         |       ❌         |         ✅           |
| 业务组件         |       ❌         |         ✅           |
| 后端接口开发     |       ❌         |         ✅           |
| 数据库连接       |       ❌         |         ✅           |
| 外部接口对接     |       ❌         |         ✅           |
| 项目配置         |       ❌         |         ✅           |




## 演示图

<table>
	<tr>
        <td><img src="/.images/p1.png"/></td>
        <td><img src="/.images/p2.png"/></td>
    </tr>	 
    <tr>
        <td><img src="/.images/p3.png"/></td>
        <td><img src="/.images/p4.png"/></td>
    </tr>
    <tr>
        <td><img src="/.images/b1.png"/></td>
        <td><img src="/.images/b2.png"/></td>
    </tr>
    <tr>
        <td><img src="/.images/b3.png"/></td>
        <td><img src="/.images/b4.png"/></td>
    </tr>
    <tr>
        <td><img src="/.images/b5.png"/></td>
        <td><img src="/.images/b6.png"/></td>
    </tr>
</table>
