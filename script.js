document.addEventListener("DOMContentLoaded", () => {
    const dateInput = document.getElementById("dateInput");
    const startTimerButton = document.getElementById("startTimer");
    const resetTimerButton = document.getElementById("resetTimer");
    const timerDisplay = document.getElementById("timerDisplay");
    const progressBar = document.getElementById("progress");
    const daysDisplay = document.getElementById("days");
    const hoursDisplay = document.getElementById("hours");
    const minutesDisplay = document.getElementById("minutes");
    const secondsDisplay = document.getElementById("seconds");

    let targetDate = null;
    let interval = null;

    // Считываем ID пользователя Telegram
    const userId = Telegram.WebApp.initDataUnsafe.user?.id || "guest";

    // Загрузка сохранённой даты из LocalStorage
    const savedDate = localStorage.getItem(`targetDate_${userId}`);
    if (savedDate) {
        dateInput.value = savedDate;
        targetDate = new Date(savedDate).getTime();
        startTimer();
    }

    // Запуск таймера
    startTimerButton.addEventListener("click", () => {
        if (!dateInput.value) {
            alert("Пожалуйста, выберите дату.");
            return;
        }
        targetDate = new Date(dateInput.value).getTime();
        localStorage.setItem(`targetDate_${userId}`, dateInput.value);
        startTimer();
    });

    // Сброс таймера
    resetTimerButton.addEventListener("click", () => {
        clearInterval(interval);
        timerDisplay.textContent = "0 дней 0 часов 0 минут 0 секунд";
        progressBar.style.width = "0%";
        localStorage.removeItem(`targetDate_${userId}`);
        dateInput.value = "";
        targetDate = null;
    });

    // Обновление таймера
    function startTimer() {
        clearInterval(interval);
        interval = setInterval(updateTimer, 1000);
    }

    function updateTimer() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance <= 0) {
            clearInterval(interval);
            timerDisplay.textContent = "Время истекло!";
            progressBar.style.width = "100%";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysDisplay.textContent = `${days} дней`;
        hoursDisplay.textContent = `${hours} часов`;
        minutesDisplay.textContent = `${minutes} минут`;
        secondsDisplay.textContent = `${seconds} секунд`;

        // Обновление прогресс-бара
        const totalTime = targetDate - new Date(dateInput.value).getTime();
        const elapsedTime = now - new Date(dateInput.value).getTime();
        const progressPercentage = (elapsedTime / totalTime) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }
});