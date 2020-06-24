//generates the template for technical sheet
//orientation=true - portrait
//orientation=false - landscape
//frame.wrapper = pixels of height the header of internal content frame
//frame.legend = pixels of width of the legend of internal content frame
function generateTemplate(orientation,frame,titleH){
  let W,H,obj=this,c_wrapper,c_legend,c_content,dynamicSVGg,paperSVG,
      bRect,hRect,hRect_bb,content,cRect_bb,fRect,fText,
      wRect,wRect_bb,lRect,lRect_bb,cmRect,cmRect_bb,
      logo,logoScale,
      f1W,f1H,f2W,f2H,f3W,f3H,f3Ht;
  
  logoScale=1.32;
  console.log(titleH)
  if(titleH==undefined){titleH = 'Technical sheet'}
  this.orientation=orientation;
  this.callbackRotate=undefined;
  let calcFrameWH = function(){
   if(frame!==undefined) {
    try{
      f1W = W; //width wrapper
      f1H = frame.wrapper; //pixels height 
      f2W = frame.legend; //width legend - pixels
      f2H = H-f1H-100; //calculated as content height minus wrapper, 100 pixels - height of icons
      f3W = W-f2W; //rest of width
      f3H = H-f1H; //calculated as content height minus wrapper
    }
    catch(error){
     console.error('ERROR! Frame parameters were not defined properly') 
    }
  } 
  }
  let rotatePaper = function(W){
    //control of SVG
    paperSVG.attr({viewBox:'0 0 '+W+' '+H});
    bRect.attr({width:W})
    hRect.attr({width:W})
    logo.attr({x:W-(167.9+2*15.3)*logoScale})
    content.attr({width:W})
    //fRect.attr({width:W})
    calcFrameWH();
    //c_wrapper.attr({width:f1W})
    wRect.attr({width:f1W})
    c_legend.attr({x:W-f2W})
    lRect.attr({x:W-f2W})
    c_content.attr({width:f3W,viewBox:'0,0,'+f3W+','+f3H})
    cmRect.attr({width:f3W})
    dynamicSVGg.attr({transform:'matrix('+f3W/950+',0,0,'+f3W/950+',0,0)'})
    //control of div
    resizeDIV()
  }
  let resizeDIV =  function (){    hRect_bb=document.getElementById("hRect").getBoundingClientRect();
    $('#div_header').attr({
      style:'position:fixed; left:'+hRect_bb.x+'px; width:'+hRect_bb.width+'px; height:'+hRect_bb.height+'px; top:'+hRect_bb.y+'px;pointer-events:none;'
    })
cRect_bb=document.getElementById("cRect").getBoundingClientRect();
    $('#div_content').attr({
      style:'position:fixed; left:'+cRect_bb.x+'px; width:'+cRect_bb.width+'px; height:'+cRect_bb.height+'px; top:'+cRect_bb.y+'px;pointer-events:none;'
    })
wRect_bb=document.getElementById("wRect").getBoundingClientRect();
$('#div_content_wrapper').attr({
      style:'position:fixed; left:'+wRect_bb.x+'px; width:'+wRect_bb.width+'px; height:'+wRect_bb.height+'px; top:'+wRect_bb.y+'px;pointer-events:none;'
    })
lRect_bb = document.getElementById("lRect").getBoundingClientRect();
$('#div_content_legend').attr({
      style:'position:fixed; left:'+lRect_bb.x+'px; width:'+lRect_bb.width+'px; height:'+lRect_bb.height+'px; top:'+lRect_bb.y+'px;pointer-events:none;'
})
cmRect_bb = document.getElementById("cmRect").getBoundingClientRect();
$('#div_content_content').attr({
      style:'position:fixed; left:'+cmRect_bb.x+'px; width:'+cmRect_bb.width+'px; height:'+cmRect_bb.height+'px; top:'+cmRect_bb.y+'px;pointer-events:none;' 
    })
  }
  let initialSVG = function (){    
  let logoSrc='https://dmts34.github.io/DCpedia/images/H-S-Logo.jpg';
  //SVG width and height
  if(orientation){W=950;H=1340} else {W=1890;H=1340}
  calcFrameWH()
  //filling the template
  //-1- paper - portrait or landscape
  paperSVG=Snap('#paper_svg');
  paperSVG.attr({viewBox:'0 0 '+W+' '+H});
  //-1- html
let el1=$('<div>', {id: "paper_html", class: "paper_html",style:'pointer-events:none;'});
 //bounding rectangle 
  bRect = paperSVG.rect(0,1,W,H,0).attr({fill:'white',stroke:'grey',strokeWidth:'3px',id:'recBound'});
  //-2- header rectangle 
  hRect = paperSVG.rect(0,1,W,140,0).attr({fill:'none',stroke:'none',id:'hRect'});//header rectangle
  //-2- div
    hRect_bb=document.getElementById("hRect").getBoundingClientRect();    
    let el2=$('<div>', {
        id: "div_header", 
        class: "div_header",
        style:'position:fixed; left:'+(hRect_bb.x)+'px; width:'+hRect_bb.width+'px; height:'+hRect_bb.height+'px; top:'+hRect_bb.y+'px;pointer-events:none;'}); 
   //logo    
  logo = paperSVG.image(logoSrc,W-(167.9+2*15.3)*logoScale,2*15.3*logoScale,167.9*logoScale,15.3*logoScale);
  paperSVG.text(40,90,titleH).attr({class:'SVG-h1-black'})
  //-3- content    
  content = paperSVG.rect(0,140,W,H-141,0).attr({fill:'#ebe6e4',stroke:'none',id:'cRect'});
  //-3- div 
     cRect_bb=document.getElementById("cRect").getBoundingClientRect();    
    let el3=$('<div>', {
        id: "div_content", 
        class: "div_content",
        style:'position:fixed; left:'+cRect_bb.x+'px; width:'+cRect_bb.width+'px; height:'+cRect_bb.height+'px; top:'+cRect_bb.y+'px; pointer-events:none;'});
  //-4- footer rectangle and text
      // fRect = paperSVG.rect(1,1200,W-2,140,0).attr({fill:'#365888',stroke:'none',id:'fRect'});
      // fText = paperSVG.text(40,1280,'Connecting – today and beyond').attr({class:'SVG-h1-white'});
//creating subframes
    //-5-top wrapper rectand div   
     wRect=paperSVG.rect(0,140,f1W,f1H,0).attr({fill:'none',stroke:'none',id:'wRect'});
    //-5- div
        c_wrapper = paperSVG.svg(0,140,950,f1H,0,0,950,f1H).attr({id:'content_wrapper'});
    wRect_bb=document.getElementById("wRect").getBoundingClientRect();
    let el4=$('<div>', {
        id: "div_content_wrapper", 
        class: "div_content_wrapper",
        style:'position:fixed; left:'+(wRect_bb.left)+'px; width:'+wRect_bb.width+'px; height:'+wRect_bb.height+'px; top:'+(wRect_bb.top)+'px;pointer-events:none;'});
//-6- legend wrapper rectangle and div     
  c_legend = paperSVG.svg(W-f2W,140+f1H,f2W,f2H,0,0,f2W,f2H).attr({id:'content_legend'});
    lRect = paperSVG.rect(W-f2W,140+f1H+100,f2W,f2H).attr({fill:'none',stroke:'none',id:'lRect'})
    //-6- div
   lRect_bb = document.getElementById("lRect").getBoundingClientRect();
    let el5=$('<div>', {
        id: "div_content_legend", 
        class: "div_content_legend",
        style:'position:fixed; left:'+(lRect_bb.left)+'px; width:'+lRect_bb.width+'px; height:'+lRect_bb.height+'px; top:'+(lRect_bb.top)+'px; pointer-events:none'});
//-7- main content 
  c_content = paperSVG.svg(0,140+f1H,f3W,f3H,0,0,f3W,f3H).attr({id:'content_content'});
//-7- div
 cmRect=paperSVG.rect(0,140+f1H,f3W,f3H).attr({fill:'none', stroke:'none', id:'cmRect'});
 cmRect_bb = document.getElementById("cmRect").getBoundingClientRect();
    let el6=$('<div>', {
        id: "div_content_content", 
        class: "div_content_content",
        style:'position:fixed; left:'+(cmRect_bb.left)+'px; width:'+cmRect_bb.width+'px; height:'+cmRect_bb.height+'px; top:'+(cmRect_bb.top)+'px' });    
  dynamicSVGg = c_content.g().attr({transform:'matrix('+f3W/950+',0,0,'+f3W/950+',0,0)'})
    
    $('#html_container').append(el1)
    $('#paper_html').append(el2,el3,el4,el5,el6)
    
  }
  this.rotatePortrait = function(){
    W=950;
    rotatePaper(W);
    obj.orientation=true;
    if(obj.callbackRotate!==undefined){obj.callbackRotate()}
  }
  this.rotateLandscape = function(){
    W=1890;
    rotatePaper(W);
    obj.orientation=false;
    if(obj.callbackRotate!==undefined){obj.callbackRotate()}
  }
  this.showRotateBtn = function(y){
    if(!y){
      let el = c_legend.select('#rotateBtn')
      if(el){el.remove()}
    } else {
        let rotate = c_legend.group().attr({id:'rotateBtn',class:'Icon',transform:'matrix(0.8,0,0,0.8,10,10)'})
  rotate.rect(0,0,50,50,2).attr({fill:'#ccbeba'})
  rotate.path().attr({d:'M0 0.75 L0 52.5 L31.5 52.5 L31.5 0.75 L0 0.75 ZM2.25 3 L29.25 3 L29.25 49.97 L2.25 49.97 L2.25 3 ZM31.5 52.5 L56.25 52.5 L56.25 21 L31.5 21 L31.5 23.25 L54 23.25 L54 50.25 L31.5 50.25 L31.5 52.5 ZM50.92 10.56 A11.0448 9.63058 -174.07 0 0 40.89 0.75 L36.53 0.75 A12.4874 10.8888 3.51 0 1 48.84 11.11 L46.12 11.84 L52.04 18.19 L54 9.73 L50.92 10.56 Z',transform:'matrix(0.75,0,0,0.75,5,5)'})
  rotate.click(function(){
    if(W===1890){
      obj.rotatePortrait()
      W=950
    } else {
      obj.rotateLandscape()
      W=1890
    }
  })
    }
    
  }
  window.onresize = resizeDIV
  window.onorientationchange = resizeDIV
  initialSVG()
  return {obj:obj,wrapper:c_wrapper,legend:c_legend,dynamic:dynamicSVGg}
}

// let template = generateTemplate(true, {wrapper:130,legend:150});
// template.obj.showRotateBtn(true)