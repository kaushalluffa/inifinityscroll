const imgContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false
let imagesLoaded = 0
let totalImages = 0
let photosArray = []
let initialLoad = true


let count = 5
const apiKey = 'c8vWkhga5kR20inGZEJef3AzRM2TveWQA4Q7_wVDtn0'
let url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

const imageLoaded = () => {
    imagesLoaded++ 
    if(imagesLoaded === totalImages) {
        ready = true
        loader.hidden = true
        initialLoad = false
        count = 30
        url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`
    }
}

const setAttribute = (element, attributes) => {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

const displayPhotos =  ()=>  {
    imagesLoaded = 0
    totalImages = photosArray.length
    photosArray.forEach((photo) => {
        const item = document.createElement('a')

        setAttribute( item, {
            href: photo.links.html,
            target: '_blank'
        })
        const image = document.createElement('img')
        
        setAttribute(image, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        image.addEventListener('load', imageLoaded)

        item.appendChild(image)
        imgContainer.appendChild(item)
    })
}

const getPhotos = async () => {
    try {
        const response = await fetch(url)
        photosArray = await response.json()
        displayPhotos()
    }
    catch (err) {
        console.log(err);
    }
}

window.addEventListener('scroll', () =>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false
        getPhotos()
    }
})

getPhotos()