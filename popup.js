// Load saved data when popup opens
document.addEventListener('DOMContentLoaded', () => {
  loadSavedData();
  
  // Add event listeners
  document.getElementById('saveBtn').addEventListener('click', saveData);
  document.getElementById('autofillBtn').addEventListener('click', autofillForm);
});

// Load data from Chrome storage
function loadSavedData() {
  chrome.storage.sync.get(['userData'], (result) => {
    if (result.userData) {
      document.getElementById('fullName').value = result.userData.fullName || '';
      document.getElementById('email').value = result.userData.email || '';
      document.getElementById('phone').value = result.userData.phone || '';
      document.getElementById('skills').value = result.userData.skills || '';
    }
  });
}

// Save user data to Chrome storage
function saveData() {
  const userData = {
    fullName: document.getElementById('fullName').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    skills: document.getElementById('skills').value
  };
  
  // Validate data
  if (!userData.fullName || !userData.email || !userData.phone) {
    showStatus('Please fill in all required fields!', 'error');
    return;
  }
  
  // Save to Chrome storage
  chrome.storage.sync.set({ userData }, () => {
    showStatus('Data saved successfully!', 'success');
  });
}

// Send message to content script to autofill
function autofillForm() {
  chrome.storage.sync.get(['userData'], (result) => {
    if (!result.userData) {
      showStatus('Please save your data first!', 'error');
      return;
    }
    
    // Get active tab and send message to content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: 'autofill', data: result.userData },
        (response) => {
          if (chrome.runtime.lastError) {
            showStatus('Error: Please refresh the page and try again', 'error');
          } else if (response && response.success) {
            showStatus(`Form filled! ${response.fieldsCount} fields updated`, 'success');
          } else {
            showStatus('No form fields found on this page', 'error');
          }
        }
      );
    });
  });
}

// Show status message
function showStatus(message, type) {
  const statusDiv = document.getElementById('status');
  statusDiv.textContent = message;
  statusDiv.className = `status ${type}`;
  
  // Hide after 3 seconds
  setTimeout(() => {
    statusDiv.style.display = 'none';
  }, 3000);
}