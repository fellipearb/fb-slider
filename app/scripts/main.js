"use strict";

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

                            content.style.transform = "translateX("+ transition +"px)"
                        }                    

                        setAnimate()
                    }, options.transition)

                    console.log('fb-slider => animate')
                },
                stopWhenOver = () => {
                    let fn = () => {
                        stop = true

                        console.log( 'fb-slider => mouseenter' )
                    }
                    current.addEventListener("mouseenter", fn)
                },
                startWhenOverOut = () => {
                    let fn = () => {
                        stop = false

                        console.log( 'fb-slider => mouseout' )
                    }
                    current.addEventListener("mouseout", fn)
                },
                startOnClick = () => {
                    let fn = () => {
                        options.auto = true

                        console.log( 'fb-slider => mousedown' )
                    }
                    current.addEventListener("mousedown", fn)
                }

            getOptions()
            getProperties()
            setStyles()
            setAnimate()
            stopWhenOver()
            startWhenOverOut()
            startOnClick()
        }

        for(var i=0; i < elements.length; i++)
            startSlider(elements[i])
}

(function(){
    new fbSlider(document.getElementsByClassName('fb-slider'))    
})()