public class SingletonTest {

    static class Logger {

        private static Logger instance;

        
        private Logger() {
            System.out.println("Logger object created.");
        }

        
        public static Logger getInstance() {

            if (instance == null) {
                instance = new Logger();
            }

            return instance;
        }

        
        public void log(String message) {
            System.out.println("LOG: " + message);
        }
    }

    
    public static void main(String[] args) {

        
        Logger logger1 = Logger.getInstance();
        logger1.log("Application Started");

        Logger logger2 = Logger.getInstance();
        logger2.log("Application Running");

       
        if (logger1 == logger2) {
            System.out.println("\nOnly one Logger instance exists.");
        } else {
            System.out.println("\nDifferent Logger instances exist.");
        }

        
        System.out.println("\nLogger1: " + logger1);
        System.out.println("Logger2: " + logger2);
    }
}