/*
    成员变量：
        id: 播放器存放于某个容器中
        src: 播放的地址
        title: 歌名
        author: 演唱者
*/ 
/*
    组件封装的步骤：  --音乐播放组件
        1.创建一个音乐播放器
        2.播放音乐
        3.暂停音乐
        4.显示歌曲时间
        5.音量的控制
        6.进度的展示
        7.上一首下一首
        8.添加音乐
        9.静音
        
        10.歌词部分

        11.播放模式切换

*/ 
//播放音乐对象   (闭包回调函数)
var playerMusic = {
    audioDom: null,
    arrSongs: [],
    index: 0,
    //初始化话页面
    init: function() {
        //创建一个音乐对象
        this.audioDom = document.createElement("audio")
        this.audioDom.loop = true;
    },
    //添加音乐
    addMusic: function(arrsrc){
        // console.log(arrsrc)
        for(var i =0;i<arrsrc.length;i++){
            //将音乐放入音乐容器中
            this.arrSongs.push(arrsrc[i]);
            // console.log( this.arrSongs)
        }
       
         this.audioDom.src = this.arrSongs[this.index];//初始化播放第一首
         console.log(  this.audioDom)
         // console.log(this.audioDom.src + this.index)
    },
    //播放音乐
    play: function() {
        //播放音乐
        this.audioDom.play();
        // console.log(this.audioDom)
        rotate();
    },
    //播放音乐
    player: function() {
        //从音乐的数组中取对应的一首进行播放
        this.audioDom.src = this.arrSongs[this.index];
        //音乐播放
        this.audioDom.play()
    },
    //暂停音乐
    stop: function() {
        //暂停
        this.audioDom.pause();
        //清除定时器 图片旋转
        clearInterval(timer);
        flag = 0;
    },
    //上一首
    prev: function() {
        this.index--;
        
        console.log(this.index)
        if(this.index == -1){
            this.index = this.arrSongs.length-1; 
        }
        this.player();
    },
    //下一首
    next: function() {
        this.index++;
        console.log(this.index)
        if(this.index == this.arrSongs.length) {
            this.index = 0;
        }
        this.player();
    },
    //时间进度
    time: function(callback) {
        var $this = this;
        // 当视频可以正常播放且无需停顿时执行 JavaScript：
        // console.log($this.audioDom)
        $this.audioDom.oncanplaythrough = function() {
            console.log(this.duration);
            //获取音频的总时长
            var totalTime = this.duration;
            //格式化时长
            var timer = $this.formateTime(totalTime);
            //回调函数 将值进行返回暴露到对象的外面
            if(callback){
                var json = {
                    duration: totalTime,
                    time: timer
                };
                // console.log(json)//{duration: 214.93551, time: "03:34"}
                callback.call(json);
            }
        }  
    },
    //格式化时间
    formateTime: function(time) {
        // console.log(time)//214.93551   要进行格式化
        var m = parseInt(time / 60);
        var s = parseInt(time % 60);
        var time = (m<10?("0"+m):m)+":"+(s<10?("0"+s):s);
        // console.log(time)
        return time;
    },
    //音量的控制
    soundCountrol: function(callback) {
        var x = callback.offset + 20;

    },
    //播放进度的展示
    percent: function(callback) {
        var $this = this;
        /*
            ontimeupdate: 在视频/音频（audio/video）当前的播放位置发送改变时触发。
            currentTime：返回当前音频的现在时间
            duration：	返回音频的长度（以秒计）。
            floor() 方法执行的是向下取整计算，它返回的是小于或等于函数参数，并且与之最接近的整数。
        */
       console.log($this.audioDom)
        $this.audioDom.ontimeupdate = function() {
            //计算播放中的时间进度
            // console.log(this.currentTime),
            // console.log(this.duration)
            var per = Math.floor((this.currentTime/this.duration)*100);
            //总时长减去播放时长  
            var durationtest = $this.formateTime(this.duration);
            var stime = this.duration - this.currentTime;
            //格式化时间
            var timer = $this.formateTime(stime);
            var stimer = $this.formateTime(this.currentTime);
            var json = {
                per : per,
                time : timer,
                stime : stimer,
                durationtest: durationtest
            };
            // console.log(json)
            if(callback) callback.call(json);
        }
    },
    //静音
    stopVolome: function() {
        this.audioDom.muted = !this.audioDom.muted;
    },
    //歌词
    songWord: function(e) {
        var x = e.offset;
        this.audioDom.volume = parseFloat(x/100)*1;
        console.log(this.audioDom.volume)
    },
    //模式切换
    switchMode(){

    }
};
playerMusic.init();
// var arr = [ "musicfile/001.mp3",
//             "musicfile/002.mp3",
//             "musicfile/003.mp3",
//             "musicfile/一路向北.mp3",
//             "musicfile/周杰伦 - 退后.mp3",
//             "musicfile/005.mp3",
//             "musicfile/ARMNHMR - Closer (ARMNHMR Remix).mp3",
//             "musicfile/Local Sound - Wild.mp3",
//             "musicfile/Sam Feldt、Halsey - Colors (Sam Feldt Radio版).mp3",
//             "musicfile/许嵩 - 玫瑰花的葬礼.mp3",
//         ]
// playerMusic.addMusic(arr);
    //图片转动 随暂停播放进行旋转
    function rotate() {
        var deg = 0;
        flag = 1;
        timer = setInterval(function(){
            document.getElementById("image").style.transform = "rotate("+deg+"deg)";
            deg+=5;
            if(deg>360) {
                deg = 0;
            }
        },80);
    }

    // playerMusic.time(function(){
    //     // console.log(this.time)
    //     document.getElementById("timestar").innerHTML = this.time;
    // })
    playerMusic.percent(function(){
        $(".js_pre").css({
            width:  this.per + "%"
        });
        $(".js_prevalue").css({
            left:  this.per + "%"
        })
        // console.log(this.per)
        $(".timestar").html(this.durationtest);	
        $(".timeend").html(this.stime) ;
    })


