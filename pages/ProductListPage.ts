import {Page, Locator} from '@playwright/test'

export default class ProductListPage{
    readonly page:Page
    readonly addTocart:Locator
    readonly backTopdt:Locator
    readonly viewCart:Locator
    readonly removeItem1:Locator
    readonly heading:Locator
    readonly openMenu:Locator
    readonly logoutMenu:Locator

      constructor(page:Page)
    {
        this.page=page
        this.addTocart=this.page.getByRole('button',{name:'Add to cart'})
        this.backTopdt=this.page.locator('[data-test="back-to-products"]')
        this.viewCart=this.page.locator('[data-test="shopping-cart-link"]')
        this.removeItem1=this.page.locator('[data-test="remove-sauce-labs-backpack"]')
        this.heading=this.page.getByText('Products')
        this.openMenu=this.page.getByRole('button', { name: 'Open Menu' })
        this.logoutMenu=this.page.locator('[data-test="logout-sidebar-link"]')
    }

//Check Login is Success
  async isUserValid():Promise<Locator>
    {
         return this.heading
    }
    
//Add Item by Reading from JSON
 async AddItemtoCart(itemName:string)
    {  
        const item=this.page.getByAltText(`${itemName}`)
        await item.click()
        await this.addTocart.click()
        await this.backTopdt.click()

    }

 //View Cart
  async ViewCart()
    {
    
         await this.viewCart.click()
    }
//Logout from the Application
async Logout()
    {
        await this.openMenu.click();
        await this.logoutMenu.click();
        console.log('Logged Out from Application Successfully')

    }

}