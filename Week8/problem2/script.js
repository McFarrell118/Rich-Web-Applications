const { interval, Subject } = rxjs;
const { takeUntil } = rxjs.operators;

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const inputHours = document.getElementById('inputHours');
    const inputMinutes = document.getElementById('inputMinutes');
    const inputSeconds = document.getElementById('inputSeconds');
    const hoursDisplay = document.getElementById('hours');
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');

    let countdownSubscription;
    const stopCountdown = new Subject();

    function updateDisplay(hours, minutes, seconds) {
        hoursDisplay.textContent = String(hours).padStart(2, '0');
        minutesDisplay.textContent = String(minutes).padStart(2, '0');
        secondsDisplay.textContent = String(seconds).padStart(2, '0');
    }

    startButton.addEventListener('click', () => {
        if (startButton.textContent === 'Start Countdown') {
            let hours = parseInt(inputHours.value, 10);
            let minutes = parseInt(inputMinutes.value, 10);
            let seconds = parseInt(inputSeconds.value, 10);

            if (isNaN(hours) || isNaN(minutes) || isNaN(seconds) || hours < 0 || minutes < 0 || seconds < 0 || minutes > 59 || seconds > 59) {
                alert('Please enter valid numbers for hours, minutes, and seconds.');
                return;
            }

            updateDisplay(hours, minutes, seconds);

            startButton.textContent = 'Stop Countdown';

            countdownSubscription = interval(1000).pipe(takeUntil(stopCountdown)).subscribe(() => {
                if (seconds > 0) {
                    seconds--;
                } else if (minutes > 0) {
                    seconds = 59;
                    minutes--;
                } else if (hours > 0) {
                    minutes = 59;
                    seconds = 59;
                    hours--;
                } else {
                    stopCountdown.next();
                }
                updateDisplay(hours, minutes, seconds);
            });

        } else {
            startButton.textContent = 'Start Countdown';
            stopCountdown.next();
            if (countdownSubscription) {
                countdownSubscription.unsubscribe();
            }
        }
    });

    stopCountdown.subscribe(() => {
        if (countdownSubscription) {
            countdownSubscription.unsubscribe();
        }
        startButton.textContent = 'Start Countdown';
    });
});
