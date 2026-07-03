const fs = require('fs');
const url = 'https://ojwhrtwfqjshimkpupnz.supabase.co/rest/v1/?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qd2hydHdmcWpzaGlta3B1cG56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MDMyNDksImV4cCI6MjA5MDE3OTI0OX0.AaxnvyqNlDD6kcpUnPsL0XUWaXyzS4B2h3vqh8MwzS4';
fetch(url)
  .then(res => res.json())
  .then(data => {
    fs.writeFileSync('openapi.json', JSON.stringify(data, null, 2));
    console.log("Written to openapi.json");
  })
  .catch(console.error);
