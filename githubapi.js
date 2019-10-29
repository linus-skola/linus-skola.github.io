const app = document.getElementById('one')

//const article = document.createElement('article')

//app.appendChild(article)

var request = new XMLHttpRequest()
request.open('GET', 'https://api.github.com/users/linus-skola/repos', true)
request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
  if (request.status >= 200 && request.status < 400) {
    data.forEach(repo => {
        const article = document.createElement('article')
        //card.setAttribute('style', 'card')
        
        const span = document.createElement('span')
        span.setAttribute('class', 'image')

        const img = document.createElement('img')
        img.setAttribute('src', 'images/pic02.jpg')

        const header = document.createElement('header')
        header.setAttribute('class', 'major')
        
        const h3 = document.createElement('h3')
        //h1.textContent = repo.name


        var url = "https://github.com/linus-skola/"
        const a = document.createElement('a');
        a.textContent = repo.name;
        a.href = url + repo.name;
        a.className = 'link';

        const bga = document.createElement('a');
        bga.href = url + repo.name;
        bga.className = 'link primary';

        //const href = document.createElement('a')
        //href.setAttribute('href', 'landing.html')
        //href.setAttribute('class', 'link')
  
        const p = document.createElement('p')
        repo.description = repo.description.substring(0, 300)
        p.textContent = repo.description
  
        app.appendChild(article)
        article.appendChild(span)
        article.appendChild(header)
        article.appendChild(bga)
        span.appendChild(img)
        header.appendChild(h3)
        h3.appendChild(a)
        header.appendChild(p)
    })
  } else {
    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = `Gah, it's not working!`
    app.appendChild(errorMessage)
  }
}

request.send()