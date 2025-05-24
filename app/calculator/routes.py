from flask import render_template, request, jsonify
from app.calculator import bp
from app.models import Meeting, Attendee

@bp.route('/', methods=['GET'])
def index():
    return render_template('calculator/index.html', title='Meeting Cost Calculator')

@bp.route('/calculate', methods=['POST'])
def calculate():
    data = request.form
    
    # Get form data
    duration = float(data.get('duration', 0))
    num_participants = int(data.get('participants', 0))
    hourly_rate = float(data.get('hourly_rate', 0))
    
    # Create attendees (simplified - all with same rate)
    attendees = [Attendee(f"Attendee {i+1}", hourly_rate) for i in range(num_participants)]
    
    # Create meeting
    meeting = Meeting("Meeting", duration, attendees)
    
    # Calculate cost
    cost = meeting.calculate_cost()
    
    return jsonify({
        'total_cost': cost,
        'currency': 'USD',
        'duration': duration,
        'participants': num_participants
    })