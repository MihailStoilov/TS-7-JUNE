import Robot from "./Robot.js";
import ChatManager from "./ChatManager.js";
const createRobot = document.querySelector("#create-robot");
const robotName = document.querySelector("#robot-name");
const robotType = document.querySelector("#robot-type");
const robotColor = document.querySelector("#robot-color");
const robotJump = document.querySelector("#jump");
const robotTalk = document.querySelector("#talk");
const robotBlink = document.querySelector("#blink");
const robotPhrase = document.querySelector("#robot-phrase");
const body = document.querySelector("body");
const btns = document.querySelector(".btns");
const btn = document.querySelectorAll(".btn");
const btnNext = document.querySelector(".next-btn");
const btnPrev = document.querySelector(".prev-btn");
const btnClearLocalStorage = document.querySelector("#clear-local-storage");
const btnShowMessages = document.querySelector("#show-message");
const sectionCreateRobotEl = document.querySelector(".section-create-robot");
const showRobotBtn = document.querySelector("#show-robot");
const storageTableText = document.createElement("p");
const storageTable = document.createElement("table");
const storageTHead = document.createElement("thead");
const storageThName = document.createElement("th");
const storageThType = document.createElement("th");
const storageThColor = document.createElement("th");
const storageThOptions = document.createElement("th");
const storageTR = document.createElement("tr");
const storageTableBody = document.createElement("tbody");
let indexR = localStorage.length;
// Get data from localstorage
if (localStorage.length > 0) {
    storageTableText.textContent = "Local Storage";
    body.appendChild(storageTableText);
    body.appendChild(storageTable);
    storageTable.appendChild(storageTHead);
    storageTable.appendChild(storageTableBody);
    storageTHead.appendChild(storageTR);
    storageThName.textContent = "Name";
    storageThType.textContent = "Type";
    storageThColor.textContent = "Color";
    storageThOptions.textContent = "Options";
    storageTR.appendChild(storageThName);
    storageTR.appendChild(storageThType);
    storageTR.appendChild(storageThColor);
    storageTR.appendChild(storageThOptions);
    for (let i = 0; i < localStorage.length; i++) {
        let str = `${localStorage.key(i)}`;
        const currob = `${localStorage.getItem(str)}`;
        const myObject = JSON.parse(currob);
        const newObj = {
            name: myObject._name,
            type: myObject._type,
            color: myObject._color,
            jump: myObject._jump === true,
            blink: myObject._blink === true,
            talk: myObject._talk === true,
        };
        createLocalStorage(newObj);
    }
}
function createLocalStorage(newObj) {
    const tableBodyTr = document.createElement("tr");
    storageTableBody.appendChild(tableBodyTr);
    const robotNameTd = document.createElement("td");
    robotNameTd.textContent = newObj.name;
    tableBodyTr.appendChild(robotNameTd);
    const robotTypeTd = document.createElement("td");
    robotTypeTd.textContent = newObj.type;
    tableBodyTr.appendChild(robotTypeTd);
    const robotColorTd = document.createElement("td");
    tableBodyTr.appendChild(robotColorTd);
    const colorBoxEl = document.createElement("td");
    colorBoxEl.style.backgroundColor = newObj.color;
    robotColorTd.appendChild(colorBoxEl);
    const robotOptionsTd = document.createElement("td");
    robotOptionsTd.textContent = `${newObj.jump === true ? "Jump," : ""} ${newObj.talk === true ? "Talk," : ""} ${newObj.blink === true ? "Blink" : ""}`;
    tableBodyTr.appendChild(robotOptionsTd);
}
let robots = [];
let copyOfRobots = [];
const chat = new ChatManager();
function dynamicRobot() {
    let robot = new Robot(robotName.value, robotType.value, robotColor.value, robotJump.checked, robotBlink.checked, robotTalk.checked);
    // Set robot to localstorage
    localStorage.setItem(`robot-${indexR}`, JSON.stringify(robot));
    indexR++;
    if (robots.length === 0) {
        const newSection = document.createElement("section");
        newSection.classList.add("factory-section", "active");
        const createSection = document.querySelector(".header");
        createSection.insertAdjacentElement("afterend", newSection);
    }
    const factoryEl = document.querySelector(".factory-section");
    const containerEl = document.createElement("div");
    containerEl.classList.add("container");
    containerEl.setAttribute("id", `slide-${robots.length + 1}`);
    factoryEl.appendChild(containerEl);
    const newSecionHeader = document.createElement("div");
    newSecionHeader.classList.add("section-header");
    containerEl.appendChild(newSecionHeader);
    const newHeading = document.createElement("div");
    newHeading.classList.add("heading");
    newSecionHeader.appendChild(newHeading);
    const newSecondaryHeading = document.createElement("h2");
    newSecondaryHeading.classList.add("secondary-heading");
    newSecondaryHeading.textContent =
        robotType.options[robotType.selectedIndex].text;
    newHeading.appendChild(newSecondaryHeading);
    const newArr = document.createElement("div");
    newArr.classList.add("arr1");
    newHeading.appendChild(newArr);
    const newWrapper = document.createElement("div");
    newWrapper.classList.add("content-wrapper");
    containerEl.appendChild(newWrapper);
    const robotSide = document.createElement("div");
    robotSide.classList.add("robot-side");
    newWrapper.appendChild(robotSide);
    const robotBox = document.createElement("div");
    robotBox.classList.add("robot");
    robotSide.appendChild(robotBox);
    const robotHead = document.createElement("div");
    robotHead.classList.add("head");
    robotBox.appendChild(robotHead);
    const robotEyes = document.createElement("div");
    robotEyes.classList.add("eyes");
    robotHead.appendChild(robotEyes);
    const robotEye1 = document.createElement("div");
    robotEye1.classList.add("eye");
    robotEyes.appendChild(robotEye1);
    const robotEye2 = document.createElement("div");
    robotEye2.classList.add("eye");
    robotEyes.appendChild(robotEye2);
    const robotMouth = document.createElement("div");
    robotMouth.classList.add("mouth");
    robotHead.appendChild(robotMouth);
    const robotBody = document.createElement("div");
    robotBody.classList.add("robot-body");
    robotBox.appendChild(robotBody);
    const robotChest = document.createElement("div");
    robotChest.classList.add("chest");
    robotChest.style.borderTop = `5vw solid ${robot.color}`;
    robotBody.appendChild(robotChest);
    const robotRightHand = document.createElement("div");
    robotRightHand.classList.add("right-hand");
    robotBody.appendChild(robotRightHand);
    const robotLeftHand = document.createElement("div");
    robotLeftHand.classList.add("left-hand");
    robotBody.appendChild(robotLeftHand);
    if (robot.type === "Female") {
        const robotSkirt = document.createElement("div");
        robotSkirt.classList.add("skirt");
        robotSkirt.style.borderBottom = `2.5vw solid ${robot.color}`;
        robotBox.appendChild(robotSkirt);
    }
    const robotLegs = document.createElement("div");
    robotLegs.classList.add("legs");
    robotBox.appendChild(robotLegs);
    const robotLeftLeg = document.createElement("div");
    robotLeftLeg.classList.add("left-leg", "leg");
    robotLegs.appendChild(robotLeftLeg);
    const robotRightLeg = document.createElement("div");
    robotRightLeg.classList.add("right-leg", "leg");
    robotLegs.appendChild(robotRightLeg);
    const robotNameEl = document.createElement("p");
    robotNameEl.classList.add("robot-name");
    robotNameEl.textContent = robot.name;
    robotSide.appendChild(robotNameEl);
    const robotEyeEl = document.querySelector(".eyes")
        .firstElementChild;
    if (robotBlink.checked) {
        robotEyeEl.classList.add("blink");
    }
    if (robotJump.checked) {
        const robotLegs = document.querySelectorAll(".leg");
        robotLegs.forEach((leg) => {
            leg.classList.add("jump");
        });
    }
    const bubble = document.createElement("div");
    function showBubble() {
        bubble.classList.add("remove");
        robotMouth.classList.remove("speak");
    }
    if (robotTalk.checked) {
        bubble.classList.add("bubble");
        robotBox.appendChild(bubble);
        const bubbleText = document.createElement("p");
        bubbleText.classList.add("bubble-text");
        bubbleText.textContent = robotPhrase.value;
        bubble.appendChild(bubbleText);
        robotMouth.classList.add("speak");
        setTimeout(showBubble, 10000);
    }
    const textSide = document.createElement("div");
    textSide.classList.add("text-side");
    newWrapper.appendChild(textSide);
    const sendMsgBox = document.createElement("div");
    sendMsgBox.classList.add("send-msg-box");
    textSide.appendChild(sendMsgBox);
    const inputLineEl = document.createElement("div");
    inputLineEl.classList.add("input-line");
    sendMsgBox.appendChild(inputLineEl);
    const labelEl = document.createElement("label");
    labelEl.setAttribute("for", "send-message");
    labelEl.textContent = "Send message:";
    inputLineEl.appendChild(labelEl);
    const inputEl = document.createElement("input");
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("name", "send-message");
    inputEl.setAttribute("id", "send-message");
    inputEl.setAttribute("id", `input-${robots.length + 1}`);
    inputEl.setAttribute("placeholder", "write message here");
    inputEl.required = true;
    inputLineEl.appendChild(inputEl);
    const btnSubmitEl = document.createElement("button");
    btnSubmitEl.setAttribute("type", "submit");
    btnSubmitEl.classList.add("btn-send-message");
    btnSubmitEl.textContent = "Send";
    sendMsgBox.appendChild(btnSubmitEl);
    const btnSortMessage = document.createElement("select");
    btnSortMessage.setAttribute("name", "sort-msg");
    btnSortMessage.setAttribute("id", `select-${robots.length + 1}`);
    btnSortMessage.classList.add("btn-sort-message");
    sendMsgBox.appendChild(btnSortMessage);
    const optionNewest = document.createElement("option");
    optionNewest.setAttribute("value", "Newest");
    optionNewest.textContent = "Newest";
    btnSortMessage.appendChild(optionNewest);
    const optionOldest = document.createElement("option");
    optionOldest.setAttribute("value", "Oldest");
    optionOldest.textContent = "Oldest";
    btnSortMessage.appendChild(optionOldest);
    const lastMessagesEl = document.createElement("p");
    lastMessagesEl.classList.add("last-messages");
    lastMessagesEl.textContent = "Last Messages";
    textSide.appendChild(lastMessagesEl);
    const messagesBoxEl = document.createElement("div");
    messagesBoxEl.classList.add("messages");
    textSide.appendChild(messagesBoxEl);
    robots.push(robot);
    copyOfRobots.push(robot);
    robotName.value = "";
    robotType.value = "";
    robotColor.value = "#e96126";
    robotPhrase.value = "";
    console.log(robots);
    btnSubmitEl.addEventListener("click", (event) => {
        if (inputEl.value === "") {
            alert("Please type message");
        }
        else {
            const currentDate = new Date();
            const currentTime = currentDate.getHours() + ":" + currentDate.getMinutes();
            let whichInput = Number(inputEl.getAttribute("id").slice(-1));
            const whichRobot = robots[whichInput - 1];
            // Store message in chatmanager class
            const messageEl = document.createElement("div");
            messageEl.classList.add("message");
            const robotMessageEl = document.createElement("p");
            robotMessageEl.classList.add("robot-message");
            const spanMessage = document.createElement("span");
            const messageContentEl = document.createElement("p");
            messageContentEl.classList.add("msg-content");
            messageEl.appendChild(robotMessageEl);
            messageEl.appendChild(messageContentEl);
            robotMessageEl.style.color = whichRobot.color;
            robotMessageEl.textContent = whichRobot.name;
            messageContentEl.textContent = inputEl.value;
            spanMessage.textContent = `  ${currentTime}`;
            robotMessageEl.appendChild(spanMessage);
            chat.message(messageEl);
            robots.forEach((robot) => {
                robot.message(messageEl);
            });
            // Show message to all robots
            document.querySelectorAll(".messages").forEach((m) => {
                const messageEl = document.createElement("div");
                messageEl.classList.add("message");
                if (btnSortMessage.value === "Oldest") {
                    m.insertAdjacentElement("beforeend", messageEl);
                }
                else {
                    m.insertAdjacentElement("afterbegin", messageEl);
                }
                const robotMessageEl = document.createElement("p");
                robotMessageEl.classList.add("robot-message");
                const spanMessage = document.createElement("span");
                const messageContentEl = document.createElement("p");
                messageContentEl.classList.add("msg-content");
                messageEl.appendChild(robotMessageEl);
                messageEl.appendChild(messageContentEl);
                robotMessageEl.style.color = whichRobot.color;
                robotMessageEl.textContent = whichRobot.name;
                messageContentEl.textContent = inputEl.value;
                spanMessage.textContent = `  ${currentTime}`;
                robotMessageEl.appendChild(spanMessage);
            });
            const sound = new Audio("sound.mp3");
            sound.play();
            inputEl.value = "";
        }
        event.preventDefault();
    });
    btnSortMessage.addEventListener("change", () => {
        let whichSelect = Number(btnSortMessage.getAttribute("id").slice(-1));
        let whichRobotFromSelect = robots[whichSelect - 1];
        let parent = document.querySelector(`#slide-${whichSelect}`);
        let remElement = parent.querySelector(".messages");
        while (remElement.firstChild) {
            remElement.firstChild.remove();
        }
        if (btnSortMessage.value === "Newest") {
            whichRobotFromSelect.getNewestMessages().forEach((msg) => {
                remElement.appendChild(msg);
            });
        }
        else {
            whichRobotFromSelect.getOldestMessages().forEach((msg) => {
                remElement.appendChild(msg);
            });
        }
    });
}
robotTalk.addEventListener("change", () => {
    robotTalk.checked
        ? (robotPhrase.disabled = false)
        : (robotPhrase.disabled = true);
});
// Create robot
createRobot === null || createRobot === void 0 ? void 0 : createRobot.addEventListener("click", (event) => {
    if (robotName.value === "" ||
        robotType.value === "" ||
        robotColor.value === "") {
        alert("You need to fill all the required fields (*)");
    }
    else if (robotTalk.checked && robotPhrase.value === "") {
        alert("Please input a phrase");
    }
    else {
        dynamicRobot();
        if (robots.length >= 1) {
            btns === null || btns === void 0 ? void 0 : btns.classList.add("btns-active");
        }
        if (robots.length <= 1) {
            btn.forEach((b) => {
                b.setAttribute("disabled", "");
            });
        }
        else {
            btn.forEach((b) => {
                b.removeAttribute("disabled");
            });
        }
        slides = document.querySelectorAll(".container");
        maxSlide++;
        curSlide++;
        goToSlide();
        i++;
    }
    event.preventDefault();
});
let slides;
let curSlide = 0;
let maxSlide = 0;
function goToSlide() {
    for (let i = 0; i < slides.length; i++) {
        let slide = slides[i];
        slide.style.transform = `translateX(${100 * (i - curSlide + 1)}%)`;
    }
}
// Next slide
function nextSlide() {
    maxSlide = slides.length;
    if (curSlide === maxSlide) {
        curSlide = 1;
    }
    else {
        curSlide++;
    }
    goToSlide();
}
// Prev slide
function prevSlide() {
    if (curSlide === 1) {
        curSlide = maxSlide;
    }
    else {
        curSlide--;
    }
    goToSlide();
}
// robots-num box
const robotsNum = document.createElement("div");
robotsNum.classList.add("robots-num");
sectionCreateRobotEl.appendChild(robotsNum);
const robotsNumText = document.createElement("p");
robotsNum.appendChild(robotsNumText);
// table
const tableEl = document.createElement("table");
const tableHead = document.createElement("thead");
const tableBody = document.createElement("tbody");
const tableTr = document.createElement("tr");
const thName = document.createElement("th");
const thType = document.createElement("th");
const thColor = document.createElement("th");
const thOptions = document.createElement("th");
thName.textContent = "Name";
thType.textContent = "Type";
thColor.textContent = "Color";
thOptions.textContent = "Options";
let i = 0;
function showRobot() {
    function robotOptions() {
        let robotOptions = [];
        robotTalk.checked === true ? robotOptions.push("can talk") : "";
        robotBlink.checked === true ? robotOptions.push("can blink") : "";
        robotJump.checked === true ? robotOptions.push("can jump") : "";
        return robotOptions.join(", ");
    }
    if (i > 0) {
        copyOfRobots.forEach((robot) => {
            robotsNumText.textContent = `${i} robots found`;
            createRow(robot);
        });
        sectionCreateRobotEl.appendChild(tableEl);
        tableEl.appendChild(tableHead);
        tableHead.appendChild(tableTr);
        tableTr.appendChild(thName);
        tableTr.appendChild(thType);
        tableTr.appendChild(thColor);
        tableTr.appendChild(thOptions);
        tableEl.appendChild(tableBody);
    }
    else {
        robotsNumText.textContent = "No robots created yet";
    }
    function createRow(robot) {
        const tableBodyTr = document.createElement("tr");
        tableBody.appendChild(tableBodyTr);
        const robotNameTd = document.createElement("td");
        robotNameTd.textContent = robot.name;
        tableBodyTr.appendChild(robotNameTd);
        const robotTypeTd = document.createElement("td");
        robotTypeTd.textContent = `${robot.type}`;
        tableBodyTr.appendChild(robotTypeTd);
        const robotColorTd = document.createElement("td");
        tableBodyTr.appendChild(robotColorTd);
        const colorBoxEl = document.createElement("div");
        colorBoxEl.classList.add("color-box");
        colorBoxEl.style.backgroundColor = robot.color;
        robotColorTd.appendChild(colorBoxEl);
        const robotOptionsTd = document.createElement("td");
        robotOptionsTd.textContent = robotOptions();
        tableBodyTr.appendChild(robotOptionsTd);
    }
    copyOfRobots = [];
}
function clearLocalStorage() {
    localStorage.clear();
    storageTable.remove();
    storageTableText.remove();
}
btnNext.addEventListener("click", nextSlide);
btnPrev.addEventListener("click", prevSlide);
showRobotBtn.addEventListener("click", showRobot);
btnClearLocalStorage.addEventListener("click", clearLocalStorage);
btnShowMessages.addEventListener("click", () => {
    const newDiv = document.createElement("div");
    body.appendChild(newDiv);
    chat.showAllMessage().forEach((msg) => {
        newDiv.appendChild(msg);
    });
});
