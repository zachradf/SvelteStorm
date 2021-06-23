import {writable} from 'svelte/store';

const DirectoryData = writable({
    fileTree: [],
    openFilePath :'',
    fileRead: false,
    stateObj: {},
    activeFile: '',
    rename: false,
    deleteFile: false,
});

const openTabs = writable([]);

export { DirectoryData, openTabs}; 