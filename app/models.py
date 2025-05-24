from datetime import datetime

class Meeting:
    def __init__(self, title, duration, attendees, date=None):
        self.title = title
        self.duration = duration  # in minutes
        self.attendees = attendees  # list of attendees
        self.date = date or datetime.now()
        
    def calculate_cost(self, currency='USD'):
        total_cost = 0
        for attendee in self.attendees:
            total_cost += attendee.hourly_rate * (self.duration / 60)
        return round(total_cost, 2)
        
    def to_dict(self):
        return {
            'title': self.title,
            'duration': self.duration,
            'date': self.date.strftime('%Y-%m-%d %H:%M'),
            'attendees': [attendee.to_dict() for attendee in self.attendees],
            'cost': self.calculate_cost()
        }

class Attendee:
    def __init__(self, name, hourly_rate, role=None):
        self.name = name
        self.hourly_rate = hourly_rate
        self.role = role
        
    def to_dict(self):
        return {
            'name': self.name,
            'hourly_rate': self.hourly_rate,
            'role': self.role
        }

class ActionItem:
    def __init__(self, description, owner=None, deadline=None):
        self.description = description
        self.owner = owner
        self.deadline = deadline
        self.completed = False
        
    def mark_completed(self):
        self.completed = True
        
    def to_dict(self):
        return {
            'description': self.description,
            'owner': self.owner,
            'deadline': self.deadline.strftime('%Y-%m-%d') if self.deadline else None,
            'completed': self.completed
        }