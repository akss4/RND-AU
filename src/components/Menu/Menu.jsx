"use client";

import styles from "./Menu.module.css";

import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useLenis } from "lenis/react";

import Logo from "@/components/Logo";

import {
  HOME_COPY_BASE_DELAY,
  PRELOADER_COPY_BASE_DELAY,
  shouldShowPreloader,
} from "@/lib/preloader";

gsap.registerPlugin(useGSAP, SplitText);

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/work", label: "Work" },
  { href: "/firm", label: "Inside the Firm" },
  { href: "/partnerships", label: "Partnerships" },
  { href: "/journal", label: "Journal" },
];

const CONTENT_STAGGER_IN = 0.05;
const CONTENT_DURATION = 0.65;
const CONTENT_IN_DELAY = 0.15;
const OVERLAY_DURATION = 0.7;
const OVERLAY_EASE = "power3.out";
const HOVER_DURATION = 0.3;
const HOVER_STAGGER = 0.035;

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const timelineRef = useRef(null);
  const hasOpenedRef = useRef(false);
  const isOpenRef = useRef(false);
  const pathname = usePathname();
  const lenis = useLenis();
  const playIntro = pathname === "/" && shouldShowPreloader();
  const introDelay = playIntro
    ? PRELOADER_COPY_BASE_DELAY - HOME_COPY_BASE_DELAY + 0.75
    : 0;

  isOpenRef.current = isOpen;

  useLayoutEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    if (!playIntro) {
      gsap.set(menu, { clearProps: "transform,translate,rotate,scale,transition" });
      menu.removeAttribute("data-nav-intro");
      return;
    }

    gsap.set(menu, { y: -250, transition: "none" });
    menu.removeAttribute("data-nav-intro");
    gsap.to(menu, {
      y: 0,
      duration: 0.75,
      delay: introDelay,
      ease: "power3.out",
      onComplete: () => {
        gsap.set(menu, {
          clearProps: "transform,translate,rotate,scale,transition",
        });
      },
    });
  }, [playIntro, introDelay]);

  useGSAP(
    () => {
      const splitEls = gsap.utils.toArray(`.${styles.split}`);
      const splits = splitEls.map(
        (el) => new SplitText(el, { type: "lines", mask: "lines" }),
      );
      const lines = splits.flatMap((split) => split.lines);
      const reveals = gsap.utils.toArray(`.${styles.reveal}`);
      const panel = gsap.utils.toArray(`.${styles.panel}`)[0];
      const titleEl = gsap.utils.toArray(`.${styles.contactTitle}`)[0];
      const titleSplit = splits.find((split) =>
        split.lines.some((line) => titleEl?.contains(line)),
      );
      const titleAt =
        CONTENT_IN_DELAY +
        Math.max(0, lines.indexOf(titleSplit?.lines[0])) * CONTENT_STAGGER_IN;

      gsap.set(panel, { clipPath: "inset(0 0 100% 0)" });
      gsap.set(lines, { yPercent: 110 });
      gsap.set(reveals, { opacity: 0, y: 12 });

      const timeline = gsap.timeline({ paused: true });
      timeline.to(
        panel,
        {
          clipPath: "inset(0 0 0% 0)",
          duration: OVERLAY_DURATION,
          ease: OVERLAY_EASE,
        },
        0,
      );
      timeline.to(
        lines,
        {
          yPercent: 0,
          duration: CONTENT_DURATION,
          stagger: CONTENT_STAGGER_IN,
          ease: "power3.out",
        },
        CONTENT_IN_DELAY,
      );
      timeline.to(
        reveals,
        {
          opacity: 1,
          y: 0,
          duration: CONTENT_DURATION,
          ease: "power3.out",
        },
        titleAt,
      );

      timelineRef.current = timeline;

      const hoverCleanups = [];
      const desktopMq = window.matchMedia("(min-width: 769px)");

      const clearHover = () => {
        hoverCleanups.forEach((cleanup) => cleanup());
        hoverCleanups.length = 0;
      };

      const bindHover = () => {
        clearHover();
        if (!desktopMq.matches) return;

        gsap.utils.toArray(`.${styles.navItem}`).forEach((item) => {
          const label = item.querySelector(`.${styles.label}`);
          if (!label) return;

          const line =
            label.querySelector("div > div") ||
            label.querySelector("div") ||
            label;
          const wordSplit = new SplitText(line, {
            type: "words",
            mask: "words",
            wordsClass: styles.word,
          });
          const words = wordSplit.words;
          if (!words?.length) {
            wordSplit.revert();
            return;
          }

          const applyShift = () => {
            words.forEach((word) => {
              word.style.setProperty("--shift", `${word.offsetHeight}px`);
            });
          };
          applyShift();
          document.fonts?.ready.then(applyShift);

          const play = (enter) => {
            gsap.to(words, {
              y: (_index, word) => (enter ? word.offsetHeight : 0),
              duration: HOVER_DURATION,
              ease: "power1.inOut",
              stagger: HOVER_STAGGER,
              overwrite: "auto",
            });
          };

          const onEnter = () => play(true);
          const onLeave = () => play(false);
          item.addEventListener("mouseenter", onEnter);
          item.addEventListener("mouseleave", onLeave);

          hoverCleanups.push(() => {
            item.removeEventListener("mouseenter", onEnter);
            item.removeEventListener("mouseleave", onLeave);
            wordSplit.revert();
          });
        });
      };

      bindHover();
      desktopMq.addEventListener("change", bindHover);

      return () => {
        desktopMq.removeEventListener("change", bindHover);
        clearHover();
        timeline.kill();
        splits.forEach((split) => split.revert());
      };
    },
    { scope: menuRef },
  );

  useEffect(() => {
    const timeline = timelineRef.current;
    document.body.style.overflow = isOpen ? "hidden" : "";

    if (isOpen) {
      const wasStopped = Boolean(lenis?.isStopped);
      if (lenis && !wasStopped) lenis.stop();
      hasOpenedRef.current = true;
      timeline?.timeScale(1).play();
      return () => {
        if (lenis && !wasStopped) lenis.start();
        document.body.style.overflow = "";
      };
    }

    if (!timeline) return;
    if (!hasOpenedRef.current) return;
    if (timeline.progress() === 0) return;
    timeline.timeScale(1.5).reverse();
  }, [isOpen, lenis]);

  useEffect(() => {
    const closeNow = () => {
      timelineRef.current?.progress(0).pause();
      setIsOpen(false);
    };

    window.addEventListener("transition-cover", closeNow);
    return () => window.removeEventListener("transition-cover", closeNow);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    let lastScrollY = window.scrollY;
    let isVisible = true;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        if (isOpenRef.current) setIsOpen(false);
        if (isVisible) {
          menu.classList.add(styles.hidden);
          isVisible = false;
        }
      } else if (currentScrollY < lastScrollY && !isVisible) {
        menu.classList.remove(styles.hidden);
        isVisible = true;
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggle = () => setIsOpen((prev) => !prev);
  const handleLinkClick = (href) => {
    if (href === pathname) setIsOpen(false);
  };

  return (
    <div
      className={styles.menu}
      ref={menuRef}
      data-open={isOpen}
      {...(playIntro ? { "data-nav-intro": "" } : {})}
    >
      <div className={styles.bar}>
        <div className={styles.brandGroup}>
          <Link
            href="/"
            className={styles.logo}
            aria-label="RND Financials — home"
            onClick={() => handleLinkClick("/")}
          >
            <Logo />
          </Link>
          <div className={styles.brandText}>
            <p className="mono sm">RND Financials</p>
          </div>
        </div>

        <span className={styles.divider} aria-hidden="true" />

        <button
          type="button"
          className={styles.toggle}
          onClick={toggle}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <span className={styles.toggleIcon}>
            <span />
            <span />
          </span>
        </button>
      </div>
      <div className={styles.panel}>
        <nav className={styles.nav}>
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.navItem}
              onClick={() => handleLinkClick(link.href)}
            >
              <p className={`mono sm ${styles.index} ${styles.split}`}>
                {String(i + 1).padStart(2, "0")}
              </p>
              <h6 className={`${styles.label} ${styles.split}`}>
                {link.label}
              </h6>
            </Link>
          ))}
        </nav>

        <Link href="/contact" className={styles.contact}>
          <p className={`mono sm ${styles.contactIndex} ${styles.split}`}>07</p>
          <div className={styles.contactBody}>
            <h4 className={`${styles.contactTitle} ${styles.split}`}>
              Let&apos;s Talk
            </h4>
            <p className={`mono sm ${styles.contactCode} ${styles.split}`}>
              Contact
            </p>
          </div>
          <span className={styles.contactArrow} aria-hidden="true">
            <span className={styles.reveal}>
              <FiArrowRight />
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
}