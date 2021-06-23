<script>
  import {  afterUpdate, onMount, onDestroy } from 'svelte';
  import * as monaco from 'monaco-editor';
  import { initMonaco } from './MonacoEnv';

  const fs = require('fs');
  const { ipcRenderer } = require('electron');
  
  export let value;
  export let language;
  export let filePath;
  let messageObj;

  let monEditor;
  let containerElt;

  onMount(() => {
    const options = {
      value: value.join('\n'),
      language: language,
      theme: 'vs-dark',
      wordWrap: 'on',
      fontSize: "16px",
    }
    monEditor = initMonaco(containerElt, options)

    // monEditor.setModel(monaco.editor.createModel(value, language));
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

  
