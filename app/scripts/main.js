"use strict";

(function(){
    let 
        elements = document.getElementsByClassName('fb-slider'),
        options = undefined,
        properties = [],
        styles = [],
        content = undefined,
        current = undefined,
        transition = 0,
        timeout = undefined,
        stop = undefined
    
    console.log( elements )

    let
        getOptions = (element) => {
            options = JSON.parse(element.getAttribute('data-options'))

            console.log('fb-slider => options', options)
        },
        getProperties = (current) => {
            properties.width = current.clientWidth
            properties.height = current.clientHeight

            console.log('fb-slider => properties', options, properties)
        },
        setStyles = (current) => {
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
        setAnimate = (current) => {
            setTimeout(function(){
                if( !stop ) {
                    transition -= properties.width

                    if( (transition * -1) === current.clientWidth )
                        transition = 0

                    current.style.transform = "translateX("+ transition +"px)"
                }                    

                setAnimate(current)
            }, options.transition)

            console.log('fb-slider => animate')
        },
        stopWhenOver = (current) => {
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
        startSlider = () => {
            // temp
            current = elements[0]
            // - temp

            getOptions(current)
            getProperties(current)
            setStyles(current)
            setAnimate(content)
            stopWhenOver(current)
            startWhenOverOut(current)
        }

        startSlider()
})()