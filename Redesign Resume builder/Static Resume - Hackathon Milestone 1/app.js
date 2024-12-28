var toggle = document.getElementById('toggle-achive-btn');
var hiddenSec = document.getElementById('achive-id');
toggle.addEventListener("click", function () {
    if (hiddenSec.style.display === 'none') {
        hiddenSec.style.display = 'block';
        toggle.textContent = 'Hide';
    }
    else {
        hiddenSec.style.display = 'none';
        toggle.textContent = 'Show';
    }
});
