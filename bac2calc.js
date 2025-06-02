document.addEventListener('DOMContentLoaded', function() {
    const bac2Form = document.getElementById("bac2Form");
    const result2El = document.getElementById("result2Bac");
    const error2El = document.getElementById("error2Bac");
    const export2Btn = document.getElementById("export2Btn");

    function updateBac2UI() {
        const t = translations[currentLang];
        const titleEl = document.getElementById("title2Bac");
        titleEl.textContent = t.title2Bac;
        titleEl.style.fontSize = "2.2rem"; 

        document.querySelector("#labelSemester1 span").textContent = t.bac2Subjects.semester1;
        document.querySelector("#labelSemester2 span").textContent = t.bac2Subjects.semester2;
        document.querySelector("#labelRegional span").textContent = t.bac2Subjects.regional;
        document.querySelector("#labelNational span").textContent = t.bac2Subjects.national;

        document.getElementById("calc2Btn").textContent = t.button;
        export2Btn.textContent = t.export2;
        
        result2El.textContent = "";
        error2El.textContent = "";
        result2El.style.color = "";
        result2El.style.fontSize = "";
    }

    if (bac2Form) {
        bac2Form.addEventListener("submit", function(e) {
            e.preventDefault();
            const t = translations[currentLang];

            result2El.textContent = "";
            error2El.textContent = "";

            const values = {
                semester1: sanitizeInput(bac2Form.elements.semester1.value),
                semester2: sanitizeInput(bac2Form.elements.semester2.value),
                regional: sanitizeInput(bac2Form.elements.regional.value),
                national: sanitizeInput(bac2Form.elements.national.value)
            };

            let isValid = true;
            for (const key in values) {
                const input = bac2Form.elements[key];
                if (isNaN(values[key]) || values[key] < 0 || values[key] > 20) {
                    input.style.border = "2px solid var(--error-color)";
                    isValid = false;
                } else {
                    input.style.border = "1px solid var(--input-border)";
                }
            }

            if (!isValid) {
                error2El.textContent = t.invalid2;
                error2El.style.color = "var(--error-color)";
                return;
            }

            const total = (values.semester1 * 0.5) + 
                         (values.semester2 * 0.5) + 
                         (values.regional * 1) + 
                         (values.national * 2);
            const totalCoeff = 0.5 + 0.5 + 1 + 2;
            const avg = (total / totalCoeff).toFixed(2);

            result2El.textContent = `${t.result2} ${avg}`;
            result2El.style.color = "var(--accent-color)";
            result2El.style.fontSize = "1.5rem";
        });
    }

    if (export2Btn) {
        export2Btn.addEventListener("click", function() {
            const t = translations[currentLang];
            const values = bac2Form.elements;
            const result = result2El.textContent.trim();

            if (!result || error2El.textContent.trim()) {
                alert(t.exportError);
                return;
            }

            let textContent = `${t.title2Bac}\n\n`;
            textContent += `${result}\n\n`;
            
            for (const key in t.bac2Subjects) {
                const coeff = getBac2Coefficient(key);
                textContent += `${t.bac2Subjects[key]}: ${values[key].value || "—"} (${t.coeffHeader}: ${coeff})\n`;
            }

            downloadTXT(textContent, '2bac_results.txt');
        });
    }

    function sanitizeInput(value) {
        if (!value) return NaN;
        return parseFloat(value.replace(",", "."));
    }

    function getBac2Coefficient(key) {
        switch(key) {
            case 'semester1':
            case 'semester2': return 0.5;
            case 'regional': return 1;
            case 'national': return 2;
            default: return 0;
        }
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
});