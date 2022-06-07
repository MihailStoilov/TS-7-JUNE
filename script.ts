import Robot from "./Robot.js";
import ChatManager from "./ChatManager.js";
const createRobot: HTMLButtonElement = document.querySelector(
  "#create-robot"
) as HTMLButtonElement;
const robotName: HTMLInputElement = document.querySelector(
  "#robot-name"
) as HTMLInputElement;
const robotType = document.querySelector("#robot-type") as HTMLSelectElement;
const robotColor: HTMLInputElement = document.querySelector(
  "#robot-color"
) as HTMLInputElement;
const robotJump: HTMLInputElement = document.querySelector(
  "#jump"
) as HTMLInputElement;
const robotTalk: HTMLInputElement = document.querySelector(
  "#talk"
) as HTMLInputElement;
const robotBlink: HTMLInputElement = document.querySelector(
  "#blink"
) as HTMLInputElement;
const robotPhrase: HTMLInputElement = document.querySelector(
  "#robot-phrase"
) as HTMLInputElement;
const body: HTMLElement = document.querySelector("body") as HTMLElement;
const btns: HTMLDivElement = document.querySelector(".btns") as HTMLDivElement;
const btn: NodeListOf<Element> = document.querySelectorAll(
  ".btn"
) as NodeListOf<Element>;
const btnNext: HTMLButtonElement = document.querySelector(
  ".next-btn"
) as HTMLButtonElement;
const btnPrev: HTMLButtonElement = document.querySelector(
  ".prev-btn"
) as HTMLButtonElement;
const btnClearLocalStorage: HTMLButtonElement = document.querySelector(
  "#clear-local-storage"
) as HTMLButtonElement;
const btnShowMessages: HTMLButtonElement = document.querySelector(
  "#show-message"
) as HTMLButtonElement;
const sectionCreateRobotEl: HTMLElement = document.querySelector(
  ".section-create-robot"
) as HTMLElement;
const showRobotBtn: HTMLButtonElement = document.querySelector(
  "#show-robot"
) as HTMLButtonElement;
const storageTableText: HTMLParagraphElement = document.createElement(
  "p"
) as HTMLParagraphElement;
const storageTable: HTMLTableElement = document.createElement(
  "table"
) as HTMLTableElement;
const storageTHead: HTMLTableSectionElement = document.createElement(
  "thead"
) as HTMLTableSectionElement;
const storageThName: HTMLTableCellElement = document.createElement(
  "th"
) as HTMLTableCellElement;
const storageThType: HTMLTableCellElement = document.createElement(
  "th"
) as HTMLTableCellElement;
const storageThColor: HTMLTableCellElement = document.createElement(
  "th"
) as HTMLTableCellElement;
const storageThOptions: HTMLTableCellElement = document.createElement(
  "th"
) as HTMLTableCellElement;
const storageTR: HTMLTableRowElement = document.createElement(
  "tr"
) as HTMLTableRowElement;
const storageTableBody = document.createElement(
  "tbody"
) as HTMLTableSectionElement;

let indexR: number = localStorage.length;

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

  for (let i: number = 0; i < localStorage.length; i++) {
    let str: string = `${localStorage.key(i)}`;
    const currob: string = `${localStorage.getItem(str)}`;
    const myObject: any = JSON.parse(currob);

    const newObj: InputData = {
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

function createLocalStorage(newObj: InputData): void {
  const tableBodyTr: HTMLTableRowElement = document.createElement(
    "tr"
  ) as HTMLTableRowElement;
  storageTableBody.appendChild(tableBodyTr);
  const robotNameTd: HTMLTableCellElement = document.createElement(
    "td"
  ) as HTMLTableCellElement;
  robotNameTd.textContent = newObj.name;
  tableBodyTr.appendChild(robotNameTd);
  const robotTypeTd: HTMLTableCellElement = document.createElement(
    "td"
  ) as HTMLTableCellElement;
  robotTypeTd.textContent = newObj.type;
  tableBodyTr.appendChild(robotTypeTd);
  const robotColorTd: HTMLTableCellElement = document.createElement(
    "td"
  ) as HTMLTableCellElement;
  tableBodyTr.appendChild(robotColorTd);
  const colorBoxEl: HTMLTableCellElement = document.createElement(
    "td"
  ) as HTMLTableCellElement;
  colorBoxEl.style.backgroundColor = newObj.color;
  robotColorTd.appendChild(colorBoxEl);
  const robotOptionsTd: HTMLTableCellElement = document.createElement(
    "td"
  ) as HTMLTableCellElement;
  robotOptionsTd.textContent = `${newObj.jump === true ? "Jump," : ""} ${
    newObj.talk === true ? "Talk," : ""
  } ${newObj.blink === true ? "Blink" : ""}`;
  tableBodyTr.appendChild(robotOptionsTd);
}

interface InputData {
  name: string;
  type: string;
  color: string;
  jump: boolean;
  blink: boolean;
  talk: boolean;
}

let robots: Robot[] = [];
let copyOfRobots: Robot[] = [];
const chat: ChatManager = new ChatManager();
function dynamicRobot(): void {
  let robot: Robot = new Robot(
    robotName.value,
    robotType.value,
    robotColor.value,
    robotJump.checked,
    robotBlink.checked,
    robotTalk.checked
  );

  // Set robot to localstorage
  localStorage.setItem(`robot-${indexR}`, JSON.stringify(robot));
  indexR++;

  if (robots.length === 0) {
    const newSection: HTMLElement = document.createElement(
      "section"
    ) as HTMLElement;
    newSection.classList.add("factory-section", "active");

    const createSection: HTMLElement = document.querySelector(
      ".header"
    )! as HTMLElement;
    createSection.insertAdjacentElement("afterend", newSection);
  }

  const factoryEl: HTMLElement = document.querySelector(
    ".factory-section"
  )! as HTMLElement;

  const containerEl: HTMLDivElement = document.createElement(
    "div"
  ) as HTMLDivElement;
  containerEl.classList.add("container");
  containerEl.setAttribute("id", `slide-${robots.length + 1}`);
  factoryEl.appendChild(containerEl);

  const newSecionHeader: HTMLDivElement = document.createElement(
    "div"
  ) as HTMLDivElement;
  newSecionHeader.classList.add("section-header");
  containerEl.appendChild(newSecionHeader);

  const newHeading: HTMLDivElement = document.createElement(
    "div"
  ) as HTMLDivElement;
  newHeading.classList.add("heading");
  newSecionHeader.appendChild(newHeading);

  const newSecondaryHeading: HTMLHeadingElement = document.createElement(
    "h2"
  ) as HTMLHeadingElement;
  newSecondaryHeading.classList.add("secondary-heading");
  newSecondaryHeading.textContent =
    robotType.options[robotType.selectedIndex].text;
  newHeading.appendChild(newSecondaryHeading);

  const newArr: HTMLDivElement = document.createElement(
    "div"
  ) as HTMLDivElement;
  newArr.classList.add("arr1");
  newHeading.appendChild(newArr);

  const newWrapper: HTMLDivElement = document.createElement(
    "div"
  ) as HTMLDivElement;
  newWrapper.classList.add("content-wrapper");
  containerEl.appendChild(newWrapper);

  const robotSide: HTMLDivElement = document.createElement(
    "div"
  ) as HTMLDivElement;
  robotSide.classList.add("robot-side");
  newWrapper.appendChild(robotSide);

  const robotBox: HTMLDivElement = document.createElement(
    "div"
  ) as HTMLDivElement;
  robotBox.classList.add("robot");
  robotSide.appendChild(robotBox);

  const robotHead: HTMLDivElement = document.createElement(
    "div"
  ) as HTMLDivElement;
  robotHead.classList.add("head");
  robotBox.appendChild(robotHead);

  const robotEyes: HTMLDivElement = document.createElement(
    "div"
  ) as HTMLDivElement;
  robotEyes.classList.add("eyes");
  robotHead.appendChild(robotEyes);

  const robotEye1: HTMLDivElement = document.createElement(
    "div"
  ) as HTMLDivElement;
  robotEye1.classList.add("eye");
  robotEyes.appendChild(robotEye1);
  const robotEye2: HTMLDivElement = document.createElement(
    "div"
  ) as HTMLDivElement;
  robotEye2.classList.add("eye");
  robotEyes.appendChild(robotEye2);

  const robotMouth: HTMLDivElement = document.createElement(
    "div"
  ) as HTMLDivElement;
  robotMouth.classList.add("mouth");
  robotHead.appendChild(robotMouth);

  const robotBody: HTMLDivElement = document.createElement(
    "div"
  ) as HTMLDivElement;
  robotBody.classList.add("robot-body");
  robotBox.appendChild(robotBody);

  const robotChest: HTMLDivElement = document.createElement(
    "div"
  ) as HTMLDivElement;
  robotChest.classList.add("chest");
  robotChest.style.borderTop = `5vw solid ${robot.color}`;
  robotBody.appendChild(robotChest);

  const robotRightHand: HTMLDivElement = document.createElement(
    "div"
  ) as HTMLDivElement;
  robotRightHand.classList.add("right-hand");
  robotBody.appendChild(robotRightHand);

  const robotLeftHand: HTMLDivElement = document.createElement(
    "div"
  ) as HTMLDivElement;
  robotLeftHand.classList.add("left-hand");
  robotBody.appendChild(robotLeftHand);

  if (robot.type === "Female") {
    const robotSkirt: HTMLDivElement = document.createElement(
      "div"
    ) as HTMLDivElement;
    robotSkirt.classList.add("skirt");
    robotSkirt.style.borderBottom = `2.5vw solid ${robot.color}`;
    robotBox.appendChild(robotSkirt);
  }

  const robotLegs: HTMLDivElement = document.createElement(
    "div"
  ) as HTMLDivElement;
  robotLegs.classList.add("legs");
  robotBox.appendChild(robotLegs);

  const robotLeftLeg: HTMLDivElement = document.createElement(
    "div"
  ) as HTMLDivElement;
  robotLeftLeg.classList.add("left-leg", "leg");
  robotLegs.appendChild(robotLeftLeg);

  const robotRightLeg: HTMLDivElement = document.createElement(
    "div"
  ) as HTMLDivElement;
  robotRightLeg.classList.add("right-leg", "leg");
  robotLegs.appendChild(robotRightLeg);

  const robotNameEl: HTMLParagraphElement = document.createElement(
    "p"
  ) as HTMLParagraphElement;
  robotNameEl.classList.add("robot-name");
  robotNameEl.textContent = robot.name;
  robotSide.appendChild(robotNameEl);

  const robotEyeEl: HTMLDivElement = document.querySelector(".eyes")!
    .firstElementChild as HTMLDivElement;

  if (robotBlink.checked) {
    robotEyeEl!.classList.add("blink");
  }

  if (robotJump.checked) {
    const robotLegs: NodeListOf<Element> = document.querySelectorAll(
      ".leg"
    ) as NodeListOf<Element>;
    robotLegs.forEach((leg) => {
      leg.classList.add("jump");
    });
  }

  const bubble: HTMLDivElement = document.createElement(
    "div"
  ) as HTMLDivElement;

  function showBubble(): void {
    bubble.classList.add("remove");
    robotMouth.classList.remove("speak");
  }

  if (robotTalk.checked) {
    bubble.classList.add("bubble");
    robotBox.appendChild(bubble);
    const bubbleText: HTMLParagraphElement = document.createElement(
      "p"
    ) as HTMLParagraphElement;
    bubbleText.classList.add("bubble-text");
    bubbleText.textContent = robotPhrase.value;
    bubble.appendChild(bubbleText);
    robotMouth.classList.add("speak");
    setTimeout(showBubble, 10000);
  }

  const textSide: HTMLDivElement = document.createElement(
    "div"
  ) as HTMLDivElement;
  textSide.classList.add("text-side");
  newWrapper.appendChild(textSide);

  const sendMsgBox: HTMLDivElement = document.createElement(
    "div"
  ) as HTMLDivElement;
  sendMsgBox.classList.add("send-msg-box");
  textSide.appendChild(sendMsgBox);

  const inputLineEl: HTMLDivElement = document.createElement(
    "div"
  ) as HTMLDivElement;
  inputLineEl.classList.add("input-line");
  sendMsgBox.appendChild(inputLineEl);

  const labelEl: HTMLLabelElement = document.createElement(
    "label"
  ) as HTMLLabelElement;
  labelEl.setAttribute("for", "send-message");
  labelEl.textContent = "Send message:";
  inputLineEl.appendChild(labelEl);

  const inputEl: HTMLInputElement = document.createElement(
    "input"
  ) as HTMLInputElement;
  inputEl.setAttribute("type", "text");
  inputEl.setAttribute("name", "send-message");
  inputEl.setAttribute("id", "send-message");
  inputEl.setAttribute("id", `input-${robots.length + 1}`);
  inputEl.setAttribute("placeholder", "write message here");
  inputEl.required = true;
  inputLineEl.appendChild(inputEl);

  const btnSubmitEl: HTMLButtonElement = document.createElement(
    "button"
  ) as HTMLButtonElement;
  btnSubmitEl.setAttribute("type", "submit");
  btnSubmitEl.classList.add("btn-send-message");
  btnSubmitEl.textContent = "Send";
  sendMsgBox.appendChild(btnSubmitEl);

  const btnSortMessage: HTMLSelectElement = document.createElement(
    "select"
  ) as HTMLSelectElement;
  btnSortMessage.setAttribute("name", "sort-msg");
  btnSortMessage.setAttribute("id", `select-${robots.length + 1}`);
  btnSortMessage.classList.add("btn-sort-message");
  sendMsgBox.appendChild(btnSortMessage);
  const optionNewest: HTMLOptionElement = document.createElement(
    "option"
  ) as HTMLOptionElement;
  optionNewest.setAttribute("value", "Newest");
  optionNewest.textContent = "Newest";
  btnSortMessage.appendChild(optionNewest);
  const optionOldest: HTMLOptionElement = document.createElement(
    "option"
  ) as HTMLOptionElement;
  optionOldest.setAttribute("value", "Oldest");
  optionOldest.textContent = "Oldest";
  btnSortMessage.appendChild(optionOldest);

  const lastMessagesEl: HTMLParagraphElement = document.createElement(
    "p"
  ) as HTMLParagraphElement;
  lastMessagesEl.classList.add("last-messages");
  lastMessagesEl.textContent = "Last Messages";
  textSide.appendChild(lastMessagesEl);

  const messagesBoxEl: HTMLDivElement = document.createElement(
    "div"
  ) as HTMLDivElement;
  messagesBoxEl.classList.add("messages");
  textSide.appendChild(messagesBoxEl);

  robots.push(robot);
  copyOfRobots.push(robot);
  robotName.value = "";
  robotType.value = "";
  robotColor.value = "#e96126";
  robotPhrase.value = "";
  console.log(robots);

  btnSubmitEl.addEventListener("click", (event: Event): void => {
    if (inputEl.value === "") {
      alert("Please type message");
    } else {
      const currentDate: Date = new Date();
      const currentTime: string =
        currentDate.getHours() + ":" + currentDate.getMinutes();
      let whichInput: number = Number(inputEl.getAttribute("id")!.slice(-1));
      const whichRobot: Robot = robots[whichInput - 1];

      // Store message in chatmanager class
      const messageEl: HTMLDivElement = document.createElement(
        "div"
      ) as HTMLDivElement;
      messageEl.classList.add("message");

      const robotMessageEl: HTMLParagraphElement = document.createElement(
        "p"
      ) as HTMLParagraphElement;
      robotMessageEl.classList.add("robot-message");
      const spanMessage: HTMLSpanElement = document.createElement(
        "span"
      ) as HTMLSpanElement;
      const messageContentEl: HTMLParagraphElement = document.createElement(
        "p"
      ) as HTMLParagraphElement;
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
      document.querySelectorAll(".messages").forEach((m): void => {
        const messageEl: HTMLDivElement = document.createElement(
          "div"
        ) as HTMLDivElement;
        messageEl.classList.add("message");
        if (btnSortMessage.value === "Oldest") {
          m.insertAdjacentElement("beforeend", messageEl);
        } else {
          m.insertAdjacentElement("afterbegin", messageEl);
        }
        const robotMessageEl: HTMLParagraphElement = document.createElement(
          "p"
        ) as HTMLParagraphElement;
        robotMessageEl.classList.add("robot-message");
        const spanMessage: HTMLSpanElement = document.createElement(
          "span"
        ) as HTMLSpanElement;
        const messageContentEl: HTMLParagraphElement = document.createElement(
          "p"
        ) as HTMLParagraphElement;
        messageContentEl.classList.add("msg-content");
        messageEl.appendChild(robotMessageEl);
        messageEl.appendChild(messageContentEl);
        robotMessageEl.style.color = whichRobot.color;
        robotMessageEl.textContent = whichRobot.name;
        messageContentEl.textContent = inputEl.value;
        spanMessage.textContent = `  ${currentTime}`;
        robotMessageEl.appendChild(spanMessage);
      });

      const sound: HTMLAudioElement = new Audio("sound.mp3");
      sound.play();

      inputEl.value = "";
    }
    event.preventDefault();
  });

  btnSortMessage.addEventListener("change", (): void => {
    let whichSelect: number = Number(
      btnSortMessage.getAttribute("id")!.slice(-1)
    );
    let whichRobotFromSelect: Robot = robots[whichSelect - 1];
    let parent: HTMLDivElement = document.querySelector(
      `#slide-${whichSelect}`
    )! as HTMLDivElement;
    let remElement: HTMLDivElement = parent.querySelector(
      ".messages"
    )! as HTMLDivElement;

    while (remElement.firstChild) {
      remElement.firstChild.remove();
    }
    if (btnSortMessage.value === "Newest") {
      whichRobotFromSelect.getOldestMessages().forEach((msg): void => {
        remElement.appendChild(msg);
      });
    } else {
      whichRobotFromSelect.getNewestMessages().forEach((msg): void => {
        remElement.appendChild(msg);
      });
    }
  });
}

robotTalk.addEventListener("change", (): void => {
  robotTalk.checked
    ? (robotPhrase.disabled = false)
    : (robotPhrase.disabled = true);
});

// Create robot
createRobot?.addEventListener("click", (event: Event): void => {
  if (
    robotName.value === "" ||
    robotType.value === "" ||
    robotColor.value === ""
  ) {
    alert("You need to fill all the required fields (*)");
  } else if (robotTalk.checked && robotPhrase.value === "") {
    alert("Please input a phrase");
  } else {
    dynamicRobot();

    if (robots.length >= 1) {
      btns?.classList.add("btns-active");
    }
    if (robots.length <= 1) {
      btn.forEach((b) => {
        b.setAttribute("disabled", "");
      });
    } else {
      btn.forEach((b) => {
        b.removeAttribute("disabled");
      });
    }
    slides = document.querySelectorAll(".container") as NodeListOf<Element>;

    maxSlide++;
    curSlide++;
    goToSlide();
    i++;
  }
  event.preventDefault();
});

let slides: NodeListOf<Element>;
let curSlide: number = 0;
let maxSlide: number = 0;

function goToSlide(): void {
  for (let i = 0; i < slides.length; i++) {
    let slide: any = slides[i];
    slide.style.transform = `translateX(${100 * (i - curSlide + 1)}%)`;
  }
}

// Next slide
function nextSlide(): void {
  maxSlide = slides.length;
  if (curSlide === maxSlide) {
    curSlide = 1;
  } else {
    curSlide++;
  }
  goToSlide();
}

// Prev slide
function prevSlide(): void {
  if (curSlide === 1) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }
  goToSlide();
}
// robots-num box
const robotsNum: HTMLDivElement = document.createElement(
  "div"
) as HTMLDivElement;
robotsNum.classList.add("robots-num");
sectionCreateRobotEl.appendChild(robotsNum);
const robotsNumText: HTMLParagraphElement = document.createElement(
  "p"
) as HTMLParagraphElement;
robotsNum.appendChild(robotsNumText);

// table
const tableEl: HTMLTableElement = document.createElement(
  "table"
) as HTMLTableElement;
const tableHead: HTMLTableSectionElement = document.createElement(
  "thead"
) as HTMLTableSectionElement;

const tableBody: HTMLTableSectionElement = document.createElement(
  "tbody"
) as HTMLTableSectionElement;
const tableTr: HTMLTableRowElement = document.createElement(
  "tr"
) as HTMLTableRowElement;
const thName: HTMLTableCellElement = document.createElement(
  "th"
) as HTMLTableCellElement;
const thType: HTMLTableCellElement = document.createElement(
  "th"
) as HTMLTableCellElement;
const thColor: HTMLTableCellElement = document.createElement(
  "th"
) as HTMLTableCellElement;
const thOptions: HTMLTableCellElement = document.createElement(
  "th"
) as HTMLTableCellElement;
thName.textContent = "Name";
thType.textContent = "Type";
thColor.textContent = "Color";
thOptions.textContent = "Options";

let i: number = 0;
function showRobot(): void {
  function robotOptions(): string {
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
  } else {
    robotsNumText.textContent = "No robots created yet";
  }

  function createRow(robot: Robot): void {
    const tableBodyTr: HTMLTableRowElement = document.createElement(
      "tr"
    ) as HTMLTableRowElement;
    tableBody.appendChild(tableBodyTr);
    const robotNameTd: HTMLTableCellElement = document.createElement(
      "td"
    ) as HTMLTableCellElement;
    robotNameTd.textContent = robot.name;
    tableBodyTr.appendChild(robotNameTd);
    const robotTypeTd: HTMLTableCellElement = document.createElement(
      "td"
    ) as HTMLTableCellElement;
    robotTypeTd.textContent = `${robot.type}`;
    tableBodyTr.appendChild(robotTypeTd);
    const robotColorTd: HTMLTableCellElement = document.createElement(
      "td"
    ) as HTMLTableCellElement;
    tableBodyTr.appendChild(robotColorTd);
    const colorBoxEl: HTMLDivElement = document.createElement(
      "div"
    ) as HTMLDivElement;
    colorBoxEl.classList.add("color-box");
    colorBoxEl.style.backgroundColor = robot.color;
    robotColorTd.appendChild(colorBoxEl);
    const robotOptionsTd: HTMLTableCellElement = document.createElement(
      "td"
    ) as HTMLTableCellElement;
    robotOptionsTd.textContent = robotOptions();
    tableBodyTr.appendChild(robotOptionsTd);
  }
  copyOfRobots = [];
}

function clearLocalStorage(): void {
  localStorage.clear();
  storageTable.remove();
  storageTableText.remove();
}

btnNext.addEventListener("click", nextSlide);
btnPrev.addEventListener("click", prevSlide);
showRobotBtn.addEventListener("click", showRobot);
btnClearLocalStorage.addEventListener("click", clearLocalStorage);

btnShowMessages.addEventListener("click", (): void => {
  const newDiv: HTMLDivElement = document.createElement(
    "div"
  ) as HTMLDivElement;
  body.appendChild(newDiv);
  chat.showAllMessage().forEach((msg) => {
    newDiv.appendChild(msg);
  });
});
