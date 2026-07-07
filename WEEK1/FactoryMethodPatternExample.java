// Interfaces and implementations

interface AppDocument {
    void openDocument();
    void saveDocument();
}

class WordDocumentImpl implements AppDocument {
    @Override
    public void openDocument() {
        System.out.println("Launching text editor: Opening Word document...");
    }

    @Override
    public void saveDocument() {
        System.out.println("Saving document in .docx format...");
    }
}

class PdfDocumentImpl implements AppDocument {
    @Override
    public void openDocument() {
        System.out.println("Launching PDF viewer: Loading PDF file...");
    }

    @Override
    public void saveDocument() {
        System.out.println("Exporting document as secure PDF...");
    }
}

class ExcelDocumentImpl implements AppDocument {
    @Override
    public void openDocument() {
        System.out.println("Launching spreadsheet tool: Opening Excel workbook...");
    }

    @Override
    public void saveDocument() {
        System.out.println("Saving workbook in .xlsx format...");
    }
}

// Factory abstract class and concrete factories

abstract class DocumentGeneratorFactory {
    // The factory method
    public abstract AppDocument createDocument();
    
    // Core logic that relies on the factory method
    public void executeDocumentWorkflow() {
        AppDocument doc = createDocument();
        doc.openDocument();
        doc.saveDocument();
        System.out.println("Workflow completed.\n");
    }
}

class WordGenerator extends DocumentGeneratorFactory {
    @Override
    public AppDocument createDocument() {
        return new WordDocumentImpl();
    }
}

class PdfGenerator extends DocumentGeneratorFactory {
    @Override
    public AppDocument createDocument() {
        return new PdfDocumentImpl();
    }
}

class ExcelGenerator extends DocumentGeneratorFactory {
    @Override
    public AppDocument createDocument() {
        return new ExcelDocumentImpl();
    }
}

// Main Test Class

public class FactoryMethodPatternExample {
    public static void main(String[] args) {
        System.out.println("--- Testing Word Document Factory ---");
        DocumentGeneratorFactory wordFactory = new WordGenerator();
        wordFactory.executeDocumentWorkflow();

        System.out.println("--- Testing PDF Document Factory ---");
        DocumentGeneratorFactory pdfFactory = new PdfGenerator();
        pdfFactory.executeDocumentWorkflow();
        
        System.out.println("--- Testing Excel Document Factory ---");
        DocumentGeneratorFactory excelFactory = new ExcelGenerator();
        excelFactory.executeDocumentWorkflow();
    }
}