document.addEventListener("DOMContentLoaded", function () {
  const tableSelector = document.getElementById("tableSelector");
  const tableRecords = document.getElementById("tableRecords");

  function loadTables() {
    fetch("http://127.0.0.1:8000/get_all_tables/")
      .then(response => response.json())
      .then(data => {
        data.tables.forEach(table => {
          const tableOption = document.createElement("option");
          tableOption.value = table;
          tableOption.textContent = table;
          tableSelector.appendChild(tableOption);
        });
      });
  }

  tableSelector.addEventListener("change", function () {
    const selectedTable = tableSelector.value;
    fetch(`http://127.0.0.1:8000/${selectedTable}/`)
      .then(response => response.json())
      .then(data => {
        tableRecords.innerHTML = ""; // Limpiar registros anteriores
        data.items.forEach(item => {
          const title = document.createElement("h2");
          title.textContent = item[0];
          const link = document.createElement("a");
          link.href = item[1];
          link.textContent = "Ver detalles";
          const image = document.createElement("img");
          image.src = item[2];
          image.alt = "Imagen del micrófono";
          
          const paragraph = document.createElement("p");
          paragraph.textContent = item[0]; // Aquí puedes agregar otras características

          // Agregar elementos al contenedor de registros
          tableRecords.appendChild(title);
          tableRecords.appendChild(link);
          tableRecords.appendChild(image);
          tableRecords.appendChild(paragraph);
        });
      })
      .catch(error => {
        console.error("Error al cargar los datos:", error);
        tableRecords.innerHTML = "Error al cargar los datos. Por favor, inténtalo de nuevo.";
      });
  });

  // Cargar las opciones del menú cuando se inicie la página
  loadTables();
});