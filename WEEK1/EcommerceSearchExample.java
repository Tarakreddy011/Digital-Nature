import java.util.Arrays;
import java.util.Comparator;

class PlatformItem {
    private String itemId;
    private String itemName;
    private String category;

    public PlatformItem(String itemId, String itemName, String category) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.category = category;
    }

    public String getItemId() { return itemId; }
    public String getItemName() { return itemName; }
    public String getCategory() { return category; }

    @Override
    public String toString() {
        return "Item[" + itemId + ", " + itemName + ", " + category + "]";
    }
}

class SearchEngine {
    
    // Linear Search: O(n)
    public static PlatformItem performLinearSearch(PlatformItem[] catalog, String targetId) {
        for (PlatformItem item : catalog) {
            if (item.getItemId().equals(targetId)) {
                return item;
            }
        }
        return null;
    }

    // Binary Search: O(log n) - Array MUST be sorted by itemId
    public static PlatformItem performBinarySearch(PlatformItem[] catalog, String targetId) {
        int leftIndex = 0;
        int rightIndex = catalog.length - 1;

        while (leftIndex <= rightIndex) {
            int midIndex = leftIndex + (rightIndex - leftIndex) / 2;
            int comparison = catalog[midIndex].getItemId().compareTo(targetId);

            if (comparison == 0) {
                return catalog[midIndex];
            }
            if (comparison < 0) {
                leftIndex = midIndex + 1;
            } else {
                rightIndex = midIndex - 1;
            }
        }
        return null;
    }
}

public class EcommerceSearchExample {
    public static void main(String[] args) {
        PlatformItem[] inventory = {
            new PlatformItem("I-004", "Wireless Mouse", "Electronics"),
            new PlatformItem("I-001", "Mechanical Keyboard", "Electronics"),
            new PlatformItem("I-005", "Desk Mat", "Accessories"),
            new PlatformItem("I-002", "USB-C Hub", "Electronics"),
            new PlatformItem("I-003", "Monitor Stand", "Office")
        };

        String searchTarget = "I-002";

        // 1. Testing Linear Search (Unsorted Data)
        System.out.println("--- Linear Search ---");
        PlatformItem foundLinear = SearchEngine.performLinearSearch(inventory, searchTarget);
        System.out.println("Result: " + (foundLinear != null ? foundLinear : "Item not found"));

        // 2. Testing Binary Search (Requires Sorting First)
        System.out.println("\n--- Binary Search ---");
        // Sorting the array by itemId before binary search
        Arrays.sort(inventory, Comparator.comparing(PlatformItem::getItemId));
        
        PlatformItem foundBinary = SearchEngine.performBinarySearch(inventory, searchTarget);
        System.out.println("Result: " + (foundBinary != null ? foundBinary : "Item not found"));
    }
}