import {
    saveNote, getOneNote,onGetNote ,
    deleteNote,
    upDateNote
    } from './db_firebase.js'

let editStatus = false
let id = ''


const _private = new WeakMap()
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


//***************** Logic for view of dates in the DOM (in real-time) */

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
                                <li><a class="dropdown-item" href="#"> Amount: <strong>${notesDb.amount}</strong> </a></li>
                                <li><a class="dropdown-item" href="#"> Comment: <strong>${notesDb.comment}</strong> </a></li>
                            </ul>
                            <div class="content_basket">
                                <div class='ul_basquet'>   
                                    <img src="./icon/basket.svg" alt="basquet" name= 'delete' class ='delete_basquet' data-id='${idDbData}'></img>
                                    <img src="./icon/edit_icon.svg" alt='edit' name = 'edit' class='edit_data' data-id = '${idDbData}'></img>
                                </div>
                            </div>
                    </div>
                    <div>
                        <ul>
                            <li>
                            Product: <strong>${notesDb.product}</strong>
                            </li>
                            <li>
                            Amount: <strong>${notesDb.amount}</strong>
                            </li>
                            <li>
                            Comment: <strong>${notesDb.comment}</strong>
                            </li>
                        </ul>
                    </div>
                ` 

//***************** Logic for delete dates in Firestore */

                productList.innerHTML = viewDOM
                const basquetDelete = productList.querySelectorAll('.delete_basquet')             
                basquetDelete.forEach(basquet=>{
                    basquet.addEventListener('click',({target:{dataset}})=>{
                        deleteNote(dataset.id)
                    })
                })

//***************** Logic for edit dates in Firestore */

                const editNote = productList.querySelectorAll('.edit_data')
                editNote.forEach((edit)=>{
                    edit.addEventListener('click',async({target:{dataset}})=>{
                        const doc =  await getOneNote(dataset.id)
                        
                        const taskAutoComplete = doc.data()
                        
                        product_form['product'].value=taskAutoComplete.product
                        product_form['amount'].value=taskAutoComplete.amount
                        product_form['exampleFormControlTextarea1'].value = taskAutoComplete.comment
                        
                        editStatus = true
                        id = doc.id
                        product_form['btnSubmit'].innerText = 'Update'
                    })
                })
        });
        })
    })

    //***************** Logic for save dates in Firestore */


    document.getElementById('product_form')
    .addEventListener('submit',(e)=>{    
        const productName = document.getElementById('product').value
        const amountValue = document.getElementById('amount').value
        const textArea = document.querySelector('.textAreaInput').value
        const ui = new Ui()
        const product = new Product(productName,amountValue,textArea)
    
        //***************** Condition for update data or save data in firebase */
        if(!editStatus){
            saveNote(product)
        }
        else{
            upDateNote(id,{product: product.product,amount: product.amount,comment: product.comment})
            editStatus = false
        }
        
        ui.resetForm()   
        e.preventDefault()
        
    })

//Deleted info in UI

document.getElementById('contentNotes').addEventListener('click',(e)=>{
    //UI
    
    const productList = document.getElementById('contentNotes')
    const ui = new Ui()
    ui.deleteProduct(e.target)
})


