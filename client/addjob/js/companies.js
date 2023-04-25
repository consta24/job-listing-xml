const companiesList = document.getElementById("companies-list");
const companiesInput = document.getElementById("companies-input");
const addCompanyBtn = document.getElementById("add-company-btn");
const companiesInputHidden = document.getElementById("companies-input-hidden");

let companies = [];

addCompanyBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const company = companiesInput.value.trim();
  if (company !== "") {
    addCompany(company);
    companiesInput.value = "";
    companiesInput.focus();
  }
});

function addCompany(company) {
  const li = document.createElement("li");
  li.textContent = company;
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "x";
  removeBtn.addEventListener("click", () => {
    li.remove();
    const companyIndex = companies.indexOf(company);
    if (companyIndex > -1) {
      companies.splice(companyIndex, 1);
      companiesInputHidden.value = companies.join(", ");
    }
  });
  li.appendChild(removeBtn);
  companiesList.appendChild(li);
  companies.push(company);
  companiesInputHidden.value = companies.join(", ");
}
