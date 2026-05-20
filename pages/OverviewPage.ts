import {Page, Locator, expect} from '@playwright/test'

export default class CheckoutPage{
    readonly page:Page
    readonly itemTotal:Locator
    readonly Total:Locator
    readonly Tax:Locator
    readonly paymentInfo:Locator
    readonly shippingInfo:Locator
    readonly cancelBtn:Locator
    readonly Overviewtitle:Locator
    readonly finishBtn:Locator
    readonly chkoutCompletetitle:Locator
    readonly confirmMsg:Locator
    readonly despatchMsg:Locator

    constructor(page:Page)
    {
         this.page=page
         this.Overviewtitle=this.page.getByText('Checkout: Overview')
         this.paymentInfo= this.page.locator('[data-test="payment-info-value"]')
         this.shippingInfo= this.page.locator('[data-test="shipping-info-value"]')
         this.itemTotal=this.page.locator('[data-test="subtotal-label"]')
         this.Total= this.page.locator('[data-test="total-label"]')
         this.Tax= this.page.locator('[data-test="tax-label"]')
         this.finishBtn=this.page.getByRole('button',{name:'Finish'})
         this.cancelBtn=this.page.getByRole('button',{name:'Cancel'})
         this.chkoutCompletetitle=this.page.locator('[data-test="title"]')
         this.confirmMsg=this.page.locator('[data-test="complete-header"]')
         this.despatchMsg=this.page.locator('[data-test="complete-text"]')


    }

//Validate Overview Page Header
async chkOverviewTitle():Promise<Locator>
    {
         return this.Overviewtitle
    }

    
//Cancel from Overview and Back to Products Page
async CancelOverviewChkOut()
{      
    await this.cancelBtn.click()
 }

//Finish the Order from Overview Page
async Finsh()
{   
    await expect(this.paymentInfo).toContainText('SauceCard #31337');
    await expect(this.shippingInfo).toContainText('Free Pony Express Delivery!');
    console.log('Payment Information:'+ await this.paymentInfo.textContent())    
    console.log('Shipping Information:'+ await this.shippingInfo.textContent()) 
    console.log(await this.itemTotal.textContent())
    console.log(await this.Tax.textContent())
    console.log(await this.Total.textContent())
    const itmtotal=Number((await this.itemTotal.textContent())?.slice(-5))
    const Taxvalue = Number((await this.Tax.textContent())?.slice(-4))
    const finalTotal=Number((await this.Total.textContent())?.slice(-5))
    expect(finalTotal).toBe(itmtotal + Taxvalue)
    await this.finishBtn.click()
//Checkout: Complete Page Assertion
    await expect(this.chkoutCompletetitle).toBeVisible();
    await expect(this.confirmMsg).toBeVisible();
    await expect(this.despatchMsg).toBeVisible();
//Back to Home  
    await this.page.getByRole('button',{name:'Back Home'}).click();

   }
}