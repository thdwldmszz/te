let date = new Date();

const displayCal = function () {
  const year = date.getFullYear();
  const month = date.getMonth();

  document.querySelector(".YM").textContent = `${year} ${month + 1}`;

  const lastEnd = new Date(year, month, 0);
  const thisEnd = new Date(year, month + 1, 0);

  const LEDate = lastEnd.getDate();
  const LEDay = lastEnd.getDay();
  const TEDate = thisEnd.getDate();
  const TEDay = thisEnd.getDay();

  const lastDates = [];
  const thisDates = [];
  const nextDates = [];

  if (LEDay != 6) for (let i = LEDay; i >= 0; i--) lastDates.push(LEDate - i);
  for (let i = 1; i <= TEDate; i++) thisDates.push(i);
  for (let i = 1; i < 7 - TEDay; i++) nextDates.push(i);

  const dates = lastDates.concat(thisDates, nextDates);
  const lastIdx = lastDates.length - 1;
  const nextIdx = dates.length - nextDates.length;

  const today = new Date();
  if (year === today.getFullYear() && month === today.getMonth()) {
    dates.forEach((date, i) => {
      if (i <= lastIdx || i >= nextIdx)
        dates[
          i
        ] = `<div class = "date" ><span style = "opacity: .3" >${date}</span></div>`;
      else if (dates[i] === today.getDate())
        dates[
          i
        ] = `<div class = "date border border-primary rounded">${date}</div>`;
      else dates[i] = `<div class = "date">${date}</div>`;
    });
  } else {
    dates.forEach((date, i) => {
      if (i <= lastIdx || i >= nextIdx)
        dates[
          i
        ] = `<div class = "date" ><span style = "opacity: .3" >${date}</span></div>`;
      else dates[i] = `<div class = "date">${date}</div>`;
    });
  }
  document.querySelector(".dates").innerHTML = dates.join("");
};

displayCal();

const lastMonth = function () {
  date.setMonth(date.getMonth() - 1);
  displayCal();
};

const nextMonth = function () {
  date.setMonth(date.getMonth() + 1);
  displayCal();
};