describe("Bookmark Functionality", () => {
  const JOBS_PAGE = "http://localhost:3000";
  const BOOKMARKS_PAGE = "http://localhost:3000/bookmarks";

  describe("when user is not logged in", () => {
    beforeEach(() => {
      cy.clearLocalStorage();
    });

    it("requires login via modal to bookmark a job", () => {
      cy.visit(JOBS_PAGE);
      cy.get("a[href*='/job/']", { timeout: 10000 }).first().find("h2").invoke("text").then((jobTitle) => {
        cy.contains("a[href*='/job/']", jobTitle.trim()).find("[aria-label='Toggle bookmark']").click();
        cy.contains("You must be logged in to bookmark this job.").should("be.visible");
        cy.get("button").contains("Login").click();
        cy.url().should("include", "/login");
        cy.get('input[name="email"]').type("nanatiwakjira432@gmail.com");
        cy.get('input[name="password"]').type("nana111");
        cy.get("button[type='submit']").click();
        cy.url({ timeout: 10000 }).should("eq", JOBS_PAGE + "/");
        cy.contains("a[href*='/job/']", jobTitle.trim(), { timeout: 10000 })
          .find("[aria-label='Toggle bookmark']")
          .click();
        cy.visit(BOOKMARKS_PAGE);
        cy.contains(jobTitle.trim()).should("be.visible");
      });
    });
  });

  describe("when user is logged in", () => {
    beforeEach(() => {
      cy.loginAsUser();
      cy.visit(JOBS_PAGE);
    });

    it("adds and then removes a bookmark from the job card", () => {
      cy.get("a[href*='/job/']", { timeout: 10000 }).first().find("h2").invoke("text").then((jobTitle) => {
        cy.contains("a[href*='/job/']", jobTitle.trim()).find("[aria-label='Toggle bookmark']").click();
        cy.visit(BOOKMARKS_PAGE);
        cy.contains(jobTitle.trim()).should("be.visible");
        cy.visit(JOBS_PAGE);
        cy.contains("a[href*='/job/']", jobTitle.trim(), { timeout: 10000 })
          .find("[aria-label='Toggle bookmark']")
          .click();
        cy.visit(BOOKMARKS_PAGE);
        cy.contains(jobTitle.trim()).should("not.exist");
      });
    });

    it("adds a bookmark and removes it from the bookmarks page", () => {
      cy.get("a[href*='/job/']", { timeout: 10000 }).first().find("h2").invoke("text").then((jobTitle) => {
        cy.contains("a[href*='/job/']", jobTitle.trim()).find("[aria-label='Toggle bookmark']").click();
        cy.visit(BOOKMARKS_PAGE);

        // --- CORRECTED LOGIC ---
        // 1. Find the element with the job title.
        // 2. Go up to the parent container that has a 'relative' class.
        // 3. From there, find the remove button within that container.
        cy.contains(jobTitle.trim())
          .parents(".relative") // Traverses up to the main container div
          .should("be.visible")
          .find("button[title='Remove bookmark']")
          .click();
        // --- END CORRECTION ---

        cy.contains(jobTitle.trim()).should("not.exist");
      });
    });

    it("persists a bookmark after a page reload", () => {
        cy.get("a[href*='/job/']", { timeout: 10000 }).first().find("h2").invoke("text").then((jobTitle) => {
            cy.contains("a[href*='/job/']", jobTitle.trim()).find("[aria-label='Toggle bookmark']").click();
            cy.reload();
            cy.visit(BOOKMARKS_PAGE);
            cy.contains(jobTitle.trim(), { timeout: 10000 }).should("be.visible");
        });
      });
  });
});