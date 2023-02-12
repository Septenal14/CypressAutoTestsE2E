import Orders from '../pages/orders'
const art = '72602257'
describe('е2е добавление товара в избранное', () => {
  const orders = new Orders()
    it('заказ на добавление в избранное', () => {
      cy.visit('https://app.wbprod.ru/auth')
      cy.viewport(1920, 1080)
      orders.login()
      cy.contains("Товар в избранное").click()
      orders.typeArtProductLikes().type(`${art}`)
      cy.get('.gap-12 > .v-btn--is-elevated').click()
      orders.amountAndDelayProductLikes()
      cy.get('strong').should('have.text', '20 ₽')
      cy.get('.create-button').click()
      orders.confirmorder()
      cy.contains(`${art}`).should('be.visible')
      cy.contains("Финансы").click()
      cy.get('tbody > :nth-child(1) > :nth-child(3)').should('have.text', 'Списание за услугу "Товар в избранное"')
    });
})