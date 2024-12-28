// import { format } from "date-fns";

declare const html2pdf : any;

const form = document.getElementById("resume-form") as HTMLFormElement;
 const resumePage = document.getElementById("resumePage") as HTMLElement;
 const resumeContent = document.getElementById("resumeContent") as HTMLElement;
 const resumePic = document.getElementById("resumePic") as HTMLImageElement;
 const resumeName = document.getElementById("resume-name") as HTMLHeadingElement;
 const resumeEmail = document.getElementById("resume-email") as HTMLParagraphElement;
 const resumePhone = document.getElementById("resume-phone") as HTMLParagraphElement;
 const resumeStudyfield = document.getElementById("resume-studyfield") as HTMLParagraphElement;
 const resumeLastEdu = document.getElementById("resume-lastEdu") as HTMLParagraphElement;
 const resumeWorkexp = document.getElementById("resume-workexp") as HTMLParagraphElement;
 const resumeSkills = document.getElementById("resume-skills") as HTMLParagraphElement;
 const resumeAchievement = document.getElementById("resume-achievement") as HTMLParagraphElement;
 const resumeSummary = document.getElementById("resume-summary") as HTMLParagraphElement;
 const shareLinkbtn = document.getElementById("sharelinkbtn") as HTMLButtonElement;
 const editbtn = document.getElementById("editbtn") as HTMLButtonElement;
 const downloadPDFbtn = document.getElementById("downloadPDF") as HTMLButtonElement;





form.addEventListener("submit", async (event: Event) => {
  event.preventDefault();

  const name = (document.getElementById("name") as HTMLInputElement).value;
   const email = (document.getElementById("email") as HTMLInputElement).value;
   const phone = (document.getElementById("phone") as HTMLInputElement).value;
  const studyField = (document.getElementById("studyfield") as HTMLInputElement).value;
   const lastEdu = (document.getElementById("lastEdu") as HTMLInputElement).value;
   const workExp = (document.getElementById("workexp") as HTMLTextAreaElement).value;
   const skills = (document.getElementById("skills") as HTMLTextAreaElement).value;
   const achievement = (document.getElementById("achievement") as HTMLInputElement).value;
  const summary = (document.getElementById("summary") as HTMLTextAreaElement).value;
  const profilePhoto = document.getElementById("profile-pic") as HTMLInputElement;

   const photoFile = profilePhoto.files ? profilePhoto.files[0] : null;

   let photoBase64 = "";
   if (photoFile) {
    photoBase64 = await fileToBase64(photoFile);
    resumePic.src = photoBase64;
  }

 document.querySelector(".container")?.classList.add("hidden");
   resumePage.classList.remove("hidden");

    resumeName.textContent = name;
    resumeEmail.textContent = `Email: ${email}`;
    resumePhone.textContent = `Phone: ${phone}`;
    resumeStudyfield.textContent = `Field of Study: ${studyField}`;
    resumeLastEdu.textContent = `Last Education: ${lastEdu}`;
    resumeWorkexp.textContent = workExp;
    resumeSkills.textContent = skills;
    resumeAchievement.textContent = achievement;
    resumeSummary.textContent = summary;

  
 const queryParams = new URLSearchParams({
  name : name ,
  email :email,
  phone : phone,
  studyField : studyField,
  lastEdu : lastEdu,
  workExp : workExp,
  skills : skills,
  achievement : achievement,
  summary : summary,

 })

 
   const uniqueUrl = `${window.location.origin}?${queryParams.toString()}`
  shareLinkbtn.addEventListener("click" , ()=>{
     navigator.clipboard.writeText(uniqueUrl);
    alert("The link is copied");
 })
 
 window.history.replaceState(null, '', `?${queryParams.toString()}`);


 });


 function fileToBase64(file: File): Promise<string> {
   return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => resolve(reader.result as string);

    reader.onerror = reject;
    reader.readAsDataURL(file);



   });
 }

 editbtn.addEventListener("click" , ()=>{
  updateFormResume();

  document.querySelector(".container")?.classList.remove("hidden");
  resumePage.classList.add("hidden");

 });

 function updateFormResume(){

  (document.getElementById("name") as HTMLInputElement).value = resumeName.textContent || '';
  (document.getElementById("email") as HTMLInputElement).value = resumeEmail.textContent?.replace('Email:', '') || '';
  (document.getElementById("phone") as HTMLInputElement) .value = resumePhone.textContent?.replace('Phone:', '') || '';
  (document.getElementById("studyfield") as HTMLInputElement).value = resumeStudyfield.textContent?.replace('Field of Study:', '') || '';
  (document.getElementById("lastEdu") as HTMLInputElement).value = resumeLastEdu.textContent?.replace('Last Education', '') || '';
  (document.getElementById("workexp") as HTMLTextAreaElement).value = resumeWorkexp.textContent || '';
  (document.getElementById("skills") as HTMLTextAreaElement).value = resumeSkills.textContent || '';
  (document.getElementById("achievement") as HTMLInputElement).value = resumeAchievement.textContent || '';
  (document.getElementById("summary") as HTMLTextAreaElement).value = resumeSummary.textContent || '';

}

downloadPDFbtn.addEventListener("click" , ()=>{
  if(typeof html2pdf === "undefined"){
    alert("Error : html2pdf libarary is not loaded")
    return;
  }


  const resumeOptions = {
  margin: 0.5,
  filename: "resume.pdf",
  image: { type: 'jpg', quality: 1.0 },
  html2canvas: { scale: 2 },
  jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
};

  
  html2pdf()
    .from(resumeContent)
    .set(resumeOptions)
    .save()
    .catch((error:Error) =>{
      console.log("PDF error" , error)
    })
  
});

  window.addEventListener("DOMContentLoaded" , ()=>{
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name") || '';
    const email = params.get("email") || '';
    const phone = params .get("phone") || '';
    const studyField = params .get("studyfield") || '';
    const lastEdu = params .get("lastedu") || '';
    const workExp = params.get("workexp") || '';
    const skills = params.get("skills") || '';
    const achievement = params.get("achievement") || '';
   const summary = params.get("summary") || '';

   if(name || email || phone || studyField || lastEdu || workExp || skills || achievement || summary){
    
    resumeName.textContent = name;
    resumeEmail.textContent = `Email: ${email}`;
    resumePhone.textContent = `Phone: ${phone}`;
    resumeStudyfield.textContent = `Field of Study: ${studyField}`;
    resumeLastEdu.textContent = `Last Education: ${lastEdu}`;
    resumeWorkexp.textContent = workExp;
    resumeSkills.textContent = skills;
    resumeAchievement.textContent = achievement;
    resumeSummary.textContent = summary;


  const savephoto = localStorage.getItem("resumePic");
  if(savephoto){
    resumePic.src =  savephoto;
  }  

   }

  resumePic.style.width = "200px";
  resumePic.style.height = "200px";
  resumePic.style.objectFit = "cover";
  resumePic.style.borderRadius = "50%";
  resumePic.style.display = "block";
  resumePic.style.margin = "0 auto";
  resumePic.style. border = "5px solid rgb(96, 93, 93)";
  resumePic.style. boxShadow = "1px 1px 20px black";


});









