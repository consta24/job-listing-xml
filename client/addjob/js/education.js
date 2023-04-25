const educationList = document.getElementById("education-list");
const educationInput = document.getElementById("education-input");
const addEducationBtn = document.getElementById("add-education-btn");
const educationInputHidden = document.getElementById("education-input-hidden");

let educations = [];

addEducationBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const selectedOptions = Array.from(educationInput.selectedOptions);
  const selectedEducations = selectedOptions.map((option) => option.value);
  if (selectedEducations.length > 0) {
    selectedEducations.forEach(addEducation);
    educationInput.selectedIndex = -1;
    educationInput.focus();
  }
});

function addEducation(education) {
  const li = document.createElement("li");
  li.textContent = education;
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "x";
  removeBtn.addEventListener("click", () => {
    li.remove();
    const educationIndex = educations.indexOf(education);
    if (educationIndex > -1) {
      educations.splice(educationIndex, 1);
      educationInputHidden.value = educations.join(", ");
    }
  });
  li.appendChild(removeBtn);
  educationList.appendChild(li);
  educations.push(education);
  educationInputHidden.value = educations.join(", ");
}
