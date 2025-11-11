// --- CONFIGURATION --- //
const PRICING = {
    baseFee: 25,
    perKm: 1.2,
    package: {
        pricePerCubicMeter: 150,
        suitcase: 8,
        packing: 8,
    },
    items: {
        // Office
        'Escritorio individual': 20,
        'Silla de oficina': 8,
        'Archivador (2-3 cajones)': 15,
        'Estantería pequeña (hasta 1.5m)': 12,
        'Pantalla de ordenador': 7,
        'Impresora multifunción': 10,
        'Caja de documentos (estándar)': 4,
        // Home
        'Cama individual/matrimonial': 25,
        'Mesita de noche': 5,
        'Cómoda/Cajonera': 18,
        'Sofá de 2/3 plazas': 35,
        'Mesa de comedor': 22,
        'Silla de comedor': 6,
        'Nevera': 28,
        'Lavadora/Secadora': 25,
        'Televisor': 15,
        'Caja de enseres personales (estándar)': 5,
        // Custom
        customItem: 10,
    },
    itemPacking: 10,
};

const ITEMS = {
    office: [
        'Escritorio individual', 'Silla de oficina', 'Archivador (2-3 cajones)',
        'Estantería pequeña (hasta 1.5m)', 'Pantalla de ordenador', 'Impresora multifunción',
        'Caja de documentos (estándar)'
    ],
    home: [
        'Cama individual/matrimonial', 'Mesita de noche', 'Cómoda/Cajonera',
        'Sofá de 2/3 plazas', 'Mesa de comedor', 'Silla de comedor',
        'Nevera', 'Lavadora/Secadora', 'Televisor',
        'Caja de enseres personales (estándar)'
    ]
};

// --- DOM ELEMENTS --- //
const form = document.getElementById('quote-form');
const estimatedPriceEl = document.getElementById('estimated-price');
const addPackageBtn = document.getElementById('add-package-btn');
const packageList = document.getElementById('package-list');
const originInput = document.getElementById('origin');
const destinationInput = document.getElementById('destination');
const distanceInput = document.getElementById('distance');
const officeItemsList = document.getElementById('office-items');
const homeItemsList = document.getElementById('home-items');
const addCustomItemBtn = document.getElementById('add-custom-item-btn');
const customItemsList = document.getElementById('custom-items-list');

// Modal elements
const modalOverlay = document.getElementById('modal-overlay');
const closeModalBtn = document.getElementById('close-modal-btn');
const viewQuotesLink = document.getElementById('view-quotes-link');
const quotesListEl = document.getElementById('quotes-list');

let packageIdCounter = 0;
let customItemIdCounter = 0;
let distanceDebounceTimeout;

// --- INITIALIZATION --- //
document.addEventListener('DOMContentLoaded', () => {
    populateItemLists();
    addPackage(); // Start with one package entry
    setupEventListeners();
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('service-date').setAttribute('min', today);
});

function setupEventListeners() {
    addPackageBtn.addEventListener('click', addPackage);
    addCustomItemBtn.addEventListener('click', addCustomItem);
    form.addEventListener('input', calculateQuote);
    form.addEventListener('change', calculateQuote);
    originInput.addEventListener('input', () => debounceGetDistance());
    destinationInput.addEventListener('input', () => debounceGetDistance());
    form.addEventListener('submit', handleFormSubmit);

    // Modal listeners
    viewQuotesLink.addEventListener('click', showQuotesModal);
    closeModalBtn.addEventListener('click', () => modalOverlay.classList.add('hidden'));
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.add('hidden');
        }
    });
}

function populateItemLists() {
    const createItemHTML = (itemName, category) => `
        <li>
            <input type="checkbox" id="item-${category}-${itemName.replace(/\s/g, '-')}" name="item-${itemName}" data-item-name="${itemName}">
            <label for="item-${category}-${itemName.replace(/\s/g, '-')}">${itemName}</label>
            <span class="item-packing-container hidden">
                 <label class="item-packing-label">
                    <input type="checkbox" name="packing-${itemName}"> ¿Embalaje?
                 </label>
            </span>
        </li>
    `;

    officeItemsList.innerHTML = ITEMS.office.map(item => createItemHTML(item, 'office')).join('');
    homeItemsList.innerHTML = ITEMS.home.map(item => createItemHTML(item, 'home')).join('');

    // Add listeners for showing/hiding packing option
    document.querySelectorAll('#items-section input[type="checkbox"][data-item-name]').forEach(itemCheckbox => {
        itemCheckbox.addEventListener('change', (e) => {
            const container = e.target.closest('li').querySelector('.item-packing-container');
            container.classList.toggle('hidden', !e.target.checked);
            if (!e.target.checked) {
                container.querySelector('input[type="checkbox"]').checked = false;
            }
            calculateQuote();
        });
    });
}


// --- DYNAMIC FORM LOGIC --- //
function addPackage() {
    packageIdCounter++;
    const packageItem = document.createElement('div');
    packageItem.className = 'package-item';
    packageItem.id = `package-${packageIdCounter}`;
    packageItem.innerHTML = `
        <div class="form-group">
            <label for="type-${packageIdCounter}">Tipo de Bulto</label>
            <select id="type-${packageIdCounter}" name="package-type" class="package-type-select">
                <option value="caja">Caja (indicar medidas)</option>
                <option value="maleta">Maleta</option>
            </select>
        </div>
        <div class="package-dimensions">
            <div class="form-group">
                <label for="length-${packageIdCounter}">Largo (cm)</label>
                <input type="number" id="length-${packageIdCounter}" name="package-length" min="1" placeholder="e.g. 40">
            </div>
            <div class="form-group">
                <label for="width-${packageIdCounter}">Ancho (cm)</label>
                <input type="number" id="width-${packageIdCounter}" name="package-width" min="1" placeholder="e.g. 30">
            </div>
            <div class="form-group">
                <label for="height-${packageIdCounter}">Alto (cm)</label>
                <input type="number" id="height-${packageIdCounter}" name="package-height" min="1" placeholder="e.g. 30">
            </div>
        </div>
        <div class="form-group checkbox-group">
            <input type="checkbox" id="packing-${packageIdCounter}" name="package-packing">
            <label for="packing-${packageIdCounter}">Necesita Embalaje</label>
        </div>
        <button type="button" class="remove-package-btn" data-id="${packageIdCounter}">Eliminar</button>
    `;
    packageList.appendChild(packageItem);

    const typeSelect = packageItem.querySelector('.package-type-select');
    const dimensionsDiv = packageItem.querySelector('.package-dimensions');

    typeSelect.addEventListener('change', (e) => {
        dimensionsDiv.classList.toggle('hidden', e.target.value !== 'caja');
        calculateQuote();
    });

    packageItem.querySelector('.remove-package-btn').addEventListener('click', (e) => {
        document.getElementById(`package-${e.target.dataset.id}`).remove();
        calculateQuote();
    });

    calculateQuote();
}

function addCustomItem() {
    customItemIdCounter++;
    const itemRow = document.createElement('div');
    itemRow.className = 'custom-item-row';
    itemRow.id = `custom-item-${customItemIdCounter}`;
    itemRow.innerHTML = `
        <div class="form-group">
            <label for="custom-item-name-${customItemIdCounter}">Ítem Personalizado</label>
            <input type="text" id="custom-item-name-${customItemIdCounter}" name="custom-item-name" placeholder="Ej: Lámpara de pie">
        </div>
        <div class="form-group checkbox-group">
             <input type="checkbox" id="custom-item-packing-${customItemIdCounter}" name="custom-item-packing">
             <label for="custom-item-packing-${customItemIdCounter}">Necesita Embalaje</label>
        </div>
        <button type="button" class="remove-package-btn" data-id="${customItemIdCounter}">Eliminar</button>
    `;
    customItemsList.appendChild(itemRow);
    itemRow.querySelector('.remove-package-btn').addEventListener('click', (e) => {
        document.getElementById(`custom-item-${e.target.dataset.id}`).remove();
        calculateQuote();
    });
}


// --- CALCULATION LOGIC --- //
function debounceGetDistance() {
    clearTimeout(distanceDebounceTimeout);
    distanceDebounceTimeout = setTimeout(getDistance, 500);
}

async function getDistance() {
    const origin = originInput.value.trim();
    const destination = destinationInput.value.trim();

    if (!origin || !destination) {
        distanceInput.value = '';
        calculateQuote();
        return;
    }
    
    distanceInput.value = 'Calculando...';

    try {
        const [originCoords, destCoords] = await Promise.all([
            geocode(origin),
            geocode(destination)
        ]);
        
        if (originCoords && destCoords) {
            const dist = haversineDistance(originCoords, destCoords);
            distanceInput.value = Math.round(dist);
        } else {
            distanceInput.value = 'No se pudo calcular';
        }
    } catch (error) {
        console.error("Distance calculation error:", error);
        distanceInput.value = 'Error';
    } finally {
        calculateQuote();
    }
}

async function geocode(address) {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1&countrycodes=es`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Geocoding request failed');
    const data = await response.json();
    if (data.length > 0) {
        return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
    }
    return null;
}

function haversineDistance(coords1, coords2) {
    function toRad(x) { return x * Math.PI / 180; }
    const R = 6371; // Earth's radius in km
    const dLat = toRad(coords2.lat - coords1.lat);
    const dLon = toRad(coords2.lon - coords1.lon);
    const lat1 = toRad(coords1.lat);
    const lat2 = toRad(coords2.lat);

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return R * c;
}


function calculateQuote() {
    let total = PRICING.baseFee;

    // Distance cost
    const distance = parseFloat(distanceInput.value) || 0;
    if (distance > 0) {
        total += distance * PRICING.perKm;
    }

    // Package cost
    document.querySelectorAll('.package-item').forEach(item => {
        const type = item.querySelector('[name="package-type"]').value;
        const needsPacking = item.querySelector('[name="package-packing"]').checked;
        
        if (type === 'maleta') {
            total += PRICING.package.suitcase;
        } else if (type === 'caja') {
            const length = parseFloat(item.querySelector('[name="package-length"]').value) || 0;
            const width = parseFloat(item.querySelector('[name="package-width"]').value) || 0;
            const height = parseFloat(item.querySelector('[name="package-height"]').value) || 0;
            if (length > 0 && width > 0 && height > 0) {
                const volumeM3 = (length * width * height) / 1000000;
                total += volumeM3 * PRICING.package.pricePerCubicMeter;
            }
        }
        
        if (needsPacking) total += PRICING.package.packing;
    });

    // Item cost
    document.querySelectorAll('#items-section input[type="checkbox"][data-item-name]:checked').forEach(item => {
        const itemName = item.dataset.itemName;
        const needsPacking = item.closest('li').querySelector('[name^="packing-"]:checked');
        if (itemName) total += PRICING.items[itemName] || 0;
        if (needsPacking) total += PRICING.itemPacking;
    });

    // Custom Item cost
    document.querySelectorAll('.custom-item-row').forEach(item => {
        const nameInput = item.querySelector('[name="custom-item-name"]');
        if (nameInput && nameInput.value.trim() !== '') {
            total += PRICING.items.customItem;
            const needsPacking = item.querySelector('[name="custom-item-packing"]').checked;
            if (needsPacking) {
                total += PRICING.itemPacking;
            }
        }
    });

    estimatedPriceEl.textContent = `€${total.toFixed(2)}`;
}

// --- FORM SUBMISSION & STORAGE --- //
function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const data = {
        date: new Date().toLocaleString('es-ES'),
        origin: formData.get('origin'),
        destination: formData.get('destination'),
        distance: formData.get('distance'),
        serviceDate: formData.get('service-date'),
        packages: [],
        items: [],
        estimatedPrice: estimatedPriceEl.textContent,
    };
    
    const packages = document.querySelectorAll('.package-item');
    packages.forEach((pkg) => {
        const type = pkg.querySelector('[name="package-type"]').value;
        const pkgData = {
            type: type,
            packing: pkg.querySelector('[name="package-packing"]').checked,
        };
        if (type === 'caja') {
            pkgData.length = pkg.querySelector('[name="package-length"]').value;
            pkgData.width = pkg.querySelector('[name="package-width"]').value;
            pkgData.height = pkg.querySelector('[name="package-height"]').value;
        }
        data.packages.push(pkgData);
    });
    
    document.querySelectorAll('#items-section input[type="checkbox"][data-item-name]:checked').forEach(item => {
         const itemName = item.dataset.itemName;
         const needsPacking = item.closest('li').querySelector('[name^="packing-"]:checked');
         data.items.push({ name: itemName, packing: !!needsPacking });
    });

    document.querySelectorAll('.custom-item-row').forEach(row => {
        const name = row.querySelector('[name="custom-item-name"]').value.trim();
        if (name) {
            const needsPacking = row.querySelector('[name="custom-item-packing"]').checked;
            data.items.push({ name: `(Personalizado) ${name}`, packing: needsPacking });
        }
    });

    saveQuoteToLocalStorage(data);
    alert(`¡Solicitud de presupuesto enviada!\nPrecio orientativo: ${data.estimatedPrice}\nNos pondremos en contacto con usted en breve.`);
    form.reset();
    packageList.innerHTML = '';
    customItemsList.innerHTML = '';
    addPackage();
    populateItemLists(); // Re-add listeners after reset
    calculateQuote();
}

function saveQuoteToLocalStorage(data) {
    const quotes = JSON.parse(localStorage.getItem('quotes') || '[]');
    quotes.push(data);
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

function showQuotesModal(e) {
    if (e) e.preventDefault();
    const quotes = JSON.parse(localStorage.getItem('quotes') || '[]');
    
    quotesListEl.innerHTML = ''; // Clear previous content

    if (quotes.length === 0) {
        quotesListEl.textContent = 'No hay presupuestos guardados.';
    } else {
        // Show most recent quotes first
        quotes.slice().reverse().forEach((quote, index) => {
            const quoteCard = document.createElement('div');
            quoteCard.className = 'quote-card';

            const packagesHTML = quote.packages.length > 0 
                ? `
                    <div class="quote-section">
                        <h4>Bultos (${quote.packages.length})</h4>
                        <ul>
                            ${quote.packages.map(p => `<li>${p.type === 'maleta' ? 'Maleta' : `Caja (${p.length || 'N/A'}x${p.width || 'N/A'}x${p.height || 'N/A'}cm)`}${p.packing ? ' - con embalaje' : ''}</li>`).join('')}
                        </ul>
                    </div>
                ` 
                : '';

            const itemsHTML = quote.items.length > 0
                ? `
                    <div class="quote-section">
                        <h4>Ítems (${quote.items.length})</h4>
                        <ul>
                            ${quote.items.map(item => `<li>${item.name}${item.packing ? ' - con embalaje' : ''}</li>`).join('')}
                        </ul>
                    </div>
                `
                : '';
            
            const quoteNumber = quotes.length - index;
            quoteCard.innerHTML = `
                <h3>Presupuesto #${quoteNumber} - <strong>${quote.estimatedPrice}</strong></h3>
                <p><strong>Solicitado:</strong> ${quote.date}</p>
                <p><strong>Origen:</strong> ${quote.origin || 'No especificado'}</p>
                <p><strong>Destino:</strong> ${quote.destination || 'No especificado'} (${quote.distance || 'N/A'} km)</p>
                <p><strong>Fecha del servicio:</strong> ${quote.serviceDate || 'No especificada'}</p>
                ${packagesHTML}
                ${itemsHTML}
            `;

            quotesListEl.appendChild(quoteCard);
        });
    }
    modalOverlay.classList.remove('hidden');
}