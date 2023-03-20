const { expect, request } = require('@playwright/test')
//require('dotenv').config()


export class APIManager {
    constructor(request) {
        this.request = request
        this.key = 'ea7393ce9f29f50b262a4b873c79392c'
        this.token = '5a3f21725364946145ed1818e8e26a0a1e629ed75c943dfbb6616ab58189bcbe'
        this.board = {}
        this.listId
    }
    async createBoard(boardName) {
        const responseBoard = await this.request.post("https://trello.com/1/boards", {
            data: {
                name: boardName,
                key: this.key,
                token: this.token
            }
        })
    expect (responseBoard.ok()).toBeTruthy()
    expect (responseBoard.status()).toBe(200)
    const responseBoardJson = await responseBoard.json()
    expect(await responseBoardJson.closed).toEqual(false)
    expect(await responseBoardJson.prefs.permissionLevel).toEqual('private')
    this.board.id = responseBoardJson.id
    }
    async deleteBoard() {
        const responseDelete = await this.request.delete("https://trello.com/1/boards/${this.board.id}",
        {
         data: {
             key: this.key,
             token: this.token
         }
        })
        const responseDeleteBoard = await responseDelete.json()
        expect (responseDeleteBoard.status()).toBe(200)
     }
    async createList(listName) {
        const responseList = await this.request.post("https://trello.com/1/lists/",
        {
            data:{
                name: listName,
                idBoard: this.board.id,
                key: this.key,
                token: this.token

            }
        })
        const responseListJson = await responseList.json()
        expect (responseListJson.status()).toBe(200)
        expect (responseListJson.name()).toBe(listName)
        this.listId = responseListJson.id
        return this.listId
    }
    async getListId() {
        const getListResponse = await this.request.get("https://trello.com/1/boards/${this.board.id}/lists", {
            data: {
                key: this.key,
                token: this.token,
            }
        })
        expect(await getListResponse.status()).toBe(200)
        const getListResponseJson = await getListResponse.json()
        this.ListId = getListResponseJson[listNumber].id
        return this.ListId
    }
    async createCard(cardName) {
        const responseCard = await this.request.post("https://trello.com/1/cards/",
        {
            data:{
                name: cardName,
                idList: this.ListId.id,
                key: this.key,
                token: this.token

            }
        })
        const responseCardJson = await responseCard.json()
        expect (responseCardJson.status()).toBe(200)
        expect (responseCardJson.name()).toBe(cardName)
    } 
    }
 module.exports = { APIManager };