const createStatusPlaceholder = function() {
  const statusList = document.createElement('ul')
  statusList.style.marginLeft = '1em';

  const status = document.createElement('li');
  status.innerText = 'Status: ';

  statusList.appendChild(status);
  return statusList;
};

const createStoryTitle = function(issueLink) {
  const ticketNumber = issueLink.id.split('_')[1];
  const title = `${issueLink.innerText.replace('[', '').replace(']', '')} #${ticketNumber}`;
  return title;
}

const createStoryLink = function(issueLink) {
  const title = createStoryTitle(issueLink);
  const newLink = document.createElement('a');
  newLink.href = issueLink.href;
  newLink.innerText = title;
  return newLink;
}

const createStory = function(issueRow, statusList) {
  const title = createStoryTitle(issueRow);
  const issueLink = issueRow.querySelector('.link-gray-dark');
  const storyLink = createStoryLink(issueLink);

  const story = document.createElement('li');
  story.appendChild(storyLink);

  statusList = createStatusPlaceholder();
  story.appendChild(statusList);
  return story;
};

const createStoriesList = function() {
  const storiesList = document.createElement('ul');
  storiesList.id = 'github-stories';
  storiesList.addEventListener('copy', (event) => {
    event.clipboardData.setData(
      'text/html',
      document.getElementById('github-stories').outerHTML
    );
    event.preventDefault();
  });
  storiesList.style.marginLeft = '2em';

  return storiesList;
}

const renderList = function(storiesList) {
  const body = document.querySelector('body');
  document.querySelector('html').replaceChild(storiesList, body);
}

const githubIssuesStandup = function() {
  const issues = document.querySelectorAll('.Box-row');
  const storiesList = createStoriesList();

  const statusList = createStatusPlaceholder();
  for (let issueRow of issues) {
    const story = createStory(issueRow, statusList);
    storiesList.appendChild(story);
  }

  renderList(storiesList);
};

githubIssuesStandup();
