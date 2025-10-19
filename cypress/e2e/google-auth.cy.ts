/// <reference types="cypress" />

describe("Google Auth Flow", () => {
  it("should successfully log in with Google (mocked)", () => {
    cy.intercept("GET", "/api/auth/callback/google*", (req) => {
      // Adjust the URL to match your callback
      req.reply((res) => {
        // Simulate a successful Google login
        res.send(302, { Location: "/profile" }); // Redirect to your logged-in page
      });
    }).as("googleCallback");

    cy.visit("/login");
    cy.contains("Google").click();

    cy.wait("@googleCallback");

    cy.url().should("include", "/");
    cy.contains("Next Starter Template").should("be.visible");
  });
});
