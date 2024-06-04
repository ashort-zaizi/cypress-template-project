const BasePage = require('./BasePage')

class LoginPage extends BasePage {
  // Define the locators for elements on the login page
  elements = {
    usernameInput: '[data-test="username"]',
    passwordInput: '[data-test="password"]',
    loginButton: '#login-button'
  }

  // Method to navigate to the login page
  navigateToLogin() {
    this.navigate('/')
  }

  // Method to enter the username
  enterUsername(username) {
    this.enterText(this.elements.usernameInput, username)
  }

  // Method to enter the password
  enterPassword(password) {
    this.enterText(this.elements.passwordInput, password)
  }

  // Method to click the login button
  clickLoginButton() {
    this.clickButton(this.elements.loginButton)
  }

  // Method to perform a complete login action
  login(username, password) {
    this.enterUsername(username)
    this.enterPassword(password)
    this.clickLoginButton()
  }
}

module.exports = new LoginPage()
