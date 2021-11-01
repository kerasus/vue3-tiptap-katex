const mixinConvertToHTML = {
    methods: {
        convertToPureHTML(string) { //call this function when you want to convert tiptap output to pure html
            string = this.convertInteractivePoemToHTML(string)
            string = this.convertInlineInteractiveImagesToHTML(string)
            string = this.convertInteractiveImagesToHTML(string)
            string = this.convertInteractiveIKatexToHTML(string)
            string = this.convertInteractiveReadingToHTML(string)
            string = this.tableColWidthStyle(string)

            return string
        },
        tableColWidthStyle (string) {
            var wrapper = document.createElement('div')
            wrapper.innerHTML = string
            let tableCellsWithColWidth = wrapper.querySelectorAll('table tr td[colwidth]')
            tableCellsWithColWidth.forEach(cell => {
                const colwidth = cell.attributes.getNamedItem( 'colwidth')
                if (colwidth) {
                    cell.style.width = colwidth.nodeValue + 'px'
                }
            })

            return wrapper.innerHTML
        },
        convertInteractiveReadingToHTML(string) {
            var wrapper = document.createElement('div')
            wrapper.innerHTML = string
            let readings = wrapper.querySelectorAll('tiptap-interactive-reading')
            readings.forEach(item => {
                console.log(item.innerHTML, 'item')
                let interactiveReading =
                    '<div class="reading-duplicate" dir="auto">' + item.innerHTML + '</div>'
                //create img parent and set the display settings and justify the image
                var poemWrapper = document.createElement('div')
                poemWrapper.innerHTML = interactiveReading
                item.replaceWith(poemWrapper)
            })
            return wrapper.innerHTML
        },
        convertInteractivePoemToHTML(string) {
            var wrapper = document.createElement('div')
            wrapper.innerHTML = string
            let poems = wrapper.querySelectorAll('ol li table tr')
            poems.forEach(poem => {
                let poemWrapper = document.createElement('div')
                poemWrapper.innerHTML = poem.innerHTML
                let poem1 = poemWrapper.querySelectorAll('p')[0].innerHTML
                let poem2 = poemWrapper.querySelectorAll('p')[1].innerHTML
                let interactivePoem = '<div class="beit"><div class="mesra">' + poem1 + '</div><div class="mesra">' + poem2 + '</div></div>'
                var PoemWrapper = document.createElement('div')
                PoemWrapper.innerHTML = interactivePoem
                poem.parentNode.parentNode.parentNode.parentNode.replaceWith(PoemWrapper)
            })
            return wrapper.innerHTML
        },
        convertInteractiveImagesToHTML(string) { //this function converts interactiveImage from tiptap to html image
            var wrapper = document.createElement('div')
            wrapper.innerHTML = string
            let images = wrapper.querySelectorAll('tiptap-interactive-image-upload')
            images.forEach(item => {
                let interactiveImage = item.attributes[0].nodeValue
                if (interactiveImage) {
                    //create img tag and set its attrs
                    interactiveImage =
                        '<img src="' + item.attributes['url'].nodeValue + '" width="' + item.attributes['width'].nodeValue + '" height="' + item.attributes['height'].nodeValue + '" />'
                    //create img parent and set the display settings and justify the image
                    var imageWrapper = document.createElement('div')
                    imageWrapper.innerHTML = interactiveImage
                    imageWrapper.style.display = 'flex'
                    if (item.attributes['justify'].nodeValue === 'right') {
                        imageWrapper.style.justifyContent = 'flex-start'
                    } else if (item.attributes['justify'].nodeValue === 'center') {
                        imageWrapper.style.justifyContent = 'center'
                    } else if (item.attributes['justify'].nodeValue === 'left') {
                        imageWrapper.style.justifyContent = 'flex-end'
                    }
                    item.replaceWith(imageWrapper)
                }
            })
            return wrapper.innerHTML
        },
        convertInlineInteractiveImagesToHTML(string) { //this function converts interactiveImage from tiptap to html image
            var wrapper = document.createElement('div')
            wrapper.innerHTML = string
            let images = wrapper.querySelectorAll('tiptap-interactive-image-upload-inline')
            images.forEach(item => {
                let interactiveImage = item.attributes[0].nodeValue
                if (interactiveImage) {
                    //create img tag and set its attrs
                    interactiveImage =
                        '<img src="' + item.attributes['url'].nodeValue + '" width="' + item.attributes['width'].nodeValue + '" height="' + item.attributes['height'].nodeValue + '" style="margin-bottom: ' + item.attributes['vertical'].nodeValue + 'px;" />'
                    //create img parent and set the display settings and justify the image
                    var imageWrapper = document.createElement('span')
                    imageWrapper.style.display = 'inline-block'
                    imageWrapper.style.height = item.attributes['height'].nodeValue + 'px'
                    imageWrapper.innerHTML = interactiveImage
                    item.replaceWith(imageWrapper)
                }
            })
            return wrapper.innerHTML
        },
        convertInteractiveIKatexToHTML(string) { // this function converts interactiveKatex from tiptap to html image
            var wrapper = document.createElement('div')
            wrapper.innerHTML = string
            let katexes = wrapper.querySelectorAll('tiptap-interactive-katex-inline')
            katexes.forEach(item => {
                let interactiveKatex = item.attributes[0].nodeValue
                if (interactiveKatex) {
                    interactiveKatex = '$' + item.attributes['katex'].nodeValue + '$'
                    var katexWrapper = document.createElement('div')
                    katexWrapper.setAttribute('katex', true)
                    katexWrapper.textContent = interactiveKatex
                    item.replaceWith(katexWrapper.textContent)
                }
            })
            return wrapper.innerHTML
        },
    }
}

export default mixinConvertToHTML
