# Digital Products Website

A complete website for a digital products company offering services including website development, SEO, cold email marketing, and Facebook ads management. The website features a modern, tech-focused design with smooth animations and intuitive navigation.

## Features

- Responsive, modern design with tech-focused aesthetics
- Product/service listings with descriptions and pricing
- Working contact form (requires email configuration)
- Customer reviews system
- User authentication and account management
- Admin dashboard for order management

## Technologies Used

- Flask (Python web framework)
- SQLite database (can be upgraded to MySQL)
- HTML5, CSS3, JavaScript
- Font Awesome icons
- Custom animations and transitions

## Directory Structure

```
app/
├── src/
│   ├── main.py              # Main application entry point
│   ├── models/              # Database models
│   ├── static/              # Static assets
│   │   ├── css/             # Stylesheets
│   │   ├── js/              # JavaScript files
│   │   └── images/          # Image assets
│   └── templates/           # HTML templates
├── venv/                    # Python virtual environment
└── requirements.txt         # Python dependencies
```

## Installation and Setup

1. Ensure you have Python 3.8+ installed
2. Clone this repository to your local machine
3. Navigate to the project directory

```bash
cd digital_products_website/app
```

4. Create and activate a virtual environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

5. Install dependencies

```bash
pip install -r requirements.txt
```

6. Run the application

```bash
python src/main.py
```

7. Access the website at http://localhost:5000

## Deployment

### Option 1: Deploy to Your Own Server

1. Set up a web server (Apache/Nginx)
2. Configure the server to serve the Flask application
3. Set up a production database (MySQL recommended)
4. Update the database configuration in `src/main.py`
5. Configure email settings for the contact form

### Option 2: Deploy to a Cloud Provider

The application can be deployed to platforms like:
- Heroku
- AWS Elastic Beanstalk
- Google Cloud Run
- DigitalOcean App Platform

## Customization

### Contact Form Email

To configure the contact form to send emails to your address:

1. Open `src/main.py`
2. Locate the contact form route
3. Replace `YOUR_EMAIL_HERE` with your actual email address

```python
# In src/main.py
app.config['MAIL_DEFAULT_SENDER'] = 'YOUR_EMAIL_HERE'
```

### Adding New Services

1. Open `src/main.py`
2. Locate the services list
3. Add new services following the existing format

## Image Credits

All images used in this project are royalty-free and licensed for commercial use. See `src/static/images/image_descriptions.md` for detailed attributions.

## License

This project is provided for your use as requested. You are free to modify and deploy it on your own domain and web server.
