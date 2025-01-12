const messages = [
    { start: "08:00", end: "08:40", text: "1 урок 1 смены" },
    { start: "08:40", end: "08:50", text: "перемена" },
    { start: "08:50", end: "09:30", text: "2 урок 1 смены" },
    { start: "09:30", end: "09:40", text: "перемена, завтрак 5&nbsp;кл." },
    { start: "09:40", end: "10:20", text: "3 урок 1 смены" },
    { start: "10:20", end: "10:35", text: "перемена, завтрак 9-11&nbsp;кл." },
    { start: "10:35", end: "11:15", text: "4 урок 1 смены" },
    { start: "11:15", end: "11:25", text: "перемена" },
    { start: "11:25", end: "12:05", text: "5 урок 1 смены" },
    { start: "12:05", end: "12:20", text: "перемена, обед 5 и 9&nbsp;кл." },
    { start: "12:20", end: "13:00", text: "6 урок 1 смены" },
    { start: "13:00", end: "13:15", text: "перемена, обед 6 и 10-11&nbsp;кл." },
    { start: "13:15", end: "13:55", text: "7 урок 1 смены, 1 урок 2 смены" },
    { start: "13:55", end: "14:10", text: "перемена, обед 7-8&nbsp;кл." },
    { start: "14:10", end: "14:50", text: "2 урок 2 смены" },
    { start: "14:50", end: "15:00", text: "перемена" },
    { start: "15:00", end: "15:40", text: "3 урок 2 смены" },
    { start: "15:40", end: "15:50", text: "перемена, ужин 6&nbsp;кл." },
    { start: "15:50", end: "16:30", text: "4 урок 2 смены" },
    { start: "16:30", end: "16:40", text: "перемена, ужин 7-8&nbsp;кл." },
    { start: "16:40", end: "17:20", text: "5 урок 2 смены" },
    { start: "17:20", end: "17:30", text: "перемена" },
    { start: "17:30", end: "18:10", text: "6 урок 2 смены" },
    { start: "18:10", end: "18:20", text: "перемена" },
    { start: "18:20", end: "19:00", text: "7 урок 2 смены" },
];

const daysOfWeek = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
];

let defaultMessage = "уроков нет";
let lastMessage = "";
const bellSound = new Audio("bellSound.mp3");

function updateClock() {
    const now = new Date();

    // Update time
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    document.getElementById("time").textContent = `${hours}:${minutes}`;

    // Update date
    const dayOfWeek = daysOfWeek[now.getDay()];
    const date = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    document.getElementById(
        "date"
    ).textContent = `${dayOfWeek}, ${date}.${month}.${year}`;

    // Update message
    const currentTime = `${hours}:${minutes}`;

    // Find current time period
    const currPeriodIdx = messages.findIndex(
        ({ start, end }) => currentTime >= start && currentTime < end
    );

    let currentPeriodText = "";
    let currentPeriodTime = "";
    let nextPeriodText = "";
    let nextPeriodTime = "";

    if (currPeriodIdx > -1) {
        currentPeriodText = messages[currPeriodIdx].text;
        currentPeriodTime = `${messages[currPeriodIdx].start} — ${messages[currPeriodIdx].end}`;
    }

    if (currPeriodIdx > -1 && currPeriodIdx + 1 < messages.length) {
        nextPeriodText = messages[currPeriodIdx + 1].text;
        nextPeriodTime = `${messages[currPeriodIdx + 1].start} — ${
            messages[currPeriodIdx + 1].end
        }`;
    }

    document.getElementById("currentPeriodText").innerHTML = currentPeriodText;
    document.getElementById("currentPeriodTime").innerHTML = currentPeriodTime;
    document.getElementById("nextPeriodText").innerHTML = nextPeriodText;
    document.getElementById("nextPeriodTime").innerHTML = nextPeriodTime;
}

updateClock();
setInterval(updateClock, 1000);
