class Meeting:
    def __init__(self, title, duration, attendees):
        self.title = title
        self.duration = duration  # in minutes
        self.attendees = attendees  # list of attendees
        
    def calculate_cost(self):
        total_cost = 0
        for attendee in self.attendees:
            total_cost += attendee.hourly_rate * (self.duration / 60)
        return total_cost

class Attendee:
    def __init__(self, name, hourly_rate):
        self.name = name
        self.hourly_rate = hourly_rate