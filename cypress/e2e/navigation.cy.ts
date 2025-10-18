/// <reference types="cypress" />

describe("Navigation and Homepage", () => {
  it("Should load the homepage", () => {
    cy.visit("/en");
    cy.contains("Next.js Starter Template").should("be.visible");
  });

  it("Should navigate to login page", () => {
    cy.visit("/en");
    cy.contains(/login|sign in/i).click();
    cy.url().should("include", "/login");
  });

  it("Should be responsive", () => {
    // Test mobile viewport
    cy.viewport("iphone-x");
    cy.visit("/en");
    cy.contains("Next.js Starter Template").should("be.visible");

    // Test tablet viewport
    cy.viewport("ipad-2");
    cy.visit("/en");
    cy.contains("Next.js Starter Template").should("be.visible");

    // Test desktop viewport
    cy.viewport(1920, 1080);
    cy.visit("/en");
    cy.contains("Next.js Starter Template").should("be.visible");
  });
});