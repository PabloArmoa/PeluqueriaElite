<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reserva tu Turno - Peluquería</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <!-- Chosen Palette: Modern Grey-Blue Accent -->
    <!-- Application Structure Plan: The SPA is designed as a multi-stage booking process within a single page. It features two main interactive sections (Services and Date/Time) presented side-by-side on desktop, stacking on mobile. A floating "Resumen y Confirmar" button provides a persistent call to action, leading to a dynamic summary and a simulated payment modal. A new section for user contact details (name, last name) is added. The administrator panel is now password-protected, enhancing security by requiring a simple password input to toggle its visibility. This structure allows distinct user flows (client vs. admin) within a single page for simplicity, with enhanced data collection and access control. -->
    <!-- Visualization & Content Choices: 1. Report Info: Servicios y Precios. Goal: Inform/Organize. Viz/Method: Interactive list of services with checkboxes. Interaction: Checkbox toggles selection, updating total price. Justification: Intuitive for multiple selections. Library: HTML/Tailwind/Vanilla JS. 2. Report Info: Selección de Fecha y Hora. Goal: Organize/Filter. Viz/Method: Interactive calendar grid and time slot buttons. Interaction: Clicking date/time updates selection and summary. Justification: Standard, user-friendly booking method. Library: Vanilla JS. 3. Report Info: Datos del Usuario. Goal: Collect. Viz/Method: Text input fields. Interaction: User enters name/last name, enabling confirmation. Justification: Essential for identifying bookings. Library: HTML/Tailwind/Vanilla JS. 4. Report Info: Resumen del Turno. Goal: Inform/Confirm. Viz/Method: Dynamic text summary. Interaction: Updates in real-time as services/date/time are chosen. Justification: Provides immediate feedback to the user on their selections. Library: Vanilla JS. 5. Report Info: Confirmación y Pago. Goal: Inform/Action. Viz/Method: Modal dialog with final summary, simulated payment button, and status messages. Interaction: Click to "simulate" payment; displays success/error. Justification: Simulates the critical final step of a booking app. Library: Vanilla JS. 6. Report Info: Acceso al Administrador. Goal: Secure. Viz/Method: Password input field. Interaction: User enters password to unlock admin view. Justification: Basic security gate. Library: HTML/Tailwind/Vanilla JS. 7. Report Info: Reservas y Pagos del Administrador. Goal: Inform/Monitor. Viz/Method: Dynamic table of bookings. Interaction: Toggles visibility of the admin panel; displays booking details and payment status, including client names. Justification: Allows the administrator to see a summary of all simulated bookings with more client detail. Library: HTML/Tailwind/Vanilla JS. CONFIRMATION: NO SVG/Mermaid used. -->
    <!-- CONFIRMATION: NO SVG graphics used. NO Mermaid JS used. -->
     <link rel="stylesheet" href="css.css">
     <link rel="stylesheet" href="js.js">
</head>
<body class="text-gray-800">

    <div class="container mx-auto p-4 md:p-8">

        <header class="text-center mb-8">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900">Reserva tu Turno</h1>
            <p class="text-lg text-gray-600 mt-2">Peluquería "El Estilo"</p>
            <button id="toggleAdminViewBtn" class="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full transition-colors duration-300 text-sm">
                Cambiar a Vista de Administrador
            </button>

            <!-- Área de Inicio de Sesión de Administrador -->
            <div id="adminLoginArea" class="admin-login-area hidden flex-col md:flex-row items-center justify-center gap-3 mt-4 p-4 bg-white rounded-lg shadow">
                <input type="password" id="adminPasswordInput" placeholder="Contraseña de Administrador" class="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-auto">
                <button id="adminLoginBtn" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 w-full md:w-auto">
                    Acceder
                </button>
                <p id="adminLoginMessage" class="text-red-500 text-sm mt-2 md:mt-0 hidden">Contraseña incorrecta.</p>
            </div>
        </header>

        <!-- Contenido de Usuario (Booking Flow) -->
        <div id="userView" class="block">
            <main class="grid lg:grid-cols-2 gap-8 pb-24">
                <!-- Sección de Servicios -->
                <div class="card p-6 md:p-8">
                    <h2 class="text-2xl md:text-3xl font-bold mb-4">1. Elige tus servicios</h2>
                    <div id="serviceList" class="space-y-2">
                        <div class="service-item" >
                            <label class="flex items-center space-x-3 text-lg cursor-pointer">
                                <input type="checkbox" data-service-id="corte-masculino" data-price="2500">
                                <span>Corte Masculino</span>
                            </label>
                            <span class="font-semibold text-blue-600">$2.500</span>
                        </div>
                        <div class="service-item">
                            <label class="flex items-center space-x-3 text-lg cursor-pointer">
                                <input type="checkbox" data-service-id="arreglo-barba" data-price="1500">
                                <span>Arreglo de Barba</span>
                            </label>
                            <span class="font-semibold text-blue-600">$1.500</span>
                        </div>
                        <div class="service-item">
                            <label class="flex items-center space-x-3 text-lg cursor-pointer">
                                <input type="checkbox" data-service-id="corte-barba" data-price="3500">
                                <span>Corte + Barba</span>
                            </label>
                            <span class="font-semibold text-blue-600">$3.500</span>
                        </div>
                        <div class="service-item">
                            <label class="flex items-center space-x-3 text-lg cursor-pointer">
                                <input type="checkbox" data-service-id="corte-ninos" data-price="2000">
                                <span>Corte para Niños</span>
                            </label>
                            <span class="font-semibold text-blue-600">$2.000</span>
                        </div>
                        <div class="service-item">
                            <label class="flex items-center space-x-3 text-lg cursor-pointer">
                                <input type="checkbox" data-service-id="lavado" data-price="1000">
                                <span>Lavado de Cabello</span>
                            </label>
                            <span class="font-semibold text-blue-600">$1.000</span>
                        </div>
                        <div class="service-item">
                            <label class="flex items-center space-x-3 text-lg cursor-pointer">
                                <input type="checkbox" data-service-id="coloracion" data-price="4000">
                                <span>Coloración</span>
                            </label>
                            <span class="font-semibold text-blue-600">$4.000</span>
                        </div>
                    </div>
                </div>

                <!-- Sección de Fecha y Hora -->
                <div class="card p-6 md:p-8">
                    <h2 class="text-2xl md:text-3xl font-bold mb-4">2. Elige Fecha y Hora</h2>
                    <div class="flex justify-between items-center mb-4">
                        <button id="prevMonth" class="p-2 rounded-full hover:bg-gray-100 transition-colors">
                            <span class="text-2xl">←</span>
                        </button>
                        <span id="currentMonthYear" class="text-xl font-semibold text-gray-700"></span>
                        <button id="nextMonth" class="p-2 rounded-full hover:bg-gray-100 transition-colors">
                            <span class="text-2xl">→</span>
                        </button>
                    </div>
                    <div class="grid grid-cols-7 text-center font-medium text-sm text-gray-500 mb-2">
                        <span>Dom</span>
                        <span>Lun</span>
                        <span>Mar</span>
                        <span>Mié</span>
                        <span>Jue</span>
                        <span>Vie</span>
                        <span>Sáb</span>
                    </div>
                    <div id="calendarGrid" class="grid grid-cols-7 gap-1">
                    </div>

                    <h3 class="text-xl md:text-2xl font-bold mt-8 mb-4">Horarios Disponibles</h3>
                    <div id="timeSlots" class="flex flex-wrap gap-3">
                        <p class="text-gray-500" id="noTimeSlotsMessage">Selecciona una fecha para ver los horarios disponibles.</p>
                    </div>
                </div>

                <!-- Sección de Datos del Cliente -->
                <div class="lg:col-span-2 card p-6 md:p-8">
                    <h2 class="text-2xl md:text-3xl font-bold mb-4">3. Tus Datos</h2>
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <label for="userNameInput" class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                            <input type="text" id="userNameInput" placeholder="Tu Nombre" class="p-3 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500">
                        </div>
                        <div>
                            <label for="userLastNameInput" class="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                            <input type="text" id="userLastNameInput" placeholder="Tu Apellido" class="p-3 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500">
                        </div>
                    </div>
                </div>
            </main>

            <!-- Barra Inferior de Resumen y Confirmación -->
            <div id="bottomBar" class="fixed-bottom-bar flex items-center justify-between p-4 md:px-8">
                <div class="flex flex-col md:flex-row md:items-center">
                    <div class="text-lg font-bold text-gray-900 md:mr-4">Total: <span id="totalPrice">$0</span></div>
                    <div class="text-sm text-gray-600" id="selectedSummaryText">
                        Selecciona servicios, fecha, hora y tus datos.
                    </div>
                </div>
                <button id="confirmBookingBtn" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 opacity-50 cursor-not-allowed" disabled>
                    Confirmar y Pagar
                </button>
            </div>
        </div>

        <!-- Panel de Administración -->
        <div id="adminView" class="admin-panel hidden bg-gray-50 p-6 md:p-8 rounded-lg shadow-inner">
            <h2 class="text-3xl font-bold mb-6 text-gray-900">Panel de Administración: Reservas</h2>
            <p class="text-gray-600 mb-6">Aquí puedes ver todas las reservas simuladas y su estado de pago.</p>

            <div id="adminBookingsList" class="overflow-x-auto">
                <table class="min-w-full bg-white rounded-lg shadow overflow-hidden">
                    <thead class="bg-gray-100 border-b">
                        <tr>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Reserva</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Servicios</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado Pago</th>
                        </tr>
                    </thead>
                    <tbody id="adminBookingsTableBody" class="divide-y divide-gray-200">
                        <!-- Reservas se renderizarán aquí -->
                        <tr>
                            <td colspan="7" class="px-4 py-4 text-center text-gray-500">No hay reservas para mostrar. Realiza algunas simulaciones de pago.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>

    <!-- Modal de Confirmación y Pago -->
    <div id="paymentModalOverlay" class="modal-overlay">
        <div class="modal-content">
            <h2 class="text-2xl font-bold mb-4">Confirmar Turno y Pagar</h2>
            <div class="space-y-3 mb-6">
                <p class="text-lg font-semibold">Cliente:</p>
                <p id="modalClientName" class="text-gray-700"></p>
                <p class="text-lg font-semibold">Servicios Seleccionados:</p>
                <ul id="modalServiceSummary" class="list-disc list-inside text-gray-700"></ul>
                <p class="text-lg font-semibold mt-4">Fecha y Hora:</p>
                <p id="modalDateTimeSummary" class="text-gray-700"></p>
                <div class="text-xl font-bold mt-6 flex justify-between">
                    <span>Total a Pagar:</span>
                    <span id="modalTotalPrice"></span>
                </div>
            </div>
            <div id="paymentStatusArea" class="text-center mb-4 hidden">
                <div id="paymentSpinner" class="spinner mx-auto mb-2 hidden"></div>
                <p id="paymentMessage" class="text-lg font-medium"></p>
                <p id="bookingIdDisplay" class="text-sm text-gray-500 mt-1 hidden"></p>
            </div>
            <div class="flex justify-end gap-3">
                <button id="closeModalBtn" class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full transition-colors duration-300">
                    Cerrar
                </button>
                <button id="simulatePaymentBtn" class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
                    Simular Pago con Mercado Pago
                </button>
            </div>
        </div>
    </div>
</body>
</html>
