import { resolve, join } from 'path';
import { defineConfig } from 'vite';
import MonacoEditorNlsPlugin, {
    esbuildPluginMonacoEditorNls,
    Languages,
} from 'vite-plugin-monaco-editor-nls';
import { svelte } from '@sveltejs/vite-plugin-svelte';
const PACKAGE_ROOT = __dirname;
const prefix = `monaco-editor/esm/vs`;
// const outDir = join(__dirname, 'src/index.js')
// const renderDir = join(__dirname, 'index.js')
// const publicDir = join(__dirname, 'public')
// https://vitejs.dev/config/
export default defineConfig({
    root: resolve(PACKAGE_ROOT, 'public') + '/',
    base: '',
    plugins: [
        MonacoEditorNlsPlugin({locale: Languages.en_gb}),
        svelte()
    ],
    build: {
        sourcemap: true,
    },
    resolve: {
        alias: {
            '@': resolve('./src'),
        },
    },
    optimizeDeps: {
        include: [
            `${prefix}/editor/editor.worker`,
            `${prefix}/language/json/json.worker.js`,
            `${prefix}/language/css/css.worker.js`,
            `${prefix}/language/html/html.worker.js`,
            `${prefix}/language/typescript/ts.worker.js`,
        ],
        exclude: ['svelte-library'],
        /** vite 版本需要大于等于2.3.0 */
        esbuildOptions: {
            plugins: [
                esbuildPluginMonacoEditorNls({
                    locale: Languages.en_gb,
                }),
            ],
        },
    },
   
});