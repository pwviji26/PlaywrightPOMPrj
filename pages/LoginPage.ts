import {Page, Locator} from '@playwright/test'

export default class Loginpage{
    readonly page:Page
    readonly emailInp:Locator
    readonly pwdInp:Locator
    readonly loginBtn:Locator

    constructor(page:Page)
    {
        this.page=page
        this.emailInp=this.page.getByPlaceholder('Username')
        this.pwdInp=this.page.getByPlaceholder('Password')
        this.loginBtn=this.page.getByRole('button', {name: 'Login'})
    }

//Login to Application
async loginIntoApp(strUser: string,strPwd: string  )
    {
    await this.emailInp.fill(strUser)  
    await this.pwdInp.fill(strPwd)
    await this.loginBtn.click()
 }
}