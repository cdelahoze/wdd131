// Output the current year in the first paragraph
document.getElementById("currentyear").innerHTML =
        "&#169; " + new Date().getFullYear() + " Cristian Moisés De La Hoz Escorcia";

// Output the last modified date in the second paragraph
document.getElementById("lastModified").innerHTML = "Last Modified: " + document.lastModified;