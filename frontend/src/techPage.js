const templateRegistrations = [
  {
    id: "REG-2025-001",
    nome: "João Silva",
    nif: "123456789",
    email: "joao.silva@email.com",
    telefone: "+351 912 345 678",
    endereco: "Rua das Flores, 123, Lisboa",
    data: "2025-03-15",
    n_paineis: 12,
    potencia: 4.8,
    marca_paineis: "SunPower Maxeon 3",
    status: "pending",
    images: [
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400",
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400",
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400"
    ]
  },
  {
    id: "REG-2025-002",
    nome: "Maria Santos",
    nif: "987654321",
    email: "maria.santos@email.com",
    telefone: "+351 923 456 789",
    endereco: "Av. da República, 456, Porto",
    data: "2025-03-16",
    n_paineis: 8,
    potencia: 3.2,
    marca_paineis: "LG NeON 2",
    status: "approved",
    images: [
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400",
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400"
    ]
  }
];

let currentRegistrations = [];
let currentIndex = 0;

function searchClients() {
  const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
  if (searchTerm === '') {
    alert('Please enter a search term');
    return;
  }

  const filteredRegistrations = templateRegistrations;
  currentRegistrations = filteredRegistrations;

  toggleCarousel(true);

  if (filteredRegistrations.length > 0) {
    initCarousel(filteredRegistrations);
  } else {
    document.getElementById('noResults').style.display = 'block';
    document.getElementById('carouselContent').innerHTML = '<div class="no-results">No registrations found for the search criteria.</div>';
    updatePagination();
  }
}

function initCarousel(registrations) {
  const carouselContent = document.getElementById('carouselContent');
  carouselContent.innerHTML = '';
  registrations.forEach((registration, index) => carouselContent.appendChild(createSlide(registration, index)));
  currentIndex = 0;
  showSlide(0);
  updatePagination();
}

function createSlide(registration, index) {
  const slide = document.createElement('div');
  slide.className = 'registration-slide';
  const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
  const images = Array.isArray(registration.imagePaths || registration.images) ? (registration.imagePaths || registration.images) : [];

  slide.innerHTML = `
    <div class="registration-header">
      <div class="registration-id">${registration._id || registration.id || 'No ID'}</div>
      <div class="status-badge status-${registration.status || 'pending'}">${registration.status || 'pending'}</div>
    </div>
    <div class="registration-content">
      <div class="info-section">
        <h3>Client Information</h3>
        <div class="info-row">
          <span class="info-label">NIF:</span>
          <span class="info-value">${registration.nif || 'N/A'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Email:</span>
          <span class="info-value">${searchTerm || 'N/A'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Phone:</span>
          <span class="info-value">${registration.phone || registration.telefone || 'N/A'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Address:</span>
          <span class="info-value">${registration.installationAddress || registration.endereco || 'N/A'}</span>
        </div>
      </div>
      <div class="info-section">
        <h3>Installation Details</h3>
        <div class="info-row">
          <span class="info-label">Date:</span>
          <span class="info-value">${registration.installDate ? new Date(registration.installDate).toLocaleDateString('en-GB') : (registration.data ? new Date(registration.data).toLocaleDateString('en-GB') : 'N/A')}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Number of Panels:</span>
          <span class="info-value">${registration.panelCount || registration.n_paineis || 'N/A'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Total Power:</span>
          <span class="info-value">${registration.power || registration.potencia || 'N/A'} kWp</span>
        </div>
        <div class="info-row">
          <span class="info-label">Panel Brand:</span>
          <span class="info-value">${registration.model || registration.marca_paineis || 'N/A'}</span>
        </div>
      </div>
      <div class="images-section">
        <h3>Installation Images</h3>
        <div class="images-grid">
          ${images.map(img => `
            <div class="image-item">
              <img src="/${img.replace(/^.*?uploads[\\/]/, 'uploads/')}" alt="Installation image" loading="lazy">
            </div>
          `).join('')}
        </div>
      </div>
    </div>
    ${registration.status === 'pending' ? `
      <div class="validation-section">
        <button class="validate-btn approve-btn" onclick="validateRegistration(${index}, 'approved')">
          Approve
        </button>
        <button class="validate-btn reject-btn" onclick="validateRegistration(${index}, 'rejected')">
          Reject
        </button>
        <button class="validate-btn upload-btn" onclick="uploadCertificate('${registration.mail || registration.email || ''}')">
          Upload Certificate
        </button>
      </div>
    ` : ''}
  `;
  return slide;
}

const certifiedUsers = new Set();

function uploadCertificate(email) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/pdf';

  input.onchange = async () => {
    const file = input.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('userMail', email);
    formData.append('certificado', file);

    const token = sessionStorage.getItem('token');

    try {
      const response = await fetch('/certifications/register', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      const result = await response.json();
      alert(result.message || result.error);
      if (!result.error) {
        certifiedUsers.add(email);
        updateApproveButtons();
      }
    } catch (err) {
      console.error('Error uploading certificate:', err);
      alert('Error uploading certificate');
    }
  };

  input.click();
}

function updateApproveButtons() {
  document.querySelectorAll('.registration-slide').forEach(slide => {
    const email = slide.querySelector('.info-row:nth-child(3) .info-value').textContent;
    const approveBtn = slide.querySelector('.approve-btn');
    if (approveBtn) approveBtn.disabled = !certifiedUsers.has(email);
  });
}

async function searchClients() {
  const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
  if (searchTerm === '') {
    currentRegistrations = templateRegistrations;
    initCarousel(currentRegistrations);
    return;
  }

  const token = sessionStorage.getItem('token');

  try {
    const res = await fetch(`/panels?email=${encodeURIComponent(searchTerm)}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    const installs = Array.isArray(data) ? data : data.installations;

    const certRes = await fetch(`/certifications/check?email=${encodeURIComponent(searchTerm)}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const certResult = await certRes.json();
    if (certResult.exists) certifiedUsers.add(searchTerm);

    currentRegistrations = installs && installs.length > 0 ? installs : templateRegistrations;
    toggleCarousel(true);
    initCarousel(currentRegistrations);
  } catch (err) {
    console.error('Error fetching installations or certificate:', err);
    alert('Error fetching records.');
    currentRegistrations = templateRegistrations;
    initCarousel(currentRegistrations);
  }
}

function showSlide(index) {
  const slides = document.querySelectorAll('.registration-slide');
  if (slides.length === 0) return;
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
  currentIndex = index;
  updatePagination();
  document.getElementById('prevBtn').disabled = index === 0;
  document.getElementById('nextBtn').disabled = index === slides.length - 1;
}

function nextSlide() {
  if (currentIndex < currentRegistrations.length - 1) showSlide(currentIndex + 1);
}

function prevSlide() {
  if (currentIndex > 0) showSlide(currentIndex - 1);
}

async function validateRegistration(index, status) {
  const installation = currentRegistrations[index];
  const token = sessionStorage.getItem('token');

  try {
    const res = await fetch(`/panels/${installation._id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });

    const result = await res.json();
    if (res.ok) {
      currentRegistrations[index].status = status;
      initCarousel(currentRegistrations);
      alert(`Installation was ${status} successfully!`);
    } else {
      alert(result.error || 'Error updating status');
    }
  } catch (err) {
    console.error('Error updating status:', err);
    alert('Error updating status');
  }
}

function updatePagination() {
  const totalSlides = currentRegistrations.length;
  document.getElementById('currentSlide').textContent = totalSlides > 0 ? currentIndex + 1 : 0;
  document.getElementById('totalSlides').textContent = totalSlides;
}

function toggleCarousel(show) {
  const carousel = document.getElementById('carouselContainer');
  if (show) carousel.classList.add('show');
  else carousel.classList.remove('show');
}

document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');

  searchBtn.addEventListener('click', searchClients);
  document.getElementById('nextBtn').addEventListener('click', nextSlide);
  document.getElementById('prevBtn').addEventListener('click', prevSlide);
});
