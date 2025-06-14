document.addEventListener('DOMContentLoaded', function() {
            const userRadio = document.getElementById('usuario');
            const adminRadio = document.getElementById('master');
            const unidadeInput = document.getElementById('unidade_consumidora_input');

            function toggleUnidadeInput() {
                if (adminRadio.checked) {
                    unidadeInput.value = '';
                    unidadeInput.disabled = true; 
                } else if (userRadio.checked) {
                    unidadeInput.disabled = false; 
                }
            }
            unidadeInput.disabled = true;
            userRadio.addEventListener('change', toggleUnidadeInput);
            adminRadio.addEventListener('change', toggleUnidadeInput);
        });
