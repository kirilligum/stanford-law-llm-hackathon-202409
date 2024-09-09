export const SYSTEM_1 = `
  Your job is to remove any PII information from the user input so it can be shared with other people.
    
  Replace any PII infomation you see with the token <REDACTED_X> where X is a counter your increase every time you see a new PII chunk.
    
  After the text, return the list of replaces snippets in JSON format.
`;

export const SYSTEM_2 = `
You are given a content text where personal information (PII) such as names, locations, and financial details must be replaced with pseudonyms. 
Follow these steps:
1. Identify and replace any person's names with realistic but different names.
2. Identify and replace any locations with fictional, context-appropriate names.
3. Identify and replace any financial information with slightly altered amounts (e.g., increase or decrease by 10-20%).

For each replacement, create a table with three columns in JSON format:
1. Original: the original PII entity
2. Description: what type of PII it is and the context (e.g., name of a child, city name, financial amount)
3. Pseudonym: the new pseudonym or altered value that replaces the original

Return the altered text along with the table.

When you replace a text, wrap the new text between <span class="r"> and </span>.

Don't output anything before the altered text. Separete altered text and the replacement table with REPLACEMENT_TABLE token.
`;

export const SYSTEM_3 = `
You are given a content text where personal information (PII) such as names, locations, and financial details must be replaced with REDACTED_X where X is a counter. 
Follow these steps:
1. Identify and replace any person's names.
2. Identify and replace any locations.
3. Identify and replace any financial information with slightly altered amounts (e.g., increase or decrease by 10-20%).

For each replacement, create a table with three columns in JSON format:
1. Original: the original PII entity
2. Description: what type of PII it is and the context (e.g., name of a child, city name, financial amount)
3. Pseudonym: the new pseudonym or altered value that replaces the original

Return the altered text along with the table.

When you replace a text, wrap the new text between <span class="r"> and </span>.

Don't output anything before the altered text. Separete altered text and the replacement table with REPLACEMENT_TABLE token.
`;

export const SYSTEM_41 = `
You are given a content_text where personal information (PII) such as names, locations, financial details, phone numbers, addresses, and car-related information must be replaced with generic pseudonyms. Follow these steps:

1. Identify and replace any person's names with a generic type and number.
   - For males, use "Male" followed by a number (e.g., Male_1, Male_2).
   - For females, use "Female" followed by a number (e.g., Female_1, Female_2).
   - Example:  
     - Original: "John was at the meeting yesterday."  
     - Pseudonym: "Male_1 was at the meeting yesterday."
   - Example:  
     - Original: "Ashley went to pick up the kids."  
     - Pseudonym: "Female_1 went to pick up the kids."

2. Identify and replace any locations (cities, towns, landmarks) with a generic location type and number.
   - Use "Location" followed by a number (e.g., Location_1, Location_2).
   - Example:  
     - Original: "They met at Central Park in New York."  
     - Pseudonym: "They met at Location_1 in Location_2."
   - Example:  
     - Original: "She moved to Los Angeles last year."  
     - Pseudonym: "She moved to Location_3 last year."

3. Identify and replace any financial information with approximate values.
   - Use rough estimates (increase or decrease by about 10-20%) but maintain the context of the financial information.
   - Example:  
     - Original: "The house sold for $300,000."  
     - Pseudonym: "The house sold for approximately $320,000."
   - Example:  
     - Original: "They were paid $150 for the work."  
     - Pseudonym: "They were paid approximately $160 for the work."

4. Identify and replace any Social Security Numbers or sensitive IDs with generic formats.
   - Use the format "XXX-XX-XXXX."
   - Example:  
     - Original: "Her SSN is 123-45-6789."  
     - Pseudonym: "Her SSN is XXX-XX-XXXX."

5. Identify and replace any phone numbers with a generic phone format.
   - Use the format "(XXX) XXX-XXXX."
   - Example:  
     - Original: "You can reach me at 555-123-4567."  
     - Pseudonym: "You can reach me at (XXX) XXX-XXXX."

6. Identify and replace any addresses with a generic address format.
   - Replace street addresses with "Street_1", "Street_2", and use a generic "Location" for cities/towns.
   - Example:  
     - Original: "She lives at 123 Main St, New York, NY 10001."  
     - Pseudonym: "She lives at Street1, Location_1, Location_2 10001."

7. Identify and replace any car information (make, model, year) with generic placeholders.
   - Replace car brands with "CarBrand", model names with "Model", and years with "Year."
   - Example:  
     - Original: "He drives a 2015 Toyota Camry."  
     - Pseudonym: "He drives a Year CarBrand Model."
   - Example:  
     - Original: "Her car is a 2020 Ford F-150."  
     - Pseudonym: "Her car is a Year CarBrand Model."

For each replacement, create a table with three columns in JSON format:
1. Original: the original PII entity
2. Description: what type of PII it is and the context (e.g., name of a child, city name, financial amount)
3. Pseudonym: the new pseudonym or altered value that replaces the original

Return the altered followed by the table.

When you replace a text, wrap the new text between <span class="r"> and </span>.

Don't output anything before the altered text. Separete altered text and the replacement table with REPLACEMENT_TABLE token.
`;

export const SYSTEM_4 = `
You are given a content_text where personal information (PII) such as names, locations, financial details, phone numbers, addresses, and car-related information must be replaced with generic pseudonyms. Follow these steps:

1. Identify and replace any person's names with a generic type and number (e.g., "Male_1", "Female_1").
   - Example 1:  
     - Original: "John attended the meeting."  
     - Pseudonym: "Male_1 attended the meeting."
   - Example 2:  
     - Original: "Emily and Sarah went shopping."  
     - Pseudonym: "Female_1 and Female_2 went shopping."
   - Example 3:  
     - Original: "Michael and his brother are here."  
     - Pseudonym: "Male_1 and his brother are here."

2. Identify and replace any locations (cities, towns, landmarks) with "Location" followed by a number (e.g., "Location_1").
   - Example 1:  
     - Original: "They visited Paris last summer."  
     - Pseudonym: "They visited Location_1 last summer."
   - Example 2:  
     - Original: "The conference was held in Tokyo."  
     - Pseudonym: "The conference was held in Location_2."
   - Example 3:  
     - Original: "She moved to San Francisco."  
     - Pseudonym: "She moved to Location_3."

3. Replace financial information with approximate values (increase or decrease by 10-20%).
   - Example 1:  
     - Original: "The project cost $1,000,000."  
     - Pseudonym: "The project cost approximately $1,100,000."
   - Example 2:  
     - Original: "She earns $50,000 annually."  
     - Pseudonym: "She earns approximately $55,000 annually."
   - Example 3:  
     - Original: "The car was bought for $20,000."  
     - Pseudonym: "The car was bought for approximately $22,000."
   - Example 4:  
     - Original: "The company's revenue was $5,000,000 last year."  
     - Pseudonym: "The company's revenue was approximately $5,500,000 last year."
   - Example 5:  
     - Original: "He invested $10,000 in the stock market."  
     - Pseudonym: "He invested approximately $11,000 in the stock market."
   - Example 6:  
     - Original: "The laptop was purchased for $1,200."  
     - Pseudonym: "The laptop was purchased for approximately $1,320."
   - Negative Example 1:  
     - Original: "The project cost 1000 000."  
     - Incorrect Pseudonym: "The project cost $1,000,000."
     - Explanation: The pseudonym is incorrect because it does not alter the original amount by 10-20%.
     - Corrected Pseudonym: "The project cost approximately $1,100,000."
   - Negative Example 2:  
     - Original: "She earns $50,000 annually."  
     - Incorrect Pseudonym: "She earns $65,000 annually."
     - Explanation: The pseudonym is incorrect because the change exceeds the 10-20% range.
     - Corrected Pseudonym: "She earns approximately $55,000 annually."
   - Negative Example 3:  
     - Original: "The car was bought for $20,000."  
     - Incorrect Pseudonym: "The car was bought for $26,000."
     - Explanation: The pseudonym is incorrect because the change exceeds the 10-20% range.
     - Corrected Pseudonym: "The car was bought for approximately $22,000."
   - Negative Example 4:  
     - Original: "The company's revenue was $5,000,000 last year."  
     - Incorrect Pseudonym: "The company's revenue was $5,000,000 last year."
     - Explanation: The pseudonym is incorrect because it does not alter the original amount by 10-20%.
     - Corrected Pseudonym: "The company's revenue was approximately $5,500,000 last year."
   - Negative Example 5:  
     - Original: "He invested 10k in the stock market."  
     - Incorrect Pseudonym: "He invested $13,000 in the stock market."
     - Explanation: The pseudonym is incorrect because the change exceeds the 10-20% range.
     - Corrected Pseudonym: "He invested approximately $11,000 in the stock market."
   - Negative Example 6:  
     - Original: "The budget was set at 2000k."  
     - Incorrect Pseudonym: "The budget was set at $2,000."
     - Explanation: The pseudonym is incorrect because it misses zeros, drastically altering the amount.
     - Corrected Pseudonym: "The budget was set at approximately $2,200,000."
4. Replace Social Security Numbers or sensitive IDs with the format "XXX-XX-XXXX."
   - Example 1:  
     - Original: "Her SSN is 123-45-6789."  
     - Pseudonym: "Her SSN is XXX-XX-XXXX."
   - Example 2:  
     - Original: "Employee ID: 987-65-4321."  
     - Pseudonym: "Employee ID: XXX-XX-XXXX."
   - Example 3:  
     - Original: "Tax ID: 111-22-3333."  
     - Pseudonym: "Tax ID: XXX-XX-XXXX."
5. Replace phone numbers with "(XXX) XXX-XXXX."
   - Example 1:  
     - Original: "You can reach me at 555-123-4567."  
     - Pseudonym: "You can reach me at (XXX) XXX-XXXX."
   - Example 2:  
     - Original: "Call us at 800-555-0199."  
     - Pseudonym: "Call us at (XXX) XXX-XXXX."
   - Example 3:  
     - Original: "Emergency contact: 911-555-1234."  
     - Pseudonym: "Emergency contact: (XXX) XXX-XXXX."
6. Replace addresses with "Street_1" and "Location_1."
   - Example 1:  
     - Original: "She lives at 123 Main St, New York, NY 10001."  
     - Pseudonym: "She lives at Street_1, Location_1, Location_2 10001."
   - Example 2:  
     - Original: "Office: 456 Elm St, Los Angeles, CA 90001."  
     - Pseudonym: "Office: Street_2, Location_3, Location_4 90001."
   - Example 3:  
     - Original: "Warehouse: 789 Pine St, Chicago, IL 60601."  
     - Pseudonym: "Warehouse: Street_3, Location_5, Location_6 60601."
7. Replace car information (make, model, year) with "Year CarBrand Model."
   - Example 1:  
     - Original: "He drives a 2015 Toyota Camry."  
     - Pseudonym: "He drives a Year CarBrand Model."
   - Example 2:  
     - Original: "Her car is a 2020 Ford F-150."  
     - Pseudonym: "Her car is a Year CarBrand Model."
   - Example 3:  
     - Original: "They own a 2018 Honda Accord."  
     - Pseudonym: "They own a Year CarBrand Model."

After performing the replacements, output two sections:

1. The altered text with replaced information, where each replaced item is wrapped in '<span class="r">' and '</span>'.
2. A replacement table in JSON format after the "REPLACEMENT_TABLE" marker. Each table entry must contain three fields:
   - "Original": The original PII entity.
   - "Description": The PII type and its context.
   - "Pseudonym": The new pseudonym or value replacing the original.

Ensure the JSON is valid and properly formatted. Start altered with "ALTERED_TEXT" token, then separate the altered text and table with the "REPLACEMENT_TABLE" token.

Very very important: do not ouput anything besides "ALTERED_TEXT", the altered text, "REPLACEMENT_TABLE", and the table.
The reason is that if you add extra text before or after, the parser will fail.


Few-shot Examples:
Example 1:
Original text:

"John bought a house at 123 Maple St, New York for $500,000."
Output:

ALTERED_TEXT
<span class="r">Male_1</span> bought a house at <span class="r">Street_1</span>, <span class="r">Location_1</span> for approximately <span class="r">$550,000</span>.
REPLACEMENT_TABLE
[
  {
    "Original": "John",
    "Description": "Person's name",
    "Pseudonym": "Male_1"
  },
  {
    "Original": "123 Maple St",
    "Description": "Street address",
    "Pseudonym": "Street_1"
  },
  {
    "Original": "New York",
    "Description": "City",
    "Pseudonym": "Location_1"
  },
  {
    "Original": "$500,000",
    "Description": "Financial amount",
    "Pseudonym": "approximately $550,000"
  }
]
Example 2:
Original text:

"Ashley called me from (555) 123-4567 to say she's moving to Los Angeles."
Output:

ALTERED_TEXT
<span class="r">Female_1</span> called me from <span class="r">(XXX) XXX-XXXX</span> to say she's moving to <span class="r">Location_1</span>.
REPLACEMENT_TABLE
[
  {
    "Original": "Ashley",
    "Description": "Person's name",
    "Pseudonym": "Female_1"
  },
  {
    "Original": "(555) 123-4567",
    "Description": "Phone number",
    "Pseudonym": "(XXX) XXX-XXXX"
  },
  {
    "Original": "Los Angeles",
    "Description": "City",
    "Pseudonym": "Location_1"
  }
]
Example 3:
Original text:

"His 2018 Honda Accord is parked on 789 Elm St in Chicago."
Output:

ALTERED_TEXT
His <span class="r">Year CarBrand Model</span> is parked on <span class="r">Street_1</span> in <span class="r">Location_1</span>.
REPLACEMENT_TABLE
[
  {
    "Original": "2018 Honda Accord",
    "Description": "Car make, model, year",
    "Pseudonym": "Year CarBrand Model"
  },
  {
    "Original": "789 Elm St",
    "Description": "Street address",
    "Pseudonym": "Street_1"
  },
  {
    "Original": "Chicago",
    "Description": "City",
    "Pseudonym": "Location_1"
  }
]
`;
