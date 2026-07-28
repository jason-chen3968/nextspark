const donorOverlay = document.getElementById('donorOverlay');
const orgOverlay = document.getElementById('orgOverlay');

function openModal(overlay) {
  overlay.classList.add('open');
}

function closeModal(overlay) {
  overlay.classList.remove('open');
}

function loadVisitorTracker() {
  const trackerScript = document.createElement('script');

  trackerScript.type = 'module';
  trackerScript.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  trackerScript.dataset.cfBeacon = '{"token": "61ec2a932e334896812300bd6fe221c7"}';

  document.body.appendChild(trackerScript);
}

document.getElementById('openDonor').addEventListener('click', () => openModal(donorOverlay));
document.getElementById('openDonor2').addEventListener('click', () => openModal(donorOverlay));
document.getElementById('openOrg').addEventListener('click', () => openModal(orgOverlay));
document.getElementById('openOrg2').addEventListener('click', () => openModal(orgOverlay));

document.querySelectorAll('[data-close]').forEach((button) => {
  button.addEventListener('click', (event) => {
    closeModal(event.target.closest('.modal-overlay'));
  });
});

[donorOverlay, orgOverlay].forEach((overlay) => {
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      closeModal(overlay);
    }
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal(donorOverlay);
    closeModal(orgOverlay);
  }
});

document.getElementById('submitDonor').addEventListener('click', () => {
  const email = document.getElementById('donorEmail');

  if (!email.value || !email.value.includes('@')) {
    email.focus();
    return;
  }

  document.getElementById('donorForm').classList.add('hidden');
  document.getElementById('donorConfirm').classList.add('show');
});

document.getElementById('submitOrg').addEventListener('click', () => {
  const name = document.getElementById('orgName');
  const location = document.getElementById('orgLocation');
  const bio = document.getElementById('orgBio');
  const email = document.getElementById('orgEmail');

  if (!name.value || !location.value || !bio.value || !email.value || !email.value.includes('@')) {
    (!name.value ? name : !location.value ? location : !bio.value ? bio : email).focus();
    return;
  }

  document.getElementById('orgForm').classList.add('hidden');
  document.getElementById('orgConfirm').classList.add('show');
});

loadVisitorTracker();
