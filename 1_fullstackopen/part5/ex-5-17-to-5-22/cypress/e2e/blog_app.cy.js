describe('Note app', function () {

    beforeEach(() => {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')

        cy.request({
            method: 'POST',
            url: 'http://localhost:3003/api/users',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                'username': 'carley',
                'password': 'carley123'
            }
        })

        cy.visit('http://localhost:3000')
    })




    it('Login page is shown', function () {
        cy.visit('http://localhost:3000')
        cy.contains('Login to the application')
        cy.contains('Username')
        cy.contains('Password')
    })


    describe('Login', () => {
        it('succeeds with correct credentials', function () {
            cy.get('#username_input').type('carley')
            cy.get('#password_input').type('carley123')
            cy.get('#login_button').click()
            cy.contains('blogs') //Successful login directs to blogs page

        })

        it('fails with wrong credentials', function () {
            cy.get('#username_input').type('carley')
            cy.get('#password_input').type('barley123')
            cy.get('#login_button').click()
            cy.contains('Error => Invalid username and/or password')
            cy.contains('Error => Invalid username and/or password').should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })
})