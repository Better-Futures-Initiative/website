from flask import Flask, render_template, request, redirect, url_for, flash
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

template_dir = os.path.abspath('templates/')
static_dir = os.path.abspath('static/')

app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)
app.secret_key = 'your-secret-key-change-this-in-production'

# Email configuration
SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 587
EMAIL_ADDRESS = 'betterfuturesinitiative@gmail.com'
EMAIL_PASSWORD = 'alaz xyog odkp zasg'  # You'll need to set up an app password


def send_email(name, email, subject, message):
    try:
        # Create message
        msg = MIMEMultipart()
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = EMAIL_ADDRESS
        msg['Subject'] = f'Contact Form: {subject}'

        # Email body
        body = f"""
        New contact form submission:

        Name: {name}
        Email: {email}
        Subject: {subject}

        Message:
        {message}
        """

        msg.attach(MIMEText(body, 'plain'))

        # Connect to server and send email
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        text = msg.as_string()
        server.sendmail(EMAIL_ADDRESS, EMAIL_ADDRESS, text)
        server.quit()

        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False


# Sample data for the robotics project
project_features = [
    {
        'title': 'Mechanical Engineering',
        'description': 'Learn about servo motors, joints, and mechanical design principles',
        'icon': '⚙️'
    },
    {
        'title': 'Electronics & Circuits',
        'description': 'Understand Arduino programming and electronic components',
        'icon': '🔌'
    },
    {
        'title': 'Control Theory',
        'description': 'Master feedback systems and robotic control algorithms',
        'icon': '🎮'
    },
    {
        'title': 'Software & Coding',
        'description': 'Develop programming skills through practical robotics applications',
        'icon': '💻'
    },
    {
        'title': 'Mathematics & Physics',
        'description': 'Apply real-world math and physics concepts to robotics',
        'icon': '📐'
    },
    {
        'title': 'Open Source Learning',
        'description': 'Access free tutorials, code, and schematics for everyone',
        'icon': '🌍'
    }
]


# Routes
@app.route('/')
def index():
    return render_template('index.html', features=project_features)


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/project')
def project():
    return render_template('project.html', features=project_features)


@app.route('/tutorials')
def tutorials():
    # Sample tutorial data
    tutorials = [
        {'title': 'Getting Started with Arduino', 'level': 'Beginner', 'duration': '30 min'},
        {'title': 'Building Your First Servo Motor Circuit', 'level': 'Beginner', 'duration': '45 min'},
        {'title': 'Programming Basic Movements', 'level': 'Intermediate', 'duration': '60 min'},
        {'title': 'Implementing Object Detection', 'level': 'Advanced', 'duration': '90 min'}
    ]
    return render_template('tutorials.html', tutorials=tutorials)


@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        print("Form submitted!")  # Debug line
        name = request.form.get('name')
        email = request.form.get('email')
        subject = request.form.get('subject')
        message = request.form.get('message')

        print(f"Form data - Name: {name}, Email: {email}, Subject: {subject}")  # Debug line

        # Send email
        if send_email(name, email, subject, message):
            flash(f'Thank you {name}! Your message has been sent successfully. We\'ll get back to you soon!', 'success')
        else:
            flash('Sorry, there was an error sending your message. Please try again later.', 'danger')

        return redirect(url_for('contact'))

    return render_template('contact.html')


@app.route('/initiative')
def initiative():
    return render_template('initiative.html')


if __name__ == '__main__':
    app.run(debug=True)