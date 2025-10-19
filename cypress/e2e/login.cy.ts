/// <reference types="cypress" />

const SIGNUP_REGEX = /sign up|create.*account/i;

describe("Authentication flow", () => {
  beforeEach(() => {
    // Clear cookies and local storage before each test
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("Should successfully log in an existing user", () => {
    // Mock the Better Auth login endpoint
    cy.intercept("POST", "/api/auth/sign-in/email", {
      statusCode: 200,
      body: {
        success: true,
        user: {
          id: "test-user-id",
          email: "yaredyilma11@gmail.com",
          name: "Test User",
        },
        redirect: "/en",
      },
    }).as("loginRequest");

    // Use locale-aware path
    cy.visit("/en/login");

    // Wait for the page to load
    cy.get('input[name="email"]').should("be.visible");

    // Fill out the login form with test credentials
    cy.get('input[name="email"]').type("yaredyilma11@gmail.com");
    cy.get('input[name="password"]').type("Test1234@");

    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/");

    // Wait for the mocked login request
    cy.wait("@loginRequest");

    // After successful login, should redirect to home
    cy.url().should("include", "/en");
    cy.contains("Next.js Starter Template").should("be.visible");
  });

  it("Should show validation errors for invalid credentials", () => {
    // Mock the Better Auth login endpoint to return an error
    cy.intercept("POST", "/api/auth/sign-in/email", {
      statusCode: 401,
      body: {
        success: false,
        error: {
          message: "Authentication failed",
        },
      },
    }).as("failedLogin");

    cy.visit("/en/login");

    cy.get('input[name="email"]').type("invalid@example.com");
    cy.get('input[name="password"]').type("wrongpassword");
    cy.get('button[type="submit"]').click();

    // Wait for the mocked failed login request
    cy.wait("@failedLogin");

    // Check for error message - looking for the toast notification
    cy.contains("Authentication failed", { timeout: 5000 }).should(
      "be.visible"
    );
  });

  it("Should navigate to registration page", () => {
    cy.visit("/en/login");

    // Click on the "Sign up" or "Create account" link
    cy.contains(SIGNUP_REGEX).first().click();
    cy.url().should("include", "/register");
  });
});
