async function fetchTimeAndIP() {
  // 获取当前时间
  const timeResponse = await fetch('https://worldtimeapi.org/api/ip');
  const timeData = await timeResponse.json();
  const dateTime = new Date(timeData.datetime);
  const options = { timeZone: timeData.timezone, hour: '2-digit', minute: '2-digit', second: '2-digit' };

  // 显示当前时间和日期
  document.getElementById('digital-clock').innerText = dateTime.toLocaleTimeString('zh-CN', options);
  document.getElementById('date').innerText = dateTime.toLocaleDateString('zh-CN');

  // 获取访问者的 IP 地址
  const ipResponse = await fetch('https://api.ipify.org?format=json');
  const ipData = await ipResponse.json();
  const ip = ipData.ip;

  // 获取 IP 地址的详细信息
  const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
  const geoData = await geoResponse.json();

  // 显示 IP 信息
  const ipv4 = ip || '不支持';
  const ipv6 = geoData.ipv6 || '不支持';
  const address = `${geoData.city}, ${geoData.region}, ${geoData.country}`;

  document.getElementById('ip-info').innerHTML = `IPv4: ${ipv4}<br>IPv6: ${ipv6}<br>地址: ${address}<br>时区: ${geoData.timezone}`;
}

function updateAnalogClock() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  const secondDeg = ((seconds / 60) * 360) + 90; // 90度偏移
  const minuteDeg = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90; // 90度偏移
  const hourDeg = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90; // 90度偏移

  document.querySelector('#analog-clock .second').style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
  document.querySelector('#analog-clock .minute').style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
  document.querySelector('#analog-clock .hour').style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
}

function addSeasonalEffects() {
  const month = new Date().getMonth();
  const snowflakesContainer = document.createElement('div');
  snowflakesContainer.className = 'snowflakes';

  if (month === 11 || month === 0 || month === 1) { // 冬季
    for (let i = 0; i < 50; i++) {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      snowflake.innerHTML = '❄';
      snowflake.style.left = Math.random() * 100 + 'vw';
      snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
      snowflake.style.fontSize = Math.random() * 1 + 0.5 + 'em';
      snowflakesContainer.appendChild(snowflake);
    }
    document.body.appendChild(snowflakesContainer);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchTimeAndIP();
  addSeasonalEffects();

  // 更新时钟
  setInterval(() => {
    updateAnalogClock();
    fetchTimeAndIP(); // 每分钟更新一次时间和IP信息
  }, 1000);

  window.addEventListener('scroll', () => {
    if (window.scrollY === 0) {
      document.getElementById('clock-container').style.display = 'block';
      document.getElementById('main-content').style.display = 'none';
    } else {
      document.getElementById('clock-container').style.display = 'none';
      document.getElementById('main-content').style.display = 'block';
    }
  });
});