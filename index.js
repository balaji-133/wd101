
document.getElementById('registrationForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const dob = document.getElementById('dob').value;
  const termsAccepted = document.getElementById('terms').checked;

  if (!name || !email || !password || !dob || !termsAccepted) {
    alert('Please fill all fields and accept the terms.');
    return;
  }

  const table = document.getElementById('entriesTable').querySelector('tbody');
  const newRow = table.insertRow();

  newRow.innerHTML = `<td>${name}</td><td>${email}</td><td>${password}</td><td>${dob}</td><td>${termsAccepted ? 'true' : 'false'}</td>`;

  this.reset();
});