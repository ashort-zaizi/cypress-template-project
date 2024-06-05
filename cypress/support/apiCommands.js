export { }

const url = Cypress.env('CYPRESS_TEST_API_URL')
const bergBaseUrl = Cypress.env('')

Cypress.Commands.add("ClearToken", () => {
    cy.clearCookies({ domain: null })
    Cypress.env('token', '')
})


Cypress.Commands.add("apiGetToken", (username) => {
    cy.fixture(`users/${username}.json`).then((user) => {
        // cy.clearAllCookies()
        const authBaseUrl = Cypress.env("AUTH_BASE_URL");
        const realm = Cypress.env("AUTH_REALM");
        const URL = `${authBaseUrl}/realms/${realm}/protocol/openid-connect/token`

        const authorization = 'Basic ' + btoa(Cypress.env('AUTH_CLIENT_ID') + ':')

        cy.intercept('POST', URL, (req) => {
            // set the request body to something different before it's sent to the destination
            req.headers['Authorization'] = authorization;
            req.headers['Host'] = null
        })

        cy.request({
            url: URL,
            method: 'POST',
            form: true,
            headers: {
                'Authorization': authorization,
                'Host': Cypress.env('AUTH_BASE_URL_DOMAIN'),
                'accept': '*/*',
            },
            body: {
                client_id: Cypress.env('AUTH_CLIENT_ID'),
                username: user.username,
                password: Cypress.env('CYPRESS_TESTS_USER_PASSWORD'),
                grant_type: 'password',
                scope: Cypress.env('AUTH_SCOPE'),
            }
        })
        .as('loginResponse')
        .then((response) => {
            const accessToken = response.body['access_token'];
            cy.wrap(accessToken).as('accessToken');
        })
    })
})


