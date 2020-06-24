let template = generateTemplate(true, { wrapper: 130, legend: 150 }, "Patching guide");
let s = template.dynamic.svg().attr({ id: 'Rack', viewBox: '0 0 950 1200', width: '950px', height: '1200px', x: 0, y: 0 })
let w = template.wrapper.svg().attr({ id: 'Wrapper', viewBox: '0 0 950 130', width: '950px', height: '130px', x: 0, y: 0 })
let l = template.legend.svg().attr({ id: 'Legend', viewBox: '0 0 150 750', width: '150px', height: '1060px', x: 0, y: 0 })
template.obj.showRotateBtn(false)

function runCDR1500() {

  //store vars that need to be loaded here
  var CDR1500LISA, guideIcon, principlesIcon;
  //stores some paths that can be used
  var firstPath = 'M22.15 756.23 L25.87 756.23 L25.88 784.79 L19.73 784.79 L19.73 763.16 C19.39 763.46 18.99 763.75 18.53 764.02 C18.06 764.28 17.58 764.52 17.05 764.74 C16.53 764.95 15.99 765.13 15.43 765.28 C14.87 765.43 14.32 765.54 13.77 765.6 L13.77 760.42 C15.38 759.95 16.89 759.35 18.3 758.62 C19.72 757.9 21.01 757.1 22.15 756.23 ZM42.98 770.51 A21.4899 21.4899 -180 1 0 -0 770.51 A21.4899 21.4899 -180 1 0 42.98 770.51 ZM39.49 770.51 A18 18 0 1 1 3.49 770.51 A18 18 0 1 1 39.49 770.51 Z',
    questionPath = 'M6.78 785.57 C7.8 785.57 8.65 785.87 9.33 786.48 C10.01 787.08 10.35 787.84 10.35 788.76 C10.35 789.7 10.02 790.47 9.35 791.08 C8.67 791.69 7.81 792 6.78 792 C5.73 792 4.87 791.69 4.18 791.06 C3.49 790.41 3.14 789.65 3.14 788.76 C3.14 787.85 3.49 787.09 4.18 786.48 C4.87 785.87 5.73 785.57 6.78 785.57 ZM6.95 763.14 C8.16	763.14 9.28 763.28 10.32 763.54 C11.37 763.81 12.28 764.23 13.05 764.8 C13.82 765.37 14.43 766.1 14.86 766.99	C15.3 767.88 15.52 768.95 15.52 770.2 C15.52 770.99 15.43 771.7 15.25 772.35 C15.06 772.99 14.8 773.6 14.44	774.17 C14.09 774.74 13.66 775.29 13.14 775.82 C12.61 776.34 12.02 776.89 11.34 777.44 C10.89 777.82 10.48	778.17 10.14 778.5 C9.8 778.82 9.51 779.14 9.28 779.46 C9.06 779.78 8.88 780.11 8.76 780.47 C8.64 780.83	8.59 781.24 8.59 781.69 C8.59 782 8.63 782.32 8.72 782.65 C8.8 782.97 8.91 783.25 9.06 783.46 L3.92 783.46	C3.8 783.13 3.69 782.74 3.62 782.32 C3.55 781.9 3.51 781.5 3.51 781.13 C3.51 780.53 3.57 779.98 3.69 779.49	C3.8 779 3.98 778.53 4.22 778.1 C4.45 777.66 4.74 777.25 5.09 776.85 C5.45 776.45 5.85 776.06 6.33 775.67	C6.82 775.25 7.25 774.87 7.62 774.51 C7.99 774.15 8.31 773.79 8.57 773.44 C8.83 773.08 9.03 772.72 9.15	772.33 C9.28 771.94 9.35 771.52 9.35 771.05 C9.35 770.65 9.28 770.27 9.13 769.93 C8.99 769.58 8.79 769.29 8.52 769.05 C8.25 768.8 7.93 768.6 7.54 768.46 C7.16 768.32 6.73 768.24 6.27 768.24 C5.25 768.24 4.19 768.46	3.11 768.88 C2.01 769.3 0.98 769.94 0 770.8 L0 764.93 C1.01 764.33 2.09 763.89 3.28 763.59 C4.46 763.29 5.69 763.14 6.95 763.14 Z',
    homePath = 'M0 792 L32.62 792 L32.62 766.04 L16.31 751.8 L0 766.04 L0 792 ZM4.54 787.68 L4.54 768.95 L16.31 758.68 L28.08 768.95 L28.08 787.68 L4.54 787.68 Z',
    threePath = 'M42.98 770.51 A21.4899 21.4899 -180 1 0 -0 770.51 A21.4899 21.4899 -180 1 0 42.98 770.51 ZM39.49 770.51 A18 18 0 1 1 3.49 770.51 A18 18 0 1 1 39.49 770.51 ZM21.81 755.9 C24.68 755.9 26.91 756.54 28.5 757.82 C30.09 759.11 30.89 760.78 30.89 762.83 C30.89 766.48 29.04 768.77 25.33 769.69 L25.33 769.79 C27.3 770.04 28.87 770.76 30.01 771.94 C31.16 773.13 31.73 774.59 31.73 776.31 C31.73 778.93 30.78 781 28.86 782.52 C26.95 784.03 24.31 784.79 20.93 784.79 C18.04 784.79 15.69 784.32 13.89 783.39 L13.89 778.03 C15.76 779.39 17.95 780.07 20.44 780.07 C22.02 780.07 23.25 779.74 24.13 779.06 C25.01 778.39 25.44 777.45 25.44 776.24 C25.44 774.99 24.9 774.03 23.81 773.36 C22.73 772.68 21.23 772.34 19.33 772.34 L16.74 772.34 L16.74 767.63 L19.14 767.63 C22.79 767.63 24.61 766.42 24.61 764 C24.61 761.73 23.21 760.59 20.41 760.59 C18.53 760.59 16.72 761.19 14.94 762.41 L14.94 757.38 C16.91 756.39 19.2 755.9 21.81 755.9 Z',
    howtouse = 'M97.59 44.63 A15.1875 15.1875 -180 1 0 67.22 44.63 A15.1875 15.1875 -180 1 0 97.59 44.63 ZM60.79 79.08 L67.2 79.08 L67.2 118.03 L65.36 118.03 A9.375 9.375 -180 0 0 55.98 127.41 A9.375 9.375 -180 0 0 65.36 136.78 L99.45 136.78 A9.375 9.375 -180 0 0 108.83 127.41 A9.375 9.375 -180 0 0 99.45 118.03 L97.58 118.03 L97.58 80.17 A9.375 9.375 -180 0 0 88.23 69.47 L60.79 69.47 A4.80469 4.80469 -180 0 0 55.98 74.27 A4.80469 4.80469 -180 0 0 60.79 79.08 ZM164.81 92.94 L164.81 73.31 C164.81 -6.56 124.31 3.56 91.69 0.75 L73.12 0.75 C40.5 3.56 0 -6.56 0 73.31 L0 92.94 C2.81 125.56 -7.31 166.06 72.56 166.06 L92.25 166.06 C172.13 166.06 162 125.56 164.81 92.94 Z';
  var frameW = 950; //frame width
  var currentFrame = 0,  //initial frame to load
    frameX = currentFrame * frameW, textTitle, icon1_r, icon2_r, icon3_r, icon4_r;
  var title = 'LISA Double Access patching guide';
  var cdr3 = new CDR1500;
  cdr3.config.frame = { x: 1900, y: 0, scale: 1 }
  cdr3.config.rack = { x: 20, y: 23, scale: 0.535 }
  cdr3.config.legend = { x: 0, y: 0, scale: 1 }
  cdr3.config.numberRacks = 3
  cdr3.config.shapeName = 'cdr3'
  cdr3.config.units = [47, 1]
  cdr3.config.useMinimalPCL = true
  cdr3.config.showPoints = false
  cdr3.config.bottomPatching = true
  cdr3.config.legendVertical = true
  cdr3.config.mandrelsDown = 1
  cdr3.config.textAnnotations = { x: 20, y: 13, fontSize: '15px' }
  //loads SVG from Url, creates the group with no size and stores it in variable which can be cloned later
  function loadSVG(paper, url, callback) {
    let group = s.g().transform('matrix(0,0,0,0,0,0)');
    Snap.load(url, function (loadedFragment) {
      group.append(loadedFragment);
      if (callback !== undefined) {
        callback()
      }
    })

    return group
  }
  //when the preload is complete  
  function stopPreload() {
    setTimeout(function () {
      preLoader.remove()
      headerFrame() //decoration and wrapper
      //generate frames -svgs - here
      //frame 0 - introduction page 
      let hF = new homeFrame;
      hF.Draw();
      //frame 1 - single rack 
      let t = new CDR1500;
      t.Draw()
      //frame 2 - three racks
      cdr3.Draw()
      //frame 3 - help page
      let help = s.rect(2860, 10, 930, 730, 5).attr({ fill: 'white' }),
        helpImg = openPNG(s, './assets/CDR1500_about.png', 2865, 15, 920, 720, false);
    }, 500) //put here some time before draw starts like 1000,500
  }
  //preloader function - loads external SVG
  function preLoadSVG() {
    preLoader();
    setTimeout(function () {
      CDR1500LISA = loadSVG(s, "./assets/CDR1500LISA.svg");
      guideIcon = loadSVG(s, "./assets/guide.svg");
      principlesIcon = loadSVG(s, "./assets/principles.svg", stopPreload);
    }, 0)
  }
  //preloading image
  function preLoader() {
    preLoader = s.text(400, 300, "Loading").attr({ id: "preLoad", class: 'Legend1' });
  }
  //headerFrame - top wrapper and content svg decoration (background etc etc)
  function headerFrame() {
    let wrapper = w.group().attr({ id: "wrapperHeaderGroup" }),
      content = s.group().attr({ id: "contentGroup" }),
      rectWrapper = wrapper.rect(0, 0, 950, 105).attr({ fill: 'none' });
    textTitle = wrapper.text(40, 60, title).attr({ id: 'wrapperHeader', class: 'Legend1' });
    icon1_r = wrapper.rect(950 - 4 * 60 - 4 * 20, 22.5, 60, 60, 5).attr({ class: 'Icon-background', id: 'icon_home' });
    let icon1_l = wrapper.path(homePath).attr({ fill: '#cbdbe9' }).transform('t644,-720'),
      icon1 = wrapper.group(icon1_r, icon1_l).attr({ class: 'Icon' });
    icon2_r = wrapper.rect(950 - 3 * 60 - 3 * 20, 22.5, 60, 60, 5).attr({ class: 'Icon-background', id: 'icon_1_1200' });
    let icon2_l = wrapper.path(firstPath).attr({ fill: '#cbdbe9' }).transform('t718,-718'),
      icon2 = wrapper.group(icon2_r, icon2_l).attr({ class: 'Icon' });
    icon3_r = wrapper.rect(950 - 2 * 60 - 2 * 20, 22.5, 60, 60, 5).attr({ class: 'Icon-background', id: 'icon_3_1200' });
    let icon3_l = wrapper.path(threePath).attr({ fill: '#cbdbe9' }).transform('t798,-718'),
      icon3 = wrapper.group(icon3_r, icon3_l).attr({ class: 'Icon' });
    icon4_r = wrapper.rect(950 - 1 * 60 - 1 * 20, 22.5, 60, 60, 5).attr({ class: 'Icon-background', id: 'icon_question' });
    let icon4_l = wrapper.path(questionPath).attr({ fill: '#cbdbe9' }).transform('t892,-725'),
      icon4 = wrapper.group(icon4_r, icon4_l).attr({ class: 'Icon' });
    // rectIntro = content.rect(0,0,4*950,185).attr({class:'bg_blue_top'});
    changeFrame(currentFrame)

    //TODO. add title effects when the icon is hovered with cursor

    //add click function
    function addClickHandler(element, currFrame, orient) {
      element.click(function () {
        Snap.animate(frameX, currFrame * frameW, function (val) {
          s.attr({ viewBox: val + ' 0 950 1200' })
        }, 500)
        currentFrame = currFrame
        checkCurrFrame()
        frameX = currFrame * frameW
        if (orient === 'portrait') {
          template.obj.rotatePortrait()
        }
        else if (orient === 'landscape') {
          template.obj.rotateLandscape()
        }
        DeleteEl(l, '#legend')
      });

    };
    addClickHandler(icon1, 0, 'portrait');
    addClickHandler(icon2, 1, 'portrait');
    addClickHandler(icon3, 2, 'landscape');
    addClickHandler(icon4, 3, 'portrait');
  };
  //change the viewbox so that the selected frame is visible
  function changeFrame(frame) {
    currentFrame = frame
    s.attr({ viewBox: (frame * frameW) + ' 0 ' + frameW + ' 1200' });
    checkCurrFrame();
  }
  //checks what is the current frame - selected and changes the color of it if selected
  function checkCurrFrame() {
    if (currentFrame === 0) {
      icon1_r.attr({ class: 'Icon-selected' });
      textTitle.attr({ text: title })
    } else { icon1_r.attr({ class: 'Icon-background' }) }
    if (currentFrame === 1) {
      icon2_r.attr({ class: 'Icon-selected' });
      textTitle.attr({ text: 'Single rack' })
    } else { icon2_r.attr({ class: 'Icon-background' }) }
    if (currentFrame === 2) {
      icon3_r.attr({ class: 'Icon-selected' });
      textTitle.attr({ text: 'Three side-by-side racks' })
    } else { icon3_r.attr({ class: 'Icon-background' }) }
    if (currentFrame === 3) {
      icon4_r.attr({ class: 'Icon-selected' })
      textTitle.attr({ text: 'Help' })
    } else { icon4_r.attr({ class: 'Icon-background' }) }
  }
  //run the script
  preLoadSVG();

  //CDR1500 object
  function CDR1500() {
    const colors = ['#009a82', '#65b8a5', '#a9d6ca', '#deefea', '#009a82', '#65b8a5', '#a9d6ca', '#deefea'];
    const recPCL = { //these are recommended lengths
      L1L1: 3.5, L1R1: 3.5, L1L2: 8.5, L1R2: 8.5, L1L3: 10, L1R3: 10,
      R1L1: 3.5, R1R1: 3.5, R1L2: 8.5, R1R2: 8.5, R1L3: 10, R1R3: 10,
      L2L1: 8.5, L2R1: 8.5, L2L2: 3.5, L2R2: 3.5, L2L3: 8.5, L2R3: 8.5,
      R2L1: 8.5, R2R1: 8.5, R2L2: 3.5, R2R2: 3.5, R2L3: 8.5, R2R3: 8.5,
      L3L1: 10, L3R1: 10, L3L2: 8.5, L3R2: 8.5, L3L3: 3.5, L3R3: 3.5,
      R3L1: 10, R3R1: 10, R3L2: 8.5, R3R2: 8.5, R3L3: 3.5, R3R3: 3.5
    }
    this.PCstate = {
      _endAsection: 'L',
      _rackA: '1', //which rack is the first end
      _endA: '1', //the first selected rectangle
      _endBsection: 'R',
      _rackB: '1', //which rack is the second end
      _endB: '2', //the second selected rectangle
      pressed: 1, //times pressed
      allPaths: {}, //all possible paths
      recPCLNames: [], //array with id's of paths with recommended lengths
      recPC: 0 //recommended PC length
    };
    this.config = {
      shapeName: 'frame2',
      frame: { x: 950, y: 0, scale: 1 },//position of main group (left top corner) and it's scale
      rack: { x: 50, y: 40, scale: 1.25 }, //position of rack (left top corner) and it's scale
      legend: { x: 0, y: 0, scale: 1 }, //position of legend (left top corner) and it's scale
      legendVertical: true,//true - to build the legend in vertical, false - in horizontal
      points: {}, //plot points - calculated by the code
      showPoints: false, //show plot points
      scaleFactor: 0, //scale factor for converting pixels to metric (millimiter) - calculated by the code
      showScaleFactorLine: false, //this line is used to determine the scale factor
      units: [47, 1],//first unit and last unit,numbering starts from top, inclusive
      heightU: 16.85, //height of 1U in pixels (when scale 1:1)
      mS: 66.85,      //height between one mandrel in pixels
      mandrelsDown: 2, //determines of how many mandrels down from the unit position to check
      visAllPaths: 0, //visibility of all possible paths - from 0 to 1
      extraLength: 2 * 490 + 2 * 150, //two times 490mm is taken to compensate the length which is required to go through insides of chassis and 2 times 150 to compensate depth of a rack
      roundCorners: true, //to round corners or keep straight angles
      useMinimalPCL: false, //to check for the minimum possible patch cord length
      numberRacks: 1, //number of racks
      bottomPatching: false, //when bottom patching is selected, than 4 low rack units are not used
      textAnnotations: { x: 40, y: 25, fontSize: '25px' } //text annotation, position and text height
    }
    let obj = this;
    //start of draw function  
    this.Draw = function () {
      //these vars keep groups where to add other graphic elements
      var g, leg, g1, g2, g3, g4, g5, l1;

      let createFrame = function () {
        g1 = s.group(); // stores background, frame and other info
        g2 = s.group().attr({ id: 'rack-' + obj.config.shapeName }).transform('matrix(1,0,0,1,' + obj.config.rack.x + ',' + obj.config.rack.y + ')'); // stores rack
        g3 = s.group().attr({ id: 'rackrectangles-' + obj.config.shapeName }).transform('t' + obj.config.rack.x + ',' + obj.config.rack.y + ' s' + obj.config.rack.scale); // stores rack rectangles
        g4 = s.group().attr({ id: 'patchleadsGr-' + obj.config.shapeName }).transform('matrix(' + obj.config.rack.scale + ',0,0,' + obj.config.rack.scale + ',' + obj.config.rack.x + ',' + obj.config.rack.y + ')') //.transform('t660,123'); //stores patchcords
        g5 = s.group().attr({ id: 'points-' + obj.config.shapeName }).transform('matrix(' + obj.config.rack.scale + ',0,0,' + obj.config.rack.scale + ',' + obj.config.rack.x + ',' + obj.config.rack.y + ')') //.transform('t660,123'); //temporary points
        //l1 = l.group().attr({id:'legendGr-'+obj.config.shapeName}) //legend    
        g = s.group(g1, g2, g3, g4, g5)
          .attr({ id: obj.config.shapeName, transform: 'matrix(' + obj.config.frame.scale + ',0,0,' + obj.config.frame.scale + ',' + obj.config.frame.x + ',' + obj.config.frame.y + ')' }); //group everything
        // Text instructions
        g.text(obj.config.textAnnotations.x, obj.config.textAnnotations.y, "Select first and second sequentially rack unit by green rectangles.")
          .attr({ class: "Legend2", fontSize: obj.config.textAnnotations.fontSize });
      },//module creating structure of the frame   
        addRacks = function () {
          // RACK - load rack CDR1500 svg image
          for (let i = 1; i <= obj.config.numberRacks; i++) {
            let cdr = CDR1500LISA.clone().transform('matrix(' + obj.config.rack.scale + ',0,0,' + obj.config.rack.scale + ',' + 567 * (i - 1) * obj.config.rack.scale + ',0)');
            g2.append(cdr);
          }
        },//module adding racks
        addRectangles = function () {
          let heightU = obj.config.heightU, x1, x2, //x1=25,x2=351,
            y = 815,
            w = 186,
            show = 0.8;
          //in case of bottom patching
          if (obj.config.bottomPatching && obj.config.units[1] <= 4) { obj.config.units[1] = 5 }
          //show rectangle and add event handler based on config
          for (let q = 1; q <= obj.config.numberRacks; q++) {
            x1 = 25 + 567 * (q - 1)
            x2 = 351 + 567 * (q - 1)
            for (let i = 47; i >= 1; i--) {
              if (i <= 48 - obj.config.units[1] && i >= 48 - obj.config.units[0]) { show = 0.8 } else { show = 0 }
              let rect = g3.rect(x1, y - (47 - i) * heightU, w, heightU, 3).attr({ id: obj.config.shapeName + '-unit-L' + q + '_' + (48 - i), fill: colors[1], stroke: "white", opacity: show, cursor: (show !== 0) ? ('pointer') : ('default') });
              g3.text(
                x1 + 5,
                y + 14 - (47 - i) * heightU,
                (obj.config.numberRacks === 1) ? ('L' + (48 - i)) : ("L" + q + '_' + (48 - i))
              ).attr({ class: "Legend3", fontSize: '14px', opacity: show })
              let rect2 = g3.rect(x2, y - (47 - i) * heightU, w, heightU, 3).attr({ id: obj.config.shapeName + '-unit-R' + q + '_' + (48 - i), fill: colors[1], stroke: "white", opacity: show, cursor: (show !== 0) ? ('pointer') : ('default') });
              g3.text(
                x2 + 140,
                y + 14 - (47 - i) * heightU,
                (obj.config.numberRacks === 1) ? ('R' + (48 - i)) : ("R" + q + '_' + (48 - i))
              ).attr({ class: "Legend3", fontSize: '14px', opacity: show })
              rect.click(function (event) {
                setChassis(event.srcElement.id.slice(obj.config.shapeName.length + 6));
              });
              rect2.click(function (event) {
                setChassis(event.srcElement.id.slice(obj.config.shapeName.length + 6));
              });
              rect.append(Snap.parse('<title>Unit ' + (48 - i) + ' left, rack ' + q + '</title>'));
              rect2.append(Snap.parse('<title>Unit ' + (48 - i) + ' right, rack ' + q + '</title>'));

            };
          }
        }, //module adding rectangles - chassis that are clickable
        plotPoints = function () {
          let rM = 315, mS = obj.config.mS, heightU = obj.config.heightU; //mS - mandrel step, sM - shift in the middle (after 5th chassis), rM - rack middle
          let dots = {}, shiftR;
          for (let q = 1; q <= obj.config.numberRacks; q++) {
            shiftR = 567 * (q - 1)
            for (let i = 1; i <= 47; i++) {
              //dots left and right side - right after the chassis
              dots['L' + q + '_' + (48 - i) + '-0'] = [194 + shiftR, 32 + heightU * i]
              dots['L' + q + '_' + (48 - i)] = [214 + shiftR, 32 + heightU * i]
              dots['R' + q + '_' + (48 - i) + '-0'] = [372 + shiftR, 32 + heightU * i]
              dots['R' + q + '_' + (48 - i)] = [352 + shiftR, 32 + heightU * i]
            }
            for (let i = 0; i < 10; i++) {
              //left and right mandrels, not middle
              dots['L' + q + '_' + (10 - i) + '-1'] = [223 + shiftR, 180 + mS * i]
              dots['L' + q + '_' + (10 - i) + '-2'] = [250 + shiftR, 180 + mS * i]
              dots['R' + q + '_' + (10 - i) + '-2'] = [293 + shiftR, 180 + mS * i]
              dots['R' + q + '_' + (10 - i) + '-1'] = [320 + shiftR, 180 + mS * i]
            }
            for (let i = 0; i < 10; i++) {
              dots['M' + q + '_' + (10 - i) + '-L'] = [257 + shiftR, 95 + mS * i]
              dots['M' + q + '_' + (10 - i) + '-LD'] = [257 + shiftR, 130 + mS * i]
              dots['M' + q + '_' + (10 - i) + '-R'] = [286 + shiftR, 95 + mS * i]
              dots['M' + q + '_' + (10 - i) + '-RD'] = [286 + shiftR, 130 + mS * i]
            }
            //two lowest points of last mandrel
            dots['MB-L' + q] = [257 + shiftR, 820]
            dots['MB-R' + q] = [286 + shiftR, 820]
            //
            for (let i = 0; i < 10; i = i + 3) {
              dots['L' + q + '_' + (10 - i) + '-3'] = [223 + shiftR, 125 + mS * i]
              dots['L' + q + '_' + (10 - i) + '-4'] = [250 + shiftR, 125 + mS * i]
              dots['R' + q + '_' + (10 - i) + '-4'] = [293 + shiftR, 125 + mS * i]
              dots['R' + q + '_' + (10 - i) + '-3'] = [320 + shiftR, 125 + mS * i]
            }
          }
          if (obj.config.showPoints) {
            for (let property in dots) {
              g5.circle(dots[property][0], dots[property][1], 5).attr({ fill: "green" });
              g5.text(dots[property][0] + 2, dots[property][1] - 2, property).attr({ fill: "white", fontSize: '8px' });
            }
          }
          obj.config.points = dots
        }, //builds points which are used to build paths
        determineScaleFactor = function () {
          let path1500 = g4.path().attr({ d: 'M 0 40 L 570 40', stroke: 'green', id: 'determineScaleFactor', strokeWidth: '5px' }),
            scaleF = 1500 / path1500.getTotalLength(),
            vis = obj.config.showScaleFactorLine;
          if (!vis || vis === undefined) {
            path1500.remove()
          }
          obj.config.scaleFactor = scaleF

        } //this function draws a path which should be equal to one of known dimensions - to calculate the scale factor
      //run modules
      createFrame()
      addRacks()
      addRectangles()
      plotPoints()
      determineScaleFactor()
      //event related functions
      function setChassis(num) {
        switch (obj.PCstate.pressed) {
          //TODO.only on initial load
          case 0:
            obj.PCstate.pressed = 1;
            obj.PCstate._endA = num;
            obj.PCstate._endB = num;
            break;
          //means the new selection process started and the first element was clicked
          case 1:
            obj.PCstate.pressed = 2;
            //deletes the legend and patch lead from the preivous selection
            DeleteEl(l, "#legend");
            DeleteEl(s, "#patchleads-" + obj.config.shapeName);
            //renew the color of rectangles - turn back colors
            s.select("#" + obj.config.shapeName + "-unit-" + obj.PCstate._endAsection + obj.PCstate._rackA + '_' + obj.PCstate._endA).attr({ fill: colors[1] })
            s.select("#" + obj.config.shapeName + "-unit-" + obj.PCstate._endBsection + obj.PCstate._rackB + '_' + obj.PCstate._endB).attr({ fill: colors[1] })
            obj.PCstate._endA = num.substr(3)
            obj.PCstate._rackA = num.substr(1, 1)
            obj.PCstate._endAsection = num.substr(0, 1)
            //the unit which was clicked takes green color
            s.select("#" + obj.config.shapeName + "-unit-" + num).attr({ fill: colors[2] })
            break;
          //means the second element clicked
          case 2:
            obj.PCstate._endB = num.substr(3);
            obj.PCstate._rackB = num.substr(1, 1)
            obj.PCstate._endBsection = num.substr(0, 1)
            obj.PCstate.pressed = 1;
            s.select("#" + obj.config.shapeName + "-unit-" + num).attr({ fill: colors[2] })
            drawAllPaths();
            addLegend()
            break;
        };
      } //fires when the chassis is clicked
      function drawAllPaths() {
        let a = obj.PCstate._endAsection, //a - first selected side
          b = obj.PCstate._endBsection, //b - second selected side
          aa = Number(obj.PCstate._endA), //aa - number of first selected chassis
          bb = Number(obj.PCstate._endB), //bb - number of first selected chassis
          A = Number(obj.PCstate._rackA),
          B = Number(obj.PCstate._rackB),
          objPaths = {};
        //define begin and end starting dots
        let startPath = [a + A + '_' + aa + '-0', a + A + '_' + aa],
          endPath = [b + B + '_' + bb, b + B + '_' + bb + '-0'];
        //mL - first mandrel down for unit aa
        //mM - first mandrel down for unit bb
        //mR - first mandrel up for unit aa and bb
        let pathArr = [], mL, mM, mR;

        function findLowerMandrel(u) {
          if (u <= 47 && u >= 40) { return 10 }
          else if (u < 40 && u >= 36) { return 9 }
          else if (u < 36 && u >= 33) { return 8 }
          else if (u < 33 && u >= 28) { return 7 }
          else if (u < 28 && u >= 24) { return 6 }
          else if (u < 24 && u >= 21) { return 5 }
          else if (u < 21 && u >= 16) { return 4 }
          else if (u < 16 && u >= 13) { return 3 }
          else if (u < 13 && u >= 9) { return 2 }
          else if (u < 9 && u >= 5) { return 1 }
        }
        function findUpperMiddleMandrel(A, B) {
          return Math.max(A, B)
        }

        //within one rack
        if (A === B) {
          //when both are higher 5th unit
          if (aa >= 5 && bb >= 5) {
            for (let i = findLowerMandrel(aa); i >= ((findLowerMandrel(aa) - obj.config.mandrelsDown <= 0) ? 1 : (findLowerMandrel(aa) - obj.config.mandrelsDown)); i--) {
              for (let j = findLowerMandrel(bb); j >= ((findLowerMandrel(bb) - obj.config.mandrelsDown <= 0) ? 1 : (findLowerMandrel(bb) - obj.config.mandrelsDown)); j--) {
                for (let z = findUpperMiddleMandrel(i, j); z <= 10; z++) {
                  if ((i >= j && aa >= bb && a === 'L' && b === 'L') || (i >= j && aa >= bb && a === 'L' && b === 'R') || (i <= j && aa <= bb && a === 'R' && b === 'R') || (i <= j && aa <= bb && a === 'L' && b === 'R')) {
                    objPaths[obj.config.shapeName + 'p' + i + '-' + z + '-' + j] = {}
                    //passing from left to right
                    objPaths[obj.config.shapeName + 'p' + i + '-' + z + '-' + j].path = concatDots(startPath, [a + A + '_' + i + '-1', a + A + '_' + i + '-2', 'M' + A + '_' + i + '-LD', 'M' + A + '_' + z + '-L', 'M' + A + '_' + z + '-R', 'M' + A + '_' + j + '-RD', b + A + '_' + j + '-2', b + A + '_' + j + '-1'], endPath)
                    objPaths[obj.config.shapeName + 'p' + i + '-' + z + '-' + j].code = a + i + '-' + z + '-' + j + b
                  } else if ((i <= j && aa <= bb && a === 'L' && a === 'L') || (i <= j && aa <= bb && a === 'R' && b === 'L') || (i >= j && aa >= bb && a === 'R' && b === 'R') || (i >= j && aa >= bb && a === 'R' && b === 'L')) {
                    objPaths[obj.config.shapeName + 'p' + i + '-' + z + '-' + j] = {}
                    //passing from right to left
                    objPaths[obj.config.shapeName + 'p' + i + '-' + z + '-' + j].path = concatDots(startPath, [a + A + '_' + i + '-1', a + A + '_' + i + '-2', 'M' + A + '_' + i + '-RD', 'M' + A + '_' + z + '-R', 'M' + A + '_' + z + '-L', 'M' + A + '_' + j + '-LD', b + A + '_' + j + '-2', b + A + '_' + j + '-1'], endPath)
                    objPaths[obj.config.shapeName + 'p' + i + '-' + z + '-' + j].code = a + i + '-' + z + '-' + j + b
                  }
                }
              }
            }
          }
          //if both are below 5th and different sides
          else if (aa < 5 && bb < 5 && a !== b) {
            for (let i = 1; i <= 10; i = i + 3) {
              for (let j = 1; j <= 10; j = j + 3) {
                objPaths[obj.config.shapeName + 'p' + i + '-' + 'B' + '-' + j] = {}
                //passing from left to right
                objPaths[obj.config.shapeName + 'p' + i + '-' + 'B' + '-' + j].path = concatDots(startPath, [
                  a + A + '_' + i + '-3',
                  a + A + '_' + i + '-4',
                  ((a === 'L') ? ('MB-L') : ('MB-R')) + A,
                  ((a === 'L') ? ('MB-R') : ('MB-L')) + A,
                  b + A + '_' + j + '-4',
                  b + A + '_' + j + '-3'
                ], endPath)
                objPaths[obj.config.shapeName + 'p' + i + '-' + 'B' + '-' + j].code = a + i + '-B-' + j + b
              }
            }
          }
          //if both are below 5th and same sides
          else if (aa < 5 && bb < 5 && a === b) {
            for (let z = 1; z <= 10; z++) {
              objPaths[obj.config.shapeName + 'p' + 1 + '-' + z + '-' + 1] = {}
              objPaths[obj.config.shapeName + 'p' + 1 + '-' + z + '-' + 1].path = concatDots(startPath, [
                a + A + '_' + 1 + '-3',
                a + A + '_' + 1 + '-4',
                ((a === 'L') ? ('MB-L') : ('MB-R')) + A,
                ((a === 'L') ? ('MB-R') : ('MB-L')) + A,
                'M' + A + ((a === 'L') ? ('_1-LD') : ('_1-RD')),
                'M' + A + '_' + z + ((a === 'L') ? ('-L') : ('-R')),
                'M' + A + '_' + z + ((a === 'L') ? ('-R') : ('-L')),
                'M' + A + ((a === 'L') ? ('_1-RD') : ('_1-LD')),
                ((a === 'L') ? ('MB-R') : ('MB-L')) + A,
                ((a === 'L') ? ('MB-L') : ('MB-R')) + A,
                b + A + '_' + 1 + '-4',
                b + A + '_' + 1 + '-3'
              ], endPath)
              objPaths[obj.config.shapeName + 'p' + 1 + '-' + z + '-' + 1].code = a + 1 + '-B-' + z + '-B-' + 1 + b
            }
          }
          //if first is below 5th and same sides
          else if (aa < 5 && bb >= 5 && a === b) {
            for (let i = findLowerMandrel(bb); i >= ((findLowerMandrel(bb) - obj.config.mandrelsDown <= 0) ? 1 : (findLowerMandrel(bb) - obj.config.mandrelsDown)); i--) {
              for (let z = i; z <= 10; z++) {
                objPaths[obj.config.shapeName + 'p' + 1 + '-' + z + '-' + i] = {}
                //passing from left to right
                objPaths[obj.config.shapeName + 'p' + 1 + '-' + z + '-' + i].path = concatDots(startPath, [
                  a + A + '_1-3',
                  a + A + '_1-4',
                  ((a === 'L') ? ('MB-L') : ('MB-R')) + A,
                  ((a === 'L') ? ('MB-R') : ('MB-L')) + A,
                  'M' + A + '_' + z + ((a === 'L') ? ('-R') : ('-L')),
                  'M' + A + '_' + z + ((a === 'L') ? ('-L') : ('-R')),
                  b + A + '_' + i + '-2',
                  b + A + '_' + i + '-1'
                ], endPath)
                objPaths[obj.config.shapeName + 'p' + 1 + '-' + z + '-' + i].code = a + 1 + '-B-' + z + '-' + i + b
              }
            }
          }
          //if second is below 5th and same sides
          else if (aa >= 5 && bb < 5 && a === b) {
            for (let i = findLowerMandrel(aa); i >= ((findLowerMandrel(aa) - obj.config.mandrelsDown <= 0) ? 1 : (findLowerMandrel(aa) - obj.config.mandrelsDown)); i--) {
              for (let z = i; z <= 10; z++) {
                objPaths[obj.config.shapeName + 'p' + i + '-' + z + '-' + 1] = {}
                //passing from left to right
                objPaths[obj.config.shapeName + 'p' + i + '-' + z + '-' + 1].path = concatDots(startPath, [
                  a + A + '_' + i + '-1',
                  a + A + '_' + i + '-2',
                  'M' + A + '_' + z + ((a === 'L') ? ('-L') : ('-R')),
                  'M' + A + '_' + z + ((a === 'L') ? ('-R') : ('-L')),
                  ((a === 'L') ? ('MB-R') : ('MB-L')) + A,
                  ((a === 'L') ? ('MB-L') : ('MB-R')) + A,
                  b + A + '_1-4',
                  b + A + '_1-3'
                ], endPath)
                objPaths[obj.config.shapeName + 'p' + i + '-' + z + '-' + 1].code = a + i + '-' + z + '-B-' + 1 + b
              }
            }
          }
          //from left to right, left side below 5 unit
          else if (aa < 5 && a === 'L' && b === 'R') {
            for (let i = 1; i <= 10; i = i + 3) {
              for (let j = findLowerMandrel(bb); j >= ((findLowerMandrel(bb) - obj.config.mandrelsDown <= 0) ? 1 : (findLowerMandrel(bb) - obj.config.mandrelsDown)); j--) {
                for (let z = findUpperMiddleMandrel(i, j); z <= 10; z++) {
                  objPaths[obj.config.shapeName + 'p' + i + '-' + z + '-' + j] = {}
                  objPaths[obj.config.shapeName + 'p' + i + '-' + z + '-' + j].path = concatDots(startPath, [
                    a + A + '_' + i + '-3',
                    a + A + '_' + i + '-4',
                    'MB-L' + A,
                    'MB-R' + A,
                    'M' + A + '_1-LD',
                    'M' + A + '_' + z + '-L',
                    'M' + A + '_' + z + '-R',
                    'M' + A + '_' + j + '-RD',
                    b + A + '_' + j + '-2',
                    b + A + '_' + j + '-1'
                  ], endPath)
                  objPaths[obj.config.shapeName + 'p' + i + '-' + z + '-' + j].code = a + i + '-B-' + z + '-' + j + b
                }
              }
            }
          }
          //from right to left, right side below 5 unit
          else if (aa < 5 && a === 'R' && b === 'L') {
            for (let i = 1; i <= 10; i = i + 3) {
              for (let j = findLowerMandrel(bb); j >= ((findLowerMandrel(bb) - obj.config.mandrelsDown <= 0) ? 1 : (findLowerMandrel(bb) - obj.config.mandrelsDown)); j--) {
                for (let z = findUpperMiddleMandrel(i, j); z <= 10; z++) {
                  objPaths[obj.config.shapeName + 'p' + i + '-' + z + '-' + j] = {}
                  objPaths[obj.config.shapeName + 'p' + i + '-' + z + '-' + j].path = concatDots(startPath, [a + A + '_' + i + '-3', a + A + '_' + i + '-4', 'MB-R' + A, 'MB-L' + A, 'M' + A + '_1-RD', 'M' + A + '_' + z + '-R', 'M' + A + '_' + z + '-L', 'M' + A + '_' + j + '-LD', b + A + '_' + j + '-2', b + A + '_' + j + '-1'], endPath)
                  objPaths[obj.config.shapeName + 'p' + i + '-' + z + '-' + j].code = a + i + '-B-' + z + '-' + j + b
                }
              }
            }
          }
          //from right to left, left side below 5 unit
          else if (bb < 5 && a === 'R' && b === 'L') {
            for (let i = findLowerMandrel(aa); i >= ((findLowerMandrel(aa) - obj.config.mandrelsDown <= 0) ? 1 : (findLowerMandrel(aa) - obj.config.mandrelsDown)); i--) {
              for (let j = 1; j <= 10; j = j + 3) {
                for (let z = findUpperMiddleMandrel(i, j); z <= 10; z++) {
                  objPaths[obj.config.shapeName + 'p' + i + '-' + z + '-' + j] = {}
                  objPaths[obj.config.shapeName + 'p' + i + '-' + z + '-' + j].path = concatDots(startPath, [a + A + '_' + i + '-1', a + A + '_' + i + '-2', 'M' + A + '_' + i + '-RD', 'M' + A + '_' + z + '-R', 'M' + A + '_' + z + '-L', 'M' + A + '_1-LD', 'MB-R' + A, 'MB-L' + A, b + A + '_' + j + '-4', b + A + '_' + j + '-3'], endPath)
                  objPaths[obj.config.shapeName + 'p' + i + '-' + z + '-' + j].code = a + i + '-' + z + '-B-' + j + b
                }
              }
            }
          }
          //from left to right, right side below 5 unit      
          else if (bb < 5 && a === 'L' && b === 'R') {
            for (let i = findLowerMandrel(aa); i >= ((findLowerMandrel(aa) - obj.config.mandrelsDown <= 0) ? 1 : (findLowerMandrel(aa) - obj.config.mandrelsDown)); i--) {
              for (let j = 1; j <= 10; j = j + 3) {
                for (let z = findUpperMiddleMandrel(i, j); z <= 10; z++) {
                  objPaths[obj.config.shapeName + 'p' + i + '-' + z + '-' + j] = {}
                  objPaths[obj.config.shapeName + 'p' + i + '-' + z + '-' + j].path = concatDots(startPath, [a + A + '_' + i + '-1', a + A + '_' + i + '-2', 'M' + A + '_' + z + '-LD', 'M' + A + '_' + z + '-L', 'M' + A + '_' + z + '-R', 'M' + A + '_1-RD', 'MB-L' + A, 'MB-R' + A, b + A + '_' + j + '-4', b + A + '_' + j + '-3'], endPath)
                  objPaths[obj.config.shapeName + 'p' + i + '-' + z + '-' + j].code = a + i + '-' + z + '-B-' + j + b
                }
              }
            }
          }
          else {
            console.warn('[Error] There was a combination that is not considered inside same rack')
          }
        }
        //within different racks
        else {
          //in case of bottom patching
          if (obj.config.bottomPatching) {
            //first mandrel side A
            for (let i = findLowerMandrel(aa); i >= ((findLowerMandrel(aa) - obj.config.mandrelsDown <= 0) ? 1 : (findLowerMandrel(aa) - obj.config.mandrelsDown)); i--) {
              //second mandrel middle side A 
              for (let ii = i; ii <= 10; ii++) {
                //first mandrel side B
                for (let j = findLowerMandrel(bb); j >= ((findLowerMandrel(bb) - obj.config.mandrelsDown <= 0) ? 1 : (findLowerMandrel(bb) - obj.config.mandrelsDown)); j--) {
                  //second mandrel middle side B 
                  for (let jj = j; jj <= 10; jj++) {
                    objPaths[obj.config.shapeName + 'p' + i + '-' + ii + '-' + j + '-' + jj] = {}
                    objPaths[obj.config.shapeName + 'p' + i + '-' + ii + '-' + j + '-' + jj].path = concatDots(startPath, [
                      a + A + '_' + i + '-1',
                      a + A + '_' + i + '-2',
                      'M' + A + '_' + ii + ((a === 'L') ? ('-L') : ('-R')),
                      'M' + A + '_' + ii + ((a === 'L') ? ('-R') : ('-L')),
                      'M' + A + '_' + 1 + ((a === 'L') ? ('-R') : ('-L')) + 'D',
                      (A < B) ? ('MB-L' + A) : ('MB-R' + A),
                      (A < B) ? ('MB-R' + B) : ('MB-L' + B),
                      'M' + B + '_' + 1 + ((b === 'L') ? ('-R') : ('-L')) + 'D',
                      'M' + B + '_' + jj + ((b === 'L') ? ('-R') : ('-L')),
                      'M' + B + '_' + jj + ((b === 'L') ? ('-L') : ('-R')),
                      b + B + '_' + j + '-2',
                      b + B + '_' + j + '-1'
                    ], endPath)
                    objPaths[obj.config.shapeName + 'p' + i + '-' + ii + '-' + j + '-' + jj].code = i + '-' + ii + '-B-' + jj + '-' + j
                  }
                }
              }
            }
          }

        }
        //draw every path 
        let g44 = g4.group().attr({ id: 'patchleads-' + obj.config.shapeName })
        //pre-draw all possible patching options
        for (let key in objPaths) {
          if (objPaths[key].path !== undefined) {
            let path = convertDots(objPaths[key].path, obj.config.points);
            objPaths[key].length = {}; objPaths[key].pc = {};
            objPaths[key].length = drawPath(path, key, g44, obj.config.visAllPaths, obj.config.scaleFactor, obj.config.extraLength, obj.config.roundCorners)
            // after obtaining the physical length - determines the patch cord length
            objPaths[key].pc = calculatePCLength(objPaths[key].length)
            objPaths[key].pcM = objPaths[key].pc / 1000 //length in meter
          }
        }
        obj.PCstate.allPaths = objPaths
      } //fires when two chassis are selected
      function addLegend() {
        //TODO - if there are no paths in the obj, then no legend to show

        let gr = l.g()
          .attr({ id: 'legend' })
          .transform('t' + obj.config.legend.x + ',' + obj.config.legend.y + 's' + obj.config.legend.scale), //stores all graphic of legend, deleted every time after new select
          graphicStatic = function () {
            //grey frame around the legend
            gr.rect(0, 0,
              (obj.config.legendVertical) ? (135) : (800),//width
              (obj.config.legendVertical) ? (750) : (135)//height
              , 5)
              .attr({ fill: 'lightgrey', opacity: 0.3, stroke: 'grey' })
            //left and right rectangles
            gr.rect(20, 10, 90, 60, 5).attr({ fill: colors[1], stroke: "white" })
            gr.text(30, 50,
              (obj.config.numberRacks === 1) ? (obj.PCstate._endAsection + obj.PCstate._endA) : (obj.PCstate._endAsection + obj.PCstate._rackA + '_' + obj.PCstate._endA)
            ).attr({ class: "Legend2" })
            //arrow symbol
            gr.polygon(0, 0, 20, 20, 40, 0, 40, 20, 20, 40, 0, 20, 0, 0).attr({
              transform: 'matrix(1,0,0,1,45,75)', fill: 'grey'
            })
            gr.rect(20, 120, 90, 60, 5).attr({ fill: colors[1], stroke: "white" })
            gr.text(30, 160,
              (obj.config.numberRacks === 1) ? (obj.PCstate._endBsection + obj.PCstate._endB) : (obj.PCstate._endBsection + obj.PCstate._rackB + '_' + obj.PCstate._endB)
            ).attr({ class: "Legend2" })
            gr.polygon(0, 0, 20, 20, 40, 0, 40, 20, 20, 40, 0, 20, 0, 0).attr({
              transform: 'matrix(1,0,0,1,45,185)', fill: 'grey'
            })
            //text
            gr.text(
              (obj.config.legendVertical) ? (20) : (350),
              (obj.config.legendVertical) ? (240) : (30),
              ((obj.config.useMinimalPCL) ? ('Shortest') : ('Recommended'))
            ).attr({ class: "Legend1", fontSize: '12px' })

          }, //some static graphic elements
          determineRecommended = function () {
            if (!obj.config.useMinimalPCL) {
              //if it is configured to check the recommended patch cord length
              let A = obj.PCstate._endAsection + obj.PCstate._rackA,
                B = obj.PCstate._endBsection + obj.PCstate._rackB;
              let recPClen;
              if (recPCL[A + B] === undefined) {
                console.warn((A + B) + ' recommended length not determined')
              }
              else {
                obj.PCstate.recPC = recPCL[A + B]
              }
            }
            //if it is configured to check the minimum length
            else {
              let min = 0;
              for (let key in obj.PCstate.allPaths) {
                if (min >= obj.PCstate.allPaths[key].pcM) {
                  min = obj.PCstate.allPaths[key].pcM
                }
              }
              obj.PCstate.recPC = min
            }
          }, //determines what is the recommended patch cord length for given combination
          checkRecommended = function () {
            //go through the list of obtained patch cord length and find first cord with matching recommended length
            let findRecLengthKey = function (value) {
              obj.PCstate.recPCLNames = []
              for (let key in obj.PCstate.allPaths) {
                if (obj.PCstate.allPaths[key].path !== undefined && obj.PCstate.allPaths[key].pcM === value) {
                  obj.PCstate.recPCLNames.push(key)//remember the patch cord and it's length
                }
              }
            }
            //shows first recommended patch cord
            findRecLengthKey(obj.PCstate.recPC);
            let foundRecommended = true;
            //if first recomended patch cord length not found - adds 0.5 meter and checks after
            if (obj.PCstate.recPCLNames.length === 0) {
              let i = 1, currLen = obj.PCstate.recPC;
              while (obj.PCstate.recPCLNames.length === 0) {
                obj.PCstate.recPC = currLen + 0.5 * i
                findRecLengthKey(obj.PCstate.recPC)
                i++
                if (obj.PCstate.recPC === 20 || i === 100) { foundRecommended = false; break } //after 20 meter patch cord stop execution
              }
            }
            if (foundRecommended) {
              gr.text(
                (obj.config.legendVertical) ? (2) : (350),
                (obj.config.legendVertical) ? (270) : (60),
                obj.PCstate.recPC + ' meter'
              ).attr({ class: "Legend1" })
            } else {
              gr.text(
                (obj.config.legendVertical) ? (25) : (350),
                (obj.config.legendVertical) ? (270) : (60),
                '[error!]'
              ).attr({ class: "Legend1", fontSize: '16px' })
            }
          }, //checks whether recommended patch cord is available - if not, checks next one and so on
          showRecommended = function () {
            let animatePath = function (event, strong, key) {
              let clRect, animP;
              if (!strong || strong === undefined) {
                clRect = event.srcElement.id
              }
              else {
                clRect = event
              }
              animP = clRect.slice(9)
              //remove click events from all rect before the animation and hide other paths
              for (let key in obj.PCstate.recPCLNames) {
                if (key > 7) { break }  //cycle limited to 8
                l.select('#animRect-' + obj.PCstate.recPCLNames[key]).attr({ cursor: 'default', stroke: 'none', opacity: 0.8 }).unclick()
                s.select("#" + obj.PCstate.recPCLNames[key]).attr({ opacity: 0 })

              }
              //animate path
              let el = s.select("#" + animP),
                elLength = el.getTotalLength();
              l.select('#' + clRect).attr({ stroke: 'white', opacity: 1 })

              el.attr({ opacity: 1, stroke: colors[key], strokeWidth: (4), 'stroke-dasharray': elLength + ' ' + elLength, strokeDashoffset: elLength });
              el.animate({ strokeDashoffset: 0 }, 1000, mina.linear,
                //callback - once finished add events again and change cursor
                function () {
                  for (let key in obj.PCstate.recPCLNames) {
                    if (key > 7) { break }
                    let currRect = l.select('#animRect-' + obj.PCstate.recPCLNames[key])
                    if (currRect !== null) {
                      currRect.attr({ cursor: 'pointer' })
                      currRect.click(function (event) { animatePath(event, false, key) })
                    } else {
                      console.warn('[Bug?!]Couldnt select rectangle - TODO')
                    }
                  }
                }
              )


            } //animation function when clicking rectangles, strong (true/false) - when the rectangle name is strongly provided 

            let xxx = (obj.config.legendVertical) ? (10) : (350),
              yyy = (obj.config.legendVertical) ? (320) : (80),
              cols = 1;//yyy -  pixels from top, cols - how many cols
            for (let key in obj.PCstate.recPCLNames) {
              let rectRec = gr.rect(xxx + 110 * key - (key - key % cols) * 110, yyy + (key - key % cols) / cols * 45, 100, 40, 4).attr({ id: 'animRect-' + obj.PCstate.recPCLNames[key], fill: colors[key], opacity: 0.8, cursor: 'pointer', strokeWidth: '3px' }),
                textRec = gr.text(0,
                  0,
                  obj.PCstate.allPaths[obj.PCstate.recPCLNames[key]].code
                ).attr({ class: 'Legend2', fontSize: '18px' })
              textRec.transform('matrix(' + ((textRec.getBBox().width > 90) ? (90 / textRec.getBBox().width) : (1)) + ',0,0,1,' + (xxx + 5 + 110 * key - (key - key % cols) * 110) + ',' + (yyy + 30 + (key - key % cols) / cols * 45) + ')')
              rectRec.click(function (event) { animatePath(event, false, key) })
              //after 8 variants stop showing
              if (key == 7) {
                gr.text(xxx, yyy + 380, 'there are more than 8')
                  .attr({ class: 'Legend1', fontSize: '10px' })
                break
              }
            }

            animatePath("animRect-" + obj.PCstate.recPCLNames[0], true, 0)
          } //shows recomended rectangles and paths with animation
        graphicStatic()
        determineRecommended()
        checkRecommended()
        showRecommended()
      } //fires after drawPatchLead function - adds legend and defines patch cords to show
    }
  }; //end of CDR1500 object


  function homeFrame() {
    this.Draw = function () {
      //frame subgroups
      var g1 = s.group().attr({ id: 'empty-frame1' }); // stores background, frame and other info
      var g2 = s.group().attr({ id: 'title-frame1' }); // shows title
      var g3 = s.group().attr({ id: 'tools-frame1' }); // other frames links
      var g4 = s.group().attr({ id: 'application-note-frame1' }); //stores patchcords
      var g5 = s.group().attr({ id: 'image-frame1' }); //temporary circles
      var g = s.group(g1, g2, g3, g4, g5).attr({ id: 'frame1', transform: 'matrix(1,0,0,1,0,0)' });
      //title
      g2.text(60, 60, 'Interactive LISA DA patching guide').attr({ class: 'Legend2' })
      //g2.text(60,100,title).attr({class:'Legend2'})
      //other frames links
      g3.rect(60, 150, 400, 120, 5).attr({ fill: 'white', stroke: 'grey', strokeWidth: '2px' })
      let icon1_rr = g3.rect(80, 170, 80, 80, 5).attr({ class: 'Icon' }),
        icon1_ll = g3.path(firstPath).attr({ fill: 'white', cursor: 'pointer' }).transform('t98,-560'),
        icon1 = g3.group(icon1_rr, icon1_ll).click(function () {
          changeFrame(1);
          template.obj.rotatePortrait()
        });
      g3.text(180, 220, 'Single rack').attr({ class: 'Legend3' })
      g3.rect(60, 300, 400, 120, 5).attr({ fill: 'white', stroke: 'grey', strokeWidth: '2px' })
      let icon2_rr = g3.rect(80, 320, 80, 80, 5).attr({ class: 'Icon' }),
        icon2_ll = g3.path(threePath).attr({ fill: 'white', cursor: 'pointer' }).transform('t98,-410'),
        icon2 = g3.group(icon2_rr, icon2_ll).click(function () {
          changeFrame(2);
          template.obj.rotateLandscape()
        });

      g3.text(180, 370, 'Three side-by-side racks').attr({ class: 'Legend3' })

      g4.rect(600, 150, 300, 330, 5).attr({ fill: 'white', stroke: 'grey', strokeWidth: '2px' })
      //recommended lengths icon
      let recLen = g4.group().attr({ id: 'recommended-lengths-icon' }).transform('matrix(1,0,0,1,620,170)'),
        recLenRect = recLen.rect(0, 0, 80, 80, 5).attr({ class: 'Icon' }),
        guideIconClone = guideIcon.clone().transform('matrix(2,0,0,2,3,25)').attr({ stroke: 'white', fill: 'none', cursor: 'pointer' });
      recLen.text(90, 30, 'Recommended').attr({ class: 'Legend3' })
      recLen.text(90, 50, 'lengths').attr({ class: 'Legend3' });
      recLen.append(guideIconClone);
      recLen.click(function () {
        openPNG(s, './assets/CDR1500_recommended_lengths.png', 10, 10, 920, 720, true)
      })

      //recommended vs minimal
      let recPatch = g4.group().attr({ id: 'patching-principles' }).transform('matrix(1,0,0,1,620,270)'),
        recPatchRect = recPatch.rect(0, 0, 80, 80, 5).attr({ class: 'Icon' }),
        principlesIconClone = principlesIcon.clone().transform('matrix(1.5,0,0,1.5,13,8)').attr({ stroke: 'white', fill: 'none', cursor: 'pointer' });
      recPatch.append(principlesIconClone);
      recPatch.text(90, 30, 'Recommended').attr({ class: 'Legend3' })
      recPatch.text(90, 50, 'vs minimal').attr({ class: 'Legend3' })
      recPatch.click(function () {
        openPNG(s, './assets/CDR1500_recommended_vs_minimal.png', 10, 10, 920, 720, true)
      })
      //How to use the tool
      let howTo = g4.group().attr({ id: 'how-to' }).transform('matrix(1,0,0,1,620,370)'),
        howToRect = howTo.rect(0, 0, 80, 80, 5).attr({ class: 'Icon' });
      howTo.path().attr({ d: howtouse, stroke: 'white', strokeWidth: 6, fill: 'none', cursor: 'pointer', transform: 'matrix(0.3,0,0,0.3,16,13)' });
      howTo.text(90, 30, 'How to').attr({ class: 'Legend3' })
      howTo.text(90, 50, 'use').attr({ class: 'Legend3' })
      howTo.click(function () {
        openPNG(s, './assets/CDR1500_how_to_use.png', 10, 10, 920, 720, true)
      })
      //add toggle button for suite-line 
      let tgl_btn1 = new toggle_button_svg(
        function () {
          if (cdr3.config.useMinimalPCL) {
            cdr3.config.useMinimalPCL = false
          } else {
            cdr3.config.useMinimalPCL = true
          }
          DeleteEl(s, '#cdr3')
          DeleteEl(l, '#legend')
          cdr3.Draw()
        });
      tgl_btn1.id = 'toggle_button_svg_1'
      tgl_btn1.state = !cdr3.config.useMinimalPCL
      tgl_btn1.config.x = 1900 + 850
      tgl_btn1.config.y = 470
      tgl_btn1.config.scale = 0.35
      tgl_btn1.draw()

    }
  }

  this.updateFrame = function () {
    console.log('Updating frame dimensions')
  }
}

runCDR1500()

//Helpful functions
//Return values or repeateble actions
//opens png file and adds event to close it
function openPNG(paper, src, x, y, W, H, clickOnClose) {
  let img = paper.image(src, x, y, W, H);
  if (clickOnClose || clickOnClose === undefined) {
    img.attr({ cursor: 'pointer' })
    img.append(Snap.parse('<title>click on image to close it</title>'))
    img.click(function () { img.remove() })
  }
}
//function takes first array, adds in the middle second array and adds in the end the third array
//returns concatenated array
function concatDots(array1, array2, array3) {
  if (array1 === undefined) { array1 = [] }
  if (array2 === undefined) { array2 = [] }
  if (array3 === undefined) { array3 = [] }
  let arr = [];
  arr = arr.concat(array1)
  for (let el in array2) { arr.push(array2[el]) }
  arr = arr.concat(array3)
  return arr;
}
//build object of dots coordinates
function convertDots(obj, dots) {
  let path = "M ";
  for (let el in obj) {
    if (dots[obj[el]] === undefined) { console.warn("Cannot find the dot: " + obj[el]) + ". Check the code." }
    path = path + dots[obj[el]][0] + ' ' + dots[obj[el]][1] + ' L'
  }
  path = path.slice(0, -1)
  return path
}
//function draws single invisible path with key as id and attaches that into group gr
function drawPath(path, key, gr, vis, scaleFactor, extra, roundCorners) {
  if (roundCorners || roundCorners === undefined) {
    path = roundPathCorners(path, 10, false) //check the function below which rounds path corners      
  }
  let pc1 = gr.path().attr({
    d: path,
    id: key,
    fill: 'none',
    opacity: vis,
    stroke: 'red'
  });
  let pathLength = pc1.getTotalLength();
  return pathLength * scaleFactor + extra
}
//function determines patch cord length, step between lengths - 0.5 meter 
function calculatePCLength(len) {
  let adder = 0, ch = Math.abs(Math.ceil(len / 500) * 500 - len);
  (ch <= 420) ? (adder = 0) : (adder = -500)
  return Math.ceil(len / 500) * 500 + adder
}
//end of draw function
//deletes element by id
function DeleteEl(s, id) {
  let el = s.select(id);
  if (el) { el.remove() }
}
//changes the text of the given element with animation
//p - paper, id - id of <text> tag, text - text to place, speed - how fast to change letters
function changeText(p, id, text, speed) {
  changingComplete = false
  if (speed === undefined) { speed = 0 }
  let textArr = [];
  textArr = text.split('');
  let newText = '';
  let el = Snap.select('#' + id);
  if (text === '') {
    el.attr({ text: '' })
  } else {
    let i = 0;
    function animateText(i) {
      setTimeout(function () {
        newText = newText + textArr[i]
        el.attr({ text: newText })
        i++
        if (i <= textArr.length - 1) { animateText(i) }
      }, speed)
    }
    animateText(i)
  }
}

//draws the toggle button and runs the callback when the button is clicked
//Taken from here: https://codepen.io/DmTs/pen/yLLgGYy?editors=0010
function toggle_button_svg(callback) {
  var s = Snap('#Rack');
  this.config = {
    x: 0, y: 0, w: 120, h: 50, scale: 1,
    color_b: '#009a82',
    color_f: '#deefea',
    color_font: '#ffffff',
    text_on: 'REC', //true = on
    text_off: 'MIN', //false = off
  }
  this.state = true;
  this.id = 'toggle_button_svg_1';
  let obj = this;
  this.draw = function () {
    let rect0, rect1, rect2, text1, text2, gr;
    rect0 = s.rect(0, 0, this.config.w, this.config.h, 5)
      .attr({ fill: this.config.color_b })
    rect1 = s.rect(5, 5, this.config.h - 10, this.config.h - 10, 5)
      .attr({ fill: this.config.color_f })
    text1 = s.text(this.config.w / 2 + 5, this.config.h - 15, this.config.text_on)
      .attr({ fill: this.config.color_font })
    rect2 = s.rect(this.config.w - this.config.h + 5, 5, this.config.h - 10, this.config.h - 10, 5)
      .attr({ fill: this.config.color_f })
    text2 = s.text(5, this.config.h - 15, this.config.text_off)
      .attr({ fill: this.config.color_font })
    gr = s.group(rect0, rect1, rect2, text1, text2)
      .attr({
        id: this.id,
        cursor: 'pointer'
      }); gr.transform('t' + this.config.x + ',' + this.config.y + 's' + this.config.scale + ',' + this.config.scale)
    //initial opacity
    if (obj.state) {
      rect1.attr({ opacity: 1 })
      text1.attr({ opacity: 1 })
      rect2.attr({ opacity: 0 })
      text2.attr({ opacity: 0 })
    } else {
      rect1.attr({ opacity: 0 })
      text1.attr({ opacity: 0 })
      rect2.attr({ opacity: 1 })
      text2.attr({ opacity: 1 })
    }
    //opacity after click
    gr.click(function () {
      if (obj.state) {
        obj.state = false
        rect1.attr({ opacity: 0 })
        text1.attr({ opacity: 0 })
        rect2.attr({ opacity: 1 })
        text2.attr({ opacity: 1 })
      } else {
        obj.state = true
        rect1.attr({ opacity: 1 })
        text1.attr({ opacity: 1 })
        rect2.attr({ opacity: 0 })
        text2.attr({ opacity: 0 })

      }
      callback()
    })
  }
}




/**
 * http://embed.plnkr.co/kGnGGyoOCKil02k04snu/preview
 *
 * SVG Path rounding function. Takes an input path string and outputs a path
 * string where all line-line corners have been rounded. Only supports absolute
 * commands at the moment.
 * 
 * @param pathString The SVG input path
 * @param radius The amount to round the corners, either a value in the SVG 
 *               coordinate space, or, if useFractionalRadius is true, a value
 *               from 0 to 1.
 * @param useFractionalRadius If true, the curve radius is expressed as a
 *               fraction of the distance between the point being curved and
 *               the previous and next points.
 * @returns A new SVG path string with the rounding
 */
function roundPathCorners(pathString, radius, useFractionalRadius) {
  function moveTowardsLength(movingPoint, targetPoint, amount) {
    var width = (targetPoint.x - movingPoint.x);
    var height = (targetPoint.y - movingPoint.y);

    var distance = Math.sqrt(width * width + height * height);

    return moveTowardsFractional(movingPoint, targetPoint, Math.min(1, amount / distance));
  }
  function moveTowardsFractional(movingPoint, targetPoint, fraction) {
    return {
      x: movingPoint.x + (targetPoint.x - movingPoint.x) * fraction,
      y: movingPoint.y + (targetPoint.y - movingPoint.y) * fraction
    };
  }

  // Adjusts the ending position of a command
  function adjustCommand(cmd, newPoint) {
    if (cmd.length > 2) {
      cmd[cmd.length - 2] = newPoint.x;
      cmd[cmd.length - 1] = newPoint.y;
    }
  }

  // Gives an {x, y} object for a command's ending position
  function pointForCommand(cmd) {
    return {
      x: parseFloat(cmd[cmd.length - 2]),
      y: parseFloat(cmd[cmd.length - 1]),
    };
  }

  // Split apart the path, handing concatonated letters and numbers
  var pathParts = pathString
    .split(/[,\s]/)
    .reduce(function (parts, part) {
      var match = part.match("([a-zA-Z])(.+)");
      if (match) {
        parts.push(match[1]);
        parts.push(match[2]);
      } else {
        parts.push(part);
      }

      return parts;
    }, []);

  // Group the commands with their arguments for easier handling
  var commands = pathParts.reduce(function (commands, part) {
    if (parseFloat(part) == part && commands.length) {
      commands[commands.length - 1].push(part);
    } else {
      commands.push([part]);
    }

    return commands;
  }, []);

  // The resulting commands, also grouped
  var resultCommands = [];

  if (commands.length > 1) {
    var startPoint = pointForCommand(commands[0]);

    // Handle the close path case with a "virtual" closing line
    var virtualCloseLine = null;
    if (commands[commands.length - 1][0] == "Z" && commands[0].length > 2) {
      virtualCloseLine = ["L", startPoint.x, startPoint.y];
      commands[commands.length - 1] = virtualCloseLine;
    }

    // We always use the first command (but it may be mutated)
    resultCommands.push(commands[0]);

    for (var cmdIndex = 1; cmdIndex < commands.length; cmdIndex++) {
      var prevCmd = resultCommands[resultCommands.length - 1];

      var curCmd = commands[cmdIndex];

      // Handle closing case
      var nextCmd = (curCmd == virtualCloseLine)
        ? commands[1]
        : commands[cmdIndex + 1];

      // Nasty logic to decide if this path is a candidite.
      if (nextCmd && prevCmd && (prevCmd.length > 2) && curCmd[0] == "L" && nextCmd.length > 2 && nextCmd[0] == "L") {
        // Calc the points we're dealing with
        var prevPoint = pointForCommand(prevCmd);
        var curPoint = pointForCommand(curCmd);
        var nextPoint = pointForCommand(nextCmd);

        // The start and end of the cuve are just our point moved towards the previous and next points, respectivly
        var curveStart, curveEnd;

        if (useFractionalRadius) {
          curveStart = moveTowardsFractional(curPoint, prevCmd.origPoint || prevPoint, radius);
          curveEnd = moveTowardsFractional(curPoint, nextCmd.origPoint || nextPoint, radius);
        } else {
          curveStart = moveTowardsLength(curPoint, prevPoint, radius);
          curveEnd = moveTowardsLength(curPoint, nextPoint, radius);
        }

        // Adjust the current command and add it
        adjustCommand(curCmd, curveStart);
        curCmd.origPoint = curPoint;
        resultCommands.push(curCmd);

        // The curve control points are halfway between the start/end of the curve and
        // the original point
        var startControl = moveTowardsFractional(curveStart, curPoint, .5);
        var endControl = moveTowardsFractional(curPoint, curveEnd, .5);

        // Create the curve 
        var curveCmd = ["C", startControl.x, startControl.y, endControl.x, endControl.y, curveEnd.x, curveEnd.y];
        // Save the original point for fractional calculations
        curveCmd.origPoint = curPoint;
        resultCommands.push(curveCmd);
      } else {
        // Pass through commands that don't qualify
        resultCommands.push(curCmd);
      }
    }

    // Fix up the starting point and restore the close path if the path was orignally closed
    if (virtualCloseLine) {
      var newStartPoint = pointForCommand(resultCommands[resultCommands.length - 1]);
      resultCommands.push(["Z"]);
      adjustCommand(resultCommands[0], newStartPoint);
    }
  } else {
    resultCommands = commands;
  }

  return resultCommands.reduce(function (str, c) { return str + c.join(" ") + " "; }, "");
}