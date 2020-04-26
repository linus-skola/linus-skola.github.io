window.addEventListener('load', () => {
    var toggle = document.getElementById('bgtoggle');

    console.log(toggle);

    toggle.onclick = function () {
        var bgvideo = document.getElementById('bgvideo');

        console.log(bgvideo);

        bgvideo.style
        
        if (bgvideo.style.display == '' || bgvideo.style.display == 'block') {
            bgvideo.style.display = 'none';
        }
        else {
            bgvideo.style.display = 'block';
        }
    }
});

