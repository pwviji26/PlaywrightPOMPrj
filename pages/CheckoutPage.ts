import {Page, Locator, expect} from '@playwright/test'

export default class CheckoutPage{
    readonly page:Page
    readonly Fname:Locator
    readonly Lname:Locator
    readonly Postalcd:Locator
    readonly continueBtn:Locator
    readonly cancelBtn:Locator
    readonly ptitle:Locator

    constructor(page:Page)
    {
         this.page=page
         this.ptitle=this.page.getByText('Checkout: Your Information')
         this.Fname= this.page.getByPlaceholder('First Name')
         this.Lname= this.page.getByPlaceholder('Last Name')
         this.Postalcd= this.page.getByPlaceholder('Zip/Postal Code')
         this.continueBtn=this.page.getByRole('button',{name:'Continue'})
         this.cancelBtn=this.page.getByRole('button',{name:'Cancel'})

    }

//Validate Checkout Page Header
async chkoutpageTitle():Promise<Locator>
    {
         return this.ptitle
    }

//Cancel from Checkout and Continue Shopping
async CancelChkOut()
{      
    await this.cancelBtn.click()
 }

//Submit the Order with details from JSON
async submit(FName: string,LName: string,Postal: string)
{   
   
    await this.Fname.fill(FName)  
    await this.Lname.fill(LName)
    await this.Postalcd.fill(Postal)
    await this.continueBtn.click()
 }
}