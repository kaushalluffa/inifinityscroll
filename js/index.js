const imgContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')


let photosArray = []

const count = 10
const apiKey = 'tVP3dNlgOoyp4aP7b2yFfcJ5BXB-JH_Sdq5NvcQW_Xs'
const url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

const setAttribute = (element, attributes) => {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

const displayPhotos =  ()=>  {
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
    if((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 1000)){
        getPhotos()
    }
})

getPhotos()