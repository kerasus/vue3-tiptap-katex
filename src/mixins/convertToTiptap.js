import {DOMParser} from 'prosemirror-model';


const mixinConvertToTiptap = {
    data () {
        return {
            poems: []
        }
    },
    methods: {
        elementFromString(value) {
            const element = document.createElement('div')
            element.innerHTML = value.trim()

            return element
        },
        insertPoem({ state, view }, value, index) {
            // const { selection } = state
            const element = this.elementFromString(value)
            const slice = DOMParser.fromSchema(state.schema).parseSlice(element)

            let reachedEnd = false
            let first = 0, last = 5
            let findIndex = -1
            while (!reachedEnd) {
                try {
                    const text = state.doc.textBetween(first, last)
                    if (text === 'poem' + index) {
                        reachedEnd = true
                        findIndex = first
                    }
                    first++
                    last++
                } catch {
                    console.log('poem' + index + ' not found')
                    break;
                }
            }


            const { /*doc,*/ tr } = state;
            let trx = tr;

            trx = trx.insertText('',findIndex,findIndex + 5)

            trx = trx.insert(first, slice.content)
            view.dispatch(trx)
        },
        convertToTiptap(string) { //call this function when you want to convert pure HTML to tiptap format
            string = this.convertHTMLKatexToInteractive(string)
            string = this.convertHTMLReadingToInteractive(string)
            string = this.convertHTMLImageToInlineInteractive(string)
            string = this.convertHTMLImageToInteractive(string)
            string = this.convertHTMLPoemToInteractive(string)
            return string
        },
        convertHTMLPoemToInteractive(string) {
            var wrapper = document.createElement('div')
            wrapper.innerHTML = string
            let poemParent = wrapper.querySelectorAll('.beit')
            poemParent.forEach((item, index) => {
                this.poems.push({ poem1: item.childNodes[0].innerHTML, poem2: item.childNodes[1].innerHTML, index: string.indexOf(item.outerHTML) - 5 })
                item.parentElement.replaceWith('poem' + index)
            })
            return wrapper.innerHTML
        },
        convertHTMLReadingToInteractive(string) {
            var wrapper = document.createElement('div')
            wrapper.innerHTML = string
            let poemParent = wrapper.querySelectorAll('.reading-duplicate')
            poemParent.forEach(item => {
                let poemHTML =
                    '<tiptap-interactive-reading>' + item.innerHTML + '</tiptap-interactive-reading>'
                var poemWrapper = document.createElement('div')
                poemWrapper.innerHTML = poemHTML
                item.parentElement.replaceWith(poemWrapper)
            })
            return wrapper.innerHTML
        },
        convertHTMLImageToInteractive(string) {
            var wrapper = document.createElement('div')
            wrapper.innerHTML = string
            let imagesParent = wrapper.querySelectorAll('img')
            imagesParent.forEach(item => {
                let imageHTML = item.attributes[0].nodeValue
                if (imageHTML) {
                    let justify = 'center'
                    if (item.parentElement.style.display === 'flex') {
                        if (item.parentElement.style.justifyContent === 'flex-start') {
                            justify = 'right'
                        } else if (item.parentElement.style.justifyContent === 'center') {
                            justify = 'center'
                        } else if (item.parentElement.style.justifyContent === 'flex-end') {
                            justify = 'left'
                        }
                    }
                    imageHTML =
                        '<tiptap-interactive-image-upload-inline' +
                        ' url="' + item.attributes['src'].nodeValue + '" ' +
                        'width="' + item.attributes['width'].nodeValue + '" ' +
                        'height="' + item.attributes['height'].nodeValue + '" ' +
                        'justify="' + justify + '"' +
                        '></tiptap-interactive-image-upload-inline>'
                    var imageWrapper = document.createElement('div')
                    imageWrapper.innerHTML = imageHTML
                    if (item.parentElement.style.display === 'flex') {
                        item.parentElement.replaceWith(imageWrapper)
                    } else {
                        item.replaceWith(imageWrapper)
                    }
                }
            })
            return wrapper.innerHTML
        },
        convertHTMLImageToInlineInteractive(string) {
            var wrapper = document.createElement('div')
            wrapper.innerHTML = string
            let imagesParent = wrapper.querySelectorAll('span img')
            imagesParent.forEach(item => {
                let imageHTML = item.attributes[0].nodeValue
                if (imageHTML) {
                    let marginBottom = 0
                    if (item.style.marginBottom) {
                        marginBottom = item.style.marginBottom.slice(0, -2)
                    }
                    imageHTML =
                        '<tiptap-interactive-image-upload-inline' +
                        ' url="' + item.attributes['src'].nodeValue + '" ' +
                        'width="' + item.attributes['width'].nodeValue + '" ' +
                        'height="' + item.attributes['height'].nodeValue + '" ' +
                        'vertical="' + marginBottom + '" ' +
                        'justify="center"' +
                        '></tiptap-interactive-image-upload-inline>'
                    var imageWrapper = document.createElement('span')
                    imageWrapper.innerHTML = imageHTML
                    item.parentElement.replaceWith(imageWrapper)
                }
            })
            return wrapper.innerHTML
        },
        convertHTMLKatexToInteractive(string) {
            string = string.replaceAll('\\[ ', '\\[')
            string = string.replaceAll(' \\]', ' \\]')
            string = string.replaceAll(' $', '$')
            string = string.replaceAll('$ ', '$')

            let regex = /((\\\[((?! ).){1}((?!\$).)*?((?! ).){1}\\\])|(\$((?! ).){1}((?!\$).)*?((?! ).){1}\$))/gms;
            string = string.replace(regex, (match) => {
                let finalMatch
                if (match.includes('$$')) {
                    finalMatch = match.slice(2, -2)
                } else if (match.includes('$')) {
                    finalMatch = match.slice(1, -1)
                } else {
                    finalMatch = match.slice(2, -2)
                }
                return '<tiptap-interactive-katex-inline katex="' + finalMatch + '"></tiptap-interactive-katex-inline>'
            })
            return string
        },
    }
}

export default mixinConvertToTiptap
