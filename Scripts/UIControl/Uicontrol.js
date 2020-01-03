var Uicontrol = pc.createScript('uicontrol');

Uicontrol.attributes.add("ArrayBtnUI",{ //4个按钮UI
    type:"entity",
    max:4,
    array:!0
});  
Uicontrol.self = null; 
// initialize code called once per entity
Uicontrol.prototype.initialize = function() {

    Uicontrol.self = this;
    //初始化事件 
    GameMain.EvtMgr.on(GameMain.Evt_StepChange, this.StepChangeClick, this);
    GameMain.EvtMgr.on(GameMain.Evt_ReturnEvent,this.ReturnClick,this); 
    //初始化操作  
    Commont.ActiveGos(0,this.ArrayBtnUI,true);    

}; 
Uicontrol.prototype.StepChangeClick = function(a) 
{//步骤
    if(!GameMain.IsAgain)
    {
        return;
    }
    //调用UI的处理逻辑

    //调用模型的处理逻辑
    GameMain.ModelControl.OnEnterModel(GameMain.CurrentStep);

};

Uicontrol.prototype.ReturnClick = function(a)
{
    //返回 
    //调用UI的处理逻辑

    //调用模型的处理逻辑
    GameMain.ModelControl.OnExitModel(GameMain.CurrentStep);
   
    //处理摄像机的逻辑
    GameMain.MainCamera.script.cameraHandle.StepChange(GameMain.CurrentStep); //旋转和中心点都做完了  
 
};  
