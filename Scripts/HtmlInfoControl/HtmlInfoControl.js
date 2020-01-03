var HtmlInfoControl = pc.createScript('htmlInfoControl');
HtmlInfoControl.attributes.add('CssInfo', {
    type: 'asset', 
    assetType:'css', 
    title: 'CSS Asset'
});
HtmlInfoControl.attributes.add('HtmlInfo', {
    type: 'asset',
    assetType:'html',
    title: 'HTML Asset'
});
HtmlInfoControl.Con = null;
// initialize code called once per entity
HtmlInfoControl.prototype.initialize = function() {
    var style = document.createElement('style'); 
    document.head.appendChild(style);
    style.innerHTML = this.CssInfo.resource || ''; 
    
    this.div = document.createElement("div"); 
    this.div.classList.add('container');
    this.div.innerHTML = this.HtmlInfo.resource || '';  
    document.body.appendChild(this.div);
    
    Con = document.getElementById("calendar"); 
};

HtmlInfoControl.prototype.SetActive = function(b)
{ 
    if(b)
    {
        Con.style.display = "block";
    }   
    else
    {
        Con.style.display = "none";
    } 
};

 