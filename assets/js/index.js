const pizzaArea = document.querySelector('.pizzaArea')
const menuArea = document.querySelector('.menuArea')

const windowNumberPizzas = document.querySelector('.box2-qntd-pizzas')
let qntdPizzasWindow = 1

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
// var botaoaaa = document.querySelector('.botaoaaa')
// botaoaaa.addEventListener('click', (e) => {
//     let keyOfCheckboxes = []
//     const checkboxAdditionals = document.querySelectorAll('.box2-additional div .additionalsCheckbox')
//     checkboxAdditionals.forEach((el) => {
//         if(el.checked) {
//             keyOfCheckboxes.push(el.getAttribute('key'))
//         }
//     })
//     console.log(keyOfCheckboxes)
// })



//removendo/adicionando qntd de pizzas
document.querySelector('.box2-qntd-').addEventListener('click', () => {
    if (qntdPizzasWindow > 1) {
        qntdPizzasWindow--
    }
    windowNumberPizzas.innerHTML = qntdPizzasWindow
})
document.querySelector('.box2-qntd--').addEventListener('click', () => {
    qntdPizzasWindow++
    windowNumberPizzas.innerHTML = qntdPizzasWindow
})

//setando o tamanho da pizza
document.querySelectorAll('.sizeLineText').forEach((itSizeText, ind) => {    
    itSizeText.addEventListener('click', (e) => {
        document.querySelector('.sizeLineText.selected').classList.remove('selected')
        itSizeText.classList.add('selected')
    })
})



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
















