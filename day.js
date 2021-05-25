let d = new Date();

const displayTable = function () {
  let times = [];
  for (let i = 0; i < 24; i++) {
    times.push(
      `<tr><th scope = "row" style = "width: 100px; height: 50px">${i}:00</th>`,
    );
    times.push(`<td></td>`);
    times.push(`</tr>`);
  }
  document.querySelector('#times').innerHTML = times.join('');
};

const displayDay = function () {
  const year = d.getFullYear();
  const month = d.getMonth(); // 0~11
  const date = d.getDate(); // 1~31
  const day = d.getDay(); // 0~6
  let days = ['Su', 'Mo', 'Tu', 'We', 'Tu', 'Fr', 'Sa'];

  // appepen year & month
  document.querySelector('.YM').textContent = `${year} ${month + 1}`;

  // append day
  for (let i = 0; i < 7; i++) {
    if (i === day) days[i] = `<p class = "day">${days[i]}</p>`;
    else days[i] = `<p class = "day" style = "opacity: .3" >${days[i]}</p>`;
  }
  document.querySelector('.days').innerHTML = days.join('');

  // append date
  let dateHtml = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    if (i === day) {
      if (
        year === today.getFullYear() &&
        month === today.getMonth() &&
        date === today.getDate()
      ) {
        dateHtml[
          i
        ] = `<div class = "date border borderW-primary rounded">${date}</div>`;
      } else {
        dateHtml[i] = `<div class = "date" >${date}</div>`;
      }
    } else {
      dateHtml[i] = `<div class = "date" ></div>`;
    }
  }
  document.querySelector('.dates').innerHTML = dateHtml.join('');

  displayTable();
};

displayDay();

const lastDay = function () {
  d.setDate(d.getDate() - 1);
  displayDay();
};
const nextDay = function () {
  d.setDate(d.getDate() + 1);
  displayDay();
};