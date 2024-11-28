/// <reference types="cypress"/>
import { faker } from '@faker-js/faker';

import checkoutPage from "../support/page_objects/checkout.page.js";
import loginPage from "../support/page_objects/login.page.js";
import produtosPage from "../support/page_objects/produtos.page.js"

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        loginPage.visitarUrlLogin()
        loginPage.inserirLogin()
        produtosPage.limparCarrinho()
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        //Fluxo de Adicionar produto ao carrinho
        cy.fixture('produtos').then(produtos => {
            produtos.forEach(produto => {
                produtosPage.buscarProduto(produto.nomeProduto);
                produtosPage.addProdutoCarrinho(
                    produto.tamanho, 
                    produto.cor, 
                    produto.quantidade
                );
            });
        });        

        //Fluxo Checkout
        produtosPage.acessarCarrinho()
        checkoutPage.preencherOpcoes(
            faker.address.streetAddress(),
            faker.address.cityName(),
            '72509-506',
            '(84) 8539-5427'       
        );

        //Validar pedido finalizado
        checkoutPage.finalizarCompra()
        checkoutPage.pedidoFinalizado()
    });


})
