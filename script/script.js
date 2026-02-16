// ========= CONFIGURAÇÃO WHATSAPP =========
// Substitua pelo número REAL da barbearia (formato internacional sem +, ex: 5511999999999)
const WHATSAPP_NUMBER = "5511999999999";
const WHATSAPP_BASE_URL = "https://wa.me/";

// Mensagens pré-definidas
const messages = {
    hero: "Olá, vim pelo site da Barbearia Elite Urbana e gostaria de agendar um horário.",
    services: "Olá, gostaria de agendar um horário e saber mais sobre os serviços.",
    contact: "Olá, gostaria de falar com a Barbearia Elite Urbana."
};

function buildWhatsAppLink(message) {
    const encoded = encodeURIComponent(message);
    return `${WHATSAPP_BASE_URL}${WHATSAPP_NUMBER}?text=${encoded}`;
}

// ========= MENU MOBILE =========
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");

if (navToggle) {
    navToggle.addEventListener("click", () => {
        navToggle.classList.toggle("active");
        nav.classList.toggle("nav--mobile");
        nav.classList.toggle("nav--open");
    });
}

// Fecha menu ao clicar em links (mobile)
document.querySelectorAll(".nav__link").forEach(link => {
    link.addEventListener("click", () => {
        if (nav.classList.contains("nav--mobile")) {
            nav.classList.remove("nav--mobile", "nav--open");
            navToggle.classList.remove("active");
        }
    });
});

// ========= SCROLL SUAVE MANUAL =========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId.length > 1) {
            e.preventDefault();
            const section = document.querySelector(targetId);
            if (section) {
                const headerOffset = 80; // compensar navbar fixa
                const elementPosition = section.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }
    });
});

// ========= BOTÕES WHATSAPP =========
const heroWhatsApp = document.getElementById("heroWhatsApp");
const servicesWhatsApp = document.getElementById("servicesWhatsApp");
const contactWhatsApp = document.getElementById("contactWhatsApp");
const footerWhatsApp = document.getElementById("footerWhatsApp");

if (heroWhatsApp) {
    heroWhatsApp.href = buildWhatsAppLink(messages.hero);
}
if (servicesWhatsApp) {
    servicesWhatsApp.href = buildWhatsAppLink(messages.services);
}
if (contactWhatsApp) {
    contactWhatsApp.href = buildWhatsAppLink(messages.contact);
}
if (footerWhatsApp) {
    footerWhatsApp.href = buildWhatsAppLink(messages.hero);
}

// ========= MODAL GALERIA =========
const galleryItems = document.querySelectorAll(".gallery__item img");
const modal = document.getElementById("galleryModal");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const modalImage = document.getElementById("modalImage");
const modalCaption = document.getElementById("modalCaption");

galleryItems.forEach(img => {
    img.addEventListener("click", () => {
        if (!modal || !modalImage || !modalCaption) return;
        modalImage.src = img.src;
        modalCaption.textContent = img.alt || "";
        modal.classList.add("modal--open");
        document.body.style.overflow = "hidden";
    });
});

function closeModal() {
    if (!modal) return;
    modal.classList.remove("modal--open");
    document.body.style.overflow = "";
}

if (modalOverlay) {
    modalOverlay.addEventListener("click", closeModal);
}
if (modalClose) {
    modalClose.addEventListener("click", closeModal);
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("modal--open")) {
        closeModal();
    }
});

// ========= VALIDAÇÃO DE FORMULÁRIO =========
const contactForm = document.getElementById("contactForm");
const nomeInput = document.getElementById("nome");
const mensagemInput = document.getElementById("mensagem");
const nomeError = document.getElementById("nomeError");
const mensagemError = document.getElementById("mensagemError");

function clearError(fieldGroup, errorElement) {
    if (!fieldGroup || !errorElement) return;
    fieldGroup.classList.remove("form__group--error");
    errorElement.textContent = "";
}

function setError(fieldGroup, errorElement, message) {
    if (!fieldGroup || !errorElement) return;
    fieldGroup.classList.add("form__group--error");
    errorElement.textContent = message;
}

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const nomeGroup = nomeInput.closest(".form__group");
        const mensagemGroup = mensagemInput.closest(".form__group");

        let valid = true;
        clearError(nomeGroup, nomeError);
        clearError(mensagemGroup, mensagemError);

        if (!nomeInput.value.trim()) {
            setError(nomeGroup, nomeError, "Por favor, informe seu nome.");
            valid = false;
        } else if (nomeInput.value.trim().length < 3) {
            setError(nomeGroup, nomeError, "Digite um nome com pelo menos 3 caracteres.");
            valid = false;
        }

        if (!mensagemInput.value.trim()) {
            setError(mensagemGroup, mensagemError, "Digite uma mensagem.");
            valid = false;
        } else if (mensagemInput.value.trim().length < 10) {
            setError(mensagemGroup, mensagemError, "Descreva com um pouco mais de detalhes.");
            valid = false;
        }

        if (valid) {
            alert("Mensagem validada com sucesso! Para agilizar o atendimento, prefira falar via WhatsApp.");
            contactForm.reset();
        }
    });
}

// Remove mensagem de erro enquanto o usuário digita
if (nomeInput && nomeError) {
    nomeInput.addEventListener("input", () => {
        const nomeGroup = nomeInput.closest(".form__group");
        if (nomeInput.value.trim().length >= 3) {
            clearError(nomeGroup, nomeError);
        }
    });
}
if (mensagemInput && mensagemError) {
    mensagemInput.addEventListener("input", () => {
        const mensagemGroup = mensagemInput.closest(".form__group");
        if (mensagemInput.value.trim().length >= 10) {
            clearError(mensagemGroup, mensagemError);
        }
    });
}

// ========= ANIMAÇÕES AO ROLAR (INTERSECTION OBSERVER) =========
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => observer.observe(el));
} else {
    // Fallback: se o navegador não suportar, mostra tudo
    revealElements.forEach(el => el.classList.add("visible"));
}

// ========= ANO AUTOMÁTICO NO FOOTER =========
const yearSpan = document.getElementById("year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}