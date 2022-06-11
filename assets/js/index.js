const pizzaArea = document.querySelector('.pizzaArea')
const menuArea = document.querySelector('.menuArea')

pizzaJson.map((item, index) => {
    const pizzaAreaItem = pizzaArea.cloneNode(true)

    pizzaAreaItem.setAttribute('key', index)
    pizzaAreaItem.querySelector(".pizzaArea-areaImg img").src = item.img
    pizzaAreaItem.querySelector('#pizzaArea-price').innerHTML = `R$ ${item.price[2].toFixed(2)}`
    pizzaAreaItem.querySelector('#pizzaArea-name').innerHTML = item.name
    pizzaAreaItem.querySelector('#pizzaArea-description').innerHTML = item.description
    pizzaAreaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault()
        let key = e.target.closest('.pizzaArea').getAttribute('key')

        //colocar valores na windowPizza
        document.querySelector('.box1-img img').src = pizzaJson[key].img
        document.querySelector('.box1-description .description-title').innerHTML = pizzaJson[key].name
        document.querySelector('.box1-description .description-text').innerHTML = pizzaJson[key].description


        
        document.querySelector('.pizzaWindowArea').style.opacity = 0
        document.querySelector('.pizzaWindowArea').style.display = 'flex'
        setTimeout(() => {
            document.querySelector('.pizzaWindowArea').style.opacity = 1
        }, 250)
    })

    menuArea.append(pizzaAreaItem)
})