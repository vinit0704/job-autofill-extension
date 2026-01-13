# Job Application Autofill Extension

A Chrome extension that automatically fills job application forms with saved user data, helping users save time during the job application process.

## Features

- 📝 Autofill common job application fields
- 💾 Save user data locally using Chrome storage
- 🎯 Smart field detection (name, email, phone, skills)
- ✨ Visual feedback when fields are filled
- 🔒 Data stored securely in Chrome sync storage

## Installation

### Method 1: Load Unpacked Extension (For Development)

1. **Clone the repository**
```bash
   git clone https://github.com/vinit0704/job-autofill-extension.git
   cd job-autofill-extension
```

2. **Open Chrome Extensions page**
   - Open Chrome browser
   - Navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right corner)

3. **Load the extension**
   - Click "Load unpacked"
   - Select the `job-autofill-extension` folder
   - The extension icon should appear in your toolbar

## How to Use

### Step 1: Save Your Information

1. Click the extension icon in Chrome toolbar
2. Fill in your details:
   - Full Name
   - Email Address
   - Phone Number
   - Skills/Experience
3. Click "Save Data" button

### Step 2: Autofill Forms

1. Navigate to any job application page
2. Click the extension icon
3. Click "Autofill Form" button
4. Watch as your information is automatically filled in!

## Supported Fields

The extension automatically detects and fills:

- **Name fields**: name, full name, fullname, applicant name
- **Email fields**: email, e-mail, email address
- **Phone fields**: phone, telephone, mobile, contact number
- **Skills fields**: skills, experience, expertise, qualifications, summary

## Technical Details

### Technologies Used

- JavaScript (ES6+)
- Chrome Extensions API (Manifest V3)
- Chrome Storage API
- DOM Manipulation

### Project Structure
```
job-autofill-extension/
├── manifest.json       # Extension configuration
├── popup.html          # Extension popup UI
├── popup.js           # Popup logic
├── content.js         # Content script for DOM manipulation
├── styles.css         # Styling
└── icons/             # Extension icons
```

### Key Features Implementation

- **Content Scripts**: Inject scripts into web pages for DOM manipulation
- **Chrome Storage API**: Persist user data across sessions
- **Message Passing**: Communication between popup and content scripts
- **Smart Field Detection**: Multiple keyword matching for field detection

## Development

### Prerequisites

- Google Chrome browser
- Basic knowledge of JavaScript
- Text editor (VS Code recommended)

### Testing

1. Load the extension in developer mode
2. Test on sample job application forms:
   - LinkedIn job applications
   - Indeed application forms
   - Company career pages
3. Check console for any errors (`F12` → Console)

### Debugging

- **Check console logs**: Open DevTools on the page (`F12`)
- **Inspect popup**: Right-click extension icon → "Inspect popup"
- **View background errors**: Go to `chrome://extensions/` → "Errors" button

## Known Limitations

- Works best with standard HTML form fields
- May not work on heavily customized forms
- Requires page reload after extension installation
- Does not handle dynamic/AJAX forms perfectly

## Future Enhancements

- [ ] Support for resume/CV upload
- [ ] Multiple profile support
- [ ] LinkedIn profile import
- [ ] Cover letter templates
- [ ] Application tracking

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for learning and development.

## Author

[Vinit Kamble]

## Acknowledgments

- Built as part of Zobsai Chrome Extension Developer Intern assignment
- Thanks to Zobsai for the opportunity

---

