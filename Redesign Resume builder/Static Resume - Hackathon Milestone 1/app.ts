const toggle = document.getElementById('toggle-achive-btn')as HTMLButtonElement;
const hiddenSec = document.getElementById('achive-id')as HTMLElement;

toggle.addEventListener("click", () => {
    if(hiddenSec.style.display === 'none'){
        hiddenSec.style.display = 'block';
        toggle.textContent = 'Hide';
    }
    else{
        hiddenSec.style.display = 'none';
        toggle.textContent = 'Show';
    }
});