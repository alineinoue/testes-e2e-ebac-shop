class LoginPage {

    visitarUrlLogin(){
        cy.visit('minha-conta/')
    }

    inserirLogin(){
        cy.login('aline.teste@teste.com', 'teste@123')
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('exist')
    }
}

export default new LoginPage()