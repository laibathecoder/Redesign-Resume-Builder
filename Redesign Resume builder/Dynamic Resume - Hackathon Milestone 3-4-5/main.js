"use strict";
// import { format } from "date-fns";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.getElementById("resume-form");
const resumePage = document.getElementById("resumePage");
const resumeContent = document.getElementById("resumeContent");
const resumePic = document.getElementById("resumePic");
const resumeName = document.getElementById("resume-name");
const resumeEmail = document.getElementById("resume-email");
const resumePhone = document.getElementById("resume-phone");
const resumeStudyfield = document.getElementById("resume-studyfield");
const resumeLastEdu = document.getElementById("resume-lastEdu");
const resumeWorkexp = document.getElementById("resume-workexp");
const resumeSkills = document.getElementById("resume-skills");
const resumeAchievement = document.getElementById("resume-achievement");
const resumeSummary = document.getElementById("resume-summary");
const shareLinkbtn = document.getElementById("sharelinkbtn");
const editbtn = document.getElementById("editbtn");
const downloadPDFbtn = document.getElementById("downloadPDF");
form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const studyField = document.getElementById("studyfield").value;
    const lastEdu = document.getElementById("lastEdu").value;
    const workExp = document.getElementById("workexp").value;
    const skills = document.getElementById("skills").value;
    const achievement = document.getElementById("achievement").value;
    const summary = document.getElementById("summary").value;
    const profilePhoto = document.getElementById("profile-pic");
    const photoFile = profilePhoto.files ? profilePhoto.files[0] : null;
    let photoBase64 = "";
    if (photoFile) {
        photoBase64 = yield fileToBase64(photoFile);
        resumePic.src = photoBase64;
    }
    (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
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
        name: name,
        email: email,
        phone: phone,
        studyField: studyField,
        lastEdu: lastEdu,
        workExp: workExp,
        skills: skills,
        achievement: achievement,
        summary: summary,
    });
    const uniqueUrl = `${window.location.origin}?${queryParams.toString()}`;
    shareLinkbtn.addEventListener("click", () => {
        navigator.clipboard.writeText(uniqueUrl);
        alert("The link is copied");
    });
    window.history.replaceState(null, '', `?${queryParams.toString()}`);
}));
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
editbtn.addEventListener("click", () => {
    var _a;
    updateFormResume();
    (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden");
    resumePage.classList.add("hidden");
});
function updateFormResume() {
    var _a, _b, _c, _d;
    document.getElementById("name").value = resumeName.textContent || '';
    document.getElementById("email").value = ((_a = resumeEmail.textContent) === null || _a === void 0 ? void 0 : _a.replace('Email:', '')) || '';
    document.getElementById("phone").value = ((_b = resumePhone.textContent) === null || _b === void 0 ? void 0 : _b.replace('Phone:', '')) || '';
    document.getElementById("studyfield").value = ((_c = resumeStudyfield.textContent) === null || _c === void 0 ? void 0 : _c.replace('Field of Study:', '')) || '';
    document.getElementById("lastEdu").value = ((_d = resumeLastEdu.textContent) === null || _d === void 0 ? void 0 : _d.replace('Last Education', '')) || '';
    document.getElementById("workexp").value = resumeWorkexp.textContent || '';
    document.getElementById("skills").value = resumeSkills.textContent || '';
    document.getElementById("achievement").value = resumeAchievement.textContent || '';
    document.getElementById("summary").value = resumeSummary.textContent || '';
}
downloadPDFbtn.addEventListener("click", () => {
    if (typeof html2pdf === "undefined") {
        alert("Error : html2pdf libarary is not loaded");
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
        .catch((error) => {
        console.log("PDF error", error);
    });
});
window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name") || '';
    const email = params.get("email") || '';
    const phone = params.get("phone") || '';
    const studyField = params.get("studyfield") || '';
    const lastEdu = params.get("lastedu") || '';
    const workExp = params.get("workexp") || '';
    const skills = params.get("skills") || '';
    const achievement = params.get("achievement") || '';
    const summary = params.get("summary") || '';
    if (name || email || phone || studyField || lastEdu || workExp || skills || achievement || summary) {
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
        if (savephoto) {
            resumePic.src = savephoto;
        }
    }
    resumePic.style.width = "200px";
    resumePic.style.height = "200px";
    resumePic.style.objectFit = "cover";
    resumePic.style.borderRadius = "50%";
    resumePic.style.display = "block";
    resumePic.style.margin = "0 auto";
    resumePic.style.border = "5px solid rgb(96, 93, 93)";
    resumePic.style.boxShadow = "1px 1px 20px black";
});
