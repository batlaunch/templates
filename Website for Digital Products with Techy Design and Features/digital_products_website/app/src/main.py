from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
import os
import sys
import datetime

# Add the parent directory to sys.path
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key_here'  # Change this in production

# Configure database
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///site.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database
db = SQLAlchemy(app)

# Initialize login manager
login_manager = LoginManager(app)
login_manager.login_view = 'login'
login_manager.login_message_category = 'info'

# Contact email configuration - REPLACE THIS WITH YOUR EMAIL
CONTACT_EMAIL = "your_email@example.com"

# User model
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    date_registered = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    reviews = db.relationship('Review', backref='author', lazy=True)
    orders = db.relationship('Order', backref='customer', lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

# Review model
class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Float, nullable=False)
    content = db.Column(db.Text, nullable=False)
    company = db.Column(db.String(100))
    date_posted = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    approved = db.Column(db.Boolean, default=False)

# Service model
class Service(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    orders = db.relationship('Order', backref='service', lazy=True)

# Order model
class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('service.id'), nullable=False)
    date_ordered = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    status = db.Column(db.String(20), default='pending')
    notes = db.Column(db.Text)

# Contact message model
class ContactMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20))
    service = db.Column(db.String(100))
    message = db.Column(db.Text, nullable=False)
    date_sent = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    read = db.Column(db.Boolean, default=False)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Routes
@app.route('/')
def index():
    return render_template('index.html', current_year=datetime.datetime.now().year)

@app.route('/services')
def services():
    return render_template('services.html', current_year=datetime.datetime.now().year)

@app.route('/pricing')
def pricing():
    services = Service.query.all()
    return render_template('pricing.html', services=services, current_year=datetime.datetime.now().year)

@app.route('/reviews', methods=['GET'])
def reviews():
    page = request.args.get('page', 1, type=int)
    per_page = 9
    reviews = Review.query.filter_by(approved=True).order_by(Review.date_posted.desc()).paginate(page=page, per_page=per_page)
    return render_template('reviews.html', reviews=reviews.items, current_page=page, pages=reviews.pages, current_year=datetime.datetime.now().year)

@app.route('/submit_review', methods=['POST'])
@login_required
def submit_review():
    rating = request.form.get('rating')
    company = request.form.get('company')
    content = request.form.get('review')
    
    if not rating or not content:
        flash('Please fill in all required fields', 'danger')
        return redirect(url_for('reviews'))
    
    review = Review(
        rating=float(rating),
        content=content,
        company=company,
        user_id=current_user.id
    )
    
    db.session.add(review)
    db.session.commit()
    
    flash('Your review has been submitted and is pending approval', 'success')
    return redirect(url_for('reviews'))

@app.route('/contact')
def contact():
    return render_template('contact.html', contact_email=CONTACT_EMAIL, current_year=datetime.datetime.now().year)

@app.route('/submit_contact', methods=['POST'])
def submit_contact():
    name = request.form.get('name')
    email = request.form.get('email')
    phone = request.form.get('phone')
    service = request.form.get('service')
    message = request.form.get('message')
    
    if not name or not email or not message:
        flash('Please fill in all required fields', 'danger')
        return redirect(url_for('contact'))
    
    contact_message = ContactMessage(
        name=name,
        email=email,
        phone=phone,
        service=service,
        message=message
    )
    
    db.session.add(contact_message)
    db.session.commit()
    
    flash('Your message has been sent! We will get back to you soon.', 'success')
    return redirect(url_for('contact'))

@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm_password')
        
        if not username or not email or not password or not confirm_password:
            flash('Please fill in all fields', 'danger')
            return render_template('register.html', current_year=datetime.datetime.now().year)
        
        if password != confirm_password:
            flash('Passwords do not match', 'danger')
            return render_template('register.html', current_year=datetime.datetime.now().year)
        
        if User.query.filter_by(username=username).first():
            flash('Username already exists', 'danger')
            return render_template('register.html', current_year=datetime.datetime.now().year)
        
        if User.query.filter_by(email=email).first():
            flash('Email already registered', 'danger')
            return render_template('register.html', current_year=datetime.datetime.now().year)
        
        user = User(username=username, email=email)
        user.set_password(password)
        
        db.session.add(user)
        db.session.commit()
        
        flash('Your account has been created! You can now log in.', 'success')
        return redirect(url_for('login'))
    
    return render_template('register.html', current_year=datetime.datetime.now().year)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        remember = request.form.get('remember') == 'on'
        
        user = User.query.filter_by(email=email).first()
        
        if not user or not user.check_password(password):
            flash('Invalid email or password', 'danger')
            return render_template('login.html', current_year=datetime.datetime.now().year)
        
        login_user(user, remember=remember)
        next_page = request.args.get('next')
        
        flash('You have been logged in!', 'success')
        return redirect(next_page or url_for('dashboard'))
    
    return render_template('login.html', current_year=datetime.datetime.now().year)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You have been logged out', 'success')
    return redirect(url_for('index'))

@app.route('/dashboard')
@login_required
def dashboard():
    user_reviews = Review.query.filter_by(user_id=current_user.id).order_by(Review.date_posted.desc()).all()
    user_orders = Order.query.filter_by(user_id=current_user.id).order_by(Order.date_ordered.desc()).all()
    
    return render_template('dashboard.html', reviews=user_reviews, orders=user_orders, current_year=datetime.datetime.now().year)

@app.route('/account', methods=['GET', 'POST'])
@login_required
def account():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        current_password = request.form.get('current_password')
        new_password = request.form.get('new_password')
        confirm_password = request.form.get('confirm_password')
        
        if username != current_user.username and User.query.filter_by(username=username).first():
            flash('Username already exists', 'danger')
            return redirect(url_for('account'))
        
        if email != current_user.email and User.query.filter_by(email=email).first():
            flash('Email already registered', 'danger')
            return redirect(url_for('account'))
        
        if current_password and not current_user.check_password(current_password):
            flash('Current password is incorrect', 'danger')
            return redirect(url_for('account'))
        
        if new_password and new_password != confirm_password:
            flash('New passwords do not match', 'danger')
            return redirect(url_for('account'))
        
        current_user.username = username
        current_user.email = email
        
        if new_password:
            current_user.set_password(new_password)
        
        db.session.commit()
        flash('Your account has been updated!', 'success')
        return redirect(url_for('account'))
    
    return render_template('account.html', current_year=datetime.datetime.now().year)

@app.route('/order/<int:service_id>', methods=['GET', 'POST'])
@login_required
def order(service_id):
    service = Service.query.get_or_404(service_id)
    
    if request.method == 'POST':
        notes = request.form.get('notes')
        
        order = Order(
            user_id=current_user.id,
            service_id=service_id,
            notes=notes
        )
        
        db.session.add(order)
        db.session.commit()
        
        flash(f'Your order for {service.name} has been placed!', 'success')
        return redirect(url_for('dashboard'))
    
    return render_template('order.html', service=service, current_year=datetime.datetime.now().year)

# Error handlers
@app.errorhandler(404)
def page_not_found(e):
    return render_template('errors/404.html', current_year=datetime.datetime.now().year), 404

@app.errorhandler(500)
def internal_server_error(e):
    return render_template('errors/500.html', current_year=datetime.datetime.now().year), 500

# Context processor for global variables
@app.context_processor
def inject_globals():
    return {
        'current_year': datetime.datetime.now().year,
        'contact_email': CONTACT_EMAIL
    }

# Create database tables
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
