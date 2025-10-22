let selectedScript = null;
let selectedScriptUrl = null;

function handleChannelFollow() {
    const successMessage = document.getElementById('successMessage');
    const continueButton = document.getElementById('continueButton');

    successMessage.classList.add('show');
    setTimeout(() => { continueButton.style.display = 'block'; }, 2000);
    setTimeout(() => { showTool(); }, 4000);
}

function showTool() {
    document.getElementById('followState').style.display = 'none';
    document.getElementById('toolState').style.display = 'block';
}

function showFollow() {
    document.getElementById('toolState').style.display = 'none';
    document.getElementById('followState').style.display = 'block';
    document.getElementById('successMessage').classList.remove('show');
    document.getElementById('continueButton').style.display = 'none';
}

function selectScript(scriptId, scriptUrl) {
    const allOptions = document.querySelectorAll('.script-option');
    allOptions.forEach(option => option.classList.remove('selected'));

    const clickedOption = event.currentTarget;
    if (!clickedOption.classList.contains('coming-soon')) {
        clickedOption.classList.add('selected');
        selectedScript = scriptId;
        selectedScriptUrl = scriptUrl;
        document.getElementById('downloadButton').classList.add('active');
    }
}

function downloadScript() {
    if (selectedScript && selectedScriptUrl) {
        window.open(selectedScriptUrl, '_blank');
        showNotification('Opening download for ' + selectedScript.toUpperCase() + '...', 'success');
    } else {
        showNotification('Please select a script first!', 'warning');
    }
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? 'linear-gradient(135deg, #28a745, #20c997)' : 
                   'linear-gradient(135deg, #ffc107, #fd7e14)'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button, .script-option');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!this.classList.contains('coming-soon')) {
                createRipple(e, this);
            }
        });
    });
});

function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleEffect 0.6s linear;
        pointer-events: none;
    `;

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}