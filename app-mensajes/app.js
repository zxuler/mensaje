document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('form-login');
    const formMessage = document.getElementById('form-message');
    const usernameInput = document.getElementById('username');
    const messageInput = document.getElementById('message-input');
    const messagesList = document.getElementById('messages-list');
    const loginContainer = document.getElementById('login-container');
    const chatContainer = document.getElementById('chat-container');
    const logoutBtn = document.getElementById('logout-btn');

    // Función para cargar los mensajes desde localStorage
    function cargarMensajes() {
        const mensajesGuardados = JSON.parse(localStorage.getItem('mensajes')) || [];

        // Limpiar la lista de mensajes antes de agregar los nuevos
        messagesList.innerHTML = '';

        // Mostrar los mensajes en la interfaz
        mensajesGuardados.forEach(mensaje => {
            const divMensaje = document.createElement('div');
            divMensaje.classList.add('message');
            divMensaje.classList.add(mensaje.tipo); // 'sent' o 'received'
            divMensaje.textContent = `${mensaje.usuario}: ${mensaje.texto}`;
            messagesList.appendChild(divMensaje);
        });

        // Desplazar hacia abajo para mostrar el último mensaje
        messagesList.scrollTop = messagesList.scrollHeight;
    }

    // Función para guardar un nuevo mensaje en localStorage
    function guardarMensaje(usuario, texto, tipo) {
        const mensajesGuardados = JSON.parse(localStorage.getItem('mensajes')) || [];

        // Crear el nuevo mensaje
        const nuevoMensaje = {
            usuario: usuario,
            texto: texto,
            tipo: tipo // 'sent' o 'received'
        };

        // Agregar el nuevo mensaje al arreglo
        mensajesGuardados.push(nuevoMensaje);

        // Guardar los mensajes en localStorage
        localStorage.setItem('mensajes', JSON.stringify(mensajesGuardados));
    }

    // Manejo del registro de usuario
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = usernameInput.value.trim();
        if (username) {
            // Guardar el nombre de usuario en localStorage
            localStorage.setItem('usuario', username);

            // Mostrar la pantalla del chat
            loginContainer.style.display = 'none';
            chatContainer.style.display = 'block';

            // Cargar los mensajes guardados
            cargarMensajes();
        }
    });

    // Manejo del envío de mensajes
    formMessage.addEventListener('submit', (e) => {
        e.preventDefault();

        const textoMensaje = messageInput.value.trim();
        const usuario = localStorage.getItem('usuario');

        if (textoMensaje && usuario) {
            // Guardar el mensaje como "sent"
            guardarMensaje(usuario, textoMensaje, 'sent');
            
            // Limpiar el campo de entrada
            messageInput.value = '';

            // Cargar los mensajes de nuevo
            cargarMensajes();
        }
    });

    // Función para cerrar sesión
    logoutBtn.addEventListener('click', () => {
        // Limpiar localStorage y redirigir al inicio
        localStorage.removeItem('usuario');
        localStorage.removeItem('mensajes');

        loginContainer.style.display = 'block';
        chatContainer.style.display = 'none';
    });

    // Verificar si ya hay un usuario logueado
    const usuarioLogueado = localStorage.getItem('usuario');
    if (usuarioLogueado) {
        // Si hay un usuario, ocultar login y mostrar el chat
        loginContainer.style.display = 'none';
        chatContainer.style.display = 'block';

        // Cargar los mensajes guardados
        cargarMensajes();
    }
});
