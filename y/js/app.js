//------------@@@@@-------------
const _private = new WeakMap()

class Product {
    constructor(brand,price,comment){
        
        this._brand = brand;
        this._price = price;
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

    //comment
    set comment(newComment){
        this.comment =  newComment;
    }
    get comment(){
        return this._comment
    }

}

class Ui {
    
    resetForm(){
        document.getElementById('product_form').reset()
    }
    
    deleteProduct(element){
        if (element.name === 'delete'){
            element.parentElement.parentElement.parentElement.remove()
            this.showMessage('Product Deleted ok','danger')
        }
        
    }
    
    showMessage(message, cssClass){
        const div = document.createElement('div')
        div.className= `alert alert-${cssClass}`
        
        div.appendChild(document.createTextNode(message))
        // show message in DOM
        const container = document.querySelector('.contentMain')
        
        
        const app = document.querySelector('#App')
        
        //check insert-before error
        
        container.insertBefore(div,app)
        setTimeout(() => {
            document.querySelector('.alert').remove()
        },3000)
        
    }
    addProduct(productUi){
        const productList = document.getElementById('contentNotes')
        if (productUi._brand != '' || productUi._price != ''){
        productList.innerHTML += 
        `
            <div class="dropdown style_dropdown contentViewNotes___dropdown">
                <button class="btn btn-secondary dropdown-toggle btn_dropdown___style" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Ver
                </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item" href="#">Product: <strong>${productUi._brand}</strong> </a></li>
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
    this.showMessage('Product Added Successfully','info')
}else{
    
    this.showMessage('Complete Fields Please','danger')
}
    }
}


//Listeners

document.getElementById('product_form')
.addEventListener('submit',(e)=>{    
    const productName = document.getElementById('product').value
    const priceValue = document.getElementById('price').value
    const textArea = document.querySelector('.textAreaInput').value
    
    const product = new Product(productName,priceValue,textArea)
    const ui = new Ui()
    
    
    ui.addProduct(product, true)
    ui.resetForm()
    e.preventDefault()
})

document.getElementById('contentNotes').addEventListener('click',(e)=>{
    const ui = new Ui()
    ui.deleteProduct(e.target)
})



