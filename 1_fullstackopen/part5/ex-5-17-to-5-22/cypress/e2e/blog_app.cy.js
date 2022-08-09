describe('Note app', function () {
    it('front page can be opened', function () {
        cy.visit('http://localhost:3000')
        cy.contains('Login to the application')
        cy.contains('Username')
        cy.contains('Password')
    })
})