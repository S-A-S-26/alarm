let alarm = [];
let id = 0;

let gettime = () => {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  return [h, m, s];
};

let time_in_min = () => {
  let t = gettime();
  // console.log((t[0]*60)+t[1])
  return t[0] * 60 + t[1];
};

setInterval(() => {
  let time = gettime();
  let h = time[0];
  let m = time[1];
  let s = time[2];
  document.getElementsByTagName("label")[0].innerHTML = `${h}:${m}:${s}`;


}, 1000);

let setAlarm = () => {
  let div = document.createElement("div");
  div.innerHTML = `<label>Enter time </label><input type=time><button onclick='add()'>Set</button>`;
  div.id='setter'
  document.getElementById('ui').after(div)
};

function add() {
  id++;
  let time = document.getElementsByTagName("input")[0].value;
  console.log(time);
  document.getElementById("setter").remove();
  let t2 = time.split(":");
  console.log(time)
  t2[0] = parseInt(t2[0]);
  t2[1] = parseInt(t2[1]);
//   console.log(t2[0] * 60 + t2[1]);
  set_time = t2[0] * 60 + t2[1];
//   let t = gettime();
//   console.log(t[0] * 60 + t[1]);
//   current_time = t[0] * 60 + t[1];
  alarm.unshift({
    id: id,
    settime: set_time,
    exact: time,
    check: function () {
      let i = setInterval(() => {
        // console.log(time_in_min())
        // console.log(this.exact)
        console.log(time_in_min() >= this.settime)
        if (time_in_min() >= this.settime) {
          let audio=new Audio('./The Next Episode - YouTube.MP3')
          audio.play()
          alert(`alarm : ${this.exact}`);
          audio.pause()
          document.getElementById(this.id).remove()
          alarm.splice(this.id,1)
          clearInterval(i);
        }
      }, 1000);
    },
  });
  alarm[0].check()
  console.log(add)
  console.log(alarm[0]['id'].toString())

  let div=document.createElement('div')
  div.innerHTML=alarm[0]['exact']
  div.id=alarm[0]['id'].toString()
  div.classList.add('alarms')
  let main=document.getElementById('main')
  main.append(div)
  main.append(document.createElement('br'))
        

}
