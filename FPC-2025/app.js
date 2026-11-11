
const FPC_DATA = {
  I: {
    name:"Apertura 2025",
    champion:"Independiente Santa Fe",
    runnerUp:"Independiente Medellín",
    finalScore:"2 - 1",
    finalDetail:"Marcador global de la final",
    standingsNote:"Datos de referencia de los ocho clasificados. Verificar tabla oficial completa antes de publicar.",
    teams:[
      {name:"América de Cali",pts:39,pj:20},
      {name:"Millonarios",pts:38,pj:20},
      {name:"Junior",pts:37,pj:20},
      {name:"Deportes Tolima",pts:36,pj:20},
      {name:"Atlético Nacional",pts:35,pj:20},
      {name:"Independiente Santa Fe",pts:33,pj:20},
      {name:"Once Caldas",pts:33,pj:20},
      {name:"Independiente Medellín",pts:32,pj:20}
    ],
    groups:{
      A:["América de Cali","Deportes Tolima","Junior","Independiente Medellín"],
      B:["Millonarios","Atlético Nacional","Once Caldas","Independiente Santa Fe"]
    },
    groupWinners:{
      A:"Independiente Medellín",
      B:"Independiente Santa Fe"
    },
    groupNote:"Finalistas: Independiente Medellín e Independiente Santa Fe.",
    scorers:[
      {name:"Hugo Rodallega",team:"Santa Fe",goals:16},
      {name:"Dayro Moreno",team:"Once Caldas",goals:11},
      {name:"Gonzalo Lencina",team:"Tolima",goals:10},
      {name:"Edwin Cardona",team:"Nacional",goals:9},
      {name:"Alfredo Morelos",team:"Nacional",goals:8},
      {name:"Rodrigo Holgado",team:"América",goals:7},
      {name:"Duván Vergara",team:"América",goals:7}
    ],
    statNote:"Hugo Rodallega fue el máximo goleador del Apertura con 16 tantos."
  },

  II:{
    name:"Clausura 2025",
    champion:"Junior de Barranquilla",
    runnerUp:"Deportes Tolima",
    finalScore:"4 - 0",
    finalDetail:"Marcador global de la final",
    standingsNote:"Datos de referencia de los ocho clasificados. Verificar tabla oficial completa antes de publicar.",
    teams:[
      {name:"Independiente Medellín",pts:40,pj:20},
      {name:"Deportes Tolima",pts:38,pj:20},
      {name:"Atlético Nacional",pts:37,pj:20},
      {name:"Atlético Bucaramanga",pts:37,pj:20},
      {name:"Fortaleza CEIF",pts:35,pj:20},
      {name:"Junior",pts:33,pj:20},
      {name:"Independiente Santa Fe",pts:31,pj:20},
      {name:"América de Cali",pts:29,pj:20}
    ],
    groups:{
      A:["Independiente Medellín","Atlético Nacional","Junior","América de Cali"],
      B:["Deportes Tolima","Atlético Bucaramanga","Fortaleza CEIF","Independiente Santa Fe"]
    },
    groupWinners:{
      A:"Junior",
      B:"Deportes Tolima"
    },
    groupNote:"Finalistas: Junior de Barranquilla y Deportes Tolima.",
    scorers:[
      {name:"Francisco Fydriszewski",team:"Medellín",goals:12},
      {name:"Luciano Pons",team:"Bucaramanga",goals:12},
      {name:"Carlos Lucumí",team:"Alianza FC",goals:10},
      {name:"Brayan León",team:"Medellín",goals:10},
      {name:"Yoshan Valois",team:"Pasto",goals:10},
      {name:"Alfredo Morelos",team:"Nacional",goals:8},
      {name:"José Enamorado",team:"Junior",goals:8}
    ],
    statNote:"Fydriszewski fue goleador con 12 goles en 21 partidos; Luciano Pons anotó 12 en 24."
  }
};

const $ = id => document.getElementById(id);

let currentSeason = "I";
let goalsChart = null;

function initials(name){
  return name.split(" ").filter(Boolean)
    .slice(0,2)
    .map(word=>word[0])
    .join("")
    .toUpperCase();
}

function renderStandings(){
  const data = FPC_DATA[currentSeason];
  const search = $("teamSearch").value.toLowerCase();

  const filtered = data.teams.filter(team =>
    team.name.toLowerCase().includes(search)
  );

  $("standings").innerHTML = filtered.map(team=>{
    const position = data.teams.indexOf(team)+1;

    return `
      <tr>
        <td>${position}</td>
        <td class="team-cell">
          <span class="team-logo">${initials(team.name)}</span>
          ${team.name}
        </td>
        <td>${team.pj}</td>
        <td><b>${team.pts}</b></td>
        <td><span class="status">● CLASIFICADO</span></td>
      </tr>
    `;
  }).join("");

  $("standingsNote").textContent=data.standingsNote;
}

function renderGroups(){
  const data=FPC_DATA[currentSeason];

  ["A","B"].forEach(group=>{
    $("group"+group).innerHTML=data.groups[group].map(
      (team,index)=>`
        <div class="group-team">${index+1}. ${team}</div>
      `
    ).join("");

    $("winner"+group).textContent=
      "🏆 Finalista: "+data.groupWinners[group];
  });

  $("groupsNote").textContent=data.groupNote;
}

function renderFinals(){
  $("finalCards").innerHTML=["I","II"].map(key=>{
    const data=FPC_DATA[key];

    return `
      <article class="final-card">
        <div class="cup">🏆</div>
        <span class="eyebrow">${data.name}</span>
        <h3>${data.champion}</h3>
        <div class="final-score">${data.finalScore}</div>
        <p>${data.finalDetail}</p>
        <p>Subcampeón: ${data.runnerUp}</p>
      </article>
    `;
  }).join("");
}

function renderStatistics(){
  const data=FPC_DATA[currentSeason];

  $("scorerCards").innerHTML=data.scorers.slice(0,3).map(
    (player,index)=>`
      <article class="stat-card">
        <small>${index===0?"🥇 GOLEADOR":"GOLEADOR DESTACADO"}</small>
        <h3>${player.name}</h3>
        <small>${player.team}</small>
        <div><strong>${player.goals}</strong> goles</div>
      </article>
    `
  ).join("");

  $("statsNote").textContent=data.statNote;

  if(goalsChart) goalsChart.destroy();

  goalsChart=new Chart($("goalsChart"),{
    type:"bar",
    data:{
      labels:data.scorers.map(player=>player.name),
      datasets:[{
        label:"Goles",
        data:data.scorers.map(player=>player.goals),
        backgroundColor:"#d9ad46",
        borderRadius:7
      }]
    },
    options:{
      indexAxis:"y",
      responsive:true,
      maintainAspectRatio:false,
      plugins:{
        legend:{display:false}
      },
      scales:{
        x:{
          beginAtZero:true,
          ticks:{color:"#bac7d4",stepSize:2},
          grid:{color:"#304153"}
        },
        y:{
          ticks:{color:"#e5eaf0"},
          grid:{display:false}
        }
      }
    }
  });
}

function renderApp(){
  renderStandings();
  renderGroups();
  renderFinals();
  renderStatistics();
}

$("season").addEventListener("change",event=>{
  currentSeason=event.target.value;
  renderApp();
});

$("teamSearch").addEventListener("input",renderStandings);

$("csvButton").addEventListener("click",()=>{
  const data=FPC_DATA[currentSeason];

  const rows=[
    ["Posición","Equipo","Partidos","Puntos"],
    ...data.teams.map((team,index)=>[
      index+1,team.name,team.pj,team.pts
    ])
  ];

  const csv="\uFEFF"+rows.map(row=>
    row.map(value=>
      `"${String(value).replaceAll('"','""')}"`
    ).join(";")
  ).join("\n");

  const file=new Blob([csv],{
    type:"text/csv;charset=utf-8"
  });

  const url=URL.createObjectURL(file);
  const link=document.createElement("a");

  link.href=url;
  link.download=`FPC-2025-${currentSeason}.csv`;
  link.click();

  URL.revokeObjectURL(url);
});

renderApp();
