const { test, expect } = require('@playwright/test');
const email = 'ada.pokorska@gmail.com'
const password = 'elotrelo320'

export class PageObjectsManager {
    constructor(page) {
        this.page = page
        this.userField = page.locator('#user')
        this.continueButton = page.locator('[class="button account-button button-green btn btn-success"]')
        this.boardModule = page.locator('[class="oTmCsFlPhDLGz2 AQ0dAIzWIJDFUU"]')
        this.passwordField = page.locator('#password')
        this.loginButton = page.getByRole('button', { name: 'Log in' })
    }

    async loginToTrello() {
        await this.page.goto("https://trello.com/login")
        await this.userField.fill(email)
        await this.continueButton.click()
        await this.passwordField.fill(password)
        await this.loginButton.click()        
        
    }
}
module.exports = { PageObjectsManager };