document.addEventListener('DOMContentLoaded', () => {
    const budgetForm = document.getElementById('budgetForm');
    const bulkItemsContainer = document.getElementById('bulkItemsContainer');
    const addBulkBtn = document.getElementById('addBulkBtn');
    const estimatedPriceSpan = document.getElementById('estimatedPrice');
    const enableBulkCheckbox = document.getElementById('enableBulk');
    const enableItemsCheckbox = document.getElementById('enableItems');
    const bulkOptionDiv = document.getElementById('bulkOption');
    const itemOptionDiv = document.getElementById('itemOption');
    const itemSelectionDiv = document.getElementById('itemSelection');

    let bulkCounter = 1;

    // --- Lógica para añadir bultos ---
    addBulkBtn.addEventListener('click', () => {
        bulkCounter++;
        const newBulkItem = document.createElement('div');
        newBulkItem.classList.add('bulk-item');
        newBulkItem.innerHTML = `
            <h5>Bulto #${bulkCounter}</h5>
            <div class="form-row">
                <div class="form-group">
                    <label for="bulkType${bulkCounter}">Tipo:</label>
                    <select id="bulkType${bulkCounter}" name="bulkType[]">
                        <option value="caja_pequena">Caja Pequeña</option>
                        <option value="caja_mediana">Caja Mediana</option>
                        <option value="caja_grande">Caja Grande</option>
                        <option value="maleta">Maleta</option>
                        <option value="paquete_irregular">Paquete Irregular</option>
                    </select>
                </div>
                <div class="form-group dimensions">
                    <label>Medidas (cm):</label>
                    <input type="number" name="bulkLength[]" placeholder="Largo" min="1" required>
                    <input type="number" name="bulkWidth[]" placeholder="Ancho" min="1" required>
                    <input type="number" name="bulkHeight[]" placeholder="Alto" min="1" required>
                </div>
                <div class="form-group">
                    <label>Peso (kg):</label>
                    <input type="number" name="bulkWeight[]" placeholder="Peso" min="0.1" step="0.1" required>
                </div>
                <div class="form-group checkbox-group">
                    <input type="checkbox" id="bulkPacking${bulkCounter}" name="bulkPacking[]">
                    <label for="bulkPacking${bulkCounter}">Embalaje Empresa</label>
                </div>
            </div>
        `;
        bulkItemsContainer.appendChild(newBulkItem);
        // Volver a calcular al añadir nuevo bulto
        updateEstimatedPrice();
    });

    // --- Lógica para mostrar/ocultar secciones de presupuesto ---
    enableBulkCheckbox.addEventListener('change', () => {
        if (enableBulkCheckbox.checked) {
            bulkOptionDiv.querySelector('.bulk-item').style.display = 'block'; // Asegura que el primer bulto sea visible
            bulkItemsContainer.querySelectorAll('.bulk-item').forEach(item => item.style.display = 'block');
            addBulkBtn.style.display = 'block';
        } else {
            bulkItemsContainer.querySelectorAll('.bulk-item').forEach(item => item.style.display = 'none');
            addBulkBtn.style.display = 'none';
        }
        updateEstimatedPrice();
    });

    enableItemsCheckbox.addEventListener('change', () => {
        if (enableItemsCheckbox.checked) {
            itemSelectionDiv.style.display = 'block';
        } else {
            itemSelectionDiv.style.display = 'none';
        }
        updateEstimatedPrice();
    });

    // Inicializar estado de las secciones al cargar la página
    if (!enableBulkCheckbox.checked) {
        bulkItemsContainer.querySelectorAll('.bulk-item').forEach(item => item.style.display = 'none');
        addBulkBtn.style.display = 'none';
    }
    if (!enableItemsCheckbox.checked) {
        itemSelectionDiv.style.display = 'none';
    }

    // --- Lógica de cálculo de presupuesto (simplificada) ---
    function updateEstimatedPrice() {
        let totalPrice = 0;
        const basePrice = 50; // Tarifa base del servicio
        const pricePerKm = 0.5; // Precio por km (ejemplo)
        const packingCostPerItem = 15; // Costo por embalaje de ítem o bulto
        const boxSizePriceFactor = 0.00005; // Factor para calcular por volumen
        const itemSpecificPrices = { // Precios base por ítem (ejemplos)
            'office_desk': 30, 'office_chair': 10, 'filing_cabinet': 25,
            'office_shelf': 20, 'computer_screen': 15, 'printer': 10,
            'document_box': 5, 'bed': 40, 'nightstand': 8, 'dresser': 25,
            'sofa': 50, 'dining_table': 35, 'dining_chair': 10,
            'fridge': 60, 'washing_machine': 50, 'tv': 20, 'personal_box': 8,
            'office_other': 20, 'home_other': 20 // Precio genérico para "otros"
        };


        // Simulación de distancia (en un entorno real, usarías una API de mapas)
        // Aquí se asume una distancia para el ejemplo
        const destinationInput = document.getElementById('destination').value.toLowerCase();
        let distance = 100; // Distancia por defecto
        if (destinationInput.includes('barcelona')) distance = 600;
        else if (destinationInput.includes('sevilla')) distance = 530;
        else if (destinationInput.includes('valencia')) distance = 350;
        // Puedes añadir más ciudades y distancias

        totalPrice += basePrice + (distance * pricePerKm);

        // Calcular por bultos si la opción está activada
        if (enableBulkCheckbox.checked) {
            const bulkItems = bulkItemsContainer.querySelectorAll('.bulk-item');
            bulkItems.forEach(item => {
                const length = parseFloat(item.querySelector('input[name="bulkLength[]"]').value) || 0;
                const width = parseFloat(item.querySelector('input[name="bulkWidth[]"]').value) || 0;
                const height = parseFloat(item.querySelector('input[name="bulkHeight[]"]').value) || 0;
                const weight = parseFloat(item.querySelector('input[name="bulkWeight[]"]').value) || 0;
                const needsPacking = item.querySelector('input[name="bulkPacking[]"]').checked;

                // Cálculo básico: volumen * factor + peso * factor
                const volume = (length * width * height);
                let bulkPrice = (volume * boxSizePriceFactor) + (weight * 0.5); // 0.5€ por kg
                if (bulkPrice < 10) bulkPrice = 10; // Precio mínimo por bulto

                if (needsPacking) {
                    bulkPrice += packingCostPerItem;
                }
                totalPrice += bulkPrice;
            });
        }

        // Calcular por ítems si la opción está activada
        if (enableItemsCheckbox.checked) {
            const selectedItems = document.querySelectorAll('#itemSelection input[name="item[]"]:checked');
            selectedItems.forEach(itemCheckbox => {
                const itemId = itemCheckbox.value;
                let itemPrice = itemSpecificPrices[itemId] || 0; // Obtener precio del diccionario

                // Comprobar si necesita embalaje
                const packingCheckboxId = itemId + '_packing';
                const packingCheckbox = document.getElementById(packingCheckboxId);
                if (packingCheckbox && packingCheckbox.checked) {
                    itemPrice += packingCostPerItem;
                }
                totalPrice += itemPrice;
            });
        }

        estimatedPriceSpan.textContent = `${totalPrice.toFixed(2)} €`;
    }

    // --- Event Listeners para actualizar el precio al cambiar inputs ---
    budgetForm.addEventListener('input', updateEstimatedPrice); // Escucha cambios en todos los inputs del formulario

    // También al cargar la página por primera vez
    updateEstimatedPrice();


    // --- Lógica de envío del formulario ---
    budgetForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita el envío tradicional del formulario

        // Aquí construirías el objeto o string con los datos del formulario
        const formData = new FormData(budgetForm);
        const data = {};
        formData.forEach((value, key) => {
            // Manejar los arrays de bultos y ítems de forma específica
            if (key.endsWith('[]')) {
                const cleanKey = key.slice(0, -2); // Eliminar '[]'
                if (!data[cleanKey]) {
                    data[cleanKey] = [];
                }
                data[cleanKey].push(value);
            } else if (key.startsWith('item_packing')) {
                // Manejar los checkboxes de embalaje de ítems por separado
                const itemId = value; // El valor del checkbox de embalaje es el ID del ítem
                if (!data.itemPacking) {
                    data.itemPacking = [];
                }
                data.itemPacking.push(itemId);
            }
             else {
                data[key] = value;
            }
        });

        // Para los bultos: consolidar la información de cada bulto
        const bulkData = [];
        const bulkTypes = data.bulkType || [];
        const bulkLengths = data.bulkLength || [];
        const bulkWidths = data.bulkWidth || [];
        const bulkHeights = data.bulkHeight || [];
        const bulkWeights = data.bulkWeight || [];
        const bulkPackings = data.bulkPacking || [];

        for (let i = 0; i < bulkTypes.length; i++) {
            if (bulkOptionDiv.querySelector(`.bulk-item:nth-child(${i + 1})`).style.display !== 'none') {
                bulkData.push({
                    type: bulkTypes[i],
                    length: bulkLengths[i],
                    width: bulkWidths[i],
                    height: bulkHeights[i],
                    weight: bulkWeights[i],
                    needsPacking: bulkPackings.includes('on') // 'on' es el valor por defecto para un checkbox marcado
                });
            }
        }
        data.bulks = bulkData;
        delete data.bulkType;
        delete data.bulkLength;
        delete data.bulkWidth;
        delete data.bulkHeight;
        delete data.bulkWeight;
        delete data.bulkPacking;


        // Para los ítems: listar solo los seleccionados y si llevan embalaje
        const selectedItemsData = [];
        document.querySelectorAll('#itemSelection input[name="item[]"]:checked').forEach(checkbox => {
            const itemId = checkbox.value;
            const packingCheckboxId = itemId + '_packing';
            const packingCheckbox = document.getElementById(packingCheckboxId);
            selectedItemsData.push({
                id: itemId,
                needsPacking: packingCheckbox ? packingCheckbox.checked : false
            });
        });
        data.selectedItems = selectedItemsData;
        delete data.item; // Eliminar la lista cruda de ítems
        delete data.item_packing; // Eliminar la lista cruda de checkboxes de embalaje

        // Añadir los campos de "Otros" si están marcados
        if (data.office_other === 'on' && data.office_other_desc) {
            data.selectedItems.push({ id: 'office_other', description: data.office_other_desc, needsPacking: document.getElementById('office_other_packing').checked });
        }
        if (data.home_other === 'on' && data.home_other_desc) {
            data.selectedItems.push({ id: 'home_other', description: data.home_other_desc, needsPacking: document.getElementById('home_other_packing').checked });
        }
        delete data.office_other;
        delete data.office_other_desc;
        delete data.home_other;
        delete data.home_other_desc;


        const finalEstimatedPrice = estimatedPriceSpan.textContent;
        data.estimatedPrice = finalEstimatedPrice;


        console.log('Datos del formulario a enviar:', data);
        alert(`Gracias por tu consulta. Tu presupuesto orientativo es: ${finalEstimatedPrice}. Nos pondremos en contacto contigo a la brevedad para confirmar los detalles.`);

        // En un entorno real, aquí harías una petición AJAX (fetch o XMLHttpRequest)
        // a un script en tu servidor (ej. PHP, Node.js) que enviaría este 'data'
        // por correo electrónico o lo guardaría en una base de datos.
        /*
        fetch('/api/send-budget-request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('¡Gracias! Tu solicitud ha sido enviada. Te contactaremos pronto.');
                budgetForm.reset(); // Opcional: resetear el formulario
                updateEstimatedPrice(); // Resetear el precio
            } else {
                alert('Hubo un error al enviar tu solicitud. Por favor, inténtalo de nuevo.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema de conexión. Por favor, inténtalo más tarde.');
        });
        */
    });
});