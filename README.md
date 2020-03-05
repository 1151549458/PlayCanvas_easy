# PlayCanvas框架
做这些项目总结的一个简易框架。
# 模块简介
### GameMain
- Global集成了摄像机，模型，UI，Json，事件管理组件；参考了GameFramework 调用：GameMain.xxxx
- GlobalEventMgr事件管理者，针对事件Id进行处理。
### CameraControl
- OrbitCamera摄像机对物体的逻辑。
- MouseInput处理摄像机鼠标事件。
- TouchInput处理摄像机触摸事件。
- CameraHandle处理摄像机角度以及移动的一些条件。
- fxaa摄像机处理抗锯齿。
### UIControl
- Uicontrol主要实现对UI事件的处理，并实现调用处理模型的逻辑。
### ModelControl
- ModelControl主要实现对Model的方法处理。
### Commont
- Commont工具类，集成了一些公用的方法。
### StepUiClick
- StepUiClick，UI事件发送，有新的事件添加enmu即可。
### HtmlInfoControl
- HtmlInfoControl，集中加载html和css，有的样式需要html来实现。
### JsonData
- JsonData用来存放json数据。
