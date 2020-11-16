const base_url = 'https://api.football-data.org/v2/';
const api = 'b7fdf68820ce4d82bf06bfb3e6f13808';
const id_liga = 2002;
const enpoint_kompetisi = `${base_url}competitions/${id_liga}/standings/`;
const enpoint_team = `${base_url}teams/`;
 
const fetchAPI = (url) => fetch(url, {
  headers: {
    'Content-Type': 'text/plain',
    'X-Auth-Token': api,
    'Connection' :'keep-alive',
  },
})

  .then(status)
  .then(json)
  .catch(error);

  function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 0),
        day = '' + d.getDate(),
        year = d.getFullYear();
        // hour = d.getHours();
  
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
  
    return [ day, month, year].join('-');
  }
  
  function status(response) {
    if (response.status !== 200) {
      console.log(`Error: ${response.status}`);
      return Promise.reject(new Error(response.statusText));
    }
    return Promise.resolve(response);
  }
   
  function json(response) {
    return response.json();
  }
   
  function error(error) {
    console.log(`Error : ${error}`);
  }

  function getStandings() {
    if ('caches' in window) {
      caches.match(enpoint_kompetisi).then((response) => {
        if (response) {
          response.json().then((data) => {
            showStanding(data);
          });
        }
      });
    }
   
    fetchAPI(enpoint_kompetisi)
      .then((data) => {   
        showStanding(data);
      })
      .catch(error);
  }

  function showStanding(data) {
    // console.log(data);
    let standings = '';
    let standingElement = document.getElementById('body-content');
    let loadingpage = document.getElementsByClassName('loading-page')[0].style.display = 'none';

    data.standings[0].table.forEach((standing) => {
      standings += `
        <tr>
          <td class="center">${standing.position}</td>
          <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge" onerror="this.onerror=null;this.src='img/icon/icon-512x512.png'"/></td>
          <td><a href="./team.html?id=${standing.team.id}">${standing.team.name}</a></td>
          <td>${standing.won}</td>
          <td>${standing.draw}</td>
          <td>${standing.lost}</td>
          <td>${standing.goalsFor}</td>
          <td>${standing.goalsAgainst}</td>
          <td>${standing.goalDifference}</td>
          <td>${standing.points}</td>
        </tr>
        `;
    });
       
    standingElement.innerHTML = `
      <div class="card hoverable" style="padding-left: 20px; padding-right: 20px; margin-top: 30px;">
      <table class="striped responsive-table">
        <thead>
          <tr>
            <th class="center">Pos</th>
            <th></th>
            <th>Team Name</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>Pts</th>
          </tr>
          </thead>
        <tbody id="standings">
            ${standings}
        </tbody>
      </table>
      
      </div>
      `;
  }

  function getTeamById() {
    return new Promise((resolve, reject) => {
      let urlParams = new URLSearchParams(window.location.search);
      let idParam = urlParams.get('id');
      if ('caches' in window) {
        caches.match(enpoint_team + idParam).then((response) => {
          if (response) {
            response.json().then((data) => {
              showTeam(data);
              resolve(data);
            });
          }
        });
      }
   
      fetchAPI(enpoint_team + idParam)
        .then((data) => {
          showTeam(data);
          resolve(data);
        })
        .catch((error) => {
          console.log(error);
          let teamHTML = '';
          teamHTML = '<h3 class="center bold deep-purple-text text-darken-4" style="margin-top: 5em;">Sorry Page error, please refresh page and check your network.</h3>';
          document.getElementById('team-content').innerHTML = teamHTML;
        });
    });
  }
   
  function showTeam(data) {
    // console.log(data);
    let loadingpage = document.getElementsByClassName('loading-page')[0].style.display = 'none';
    let teamHTML = '';
    teamHTML = `
      <div class="card row" style="margin-top: 20px;"> <br>
        <div class="cik s12 m12 center-align"> <h5><b> TEAM INFORMATION </b> </h5><div>
        <div class="col s12 m6 l5">
          <h3 class="bold deep-purple-text text-darken-4 center">${data.name}</h3>
          <div class="valign-wrapper">
            <img src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="badge" style="width: 60%; margin: 0 auto;" onerror="this.onerror=null;this.src='img/icon/icon-512x512.png'"/>
          </div>
        </div>
   
        <div class="col s12 m6 l7">
          <div class="card hoverable" style="padding-left: 20px; padding-right: 20px; margin-top: 30px;">
            <table class="striped">
              <th class="center-align" colspan="2">
                Information Club
              <th>
              <tr>
                <th>Name</th>
                <td>${data.name}</td>
              </tr>
              <tr>
                <th>Country</th>
                <td>${data.area.name}</td>
              </tr>
              <tr>
                <th>Address</th>
                <td>${data.address}</td>
              </tr>
              <tr>
                <th>Venue</th>
                <td>${data.venue}</td>
              </tr>
              <tr>
                <th>Club Colors</th>
                <td>${data.clubColors}</td>
              </tr>
              <tr>
                <th>Founded</th>
                <td>${data.founded}</td>
              </tr>
              <!-- <tr>
                <th>Squad</th>
                <td>
                  <a href="./squad.html" class="collection-item active">
                    <button class="btn waves-effect  red lighten-1" type="submit" name="action">Cek Data Squad 
                      <i class="material-icons right">send</i>
                    </button>
                  </a>  
                </td>
              </tr> -->
              <tr>
                <th>Last Update</th>
                <td>${formatDate(data.lastUpdated)  }</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      `;
   
    document.getElementById('team-content').innerHTML = teamHTML;
  }

  function getSavedInfoTeam() {
    getAll().then(function(datainfo) {
      let savedinfo = '';
      let savedinfoElement = document.getElementById('body-content');

      datainfo.forEach(function(data) {
          savedinfo +=
          `
          <tr> 
              <td> 
                  <img src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="badge" style="width: 45px; margin: 0 auto;" />
              </td> 
              <td> ${data.name} </td>
              <td> ${data.area.name} </td> 
              <td> ${data.founded} </td>
              <td>
                <a href="">
                  <button class="btn waves-effect  red lighten-1" id="buttonhapus" type="submit" name="action" onclick="deleteinfo(${data.id})">
                    <i class="material-icons ">delete</i>
                  </button> </a>
              </td> 
            </tr>
          ` 
      })
        

        savedinfoElement.innerHTML = `
        <div class="card hoverable" style="padding-left: 20px; padding-right: 20px; margin-top: 30px;">
            <table class="striped responsive-table">
              <thead>
                <tr>
                  <th>Logos</th>
                  <th>Team Name</th>
                  <th>Country</th>
                  <th>Founded</th>
                  <th>Delete</th>
                </tr>
                </thead>
              <tbody id="team-content">
              
              ${savedinfo}
              
              </tbody>
          </table>
        `;
    });
  }

  function getTeamAll() {
    if ('caches' in window) {
      caches.match(enpoint_team).then((response) => {
        if (response) {
          response.json().then((data) => {
            showTeams(data);
          });
        }
      });
    }
   
    fetchAPI(enpoint_team)
      .then((data) => {   
        showTeams(data);
      })
      .catch(error);
  }

  function showTeams(data) {
    // console.log(data);
    let tampilHTML,tampildetail = '';
    let standingElement = document.getElementById('team-content');
    let loadingpage = document.getElementsByClassName('loading-page')[0].style.display = 'none';

    data.teams.forEach((tampils) => {
      tampilHTML += `
        <option value='${tampils.id}'>${tampils.name}</option>
      `;
    });
    standingElement.innerHTML = `
    <div class="card hoverable" style="padding-left: 20px; padding-right: 20px; margin-top: 30px;" >
    <h5> <p class="center"> INFORMATION SCHEDULED TEAM </p></h5>
    <label>SCHEDULED Select</label>
    
    <div class="input-field">
      <select class="browser-default" onchange="changeFunc(value);">  
        <option value="" selected="selected">Choose your option</option>  
        ${tampilHTML}
      </select>  
    </div>
    </div>

    <div id="jadwal">
    </div>
    `;
  }

  function changeFunc($i) {
    // alert($i);
    return new Promise((resolve, reject) => {
      let urlParams = new URLSearchParams(window.location.search);
      let idParam = urlParams.get('id');
      if ('caches' in window) {
        caches.match(enpoint_team + $i +'/matches?status=SCHEDULED').then((response) => {
          if (response) {
            response.json().then((data) => {
              TampilJadwal(data);
              resolve(data);
            });
          }
        });
      }
   
      fetchAPI(enpoint_team + $i +'/matches?status=SCHEDULED')
        .then((data) => {
          TampilJadwal(data);
          resolve(data);
        })
        .catch((error) => {
          console.log(error);
          let teamHTML = '';
          teamHTML = '<h3 class="center bold deep-purple-text text-darken-4" style="margin-top: 5em;">Sorry Page error, please refresh page and check your network.</h3>';
          document.getElementById('jadwal').innerHTML = teamHTML;
        });
    });
  }

  function TampilJadwal(data) {
    // console.log(data);
    let jadwalElement = document.getElementById('jadwal');
    let loadingpage = document.getElementsByClassName('loading-page')[0].style.display = 'none';
    const none = "No data";
    let jadwalHTML = '';
      jadwalElement.innerHTML = `
        ${jadwalHTML}
          <div class="col s12 m6 l7">
          <div class="card hoverable" style="padding-left: 20px; padding-right: 20px; margin-top: 30px;">
            <table class="striped">
              <th class="center-align" colspan="2">
              INFO ${data.filters.status ? data.filters.status : 'NO SCHEDULED'}
              <th>
              <tr>
                <th>Away Team Name</th>
                <td>${data.matches[0].awayTeam.name ? data.matches[0].awayTeam.name : none}</td>
              </tr>
              <tr>
                <th>Home Team Name</th>
                <td>${data.matches[0].homeTeam.name ? data.matches[0].homeTeam.name : none}</td>
              </tr>
              <tr>
                <th>Start Date Session</th>
                <td>${formatDate(data.matches[0].season.startDate) ? formatDate(data.matches[0].season.startDate) : none}</td>
              </tr>
              <tr>
                <th>End Date Session</th>
                <td>${formatDate(data.matches[0].season.endDate) ? formatDate(data.matches[0].season.endDate) : none}</td>
              </tr>
              <tr>
                <th rowspan="3" >Competition</th>
                <td>${data.matches[0].competition.name ? data.matches[0].competition.name : none}</td>
              </tr>
              <tr>
              <td><img src="${data.matches[0].competition.area.ensignUrl.replace(/^http:\/\//i, 'https://') ? data.matches[0].competition.area.ensignUrl.replace(/^http:\/\//i, 'https://') : none }" width="50px" alt="badge" onerror="this.onerror=null;"/></td>
              </tr>
              <tr>
                <td>${data.matches[0].competition.area.name ? data.matches[0].competition.area.name : none}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>${data.matches[0].status ? data.matches[0].status : none}</td>
              </tr>
              <tr>
                <th>utc Date</th>
                <td>${formatDate(data.matches[0].utcDate)}</td>
              </tr>
            </table>
          </div>
        </div>
        `;
  }