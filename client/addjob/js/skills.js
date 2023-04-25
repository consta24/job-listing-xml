const skillsList = document.getElementById("skills-list");
const skillsInput = document.getElementById("skills-input");
const addSkillBtn = document.getElementById("add-skill-btn");
const skillsInputHidden = document.getElementById("skills-input-hidden");

let skills = [];

addSkillBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const skill = skillsInput.value.trim();
  if (skill !== "") {
    addSkill(skill);
    skillsInput.value = "";
    skillsInput.focus();
  }
});

function addSkill(skill) {
  const li = document.createElement("li");
  li.textContent = skill;
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "x";
  removeBtn.addEventListener("click", () => {
    li.remove();
    const skillIndex = skills.indexOf(skill);
    if (skillIndex > -1) {
      skills.splice(skillIndex, 1);
      skillsInputHidden.value = skills.join(", ");
    }
  });
  li.appendChild(removeBtn);
  skillsList.appendChild(li);
  skills.push(skill);
  skillsInputHidden.value = skills.join(", ");
}
