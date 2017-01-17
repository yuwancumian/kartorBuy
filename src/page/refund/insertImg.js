function insertImg( url ){
    const newImg = '<img src=' + url + '/>'
    const target = document.getElementById('add-image')
    target.insertAdjacentHTML('beforebegin',newImg)
    const upload = document.getElementsByClassName('upload-cert')[0]
    const img = upload.getElementsByTagName('img')
    if (img.length > 3 ) {
        target.style.display = 'none'
    }
}
export {insertImg}