function filterProducts() {
    let input = document.getElementsByTagName("input");
    let filter = input[0].value.toLowerCase();
    let table = document.getElementsByTagName("table")[0];
    let tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByClassName("productName")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
                if (txtValue.toLowerCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
            tr[i].style.display = "none";
            }
        } 
    }
}
