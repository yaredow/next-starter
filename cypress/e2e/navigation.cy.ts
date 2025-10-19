/// <reference types="cypress" />

const LOGIN_REGEX = /login|sign in/i;
const DESKTOP_WIDTH = 1920;
const DESKTOP_HEIGHT = 1080;

describe("Navigation and Homepage", () => {
  it("Should load the homepage", () => {
    cy.visit("/en");
    cy.contains("Next.js Starter Template").should("be.visible");
  });

  it("Should navigate to login page", () => {
    cy.visit("/en");
    cy.contains(LOGIN_REGEX).click();
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
    cy.viewport(DESKTOP_WIDTH, DESKTOP_HEIGHT);
    cy.visit("/en");
    cy.contains("Next.js Starter Template").should("be.visible");
  });
});
