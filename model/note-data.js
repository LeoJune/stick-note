var Sequelize = require('sequelize');
var path = require('path');

var sequelize = new Sequelize(undefined,undefined,undefined,{
    host: 'loaclhost',
    dialect: 'sqlite',
    storage: path.join(__dirname, '../database/database.sqlite')
});

/* sequelize             测试是否能否连接的上            
     .authenticate()
     .then(function(err){
         console.log('connection has been established successfully.');
     })
     .catch(function(err){
         console.log('unable to connect to the database:',err);
     });
*/   

var Note = sequelize.define('note',{
    text: {
        type: Sequelize.STRING
    },
    username: {
        type: Sequelize.STRING
    }
});

// Note.sync({force: true});  删除所有数据


// Note.sync().then(function(){
//     Note.create({text: 'hello world'});   添加数据
// }).then(function(){
//     Note.findAll({raw:true}).then(function(notes){  找到所有的数据
//         console.log(notes)           打印出数据
//     })
// });


module.exports = Note;
