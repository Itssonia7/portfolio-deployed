document.documentElement.classList.add('js-ready');

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Active Nav Link on Scroll + Scroll-to-Top Button
const sections = document.querySelectorAll('section[id]');
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  sections.forEach((sec) => {
    const top = sec.offsetTop - 120;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);

    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });

  if (scrollY > 450) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Scroll Reveal Observer
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Animated Counters (supports both integers and decimals like 8.23)
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.target);
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1200;
      const startTime = performance.now();

      const updateCounter = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const current = target * progress;
        el.textContent = current.toFixed(decimals) + suffix;
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          el.textContent = target.toFixed(decimals) + suffix;
        }
      };

      requestAnimationFrame(updateCounter);
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.4 }
);

document.querySelectorAll('.stat-number').forEach((num) => counterObserver.observe(num));

// Project Details Modal Data
const projectDetails = {
  compiler: {
    category: 'Compilers & C++17',
    title: 'AI-Syntax Compiler (ai-syntax-compiler-cpp)',
    summary:
      'A 5-stage compiler front-end and tree-walking AST interpreter built from scratch in C++17, paired with an AI diagnostic bridge and web playground.',
    bullets: [
      'Implemented lexical analysis, recursive descent parsing, symbol table scoping, static semantic checks, and AST evaluation in modern C++17.',
      'Integrated a Google Gemini diagnostic client via libcurl and nlohmann::json to translate compiler syntax/semantic errors into actionable fixes.',
      'Built an interactive Python web IDE wrapper for live compilation, AST inspection, and step-by-step error feedback.'
    ],
    tags: ['C++17', 'Recursive Descent Parser', 'AST Evaluator', 'libcurl', 'nlohmann::json', 'Gemini API'],
    repo: 'https://github.com/Itssonia7'
  },
  wirezero: {
    category: 'Systems & C++20',
    title: 'WireZero — Zero-Copy Binary Serialization Engine',
    summary:
      'A high-throughput binary protocol serializer and deserializer library engineered in C++20 for deterministic, allocation-free wire encoding.',
    bullets: [
      'Used C++20 variadic template reflection and compile-time type traits to map struct layouts directly onto contiguous byte buffers.',
      'Eliminated intermediate heap allocations to achieve sub-millisecond serialization and deserialization latency.',
      'Verified wire compatibility, endianness handling, and bounds safety with automated GoogleTest suites built via CMake.'
    ],
    tags: ['C++20', 'Variadic Templates', 'Zero-Copy I/O', 'CMake', 'GoogleTest'],
    repo: 'https://github.com/Itssonia7'
  },
  raftkv: {
    category: 'Distributed Systems',
    title: 'Raft-KV — Distributed Consensus Key-Value Store',
    summary:
      'A fault-tolerant replicated key-value store implemented in Go based on the Raft consensus specification.',
    bullets: [
      'Built randomized election timeout loops, split-vote recovery, term synchronization, and leader heartbeat mechanisms.',
      'Implemented AppendEntries log replication and commit-index advancement across cluster nodes over gRPC.',
      'Designed thread-safe state machine transitions verified under simulated node failures and network partitions.'
    ],
    tags: ['Go', 'Raft Consensus', 'gRPC', 'Distributed Systems', 'Concurrency'],
    repo: 'https://github.com/Itssonia7'
  },
  trusttrace: {
    category: 'Breaking Enigma 4.0 Finalist (VIT Pune)',
    title: 'TrustTrace — ZKP & Milestone-Gated Audit Platform',
    summary:
      'Ranked in the Top 50 out of 1,500+ registrations at VIT Pune, combining verifiable milestone escrow with privacy-preserving audit proofs.',
    bullets: [
      'Engineered Go backend verification APIs and Solidity smart contracts to enforce programmatic milestone-gated fund releases.',
      'Integrated Circom circuits and SnarkJS Zero-Knowledge Proofs to validate compliance thresholds without exposing sensitive audit payloads.',
      'Delivered a React dashboard with tamper-evident hash trails for real-time stakeholder verification.'
    ],
    tags: ['Go', 'Solidity', 'Circom / SnarkJS', 'Zero-Knowledge Proofs', 'React'],
    repo: 'https://github.com/Itssonia7'
  },
  legalrag: {
    category: 'Applied AI & Retrieval',
    title: 'Autonomous Multi-Agent Legal RAG System',
    summary:
      'A multi-agent legal research and workflow automation platform designed for grounded statutory retrieval and structured drafting.',
    bullets: [
      'Orchestrated specialized retrieval, verification, and synthesis agents using LangGraph and local Llama 3 inference.',
      'Indexed legal corpora in ChromaDB with semantic chunking and citation-grounded response validation.',
      'Built a full-stack Django REST backend and Angular workspace for case document ingestion and review.'
    ],
    tags: ['LangGraph', 'ChromaDB', 'Llama 3', 'RAG', 'Django', 'Angular'],
    repo: 'https://github.com/Itssonia7'
  },
  security: {
    category: 'Security & Telemetry Automation',
    title: 'CyberGuard AI & Sentinel-Stream',
    summary:
      'Two complementary security systems covering autonomous vulnerability reconnaissance and real-time ML log anomaly detection.',
    bullets: [
      'CyberGuard AI: Python CLI agent leveraging Gemini function calling, Nmap service enumeration, and NVD CVE lookups with persistent JSON session memory.',
      'Sentinel-Stream: Real-time SIEM telemetry pipeline using Scikit-Learn Isolation Forest models streaming anomalies into Elasticsearch and Kibana via Docker.'
    ],
    tags: ['Python', 'Function Calling', 'Nmap / NVD API', 'Scikit-Learn', 'Elasticsearch', 'Docker'],
    repo: 'https://github.com/Itssonia7'
  }
};

const modal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');

document.querySelectorAll('.open-modal').forEach((btn) => {
  btn.addEventListener('click', () => {
    const data = projectDetails[btn.dataset.project];
    if (!data) return;

    document.getElementById('modal-category').textContent = data.category;
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-summary').textContent = data.summary;
    document.getElementById('modal-repo').href = data.repo;

    const bulletsEl = document.getElementById('modal-bullets');
    bulletsEl.innerHTML = data.bullets.map((b) => `<li>${b}</li>`).join('');

    const tagsEl = document.getElementById('modal-tags');
    tagsEl.innerHTML = data.tags.map((t) => `<span>${t}</span>`).join('');

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

const closeModal = () => {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
});

// Contact Form Handler (opens prefilled mailto + shows confirmation)
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:soniananvani7@gmail.com?subject=${subject}&body=${body}`;

  formStatus.textContent = 'Opening your email client to send the message to soniananvani7@gmail.com...';
  contactForm.reset();
});