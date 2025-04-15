import os

basedir = os.path.abspath(os.path.dirname(__file__))  

SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
SQLALCHEMY_TRACK_MODIFICATIONS = False
DEBUG = True
SECRET_KEY = os.urandom(24)

# config.py

import os
import bcrypt

ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD_HASH = os.getenv("ADMIN_PASSWORD")  # hash bcrypt
print("🚀 ADMIN_USERNAME =", os.getenv("ADMIN_USERNAME"))
print("🚀 ADMIN_PASSWORD =", os.getenv("ADMIN_PASSWORD"))

def verify_password(input_password: str) -> bool:
    return bcrypt.checkpw(input_password.encode(), ADMIN_PASSWORD_HASH.encode())





class Config:
    # Configuration Flask & base de données
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.urandom(24)
    DEBUG = True

    # Configuration pour Flask-Mail avec Gmail
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.getenv("MAIL_USERNAME")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
    MAIL_DEFAULT_SENDER = os.getenv("MAIL_DEFAULT_SENDER")