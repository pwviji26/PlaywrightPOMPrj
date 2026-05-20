import {test,expect} from '@playwright/test'
import LoginPage from '../pages/LoginPage'
import ProductListPage from '../pages/ProductListPage'
import CartPage from '../pages/CartPage'
import CheckoutPage  from '../pages/CheckoutPage'
import OverviewPage from '../pages/OverviewPage'
import {items} from '../testData/items.json'
import {address} from '../testData/items.json'

test.describe('Place Order:',()=>
{
    let loginPage:  LoginPage
    let pdtlistPage: ProductListPage
    let cartordPage: CartPage
    let chkoutPage:CheckoutPage
    let overviewPage:OverviewPage
   
    test.beforeEach(async({page})=>
    {
        await page.goto('/')
        loginPage= new LoginPage(page)
        pdtlistPage= new ProductListPage(page)
        cartordPage= new CartPage(page)
        chkoutPage= new CheckoutPage(page)
        overviewPage=new OverviewPage(page)
        await loginPage.loginIntoApp('standard_user','secret_sauce')
        console.log('Logged in with standard_user')
        await expect(await pdtlistPage.isUserValid()).toBeVisible()
    })

test('Check Out Item',async({page})=>
    {
//Adding Items
        await pdtlistPage.AddItemtoCart(items[0].name)
        await pdtlistPage.AddItemtoCart(items[1].name)
        await pdtlistPage.AddItemtoCart(items[2].name)
//Navigating to Cart        
        await pdtlistPage.ViewCart()
        const itemCount= await(await cartordPage.itemsAdded()).count()
        console.log('No of Items in Cart:'+itemCount)
//Removing 2nd Item from Cart        
        await cartordPage.removenContShopping(items[1].name)
        await expect(await pdtlistPage.isUserValid()).toBeVisible()
//Adding the removed item again        
        await pdtlistPage.AddItemtoCart(items[1].name)
        console.log('Product added again to Cart:'+ items[1].name)
//Navigating to Cart Again
        await pdtlistPage.ViewCart()
        if(itemCount>0){
            console.log('No of Items in Cart after Remove and Adding:'+itemCount)
//Continue from to Cart 
            await cartordPage.checkOut()
        }
        await expect(await chkoutPage.chkoutpageTitle()).toBeVisible()
//Cancel from Checkout Page        
        await chkoutPage.CancelChkOut()
        console.log('No of Items in Cart on Return from Checkout:'+itemCount)
//Continue from to Cart Again
        await cartordPage.checkOut()
//Continue from Checkout Page 
        await chkoutPage.submit(address.FName,address.LName,address.Postal)
        await expect(await overviewPage.chkOverviewTitle()).toBeVisible() 
//Cancel from Overview Page    
        await overviewPage.CancelOverviewChkOut()
        await expect(await pdtlistPage.isUserValid()).toBeVisible()
//Continue from Product Page 
        await pdtlistPage.ViewCart()
//Continue from Cart Page 
        await cartordPage.checkOut()
//Continue from Checkout Page 
        await chkoutPage.submit(address.FName,address.LName,address.Postal)
//Continue from Overview Page   
        await overviewPage.Finsh()  
//Back to Home  
        await expect(await pdtlistPage.isUserValid()).toBeVisible()  
//Log out from Application
        await pdtlistPage.Logout()
    })
})