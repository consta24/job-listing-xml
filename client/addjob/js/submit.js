document
  .getElementById("add-job-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("title-input").value;
    const description = document.getElementById("description-input").value;
    const skills = document.getElementById("skills-input-hidden").value.trim();
    const education = document.getElementById("education-input-hidden").value;
    const companies = document.getElementById("companies-input-hidden").value;
    const experience = document.getElementById("experience-input").value;

    const job = {
      title,
      description,
      skills,
      education,
      experience,
      companies,
    };

    try {
      const response = await fetch("/addJob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
      });

      const result = await response.json();
      document.getElementById("response").innerHTML = result.message;
    } catch (error) {
      document.getElementById("response").innerHTML = "Error: " + error.message;
    }
  });
