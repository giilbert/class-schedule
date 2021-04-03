import scheduleData from './schedule.json';

let date = new Date();

let daysOfTheWeek = 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.split(
  ' '
);
let monthsOfTheYear = 'January February March April May June July August September October November December'.split(
  ' '
);

let dateDisplay, classDisplay;

let customBGEnabled =
  localStorage.getItem('custom-bg-enabled') == 'true' ? true : false;
let customBGURL = localStorage.getItem('custom-bg-url')
  ? localStorage.getItem('custom-bg-url')
  : 'https://louie.co.nz/25th_hour/';

const offset = 2;

// no default implementation yet
Date.prototype.getWeek = function () {
  let onejan = new Date(this.getFullYear(), 0, 1);
  return Math.ceil(((this - onejan) / 86400000 + onejan.getDay() + 1) / 7);
};

const getScheduleWeek = (d = date) => {
  let a = (d.getWeek() % 3) + offset;
  // console.log('week #' + a);
  return a < 4 ? a : a % 3;
};

let getCurrentClass = () => {
  let bellSchedule = scheduleData.bellSchedule;
  let classSchedule = scheduleData.schedule;

  // weekends
  if (date.getDay() == 0 || date.getDay() == 6) {
    return "it's the weekends, go have some fun! 📺";
  }

  if (date.getHours() * 60 + date.getMinutes() < 8 * 60 + 30) {
    // 8:30 = 8 * 60 + 3
    return (
      'school starts at 8:30 first class is ' +
      classSchedule[getScheduleWeek().toString()][date.getDay().toString()][0]
    );
  }

  // after 9 PM
  if (date.getHours() >= 21) {
    return 'go to sleep 💤';
  }

  // from 2 PM to 9 PM
  if (date.getHours() >= 14) {
    return 'school ended<br />go do homework and take a break! 📚';
  }

  // console.log('length ' + bellSchedule.length);
  // console.log('formatted time: ' + formattedTime);

  // loop over every element in the array, compare the hours
  let currentPeriod;
  for (let i = 0; i < bellSchedule.length - 1; i++) {
    let el = bellSchedule[i];
    let periodHour = parseInt(el[0]);
    let periodMin = parseInt(el[1]);

    let el2 = bellSchedule[i + 1];
    let periodHour2 = parseInt(el2[0]);
    let periodMin2 = parseInt(el2[1]);

    let currentTime = date.getHours() * 60 + date.getMinutes();
    let time1 = periodHour * 60 + periodMin;
    let time2 = periodHour2 * 60 + periodMin2;

    //console.log(currentTime)

    if (currentTime >= time1 && currentTime < time2) {
      // console.log(i)
      currentPeriod = i + 1;
      break;
    }
  }

  // make sure
  if (currentPeriod == undefined) {
    currentPeriod = 'error';
  }

  let currentClass;
  try {
    currentClass =
      classSchedule[getScheduleWeek().toString()][date.getDay().toString()][
        (currentPeriod - 1).toString()
      ];
  } catch (e) {
    return 'an error occured: ' + e;
  }

  if (!currentClass) {
    currentClass = 'error';
  }

  // next class
  let nextClass;
  try {
    // check if period is last
    if (currentPeriod == 7) {
      nextClass = 'out of school';
    } else {
      nextClass =
        classSchedule[getScheduleWeek().toString()][date.getDay().toString()][
          currentPeriod.toString()
        ];
    }
  } catch (e) {
    nextClass = 'error see console for info';
    console.error(e);
  }

  // construct date and format time
  let nextClassTime = new Date(`
            ${date.getMonth() + 1} ${date.getDate()} ${date.getFullYear()} 
            ${bellSchedule[currentPeriod][0]}:${bellSchedule[currentPeriod][1]}
        `).toLocaleTimeString('en-us', {
    hour: 'numeric',
    minute: 'numeric',
  });

  return `Period ${currentPeriod}  |  ${currentClass}<br />-----<br />Next: ${nextClass} @ ${nextClassTime}`;
};

let pop = () => {
  let el = document.getElementById('party-popper');

  el.style.top = '50%';

  setTimeout(() => {
    el.style.top = '150%';
  }, 2000);
};

let update = () => {
  date = new Date(); // <<<<<<<<<<<<<<<<<<<<<<<<<<< edit this for testing

  if (
    date.getHours() == '14' &&
    date.getMinutes() == '0' &&
    date.getSeconds() == '0'
  )
    pop();

  dateDisplay.innerHTML = `
    
    <strong>
    ${monthsOfTheYear[date.getMonth()]} 
    ${date.getDate()}, 
    ${date.getFullYear()} <br>
    </strong>

    <span id='timeDisplay'>
    ${daysOfTheWeek[date.getDay()]}  |  
    ${date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    })}
    </span>

    `;

  classDisplay.innerHTML = `
    Schedule week #${getScheduleWeek()} <br />
    ${getCurrentClass()}
    `;
};

let darkMode = localStorage.getItem('theme');
//if (!darkMode) darkMode = false;

window.addEventListener('load', () => {
  dateDisplay = document.getElementById('date');
  classDisplay = document.getElementById('current-class');

  update();
  setInterval(update, 500); // repeats every second

  // config menu events
  document
    .getElementById('open-config')
    .addEventListener('click', openConfigMenu);
  document
    .getElementById('dark-mode-toggle')
    .addEventListener('click', darkModeToggle);

  if (darkMode == 'true') {
    document.getElementById('dark-mode-toggle').checked = true;
    document.body.classList.remove('light');
    document.body.classList.add('dark');
    darkMode = true;
  }

  // time machine
  let timeTravelButton = document.getElementById('time-travel-button');
  let timeTravelMenuOpen = false;
  timeTravelButton.addEventListener('click', (e) => {
    let menu = document.getElementById('time-travel');

    if (!timeTravelMenuOpen) {
      document.getElementById('open-config').style.display = 'none';

      menu.style.display = 'block';
      menu.style.opacity = '100%';

      timeTravelButton.innerHTML = 'close';
      timeTravelMenuOpen = true;
    } else if (timeTravelMenuOpen) {
      document.getElementById('open-config').style.display = 'block';

      menu.style.opacity = '0%';
      menu.style.display = 'none';

      timeTravelButton.innerHTML = 'time travel!';
      timeTravelMenuOpen = false;
    }
  });

  document
    .getElementById('time-travel')
    .addEventListener('submit', timeMachineHandler);

  // set default values for time travel
  document.getElementsByTagName('form')[0].children[1].value =
    monthsOfTheYear[date.getMonth()];
  document.getElementsByTagName('form')[0].children[5].value = date.getDate();
  document.getElementsByTagName(
    'form'
  )[0].children[9].value = date.getFullYear();

  document.getElementById('custom-bg-toggle').checked = customBGEnabled;
  document
    .getElementById('custom-bg-toggle')
    .addEventListener('click', customBGHandler);

  document.getElementById('custom-bg-url').value = customBGURL;

  document
    .getElementById('custom-bg-url')
    .addEventListener('change', customBGInputChange);

  if (!customBGEnabled) {
    document.getElementById('custom-bg').removeAttribute('src');
    document.getElementById('custom-bg-url').setAttribute('disabled', '');
  } else {
    document.getElementById('custom-bg').setAttribute('src', customBGURL);
    document.getElementById('custom-bg').style.display = 'block';
    document.getElementById('custom-bg-url').removeAttribute('disabled');
  }

  document
    .getElementById('custom-bg-recommendation')
    .addEventListener('click', recommendCustomBG);
});

// actual config menu stuff
let menuOpen = false;
let openConfigMenu = (e) => {
  let el = document.getElementById('config-menu');
  let bottom = document.getElementById('footer');

  if (menuOpen == false) {
    bottom.hidden = true;
    el.style.display = 'block';
    setTimeout(() => (el.style.opacity = '100%'), 100);
    menuOpen = true;
  } else if (menuOpen == true) {
    bottom.hidden = false;
    el.style.opacity = '0%';
    setTimeout(() => (el.style.display = 'none'), 100);
    menuOpen = false;
  }
};

let darkModeToggle = (e) => {
  let el = document.getElementById('dark-mode-toggle');

  if (el.checked) {
    document.body.classList.remove('light');
    document.body.classList.add('dark');
    darkMode = true;
    localStorage.setItem('theme', true);
  } else if (!el.checked) {
    document.body.classList.remove('dark');
    document.body.classList.add('light');
    darkMode = false;
    localStorage.setItem('theme', false);
  }
};

// time machine
let timeMachineHandler = (e) => {
  let results = document.getElementById('tt-results');

  results.style.display = 'block';

  // create Date from inputs

  let target = e.target;
  let yearIn = target[2];
  let monthIn = target[0];
  let dayIn = target[1];

  let future = new Date(`${monthIn.value} ${dayIn.value} ${yearIn.value}`);

  if (future == 'Invalid Date') {
    results.innerHTML = `
        <h3 style="color: #FC5746">Inputted date was invalid :(</h3>
        `;
  }

  if (future.getDay() == '0' || future.getDay() == '6') {
    results.innerHTML = `
        <h3>Weekend</h3>
        <p>No school</p>
        `;
    return;
  }

  let schedule = scheduleData.schedule;
  let weekSchedule = schedule[getScheduleWeek(future).toString()];
  let daySchedule = weekSchedule[future.getDay()];

  let out = '';
  daySchedule.forEach((v, i) => {
    out += `<p>${++i}. ${v}</p>`;
  });

  results.innerHTML = `
    <h3>Week ${getScheduleWeek(future).toString()} ${
    daysOfTheWeek[future.getDay()]
  }</h3>
    ${out}
    `;
};

let customBGHandler = () => {
  if (!customBGEnabled) {
    // enable
    localStorage.setItem('custom-bg-enabled', 'true');
    customBGEnabled = true;

    document.getElementById('custom-bg').setAttribute('src', customBGURL);
    document.getElementById('custom-bg').style.display = 'block';
    document.getElementById('custom-bg-url').removeAttribute('disabled');
  } else {
    // disable
    localStorage.setItem('custom-bg-enabled', 'false');
    customBGEnabled = false;

    document.getElementById('custom-bg').setAttribute('src', '');
    document.getElementById('custom-bg').style.display = 'none';
    document.getElementById('custom-bg-url').setAttribute('disabled', '');
  }
};

let customBGInputChange = (e) => {
  localStorage.setItem('custom-bg-url', e.target.value);
  document.getElementById('custom-bg').setAttribute('src', e.target.value);
};

let recommendCustomBG = () => {
  localStorage.setItem('custom-bg-url', 'https://louie.co.nz/25th_hour/');
  document
    .getElementById('custom-bg')
    .setAttribute('src', 'https://louie.co.nz/25th_hour/');
};
