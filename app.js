/*==================| ADD A PRODUCT |==================*/

// My elements
const btnMinus = document.querySelector('.product-add-to-cart >div button:nth-child(1)')
const btnPlus = document.querySelector('.product-add-to-cart >div button:nth-child(3)')
const input = document.querySelector('.product-add-to-cart >div input')
const btnAdd = document.querySelector('.product-add-to-cart >button')
const svgCart = document.querySelector('#cart >div:first-child')
const label = document.querySelector('#cart >div:first-child span')
const avatar = document.querySelector('#cart >div:last-child img')
const sticker = document.querySelector('header >div:last-child')

//My count & price
let count = 0
let price = 125.00

//My div cart
const stickerDivContent = sticker.childNodes[3]
stickerDivContent.innerHTML = `<span>Your cart is empty.</span>`

createStickerDivContentEmpty =()=>{
    stickerDivContent.innerHTML = `<span>Your cart is empty.</span>`
}

createStickerDivContentFilled =()=> {
    const img =  document.createElement('img')
    const span =  document.createElement('span')
    const button = document.createElement('button')
    const divProduct = document.createElement('div')
    const divButton = document.createElement('div')
    
    img.setAttribute('src', 'images/image-product-1-thumbnail.jpg')
    img.setAttribute('alt', 'image product 1')
    divProduct.appendChild(img)

    span.innerHTML = `Fall Limited Edition Sneakers<br/>
    $125.00 x <span>0</span> <strong>$0</strong>`
    divProduct.appendChild(span)
    divProduct.innerHTML += `<svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/></svg>`
    
    button.textContent = 'Checkout'
    divButton.appendChild(button)
    
    stickerDivContent.appendChild(divProduct)
    stickerDivContent.appendChild(divButton)

    //On click on svg trash
    if(count > 0){
        stickerDivContent.childNodes[0].childNodes[2].addEventListener('click', ()=>{
            stickerDivContent.innerHTML = `<span>Your cart is empty.</span>`
            count = 0
            input.value = count
            label.textContent = ''
            label.classList.remove('cart-count-not-empty')
        })
    }
}

//On click on button minus
btnMinus.addEventListener('click', ()=>{
    if(count === 0) {
        return
    } else if(count === 1){
        count --
        input.value = count
        label.textContent = ''
        label.classList.remove('cart-count-not-empty')
        createStickerDivContentEmpty()
    } else {
        count--
        input.value = count
        label.textContent = count
        stickerDivContent.childNodes[0].childNodes[1].childNodes[3].textContent = count
        stickerDivContent.childNodes[0].childNodes[1].childNodes[5].textContent = `$${count * price}.00`
    }
    
})

//On click on button plus
btnPlus.addEventListener('click', ()=>{
    count++
    input.value = count
    
    if(count > 0){
        label.textContent = count
        label.classList.add('cart-count-not-empty')
    }

    if(count === 1){
        stickerDivContent.removeChild(stickerDivContent.childNodes[0])
        createStickerDivContentFilled()
    }

    stickerDivContent.childNodes[0].childNodes[1].childNodes[3].textContent = count
    stickerDivContent.childNodes[0].childNodes[1].childNodes[5].textContent = `$${count * price}.00`
})

//On click on avatar
avatar.addEventListener('click', ()=>{
    sticker.classList.toggle('sticker')
})

//On click on svg cart
svgCart.addEventListener('click', ()=>{
    sticker.classList.toggle('sticker')
})



/*==================| SHOW IMAGES PRODUCT |==================*/

//My elements
const thumbnailList = document.querySelectorAll('.product-presentation-images div a')
const lightBox = document.getElementById('show-images-product')
const closeBtn = document.querySelector('#show-images-product >div:first-child button:nth-child(2)')
const prevBtn = document.querySelector('#show-images-product >div:first-child button:nth-child(3)')
const nextBtn = document.querySelector('#show-images-product >div:first-child button:nth-child(4)')
const slider = document.querySelector('#show-images-product >div:first-child div div')

let countSlider = 0

closeBtn.addEventListener('click', ()=>{
    lightBox.style.display = 'none'
})

nextBtn.addEventListener('click', ()=>{
    if(countSlider === 3){
        return
    } else {
        countSlider++
        let sliderWidth = slider.clientWidth
        slider.style.transform = `translateX(-${(sliderWidth/4)*countSlider}px)`
        thumbnailList.forEach((thumbnail, index)=>{
            if(index > 3){
                for(let i=4; i<thumbnailList.length; i++){

                    if(thumbnailList[i].className === 'active'){
                        thumbnailList[i].classList.remove('active')
                        thumbnailList[i-4].classList.remove('active')
                    }
                }
                thumbnailList[countSlider+4].classList.add('active')
                thumbnailList[countSlider].classList.add('active')
            }
        })
    }
})

prevBtn.addEventListener('click', ()=>{
    if(countSlider === 0){
        return
    } else {
        countSlider--
        let sliderWidth = slider.clientWidth
        slider.style.transform = `translateX(-${(sliderWidth/4)*countSlider}px)`
        thumbnailList.forEach((thumbnail, index)=>{
            if(index > 3){
                for(let i=4; i<thumbnailList.length; i++){

                    if(thumbnailList[i].className === 'active'){
                        thumbnailList[i].classList.remove('active')
                        thumbnailList[i-4].classList.remove('active')
                    }
                }
                thumbnailList[countSlider+4].classList.add('active')
                thumbnailList[countSlider].classList.add('active')
            }
        })
    }
})

thumbnailList.forEach((thumbnail, index)=>{

    thumbnail.addEventListener('click', ()=>{

        lightBox.style.display = 'flex'
            
        if(index > 3){

            for(let i=4; i<thumbnailList.length; i++){

                if(thumbnailList[i].className === 'active'){
                    thumbnailList[i].classList.remove('active')
                    thumbnailList[i-4].classList.remove('active')
                }
            }
            
            let sliderWidth = slider.clientWidth
            slider.style.transform = `translateX(-${(sliderWidth/4)*(index-4)}px)`
            thumbnail.classList.add('active')
            thumbnailList[index-4].classList.add('active')
            countSlider = index-4
        }

        else {
            if(thumbnail.childNodes[1].alt = `image-product-${index+1}`){

                thumbnail.parentNode.parentNode.childNodes[1].setAttribute('src', `images/image-product-${index+1}.jpg`)

                for(let i=0; i<4; i++){
                    if(thumbnailList[i].className === 'active'){
                        thumbnailList[i].classList.remove('active')
                        thumbnailList[i+4].classList.remove('active')
                    }
                }

                let sliderWidth = slider.clientWidth
                slider.style.transform = `translateX(-${(sliderWidth/4)*(index)}px)`
                thumbnail.classList.add('active')
                thumbnailList[index+4].classList.add('active')
                countSlider = index

            }
        }

    })
})



/*==================| BURGER MENU ANIMATION |==================*/

//My elements
const burger = document.querySelector('header >div nav >div:first-child')
const menu = document.querySelector('header >div nav >div:last-child')
const contentMenu = document.querySelector('header >div nav >div:last-child >div')
const lines = document.querySelectorAll('header >div nav >div:first-child div')

burger.addEventListener('click', ()=>{
    menu.classList.toggle('display-content')
    contentMenu.classList.toggle('move')

    lines.forEach((line, index)=>{
        if(index === 0){
            line.classList.toggle('rotation-line-1')
        } else if (index === 2){
            line.classList.toggle('rotation-line-3')
        } else {
            line.classList.toggle('hide-line-2')
        }
    })
})
