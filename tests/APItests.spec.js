const { test } = require('@playwright/test')
const { APIManager } = require('../support/APImanager')
const { PageObjectsManager } = require('../support/pageObjectsManager')
const boardName = 'New Board'
const listName = 'New List'
const cardName = 'New Card'

test.describe('API tests in Trello', async () => {

     test.beforeEach(async ({page}) => {
    const pageObjectsManager = new PageObjectsManager(page)
    await pageObjectsManager.loginToTrello()
     })


    test('Trello', async ({ request }) => {
        const apiManager = new APIManager(request)
        await apiManager.createNewBoard(boardName)
        await apiManager.createList(listName)
        await apiManager.getListId()
        await apiManager.createCard(cardName)
        await apiManager.deleteBoard()
    })

    test.only('ggt', async ({ page }) => {
        const pageObjectsManager = new PageObjectsManager(page)
    await pageObjectsManager.loginToTrello()
    })
})