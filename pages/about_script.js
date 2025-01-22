document.getElementById('aurachecker-link').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('popupModal').style.display = 'flex';
});

var closeBtn = document.getElementsByClassName('close-btn')[0];
    
closeBtn.onclick = function() {
    document.getElementById('popupModal').classList.add('close-animation');
    setTimeout(function() {
        document.getElementById('popupModal').style.display = 'none';
        document.getElementById('popupModal').classList.remove('close-animation');
    }, 1000);
}

window.onclick = function(event) {
    if (event.target == document.getElementById('popupModal')) {
        document.getElementById('popupModal').classList.add('close-animation');
        setTimeout(function() {
            document.getElementById('popupModal').style.display = 'none';
            document.getElementById('popupModal').classList.remove('close-animation');
        }, 1000); 
    }
}