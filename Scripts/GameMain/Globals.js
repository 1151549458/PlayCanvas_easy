var Globals = pc.createScript('globals'); 
//当前的步骤
Globals.attributes.add("CurrentStep",{
    type:"number",
    "default":-1
}); 
//总共步骤
Globals.attributes.add("TotalSteps",{
    type:"number",
    "default":6
});
//步骤UI
Globals.attributes.add("Evt_StepChange", {
    type: "string",
    "default": "StepChangeEvent"
}); 
//返回
Globals.attributes.add("Evt_ReturnEvent", {
    type: "string",
    "default": "ReturnEvent"
}); 
//事件转换器
Globals.attributes.add("EvtMgr", {
    type: "entity"
});
//摄像机
Globals.attributes.add("MainCamera", {
    type: "entity"
});
Globals.attributes.add("Model",{
    type:"entity"
});
Globals.attributes.add("UI",{
    type:"entity"
});
//步骤json
Globals.attributes.add("StepJsonData",{
    type:"asset",
    assetType: 'json'
});
var icanvas;
var iwidth;
var iheight;
var iproportion;
Globals.prototype.initialize = function() {
    window.GameMain = this;
    this.DebugCam = this.MainCamera.script.orbitCamera;
    this.ModelControl = this.Model.script.modelControl;
    this.UIControl = this.UI.script.uicontrol;  
    this.IsAgain = true;//进制操作。
    //获取设备的canvas 其实可以写在初始化
    icanvas = this.app.graphicsDevice.canvas;
    iwidth = icanvas.offsetWidth ;
    iheight = icanvas.offsetHeight;
    iproportion = iheight / 1280; 
    this.point = new pc.Vec3();
    //加载Json
    this.AnimationStepData = this.StepJsonData.resources; 
}; 
// update code called every frame
Globals.prototype.update = function(dt) {
    //this.printCam();        //打印信息
    //this.UIFollowModel();   //跟随信息
}; 
Globals.prototype.calcShortRot = function(y) {
    return y < -360 || y > 360 ? y % 360 : y;
};
Globals.prototype.printCam = function() {
    console.log("Cam yaw Y轴 " + this.DebugCam.yaw + 
                "\nCam Cam pitch X轴 " + this.DebugCam.pitch + 
                "\nCam distance 距离 " + this.DebugCam.distance );  
};
//如果有让UI点跟随模型移动的话，就用这个功能。
Globals.prototype.UIFollowModel = function()
{
    //让UI跟随模型
    for (var a = 0; a < GameMain.ModelControl.ArrayModel.length; a++)
    {
        this.MainCamera.camera.worldToScreen(GameMain.ModelControl.ArrayModel[a].getPosition(),this.point); 
        GameMain.UIControl.ArrayPointUI[a].setLocalPosition(
            (this.point.x - iwidth / 2 ) / iproportion,
            (-this.point.y + iheight / 2 ) / iproportion,
            0);
    }  
};

