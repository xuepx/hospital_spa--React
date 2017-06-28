const fs = require('fs'),
      gulp = require('gulp'),
      minifycss= require('gulp-minify-css'),
      concat= require('gulp-concat'),
      rename= require('gulp-rename'),
      uglify= require('gulp-uglify'),
      babelCore = require('babel-core'),
      uglifyjs = require("uglify-js");

gulp.task('pack-CSS',()=> {
    gulp.src('./develop/js/common.css')
        .pipe(minifycss())
        .pipe(gulp.dest('./dist/js'));
    console.log('css has packed!')
})

gulp.task('pack-JS',()=> {
    gulp.src(['./develop/js/fastclick.js','./develop/js/common.js','./develop/js/react.js','./develop/js/react-dom.js'])
        .pipe(concat('frame.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
    console.log('js has packed!')
})

gulp.task('pack-HTML',['pack-CSS','pack-JS'],()=>{
    let files = fs.readdirSync('./develop'),
        reg=/\.html$/,
        reg1 = /^<.+(fastclick\.js|common\.js|react\.js|react-dom\.js).+script>$/gm,
        cut1 = '<script  type="text/babel">',
        cut2 = '</script>',
        cut4 = '<script src="js/babel.js"></script>',
        presets = ['react'];
    files.forEach((val)=>{
        if(reg.test(val)){
            fs.readFile('./develop/'+val,'utf-8',(err,data)=>{
                let jsString = data.split(cut1)[1].split(cut2)[0];
                jsString = uglifyjs.minify( babelCore.transform(jsString,{presets}).code ,{
                    mangle:false,
                    fromString:true
                }).code;
                data=(data.split(cut4)[0]+'<script src="js/frame.js"></script>\n<script>'+jsString+'</script>')
                fs.writeFile('./dist/'+val,data,'utf-8',(err,data)=>{
                    console.log('success ：'+val)
                })
            })
        }
    });
})

gulp.start('pack-HTML')