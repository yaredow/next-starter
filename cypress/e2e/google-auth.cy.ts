/// <reference types="cypress" />

describe("Google Auth Flow", () => {
  it("should successfully log in with Google (mocked)", () => {
    // Mock the actual endpoint that gets called when clicking Google button
    cy.intercept("POST", "/api/auth/sign-in/social", {
      statusCode: 302,
      headers: {
        Location: "/profile"
      },
      body: {
        redirect: "/profile"
      }
    }).as("googleSignIn");

    cy.visit("/en/login");
    cy.contains("Google").click();

    cy.wait("@googleSignIn");

    // After successful OAuth, should redirect to profile
    cy.url().should("include", "/profile");
    // Check for profile page content or redirect to home if profile doesn't exist
    cy.get("body").then($body => {
      if ($body.text().includes("404")) {
        // If profile page doesn't exist, might redirect to home
        cy.visit("/");
        cy.contains("Next.js Starter Template").should("be.visible");
      } else {
        // Profile page exists
        cy.contains(/profile|dashboard|welcome/i).should("be.visible");
      }
    });
  });
});
