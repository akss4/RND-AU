"use client";

import styles from "./ContactBanner.module.css";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FiArrowRight, FiCheck } from "react-icons/fi";

import Copy from "@/components/Copy";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CLIP_START = "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)";
const CLIP_END = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

export default function ContactBanner({
  email = "info@rndfinancials.com.au",
  phone = "+61 (03) 9000 0000",
}) {
  const sectionRef = useRef(null);
  const panelRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel) return;

      gsap.set(panel, { clipPath: CLIP_START });
      gsap.to(panel, {
        clipPath: CLIP_END,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: panel,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef, dependencies: [] },
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      /*
        Google Sheets Backend Integration:
        When ready to connect to Google Sheets, insert your Google Apps Script Web App URL below:

        await fetch("YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL", {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      */
      console.log("Contact form submission:", formData);

      // Simulate a brief response for frontend interaction
      await new Promise((resolve) => setTimeout(resolve, 600));
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      service: "",
      message: "",
    });
    setIsSubmitted(false);
  };

  return (
    <section ref={sectionRef} className={styles.contactBanner}>
      <div className={styles.bg} aria-hidden="true">
        <img src="/images/contact/banner.jpg" alt="" />
      </div>

      <div className={styles.wrap}>
        <div ref={panelRef} className={styles.panel}>
          {/* Email and Phone Number above 'Get in touch' */}
          <div className={styles.topContact}>
            <div className={styles.topContactItem}>
              <span className={styles.topContactLabel}>Email</span>
              <a href={`mailto:${email}`} className={styles.topContactValue}>
                {email}
              </a>
            </div>
            <div className={styles.topContactItem}>
              <span className={styles.topContactLabel}>Phone</span>
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className={styles.topContactValue}
              >
                {phone}
              </a>
            </div>
          </div>

          <div className={styles.intro}>
            <Copy delay={0.2} trigger={`.${styles.panel}`}>
              <h6>Get in touch</h6>
            </Copy>
            <Copy delay={0.35} trigger={`.${styles.panel}`}>
              <p>
                Have a question, need expert guidance on a loan, or ready to
                explore your options? Fill out the form below and we will take
                it from there.
              </p>
            </Copy>
          </div>

          {/* Form */}
          {isSubmitted ? (
            <div className={styles.successState}>
              <div className={styles.successIcon} aria-hidden="true">
                <FiCheck />
              </div>
              <h4>Thank you!</h4>
              <p>
                Your message has been received. One of our specialists will be in
                touch with you shortly.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className={styles.resetBtn}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label htmlFor="contact-name" className={styles.label}>
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className={styles.input}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact-phone" className={styles.label}>
                    Phone Number
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                    required
                    className={styles.input}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact-email" className={styles.label}>
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                    required
                    className={styles.input}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact-service" className={styles.label}>
                    Service Needed
                  </label>
                  <input
                    id="contact-service"
                    type="text"
                    name="service"
                    list="service-options"
                    value={formData.service}
                    onChange={handleChange}
                    placeholder="e.g. Home Loan, Refinancing, Asset Finance"
                    required
                    className={styles.input}
                  />
                  <datalist id="service-options">
                    <option value="Home Loan" />
                    <option value="Refinancing" />
                    <option value="Asset Finance" />
                    <option value="Business Loan" />
                    <option value="Commercial Property" />
                    <option value="First Home Buyer" />
                  </datalist>
                </div>

                <div className={`${styles.field} ${styles.fieldFull}`}>
                  <label htmlFor="contact-message" className={styles.label}>
                    Write a message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what you are looking for..."
                    required
                    className={styles.textarea}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.submitBtn}
              >
                <span>{isSubmitting ? "Sending..." : "Submit Enquiry"}</span>
                <FiArrowRight className={styles.submitArrow} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
