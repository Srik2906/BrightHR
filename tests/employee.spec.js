import { test } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { EmployeePage } from '../page-objects/EmployeePage';

test.describe('Employee Hub Tests', () => {
  let employeePage

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.login()

    employeePage = new EmployeePage(page)
    await employeePage.navigateToEmployeePanel()
  });

  test.afterEach(async () => {

      await employeePage.deleteEmployee()
    })

  test('Add and validate multiple employees', async () => {
    const numberOfEmployees = 2
    await employeePage.addAndValidateEmployees(numberOfEmployees)
  });
});