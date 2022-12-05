/*==================| ADD A PRODUCT |==================*/

// My elements
const [btnMinus, btnPlus] = document.querySelectorAll('.product-add-to-cart div button')
const input = document.querySelector('.product-add-to-cart input')
const btnAdd = document.querySelector('.product-add-to-cart button')
const svgCart = document.querySelector('#cart > div:first-child')
const label = svgCart.querySelector('span')
const avatar = document.querySelector('#cart img')
const sticker = document.querySelector('header > div:last-child')

// My count & price
let count = 0
let price = 125.00

// My text
const emptyText = '<span>Your cart is empty.</span>'

// My div cart
const stickerContent = sticker.querySelector('div')

// My functions
const createStickerContentEmpty = () => stickerContent.innerHTML = emptyText
const toogleStickerClass = () => sticker.classList.toggle('sticker')
const createElts = (type) => document.createElement(type)

function createStickerContentFilled() {
    const img =  createElts('img'), span =  createElts('span'), button = createElts('button')
    const divProduct = createElts('div'), divButton = createElts('div')
    
    img.src = 'images/image-product-1-thumbnail.jpg'
    img.alt = 'image product 1'
    divProduct.appendChild(img)

    span.innerHTML = `Fall Limited Edition Sneakers<br/>$125.00 x <span>0</span> <strong>$0</strong>`
    divProduct.appendChild(span)
    divProduct.innerHTML += `<svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/></svg>`
    
    button.textContent = 'Checkout'
    divButton.appendChild(button)
    
    stickerContent.appendChild(divProduct)
    stickerContent.appendChild(divButton)

    if (count > 0) {
        const svg = stickerContent.querySelector('svg')
        
        // On click on svg trash
        svg.addEventListener('click', () => {
            stickerContent.innerHTML = emptyText
            count = 0
            input.value = count
            label.textContent = ''
            label.classList.remove('cart-count-not-empty')
        })
    }
}

function displayCountAndPrice(count, price) {
    stickerContent.querySelector('span').children[1].textContent = count
    stickerContent.querySelector('strong').textContent = `$${count * price}.00`
}

// My events
btnMinus.addEventListener('click', () => {
    switch(count) {
        case 0:
            return
            
        default:
            count--
            input.value = count

            switch(count) {
                case 0:
                    label.textContent = ''
                    label.classList.remove('cart-count-not-empty')
                    createStickerContentEmpty()
                    break

                default:
                    label.textContent = count
                    displayCountAndPrice(count, price)
            }
    }
})

btnPlus.addEventListener('click', () => {
    count++
    input.value = count
    label.textContent = count
    label.classList.add('cart-count-not-empty')

    if (count === 1) {
        stickerContent.removeChild(stickerContent.childNodes[0])
        createStickerContentFilled()
    }

    displayCountAndPrice(count, price)
})

avatar.addEventListener('click', toogleStickerClass)
svgCart.addEventListener('click', toogleStickerClass)

createStickerContentEmpty()

/*==================| SHOW IMAGES PRODUCT |==================*/

// My elements
const mainVisual = document.querySelector('.product-presentation-images > div > img')
const thumbnailList = document.querySelectorAll('.product-presentation-images div a')
const lightBox = document.getElementById('show-images-product')
const [closeBtn, prevBtn, nextBtn] = lightBox.querySelectorAll('button')
const slider = document.querySelector('#show-images-product > div:first-child div div')
const length = slider.children.length // number : 4

let countSlider = 0

// My functions
function moveSlider(slider, count) {
    let sliderWidth = slider.clientWidth
    slider.style.transform = `translateX(-${(sliderWidth / length) * count}px)`
}

const fillImage = (img, number) => img.src = `images/image-product-${number + 1}.jpg`

function loopSearchActiveClass(number, list) {
    for (let i = number; i < list.length; i++) {
        if (list[i].className === 'active'){
            list[i].classList.remove('active')
            
            if (number >= length) {
                list[i - length].classList.remove('active')
                
            } else {
                list[i + length].classList.remove('active')
            }
        }
    }
}

function handleThumbnails() {
    moveSlider(slider, countSlider)

    thumbnailList.forEach((thumbnail, index, thumbnails) => {
        if (index >= length) {

            if (thumbnail.className === 'active') {
                thumbnail.classList.remove('active')
                thumbnails[index - length].classList.remove('active')
            }

            thumbnails[countSlider + length].classList.add('active')
            thumbnails[countSlider].classList.add('active')
        }
    })
}

// My events
closeBtn.addEventListener('click', () => {
    lightBox.style.display = 'none'
})

nextBtn.addEventListener('click', () => {
    if (countSlider === 3) return
    
    countSlider++
    handleThumbnails()
})

prevBtn.addEventListener('click', () => {
    if (countSlider === 0) return
    
    countSlider--
    handleThumbnails()
})

thumbnailList.forEach((thumbnail, index, thumbnails) => {

    thumbnail.addEventListener('click', () => {
        if (lightBox.style.display !== 'flex') {
            lightBox.style.display = 'flex'
        }
            
        if (index >= length) {
            loopSearchActiveClass(length, thumbnails)
            moveSlider(slider, index - length)

            thumbnail.classList.add('active')
            thumbnails[index - length].classList.add('active')
            countSlider = index - length
            fillImage(mainVisual, countSlider)

        } else {
            const thumb = thumbnail.querySelector('img')
            const image = thumbnail.parentNode.parentNode.children[0]

            if (thumb.alt = `image-product-${index + 1}`) {
                fillImage(image, index)
                fillImage(mainVisual, index)

                loopSearchActiveClass(0, thumbnails)
                moveSlider(slider, index)

                thumbnail.classList.add('active')
                thumbnails[index + length].classList.add('active')
                countSlider = index
            }
        }
    })
})

/*==================| BURGER MENU ANIMATION |==================*/

// My elements
const burger = document.querySelector('nav > div:first-child')
const lines = burger.querySelectorAll('div')
const menu = document.querySelector('nav > div:last-child')
const content = menu.querySelector('div')

// My events
burger.addEventListener('click', () => {
    menu.classList.toggle('display-content')
    content.classList.toggle('move')

    lines.forEach((line, index) => {

        switch(index) {
            case 0:
                line.classList.toggle('rotation-line-1')
                break

            case 2:
                line.classList.toggle('rotation-line-3')
                break

            default:
                line.classList.toggle('hide-line-2')
        }
    })
})
