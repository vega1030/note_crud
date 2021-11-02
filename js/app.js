'use strict'


const _private = new WeakMap()

class Product {
    constructor(brand,price,amount,comment){
        
        this._brand = brand;
        this._price = price;
        this._amount = amount
        this._comment = comment
        
        _private.set(this, price)
    }

    //brand

    set brand (newBrand){
        this._brand = newBrand
    }
    get brand(){
        return this._brand}

    //price
    set price(newPrice){
        _private.set(this)._price = newPrice;
    }
    get price() {
        return this._price
    }

    //amount
    set amount(newAmount){
        this.amount = newAmount;
    }
    get amount() {
        return this._amount
    }

    //comment
    set comment(newComment){
        this.comment =  newComment;
    }
    get comment(){
        return this._comment
    }

}

class Ui {
    addProduct(productUi){
        const productList = document.getElementById('contentNotes')
        // const productListChild = document.createElement('div')  
            productList.innerHTML += `
            <div class="dropdown style_dropdown">
                <button class="btn btn-secondary dropdown-toggle btn_dropdown___style" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Ver
                </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item" href="#">Product: <strong>${productUi._brand}</strong> </a></li>
                        <li><a class="dropdown-item" href="#">Amount: <strong>${productUi._amount}</strong>  </a></li>
                        <li><a class="dropdown-item" href="#"> Price: <strong>${productUi._price}</strong> </a></li>
                        <li><a class="dropdown-item" href="#"> Comment: <strong>${productUi._comment}</strong> </a></li>
                    </ul>
                    <div class="content_basket">
                    <div class='ul_basquet'>                    
                            <img src="./icon/basket.svg" alt="" name= 'delete'></img>
                    </div>
                    </div>
            </div>
        ` 
    }

    resetForm(){
        document.getElementById('product_form').reset()
    }

    deleteProduct(element){
        if (element.name === 'delete'){
            console.log(element.parentElement.parentElement.parentElement.remove())
        }


    }

    showMessage(){


    }
}


//Listeners

document.getElementById('product_form')
.addEventListener('submit',(e)=>{    
    const productName = document.getElementById('product').value
    const amountValue = document.getElementById('amount').value
    const priceValue = document.getElementById('price').value
    const textArea = document.querySelector('.textAreaInput').value
    
    const product = new Product(productName,priceValue,amountValue,textArea)
    
    //Instant of class Ui
    const ui = new Ui()

    ui.addProduct(product, true)
    ui.resetForm()
    e.preventDefault()

})

document.getElementById('contentNotes').addEventListener('click',(e)=>{
    console.log(e.target)
    const ui = new Ui()
    ui.deleteProduct(e.target)
})



