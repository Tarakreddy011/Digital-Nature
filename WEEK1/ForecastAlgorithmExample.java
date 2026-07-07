// Financial prediction utility class
class WealthPredictor {
    
    /**
     * Recursively calculates the future value of an investment.
     * * @param initialAmount The starting balance.
     * @param annualGrowthRate The expected annual growth (e.g., 0.05 for 5%).
     * @param yearsAhead The number of years into the future to predict.
     * @return The projected future value.
     */
    public static double calculateProjectedValue(double initialAmount, double annualGrowthRate, int yearsAhead) {
       
        if (yearsAhead == 0) {
            return initialAmount;
        }
        
        
        double nextYearAmount = initialAmount + (initialAmount * annualGrowthRate);
        return calculateProjectedValue(nextYearAmount, annualGrowthRate, yearsAhead - 1);
    }
}

// Main execution class
public class ForecastAlgorithmExample {
    public static void main(String[] args) {
        double currentPortfolioValue = 15000.00; 
        double expectedAnnualReturn = 0.07;      
        int predictionYears = 5;               

        System.out.println("=== Recursive Financial Forecast ===");
        System.out.println("Starting Balance: $" + currentPortfolioValue);
        System.out.println("Estimated Annual Growth: " + (expectedAnnualReturn * 100) + "%");
        System.out.println("Forecasting Period: " + predictionYears + " years\n");
        
        // Execute the recursive algorithm
        double projectedFutureValue = WealthPredictor.calculateProjectedValue(
            currentPortfolioValue, 
            expectedAnnualReturn, 
            predictionYears
        );
        
        System.out.printf("Projected Value after %d years: $%.2f\n", predictionYears, projectedFutureValue);
    }
}