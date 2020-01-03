var CameraHandle = pc.createScript('cameraHandle');
 
CameraHandle.self = null;
// initialize code called once per entity
CameraHandle.prototype.initialize = function()
{ 
    CameraHandle.self = this;
    this.mouse = this.entity.script.mouseInput;
    this.touch = this.entity.script.touchInput;
    GameMain.EvtMgr.on(GameMain.Evt_StepChange, this.StepChangeClick, this); 
    this.StepChange(GameMain.CurrentStep);
}; 
CameraHandle.prototype.StepChangeClick = function(a)
{ 
    if(!GameMain.IsAgain){return;}
    CameraHandle.self.StepChange(GameMain.CurrentStep);
};

CameraHandle.prototype.StepChange = function(stepid)
{
    //console.log("CameraHandle.CurrentStep" + GameMain.CurrentStep);
    this.dis = parseFloat(GameMain.AnimationStepData[stepid].Distance);
    this.yaw = parseFloat(GameMain.AnimationStepData[stepid].Yaw);
    this.pitch = parseFloat(GameMain.AnimationStepData[stepid].Pitch);        
    this.posX = parseFloat(GameMain.AnimationStepData[stepid].PosX);
    this.posY = parseFloat(GameMain.AnimationStepData[stepid].PosY);
    this.posZ = parseFloat(GameMain.AnimationStepData[stepid].PosZ);  
    
    this.r = JSON.parse(GameMain.AnimationStepData[stepid].IsRot);
    this.m = JSON.parse(GameMain.AnimationStepData[stepid].IsMove);  
    this.w = JSON.parse(GameMain.AnimationStepData[stepid].IsWheel);  
     
    this.mouse.IsRot = this.r;
    this.mouse.IsMove = this.m; 
    this.mouse.IsWheel = this.w; 
    
    this.touch.IsRot = this.r;
    this.touch.IsMove = this.m;
    this.touch.IsWheel = this.w;
    GameMain.DebugCam.setMoveRot(this.yaw,this.pitch,this.dis ,new pc.Vec3(this.posX ,this.posY ,this.posZ)); 
    
};

 