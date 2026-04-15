# Student Account System - Test Plan

## Purpose
This test plan validates current business logic and implementation behavior of the COBOL student account application.
It is intended for walkthrough and sign-off with business stakeholders.

## Scope
- Menu navigation and user interaction
- Balance inquiry
- Credit operation
- Debit operation (including insufficient funds control)
- In-memory balance behavior during the same execution session

## Out of Scope
- Database or file persistence across separate executions
- Security/authentication controls
- Concurrency and multi-user behavior

## Test Cases

| Test Case ID | Description | Pre-conditions | Steps | Expected Result | Actual Result | Status | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TC-001 | Application starts and shows main menu options | Executable `accountsystem` is available | 1. Run `./accountsystem` from project root | System displays menu with options 1-4 and input prompt |  | Not Run |  |
| TC-002 | Exit option closes application gracefully | App is running on main menu | 1. Enter `4` and press Enter | App exits loop and displays goodbye message |  | Not Run |  |
| TC-003 | Invalid menu option is rejected | App is running on main menu | 1. Enter `9` and press Enter | Message `Invalid choice, please select 1-4.` is displayed and menu remains active |  | Not Run |  |
| TC-004 | Initial balance is 1000.00 on first inquiry | Fresh app execution started | 1. Enter `1` to view balance | Current balance displayed as 1000.00 (format may reflect COBOL numeric display) |  | Not Run | Baseline business rule |
| TC-005 | Credit operation increases balance correctly | App running; current balance known (example 1000.00) | 1. Enter `2` 2. Enter credit amount `250.50` 3. Enter `1` to view balance | New balance equals previous balance + 250.50 (example: 1250.50) |  | Not Run | Validates arithmetic and write-back |
| TC-006 | Debit operation decreases balance when funds are sufficient | App running; balance known and greater than debit amount | 1. Enter `3` 2. Enter debit amount `200.00` 3. Enter `1` to view balance | New balance equals previous balance - 200.00 |  | Not Run | Validates conditional debit path |
| TC-007 | Debit is blocked when funds are insufficient | App running; balance known (example 1000.00) | 1. Enter `3` 2. Enter debit amount `1200.00` 3. Enter `1` to view balance | Message `Insufficient funds for this debit.` is shown and balance remains unchanged |  | Not Run | Critical business control |
| TC-008 | Boundary condition: debit exactly equal to current balance | App running; set or know balance (example 500.00) | 1. Enter `3` 2. Enter debit amount exactly equal to current balance 3. Enter `1` | Debit succeeds and resulting balance is 0.00 |  | Not Run | Confirms `>=` rule |
| TC-009 | Sequential operations keep running session balance in memory | Fresh app execution started | 1. Enter `2`, credit `100.00` 2. Enter `3`, debit `50.00` 3. Enter `1` | Final balance reflects both operations in order (1000 + 100 - 50 = 1050.00) |  | Not Run | Confirms in-session state consistency |
| TC-010 | Balance resets after restarting application | Complete one or more operations, then exit app | 1. In first run, modify balance (e.g., credit 100) 2. Exit with `4` 3. Re-run `./accountsystem` 4. Enter `1` | Balance returns to initial 1000.00 after restart |  | Not Run | Documents current implementation limitation |
| TC-011 | View balance does not modify stored balance | App running; known balance | 1. Enter `1` multiple times 2. Compare displayed values | Repeated balance inquiries show same value when no credit/debit occurs |  | Not Run | Read-only behavior |
| TC-012 | Credit and debit accept two-decimal numeric values | App running | 1. Credit with `10.25` 2. Debit with `5.10` 3. View balance | Calculations maintain two-decimal precision according to COBOL PIC definition |  | Not Run | Validate money scale behavior |

## Stakeholder Sign-off Notes
- Confirm whether balance reset between executions is acceptable for current phase.
- Confirm acceptable display format for monetary values.
- Confirm that negative amounts are not part of accepted input scenarios for this release.
