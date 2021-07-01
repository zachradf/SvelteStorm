import { resolve, join } from 'path';
import { defineConfig } from 'vite';
import MonacoEditorNlsPlugin, {
    esbuildPluginMonacoEditorNls,
    Languages,
} from 'vite-plugin-monaco-editor-nls';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';

const PACKAGE_ROOT = __dirname;
const prefix = `monaco-editor/esm/vs`;

// https://vitejs.dev/config/
export default defineConfig({
    server: {
      open: false, // do not open the browser as we use electron
      port: process.env.PORT || 5000,
      fsServe: {
        root: join(PACKAGE_ROOT, '../../'),
      },
    },
    root: resolve(PACKAGE_ROOT, 'public') + '/',
    base: '',
    plugins: [
        MonacoEditorNlsPlugin({locale: Languages.en_gb}),
        svelte({
          emitCss: true
        }),
        commonjs()
    ],
    build: {
        sourcemap: true,
        rollupOptions: {
            output: {
                sourcemap: true,
                format: 'esm',
                name: 'app',
                dir: 'public',
            },
        }
    },
    resolve: {
        alias: {
            '@': resolve('./src'),
        },
    },
    optimizeDeps: {
        // include: [
        //     `${prefix}/editor/editor.worker`,
        //     `${prefix}/language/json/json.worker.js`,
        //     `${prefix}/language/css/css.worker.js`,
        //     `${prefix}/language/html/html.worker.js`,
        //     `${prefix}/language/typescript/ts.worker.js`,
        // ],
        exclude: ['path', 'electron-window-state'],
        /** requires vite >= 2.3.0 */
        esbuildOptions: {
            plugins: [
                esbuildPluginMonacoEditorNls({
                    locale: Languages.en_gb,
                }),
            ],
        },
    },
});