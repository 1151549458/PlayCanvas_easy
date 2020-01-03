var Uicontrol = pc.createScript('uicontrol');

Uicontrol.attributes.add("ArrayBtnUI",{ //4个按钮UI
    type:"entity",
    max:4,
    array:!0
});  
Uicontrol.attributes.add("BtnReturnUI",{ //返回UI
    type:"entity"
});  
Uicontrol.attributes.add("ArrayTitle",{
    type:"entity",
    max:4,
    array:!0
}); 
////////菜单按钮UI
Uicontrol.attributes.add("MenuContentUI",{
    type:"entity"
});
Uicontrol.attributes.add("BtnPlayUI",{
    type:"entity"
});
Uicontrol.attributes.add("BtnLeftUI",{
    type:"entity"
});
Uicontrol.attributes.add("BtnRightUI",{
    type:"entity"
});
/////////结束UI
Uicontrol.attributes.add("EndContentUI",{ //结束UI
    type:"entity"
}); 
Uicontrol.attributes.add("BtnCancelUI",{ //结束的取消按钮
    type:"entity"
}); 
Uicontrol.attributes.add("BtnAnswerUI",{//节水的确认按钮
    type:"entity"
}); 
//StartPlayEvent
Uicontrol.attributes.add("BtnPlay",{
    type:"entity"
});
Uicontrol.attributes.add("ArrayPlayUI",{ //2个按钮UI
    type:"asset",
    max:2,
    array:!0
}); 

Uicontrol.self = null; 

// initialize code called once per entity
Uicontrol.prototype.initialize = function() {
    this.ArrayFinish = new Array(3);
    this.ArrayFinish[0] = false;
    this.ArrayFinish[1] = false;
    this.ArrayFinish[2] = false;  
    Uicontrol.self = this;
    //初始化事件 
    GameMain.EvtMgr.on(GameMain.Evt_StepChange, this.StepChangeClick, this);
    GameMain.EvtMgr.on(GameMain.Evt_AnswerEvent,this.AnswerClick,this);
    GameMain.EvtMgr.on(GameMain.Evt_ReturnEvent,this.ReturnClick,this); 
    GameMain.EvtMgr.on(GameMain.Evt_AnimtionSpeedEvent,this.AnimtionSpeedClick,this); 
    GameMain.EvtMgr.on(GameMain.Evt_StartPlay,this.StartPlayClick,this); 
 
    this.CalendarHandle = this.entity.script.calendarControl;     //获取日历脚本
    this.CalendarInfo = this.entity.script.calendarInfo;    //获取日历信息
    //初始化操作  
    
    Commont.ActiveGos(0,this.ArrayBtnUI,true);    
    Commont.ActiveGos(0,this.ArrayTitle,false);
    Commont.ActiveGo(this.EndContentUI,false); 
    Commont.ActiveGo(this.MenuContentUI,false); 
    Commont.ActiveGo(this.BtnReturnUI,false); 
    
    this.stuNum = Commont.GetQueryVariable("idNumber");
    console.log(this.stuNum);
    this.isPlayContent = false; 
    this.AnimationCallBack(false);
    
    this.isPlay = false; 
}; 

 
Uicontrol.prototype.StepChangeClick = function(a) 
{//步骤
    if(!GameMain.IsAgain)
    {
        return;
    }
    this.OnRest(false); 
    this.ArrayFinish[GameMain.CurrentStep -1] = true;
    this.CalendarInfo.SetActive(true);
    GameMain.ModelControl.OnEnterModel(GameMain.CurrentStep);
    this.CalendarHandle.CreateCalendar(0);
    
};

Uicontrol.prototype.AnswerClick = function(a)
{
    if(a === 0 )
    {
        //隐藏按钮
        Commont.ActiveGo(this.EndContentUI,false); 
        for(var i = 0;i<this.ArrayFinish.length;i++)
        { 
            this.ArrayFinish[i] = false;
        }
        GameMain.IsAgain = true;
    }
    else if(a === 1)
    {
        //跳答题链接   //通讯一下 
        //https://ppt.chinafoss.com/answer?column=2&idNumber=092019001&mark=25
        
        var url = "https://ppt.chinafoss.com/answer2?column=2&idNumber=" +  this.stuNum + "&mark=60";
        window.location.href= url; 
    } 
}; 
Uicontrol.prototype.ReturnClick = function(a)
{
    //返回 需要隐藏返回按钮和文字介绍按钮 并且坐标回到初始    
    this.OnRest(true); 
    this.CalendarHandle.StopCalendar();
    this.CalendarInfo.SetActive(false); 
    GameMain.ModelControl.OnExitModel(GameMain.CurrentStep);
    GameMain.CurrentStep = 0;
    GameMain.MainCamera.script.cameraHandle.StepChange(GameMain.CurrentStep); //旋转和中心点都做完了  
    this.AnimationCallBack(false);
    //判断一下是否学完
    var num = 0;
    for(var i = 0;i<this.ArrayFinish.length;i++)
    { 
        if(this.ArrayFinish[i])
        {
            num++;
        }
    }
    if(num>=this.ArrayFinish.length)
    {
        Commont.ActiveGo(this.EndContentUI,true); 
        GameMain.IsAgain = false;
    } 
    this.isPlay = false;
}; 

Uicontrol.prototype.OnRest = function(b)
{
    Commont.ActiveGos(0,this.ArrayBtnUI,b);   
    Commont.ActiveGo(this.BtnReturnUI,!b);  
    Commont.ActiveGo(GameMain.ModelControl.ArrayModelSection[GameMain.CurrentStep -1],!b);
    Commont.ActiveGo(this.MenuContentUI,!b); 
    Commont.ActiveGo(this.ArrayTitle[GameMain.CurrentStep -1], !b);
};
Uicontrol.prototype.AnimtionSpeedClick = function(offest)
{ 
    GameMain.ModelControl.ChangeTime(offest);
    this.CalendarHandle.ChangeTime(offest);
   
};
Uicontrol.prototype.StartPlayClick = function(d)
{   
    if(this.isPlay)
    {
        this.isPlay = !this.isPlay;
        this.BtnPlay.element.texture = this.isPlay ? this.ArrayPlayUI[1].resource:this.ArrayPlayUI[0].resource;  
        GameMain.ModelControl.OnEnterModel(GameMain.CurrentStep);
        this.CalendarHandle.CreateCalendar(0);
    }
};
Uicontrol.prototype.AnimationCallBack = function(b)
{ 
    this.BtnPlay.element.texture = b? this.ArrayPlayUI[1].resource:this.ArrayPlayUI[0].resource;  
    this.isPlay = true; 
};
