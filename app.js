/**
 * Vendo Official Website Application Logic
 * Lightweight, zero-dependency, accessible vanilla JS
 */

// -------------------------------------------------------------
// OWNER CONFIGURATION:
// Update this object with your actual APK download link and info!
// -------------------------------------------------------------
const VENDO_CONFIG = {
  // Direct Google Drive APK download link
  apkDownloadUrl: "https://drive.google.com/uc?export=download&id=1zGqnEfW3pC6KTOBpd0ypDv3TJyHWee6G", 
  
  // App Version Details
  version: "1.0.0",
  releaseDate: "2026",
  minAndroidVersion: "Android 7.0+ (Nougat)",
  apkSize: "18.5 MB",
  packageId: "com.example.vendo",
  sha256Checksum: "Pending official production release verification",

  // Contact & Owner Details (Placeholder markers)
  ownerLegalName: "[OWNER_LEGAL_NAME]",
  supportEmail: "[SUPPORT_EMAIL_ADDRESS]",
};

document.addEventListener("DOMContentLoaded", () => {
  initMobileNavigation();
  initFaqAccordion();
  initApkDownloadButtons();
  initContactForm();
  initSmoothScroll();
});

/**
 * Mobile navigation toggle
 */
function initMobileNavigation() {
  const toggleBtn = document.getElementById("mobileToggle");
  const navLinks = document.getElementById("navLinks");

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener("click", () => {
    const isActive = navLinks.classList.toggle("active");
    toggleBtn.setAttribute("aria-expanded", String(isActive));
  });

  // Close menu when a navigation link is clicked
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      toggleBtn.setAttribute("aria-expanded", "false");
    });
  });
}

/**
 * FAQ Accordion with accessible states
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const button = item.querySelector(".faq-question");
    if (!button) return;

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      // Close all other items
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove("active");
          const otherBtn = other.querySelector(".faq-question");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        }
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove("active");
        button.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("active");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });
}

/**
 * Android APK Download Button handler
 */
function initApkDownloadButtons() {
  const downloadButtons = document.querySelectorAll(".btn-download-apk");
  const copyLinkBtn = document.getElementById("copyApkLinkBtn");
  const guideBtn = document.getElementById("viewInstallGuideBtn");

  downloadButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      if (VENDO_CONFIG.apkDownloadUrl && VENDO_CONFIG.apkDownloadUrl.trim() !== "" && VENDO_CONFIG.apkDownloadUrl !== "#") {
        // Direct link is present! Start download
        window.location.href = VENDO_CONFIG.apkDownloadUrl;
        showToast("Starting Vendo APK download...");
      } else {
        // Open friendly configuration & instruction dialog
        openModal("apkNoticeModal");
      }
    });
  });

  if (copyLinkBtn) {
    copyLinkBtn.addEventListener("click", () => {
      if (VENDO_CONFIG.apkDownloadUrl && VENDO_CONFIG.apkDownloadUrl.trim() !== "") {
        navigator.clipboard.writeText(VENDO_CONFIG.apkDownloadUrl).then(() => {
          showToast("APK download link copied to clipboard!");
        });
      } else {
        openModal("apkNoticeModal");
      }
    });
  }

  if (guideBtn) {
    guideBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const guideSection = document.getElementById("installation-guide");
      if (guideSection) {
        guideSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}

/**
 * Contact / Inquiries Form
 */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("contactName")?.value || "";
    const email = document.getElementById("contactEmail")?.value || "";
    const message = document.getElementById("contactMessage")?.value || "";

    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast("Please fill in all fields.");
      return;
    }

    // Client-side submission handling
    form.reset();
    showToast("Message received! Thank you for contacting Vendo.");
  });
}

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        targetElem.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

/**
 * Modal dialog management
 */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
}

// Global hook for modal close buttons
window.closeModal = closeModal;
window.openModal = openModal;

/**
 * Lightweight Toast Notification
 */
function showToast(message) {
  let toast = document.getElementById("toastNotification");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toastNotification";
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}
