import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    # Default currency is USD
    DEFAULT_CURRENCY = 'USD'
    # Default theme is light
    DEFAULT_THEME = 'light'