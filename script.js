document.getElementById("uploadForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const formData = new FormData(this);

  fetch("/upload", {
    method: "POST",
    body: formData
  })
  .then(res => {
    document.getElementById("uploadStatus").innerText = "✅ Upload successful!";
  })
  .catch(err => {
    document.getElementById("uploadStatus").innerText = "❌ Upload failed.";
  });
});

function getIcon(filename) {
  if (filename.endsWith(".pdf")) return "<i class='fas fa-file-pdf'></i>";
  if (filename.endsWith(".docx")) return "<i class='fas fa-file-word'></i>";
  return "<i class='fas fa-file'></i>";
}

function renderTable(data) {
  const tbody = document.querySelector("#fileTable tbody");
  tbody.innerHTML = "";
  data.forEach(file => {
    const previewIcon = file.filename.endsWith(".pdf") || file.filename.endsWith(".docx")
      ? `<a href="/${file.subject}/${file.filename}" target="_blank">👁️ Preview</a>`
      : "—";

    const row = document.createElement("tr");
    row.setAttribute("data-subject", file.subject);
    row.setAttribute("data-type", file.filename.split('.').pop());

    row.innerHTML = `
      <td>${getIcon(file.filename)}</td>
      <td><a href="/${file.subject}/${file.filename}" target="_blank">${file.filename}</a></td>
      <td>${file.subject}</td>
      <td>${file.uploader}</
