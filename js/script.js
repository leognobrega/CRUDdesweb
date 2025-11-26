$(document).ready(function () {

  function carregar() {
    let cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
    $("#lista").empty();

    cadastros.forEach((item, i) => {
      $("#lista").append(`
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong>${item.nome}</strong><br>
            <small>Data: ${item.data}</small><br>
            <small>Email: ${item.email}</small>
          </div>
          <div>
            <button class="btn btn-sm btn-warning editar" data-id="${i}">✏️</button>
            <button class="btn btn-sm btn-danger excluir" data-id="${i}">🗑️</button>
          </div>
        </li>
      `);
    });
  }

  $("#btnAdd").click(function () {
    let nome = $("#nome").val().trim();
    let data = $("#data").val();
    let email = $("#email").val();

    if (!nome || !data || !email) {
      alert("Preencha todos os campos!");
      return;
    }

    let cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
    cadastros.push({ nome, data, email });
    localStorage.setItem("cadastros", JSON.stringify(cadastros));

    $("#nome").val("");
    $("#data").val("");
    $("#email").val("");
    carregar();
  });

  $(document).on("click", ".excluir", function () {
    let id = $(this).data("id");
    let cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
    cadastros.splice(id, 1);
    localStorage.setItem("cadastros", JSON.stringify(cadastros));
    carregar();
  });

  $(document).on("click", ".editar", function () {
    let id = $(this).data("id");
    let cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
    let atual = cadastros[id];

    let novoNome = prompt("Editar nome:", atual.nome);
    let novaData = prompt("Editar data (AAAA-MM-DD):", atual.data);
    let novoEmail = prompt("Editar email:", atual.email);

    if (novoNome && novaData && novoEmail) {
      cadastros[id] = { nome: novoNome, data: novaData, email: novoEmail };
      localStorage.setItem("cadastros", JSON.stringify(cadastros));
      carregar();
    }
  });

  carregar();
});
