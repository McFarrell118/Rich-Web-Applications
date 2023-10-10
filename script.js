alert('Welcome to the home page') 

document.addEventListener('DOMContentLoaded', function() {
  var button = document.querySelector('.btn');

  button.addEventListener('click', function() {
      alert('Button was clicked!');
  });
});
