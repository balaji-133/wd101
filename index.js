document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');
  const tableBody = document.getElementById('entriesTable').querySelector('tbody');

  function loadEntries() {
    const entries = JSON.parse(localStorage.getItem('entries') || '[]');
    tableBody.innerHTML = '';
    entries.forEach(entry => {
      const newRow = tableBody.insertRow();
      newRow.innerHTML = `<td>${entry.name}</td><td>${entry.email}</td><td>${entry.password}</td><td>${entry.dob}</td><td>${entry.termsAccepted ? 'true' : 'false'}</td>`;
    });
  }

  function isAgeValid(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const termsAccepted = document.getElementById('terms').checked;

    if (!name || !email || !password || !dob) {
      alert('Please fill all fields.');
      return;
    }

    const age = isAgeValid(dob);
    if (age < 17 || age > 56) {
      alert('You must be between 18 and 55 years old to register.');
      return;
    }

    const entries = JSON.parse(localStorage.getItem('entries') || '[]');
    entries.push({ name, email, password, dob, termsAccepted });
    localStorage.setItem('entries', JSON.stringify(entries));
    loadEntries();

    form.reset();
  });

  loadEntries();
});
