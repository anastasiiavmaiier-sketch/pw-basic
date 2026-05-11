import { Page } from "@playwright/test";

export class LoginPage {
    page: Page;
    emailField:Locator;
    constructor(page: Page) {
        this.page = page;
        this.emailField = this.page.locator('[data-test="email"]');
        this
    }

    async performLogin(email: string, password: string): Promise<void> {
        await this.page.locator('[data-test="email"]').fill(email);
        await this.page.locator('[data-test="password"]').fill(password);
        await this.page.locator('[data-test="login-submit"]').click();  
    }
}