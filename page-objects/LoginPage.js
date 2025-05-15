import { BasePage } from '../page-objects/BasePage';
import { expect } from '@playwright/test';
import dotenv from 'dotenv'
import playwrightConfig from '../playwright.config';
import { logStep,logSuccess,logError } from '../utils/logger';
dotenv.config()

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

export class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        //locators of login page
        this.emailInput = page.locator('#username')
        this.passwordInput = page.locator('#password')
        this.loginButton = page.locator('button[type="submit"]')
    }

    //function to login into the appp
    async login() {
        const loginURL = playwrightConfig.use.baseURL.replace('app','login')
        logStep('Logging in to Bright HR portal..')
        try{
        await this.navigateTo(loginURL)
        await this.fillInput(this.emailInput, email)
        await this.fillInput(this.passwordInput, password);
        await this.clickElement(this.loginButton);
        await this.page.waitForURL(/.*dashboard/, { timeout: 30000 })

        //assertion to ensure that user has landed on dashboard
        await expect(this.page).toHaveURL(/.*dashboard/)
        logSuccess('Logged in successfully..')
        }
        catch(err){
            logError(`Failed to login. Error${err.message}`)
            throw err
        }

    }


}