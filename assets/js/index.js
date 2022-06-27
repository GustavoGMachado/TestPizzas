const pizzaArea = document.querySelector('.pizzaArea')
const menuArea = document.querySelector('.menuArea')

//map rodando todo o vetor de pizzas.js
pizzaJson.map((item, index) => {
    const pizzaAreaItem = pizzaArea.cloneNode(true)

    //colocando os valores na pag inicial
    pizzaAreaItem.setAttribute('key', index)
    pizzaAreaItem.querySelector(".pizzaArea-areaImg img").src = item.img
    pizzaAreaItem.querySelector('#pizzaArea-price').innerHTML = `R$ ${item.price[2].toFixed(2)}`
    pizzaAreaItem.querySelector('#pizzaArea-name').innerHTML = item.name
    pizzaAreaItem.querySelector('#pizzaArea-description').innerHTML = item.description
    
    //colocando valores na windowPizza
    pizzaAreaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault()
        let key = e.target.closest('.pizzaArea').getAttribute('key')

        document.querySelector('.box1-img img').src = pizzaJson[key].img
        document.querySelector('.box1-description .description-title').innerHTML = pizzaJson[key].name
        document.querySelector('.box1-description .description-text').innerHTML = pizzaJson[key].description

        //remover o selected caso ele esteja em outra div que não seja a do size "grande"
        document.querySelector('.sizeLineText.selected').classList.remove('selected')

        const sizeLineText = document.querySelectorAll('.sizeLineText')
        sizeLineText.forEach((itSizeText, ind) => {
            //setando tamanho grande por padrão
            if(ind === 2) {
                itSizeText.classList.add('selected')
            }
        })
        //conferir valores depois, pensar na ideida de juntar, aproveitar o forEach da sizeLine no priceLine
        const sizeLine = document.querySelectorAll('.sizeLine')
        sizeLine.forEach((itSize, ind) => {
            itSize.innerHTML = pizzaJson[key].sizes[ind]
        })
        const priceLine = document.querySelectorAll('.priceLine')
        priceLine.forEach((itPrice, ind) => {
            itPrice.innerHTML = `R$ ${pizzaJson[key].price[ind].toFixed(2)}`            
        })

     




        
        document.querySelector('.pizzaWindowArea').style.opacity = 0
        document.querySelector('.pizzaWindowArea').style.display = 'flex'
        setTimeout(() => {
            document.querySelector('.pizzaWindowArea').style.opacity = 1
        }, 250)
    })

    menuArea.append(pizzaAreaItem)
})