class CheckoutPage{

    preencherOpcoes(nomeEndereco, nomeCidade, cep, numTelefone){
        cy.get('#billing_address_1').clear().type(nomeEndereco)
        cy.get('#billing_city').clear().type(nomeCidade)
        cy.get('#billing_postcode').clear().type(cep)
        cy.get('#billing_phone').clear().type(numTelefone)
    }

    finalizarCompra(){
        cy.get('#terms').click()
        cy.get('#place_order').click()
    }

    pedidoFinalizado(){
        cy.wait(10000)
        cy.get('.page-title').should('have.text', 'Pedido recebido')
        cy.get('.woocommerce-notice').should('have.text', 'Obrigado. Seu pedido foi recebido.')
    }
}

export default new CheckoutPage()