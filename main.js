document.getElementById('issueInputForm').addEventListener('submit', submitIssue);


function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random() * 100000000) + '';
  const status = 'Open';

  if (isNaN(description) && isNaN(assignedTo)) {
    const issue = {
      id,
      description,
      severity,
      assignedTo,
      status
    };
    let issues = [];
    if (localStorage.getItem('issues')) {
      issues = JSON.parse(localStorage.getItem('issues'));
    }
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));



    document.getElementById('issueInputForm').reset();
  } else {
    alert("Invalid Description & AssignedTo")
  }
  fetchIssues();
  e.preventDefault();
}


const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const confirmation = confirmationMsg("Close");
  if (confirmation) {
    const currentIssue = issues.find(issue => issue.id == id);
    currentIssue.status = 'Close';
    localStorage.setItem('issues', JSON.stringify(issues));
  }
  fetchIssues();
}
const openIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const confirmation = confirmationMsg("Open");
  if (confirmation) {
    const currentIssue = issues.find(issue => issue.id == id);
    currentIssue.status = 'Open';
    localStorage.setItem('issues', JSON.stringify(issues));
  }

  fetchIssues();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));

  const confirmation = confirmationMsg("delete");
  // console.log(confirmation);
  if (confirmation) {
    const remainingIssues = issues.filter(issue => issue.id != id);

    localStorage.setItem('issues', JSON.stringify(remainingIssues));
  }

  fetchIssues();

}



const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    // console.log(issues[i])
    const {
      id,
      description,
      severity,
      assignedTo,
      status
    } = issues[i];
    // console.log(typeof id);

    if (status == "Open") {
      issuesList.innerHTML += `<div class="well">
                      <h6>Issue ID: ${id} </h6>
                      <p><span class="label label-info"> ${status} </span></p>
                      <h3> ${description} </h3>
                      <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                      <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                      <a onclick="closeIssue(${id})" class="btn btn-warning" id="close-issue">Closed</a>
                      <a onclick="deleteIssue(${id})" class="btn btn-danger" id="delete-issue">Delete</a>
                      </div>`;
    } else {
      issuesList.innerHTML += `<div class="well">
                    <h6>Issue ID: ${id} </h6>
                    <p><span class="label label-info"> ${status} </span></p>
                    <h3 class="line"> ${description} </h3>
                    <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                    <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                    <a onclick="openIssue(${id})" class="btn btn-success" id="close-issue">Open</a>
                    <a onclick="deleteIssue(${id})" class="btn btn-danger" id="delete-issue">Delete</a>
                    </div>`;
    }

  }


  const openIssues = issues.filter(issue => issue.status == "Open")

  document.getElementById("allIssue").textContent = issues.length;
  document.getElementById("openIssue").textContent = openIssues.length;


}

// document.getElementById("close-issue").addEventListener("click", function() {
//   return confirm("Are you sure to close this issue??");
//   console.log("Clicked");

// })

// confirmation

function confirmationMsg(msg) {
  return confirm(`Are you sure to ${msg} this issue?`)
}