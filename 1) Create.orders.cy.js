import Orders from '../pages/orders'
const art = '58923597'
describe('е2е создание выкупа', () => {
  const orders = new Orders()
  it('один выкуп + проверка оплаты', () => {
    cy.visit('https://app.wbprod.ru/auth')
    cy.viewport(1920, 1080)
    orders.login()
    cy.contains("Выкупы").click()
    orders.typedelivery()
    orders.typeArt()
    .type(`${art}`)
    cy.get('span[class="v-btn__content"]').contains('Поиск').click()
    orders.addpvz()
    cy.intercept('GET', 'https://gateway.wbprod.ru/analytics/positions/keywords/suggest?cod1S=' + `${art}` + '&limit=10').as('search');
    orders.addkey()
    cy.get('button[class="mt-4 v-btn v-btn--is-elevated v-btn--has-bg theme--dark v-size--default primary"]')
    .contains('Создать выкуп').click()
    cy.contains(`${art}`).should('be.visible') 
    cy.intercept('POST', 'https://gateway.wbprod.ru/order/paid').as('searchVikup');
    orders.paymentCheck()
    cy.contains(`${art}`).should('be.visible') 
      

  })
})