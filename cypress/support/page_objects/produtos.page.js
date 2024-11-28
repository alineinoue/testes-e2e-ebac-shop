class ProdutosPage {

    visitarUrlProdutos(){
        cy.visit('produtos')
    }

    buscarProduto(nomeProduto){
        cy.get('[name="s"]').eq(1).type(nomeProduto)
        cy.get('.button-search').eq(1).click()
    }

    addProdutoCarrinho(tamanho, cor, quantidade){
            cy.get('.button-variable-item-' + tamanho).click()
            cy.get(`.button-variable-item-${cor}`).click()
            cy.get('.input-text').clear().type(quantidade)
            cy.get('.single_add_to_cart_button').click()
    }

    acessarCarrinho(){
        cy.get('.top-cart-wishlist').click()
        cy.get('p.buttons a.button.checkout.wc-forward').eq(1).click()
    }

    
    limparCarrinho(){
        cy.get('.top-cart-wishlist').click()
        cy.get('.top-cart-wishlist').then(($productDetails) => {
            if ($productDetails.find('.product-details [aria-label="Remove this item"]').length > 0) {
                cy.get('.product-details [aria-label="Remove this item"]').click({ force: true, multiple: true });
                cy.wait(1000);
                cy.get('.widget_shopping_cart_content .cart_empty li').contains('You have no items in your shopping cart').should('exist');
            } else {
                cy.get('.widget_shopping_cart_content .cart_empty li').contains('You have no items in your shopping cart').should('exist');
            }
        });        
    }

}

export default new ProdutosPage()