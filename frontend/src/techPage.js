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

    // TODO call the backend route here 
    // const filteredRegistrations = filterRegistrations(searchTerm);
    const filteredRegistrations = templateRegistrations
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
    slide.innerHTML = `
        <div class="registration-header">
            <div class="registration-id">${registration.id}</div>
            <div class="status-badge status-${registration.status}">${registration.status}</div>
        </div>
        <div class="registration-content">
            <div class="info-section">
                <h3>Client Information</h3>
                <div class="info-row">
                    <span class="info-label">Name:</span>
                    <span class="info-value">${registration.nome}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">NIF:</span>
                    <span class="info-value">${registration.nif}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Email:</span>
                    <span class="info-value">${registration.email}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Phone:</span>
                    <span class="info-value">${registration.telefone}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Address:</span>
                    <span class="info-value">${registration.endereco}</span>
                </div>
            </div>
            <div class="info-section">
                <h3>Installation Details</h3>
                <div class="info-row">
                    <span class="info-label">Date:</span>
                    <span class="info-value">${new Date(registration.data).toLocaleDateString('pt-PT')}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Number of Panels:</span>
                    <span class="info-value">${registration.n_paineis}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Total Power:</span>
                    <span class="info-value">${registration.potencia} kWp</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Panel Brand:</span>
                    <span class="info-value">${registration.marca_paineis}</span>
                </div>
            </div>
            <div class="images-section">
                <h3>Installation Images</h3>
                <div class="images-grid">
                    ${registration.images.map(img => `
                        <div class="image-item">
                            <img src="${img}" alt="Installation image" loading="lazy">
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
            </div>
        ` : ''}
    `;
    return slide;
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
    if (currentIndex < currentRegistrations.length - 1)
        showSlide(currentIndex + 1);
}

function prevSlide() {
    if (currentIndex > 0)
        showSlide(currentIndex - 1);
}

// TODO update status in backend
function validateRegistration(index, status) {
    currentRegistrations[index].status = status;

    const carouselContent = document.getElementById('carouselContent');
    carouselContent.innerHTML = '';

    currentRegistrations.forEach((registration, i) => carouselContent.appendChild(createSlide(registration, i)));
    showSlide(currentIndex);

    alert(`Registration ${currentRegistrations[index].id} has been ${status}!`);
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