/// <reference types="cypress" />

const PASSWORD_REGEX = /password/i;
const INVALID_EMAIL_REGEX = /email|invalid/i;

describe("User Registration", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit("/en/register");
  });

  it("Should register a new user with valid credentials", () => {
    const timestamp = Date.now();
    const testEmail = `test${timestamp}@example.com`;

    // Mock the Better Auth registration endpoint
    cy.intercept("POST", "/api/auth/sign-up/email", {
      statusCode: 200,
      body: {
        success: true,
        user: {
          id: `user-${timestamp}`,
          email: testEmail,
          name: "Test User",
        },
        redirect: "/en",
      },
    }).as("registerRequest");

    cy.get('input[name="name"]').type("Test User");
    cy.get('input[name="email"]').type(testEmail);
    cy.get('input[name="password"]').type("Test1234@");

    cy.get('button[type="submit"]').click();

    // Wait for the mocked registration request
    cy.wait("@registerRequest");

    // Should redirect after successful registration
    cy.url().should("include", "/en");
    cy.contains("Next.js Starter Template").should("be.visible");
  });

  it("Should show validation errors for weak password", () => {
    cy.get('input[name="name"]').type("Test User");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("weak");

    cy.get('button[type="submit"]').click();

    // Check for validation error message
    cy.contains(PASSWORD_REGEX).should("be.visible");
  });

  it("Should show error for invalid email", () => {
    cy.get('input[name="name"]').type("Test User");
    cy.get('input[name="email"]').type("invalid-email");
    cy.get('input[name="password"]').type("Test1234@");

    cy.get('button[type="submit"]').click();

    // Should show validation error for invalid email format
    cy.url().should("include", "/register"); // Should stay on register page
    cy.contains(INVALID_EMAIL_REGEX).should("be.visible");
  });
});
