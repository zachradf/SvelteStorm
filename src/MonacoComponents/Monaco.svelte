<script>
  import {  afterUpdate, onMount, onDestroy } from 'svelte';
  import * as monaco from 'monaco-editor';
  // import { initMonaco } from './MonacoEnv';
  // /Users/samuelfilip/keepItSvelte/SvelteStorm/public/monaco-editor/esm/vs/editor/editor.worker.js
  import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
  import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
  import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
  import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
  import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

  const fs = require('fs');
  const { ipcRenderer } = require('electron');
  
  export let value;
  export let language;
  export let filePath;
  
  let messageObj;
  let monEditor;
  let containerElt;

  onMount(async () => {
    const opts = {
      value: value.join('\n'),
      language: language,
      theme: 'vs-dark',
      wordWrap: 'on',
      fontSize: "16px",
    }

    if (!self.MonacoEnvironment) {
      
        self.MonacoEnvironment = {
          getWorker: function (_moduleId, label) {
          if (label === 'json') {
              return new jsonWorker();
          }
          if (label === 'css' || label === 'scss' || label === 'less') {
              return new cssWorker();
          }
          if (label === 'html' || label === 'handlebars' || label === 'razor') {
              return new htmlWorker();
          }
          if (label === 'typescript' || label === 'javascript') {
              return new tsWorker();
          }
          return new editorWorker();
        }
      }
    }
    
    
    // monEditor.setModel(monaco.editor.createModel(value, language));
    monEditor = monaco.editor.create(containerElt, opts)

    return () => {
      monEditor.dispose();
    }
  })

	afterUpdate(() => {
    if(monEditor) {
        fs.readFile(filePath, 'utf8', (err, res) => {
          if (!err) {
            monEditor.setModel(monaco.editor.createModel(res, language));
          }
        })
        monEditor.onDidChangeModelContent(() => {
          // monEditor.setModel(monaco.editor.createModel(monEditor.getValue(), language))
          console.log(monEditor.getValue())
        }
      )}
	});

  // onDestroy(() => {
	// 	monEditor = monaco.editor.destroy()
	// });
  
  ipcRenderer.on('save-markdown',  function () {
    messageObj = {content : monEditor.getValue(), file : filePath }
    ipcRenderer.send('synchronous-message', messageObj)
  });
</script>

<svelte:head />
<div class={$$props.class} bind:this={containerElt} />

  
