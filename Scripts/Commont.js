var Commont = pc.createScript('commont'); 

//////显隐
 //Static function 虽然js并不支持重载
Commont.ActiveGo = function(go,b)
{
    go.enabled = b;
};
Commont.ActiveGos = function(a,array,b)
{ 
    for (var e = a; e < array.length; e++)
    {
       this.ActiveGo(array[e],b);   
    }
};
Commont.ActiveGosIndex = function(a,array,index,b)
{ 
    for (var e = a; e < array.length; e++)
    {
        var isAct = (e=== index) ? b : !b;  
        this.ActiveGo(array[e],isAct);  
    }
};
/////延时
Commont.Wait = function(func,time)
{
    setTimeout(function () {
　　　　　 func(); 
　　　　}, time);
};   
/////解析链接
Commont.GetQueryVariable =function (variable)
{
   var query = window.location.search.substring(1);
   var vars = query.split("&");
   for (var i=0;i<vars.length;i++) {
           var pair = vars[i].split("=");
           if(pair[0] == variable){return pair[1];}
   }
   return(false);
};
/////播放动画部分 物体 动画速度 动画名字
Commont.PlayAnimatoin= function(go,speed,name)
{
    go.animation.speed = speed;
    go.animation.play(name); 
}; 