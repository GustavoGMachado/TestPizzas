const pizzaArea = document.querySelector('.pizzaArea')
const menuArea = document.querySelector('.menuArea')


const windowNumberPizzas = document.querySelector('.box2-qntd-pizzas')
let qntdPizzasWindow = 1
let keyOfPizzaJson = 0
let shoppingCart = []

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
        keyOfPizzaJson = key

        createInput(pizzaJson[key].additional.split(','))

        document.querySelector('.box1-img img').src = pizzaJson[key].img
        document.querySelector('.box1-description .description-title').innerHTML = pizzaJson[key].name
        document.querySelector('.box1-description .description-text').innerHTML = pizzaJson[key].description
        qntdPizzasWindow = 1
        windowNumberPizzas.innerHTML = qntdPizzasWindow

        //remover o selected caso ele esteja em outra div que não seja a do size "grande"
        document.querySelector('.sizeLineText.selected').classList.remove('selected')

        const sizeLineText = document.querySelectorAll('.sizeLineText')
        sizeLineText.forEach((itSizeText, ind) => {
            //setando tamanho e preço da grande por padrão
            if(ind === 2) {
                itSizeText.classList.add('selected')
                document.querySelector('.box2-spaces span').innerHTML = `R$ ${pizzaJson[key].price[2].toFixed(2)}`
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

const additionalItemArea = document.querySelector('.box2-additional div')



// clonando os additionals a partir de um item criado no HTML como display:none
function createInput(additionals) {
    const itemAdditionalDiv = document.querySelector('.itemAdditional')
    additionals.forEach((itemAdd,indAdd) => {
        const itemAdditionalClone = itemAdditionalDiv.cloneNode(true)
        itemAdditionalClone.querySelector('.additionalsCheckbox').setAttribute('key', indAdd)
        itemAdditionalClone.querySelector('.itemAdditional span').innerHTML = itemAdd

        additionalItemArea.appendChild(itemAdditionalClone)
    })
}
// capturando as keys das checkboxes dos additionals marcadas
function getAdditionals() {
    let keyOfCheckboxes = []
    const checkboxAdditionals = document.querySelectorAll('.box2-additional div .additionalsCheckbox')
    checkboxAdditionals.forEach((el) => {
        if(el.checked) {
            keyOfCheckboxes.push(el.getAttribute('key'))
        }
    })
    return keyOfCheckboxes
}



//removendo/adicionando qntd de pizzas
document.querySelector('.box2-qntd-').addEventListener('click', () => {
    if (qntdPizzasWindow > 1) {
        qntdPizzasWindow--
    }
    windowNumberPizzas.innerHTML = qntdPizzasWindow
    setPreçoBox3()
})
document.querySelector('.box2-qntd--').addEventListener('click', () => {
    qntdPizzasWindow++
    windowNumberPizzas.innerHTML = qntdPizzasWindow
    setPreçoBox3()
})

//setando o tamanho da pizza
document.querySelectorAll('.sizeLineText').forEach((itSizeText, ind) => {    
    itSizeText.addEventListener('click', (e) => {
        document.querySelector('.sizeLineText.selected').classList.remove('selected')
        itSizeText.classList.add('selected')
        setPreçoBox3()
    })
})
//mexendo no preço da pizza no box2-price
function setPreçoBox3() {
    document.querySelectorAll('.sizeLineText').forEach((itSizeText, ind) => {    
        let selectedSize = itSizeText.classList.contains('selected')      
        if(selectedSize) {
            document.querySelector('.box2-spaces span').innerHTML = `R$ ${(pizzaJson[keyOfPizzaJson].price[ind] * qntdPizzasWindow).toFixed(2)}`
        }
    })
}



//fechando a window do pedido
function closePizzaWindow() {
    document.querySelector('.pizzaWindowArea').style.opacity = 0
    setTimeout(() => {
        document.querySelector('.pizzaWindowArea').style.display = 'none'
    }, 250)
    removeAdditionalClone()
}
function removeAdditionalClone() {
    const itemAdditionalDiv = document.querySelectorAll('.box2-additional .itemAdditional')
    itemAdditionalDiv.forEach((itemAdds)=>{
        additionalItemArea.removeChild(itemAdds)
    })
}
document.querySelector('.box3-cancel').addEventListener('click', closePizzaWindow)



//adicionando no carrinho
document.querySelector('.box3-add').addEventListener('click', () => {
    //getando o valor
    let priceInBox2 = document.querySelector('.box2-spaces span').innerHTML.replace('R$ ','')
    //getando o tamanho
    let sizeInBox2 = document.querySelector('.sizeLineText.selected').getAttribute('data-key')
    
    //getando os adicionais
    let cap = getAdditionals()

    //setando identifier para ver se a pizza configurada já existe no carrinho, se sim, ++ em qntd
        //criando um código para a pizza
        let identifier = pizzaJson[keyOfPizzaJson].id +'@'+sizeInBox2
        for (let i of cap) {
            identifier += '&' + i
        }

        //conferindo se esse código já existe em algum objeto dentro do array shoppingCart
        let key = shoppingCart.findIndex((item) => {
            //se caso existir, retorna o indice no array shopping cart, se nao retorna -1
            return item.identifier === identifier
        })

        if(key > -1) {
            shoppingCart[key].qntd += qntdPizzasWindow
        } else {
            shoppingCart.push({
                identifier,
                id: pizzaJson[keyOfPizzaJson],
                size: sizeInBox2,
                qntd: qntdPizzasWindow,
                price: Number(priceInBox2),
                additionals: cap
            })
        }
    
    closePizzaWindow()
})


const menuCartAreaPizzasItem = document.querySelector('.menuCartAreaPizzas-item')
const menuCartAreaPizzasSpace = document.querySelector('#menuCartAreaPizzas')
function uptadeCart() {
    if (shoppingCart.length > 0) {
        document.querySelector('.menuCart').classList.remove('menuCartNone')
        shoppingCart.forEach((it, ind) => {
            const itemCartClone = menuCartAreaPizzasItem.cloneNode(true)
            
            menuCartAreaPizzasSpace.append(itemCartClone)
        })
    } else {
        document.querySelector('.menuCart').classList.add('menuCartNone')

    }
}














