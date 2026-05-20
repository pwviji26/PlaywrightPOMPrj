import {Page, Locator} from '@playwright/test'

export default class CartPage{
    readonly page:Page
    readonly items:Locator
    readonly contBtn:Locator
    readonly chkoutBtn:Locator
    readonly removeBtn:Locator

    constructor(page:Page)
    {
         this.page=page
         this.items= this.page.locator('div.cart_item')
         this.removeBtn=this.page.getByRole('button',{name:'Remove'})
         this.contBtn=this.page.getByRole('button',{name:'Continue Shopping'})
         this.chkoutBtn=this.page.getByRole('button',{name:'Checkout'})

    }
    
//Check Items in Cart
async itemsAdded():Promise<Locator>
{   
    return this.items
 }

//Remove Item and Continue Shopping 
async removenContShopping(pdttoDelete:string)
{   
    console.log('Product to be Deleted:'+ pdttoDelete)
    const row=this.items.filter({hasText:pdttoDelete}).first()
    await row.getByRole('button', { name: 'Remove' }).click();
    await this.contBtn.click()
 }


//CheckOut the Order
async checkOut()
{   
    await this.chkoutBtn.click()
 }


}