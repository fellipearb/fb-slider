'use strict';

var teste = 0;
let teste2 = 1;

window.fbSlider = (elements) => {
    let
        startSlider = (elm) => {
            let 
                options = {
                    items: 1,
                    transition: 2000,
                    auto: true
                },
                properties = [],
                styles = [],
                content = undefined,
                current = elm,
                transition = 0,
                transitionDrag = undefined,
                timeout = undefined,
                stop = undefined,
                getOptions = () => {
                    var others = JSON.parse(current.getAttribute('data-options'))

                    options.items = others.items == undefined ? options.items : others.items
                    options.transition = others.transition == undefined ? options.transition : others.transition
                    options.auto = others.auto == undefined ? options.auto : others.auto

                    console.log('fb-slider => options', options)
                },
                getProperties = () => {
                    properties.width = current.clientWidth
                    properties.height = current.clientHeight

                    console.log('fb-slider => properties', options, properties, properties.auto)
                },
                setStyles = () => {
                    content = current.getElementsByClassName('fb-slider-content')[0]
                    content.style.transform = 'translateX(0px)'
                    
                    let 
                        qtd = content.getElementsByClassName('fb-item').length,
                        contentWidth = (properties.width * qtd) + 'px',
                        items = content.getElementsByClassName('fb-item'),
                        setElmStyle = (elm) => {
                            elm.style.width = properties.width + 'px'

                            console.log('fb-slider => setStyle', elm)
                        }
                    
                    for(var i=0; i < items.length; i++) {
                        setElmStyle(items[i])
                    }

                    content.style.width = contentWidth
                    
                    console.log('fb-slider => styles', content, qtd, contentWidth, items)
                },
                setAnimate = () => {
                    setTimeout(function(){
                        if( !stop && options.auto ) {
                            transition -= properties.width

                            if( (transition * -1) === content.clientWidth )
                                transition = 0

                            content.style.transform = 'translateX('+ transition +'px)'
                        }

                        setAnimate()
                    }, options.transition)

                    console.log('fb-slider => animate')
                },
                setAnimateDrag = (event) => {
                    if( event.y === 0 )
                        return false

                    let drag = undefined,
                        translate = undefined

                    translate = content.style.cssText.split('translateX(')[1].split(')')[0].replace('px', '')

                    if( transitionDrag < event.x ) {
                        drag = (transitionDrag - event.x) * 0.1
                        console.log( 'lado direita', drag )
                    } else {
                        drag = Math.abs(event.x - transitionDrag) * 0.1
                        console.log( 'lado esquerda', drag, content.clientWidth )
                    }

                    // if( Math.abs(drag) > (properties.width * 0.2) )
                    //     drag = (properties.width * 0.2)

                    translate = translate - drag

                    if( translate > 0 )
                        translate = 0

                    if( Math.abs(translate) > content.clientWidth )
                        translate = (content.clientWidth - current.clientWidth)

                    content.style.transform = 'translateX('+ translate +'px)'
                    console.log('fb-slider => animate drag', 'translate => ', translate)
                    console.log('fb-slider => animate drag', 'transitionDrag => ', transitionDrag)
                    console.log('fb-slider => animate drag',  'X => ', event.x)
                    console.log('fb-slider => animate drag',  'TRANS => ', transitionDrag - event.x)
                },
                stopWhenOver = () => {
                    let fn = () => {
                        stop = true

                        console.log( 'fb-slider => mouseenter' )
                    }
                    current.addEventListener('mouseenter', fn)
                },
                startWhenOverOut = () => {
                    let fn = () => {
                        // stop = false

                        console.log( 'fb-slider => mouseout' )
                    }
                    current.addEventListener('mouseout', fn)
                },
                startOnClick = () => {
                    let fn = () => {
                        options.auto = true

                        console.log( 'fb-slider => mousedown' )
                    }
                    current.addEventListener('mousedown', fn)
                },
                getDragStart = () => {
                    let fn = (e) => {
                        stop = true
                        transitionDrag = e.x
                        console.log('fb-slider => dragstart', e.x)
                    }
                    current.addEventListener("dragstart", fn, false);
                },
                getDragEnd = () => {
                    let fn = (e) => {
                        // stop = false
                        transitionDrag = e.x
                        console.log('fb-slider => dragend')
                    }
                    current.addEventListener("dragend", fn, false);
                },
                getDragMove = () => {
                    let fn = (e) => {
                        stop = true
                        setAnimateDrag(e)
                        console.log('fb-slider => drag')
                    }
                    current.addEventListener("drag", fn, false);
                },
                getDragOver = () => {
                    let fn = (e) => {
                        e.preventDefault()
                        console.log('fb-slider => dragover')
                    }
                    current.addEventListener("dragover", fn, false);
                }

            getOptions()
            getProperties()
            setStyles()
            setAnimate()
            stopWhenOver()
            startWhenOverOut()
            startOnClick()
            getDragStart()
            getDragEnd()
            getDragMove()
            getDragOver()
        }

        for(var i=0; i < elements.length; i++)
            startSlider(elements[i])
}

(function(){
    new fbSlider(document.getElementsByClassName('fb-slider'))    
})()