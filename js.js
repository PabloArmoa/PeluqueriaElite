 document.addEventListener('DOMContentLoaded', () => {
            // --- Elementos HTML ---
            const toggleAdminViewBtn = document.getElementById('toggleAdminViewBtn');
            const userView = document.getElementById('userView');
            const adminView = document.getElementById('adminView');
            const adminLoginArea = document.getElementById('adminLoginArea');
            const adminPasswordInput = document.getElementById('adminPasswordInput');
            const adminLoginBtn = document.getElementById('adminLoginBtn');
            const adminLoginMessage = document.getElementById('adminLoginMessage');

            const serviceCheckboxes = document.querySelectorAll('#serviceList input[type="checkbox"]');
            const calendarGrid = document.getElementById('calendarGrid');
            const currentMonthYear = document.getElementById('currentMonthYear');
            const prevMonthBtn = document.getElementById('prevMonth');
            const nextMonthBtn = document.getElementById('nextMonth');
            const timeSlotsContainer = document.getElementById('timeSlots');
            const noTimeSlotsMessage = document.getElementById('noTimeSlotsMessage');

            const userNameInput = document.getElementById('userNameInput');
            const userLastNameInput = document.getElementById('userLastNameInput');

            const bottomBar = document.getElementById('bottomBar');
            const totalPriceElement = document.getElementById('totalPrice');
            const selectedSummaryText = document.getElementById('selectedSummaryText');
            const confirmBookingBtn = document.getElementById('confirmBookingBtn');

            const paymentModalOverlay = document.getElementById('paymentModalOverlay');
            const closeModalBtn = document.getElementById('closeModalBtn');
            const modalClientName = document.getElementById('modalClientName');
            const modalServiceSummary = document.getElementById('modalServiceSummary');
            const modalDateTimeSummary = document.getElementById('modalDateTimeSummary');
            const modalTotalPrice = document.getElementById('modalTotalPrice');
            const simulatePaymentBtn = document.getElementById('simulatePaymentBtn');
            const paymentStatusArea = document.getElementById('paymentStatusArea');
            const paymentSpinner = document.getElementById('paymentSpinner');
            const paymentMessage = document.getElementById('paymentMessage');
            const bookingIdDisplay = document.getElementById('bookingIdDisplay');
            const adminBookingsTableBody = document.getElementById('adminBookingsTableBody');

            // --- Estado Global ---
            let selectedServices = [];
            let currentTotal = 0;
            let currentDisplayDate = new Date();
            let selectedDate = null;
            let selectedTime = null;
            let userName = '';
            let userLastName = '';
            let mockBookings = []; // Almacena las reservas simuladas

            const ADMIN_PASSWORD = "admin123"; // Contraseña de administrador simulada

            // --- Datos Dummy (reemplazar con datos de backend reales) ---
            const servicePrices = {
                'corte-masculino': { name: 'Corte Masculino', price: 2500 },
                'arreglo-barba': { name: 'Arreglo de Barba', price: 1500 },
                'corte-barba': { name: 'Corte + Barba', price: 3500 },
                'corte-ninos': { name: 'Corte para Niños', price: 2000 },
                'lavado': { name: 'Lavado de Cabello', price: 1000 },
                'coloracion': { name: 'Coloración', price: 4000 }
            };

            const availableTimes = {
                '2025-06-15': ['10:00', '11:00', '12:00', '15:00'],
                '2025-06-16': ['09:00', '10:00', '11:00', '13:00', '14:00', '16:00'],
                '2025-06-17': ['10:00', '11:00', '12:00'],
                '2025-06-18': ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
                '2025-06-19': ['10:00', '11:00', '12:00', '13:00'],
                '2025-06-20': ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
                '2025-06-21': ['10:00', '11:00', '12:00', '15:00'],
                '2025-06-22': ['10:00', '11:00'],
                '2025-06-23': ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
                '2025-06-24': ['10:00', '11:00', '12:00', '13:00'],
                '2025-06-25': ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
                '2025-06-26': ['10:00', '11:00', '12:00', '15:00'],
                '2025-06-27': ['09:00', '10:00', '11:00', '13:00', '14:00', '16:00'],
                '2025-06-28': ['10:00', '11:00', '12:00'],
                '2025-06-29': ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
                '2025-06-30': ['10:00', '11:00', '12:00', '13:00'],
            };

            // --- Funciones de Actualización de UI de Usuario ---
            function updateServiceSelection() {
                selectedServices = [];
                currentTotal = 0;
                serviceCheckboxes.forEach(checkbox => {
                    if (checkbox.checked) {
                        const serviceId = checkbox.dataset.serviceId;
                        const service = servicePrices[serviceId];
                        selectedServices.push(service);
                        currentTotal += service.price;
                    }
                });
                totalPriceElement.textContent = `$${currentTotal.toLocaleString('es-AR')}`;
                updateBottomBar();
            }

            function renderCalendar() {
                calendarGrid.innerHTML = '';
                const year = currentDisplayDate.getFullYear();
                const month = currentDisplayDate.getMonth();
                const firstDayOfMonth = new Date(year, month, 1);
                const lastDayOfMonth = new Date(year, month + 1, 0);
                const daysInMonth = lastDayOfMonth.getDate();
                const firstDayOfWeek = firstDayOfMonth.getDay();

                currentMonthYear.textContent = firstDayOfMonth.toLocaleString('es-ES', { month: 'long', year: 'numeric' });

                for (let i = 0; i < firstDayOfWeek; i++) {
                    const emptyDiv = document.createElement('div');
                    emptyDiv.classList.add('calendar-day', 'empty');
                    calendarGrid.appendChild(emptyDiv);
                }

                const today = new Date();
                today.setHours(0, 0, 0, 0);

                for (let day = 1; day <= daysInMonth; day++) {
                    const dayDiv = document.createElement('div');
                    dayDiv.classList.add('calendar-day');
                    dayDiv.textContent = day;
                    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    dayDiv.dataset.date = dateString;

                    const currentDayDate = new Date(year, month, day);
                    if (currentDayDate < today) {
                        dayDiv.classList.add('disabled');
                    }

                    if (selectedDate && dayDiv.dataset.date === selectedDate.toISOString().split('T')[0]) {
                        dayDiv.classList.add('selected');
                    }

                    dayDiv.addEventListener('click', () => {
                        if (dayDiv.classList.contains('disabled')) return;

                        const prevSelected = calendarGrid.querySelector('.calendar-day.selected');
                        if (prevSelected) {
                            prevSelected.classList.remove('selected');
                        }
                        dayDiv.classList.add('selected');
                        selectedDate = new Date(year, month, day);
                        selectedTime = null;

                        renderTimeSlots(selectedDate);
                        updateBottomBar();
                    });
                    calendarGrid.appendChild(dayDiv);
                }
            }

            function renderTimeSlots(date) {
                timeSlotsContainer.innerHTML = '';
                noTimeSlotsMessage.classList.add('hidden');
                const dateString = date.toISOString().split('T')[0];
                const slots = availableTimes[dateString];

                if (!slots || slots.length === 0) {
                    timeSlotsContainer.innerHTML = '<p class="text-gray-500">No hay horarios disponibles para esta fecha.</p>';
                    return;
                }

                slots.forEach(slot => {
                    const button = document.createElement('button');
                    button.classList.add('time-slot-button');
                    button.textContent = slot;
                    button.dataset.time = slot;

                    if (selectedTime === slot) {
                        button.classList.add('selected');
                    }

                    button.addEventListener('click', () => {
                        const prevSelected = timeSlotsContainer.querySelector('.time-slot-button.selected');
                        if (prevSelected) {
                            prevSelected.classList.remove('selected');
                        }
                        button.classList.add('selected');
                        selectedTime = slot;
                        updateBottomBar();
                    });
                    timeSlotsContainer.appendChild(button);
                });
            }

            function updateUserDetails() {
                userName = userNameInput.value.trim();
                userLastName = userLastNameInput.value.trim();
                updateBottomBar();
            }

            function updateBottomBar() {
                if (selectedServices.length > 0 && selectedDate && selectedTime && userName && userLastName) {
                    selectedSummaryText.textContent = `${selectedServices.length} servicios, ${selectedDate.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })} a las ${selectedTime}`;
                    confirmBookingBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                    confirmBookingBtn.disabled = false;
                    bottomBar.classList.add('show');
                } else {
                    let text = [];
                    if (selectedServices.length === 0) text.push('servicios');
                    if (!selectedDate) text.push('fecha');
                    if (!selectedTime) text.push('hora');
                    if (!userName || !userLastName) text.push('tus datos');
                    selectedSummaryText.textContent = `Selecciona ${text.join(', ')}.`;
                    confirmBookingBtn.classList.add('opacity-50', 'cursor-not-allowed');
                    confirmBookingBtn.disabled = true;
                    bottomBar.classList.add('show');
                }
            }

            // --- Funciones del Modal de Pago ---
            function openPaymentModal() {
                modalClientName.textContent = `${userName} ${userLastName}`;
                modalServiceSummary.innerHTML = '';
                selectedServices.forEach(service => {
                    const li = document.createElement('li');
                    li.textContent = `${service.name} ($${service.price.toLocaleString('es-AR')})`;
                    modalServiceSummary.appendChild(li);
                });

                modalDateTimeSummary.textContent = `${selectedDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} a las ${selectedTime}`;
                modalTotalPrice.textContent = `$${currentTotal.toLocaleString('es-AR')}`;

                paymentStatusArea.classList.add('hidden');
                paymentSpinner.classList.add('hidden');
                paymentMessage.textContent = '';
                bookingIdDisplay.classList.add('hidden');
                simulatePaymentBtn.disabled = false;
                simulatePaymentBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                simulatePaymentBtn.textContent = 'Simular Pago con Mercado Pago';

                paymentModalOverlay.classList.add('show');
            }

            function simulatePayment() {
                simulatePaymentBtn.disabled = true;
                simulatePaymentBtn.classList.add('opacity-50', 'cursor-not-allowed');
                simulatePaymentBtn.textContent = 'Procesando pago...';
                paymentStatusArea.classList.remove('hidden');
                paymentSpinner.classList.remove('hidden');
                paymentMessage.textContent = 'Conectando con Mercado Pago...';
                bookingIdDisplay.classList.add('hidden');

                setTimeout(() => {
                    paymentSpinner.classList.add('hidden');
                    const isSuccess = Math.random() > 0.2;

                    if (isSuccess) {
                        const bookingId = 'MP-' + Math.random().toString(36).substring(2, 11).toUpperCase();
                        paymentMessage.textContent = '¡Pago Exitoso y Turno Confirmado!';
                        paymentMessage.classList.remove('text-red-600');
                        paymentMessage.classList.add('text-green-600');
                        bookingIdDisplay.textContent = `ID de Reserva: ${bookingId}`;
                        bookingIdDisplay.classList.remove('hidden');

                        mockBookings.push({
                            id: bookingId,
                            clientName: userName,
                            clientLastName: userLastName,
                            services: selectedServices.map(s => s.name).join(', '),
                            date: selectedDate.toLocaleDateString('es-AR'),
                            time: selectedTime,
                            total: currentTotal,
                            paymentStatus: 'Pagado'
                        });
                        renderAdminBookings();
                    } else {
                        paymentMessage.textContent = 'Error en el pago. Intenta de nuevo.';
                        paymentMessage.classList.remove('text-green-600');
                        paymentMessage.classList.add('text-red-600');
                        bookingIdDisplay.classList.add('hidden');
                        simulatePaymentBtn.disabled = false;
                        simulatePaymentBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                        simulatePaymentBtn.textContent = 'Reintentar Pago';
                    }
                }, 2000);
            }

            // --- Funciones del Panel de Administración ---
            function renderAdminBookings() {
                adminBookingsTableBody.innerHTML = '';
                if (mockBookings.length === 0) {
                    adminBookingsTableBody.innerHTML = `
                        <tr>
                            <td colspan="7" class="px-4 py-4 text-center text-gray-500">No hay reservas para mostrar. Realiza algunas simulaciones de pago.</td>
                        </tr>
                    `;
                    return;
                }

                mockBookings.forEach(booking => {
                    const row = adminBookingsTableBody.insertRow();
                    row.classList.add('hover:bg-gray-50');
                    row.innerHTML = `
                        <td class="px-4 py-4 text-sm font-medium text-gray-900">${booking.id}</td>
                        <td class="px-4 py-4 text-sm text-gray-600">${booking.clientName} ${booking.clientLastName}</td>
                        <td class="px-4 py-4 text-sm text-gray-600">${booking.services}</td>
                        <td class="px-4 py-4 text-sm text-gray-600">${booking.date}</td>
                        <td class="px-4 py-4 text-sm text-gray-600">${booking.time}</td>
                        <td class="px-4 py-4 text-sm text-gray-600">$${booking.total.toLocaleString('es-AR')}</td>
                        <td class="px-4 py-4 text-sm">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${booking.paymentStatus === 'Pagado' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                                ${booking.paymentStatus}
                            </span>
                        </td>
                    `;
                });
            }

            function toggleAdminView() {
                if (userView.classList.contains('block')) { // Currently in user view, switch to admin login
                    userView.classList.remove('block');
                    userView.classList.add('hidden');
                    bottomBar.classList.remove('show');
                    adminLoginArea.classList.add('show'); // Show password input
                    adminPasswordInput.value = ''; // Clear previous input
                    adminLoginMessage.classList.add('hidden'); // Hide any previous error
                    toggleAdminViewBtn.textContent = 'Volver a Vista de Usuario';
                } else if (adminView.classList.contains('show')) { // Currently in admin view, switch to user view
                    adminView.classList.remove('show');
                    adminView.classList.add('hidden');
                    userView.classList.remove('hidden');
                    userView.classList.add('block');
                    adminLoginArea.classList.remove('show');
                    toggleAdminViewBtn.textContent = 'Cambiar a Vista de Administrador';
                    updateBottomBar();
                } else if (adminLoginArea.classList.contains('show')) { // Currently in login prompt, switch back to user view
                    adminLoginArea.classList.remove('show');
                    userView.classList.remove('hidden');
                    userView.classList.add('block');
                    toggleAdminViewBtn.textContent = 'Cambiar a Vista de Administrador';
                    updateBottomBar();
                }
            }

            function handleAdminLogin() {
                const enteredPassword = adminPasswordInput.value;
                if (enteredPassword === ADMIN_PASSWORD) {
                    adminLoginArea.classList.remove('show');
                    adminView.classList.add('show');
                    adminLoginMessage.classList.add('hidden');
                    renderAdminBookings();
                } else {
                    adminLoginMessage.classList.remove('hidden');
                }
            }


            // --- Event Listeners ---
            toggleAdminViewBtn.addEventListener('click', toggleAdminView);
            adminLoginBtn.addEventListener('click', handleAdminLogin);
            adminPasswordInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    handleAdminLogin();
                }
            });

            serviceCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', updateServiceSelection);
            });
            prevMonthBtn.addEventListener('click', () => {
                currentDisplayDate.setMonth(currentDisplayDate.getMonth() - 1);
                renderCalendar();
            });
            nextMonthBtn.addEventListener('click', () => {
                currentDisplayDate.setMonth(currentDisplayDate.getMonth() + 1);
                renderCalendar();
            });
            userNameInput.addEventListener('input', updateUserDetails);
            userLastNameInput.addEventListener('input', updateUserDetails);

            confirmBookingBtn.addEventListener('click', openPaymentModal);
            closeModalBtn.addEventListener('click', () => {
                paymentModalOverlay.classList.remove('show');
            });
            simulatePaymentBtn.addEventListener('click', simulatePayment);

            // --- Inicialización ---
            renderCalendar();
            updateServiceSelection(); // Initial update for services and total
            updateUserDetails(); // Initial update for user details and bottom bar
            renderAdminBookings(); // Initial render for admin panel (will show "No hay reservas")
        });