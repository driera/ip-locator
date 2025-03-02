# IP Address Tracker

## Overview
A dynamic web app that enables users to track IP addresses and domains, displaying their geographical locations on an interactive map. Built with React and following Test-Driven Development principles, this project showcases modern frontend development practices while providing a seamless user experience.

## 🎯 Key Features
- **Automatic IP Detection:** Displays user's IP address and location on initial page load
- **IP & Domain Search:** Search functionality for any IP address or domain name
- **Interactive Map:** Real-time map visualization using Mapbox GL JS
- **Geolocation Data:** Displays key information about the searched IP/domain including:
  - IP Address
  - Location
  - Timezone
  - ISP (Internet Service Provider)
- **Responsive Design:** Optimized for all screen sizes and devices

## 🛠️ Technologies
- **Frontend Framework:** React
- **Map Integration:** Mapbox GL JS
- **Geolocation API:** IPify
- **Testing:** React Testing Library
- **Development Approach:** Test-Driven Development (TDD)
- **Project Management:** Agile methodologies

## 🏗️ Architecture
The application follows a component-based architecture emphasizing:
- Modular and reusable components
- Clean separation of concerns
- Robust error handling
- Comprehensive test coverage
- Responsive design principles

## 🚦 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn
- Mapbox GL JS API key
- IPify API key

### Installation
```bash
# Clone the repository
git clone [your-repo-link]

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your API keys to the .env file

# Start the development server
npm start

# Run tests
npm test
```

### 💾 Environment Variables
```
REACT_APP_MAPBOX_TOKEN=your_mapbox_token
REACT_APP_IPIFY_API_KEY=your_ipify_key
```

## 📱 Usage
[To be added: Screenshots and step-by-step usage instructions]

## 📝 License
This project is [MIT](LICENSE) licensed.

## 👨‍💻 Author
- GitHub: [driera](https://github.com/driera)
- LinkedIn: [daniriera](https://www.linkedin.com/in/daniriera/)

## 🙏 Acknowledgments
- [Frontend Mentor](https://www.frontendmentor.io) for the original challenge design
- [IPify](https://www.ipify.org) for the IP Geolocation API
- [Mapbox](https://www.mapbox.com) for the mapping platform

---
*This project is a solution to the IP Address Tracker challenge on Frontend Mentor, implemented with a focus on code quality, testing, and professional development practices.*
