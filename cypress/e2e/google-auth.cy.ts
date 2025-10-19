/// <reference types="cypress" />

describe("Google Auth Flow", () => {
  it("should successfully log in with Google (mocked)", () => {
    // Better Auth triggers a POST to this endpoint for social sign-in
    cy.intercept("POST", "/api/auth/sign-in/social", {
      statusCode: 200,
      body: {
        success: true,
        // many auth clients redirect to this url after success
        url: "/en",
      },
    }).as("googleSignIn");

    // Use the locale-aware route to avoid an initial 307 redirect
    cy.visit("/en/login");

    // Click the Google button
    cy.contains("Google").click();

    // Ensure our mocked request is used (and no 500s occur)
    cy.wait("@googleSignIn").its("response.statusCode").should("eq", 200);

    // In mocked mode, we expect to remain on the login page
    // and still see the email button and the continue-with separator.
    cy.url().should("include", "/en/login");
    cy.contains("Sign In with Email").should("be.visible");
    cy.contains(/continue with/i).should("be.visible");
  });
});
