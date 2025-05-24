document.addEventListener('DOMContentLoaded', function() {
    const addAttendeeBtn = document.getElementById('add-attendee');
    const attendeesList = document.getElementById('attendees-list');
    const meetingForm = document.getElementById('meeting-form');
    const resultDiv = document.getElementById('result');
    const totalCostSpan = document.getElementById('total-cost');
    
    // Add new attendee row
    addAttendeeBtn.addEventListener('click', function() {
        const newAttendeeRow = document.createElement('div');
        newAttendeeRow.className = 'attendee-row';
        
        newAttendeeRow.innerHTML = `
            <input type="text" name="attendee-name[]" placeholder="Name" required>
            <input type="number" name="attendee-rate[]" placeholder="Hourly rate" min="0" step="0.01" required>
            <button type="button" class="remove-attendee">Remove</button>
        `;
        
        attendeesList.appendChild(newAttendeeRow);
        
        // Add event listener to the new remove button
        const newRemoveButton = newAttendeeRow.querySelector('.remove-attendee');
        newRemoveButton.addEventListener('click', function() {
            attendeesList.removeChild(newAttendeeRow);
        });
    });
    
    // Add event listeners to existing remove buttons
    document.querySelectorAll('.remove-attendee').forEach(button => {
        button.addEventListener('click', function() {
            const row = this.parentElement;
            attendeesList.removeChild(row);
        });
    });
    
    // Calculate meeting cost when the form is submitted
    meetingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const duration = parseFloat(document.getElementById('meeting-duration').value);
        const attendeeRates = Array.from(document.querySelectorAll('input[name="attendee-rate[]"]'))
            .map(input => parseFloat(input.value));
        
        let totalCost = 0;
        attendeeRates.forEach(rate => {
            totalCost += rate * (duration / 60);
        });
        
        totalCostSpan.textContent = '$' + totalCost.toFixed(2);
        resultDiv.classList.remove('hidden');
    });
});