import { expect } from "@playwright/test"
import { BasePage } from "../page-objects/BasePage"
import { faker } from "@faker-js/faker"
import { datePicker } from "../utils/datePicker"
import { logStep, logSuccess, logError } from "../utils/logger"
import playwrightConfig from "../playwright.config"


export class EmployeePage extends BasePage {
    constructor(page) {
        super(page)
        this.createdEmployee = []
        // locators of the page Employee
        this.employeesPanel = page.locator('div[title="Employees"]')
        this.addEmployeesButton = page.getByText('Add Employee')
        this.addAnotherEmployeeButton = page.getByText('Add another Employee')
        this.firstName = page.locator('#firstName')
        this.lastName = page.locator('#lastName')
        this.email = page.locator('#email')
        this.phoneNumber = page.locator('#phoneNumber')
        this.startDate = page.locator('#startDate')
        this.currentYearSelector = page.locator('button[data-e2e="select-year"]')
        this.yearSelector = (year) => page.getByText(year)
        this.daySelector = (day) => page.locator('.DayPicker-Day-Number', { hasText: day })
        this.jobTitle = page.locator('#jobTitle')
        this.saveEmployee = page.getByText('Save new employee')
        this.goToProfileButton = page.getByText('Go to profile')
        this.nameList = page.locator('ul[role="list"] span div')
        this.searchEmployeeInput = page.getByPlaceholder('Search employees...')
        this.deleteEmployeeRecord = page.locator('#main-content a', { hasText: 'Delete employee record' })
        this.deleteCheckBox = page.locator('label[data-testid="checkboxLabel"]')
    }


    //// page functions of Employee page////

    //function to click on Employees Panel
    async clickOnEmployeePanel() {
        await this.clickElement(this.employeesPanel)
    }

    //function to navigate to employees tab
    async navigateToEmployeePanel() {
        await this.navigateTo(`${playwrightConfig.use.baseURL}/employee-hub`)
    }

    //function to generate Employee Data using Faker
    async generateRandomEmployeeData() {
        const randomDate = faker.date.past()
        const randomFirstName = faker.person.firstName()
        const randomLastName = faker.person.lastName()
        const randomEmail = faker.internet.email()
        const randomPhone = faker.phone.number()
        const randomJobTitle = faker.person.jobTitle()

        const employeeData = {
            firstName: randomFirstName,
            lastName: randomLastName,
            email: randomEmail,
            phoneNumber: randomPhone,
            date: randomDate,
            jobTitle: randomJobTitle
        };

        return employeeData
    }

    //function to select start date in the date picker
    async selectStartDate() {
        await this.clickElement(this.startDate)
        const { year, day } = datePicker()

        await this.clickElement(this.currentYearSelector)
        await this.clickElement(this.yearSelector(year))
        await this.clickElement(this.daySelector(day))
    }

    //function to fill employee details and complete the form
    async addEmployee(employeeData = {}) {
        const { firstName, lastName, email, phoneNumber, date, jobTitle } = employeeData
        logStep(`Adding employee: ${firstName} ${lastName}`)
        // Fill in employee details
        try {
            await this.clickElement(this.addEmployeesButton)
            await this.fillInput(this.firstName, firstName)
            await this.fillInput(this.lastName, lastName)
            await this.fillInput(this.email, email)
            await this.fillInput(this.phoneNumber, phoneNumber)
            await this.fillInput(this.jobTitle, jobTitle)
            await this.selectStartDate()

            // Save the employee details
            await this.clickElement(this.saveEmployee)
            await expect(this.page.locator('h1.text-lg')).toHaveText('Success! New employee added')
            logSuccess(`Employee ${firstName} added successfully.`)
            await this.clickElement(this.goToProfileButton)
        }
        catch (err) {
            logError(`Failed to add employee: ${firstName}. Error: ${err.message}`)
            throw err
        }
    }

    //function to search employee using name
    async searchEmployee(name) {
        await this.fillInput(this.searchEmployeeInput, name)
        await expect(this.nameList).toContainText(name)
        await this.clickElement(this.nameList)
    }

    //function to validate employee tils in employee tab
    async validateEmployeeTile(employeeData) {
        await this.clickOnEmployeePanel()
        const { firstName, lastName, jobTitle } = employeeData
        const fullName = `${firstName} ${lastName}`
        await expect(this.page.getByRole('heading', { name: fullName })).toBeVisible();
    }

    //function to validate validate employee details
    async validateEmployeeDetails(employeeData) {
        const { firstName, lastName, email, phoneNumber, jobTitle } = employeeData
        logStep(`Validating employee: ${employeeData.firstName}`);

        try {
            await expect(this.firstName).toHaveValue(employeeData.firstName)
            await expect(this.lastName).toHaveValue(employeeData.lastName)
            await expect(this.email).toHaveValue(employeeData.email)
            await expect(this.phoneNumber).toHaveValue(employeeData.phoneNumber)

            const { formatted } = datePicker();
            await expect(this.startDate).toHaveText(formatted);
            await expect(this.jobTitle).toHaveValue(employeeData.jobTitle);

            logSuccess(`Validated employee: ${employeeData.firstName}`)
        } catch (error) {
            logError(`Validation failed for employee ${employeeData.firstName}: ${error}`)
            throw error
        }
        await this.clickOnEmployeePanel()
    }

    //function to loop through and peform addition and validation for multiple employees
    async addAndValidateEmployees(numberOfEmployees) {
        for (let i = 0; i < numberOfEmployees; i++) {

            const employeeData = await this.generateRandomEmployeeData()
            await this.addEmployee(employeeData)
            await this.validateEmployeeDetails(employeeData)
            await this.validateEmployeeTile(employeeData)
            this.createdEmployee.push(employeeData)

        }
    }

    //function to clear test data
    async deleteEmployee() {
        for (const employeeData of this.createdEmployee) {
            const { firstName } = employeeData
            logStep(`Deleting employee: ${firstName}`)

            try {
                await this.searchEmployee(firstName)
                await this.clickElement(this.deleteEmployeeRecord)
                await this.clickElement(this.deleteCheckBox)
                await this.clickElement(this.page.locator('button', { hasText: firstName }))
                await expect(
                    this.page.getByText(`You have succesfully deleted ${firstName} from your records`)
                ).toBeVisible()

                logSuccess(`Successfully deleted employee: ${firstName}`)
                await this.navigateToEmployeePanel()
            } catch (err) {
                logError(`Failed to delete employee: ${firstName}`, err)
                throw err
            }
        }

        // Validate cleanup state
        try {
            await expect(
                this.page.getByRole('heading', { level: 3, name: 'Employees (1)' })
            ).toBeVisible()
            logSuccess('Validated cleanup state: Only 1 employee remains')
        } catch (err) {
            logError('Cleanup validation failed', err)
            throw err
        }
    }
}