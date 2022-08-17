describe('Note app', function () {

    beforeEach(() => {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.visit('http://localhost:3000')
    })


    it('Login page is shown', function () {
        cy.visit('http://localhost:3000')
        cy.contains('Login to the application')
        cy.contains('Username')
        cy.contains('Password')
    })
})