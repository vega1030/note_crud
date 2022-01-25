import {
    saveNote, getOneNote,onGetNote ,
    deleteNote,
    upDateNote
    } from './db_firebase.js'





const _private = new WeakMap()
let editStatus = false
class Product {
    constructor(product,amount,comment){
        
        this._product = product;
        this._amount = amount;
        this._comment = comment
        
        _private.set(this, amount)
    }

    //Product

    set product (newProduct){
        this._product = newProduct
    }
    get product(){
        return this._product}

    //price
    set amount(newAmount){
        _private.set(this)._amount = newAmount;
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

    uiAlert(flag){
        flag === true ? this.showMessage('Complete Fields Please','danger') :this.showMessage('Product Added Successfully','info')
}
    
}


//Listeners

document.getElementById('product_form')
.addEventListener('submit',(e)=>{    
    const productName = document.getElementById('product').value
    const amountValue = document.getElementById('amount').value
    const textArea = document.querySelector('.textAreaInput').value
    const ui = new Ui()
    const product = new Product(productName,amountValue,textArea)
    if (product._product === '' && product._amount === '') {
        ui.showMessage('Please, complete the fields', 'danger')
    }
    else{
        ui.showMessage('Complete successfully', 'success')
        saveNote(product)
        ui.resetForm()
    }
    e.preventDefault()
})

//Function for search of dates in the db, in real-time
const productList = document.getElementById('contentNotes')
    
    window.addEventListener('DOMContentLoaded', async ()=>{


        onGetNote((querySnapshot)=>{ 
            let viewDOM = ''           
            querySnapshot.forEach(doc=>{
                const notesDb =  doc.data()
                const idDbData = doc.id
                viewDOM += 
                `
                    <div class="dropdown style_dropdown contentViewNotes___dropdown">
                        <button class="btn btn-secondary dropdown-toggle btn_dropdown___style" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Ver
                        </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a class="dropdown-item" href="#">Product: <strong>${notesDb.product}</strong> </a></li>
                                <li><a class="dropdown-item" href="#"> Price: <strong>${notesDb.amount}</strong> </a></li>
                                <li><a class="dropdown-item" href="#"> Comment: <strong>${notesDb.comment}</strong> </a></li>
                            </ul>
                            <div class="content_basket">
                                <div class='ul_basquet'>   
                                    <img src="./icon/basket.svg" alt="basquet" name= 'delete' class ='delete_basquet' data-id='${idDbData}'></img>
                                    <img src="./icon/edit_icon.svg" alt='edit' name = 'edit' class='edit_data' data-id = '${idDbData}'></img>
                                </div>
                            </div>
                    </div>
                ` 
                productList.innerHTML = viewDOM
                const basquetDelete = productList.querySelectorAll('.delete_basquet')             

                basquetDelete.forEach(basquet=>{
                    basquet.addEventListener('click',({target:{dataset}})=>{
                        deleteNote(dataset.id)
                    })
                })

                basquetDelete.forEach(basquet=>{
                    basquet.addEventListener('click',({target:{dataset}})=>{
                        deleteNote(dataset.id)
                    })
                })

                const editNote = productList.querySelectorAll('.edit_data')
                editNote.forEach((edit)=>{
                    edit.addEventListener('click',async({target:{dataset}})=>{
                        const doc =  await getOneNote(dataset.id)
                        
                        const taskAutoComplete = doc.data()
                        
                        product_form['product'].value=taskAutoComplete.product
                        product_form['amount'].value=taskAutoComplete.amount
                        product_form['exampleFormControlTextarea1'].value = taskAutoComplete.comment
                    })
                })
        });
        })
    })

//Deleted info in UI

document.getElementById('contentNotes').addEventListener('click',(e)=>{
    //UI
    const productList = document.getElementById('contentNotes')
    const ui = new Ui()
    ui.deleteProduct(e.target)
})


