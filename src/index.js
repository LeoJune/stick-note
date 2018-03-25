require('./less/index.less');
var $ = require('./js/lib/jquery.min.js');

var NoteManager = require('./js/mod/note-manager.js').NoteManager;
var Event = require('./js/mod/event.js');
var WaterFall = require('./js/mod/waterfall.js');

NoteManager.load();

$('.add-note').on('click',function(){
    NoteManager.add();
})

Event.on('waterfall',function(){
    WaterFall.init($('#content'));
})

