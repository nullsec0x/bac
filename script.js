const translations = {
    fr: {
        title: "Calculateur du Bac",
        selectLabel: "Filière :",
        subjects: {
            pc: {
                "Mathématiques": 7,
                "Physique": 7,
                "SVT": 5,
                "Anglais": 2,
                "Philosophie": 2
            },
            svt: {
                "Mathématiques": 7,
                "Physique": 5,
                "SVT": 7,
                "Anglais": 2,
                "Philosophie": 2
            },
            eco: {
                "Mathématiques": 4,
                "Comptabilité et mathématiques financières": 4,
                "Economie générale et statistique": 6,
                "Economie et gestion des entreprises": 3,
                "Anglais": 2,
                "Philosophie": 2
            },
            compta: {
                "Mathématiques": 4,
                "Comptabilité et mathématiques financières": 6,
                "Economie générale et statistique": 3,
                "Economie et gestion des entreprises": 6,
                "Anglais": 2,
                "Philosophie": 2,
            }
        },
        filiereOptions: {
            pc: "Sciences Physiques",
            svt: "Sciences de la Vie et de la Terre",
            eco: "Sciences Économiques",
            compta: "gestion comptable",
        },
        button: "Calculer",
        result: "Moyenne d'examen nationale :",
        invalid: "⚠️ Veuillez entrer des notes valides (0 à 20)",
        export: "📄 Télécharger les résultats",
        langToggleText: "🇲🇦 العربية",
        themeLight: "☀️ Light",
        themeDark: "🌙 Dark",
        title2Bac: "Calculateur Moyenne 2ème Bac",
        exportError: "Veuillez calculer au moins une moyenne avant d'exporter",
        bac2Subjects: {
            semester1: "Moyenne du 1er semestre",
            semester2: "Moyenne du 2ème semestre",
            regional: "Examen régional",
            national: "Examen national"
        },
        result2: "Moyenne générale 2ème Bac :",
        invalid2: "⚠️ Entrez des notes valides (0 à 20)",
        export2: "📄 Télécharger résultats 2ème Bac",
        subjectsHeader: "Matière",
        gradeHeader: "Note",
        coeffHeader: "Coefficient"
    },
    ar: {
        title: "حساب معدل الإمتحان الوطني",
        selectLabel: "الشعبة:",
        subjects: {
            pc: {
                "الرياضيات": 7,
                "الفيزياء": 7,
                "علوم الحياة": 5,
                "الإنجليزية": 2,
                "الفلسفة": 2
            },
            svt: {
                "الرياضيات": 5,
                "الفيزياء": 5,
                "علوم الحياة": 7,
                "الإنجليزية": 2,
                "الفلسفة": 2
            },
            eco: {
                "الرياضيات": 4,
                "المحاسبة والرياضيات المالية": 4,
                "الاقتصاد العام والإحصاء": 6,
                "اقتصاديات الأعمال والإدارة": 3,
                "الإنجليزية": 2,
                "الفلسفة": 2
            },
            compta: {
                "الرياضيات": 4,
                "المحاسبة والرياضيات المالية": 6,
                "الاقتصاد العام والإحصاء": 3,
                "اقتصاديات الأعمال والإدارة": 6,
                "الإنجليزية": 2,
                "الفلسفة": 2
            }
        },
        filiereOptions: {
            pc: "شعبة العلوم الفيزيائية",
            svt: "شعبة علوم الحياة والأرض",
            eco: "شعبة الاقتصاد",
            compta: "محاسبة",
        },
        button: "احسب",
        result: "معدل الإمتحان الوطني:",
        invalid: "⚠️ المرجو إدخال نقاط صحيحة بين 0 و 20",
        export: "📄 تحميل النتائج",
        langToggleText: "🇫🇷 Français",
        themeLight: "☀️ Light",
        themeDark: "🌙 Dark",
        title2Bac: "حساب معدل الثانية بكالوريا",
        exportError: "الرجاء حساب معدل واحد على الأقل قبل التحميل",
        bac2Subjects: {
            semester1: "معدل الدورة الأولى",
            semester2: "معدل الدورة الثانية",
            regional: "معدل الإمتحان الجهوي",
            national: "معدل الإمتحان الوطني"
        },
        result2: "المعدل العام للثانية بكالوريا:",
        invalid2: "⚠️ المرجو إدخال نقاط صحيحة بين 0 و 20",
        export2: "📄 تحميل نتائج الثانية بكالوريا",
        subjectsHeader: "المادة",
        gradeHeader: "النقطة",
        coeffHeader: "المعامل"
    }
};

let currentLang = "fr"; 
let currentTheme = "dark"; 
let currentFiliere = "pc";

const langToggle = document.getElementById("langToggle");
const themeToggle = document.getElementById("themeToggle");
const exportBtn = document.getElementById("exportBtn");
const export2Btn = document.getElementById("export2Btn");
const titleEl = document.getElementById("title");
const filiereSelect = document.getElementById("filiere");
const filiereLabel = document.querySelector("label[for='filiere']");
const form = document.getElementById("bacForm");
const inputContainer = document.getElementById("inputs");
const resultText = document.getElementById("result");
const calcBtn = document.querySelector("#calcBtn");

window.updateBac2UI = function() {
    const t = translations[currentLang];
    const titleEl = document.getElementById("title2Bac");
    if (titleEl) {
        titleEl.textContent = t.title2Bac;
        titleEl.style.fontSize = "2.2rem";
    }

    const semester1Label = document.querySelector("#labelSemester1 span");
    const semester2Label = document.querySelector("#labelSemester2 span");
    const regionalLabel = document.querySelector("#labelRegional span");
    const nationalLabel = document.querySelector("#labelNational span");
    
    if (semester1Label) semester1Label.textContent = t.bac2Subjects.semester1;
    if (semester2Label) semester2Label.textContent = t.bac2Subjects.semester2;
    if (regionalLabel) regionalLabel.textContent = t.bac2Subjects.regional;
    if (nationalLabel) nationalLabel.textContent = t.bac2Subjects.national;

    const calc2Btn = document.getElementById("calc2Btn");
    if (calc2Btn) calc2Btn.textContent = t.button;
    if (export2Btn) export2Btn.textContent = t.export2;
    
    const result2El = document.getElementById("result2Bac");
    const error2El = document.getElementById("error2Bac");
    if (result2El) {
        result2El.textContent = "";
        result2El.style.color = "";
    }
    if (error2El) error2El.textContent = "";
};

function updateUI() {
    const t = translations[currentLang];
    
    document.body.dir = currentLang === "ar" ? "rtl" : "ltr";
    
    if (titleEl) {
        titleEl.textContent = t.title;
        titleEl.style.fontSize = "2.2rem";
        titleEl.style.marginBottom = "1.5rem";
    }
    
    if (filiereLabel) filiereLabel.textContent = t.selectLabel;
    if (calcBtn) calcBtn.textContent = t.button;
    if (exportBtn) exportBtn.textContent = t.export;
    if (export2Btn) export2Btn.textContent = t.export2;
    
    if (filiereSelect) {
        filiereSelect.innerHTML = "";
        Object.entries(t.filiereOptions).forEach(([key, value]) => {
            const option = document.createElement("option");
            option.value = key;
            option.textContent = value;
            option.selected = key === currentFiliere;
            filiereSelect.appendChild(option);
        });
    }
    
    const title2Bac = document.getElementById("title2Bac");
    if (title2Bac) {
        title2Bac.textContent = t.title2Bac;
        title2Bac.style.fontSize = "2.2rem";
        title2Bac.style.marginBottom = "1.5rem";
    }
    
if (langToggle) {
    const nextLang = currentLang === "ar" ? "fr" : "ar";
    langToggle.textContent = translations[nextLang].langToggleText;
}
    if (themeToggle) themeToggle.textContent = currentTheme === "dark" ? t.themeLight : t.themeDark;
    
    renderInputs(currentFiliere);
    if (resultText) resultText.textContent = "";
    
    if (typeof updateBac2UI === 'function') updateBac2UI();
    
    const resultElements = [resultText, document.getElementById("result2Bac")].filter(el => el);
    resultElements.forEach(el => {
        el.style.fontSize = "1.5rem";
        el.style.padding = "1rem";
        el.style.marginTop = "1.5rem";
        el.style.color = "var(--accent-color)";
        el.style.fontWeight = "bold";
    });
}

function renderInputs(filiereKey) {
    if (!inputContainer) return;
    
    inputContainer.innerHTML = "";
    const subjects = translations[currentLang].subjects[filiereKey];

    for (const subject in subjects) {
        const inputGroup = document.createElement("div");
        inputGroup.className = "input-group";

        const label = document.createElement("label");
        label.textContent = subject;

        const input = document.createElement("input");
        input.type = "text";
        input.name = subject;
        input.required = true;
        input.autocomplete = "off";

        label.appendChild(input);
        inputGroup.appendChild(label);
        inputContainer.appendChild(inputGroup);
    }
}

function sanitizeInput(value) {
    if (!value) return NaN;
    return parseFloat(value.replace(",", "."));
}

if (form) {
    form.addEventListener("submit", e => {
        e.preventDefault();
        const t = translations[currentLang];
        const subjects = t.subjects[currentFiliere];

        let total = 0;
        let totalCoeff = 0;
        let hasError = false;

        for (const subject in subjects) {
            const input = form.querySelector(`input[name="${subject}"]`);
            const val = sanitizeInput(input.value);

            if (isNaN(val) || val < 0 || val > 20) {
                hasError = true;
                input.style.border = "2px solid var(--error-color)";
            } else {
                input.style.border = "1px solid var(--input-border)";
                total += val * subjects[subject];
                totalCoeff += subjects[subject];
            }
        }

        if (hasError) {
            if (resultText) {
                resultText.textContent = t.invalid;
                resultText.style.color = "var(--error-color)";
            }
            return;
        }

        const average = (total / totalCoeff).toFixed(2);
        if (resultText) {
            resultText.style.color = "var(--accent-color)";
            resultText.textContent = `${t.result} ${average}`;
        }
    });
}

if (exportBtn) {
    exportBtn.addEventListener("click", () => {
        const t = translations[currentLang];
        const result = resultText ? resultText.textContent.trim() : "";
        const subjects = t.subjects[currentFiliere];

        if (!result || (resultText && result === t.invalid)) {
            alert(t.exportError);
            return;
        }

        let textContent = `${t.title}\n\n`;
        textContent += `${result}\n\n`;
        
        for (const subject in subjects) {
            const input = document.querySelector(`input[name="${subject}"]`);
            const grade = input?.value || "—";
            textContent += `${subject}: ${grade} (${t.coeffHeader}: ${subjects[subject]})\n`;
        }

        downloadTXT(textContent, 'bac_results.txt');
    });
}

function downloadTXT(content, filename) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

if (filiereSelect) {
    filiereSelect.addEventListener("change", e => {
        currentFiliere = e.target.value;
        renderInputs(currentFiliere);
        if (resultText) resultText.textContent = "";
    });
}

if (langToggle) {
    langToggle.addEventListener("click", () => {
        currentLang = currentLang === "ar" ? "fr" : "ar";
        updateUI();
    });
}

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        if (currentTheme === "dark") {
            document.body.classList.remove("dark");
            currentTheme = "light";
        } else {
            document.body.classList.add("dark");
            currentTheme = "dark";
        }
        updateUI();
    });
}

updateUI();