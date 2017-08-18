import '../css/pic-visit.css';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import scroll from 'iscroll';
import { $,$Ajax,$Loading } from '../js/common';
import AskChat from './pic-visit/ask-chat.jsx';

let DPI=devicePixelRatio,iScroll,iScroll2;

export default class extends React.Component{
    state = {
        Act:['active',''],
        Act2:['active',''],
        shadeAct:false,
        shadeTitle:'',
        list:{
            th0:[],
            th1:[],
            th2:[]
        },
        chooseList:0,
        isnotResult:''
    }
    constructor(props){
        super(props)
        imgLoad()
    }
    componentDidMount(){
        let ele = this.refs.canvas,
            ctx = ele.getContext('2d'),
            canvasWidth=7.5*REM,
            canvasHeight=document.body.clientHeight-2*REM;
        ele.width=canvasWidth*DPI;
        ele.height=canvasHeight*DPI;
        ele.style.width=canvasWidth+'px';
        ele.style.height=canvasHeight+'px';
        canvasLoad(ele,ctx,this)
        iScroll = new scroll('#ul-wrapper',{click:true})
    }
    componentDidUpdate(){
        if(this.state.Act[1]){
            iScroll.refresh()
            iScroll.scrollTo(0,0)
        }
        if(this.state.shadeAct){
            iScroll2 = new scroll('#ul-wrapper2',{click:true})
        }
    }
    changeArea(i){
        let arr=['',''];
        arr[i]='active';
        this.setState({Act:arr,chooseList:0});
        if(i){
            $Ajax('getAiPositionList',{},(data)=>{
                let newList=this.state.list;
                newList.th0=data.obj;
                this.setState({list:newList})
            })
        }
    }
    changeSex(i){
        let arr=['',''];
        arr[i]='active';
        this.setState({Act2:arr});
        i?$.choosePicSex=1:$.choosePicSex=0;
    }
    getTh1(id){
        $Ajax('getAiPositionDetailList',{
            psid : id,
            sextype : $.choosePicSex ? 0 : 1
        },(data)=>{
            let newList=this.state.list;
            newList.th1=data.obj;
            this.setState({chooseList:1,list:newList})
        })
    }
    getTh1Shade(id,name){
        $Ajax('getAiPositionDetailList',{
            psid : id,
            sextype : $.choosePicSex ? 0 : 1
        },(data)=>{
            let newList=this.state.list;
            newList.th1=data.obj;
            this.setState({chooseList:1,list:newList,shadeAct:true,shadeTitle:name})
        })
    }
    getTh2(id,result){
        $Ajax('getAiProblemsList',{
            pdid : id
        },(data)=>{
            let newList=this.state.list;
            newList.th2=data.obj;
            this.setState({chooseList:2,list:newList,isnotResult:result,shadeAct:false,Act:['','active']})
        })
    }
    closeShade(){
        this.setState({shadeAct:false})
    }
    render(){
        let askTable,
            list=this.state.list,
            type=this.state.chooseList,
            shadeList,
        items=list['th'+type].map((item,i)=>{
            switch(type){
                case 0:return (<li key={item.id}><span onClick={this.getTh1.bind(this,item.id)}>{item.psname}</span></li>);break;
                case 1:return (<li key={item.id}><span onClick={this.getTh2.bind(this,item.id,item.isnotResult)}>{item.pdname}</span></li>);break;
            }
        })
        if(type==2){
            askTable = (<AskChat th2={list.th2} isnotResult={this.state.isnotResult} iScroll={iScroll} />)
        }else{
            askTable = (<ul className={this.state.Act[1]+' list'}>{items}</ul>)
        }
        if(this.state.shadeAct){
            shadeList = (
                <div id="shade-wrapper">
                    <p id="close-shade" onClick={this.closeShade.bind(this)} />
                    <div id="shade-list">
                        <h3>{this.state.shadeTitle}</h3>
                        <div id="ul-wrapper2">
                            <ul className="scroll">
                                {items}
                            </ul>
                        </div>
                    </div>
                </div>
            )
        }
        return (<div className="body-wrap P19">     <div className="route-shade"></div>
            <ul id="area" className="clearfix">
                <li onClick={this.changeArea.bind(this,0)} className={this.state.Act[0]} >身体部位</li>
                <li onClick={this.changeArea.bind(this,1)} className={this.state.Act[1]} >列表</li>
                <b className={this.state.Act[0]}/>
            </ul>
            
            <div id="canvas-wrapper" className={this.state.Act[0]}>
                <canvas ref="canvas" />
                <ul className='choose-sex'>
                    <li style={{paddingLeft:'5px'}} onClick={this.changeSex.bind(this,0)} className={this.state.Act2[0]}>女</li>
                    <li style={{paddingRight:'5px'}} onClick={this.changeSex.bind(this,1)} className={this.state.Act2[1]}>男</li>
                    <b className={this.state.Act2[0]}/>
                </ul>
            </div>

            <ReactCSSTransitionGroup transitionName="shade">
                {shadeList}
            </ReactCSSTransitionGroup>

            <div id="ul-wrapper" className={this.state.Act[1]}>
                <div className="scroll">
                    {askTable}
                </div>
            </div>

            <footer>
                <p style={{lineHeight:'.8rem'}}>{$.copyright}</p>
            </footer>
        </div>)
    }
}

var isDrawAllow=true,
    pointX=[],
    pointY=[],
    starArr=new Array(),
    changeSide=false,
    faceOrBack=true,
    areaId=0,
    areaName='',
    isPointInPic=false,
    headArea={
        man  :['0-0','16-7','21-13','26-25','25-40','24-49','23-60','19-65','13-74','0-76'],
        woman:['0-0','16-7','21-13','26-25','25-40','24-49','23-60','19-65','13-74','0-76']
    },
    chestArea={
        man  :['0-79','12-83','25-95','27-106','30-125','30-142','25-150','0-145'],
        woman:['0-79','12-83','25-95','27-106','30-125','30-142','25-150','0-145']
    },
    handArea={
        man  :['30-82','42-84','50-99','60-134','84-202','104-223','104-238','98-247','86-252','74-245','70-214','47-161','34-127','28-94','24-86'],
        woman:['27-92','40-104','75-200','84-213','97-219','98-237','93-246','77-246','65-227','31-140','30-112']
    },
    abdomenArea={
        man  :['0-147','32-153','30-172','36-190','0-194'],
        woman:['0-148','23-148','24-170','36-195','0-195']
    },
    sexArea={
        man  :['0-200','35-198','21-219','10-225','7-233','0-238'],
        woman:['0-200','35-198','21-219','10-225','7-233','0-238']
    },
    legArea={
        man  :['5-240','12-278','21-330','27-391','25-413','26-419','42-443','52-453','59-451','69-438','49-404','42-278','39-206'],
        woman:['36-203','31-254','32-331','30-398','43-429','45-445','29-460','22-446','13-425','7-410','10-386','0-236']
    },
    tabTextArr={
        face:[
            {
                startX:450*0.44/2,
                startY:25,
                lineWidth:76,
                direction:1,
                text:"头部",
                id:1
            },
            {
                startX:450*0.44/2+11,
                startY:112,
                lineWidth:80,
                direction:1,
                text:"胸部",
                id:3
            },
            {
                startX:450*0.44/2,
                startY:166,
                lineWidth:100,
                direction:1,
                text:"腹部",
                id:4
            },
            {
                startX:450*0.44/2,
                startY:215,
                lineWidth:115,
                direction:1,
                text:"生殖",
                id:7
            },
            {
                startX:450*0.44/2-20,
                startY:298,
                lineWidth:55,
                direction:-1,
                text:"下肢",
                id:12
            },
            {
                startX:450*0.44/2-47,
                startY:147,
                lineWidth:50,
                direction:-1,
                text:"上肢",
                id:11
            }
        ],
        back:[
            {
                startX:450*0.44/2,
                startY:65,
                lineWidth:76,
                direction:1,
                text:"颈部",
                id:2
            },
            {
                startX:450*0.44/2+5,
                startY:111,
                lineWidth:88,
                direction:1,
                text:"背部",
                id:9
            },
            {
                startX:450*0.44/2,
                startY:215,
                lineWidth:115,
                direction:1,
                text:"肛门",
                id:8
            },
            {
                startX:450*0.44/2-20,
                startY:298,
                lineWidth:55,
                direction:-1,
                text:"下肢",
                id:12
            },
            {
                startX:450*0.44/2-47,
                startY:147,
                lineWidth:50,
                direction:-1,
                text:"上肢",
                id:11
            }
        ]
    },
    imgChange=new Image(),
    manFaceImg=new Image(),
    womanFaceImg=new Image(),
    manBackImg=new Image(),
    womanBackImg=new Image();

function imgLoad(){
    $Loading()
    imgChange.src=require('../img/change-side.png');
    manFaceImg.src=require('../img/man-face.png');
    manFaceImg.onload=loadFun;
    womanFaceImg.src=require('../img/woman-face.png');
    womanFaceImg.onload=loadFun;
    manBackImg.src=require('../img/man-back.png');
    manBackImg.onload=loadFun;
    womanBackImg.src=require('../img/woman-back.png');
    womanBackImg.onload=loadFun;
    function loadFun(){
        this.ratio=this.width/this.height;
        imgLoad.num++;
        if(imgLoad.num>=4){$Loading.remove()}
    }
}
imgLoad.num=0;

function canvasLoad(ele,ctx,react){
    function render(){
        canvasReset(ele,ctx)
        requestAnimationFrame(render);
    }
    render()
    fingerTouch(ele,ctx,react)
}

function canvasReset(ele,ctx){
    isPointInPic=false;
    ctx.clearRect(0,0,ele.width,ele.height);
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = '#f0f0f5';
    ctx.strokeStyle = '#b5b5b5';
    ctx.lineWidth=.3*DPI;
    ctx.fillRect(0, 0, ele.width,ele.height);
    for(var i=1,hNum=Math.floor(ele.height/(20*DPI));i<=hNum;i++){
        ctx.beginPath();
        ctx.moveTo(0,i*20*DPI);
        ctx.lineTo(ele.width,i*20*DPI);
        ctx.stroke();
    }
    for(var i=1,wNum=Math.floor(ele.width/(20*DPI));i<=wNum;i++){
        ctx.beginPath();
        ctx.moveTo(i*20*DPI,0);
        ctx.lineTo(i*20*DPI,ele.height);
        ctx.stroke();
    }
    if(imgLoad.num<4)return;
    ctx.beginPath();
    ctx.drawImage(imgChange,ele.width-1.2*REM*DPI,ele.height-1.2*REM*DPI,REM*DPI,REM*DPI);
    ctx.arc(ele.width-0.7*REM*DPI,ele.height-0.7*REM*DPI,.5*REM*DPI,0,2*Math.PI);
    if(isPoint(ctx)){
        changeSide=true
    }else{
        changeSide=false
    }
    ctx.font="20"*DPI+"px Microsoft Yahei";
    ctx.textAlign="center";
    ctx.fillStyle = "#4e9ded";
    ctx.fillText(faceOrBack?"正 面":"背 面",ele.width/2,ele.height-30*DPI);
    ctx.restore();

    ctx.save();
    ctx.lineWidth=1;
    var showPic;
    if($.choosePicSex && faceOrBack){
        showPic=manFaceImg
    }else if($.choosePicSex && !faceOrBack){
        showPic=manBackImg
    }else if(!$.choosePicSex && faceOrBack){
        showPic=womanFaceImg
    }else if(!$.choosePicSex && !faceOrBack){
        showPic=womanBackImg
    }
    drawBodyPic(showPic);
    drawTapText(tabTextArr);
    if(!isPointInPic){
        areaId=0;   areaName='';
    }
    ctx.restore();

    for(var i=0;i<starArr.length;i++){
        starArr[i].opacity-=0.02;
        starArr[i].scale-=0.02;
        starArr[i].rotate+=starArr[i].direction ? starArr[i].rotateSpeed : -starArr[i].rotateSpeed;
        if(starArr[i].opacity>0){
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = starArr[i].color;
            ctx.transform(starArr[i].scale,0,0,starArr[i].scale,starArr[i].x,starArr[i].y);
            ctx.globalAlpha=starArr[i].opacity;
            drawShape(starArr[i].rotate);
            ctx.fill();
            ctx.restore();
        }else{
            starArr.splice(i,1);
            i--;
        }
    }

    function drawShape(deg){
        ctx.scale(DPI,DPI)
        if($.choosePicSex){
            ctx.arc(0,0,22.5,0,2*Math.PI);
        }else{
            ctx.scale(1.5,1.5)
            ctx.rotate(deg)
            for(var i=0;i<Math.PI*2;i+=Math.PI/180){
                var x=16*Math.pow(Math.sin(i),3),
                    y=13*Math.cos(i)-5*Math.cos(2*i)-2*Math.cos(3*i)-Math.cos(4*i)
                ctx.lineTo(x,-y)
            }
        }
    }
    function drawBodyPic(img){
        ctx.transform(ele.height*.8/450,0,0,ele.height*.8/450,(ele.width-ele.height*.8*img.ratio)/2,ele.height*.05)
        ctx.drawImage(img,0,0,450*img.ratio,450);
        creatClickArea(headArea,img,[1,2],['头部','颈部'])
        creatClickArea(chestArea,img,[3,9],['胸部','背部'])
        creatClickArea(handArea,img,[11,11],['上肢','上肢'])
        creatClickArea(abdomenArea,img,[4,9],['腹部','背部'])
        creatClickArea(sexArea,img,[7,8],['生殖','肛门'])
        creatClickArea(legArea,img,[12,12],['下肢','下肢'])
    }
    function creatClickArea(obj,img,idArr,nameArr){
        let arr = $.choosePicSex ? obj.man : obj.woman;
        ctx.beginPath();
        for(var i=0;i<arr.length;i++){
            var relative_x=Number(arr[i].split('-')[0]),
                y=Number(arr[i].split('-')[1])
            if(!i){
                ctx.moveTo(450*img.ratio/2-relative_x,y)
            }else{
                ctx.lineTo(450*img.ratio/2-relative_x,y)
            }
        }
        ctx.closePath();
        for(var i=0;i<arr.length;i++){
            var relative_x=Number(arr[i].split('-')[0]),
                y=Number(arr[i].split('-')[1])
            if(!i){
                ctx.moveTo(450*img.ratio/2+relative_x,y)
            }else{
                ctx.lineTo(450*img.ratio/2+relative_x,y)
            }
        }
        ctx.closePath();
        if(isPoint(ctx)){
            isPointInPic=true;
            if(faceOrBack){
                areaId=idArr[0]
                areaName=nameArr[0]
            }else{
                areaId=idArr[1]
                areaName=nameArr[1]
            }
        };
    }
    function drawTapText(obj){
        var arr = faceOrBack ? obj.face : obj.back;
        for(var i=0;i<arr.length;i++){
            var color = areaId==arr[i].id ?  "#ff3535" : "#4e9ded";
            ctx.beginPath();
            ctx.font="16px Microsoft Yahei";
            ctx.textAlign="center";
            ctx.textBaseline="middle";
            ctx.strokeStyle = color
            ctx.fillStyle = color
            ctx.moveTo(arr[i].startX,arr[i].startY)
            ctx.arc(arr[i].startX,arr[i].startY,6,0,2*Math.PI)
            ctx.fill();
            ctx.lineTo(arr[i].startX+arr[i].lineWidth*arr[i].direction,arr[i].startY)
            ctx.stroke();
            if(arr[i].direction>0){
                ctx.moveTo(arr[i].startX+arr[i].lineWidth,arr[i].startY-12);
                ctx.lineTo(arr[i].startX+arr[i].lineWidth+50,arr[i].startY-12);
                ctx.lineTo(arr[i].startX+arr[i].lineWidth+50,arr[i].startY+12);
                ctx.lineTo(arr[i].startX+arr[i].lineWidth,arr[i].startY+12);
                ctx.closePath();
                ctx.fill();
                ctx.fillStyle = '#FFFFFF'
                ctx.fillText(arr[i].text,arr[i].startX+arr[i].lineWidth+25,arr[i].startY);
            }else{
                ctx.moveTo(arr[i].startX-arr[i].lineWidth,arr[i].startY-12);
                ctx.lineTo(arr[i].startX-arr[i].lineWidth-50,arr[i].startY-12);
                ctx.lineTo(arr[i].startX-arr[i].lineWidth-50,arr[i].startY+12);
                ctx.lineTo(arr[i].startX-arr[i].lineWidth,arr[i].startY+12);
                ctx.closePath();
                ctx.fill();
                ctx.fillStyle = '#FFFFFF'
                ctx.fillText(arr[i].text,arr[i].startX-arr[i].lineWidth-25,arr[i].startY);
            }
            if(isPoint(ctx)){
                isPointInPic=true;
                areaId=arr[i].id;
                areaName=arr[i].text;
            };
        }
    }
}

function createNewShape(e,ele){
    pointY=[];pointX=[];
    for(var i=0;i<e.touches.length;i++){
        pointY[i]=(e.touches[i].clientY-ele.offsetParent.offsetTop)*DPI,
        pointX[i]=e.touches[i].clientX*DPI;
        starArr.push({
            color:'rgb('+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+')',
            x: pointX[i],
            y: pointY[i],
            rotate:0,
            rotateSpeed:(Math.floor(Math.random()*4)+0.5)*Math.PI/180,
            direction:Math.round(Math.random()),
            scale: 1,
            opacity: 1
        })
    }
}

function fingerTouch(ele,ctx,react){
    var openTimeOut=true;
    ele.addEventListener('touchstart',start,false)
    ele.addEventListener('touchmove',move,false)
    ele.addEventListener('touchend',end,false)

    function start(ev){
        isDrawAllow=false;
        createNewShape(ev,ele);
    }
    function move(ev){
        if(openTimeOut){
            openTimeOut=false
            setTimeout(function() {
                isDrawAllow=true
                openTimeOut=true
            },70);
        }else if(isDrawAllow){
            createNewShape(ev,ele);
            isDrawAllow=false
        }
        ev.preventDefault();
    }
    function end(ev){
        isDrawAllow=false;
        touchEndEvent(react)
        createNewShape(ev,ele);
    }
}

function touchEndEvent(react){
    if(changeSide){
        faceOrBack=!faceOrBack
    }
    if(areaId){
        react.getTh1Shade(areaId,areaName)
    }
}

function isPoint(ctx){
    if(!pointX.length)return false;
    for(var i=0;i<pointX.length;i++){
        if(ctx.isPointInPath(pointX[i],pointY[i]))return true;
    }
    return false
}