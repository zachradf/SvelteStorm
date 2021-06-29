import {resolve} from 'path';
import {defineConfig} from 'vite';
import MonacoEditorNlsPlugin, {
    esbuildPluginMonacoEditorNls,
    Languages,
} from 'vite-plugin-monaco-editor-nls';
import { svelte } from '@sveltejs/vite-plugin-svelte';

const prefix = `monaco-editor/esm/vs`;

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': resolve('./src'),
        },
    },
    build: {
        sourcemap: true,
    },
    optimizeDeps: {
        include: [
            `${prefix}/editor/editor.worker`,
            `${prefix}/language/json/json.worker.js`,
            `${prefix}/language/css/css.worker.js`,
            `${prefix}/language/html/html.worker.js`,
            `${prefix}/language/typescript/ts.worker.js`,
        ],
        /** vite 版本需要大于等于2.3.0 */
        esbuildOptions: {
            plugins: [
                esbuildPluginMonacoEditorNls({
                    locale: Languages.zh_hans,
                }),
            ],
        },
    },
    plugins: [
        MonacoEditorNlsPlugin({locale: Languages.zh_hans}),
        svelte({
          emitCss: true
        })
    ],
});