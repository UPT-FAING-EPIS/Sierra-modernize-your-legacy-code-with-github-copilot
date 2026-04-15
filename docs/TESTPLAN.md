# Student Account System - Test Plan

## Purpose
This test plan validates current business logic and implementation behavior of the COBOL student account application.

## Test Cases

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| TC-001 | Application starts and main menu is displayed | Executable accountsystem is available in project root | 1. Open terminal.<br>2. Run `./accountsystem`.<br>3. Observe the first screen. | Main menu is displayed with options 1, 2, 3, and 4. | | Not Run | Validates startup and menu rendering |
| TC-002 | Option 4 exits the application gracefully | Application is running and menu is visible | 1. At menu prompt, enter 4.<br>2. Press Enter. | Program prints "Exiting the program. Goodbye!" and terminates. | | Not Run | Validates exit control flow |
| TC-003 | Invalid menu option is rejected | Application is running | 1. Enter 9 at menu prompt.<br>2. Press Enter. | Message "Invalid choice, please select 1-4" is displayed. | | Not Run | Validates error handling |
| TC-004 | Initial balance inquiry returns baseline amount | Fresh application run | 1. Enter 1 at menu prompt.<br>2. Press Enter. | Current balance is shown as 1000.00. | | Not Run | Baseline business rule |
| TC-005 | Credit operation increases balance | Application is running | 1. Enter 2 at menu prompt.<br>2. Enter 250.50 as credit amount.<br>3. Enter 1 to view balance. | Viewed balance equals 1250.50. | | Not Run | Validates addition logic |
| TC-006 | Debit operation decreases balance | Application is running | 1. Enter 3 at menu prompt.<br>2. Enter 200.00 as debit amount.<br>3. Enter 1 to view balance. | Viewed balance equals 800.00. | | Not Run | Validates subtraction logic |
| TC-007 | Debit operation is blocked when funds are insufficient | Current balance is known | 1. Enter 3 at menu prompt.<br>2. Enter an amount larger than current balance (e.g., 1500.00). | Message "Insufficient funds for this debit" is displayed. | | Not Run | Critical business control |
| TC-008 | Multiple operations maintain running balance | Fresh application run | 1. Enter 2 and credit 100.00.<br>2. Enter 3 and debit 50.00.<br>3. Enter 1 to view final balance. | Final balance is 1050.00. | | Not Run | Validates session state |