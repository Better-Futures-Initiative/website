from flask import Flask, render_template, request, redirect, url_for, flash
import os

app = Flask(__name__)
app.secret_key = 'your-secret-key-change-this-in-production'

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
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')

        # In a real application, you would save this to a database or send an email
        flash(f'Thank you {name}! Your message has been received. We\'ll get back to you soon!', 'success')
        return redirect(url_for('contact'))

    return render_template('contact.html')


@app.route('/initiative')
def initiative():
    return render_template('initiative.html')


if __name__ == '__main__':
    app.run(debug=True)