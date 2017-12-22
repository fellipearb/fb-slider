"use strict";

window.fbSlider = (elements) => {
    let
        startSlider = (elm) => {
            let 
                options = undefined,
                properties = [],
                styles = [],
                content = undefined,
                current = elm,
                transition = 0,
                timeout = undefined,
                stop = undefined,
                getOptions = () => {
                    options = JSON.parse(current.getAttribute('data-options'))

                    console.log('fb-slider => options', options)
                },
                getProperties = () => {
                    properties.width = current.clientWidth
                    properties.height = current.clientHeight

                    console.log('fb-slider => properties', options, properties)
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
                        if( !stop ) {
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
                }

            getOptions()
            getProperties()
            setStyles()
            setAnimate()
            stopWhenOver()
            startWhenOverOut()
        }

        for(var i=0; i < elements.length; i++)
            startSlider(elements[i])
}

(function(){
    new fbSlider(document.getElementsByClassName('fb-slider'))    
})()