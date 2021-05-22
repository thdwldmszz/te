let d = new Date();

const displayTable = function () {
  let times = [];
  for (let i = 0; i < 24; i++) {
    times.push(
      `<tr><th scope = "row" style = "width: 100px; height: 50px">${i}:00</th>`
    );
    for (let j = 0; j < 7; j++) times.push(`<td></td>`);
    times.push(`</tr>`);
  }
  document.querySelector("#times").innerHTML = times.join("");
};

const displayWeek = function () {
  const year = d.getFullYear();
  const month = d.getMonth(); // 0~11
  const date = d.getDate(); // 1~31
  const day = d.getDay(); // 0~6

  document.querySelector(".YM").textContent = `${year} ${month + 1}`;

  const lastEnd = new Date(year, month, 0);
  const thisEnd = new Date(year, month + 1, 0);

  const LEDate = lastEnd.getDate();
  const TEDate = thisEnd.getDate();

  const lastDates = [];
  const thisDates = [];
  const nextDates = [];

  for (let i = date - day; i <= 0; i++) lastDates.push(LEDate + i);

  for (let i = day; i > 0; i--) if (date - i > 0) thisDates.push(date - i);
  thisDates.push(date);
  for (let i = 1; i <= 6 - day; i++)
    if (date + i <= TEDate) thisDates.push(date + i);

  let dates = lastDates.concat(thisDates);

  for (let i = 1; i <= 7 - dates.length; i++) nextDates.push(i);
  dates = dates.concat(nextDates);

  // Put into week.html
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

  displayTable();
};

displayWeek();

const lastWeek = function () {
  d.setDate(d.getDate() - 7);
  d.setDate(d.getDate() - d.getDay());
  displayWeek();
};
const nextWeek = function () {
  d.setDate(d.getDate() + 7);
  d.setDate(d.getDate() - d.getDay());
  displayWeek();
};