(function () {
  "use strict";

  var STAGES = {
    neuron: {
      title: "The biological neuron",
      years: "Nervous systems · formalized 1906–1952",
      summary: "A cell that gathers weak signals, decides whether to fire, and changes its connections when experience repeats. Every later network is a deliberate simplification of this loop.",
      inherited: [
        "Electrical and chemical signaling already solved credit over time: spikes, synapses, and plasticity.",
        "Computation is local. Each cell only sees its own inputs."
      ],
      mutated: [
        "Nothing engineered yet. This is the source pattern: weighted inputs, a threshold, and a connection that can strengthen."
      ],
      opened: [
        "A mathematical neuron could copy the threshold, even if it dropped spikes, chemistry, and the body."
      ]
    },
    formal: {
      title: "The formal neuron and the perceptron",
      years: "1943–1969",
      summary: "McCulloch, Pitts, Rosenblatt, and Widrow turned the cell into arithmetic: multiply, add, threshold, and adjust the weights when the answer is wrong.",
      inherited: [
        "All-or-none firing becomes a threshold on a weighted sum.",
        "Hebb’s “fire together, wire together” becomes an explicit learning rule."
      ],
      mutated: [
        "Spikes, neurotransmitters, and dendrites disappear. The unit is a formula.",
        "The delta rule mutates Hebb: change the weight in proportion to the error, not only to co-activity."
      ],
      opened: [
        "Linear separators work. Exclusive-or does not. The missing piece is depth, and the field does not yet know how to train it."
      ]
    },
    connectionist: {
      title: "Hidden layers, memory, and backpropagation",
      years: "1974–1998",
      summary: "Credit can travel backward through hidden units. Networks gain internal representations, local receptive fields, and a crude kind of time.",
      inherited: [
        "The weighted sum and the learning rule stay.",
        "The perceptron’s failure on exclusive-or explains why a hidden layer is required."
      ],
      mutated: [
        "Backpropagation mutates the delta rule into a chain rule across layers.",
        "Convolution mutates the fully connected net into shared local detectors.",
        "The LSTM cell mutates the recurrent net so a memory trace can survive many steps."
      ],
      opened: [
        "Universal approximation says a wide enough net can represent almost any function. Training that net well still waits on data, initialization, and computers."
      ]
    },
    deep: {
      title: "Deep learning and representation",
      years: "2006–2016",
      summary: "Depth becomes trainable. Features are learned from pixels and words instead of designed by hand. Attention appears as a way to look up the relevant past.",
      inherited: [
        "Backprop, convolution, recurrence, and rectified units.",
        "The old dream of distributed representations, now visible in word vectors."
      ],
      mutated: [
        "ReLU, dropout, batch norm, residual links, and GPUs mutate training from fragile to routine.",
        "Additive attention mutates sequence models: the decoder looks back instead of squeezing the past into one vector."
      ],
      opened: [
        "A single recurrence step is still a bottleneck. The next mutation removes recurrence entirely."
      ]
    },
    transformer: {
      title: "The transformer",
      years: "2017–2019",
      summary: "Self-attention lets every token look at every other token in parallel. Position is injected, not processed step by step. This is the architectural hinge of the modern cycle.",
      inherited: [
        "Queries, keys, and values grow out of Bahdanau attention.",
        "Residual streams, layer norm, and feed-forward layers grow out of deep residual nets.",
        "Token embeddings grow out of Word2Vec."
      ],
      mutated: [
        "Recurrence is discarded for language-scale training. Sequence becomes a set plus positions.",
        "Multi-head attention mutates one lookup into several relations at once.",
        "The objective mutates too: mask a token, or predict the next one, on unlabeled text."
      ],
      opened: [
        "Decoder-only prediction scales. Encoder-only understanding scales. Text-to-text unifies tasks. The same block soon eats images."
      ]
    },
    generative: {
      title: "Generative AI",
      years: "2014–2023, merging with language models",
      summary: "The objective mutates from naming a class to producing a sample. Adversaries, latent variables, diffusion, and next-token prediction are different machines for the same shift.",
      inherited: [
        "Deep nets and, after 2017, transformer backbones.",
        "Contrastive representation learning, which CLIP uses to bind image and text."
      ],
      mutated: [
        "A discriminator, a variational bound, or a denoising chain replaces the single classification loss.",
        "Instruction tuning and preference optimization mutate a completion engine into a system that follows a person."
      ],
      opened: [
        "Fluent generation is not grounded generation. The model can sound sure about a fact it does not hold."
      ]
    },
    llm: {
      title: "Large language models",
      years: "2018–2026",
      summary: "Scale, data, and a causal transformer turn next-token training into a general interface. Context becomes a working memory. Alignment teaches the model which completions people want.",
      inherited: [
        "Decoder-only transformers, byte-pair tokens, residual pre-norm blocks.",
        "The generative factorization: each token is conditioned on those before it."
      ],
      mutated: [
        "In-context learning mutates task adaptation: sometimes you show examples instead of changing weights.",
        "LoRA and quantization mutate deployment so a huge model can be specialized and run more cheaply.",
        "Test-time reasoning mutates inference: spend more compute before answering."
      ],
      opened: [
        "Parametric memory is lossy, stale, and hard to audit. Retrieval is the next organ, not a replacement for the model."
      ]
    },
    rag: {
      title: "Retrieval-augmented generation",
      years: "2020–2026",
      summary: "A frozen reader looks up external text and writes an answer conditioned on what it found. Knowledge moves from weights into an index that can be updated, cited, and permissioned.",
      inherited: [
        "Embeddings from the representation era, BM25 from classical search, and a generator from the language-model era.",
        "Attention already knew how to read a supplied context. RAG decides what to put there."
      ],
      mutated: [
        "Memory splits. Slow facts live in a store. The network keeps linguistic and reasoning skill.",
        "Chunking, hybrid search, and reranking mutate a single vector lookup into a pipeline."
      ],
      opened: [
        "Someone still has to choose the query, notice a bad passage, and decide what to do next. That control loop is an agent."
      ]
    },
    agent: {
      title: "Agentic AI",
      years: "2022–2026",
      summary: "The model stops being only a function from prompt to paragraph. It plans, calls tools, reads observations, and continues until a goal is met or a person stops it.",
      inherited: [
        "Transformers supply the policy. RAG supplies memory. Generative sampling supplies the next action text.",
        "Reinforcement learning from preferences supplies a bias toward useful behavior."
      ],
      mutated: [
        "The interface mutates from a chat turn into a loop: perceive, retrieve, plan, act, observe, reflect.",
        "Tools mutate language into state changes: search, code, files, browsers, APIs.",
        "Multi-agent roles mutate one context into a small organization."
      ],
      opened: [
        "The cycle feeds itself. Agents gather new text, tool traces, and preferences that become the next training signal. The weighted neuron is still at the bottom of the stack."
      ]
    }
  };

  var themeBtn = document.getElementById("theme-toggle");
  var navToggle = document.getElementById("nav-toggle");
  var drawer = document.getElementById("drawer");
  var progress = document.querySelector(".progress");
  var searchInputs = document.querySelectorAll("[data-search]");
  var countEl = document.getElementById("result-count");
  var emptyEl = document.getElementById("empty-state");
  var panelTitle = document.getElementById("panel-title");
  var panelYears = document.getElementById("panel-years");
  var panelSummary = document.getElementById("panel-summary");
  var panelInherit = document.getElementById("panel-inherit");
  var panelMutate = document.getElementById("panel-mutate");
  var panelOpen = document.getElementById("panel-open");
  var panelJump = document.getElementById("panel-jump");
  var chips = document.querySelectorAll("[data-filter]");
  var concepts = document.querySelectorAll(".concept");
  var eras = document.querySelectorAll(".era");
  var navLinks = document.querySelectorAll("[data-nav]");
  var cycleButtons = document.querySelectorAll("[data-stage]");
  var activeFilter = "all";
  var query = "";

  function list(el, items) {
    el.replaceChildren();
    items.forEach(function (item) {
      var li = document.createElement("li");
      li.textContent = item;
      el.appendChild(li);
    });
  }

  function showStage(id, shouldScroll) {
    var stage = STAGES[id];
    if (!stage) return;
    panelTitle.textContent = stage.title;
    panelYears.textContent = stage.years;
    panelSummary.textContent = stage.summary;
    list(panelInherit, stage.inherited);
    list(panelMutate, stage.mutated);
    list(panelOpen, stage.opened);
    panelJump.href = "#" + id;
    cycleButtons.forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-stage") === id ? "true" : "false");
    });
    if (shouldScroll) {
      var target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("nn-theme", theme);
    } catch (err) {
      /* storage may be blocked; the toggle still works for this visit */
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#10120f" : "#f3efe6");
    if (themeBtn) {
      var next = theme === "dark" ? "light" : "dark";
      themeBtn.setAttribute("aria-label", "Switch to " + next + " mode");
      themeBtn.querySelector(".theme-label").textContent = theme === "dark" ? "Light" : "Dark";
    }
  }

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function conceptMatches(concept) {
    var filterOk = activeFilter === "all" || concept.getAttribute("data-family") === activeFilter;
    if (!filterOk) return false;
    if (!query) return true;
    return concept.textContent.toLowerCase().indexOf(query) !== -1;
  }

  function applyFilters() {
    var shown = 0;
    concepts.forEach(function (concept) {
      var match = conceptMatches(concept);
      concept.hidden = !match;
      if (match) shown += 1;
    });
    eras.forEach(function (era) {
      var visible = era.querySelectorAll(".concept:not([hidden])").length > 0;
      var intro = (era.getAttribute("data-search") || "").toLowerCase();
      var eraHit = query && intro.indexOf(query) !== -1;
      era.classList.toggle("is-dimmed", !visible && !eraHit);
    });
    if (countEl) {
      countEl.textContent = shown + (shown === 1 ? " concept shown" : " concepts shown");
    }
    if (emptyEl) emptyEl.classList.toggle("is-visible", shown === 0);
  }

  function setQuery(value, source) {
    query = value.trim().toLowerCase();
    searchInputs.forEach(function (input) {
      if (input !== source) input.value = value;
    });
    applyFilters();
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      applyTheme(currentTheme() === "dark" ? "light" : "dark");
    });
  }

  function setDrawer(open) {
    if (!drawer || !navToggle) return;
    drawer.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  }

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      setDrawer(navToggle.getAttribute("aria-expanded") !== "true");
    });
  }

  drawer && drawer.addEventListener("click", function (event) {
    if (event.target.closest("a")) setDrawer(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setDrawer(false);
    if (event.key === "/" && document.activeElement && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
      event.preventDefault();
      var fields = document.querySelectorAll("[data-search]");
      var field = null;
      for (var i = 0; i < fields.length; i++) {
        var rect = fields[i].getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          field = fields[i];
          break;
        }
      }
      if (field) field.focus();
    }
  });

  searchInputs.forEach(function (input) {
    input.addEventListener("input", function () {
      setQuery(input.value, input);
    });
  });

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      activeFilter = chip.getAttribute("data-filter");
      chips.forEach(function (other) {
        other.setAttribute("aria-pressed", other === chip ? "true" : "false");
      });
      applyFilters();
    });
  });

  cycleButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      showStage(btn.getAttribute("data-stage"), true);
    });
  });

  var sections = document.querySelectorAll("main section[id]");
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        navLinks.forEach(function (link) {
          var on = link.getAttribute("href") === "#" + id;
          if (on) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-40% 0px -50% 0px", threshold: 0.01 });
    sections.forEach(function (section) { spy.observe(section); });
  }

  function onScroll() {
    var root = document.documentElement;
    var max = root.scrollHeight - root.clientHeight;
    var ratio = max > 0 ? root.scrollTop / max : 0;
    if (progress) progress.style.transform = "scaleX(" + ratio + ")";
  }

  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  showStage("neuron", false);
  applyFilters();
  applyTheme(currentTheme());

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".evo-film animateMotion").forEach(function (node) {
      if (typeof node.endElement === "function") node.endElement();
    });
  }

  var expandBtn = document.getElementById("expand-all");
  if (expandBtn) {
    expandBtn.addEventListener("click", function () {
      var details = document.querySelectorAll(".concept details");
      var anyClosed = Array.prototype.some.call(details, function (d) { return !d.open; });
      details.forEach(function (d) { d.open = anyClosed; });
      expandBtn.textContent = anyClosed ? "Close the deeper notes" : "Open every deeper note";
    });
  }
})();
