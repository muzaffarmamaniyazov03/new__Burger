const product = {
    crazy: {
        name: "Crazy",
        price: 31000,
        amount: 0,
        img: "images/burger_1.png",
        get Summ() {
            return this.price * this.amount
        }
    },
    light: {
        name: "Light",
        price: 26000,
        amount: 0,
        img: "images/burger_2.png",
        get Summ() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: "CheeseBurger",
        price: 29000,
        amount: 0,
        img: "images/burger_3.png",
        get Summ() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: "dBurger",
        price: 24000,
        amount: 0,
        img: "images/burger_4.png",
        get Summ() {
            return this.price * this.amount
        }
    },
}

const btns = document.querySelectorAll('.card__shop'),
    shopImg = document.querySelector('.shop__img'),
    basket = document.querySelector('.basket'),
    basketClose = document.querySelector('.basket__close'),
    shopItem = document.querySelector('.shop__item'),
    basketBox = document.querySelector('.basket__box'),
    basketDesc = document.querySelector('.basket__total');

btns.forEach(btn => {
    btn.addEventListener("click", function () {
        addCard(this)
    })
});
function addCard(btn) {
    const parent = btn.closest(".card"),
        cardId = parent.getAttribute("id")
    product[cardId].amount++
    basketInfo()
}
function basketInfo() {
    const productArr = []

    for (const key in product) {
        const pk = product[key]
        const productCard = document.querySelector(`#${pk.name.toLowerCase()}`),
            span = productCard.querySelector(".card__item")
        if (pk.amount) {
            span.classList.add("active")
            span.innerHTML = pk.amount
            productArr.unshift(pk)

        } else {
            span.classList.remove("active")
        }
    }
    basketBox.innerHTML = ""
    for (let i = 0; i < productArr.length; i++) {
        shopItem.innerHTML = i + 1
        basketBox.innerHTML += basketCard(productArr[i])
    }
    basketDesc.innerHTML = totalSumm()
    const allAmount = totalAmount()
    if (allAmount) {
        shopItem.classList.add("active")
    } else {
        shopItem.classList.remove("active")
    }

}
function totalSumm() {
    let total = 0
    for (const key in product) {
        total += product[key].Summ
    }
    return total.toLocaleString() + " сум"
}
function totalAmount() {
    let amount = 0
    for (const key in product) {
        amount += product[key].amount
    }
    return amount
}

function basketCard(card) {
    const { name, Summ, amount, img } = card
    return `  
    <div class="basket__card">
        <img src="${img}" alt=""
            class="basket__img">
        <div class="basket__info">
            <h2 class="basket__title">${name}</h2>
            <p class="basket__price"> ${Summ.toLocaleString()} сум</p>
        </div>
        <div class="basket__btns" id="${name.toLowerCase()}_card">
            <button class="basket__sym" >-</button>
            <p class="basket__amount">${amount}</p>
            <button class="basket__sym" >+</button>
        </div>
    </div>`
}

window.addEventListener("click", (e) => {
    const btn = e.target
    if (btn.classList.contains("basket__sym")) {
        const parent = btn.closest(".basket__btns"),
            parentId = parent.getAttribute("id").split("_")[0]
        if (btn.innerHTML == "+") product[parentId].amount++
        else if (btn.innerHTML == "-") product[parentId].amount--
        basketInfo()
    }
})

shopImg.addEventListener("click", () => {
    basket.classList.toggle("active")
})
basketClose.addEventListener("click", () => {
    basket.classList.remove("active")
})


const cardImg = document.querySelectorAll('.card__img'),
    headerImg = document.querySelector('.header__img');
cardImg.forEach(img => {
    img.addEventListener("click", () => {
        let imgAtt = img.getAttribute("src")
        headerImg.style.opacity = "0"
        setTimeout(() => {
            headerImg.setAttribute("src", imgAtt)
            headerImg.style.opacity = "1"
        }, 300);
    })
})

const basketBtn = document.querySelector('.basket__bottom'),
    printMain = document.querySelector('.print__main'),
    printTotal = document.querySelector('.print__total');
basketBtn.style.cursor = 'pointer'
basketBtn.onclick = () => {
    printMain.innerHTML =""
    for (const key in product) {
        const { name, amount, Summ } = product[key]
       if (amount) {
            printMain.innerHTML += `
            <div class="print__main-item">
                <p class="print__main-name">
                    <span>${name}</span>
                    <span>${amount}</span>
                </p>
                <div class="prit__main-summ">
                    ${Summ}
                </div>
            </div>`
       }
    }
    printTotal.innerHTML = totalSumm() 
    window.print()
}