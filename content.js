// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'autofill') {
    const result = autofillFormFields(request.data);
    sendResponse(result);
  }
  return true; // Keep message channel open for async response
});

// Main autofill function
function autofillFormFields(userData) {
  let fieldsCount = 0;
  
  // Find and fill name fields
  fieldsCount += fillField(['name', 'full name', 'fullname', 'your name', 'applicant name'], userData.fullName);
  
  // Find and fill email fields
  fieldsCount += fillField(['email', 'e-mail', 'email address', 'your email'], userData.email);
  
  // Find and fill phone fields
  fieldsCount += fillField(['phone', 'telephone', 'mobile', 'contact', 'phone number', 'contact number'], userData.phone);
  
  // Find and fill skills/experience fields
  fieldsCount += fillField(['skills', 'experience', 'expertise', 'qualifications', 'about', 'summary', 'bio'], userData.skills);
  
  return { success: fieldsCount > 0, fieldsCount };
}

// Generic function to find and fill fields
function fillField(keywords, value) {
  let filled = 0;
  
  // Get all input and textarea elements
  const inputs = document.querySelectorAll('input:not([type="hidden"]):not([type="submit"]):not([type="button"]), textarea');
  
  inputs.forEach(input => {
    // Check if field is already filled
    if (input.value && input.value.trim() !== '') {
      return; // Skip already filled fields
    }
    
    // Check various attributes for keyword match
    const name = (input.name || '').toLowerCase();
    const id = (input.id || '').toLowerCase();
    const placeholder = (input.placeholder || '').toLowerCase();
    const label = findLabelText(input).toLowerCase();
    const ariaLabel = (input.getAttribute('aria-label') || '').toLowerCase();
    
    // Combine all searchable text
    const searchText = `${name} ${id} ${placeholder} ${label} ${ariaLabel}`;
    
    // Check if any keyword matches
    const matches = keywords.some(keyword => searchText.includes(keyword.toLowerCase()));
    
    if (matches) {
      // Fill the field
      input.value = value;
      
      // Trigger events to ensure form validation works
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
      
      // Add visual feedback
      input.style.transition = 'background-color 0.3s';
      input.style.backgroundColor = '#e8f5e9';
      setTimeout(() => {
        input.style.backgroundColor = '';
      }, 1000);
      
      filled++;
    }
  });
  
  return filled;
}

// Helper function to find label text for an input
function findLabelText(input) {
  // Try to find label by 'for' attribute
  if (input.id) {
    const label = document.querySelector(`label[for="${input.id}"]`);
    if (label) return label.textContent;
  }
  
  // Try to find parent label
  const parentLabel = input.closest('label');
  if (parentLabel) return parentLabel.textContent;
  
  // Try to find previous sibling label
  let sibling = input.previousElementSibling;
  if (sibling && sibling.tagName === 'LABEL') {
    return sibling.textContent;
  }
  
  return '';
}

// Add console log for debugging
console.log('Job Autofill Extension: Content script loaded');