require('../../less/note.less');

var $ = require('../lib/jquery.min.js');

var Toast = require('./toast.js').Toast;
var Event = require('./event.js');

function Note(opts){
    this.initOption(opts);
    
    

    this.createNote();


    this.setStyle();


    this.bineEvent();
}

Note.prototype = {
    color: [
        ['#ea9b35','#efb04e'],
        ['#dd598b','#e672a2'],
        ['#eee34b','#f2eb67'],
        ['#c24225','#d15a39'],
        ['#c1c341','#d0d25c'],
        ['#3f78c3','#5591d2']
    ],

    defaultOption: {
        id: '',
        $ct: $('#content').length>0?$('#content'):$('body'),
        context: 'input here'
    },

    initOption: function(opts){
        this.opts = $.extend({},this.defaultOption,opts||{});
        if(this.opts.id){
            this.id = this.opts.id;
        }
    },

    createNote: function(){
        var tpl = '<div class="note">'
                   +'<div class="note-head"><span class="delete">&times;</span></div>'
                   +'<div class="note-ct" contenteditable="true"></div>'
                   +'</div>';
        this.$note = $(tpl);
        this.$note.find('.note-ct').html(this.opts.context);
        this.opts.$ct.append(this.$note);
        if(!this.id) this.$note.css('bottom','10px');            
    },

    setStyle: function(){
        var color = this.color[Math.floor(Math.random()*6)];
        this.$note.find('.note-head').css('background-color',color[0]);
        this.$note.find('.note-ct').css('background-color',color[1]);
    },

    setLayout: function(){
        var self = this;
        if(self.clock){
            clearTimeout(self.clock);
        }
        self.clock = setTimeout(function(){
            Event.fire('waterfall');
        },100)
    },

    bineEvent: function(){
        var self = this,
        $note = this.$note,
        $editFail = this.$editFail,
        $noteHead = $note.find('.note-head'),
        $noteCt = $note.find('.note-ct'),
        $delete = $note.find('.delete');
        

        $delete.on('click',function(){
            self.delete();
        })

        $noteCt.on('focus',function(){
            if($noteCt.html() == 'input here') $noteCt.html('');
            $noteCt.data('before',$noteCt.html());
        }).on('blur',function(){
            console.log('123');
            console.log(self);
            console.log($noteCt.data('before'));
            if($noteCt.data('before') != $noteCt.html()){
                console.log("进入修改阶段") 
                $editFail = $noteCt.data('before');
                console.log($editFail)
                $noteCt.data('before',$noteCt.html());
                self.setLayout();
                if(self.id){
                    self.edit($noteCt.html())
                }else{
                    self.add($noteCt.html())
                }
            }
        });

        $noteHead.on('mousedown',function(e){
            var evtX = e.pageX - $note.offset().left,
            evtY = e.pageY - $note.offset().top;
            $note.addClass('draggable').data('evtPos',{x:evtX, y:evtY});
            console.log($('.draggable').data('evtPos'));
        }).on('mouseup',function(){
            $note.removeClass('draggable').removeData('evtPos');
        });


        $('body').on('mousemove',function(e){
            $('.draggable').length && $('.draggable').offset({
                top: e.pageY - $('.draggable').data('evtPos').y,
                left: e.pageX - $('.draggable').data('evtPos').x
            });
        });

    },

    add: function(msg){
        var self = this;
        $.post('/api/notes/add',{note: msg}).done(function(ret){
            if(ret.status == 0){
                Toast('添加成功');
            }else{
                self.$note.remove();
                Event.fire('waterfall')
                Toast(ret.errorMsg);
            }
        })
    },

    edit: function (msg) {
        var self = this;
        $.post('/api/notes/edit',{ id: this.id,note: msg}).done(function(ret){
          if(ret.status === 0){
            console.log(ret)
            Toast('更新成功');
          }else{
            console.log("fail:"+self.$editFail);
            self.$note.html(self.$editFail);  
            Toast(ret.errorMsg);
          }
        });
    },

    delete: function(){
        var self = this;
        $.post('/api/notes/delete',{id:this.id}).done(function(ret){
            if(ret.status == 0){
                Toast('删除成功');
                self.$note.remove();
                Event.fire('waterfall')
            }else{
                Toast(ret.errorMsg);
            }
        })
    }
}

module.exports.Note = Note;