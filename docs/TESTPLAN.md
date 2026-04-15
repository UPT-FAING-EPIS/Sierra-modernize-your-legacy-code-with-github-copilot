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
| TC-001 | Application starts and main menu is displayed | Executable accountsystem is available in project root | 1. Open terminal in project root.<br>2. Run ./accountsystem.<br>3. Observe the first screen. | Main menu is displayed with options 1, 2, 3, and 4, plus input prompt Enter your choice (1-4). |  | Not Run | Validates startup and menu rendering |
| TC-002 | Option 4 exits the application gracefully | Application is running and menu is visible | 1. Run ./accountsystem.<br>2. At menu prompt, enter 4.<br>3. Press Enter. | Program prints Exiting the program. Goodbye! and process terminates. |  | Not Run | Validates exit control flow |
| TC-003 | Invalid menu option is rejected and loop continues | Application is running and menu is visible | 1. Run ./accountsystem.<br>2. Enter 9 at menu prompt.<br>3. Press Enter.<br>4. Observe following screen. | Message Invalid choice, please select 1-4. is displayed and menu is shown again. |  | Not Run | Validates WHEN OTHER branch |
| TC-004 | Initial balance inquiry returns baseline amount | Fresh application run with no prior operations in that run | 1. Run ./accountsystem.<br>2. Enter 1 at menu prompt.<br>3. Press Enter. | Current balance is shown as 1000.00 (display format may include COBOL numeric spacing). |  | Not Run | Baseline business rule |
| TC-005 | Credit operation increases balance and persists in current run | Application is running; current balance is known | 1. Run ./accountsystem.<br>2. Enter 2 at menu prompt.<br>3. Enter 250.50 when prompted for credit amount.<br>4. Enter 1 to view balance.<br>5. Compare shown balance against prior balance + 250.50. | Credit confirmation appears and viewed balance equals previous balance plus 250.50. |  | Not Run | Validates READ -> ADD -> WRITE flow |
| TC-006 | Debit operation decreases balance when funds are sufficient | Application is running; current balance is at least 200.00 | 1. Run ./accountsystem.<br>2. Enter 3 at menu prompt.<br>3. Enter 200.00 when prompted for debit amount.<br>4. Enter 1 to view balance.<br>5. Compare shown balance against prior balance - 200.00. | Debit confirmation appears and viewed balance equals previous balance minus 200.00. |  | Not Run | Validates sufficient-funds branch |
| TC-007 | Debit operation is blocked when funds are insufficient | Application is running; current balance is known and less than test debit amount | 1. Run ./accountsystem.<br>2. Enter 3 at menu prompt.<br>3. Enter an amount larger than current balance (example 1200.00).<br>4. Enter 1 to view balance.<br>5. Compare with balance before debit attempt. | Message Insufficient funds for this debit. is displayed and balance remains unchanged. |  | Not Run | Critical business control |
| TC-008 | Debit boundary: amount equal to balance is allowed | Application is running; current balance is known | 1. Run ./accountsystem.<br>2. If needed, use option 2 to set a known balance (example 500.00).<br>3. Enter 3 at menu prompt.<br>4. Enter debit amount exactly equal to current balance.<br>5. Enter 1 to view balance. | Debit succeeds and resulting balance is 0.00. |  | Not Run | Confirms comparison rule FINAL-BALANCE >= AMOUNT |
| TC-009 | Multiple operations in one session maintain running balance | Fresh application run | 1. Run ./accountsystem.<br>2. Enter 2 and credit 100.00.<br>3. Enter 3 and debit 50.00.<br>4. Enter 1 to view final balance.<br>5. Verify arithmetic from baseline 1000.00. | Final balance is 1050.00, proving session-level state continuity. |  | Not Run | Validates DataProgram in-memory state across calls |
| TC-010 | Balance resets after application restart | At least one successful credit or debit was executed in prior run | 1. Run ./accountsystem.<br>2. Perform one balance-changing action (example credit 100.00).<br>3. Exit using option 4.<br>4. Start app again with ./accountsystem.<br>5. Enter 1 to view balance. | New run starts with balance reset to 1000.00. |  | Not Run | Captures current implementation behavior (no external persistence) |
| TC-011 | Repeated balance inquiries are read-only | Application is running; no credit/debit between inquiries | 1. Run ./accountsystem.<br>2. Enter 1 and note displayed balance.<br>3. Enter 1 again without performing option 2 or 3.<br>4. Compare both displayed values. | Both balance inquiries display the same amount. |  | Not Run | Validates TOTAL path does not update data |
| TC-012 | Monetary precision with two decimals is handled in calculations | Application is running | 1. Run ./accountsystem.<br>2. Enter 2 and credit 10.25.<br>3. Enter 3 and debit 5.10.<br>4. Enter 1 to view balance.<br>5. Verify two-decimal arithmetic result. | Displayed balance reflects exact two-decimal operations based on PIC 9(6)V99 fields. |  | Not Run | Validates decimal handling in CREDIT/DEBIT |
| TC-013 | Return to menu after successful operation | Application is running | 1. Run ./accountsystem.<br>2. Execute option 1, 2, or 3 successfully.<br>3. Observe screen after operation message. | Application returns to main menu until user selects option 4. |  | Not Run | Validates loop control using CONTINUE-FLAG |
| TC-014 | Credit operation updates value shown in next inquiry | Application is running; baseline captured via option 1 | 1. Run ./accountsystem.<br>2. Enter 1 and note starting balance.<br>3. Enter 2 and credit 75.00.<br>4. Enter 1 again.<br>5. Compare new value with baseline + 75.00. | Balance shown in inquiry includes credited amount, proving write then read consistency. |  | Not Run | Additional stakeholder-readable proof of business rule |
| TC-015 | Failed debit does not affect later successful debit logic | Application is running; baseline captured | 1. Run ./accountsystem.<br>2. Enter 1 and note baseline.<br>3. Enter 3 and provide an amount larger than baseline.<br>4. Confirm insufficient funds message appears.<br>5. Enter 3 again and provide a valid smaller amount.<br>6. Enter 1 and verify final balance. | First debit is rejected with no balance change; second valid debit is applied correctly from original baseline. |  | Not Run | Validates conditional branch integrity |

## Stakeholder Sign-off Notes
- Confirm whether balance reset between executions is acceptable for current phase.
- Confirm acceptable display format for monetary values.
- Confirm that negative amounts are not part of accepted input scenarios for this release.
