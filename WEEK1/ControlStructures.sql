ALTER TABLE Customers ADD IsVIP VARCHAR2(5) DEFAULT 'FALSE';

DECLARE
    CURSOR customer_cursor IS SELECT CustomerID, DOB FROM Customers;
    customer_age NUMBER;
BEGIN
    FOR cust_rec IN customer_cursor LOOP
        customer_age := TRUNC(MONTHS_BETWEEN(SYSDATE, cust_rec.DOB) / 12);
        IF customer_age > 60 THEN
            UPDATE Loans SET InterestRate = InterestRate - 1 WHERE CustomerID = cust_rec.CustomerID;
        END IF;
    END LOOP;
    COMMIT;
END;
/

DECLARE
    CURSOR balance_cursor IS SELECT CustomerID, Balance FROM Customers;
BEGIN
    FOR cust_rec IN balance_cursor LOOP
        IF cust_rec.Balance > 10000 THEN
            UPDATE Customers SET IsVIP = 'TRUE' WHERE CustomerID = cust_rec.CustomerID;
        END IF;
    END LOOP;
    COMMIT;
END;
/

DECLARE
    CURSOR loan_cursor IS 
        SELECT c.Name, l.LoanID, l.EndDate 
        FROM Loans l JOIN Customers c ON l.CustomerID = c.CustomerID
        WHERE l.EndDate BETWEEN SYSDATE AND SYSDATE + 30;
BEGIN
    FOR loan_rec IN loan_cursor LOOP
        DBMS_OUTPUT.PUT_LINE('Reminder: ' || loan_rec.Name || ', Loan ' || loan_rec.LoanID || ' due on ' || TO_CHAR(loan_rec.EndDate, 'YYYY-MM-DD'));
    END LOOP;
END;
/