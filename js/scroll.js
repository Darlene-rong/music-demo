var scrollDom = function(boxDom,preDom,precessDom,textbox){
    this.boxDom = document.getElementById(boxDom);
    this.preDom = document.getElementById(preDom);
    this.precessDom = document.getElementById(precessDom);
    this.init(textbox);
};
scrollDom.prototype = {
    init: function(e){
        var max = this.precessDom.offsetWidth - document.getElementById("testbox").offsetWidth;
        var $this = this;
        //鼠标按键被按下时发生的事件
        $this.preDom.onmousedown = function(e) {
            // var $this = this;
            var domy = e.clientX;//返回事件被触发的时候，鼠标指针的水平坐标
            var left = this.offsetLeft;//初始的left值
            // onmousemove	鼠标被移动。
            document.onmousemove = function(e) {
                var thisX = e.clientX;//clientX	返回当事件被触发时，鼠标指针的水平坐标。boxDom
                var nl = thisX - domy + left;
                if(nl <= 0){
                    $this.ondrag(0)
                }else if(nl >= max){
                    $this.ondrag(max)
                }else{
                    $this.ondrag(nl)
                }
            };
            //onmouseup	鼠标按键被松开。
            document.onmouseup = function() {
                document.onmousemove = null;
                document.onmouseup = null;
            } 
        }
    },
    ondrag: function(x){
        this.boxDom.style.width = x + "px";
        this.preDom.style.left = x + "px";
    }
}