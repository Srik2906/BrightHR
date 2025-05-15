import { expect } from "@playwright/test";

// BasePage class provides common reusable methods for UI interactions like navigation, clicking, filling inputs, and visibility checks

export class BasePage {
    constructor(page) {
        this.page = page
    }



    async navigateTo(url) {
        await this.page.goto(url)
    }

    async waitForElement(locator) {
        await expect(locator).toBeVisible()
    }

    async clickElement(locator) {
        await this.waitForElement(locator)
        await locator.click()
    }

    async fillInput(locator,value) {
        await this.waitForElement(locator)
        await locator.fill(value)
    }

    async getText(locator) {
        await this.waitForElement(locator)
        return await locator.textContent()
    }


}

