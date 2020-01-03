var GlobalEventMgr = pc.createScript('globalEventMgr');

// initialize code called once per entity
GlobalEventMgr.prototype.initialize = function() {
    this.entity.on(GameMain.Evt_StepChange,this.onStepChange, this); 
};

// update code called every frame
GlobalEventMgr.prototype.update = function(dt) 
{
    
};
//根据需求要更改GameMain.CurrentStep
GlobalEventMgr.prototype.onStepChange = function(a) {
       GameMain.CurrentStep = a;
};
 