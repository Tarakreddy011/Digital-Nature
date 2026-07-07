-- Scenario 1: Process monthly interest for savings accounts
CREATE OR REPLACE PROCEDURE ProcessMonthlyInterest AS
BEGIN
    UPDATE Accounts
    SET Balance = Balance + (Balance * 0.01),
        LastModified = SYSDATE
    WHERE AccountType = 'Savings';
    
    COMMIT;
    DBMS_OUTPUT.PUT_LINE('Monthly interest processed for all Savings accounts.');
END;
/

-- Scenario 2: Update employee bonus based on department
CREATE OR REPLACE PROCEDURE UpdateEmployeeBonus (
    target_department IN VARCHAR2,
    bonus_percent IN NUMBER
) AS
BEGIN
    UPDATE Employees
    SET Salary = Salary + (Salary * (bonus_percent / 100))
    WHERE Department = target_department;
    
    COMMIT;
    DBMS_OUTPUT.PUT_LINE('Bonuses applied to department: ' || target_department);
END;
/

-- Scenario 3: Transfer funds between accounts with balance checking
CREATE OR REPLACE PROCEDURE TransferFunds (
    source_account_id IN NUMBER,
    destination_account_id IN NUMBER,
    transfer_amount IN NUMBER
) AS
    available_balance NUMBER;
BEGIN
    -- Lock the row and check the current balance
    SELECT Balance INTO available_balance 
    FROM Accounts 
    WHERE AccountID = source_account_id 
    FOR UPDATE;
    
    IF available_balance >= transfer_amount THEN
        -- Withdraw from source
        UPDATE Accounts 
        SET Balance = Balance - transfer_amount, LastModified = SYSDATE 
        WHERE AccountID = source_account_id;
        
        -- Deposit to destination
        UPDATE Accounts 
        SET Balance = Balance + transfer_amount, LastModified = SYSDATE 
        WHERE AccountID = destination_account_id;
        
        -- Log transaction for source
        INSERT INTO Transactions (TransactionID, AccountID, TransactionDate, Amount, TransactionType)
        VALUES (NVL((SELECT MAX(TransactionID) FROM Transactions), 0) + 1, source_account_id, SYSDATE, transfer_amount, 'Withdrawal');
        
        -- Log transaction for destination
        INSERT INTO Transactions (TransactionID, AccountID, TransactionDate, Amount, TransactionType)
        VALUES (NVL((SELECT MAX(TransactionID) FROM Transactions), 0) + 2, destination_account_id, SYSDATE, transfer_amount, 'Deposit');
        
        COMMIT;
        DBMS_OUTPUT.PUT_LINE('Transfer successful.');
    ELSE
        RAISE_APPLICATION_ERROR(-20001, 'Transaction failed: Insufficient funds in the source account.');
    END IF;

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20002, 'Transaction failed: One or both account IDs are invalid.');
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE;
END;
/