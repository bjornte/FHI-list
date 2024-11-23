// Check browser's color scheme preference
const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
const gridTheme = isDarkMode ? "ag-theme-quartz-dark" : "ag-theme-quartz";
document.getElementById("myGrid").className = gridTheme;

// Load the CSV file and parse it
fetch('whocc.csv')
  .then(response => response.text())
  .then(csvText => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const columnDefsAuto = Object.keys(results.data[0]).map(key => ({
          field: key,
          cellRenderer: key === "link-href" ? linkCellRenderer : undefined,
        }));

        columnDefs = [
          { field: "atcCode", headerName: "ATC code", width: 160 },
          { field: "name", flex: 1, minWidth: 160 },
          { field: "ddd", headerName: "DDD" },
          { field: "unit" },
          { field: "adminRoute", headerName: "Route of administration" },
          { field: "note", flex: 1, minWidth: 160 },
          { field: "link-href", cellRenderer: linkCellRenderer, headerName: "Link" },
        ];

        const rowData = results.data;

        const gridOptions = {
          columnDefs: columnDefs,
          rowData: rowData,
          defaultColDef: {
            sortable: true,
            filter: true,
            resizable: true,
            width: 100
          },
        };

        const eGridDiv = document.getElementById("myGrid");
        const gridApi = agGrid.createGrid(eGridDiv, gridOptions);
        // console.log(columnDefs);
      },
    });
  });

// Custom cell renderer for links
function linkCellRenderer(params) {
  if (!params.value) return '';
  return `<a href="${params.value}" target="_blank">NIPH</a>`;
}
