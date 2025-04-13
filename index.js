document.addEventListener('DOMContentLoaded', function() {
    // Load saved data when page loads
    loadSavedData();
    
    // Form submission handler
    document.getElementById('registrationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate email format
        const emailInput = document.getElementById('email');
        if (!emailInput.checkValidity()) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Validate age (18-55 years)
        const dobInput = document.getElementById('dob');
        const dobError = document.getElementById('dobError');
        const dob = new Date(dobInput.value);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        
        if (age < 18 || age > 55) {
            dobError.textContent = 'Age must be between 18 and 55 years';
            return;
        } else {
            dobError.textContent = '';
        }
        
        // Validate terms checkbox
        if (!document.getElementById('acceptTerms').checked) {
            alert('You must accept the terms and conditions');
            return;
        }
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = emailInput.value;
        const password = document.getElementById('password').value;
        const dobValue = dobInput.value;
        const acceptedTerms = document.getElementById('acceptTerms').checked;
        
        // Create user object
        const user = {
            name,
            email,
            password,
            dob: dobValue,
            acceptedTerms
        };
        
        // Save to localStorage
        saveUser(user);
        
        // Add to table
        addUserToTable(user);
        
        // Reset form
        this.reset();
    });
    
    // Function to save user to localStorage
    function saveUser(user) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    // Function to load saved data
    function loadSavedData() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.forEach(user => addUserToTable(user));
    }
    
    // Function to add user to table
    function addUserToTable(user) {
        const tableBody = document.getElementById('userTableBody');
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${user.dob}</td>
            <td>${user.acceptedTerms}</td>
        `;
        
        tableBody.appendChild(row);
    }
});
