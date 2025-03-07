document.addEventListener("DOMContentLoaded", () => {
    const tabElapsed = document.getElementById("tabElapsed");
    const tabCountdown = document.getElementById("tabCountdown");
    const elapsedTimeSection = document.getElementById("elapsedTimeSection");
    const countdownSection = document.getElementById("countdownSection");
    const progressBar = document.getElementById("progressBar");

    const eventNameElapsed = document.getElementById("eventNameElapsed");
    const startDateElapsed = document.getElementById("startDateElapsed");
    const startElapsedButton = document.getElementById("startElapsed");
    const elapsedDays = document.getElementById("elapsedDays");
    const elapsedHours = document.getElementById("elapsedHours");
    const elapsedMinutes = document.getElementById("elapsedMinutes");
    const elapsedSeconds = document.getElementById("elapsedSeconds");

    const eventNameCountdown = document.getElementById("eventNameCountdown");
    const targetDateCountdown = document.getElementById("targetDateCountdown");
    const startCountdownButton = document.getElementById("startCountdown");
    const countdownDays = document.getElementById("countdownDays");
    const countdownHours = document.getElementById("countdownHours");
    const countdownMinutes = document.getElementById("countdownMinutes");
    const countdownSeconds = document.getElementById("countdownSeconds");

    let elapsedInterval = null;
    let countdownInterval = null;

    // Переключение между вкладками
    tabElapsed.addEventListener("click", () => {
        tabElapsed.classList.add("active");
        tabCountdown.classList.remove("active");
        elapsedTimeSection.classList.add("active");
        countdownSection.classList.remove("active");
    });

    tabCountdown.addEventListener("click", () => {
        tabCountdown.classList.add("active");
        tabElapsed.classList.remove("active");
        elapsedTimeSection.classList.remove("active");
        countdownSection.classList.add("active");
    });

    // Функционал прошедшего времени
    startElapsedButton.addEventListener("click", () => {
        const startDate = new Date(startDateElapsed.value).getTime();
        if (!startDate) {
            alert("Выберите дату начала!");
            return;
        }
        clearInterval(elapsedInterval);
        elapsedInterval = setInterval(() => updateElapsedTime(startDate), 1000);
    });

    function updateElapsedTime(startDate) {
        const now = new Date().getTime();
        const distance = now - startDate;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        elapsedDays.textContent = `${days} дней`;
        elapsedHours.textContent = `${hours} часов`;
        elapsedMinutes.textContent = `${minutes} минут`;
        elapsedSeconds.textContent = `${seconds} секунд`;

        // Обновление прогресс-бара (пример для 30 дней)
        const maxDays = 30;
        const progress = (days / maxDays) * 100;
        progressBar.style.width = `${Math.min(progress, 100)}%`;
    }

    // Функционал обратного отсчёта
    startCountdownButton.addEventListener("click", () => {
        const targetDate = new Date(targetDateCountdown.value).getTime();
        if (!targetDate) {
            alert("Выберите целевую дату!");
            return;
        }
        clearInterval(countdownInterval);
        countdownInterval = setInterval(() => updateCountdown(targetDate), 1000);
    });

    function updateCountdown(targetDate) {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance <= 0) {
            clearInterval(countdownInterval);
            countdownDays.textContent = "0 дней";
            countdownHours.textContent = "0 часов";
            countdownMinutes.textContent = "0 минут";
            countdownSeconds.textContent = "0 секунд";
            progressBar.style.width = "100%";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownDays.textContent = `${days} дней`;
        countdownHours.textContent = `${hours} часов`;
        countdownMinutes.textContent = `${minutes} минут`;
        countdownSeconds.textContent = `${seconds} секунд`;

        // Обновление прогресс-бара
        const totalTime = targetDate - new Date(targetDateCountdown.value).getTime();
        const elapsedTime = now - new Date(targetDateCountdown.value).getTime();
        const progress = (elapsedTime / totalTime) * 100;
        progressBar.style.width = `${Math.min(progress, 100)}%`;
    }
});
