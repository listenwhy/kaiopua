/*
Game.js
Game module, handles sections of game.
*/

define(["order!lib/Three",
        "order!lib/ThreeExtras",
        "order!game/sections/LauncherSection"],
function() {
    var shared = require('utils/Shared'),
        launcher = require('game/sections/LauncherSection'),
        domElement = shared.gameContainer,
        renderer, renderTarget, sections, sectionNames, 
        currentSection, previousSection, paused = true;
    
    /*===================================================
    
    internal init
    
    =====================================================*/
    
    // init three 
    // renderer
    renderer = new THREE.WebGLRenderer( { antialias: false, clearColor: 0x000000, clearAlpha: 0 } );
    renderer.setSize( shared.screenWidth, shared.screenHeight );
    
    // render target
    renderTarget = new THREE.WebGLRenderTarget( shared.screenWidth, shared.screenHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter } );
    
    // add to game dom element
    domElement.append( renderer.domElement );
    
    // store sections
    sections = {
        launcher : launcher
    };
    sectionNames = ['launcher'];
    
    // share
    shared.renderer = renderer;
    shared.renderTarget = renderTarget;
    
    // resize listener
    resize(shared.screenWidth, shared.screenHeight);
    shared.signals.windowresized.add(resize);
    
    /*===================================================
    
    external init
    
    =====================================================*/

    function init() {
        var i, l;
        
        // init each section
        for (i = 0, l = sectionNames.length; i < l; i += 1) {
            sections[sectionNames[i]].init();
        }
        
        // set initial section
        set_section(sections.launcher);
        
        start_updating();
    }
    
    /*===================================================
    
    functions
    
    =====================================================*/

    function set_section ( section ) {
        // hide current section
        if (typeof currentSection !== 'undefined') {
            
            previousSection = currentSection;
            
            previousSection.hide();
            
            stop_updating();
            
            shared.transitioner.fadeTo(shared.transitionIn, 1).promise().done( function () {
                previousSection.remove();
            });
            
        }
        
        // no current section
        currentSection = undefined;
        
        // start and show new section
        if (typeof section !== 'undefined') {
            
            // wait for transitioner to finish fading in
            shared.transitioner.promise().done(function () {
                
                section.resize(shared.screenWidth, shared.screenHeight);
            
                section.show();
                
                currentSection = section;
                
                start_updating();
                
                shared.transitioner.fadeTo(shared.transitionOut, 0);
                
            });
            
        }
    }
    
    function start_updating () {
        if (paused === true) {
            paused = false;
            update();
        }
    }
    
    function stop_updating () {
        paused = true;
    }
    
    function update () {
        if (paused === false) {
            window.requestAnimFrame( update );
            
            if (typeof currentSection !== 'undefined') {
                currentSection.update();
            }
        }
    }
    
    function resize( W, H ) {
        
        // resize three
        renderer.setSize( W, H );
        renderTarget.width = W;
        renderTarget.height = H;
        
    }

    // return something to define module
    return {
        init: init,
        start_updating: start_updating,
        stop_updating: stop_updating,
        domElement: domElement,
        paused: function () { return paused; }
    };
});