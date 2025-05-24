from flask import render_template, request, redirect, url_for, flash, session
from app.settings import bp

@bp.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Update user settings
        session['currency'] = request.form.get('currency', 'USD')
        
        # Handle dark mode toggle
        if request.form.get('dark_mode') == 'on':
            session['theme'] = 'dark'
        else:
            session['theme'] = 'light'
            
        flash('Settings saved successfully!', 'success')
        return redirect(url_for('settings.index'))
        
    return render_template('settings/index.html', title='Settings')