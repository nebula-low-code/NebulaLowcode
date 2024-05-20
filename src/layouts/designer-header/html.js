export const prefix = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <link rel="icon" href="/favicon.ico">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>测试</title>
  <link rel="stylesheet" href="https://demo.xingyunzuo.com/style.css">

  <script src="https://demo.xingyunzuo.com/require.js"></script>
</head>

<body>
  <div id="app"></div>
  <script>
    //组件配置
    require(["https://demo.xingyunzuo.com/index.umd.js"], function (NebularRendererPC) {
	  let configJson=`

export const suffix = `//基础配置
const config = {
  configJson: configJson
}
//实例化
const stage = new NebularRendererPC(config);
//初始化数据
console.log("init", stage);
stage.loadData();
});

</script>
</body>
<style>
#app{
margin: 0;
padding: 0;
min-height: 100vh;
}
</style>

</html>`
