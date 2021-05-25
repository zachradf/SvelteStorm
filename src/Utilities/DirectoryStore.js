import {writable} from 'svelte/store';

const DirectoryData = writable({
    fileTree: [],
    stateObj: {},
    openFilePath :'',
    fileRead: false,
});


export default DirectoryData; 