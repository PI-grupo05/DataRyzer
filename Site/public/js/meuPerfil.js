window.onload = function () {
  document.getElementById("id_nome").value = sessionStorage.NOME_USUARIO || '';
  document.getElementById("id_email").value = sessionStorage.EMAIL_USUARIO || '';
  const telefone = sessionStorage.TELEFONE || '';
  document.getElementById("id_telefone").value = aplicarMascaraTelefone(telefone);
  };

  function aplicarMascaraTelefone(numero) {
  return numero.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  }





