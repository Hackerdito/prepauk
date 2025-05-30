<script>
    document.getElementById('nameForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío del formulario para propósitos de prueba
        
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        
        console.log('Nombre:', firstName);
        console.log('Apellido:', lastName);

        // Aquí puedes agregar más lógica, como enviar los datos a un servidor
    });
</script>