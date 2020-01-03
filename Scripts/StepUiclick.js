var StepUiclick = pc.createScript('stepUiclick');
//用来写事件信息
StepUiclick.attributes.add("eventName",{
    type:"string",
    "default":"name_EventName"
});
//选择事件类型
StepUiclick.attributes.add("eventType",{
  type: "number",
        "default": 0,
        "enum": [{
            StepChangeEvent : 0
        },{
            ReturnEvent :1
        }]
});
//事件的参数id
StepUiclick.attributes.add("eventIndex_listen", {
    type: "number",
    "default": 0
});
// initialize code called once per entity
StepUiclick.prototype.initialize = function() {
     this.entity.element.on('touchstart', this.onStateChange, this); 
}; 
StepUiclick.prototype.onStateChange = function(t)
{
    console.log("点击到UI "+this.eventName +" " +this.eventIndex_listen);
    GameMain.EvtMgr.fire(this.eventName, this.eventIndex_listen); 
}; 