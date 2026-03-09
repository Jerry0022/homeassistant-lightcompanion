const UI_TEXT = {
  en: {
    readyLoaded: (count) => `Ready: ${count} light entities loaded.`,
    loadError: (message) => `Failed to load entities: ${message}`,
    requestFailed: (message) => `❌ Request failed: ${message}`,
    placeholder: "e.g. Disco in the living room",
    send: "Send",
    running: "Running…",
    voiceHint: "💡 Voice input is available via keyboard/app microphone.",
    llmInterpreting: "LLM is interpreting…",
    ready: "Ready",
    noActions: "No actions yet.",
  },
  de: {
    readyLoaded: (count) => `Bereit: ${count} Licht-Entitäten geladen.`,
    loadError: (message) => `Fehler beim Laden der Entitäten: ${message}`,
    requestFailed: (message) => `❌ Anfrage fehlgeschlagen: ${message}`,
    placeholder: "z. B. Disco im Wohnzimmer",
    send: "Senden",
    running: "Läuft…",
    voiceHint: "💡 Sprachaufnahme über Tastatur/App-Mikrofon möglich.",
    llmInterpreting: "LLM interpretiert…",
    ready: "Bereit",
    noActions: "Noch keine Aktionen.",
  },
  fr: {
    readyLoaded: (count) => `Prêt : ${count} entités light chargées.`,
    loadError: (message) => `Échec du chargement des entités : ${message}`,
    requestFailed: (message) => `❌ Échec de la requête : ${message}`,
    placeholder: "ex. Ambiance disco dans le salon",
    send: "Envoyer",
    running: "En cours…",
    voiceHint: "💡 La saisie vocale est disponible via le microphone clavier/app.",
    llmInterpreting: "Le LLM interprète…",
    ready: "Prêt",
    noActions: "Aucune action pour le moment.",
  },
  es: {
    readyLoaded: (count) => `Listo: ${count} entidades de luz cargadas.`,
    loadError: (message) => `Error al cargar entidades: ${message}`,
    requestFailed: (message) => `❌ Solicitud fallida: ${message}`,
    placeholder: "p. ej. modo disco en el salón",
    send: "Enviar",
    running: "Procesando…",
    voiceHint: "💡 Entrada por voz disponible mediante micrófono de teclado/app.",
    llmInterpreting: "El LLM está interpretando…",
    ready: "Listo",
    noActions: "Todavía no hay acciones.",
  },
  it: {
    readyLoaded: (count) => `Pronto: ${count} entità luce caricate.`,
    loadError: (message) => `Errore durante il caricamento delle entità: ${message}`,
    requestFailed: (message) => `❌ Richiesta non riuscita: ${message}`,
    placeholder: "es. modalità disco in soggiorno",
    send: "Invia",
    running: "In esecuzione…",
    voiceHint: "💡 Input vocale disponibile tramite microfono tastiera/app.",
    llmInterpreting: "LLM sta interpretando…",
    ready: "Pronto",
    noActions: "Nessuna azione al momento.",
  },
  "pt-BR": {
    readyLoaded: (count) => `Pronto: ${count} entidades de luz carregadas.`,
    loadError: (message) => `Falha ao carregar entidades: ${message}`,
    requestFailed: (message) => `❌ Falha na solicitação: ${message}`,
    placeholder: "ex.: modo festa na sala",
    send: "Enviar",
    running: "Executando…",
    voiceHint: "💡 Entrada por voz disponível via microfone do teclado/app.",
    llmInterpreting: "LLM está interpretando…",
    ready: "Pronto",
    noActions: "Nenhuma ação ainda.",
  },
  nl: {
    readyLoaded: (count) => `Gereed: ${count} licht-entiteiten geladen.`,
    loadError: (message) => `Laden van entiteiten mislukt: ${message}`,
    requestFailed: (message) => `❌ Aanvraag mislukt: ${message}`,
    placeholder: "bijv. disco in de woonkamer",
    send: "Verzenden",
    running: "Bezig…",
    voiceHint: "💡 Spraakinvoer is beschikbaar via toetsenbord-/appmicrofoon.",
    llmInterpreting: "LLM is aan het interpreteren…",
    ready: "Gereed",
    noActions: "Nog geen acties.",
  },
  pl: {
    readyLoaded: (count) => `Gotowe: załadowano ${count} encji światła.`,
    loadError: (message) => `Błąd ładowania encji: ${message}`,
    requestFailed: (message) => `❌ Żądanie nie powiodło się: ${message}`,
    placeholder: "np. tryb disco w salonie",
    send: "Wyślij",
    running: "Trwa…",
    voiceHint: "💡 Wprowadzanie głosowe dostępne przez mikrofon klawiatury/aplikacji.",
    llmInterpreting: "LLM interpretuje…",
    ready: "Gotowe",
    noActions: "Brak akcji.",
  },
  ja: {
    readyLoaded: (count) => `準備完了: ライトエンティティを${count}件読み込みました。`,
    loadError: (message) => `エンティティの読み込みに失敗しました: ${message}`,
    requestFailed: (message) => `❌ リクエストに失敗しました: ${message}`,
    placeholder: "例: リビングをディスコ風にして",
    send: "送信",
    running: "実行中…",
    voiceHint: "💡 音声入力はキーボード/アプリのマイクで利用できます。",
    llmInterpreting: "LLM が解釈中…",
    ready: "準備完了",
    noActions: "まだアクションはありません。",
  },
  "zh-Hans": {
    readyLoaded: (count) => `就绪：已加载 ${count} 个灯光实体。`,
    loadError: (message) => `加载实体失败：${message}`,
    requestFailed: (message) => `❌ 请求失败：${message}`,
    placeholder: "例如：把客厅调成迪斯科模式",
    send: "发送",
    running: "运行中…",
    voiceHint: "💡 可通过键盘/应用麦克风进行语音输入。",
    llmInterpreting: "LLM 正在解析…",
    ready: "就绪",
    noActions: "暂无操作。",
  },
};

class LightCompanionPanel extends HTMLElement {
  static get properties() {
    return {
      hass: {},
      _text: { state: true },
      _loading: { state: true },
      _logs: { state: true },
      _entities: { state: true },
      _lang: { state: true },
    };
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._text = "";
    this._loading = false;
    this._logs = [];
    this._entities = [];
    this._lang = "en";
  }

  set hass(hass) {
    this._hass = hass;
    this._lang = this._resolveLanguage(hass?.language);
    this.render();
    if (this._entities.length === 0) {
      this._loadEntities();
    }
  }

  _resolveLanguage(language) {
    if (!language) return "en";
    if (UI_TEXT[language]) return language;
    const baseLanguage = language.split("-")[0];
    if (UI_TEXT[baseLanguage]) return baseLanguage;
    return "en";
  }

  _t() {
    return UI_TEXT[this._lang] || UI_TEXT.en;
  }

  async _loadEntities() {
    const t = this._t();
    try {
      const response = await this._hass.callApi("GET", "lightcompanion/entities");
      this._entities = response.entities || [];
      this._log(t.readyLoaded(this._entities.length), "info");
      this.render();
    } catch (err) {
      this._log(t.loadError(err.message), "error");
      this.render();
    }
  }

  _log(message, level = "info") {
    this._logs = [{ ts: new Date().toLocaleTimeString(), level, message }, ...this._logs].slice(0, 40);
  }

  async _submit() {
    const t = this._t();
    if (!this._text.trim() || this._loading) return;

    this._loading = true;
    this._log(`🗣️ ${this._text}`, "user");
    this.render();

    try {
      const response = await this._hass.callApi("POST", "lightcompanion/process", { text: this._text });
      this._log(`✅ ${response.summary}`, "success");
      (response.results || []).forEach((r) => {
        this._log(`• ${r.entity_id}: ${r.service} ${JSON.stringify(r.service_data)}`, "info");
      });
      this._text = "";
    } catch (err) {
      this._log(t.requestFailed(err.message), "error");
    } finally {
      this._loading = false;
      this.render();
      const input = this.shadowRoot?.querySelector("#prompt");
      input?.focus();
    }
  }

  render() {
    if (!this.shadowRoot) return;
    const t = this._t();

    this.shadowRoot.innerHTML = `
      <style>
        :host { display:block; padding:24px; color: var(--primary-text-color); }
        .card { background: var(--card-background-color); border-radius: 16px; padding: 18px; box-shadow: var(--ha-card-box-shadow); }
        .top { display:flex; gap:10px; align-items:center; }
        input { flex:1; padding:14px 16px; border-radius:12px; border: 1px solid var(--divider-color); background: var(--secondary-background-color); color: var(--primary-text-color); font-size:16px; }
        input:focus { outline: 2px solid var(--primary-color); }
        button { border:none; border-radius: 12px; padding: 0 18px; height: 46px; background: var(--primary-color); color: white; font-weight:600; cursor:pointer; }
        button:disabled { opacity:0.55; cursor:not-allowed; }
        .hint { margin-top:8px; color: var(--secondary-text-color); font-size: 13px; }
        .status { margin-top:14px; display:flex; gap:10px; font-size:13px; color:var(--secondary-text-color); }
        .dot { width:9px; height:9px; border-radius:50%; background:${this._loading ? "#f5a623" : "#23c552"}; display:inline-block; }
        .logs { margin-top:16px; max-height: 55vh; overflow:auto; background: var(--secondary-background-color); border-radius: 12px; padding: 10px; }
        .log { padding:8px 10px; border-bottom: 1px solid var(--divider-color); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; }
        .log:last-child { border-bottom:none; }
      </style>
      <div class="card">
        <div class="top">
          <input id="prompt" placeholder="${t.placeholder}" value="${this._text.replaceAll('"', '&quot;')}" ${this._loading ? "disabled" : ""} />
          <button id="send" ${this._loading ? "disabled" : ""}>${this._loading ? t.running : t.send}</button>
        </div>
        <div class="hint">${t.voiceHint}</div>
        <div class="status"><span class="dot"></span><span>${this._loading ? t.llmInterpreting : t.ready}</span></div>
        <div class="logs">
          ${this._logs.map((l) => `<div class="log">[${l.ts}] ${l.message}</div>`).join("") || `<div class="log">${t.noActions}</div>`}
        </div>
      </div>
    `;

    const input = this.shadowRoot.querySelector("#prompt");
    const send = this.shadowRoot.querySelector("#send");

    input?.addEventListener("input", (ev) => {
      this._text = ev.target.value;
    });

    input?.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter") {
        ev.preventDefault();
        this._submit();
      }
    });

    send?.addEventListener("click", () => this._submit());

    setTimeout(() => {
      if (!this._loading) input?.focus();
    }, 0);
  }
}

customElements.define("lightcompanion-panel", LightCompanionPanel);
