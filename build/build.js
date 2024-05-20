const path = require('path')
const { defineConfig, build } = require('vite')
const vue = require('@vitejs/plugin-vue')
const vueJsx = require('@vitejs/plugin-vue-jsx')
// 添加打包入口文件夹 packages（需要手动创建）
const entryDir = path.resolve(__dirname, '../src')
// 添加出口文件夹 lib（不需要手动创建，会自动生成）
const outDir = path.resolve(__dirname, '../lib')

// vite基础配置
const baseConfig = defineConfig({
    configFile: false,
    publicDir: false,
    plugins: [vue(), vueJsx()],
    resolve: {
        // alias: {
        //     '@': fileURLToPath(new URL('./src', import.meta.url))
        // }
        alias: {
            "@": path.resolve(__dirname, "../src")
            
        },
    },
    define: {
        'process.env': {}
    }
})
// rollup配置
const rollupOptions = {
    // 确保外部化处理那些你不想打包进库的依赖
    // external: ['ant-design-vue'],
    output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        // global: [
        //     vue: 'Vue'
        // ]
        global: { vue: 'Vue'}
    }
}
// 全量打包构建
const buildAll = async () => {
    await build({
        ...baseConfig,
        build: {
            rollupOptions,
            lib: {
                entry: path.resolve(entryDir, 'index.ts'),
                name: 'stage', // umd的变量名
                fileName: (format) => `index.${format}.js`, // 输出文件名
                formats: ['umd'],
                // formats: ['es', 'umd'],
                // formats: ['es'],
            },
            outDir
        }
    })
}
const newBuild = async () => {
    await buildAll()
}
newBuild()
