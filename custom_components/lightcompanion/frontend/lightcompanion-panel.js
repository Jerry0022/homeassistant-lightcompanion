const UI_TEXT = {
  en: {
    readyLoaded: (count) => `Ready: ${count} light entities loaded.`,
    loadError: (message) => `Failed to load entities: ${message}`,
    requestFailed: (message) => `Request failed: ${message}`,
    placeholder: "e.g. Disco in the living room",
    send: "Send",
    running: "Running…",
    voiceHint: "Voice input is available via keyboard/app microphone.",
    llmInterpreting: "LLM is interpreting…",
    ready: "Ready",
    noActions: "No actions yet. Describe what you want your lights to do.",
    model: "Model",
    modelSaving: "Saving model…",
    modelSaved: (model) => `Model switched to ${model}.`,
    modelSaveFailed: (message) => `Failed to save model: ${message}`,
    openAiMissing: "OpenAI integration is missing.",
    openIntegrationsCta: "Open Integrations",
    entitiesLoaded: (count) => `${count} entities`,
    processing: "Processing…",
    errorPrefix: "Error",
    actionCard: "Actions",
    service: "service",
    entity: "entity",
  },
  de: {
    readyLoaded: (count) => `Bereit: ${count} Licht-Entitäten geladen.`,
    loadError: (message) => `Fehler beim Laden der Entitäten: ${message}`,
    requestFailed: (message) => `Anfrage fehlgeschlagen: ${message}`,
    placeholder: "z. B. Disco im Wohnzimmer",
    send: "Senden",
    running: "Läuft…",
    voiceHint: "Sprachaufnahme über Tastatur/App-Mikrofon möglich.",
    llmInterpreting: "LLM interpretiert…",
    ready: "Bereit",
    noActions: "Noch keine Aktionen. Beschreibe, was du mit deinen Lichtern machen möchtest.",
    model: "Modell",
    modelSaving: "Modell wird gespeichert…",
    modelSaved: (model) => `Modell gewechselt zu ${model}.`,
    modelSaveFailed: (message) => `Modell speichern fehlgeschlagen: ${message}`,
    openAiMissing: "OpenAI-Integration fehlt.",
    openIntegrationsCta: "Integrationen öffnen",
    entitiesLoaded: (count) => `${count} Entitäten`,
    processing: "Verarbeitung…",
    errorPrefix: "Fehler",
    actionCard: "Aktionen",
    service: "Dienst",
    entity: "Entität",
  },
  fr: {
    readyLoaded: (count) => `Prêt : ${count} entités light chargées.`,
    loadError: (message) => `Échec du chargement des entités : ${message}`,
    requestFailed: (message) => `Échec de la requête : ${message}`,
    placeholder: "ex. Ambiance disco dans le salon",
    send: "Envoyer",
    running: "En cours…",
    voiceHint: "La saisie vocale est disponible via le microphone clavier/app.",
    llmInterpreting: "Le LLM interprète…",
    ready: "Prêt",
    noActions: "Aucune action pour le moment. Décrivez ce que vous voulez faire avec vos lumières.",
    model: "Modèle",
    modelSaving: "Enregistrement du modèle…",
    modelSaved: (model) => `Modèle changé en ${model}.`,
    modelSaveFailed: (message) => `Échec de l'enregistrement du modèle : ${message}`,
    openAiMissing: "L'intégration OpenAI est manquante.",
    openIntegrationsCta: "Ouvrir les intégrations",
    entitiesLoaded: (count) => `${count} entités`,
    processing: "Traitement…",
    errorPrefix: "Erreur",
    actionCard: "Actions",
    service: "service",
    entity: "entité",
  },
  es: {
    readyLoaded: (count) => `Listo: ${count} entidades de luz cargadas.`,
    loadError: (message) => `Error al cargar entidades: ${message}`,
    requestFailed: (message) => `Solicitud fallida: ${message}`,
    placeholder: "p. ej. modo disco en el salón",
    send: "Enviar",
    running: "Procesando…",
    voiceHint: "Entrada por voz disponible mediante micrófono de teclado/app.",
    llmInterpreting: "El LLM está interpretando…",
    ready: "Listo",
    noActions: "Todavía no hay acciones. Describe lo que quieres que hagan tus luces.",
    model: "Modelo",
    modelSaving: "Guardando modelo…",
    modelSaved: (model) => `Modelo cambiado a ${model}.`,
    modelSaveFailed: (message) => `Error al guardar el modelo: ${message}`,
    openAiMissing: "Falta la integración de OpenAI.",
    openIntegrationsCta: "Abrir integraciones",
    entitiesLoaded: (count) => `${count} entidades`,
    processing: "Procesando…",
    errorPrefix: "Error",
    actionCard: "Acciones",
    service: "servicio",
    entity: "entidad",
  },
  it: {
    readyLoaded: (count) => `Pronto: ${count} entità luce caricate.`,
    loadError: (message) => `Errore durante il caricamento delle entità: ${message}`,
    requestFailed: (message) => `Richiesta non riuscita: ${message}`,
    placeholder: "es. modalità disco in soggiorno",
    send: "Invia",
    running: "In esecuzione…",
    voiceHint: "Input vocale disponibile tramite microfono tastiera/app.",
    llmInterpreting: "LLM sta interpretando…",
    ready: "Pronto",
    noActions: "Nessuna azione al momento. Descrivi cosa vuoi fare con le tue luci.",
    model: "Modello",
    modelSaving: "Salvataggio modello…",
    modelSaved: (model) => `Modello cambiato in ${model}.`,
    modelSaveFailed: (message) => `Salvataggio modello fallito: ${message}`,
    openAiMissing: "Integrazione OpenAI mancante.",
    openIntegrationsCta: "Apri integrazioni",
    entitiesLoaded: (count) => `${count} entità`,
    processing: "Elaborazione…",
    errorPrefix: "Errore",
    actionCard: "Azioni",
    service: "servizio",
    entity: "entità",
  },
  "pt-BR": {
    readyLoaded: (count) => `Pronto: ${count} entidades de luz carregadas.`,
    loadError: (message) => `Falha ao carregar entidades: ${message}`,
    requestFailed: (message) => `Falha na solicitação: ${message}`,
    placeholder: "ex.: modo festa na sala",
    send: "Enviar",
    running: "Executando…",
    voiceHint: "Entrada por voz disponível via microfone do teclado/app.",
    llmInterpreting: "LLM está interpretando…",
    ready: "Pronto",
    noActions: "Nenhuma ação ainda. Descreva o que você quer que suas luzes façam.",
    model: "Modelo",
    modelSaving: "Salvando modelo…",
    modelSaved: (model) => `Modelo alterado para ${model}.`,
    modelSaveFailed: (message) => `Falha ao salvar o modelo: ${message}`,
    openAiMissing: "Integração OpenAI ausente.",
    openIntegrationsCta: "Abrir integrações",
    entitiesLoaded: (count) => `${count} entidades`,
    processing: "Processando…",
    errorPrefix: "Erro",
    actionCard: "Ações",
    service: "serviço",
    entity: "entidade",
  },
  nl: {
    readyLoaded: (count) => `Gereed: ${count} licht-entiteiten geladen.`,
    loadError: (message) => `Laden van entiteiten mislukt: ${message}`,
    requestFailed: (message) => `Aanvraag mislukt: ${message}`,
    placeholder: "bijv. disco in de woonkamer",
    send: "Verzenden",
    running: "Bezig…",
    voiceHint: "Spraakinvoer is beschikbaar via toetsenbord-/appmicrofoon.",
    llmInterpreting: "LLM is aan het interpreteren…",
    ready: "Gereed",
    noActions: "Nog geen acties. Beschrijf wat je wilt dat je lampen doen.",
    model: "Model",
    modelSaving: "Model opslaan…",
    modelSaved: (model) => `Model gewijzigd naar ${model}.`,
    modelSaveFailed: (message) => `Model opslaan mislukt: ${message}`,
    openAiMissing: "OpenAI-integratie ontbreekt.",
    openIntegrationsCta: "Integraties openen",
    entitiesLoaded: (count) => `${count} entiteiten`,
    processing: "Verwerking…",
    errorPrefix: "Fout",
    actionCard: "Acties",
    service: "dienst",
    entity: "entiteit",
  },
  pl: {
    readyLoaded: (count) => `Gotowe: załadowano ${count} encji światła.`,
    loadError: (message) => `Błąd ładowania encji: ${message}`,
    requestFailed: (message) => `Żądanie nie powiodło się: ${message}`,
    placeholder: "np. tryb disco w salonie",
    send: "Wyślij",
    running: "Trwa…",
    voiceHint: "Wprowadzanie głosowe dostępne przez mikrofon klawiatury/aplikacji.",
    llmInterpreting: "LLM interpretuje…",
    ready: "Gotowe",
    noActions: "Brak akcji. Opisz, co chcesz, żeby zrobiły Twoje światła.",
    model: "Model",
    modelSaving: "Zapisywanie modelu…",
    modelSaved: (model) => `Model zmieniony na ${model}.`,
    modelSaveFailed: (message) => `Zapisywanie modelu nie powiodło się: ${message}`,
    openAiMissing: "Brak integracji OpenAI.",
    openIntegrationsCta: "Otwórz integracje",
    entitiesLoaded: (count) => `${count} encji`,
    processing: "Przetwarzanie…",
    errorPrefix: "Błąd",
    actionCard: "Akcje",
    service: "usługa",
    entity: "encja",
  },
  ja: {
    readyLoaded: (count) => `準備完了: ライトエンティティを${count}件読み込みました。`,
    loadError: (message) => `エンティティの読み込みに失敗しました: ${message}`,
    requestFailed: (message) => `リクエストに失敗しました: ${message}`,
    placeholder: "例: リビングをディスコ風にして",
    send: "送信",
    running: "実行中…",
    voiceHint: "音声入力はキーボード/アプリのマイクで利用できます。",
    llmInterpreting: "LLM が解釈中…",
    ready: "準備完了",
    noActions: "まだアクションはありません。ライトに何をしてほしいか説明してください。",
    model: "モデル",
    modelSaving: "モデルを保存中…",
    modelSaved: (model) => `モデルを ${model} に切り替えました。`,
    modelSaveFailed: (message) => `モデルの保存に失敗しました: ${message}`,
    openAiMissing: "OpenAI 統合がありません。",
    openIntegrationsCta: "統合を開く",
    entitiesLoaded: (count) => `${count} エンティティ`,
    processing: "処理中…",
    errorPrefix: "エラー",
    actionCard: "アクション",
    service: "サービス",
    entity: "エンティティ",
  },
  "zh-Hans": {
    readyLoaded: (count) => `就绪：已加载 ${count} 个灯光实体。`,
    loadError: (message) => `加载实体失败：${message}`,
    requestFailed: (message) => `请求失败：${message}`,
    placeholder: "例如：把客厅调成迪斯科模式",
    send: "发送",
    running: "运行中…",
    voiceHint: "可通过键盘/应用麦克风进行语音输入。",
    llmInterpreting: "LLM 正在解析…",
    ready: "就绪",
    noActions: "暂无操作。请描述您希望灯光执行的操作。",
    model: "模型",
    modelSaving: "正在保存模型…",
    modelSaved: (model) => `模型已切换到 ${model}。`,
    modelSaveFailed: (message) => `保存模型失败：${message}`,
    openAiMissing: "缺少 OpenAI 集成。",
    openIntegrationsCta: "打开集成",
    entitiesLoaded: (count) => `${count} 个实体`,
    processing: "处理中…",
    errorPrefix: "错误",
    actionCard: "操作",
    service: "服务",
    entity: "实体",
  },
};

class LightCompanionPanel extends HTMLElement {
  static get properties() {
    return {
      hass: {},
      _text: { state: true },
      _loading: { state: true },
      _messages: { state: true },
      _entities: { state: true },
      _lang: { state: true },
      _model: { state: true },
      _availableModels: { state: true },
      _openAiIntegrationAvailable: { state: true },
      _statusLoaded: { state: true },
    };
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._text = "";
    this._loading = false;
    this._messages = [];
    this._entities = [];
    this._lang = "en";
    this._model = "";
    this._availableModels = [];
    this._openAiIntegrationAvailable = null;
    this._statusLoaded = false;
    this._rendered = false;
    this._msgIdCounter = 0;
  }

  set hass(hass) {
    this._hass = hass;
    const newLang = this._resolveLanguage(hass?.language);
    const langChanged = newLang !== this._lang;
    this._lang = newLang;

    if (!this._rendered) {
      this.render();
      // Defer data loading until after render() has written the shadow DOM,
      // so that DOM-querying helpers (_updateModelSelector, _addMessage, etc.)
      // always find their elements.
      Promise.resolve().then(() => {
        this._loadStatus();
        this._loadEntities();
        this._loadOptions();
      });
    } else if (langChanged) {
      this._updateStaticText();
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
    return { ...UI_TEXT.en, ...(UI_TEXT[this._lang] || {}) };
  }

  _nextId() {
    return ++this._msgIdCounter;
  }

  // ── Data loaders ────────────────────────────────────────────────────────────

  async _loadStatus() {
    try {
      const response = await this._hass.callApi("GET", "lightcompanion/status");
      this._openAiIntegrationAvailable = !!response.openai_integration_available;
      this._statusLoaded = true;
    } catch (err) {
      this._statusLoaded = true;
      this._openAiIntegrationAvailable = null;
      this._addMessage({ type: "error", text: `Failed to load status: ${err.message}` });
    }
    this._updateWarning();
    this._updateInput();
  }

  async _loadEntities() {
    const t = this._t();
    try {
      const response = await this._hass.callApi("GET", "lightcompanion/entities");
      this._entities = response.entities || [];
      this._updateStatus();
      // Show a welcome/ready message in the chat body so the user knows
      // the integration is active and how many entities were found.
      this._addMessage({ type: "system", text: t.readyLoaded(this._entities.length) });
    } catch (err) {
      this._addMessage({ type: "error", text: t.loadError(err.message) });
    }
  }

  async _loadOptions() {
    try {
      const response = await this._hass.callApi("GET", "lightcompanion/options");
      this._model = response.model || "";
      this._availableModels = response.available_models || [];
      this._updateModelSelector();
    } catch (_err) {
      // Options are optional.
    }
  }

  async _changeModel(nextModel) {
    const t = this._t();
    if (!nextModel || this._loading || nextModel === this._model) return;

    this._addMessage({ type: "system", text: t.modelSaving });
    try {
      const response = await this._hass.callApi("POST", "lightcompanion/options", { model: nextModel });
      this._model = response.model || nextModel;
      this._availableModels = response.available_models || this._availableModels;
      this._addMessage({ type: "system", text: t.modelSaved(this._model) });
      this._updateModelSelector();
    } catch (err) {
      this._addMessage({ type: "error", text: t.modelSaveFailed(err.message) });
    }
  }

  async _submit() {
    const t = this._t();
    const text = this._text.trim();
    if (!text || this._loading || this._openAiIntegrationAvailable === false) return;

    // Add user message
    this._addMessage({ type: "user", text });
    this._text = "";
    this._loading = true;
    this._updateInput();
    this._updateStatus();

    // Show loading bubble
    const loadingId = this._nextId();
    this._showLoadingBubble(loadingId);

    try {
      const response = await this._hass.callApi("POST", "lightcompanion/process", { text });
      this._removeLoadingBubble(loadingId);
      this._addMessage({
        type: "assistant",
        text: response.summary || "",
        actions: response.results || [],
      });
    } catch (err) {
      this._removeLoadingBubble(loadingId);
      this._addMessage({ type: "error", text: t.requestFailed(err.message) });
    } finally {
      this._loading = false;
      this._updateInput();
      this._updateStatus();
      const input = this.shadowRoot?.querySelector("#prompt");
      if (input) setTimeout(() => input.focus(), 0);
    }
  }

  // ── DOM update helpers ───────────────────────────────────────────────────────

  _addMessage(msg) {
    const message = {
      id: this._nextId(),
      type: msg.type,
      text: msg.text,
      timestamp: new Date(),
      actions: msg.actions || [],
    };
    this._messages.push(message);

    // Remove empty-state placeholder if present
    const empty = this.shadowRoot?.querySelector(".chat-empty");
    if (empty) empty.remove();

    const chatBody = this.shadowRoot?.querySelector(".chat-body");
    if (chatBody) {
      const el = this._createMessageEl(message);
      chatBody.appendChild(el);
      this._scrollToBottom();
    }
  }

  _showLoadingBubble(id) {
    const chatBody = this.shadowRoot?.querySelector(".chat-body");
    if (!chatBody) return;
    const el = document.createElement("div");
    el.className = "msg msg-assistant msg-loading";
    el.dataset.loadingId = id;
    el.innerHTML = `
      <div class="bubble bubble-assistant">
        <span class="loading-dots"><span></span><span></span><span></span></span>
      </div>`;
    chatBody.appendChild(el);
    this._scrollToBottom();
  }

  _removeLoadingBubble(id) {
    const el = this.shadowRoot?.querySelector(`[data-loading-id="${id}"]`);
    if (el) el.remove();
  }

  _updateStatus() {
    const t = this._t();
    const dot = this.shadowRoot?.querySelector(".status-dot");
    const statusText = this.shadowRoot?.querySelector(".status-text");
    const entityCount = this.shadowRoot?.querySelector(".entity-count");

    if (dot) dot.className = `status-dot ${this._loading ? "status-dot--processing" : "status-dot--ready"}`;
    if (statusText) statusText.textContent = this._loading ? t.llmInterpreting : t.ready;
    if (entityCount) entityCount.textContent = this._entities.length > 0 ? t.entitiesLoaded(this._entities.length) : "";
  }

  _updateInput() {
    const t = this._t();
    const canUse = this._openAiIntegrationAvailable !== false;
    const disabled = this._loading || !canUse;

    const input = this.shadowRoot?.querySelector("#prompt");
    const sendBtn = this.shadowRoot?.querySelector("#send");

    if (input) {
      input.disabled = disabled;
      input.value = this._text;
      input.placeholder = t.placeholder;
    }
    if (sendBtn) {
      sendBtn.disabled = disabled;
      sendBtn.className = `send-btn${this._loading ? " send-btn--loading" : ""}`;
      sendBtn.setAttribute("aria-label", this._loading ? t.running : t.send);
      sendBtn.innerHTML = this._loading ? this._spinnerSVG() : this._sendSVG();
    }
  }

  _updateWarning() {
    const t = this._t();
    const existing = this.shadowRoot?.querySelector(".openai-warning");
    const container = this.shadowRoot?.querySelector(".warning-container");
    if (!container) return;

    if (this._openAiIntegrationAvailable === false) {
      if (!existing) {
        const warn = document.createElement("div");
        warn.className = "openai-warning";
        warn.innerHTML = `
          <span class="warning-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 2L1 21h22L12 2zm0 3.5L20.5 19h-17L12 5.5zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z"/>
            </svg>
          </span>
          <span class="warning-text">${t.openAiMissing || UI_TEXT.en.openAiMissing}</span>
          <button id="open-integrations" class="cta-btn">${t.openIntegrationsCta || UI_TEXT.en.openIntegrationsCta}</button>`;
        container.appendChild(warn);
        warn.querySelector("#open-integrations")?.addEventListener("click", () => {
          const path = "/config/integrations/dashboard";
          if (this._hass?.navigate) {
            this._hass.navigate(path);
            return;
          }
          window.location.assign(path);
        });
      }
    } else {
      if (existing) existing.remove();
    }
  }

  _updateModelSelector() {
    const modelSelect = this.shadowRoot?.querySelector("#model");
    if (!modelSelect) return;
    const models = this._availableModels || [];
    modelSelect.disabled = models.length === 0 || this._loading;
    // Rebuild options only if the list changed
    const current = Array.from(modelSelect.options).map((o) => o.value);
    const same = current.length === models.length && models.every((m, i) => m === current[i]);
    if (!same) {
      modelSelect.innerHTML = models
        .map((m) => `<option value="${m}"${m === this._model ? " selected" : ""}>${m}</option>`)
        .join("");
    } else {
      modelSelect.value = this._model;
    }
  }

  _updateStaticText() {
    const t = this._t();
    const voiceHint = this.shadowRoot?.querySelector(".voice-hint");
    if (voiceHint) voiceHint.textContent = t.voiceHint;
    this._updateStatus();
    this._updateInput();
    const modelLabel = this.shadowRoot?.querySelector(".model-label");
    if (modelLabel) modelLabel.textContent = t.model;
  }

  _scrollToBottom() {
    const chatBody = this.shadowRoot?.querySelector(".chat-body");
    if (chatBody) {
      requestAnimationFrame(() => {
        chatBody.scrollTop = chatBody.scrollHeight;
      });
    }
  }

  // ── Element builders ─────────────────────────────────────────────────────────

  _createMessageEl(msg) {
    const t = this._t();
    const wrap = document.createElement("div");
    const isUser = msg.type === "user";
    const isError = msg.type === "error";
    const isSystem = msg.type === "system";
    const isAssistant = msg.type === "assistant";

    wrap.className = `msg msg-${msg.type}`;
    wrap.dataset.msgId = msg.id;

    const time = msg.timestamp
      ? msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : "";

    let bubbleContent = "";

    if (isError) {
      bubbleContent = `
        <div class="bubble bubble-error">
          <span class="error-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
          </span>
          <span class="bubble-text">${this._escapeHtml(msg.text)}</span>
        </div>`;
    } else if (isSystem) {
      bubbleContent = `<div class="bubble bubble-system"><span class="bubble-text">${this._escapeHtml(msg.text)}</span></div>`;
    } else if (isUser) {
      bubbleContent = `<div class="bubble bubble-user"><span class="bubble-text">${this._escapeHtml(msg.text)}</span></div>`;
    } else if (isAssistant) {
      const actionsHtml = this._buildActionsHtml(msg.actions, t);
      bubbleContent = `
        <div class="bubble bubble-assistant">
          <span class="assistant-icon" aria-hidden="true">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
              <rect x="6" y="10" width="52" height="40" rx="18" fill="currentColor" fill-opacity="0.25"/>
              <path d="M24 29c0-4.8 3.7-8.5 8.5-8.5S41 24.2 41 29c0 3-1.4 5-3.7 6.8-.8.6-1.3 1.6-1.3 2.7h-7c0-1.1-.5-2.1-1.3-2.7C25.4 34 24 32 24 29Z" fill="currentColor"/>
              <rect x="29" y="40.5" width="7" height="2.8" rx="1.4" fill="currentColor"/>
            </svg>
          </span>
          <div class="bubble-inner">
            <span class="bubble-text">${this._escapeHtml(msg.text)}</span>
            ${actionsHtml}
          </div>
        </div>`;
    }

    const alignClass = isUser ? "msg-right" : "msg-left";
    const timeHtml = time
      ? `<div class="msg-time ${isUser ? "msg-time--right" : ""}">${time}</div>`
      : "";

    wrap.innerHTML = `
      <div class="${alignClass}">
        ${bubbleContent}
        ${timeHtml}
      </div>`;

    return wrap;
  }

  _buildActionsHtml(actions, t) {
    if (!actions || actions.length === 0) return "";
    const rows = actions
      .map((r) => {
        const data = r.service_data ? JSON.stringify(r.service_data) : "{}";
        return `
          <div class="action-row">
            <span class="chip chip-entity" title="${t.entity}">${this._escapeHtml(r.entity_id || "")}</span>
            <span class="chip chip-service" title="${t.service}">${this._escapeHtml(r.service || "")}</span>
            <span class="chip chip-data">${this._escapeHtml(data)}</span>
          </div>`;
      })
      .join("");
    return `<div class="action-card"><div class="action-card-title">${t.actionCard}</div>${rows}</div>`;
  }

  _escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  _sendSVG() {
    return `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>`;
  }

  _spinnerSVG() {
    return `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true" class="spin-icon"><circle cx="12" cy="12" r="9" stroke-opacity="0.25"/><path d="M12 3a9 9 0 0 1 9 9" /></svg>`;
  }

  // ── Initial render (called once) ─────────────────────────────────────────────

  render() {
    if (!this.shadowRoot || this._rendered) return;
    this._rendered = true;
    const t = this._t();

    this.shadowRoot.innerHTML = `
      <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :host {
          display: flex;
          flex-direction: column;
          align-items: center;
          /* Use 100% so we fill only the space the HA shell allocates to the
             panel (the shell already subtracts its 64px toolbar). Avoid
             min-height/100vh which causes overflow inside the HA app frame. */
          height: 100%;
          overflow: hidden;
          padding: 16px;
          background: var(--primary-background-color, #111318);
          color: var(--primary-text-color, #e1e2e8);
        }

        /* ── Layout ── */
        .panel-wrap {
          width: 100%;
          max-width: 800px;
          display: flex;
          flex-direction: column;
          gap: 0;
          /* Fill the host's allocated height (100%) minus host's own padding
             (16px top + 16px bottom = 32px). This makes the flex children
             correctly fill the available panel area. */
          height: calc(100% - 32px);
        }

        /* ── Header card ── */
        .header-card {
          background: var(--card-background-color, #1c1e26);
          border-radius: 20px 20px 0 0;
          padding: 18px 20px 14px;
          border-bottom: 1px solid var(--divider-color, rgba(255,255,255,0.08));
        }
        .header-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .brand-icon {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          background: color-mix(in srgb, var(--primary-color, #6750a4) 18%, transparent);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .brand-icon svg { width: 28px; height: 28px; }
        .brand-title { font-weight: 700; font-size: 16px; line-height: 1.2; }
        .brand-subtitle { font-size: 12px; color: var(--secondary-text-color, #9e9e9e); margin-top: 2px; }

        /* model selector */
        .model-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .model-label {
          font-size: 12px;
          color: var(--secondary-text-color, #9e9e9e);
          white-space: nowrap;
        }
        .model-select {
          padding: 5px 10px;
          border-radius: 8px;
          border: 1px solid var(--divider-color, rgba(255,255,255,0.12));
          background: var(--secondary-background-color, #23252f);
          color: var(--primary-text-color, #e1e2e8);
          font-size: 13px;
          cursor: pointer;
          max-width: 200px;
        }
        .model-select:disabled { opacity: 0.5; cursor: not-allowed; }

        /* status bar */
        .status-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 10px;
          flex-wrap: wrap;
        }
        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
          transition: background 0.3s;
        }
        .status-dot--ready { background: #22c55e; }
        .status-dot--processing {
          background: #f59e0b;
          animation: pulse-dot 1s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .status-text {
          font-size: 12px;
          color: var(--secondary-text-color, #9e9e9e);
        }
        .status-sep {
          font-size: 12px;
          color: var(--divider-color, rgba(255,255,255,0.2));
        }
        .entity-count {
          font-size: 12px;
          color: var(--secondary-text-color, #9e9e9e);
        }
        .voice-hint {
          font-size: 11px;
          color: var(--secondary-text-color, #9e9e9e);
          opacity: 0.7;
          margin-left: auto;
        }

        /* ── Warning container ── */
        .warning-container { padding: 0 20px; }
        .openai-warning {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          background: color-mix(in srgb, var(--error-color, #f44336) 12%, transparent);
          border: 1px solid color-mix(in srgb, var(--error-color, #f44336) 30%, transparent);
          border-radius: 12px;
          margin: 8px 0;
          flex-wrap: wrap;
        }
        .warning-icon { color: var(--error-color, #f44336); display: flex; }
        .warning-text { font-size: 13px; flex: 1; }
        .cta-btn {
          padding: 6px 14px;
          border-radius: 8px;
          border: none;
          background: var(--primary-color, #6750a4);
          color: white;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
        }
        .cta-btn:hover { opacity: 0.9; }

        /* ── Chat body ── */
        .chat-card {
          background: var(--card-background-color, #1c1e26);
          flex: 1;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .chat-body {
          flex: 1;
          overflow-y: auto;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          scroll-behavior: smooth;
        }
        .chat-body::-webkit-scrollbar { width: 6px; }
        .chat-body::-webkit-scrollbar-thumb {
          background: var(--divider-color, rgba(255,255,255,0.1));
          border-radius: 3px;
        }
        .chat-empty {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--secondary-text-color, #9e9e9e);
          font-size: 14px;
          text-align: center;
          padding: 32px;
          opacity: 0.7;
        }

        /* ── Messages ── */
        .msg { animation: msg-in 0.2s ease-out; margin-bottom: 4px; }
        @keyframes msg-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .msg-right { display: flex; flex-direction: column; align-items: flex-end; }
        .msg-left  { display: flex; flex-direction: column; align-items: flex-start; }

        .bubble {
          max-width: min(80%, 560px);
          padding: 10px 14px;
          border-radius: 16px;
          font-size: 14px;
          line-height: 1.5;
          word-break: break-word;
        }
        .bubble-user {
          background: var(--primary-color, #6750a4);
          color: white;
          border-bottom-right-radius: 4px;
        }
        .bubble-assistant {
          background: var(--secondary-background-color, #23252f);
          color: var(--primary-text-color, #e1e2e8);
          border-bottom-left-radius: 4px;
          display: flex;
          gap: 8px;
          align-items: flex-start;
        }
        .assistant-icon {
          color: var(--primary-color, #6750a4);
          flex-shrink: 0;
          margin-top: 2px;
          display: flex;
        }
        .bubble-inner { flex: 1; min-width: 0; }
        .bubble-error {
          background: color-mix(in srgb, var(--error-color, #f44336) 14%, var(--secondary-background-color, #23252f));
          color: var(--error-color, #f44336);
          border: 1px solid color-mix(in srgb, var(--error-color, #f44336) 30%, transparent);
          border-bottom-left-radius: 4px;
          display: flex;
          gap: 8px;
          align-items: flex-start;
        }
        .error-icon { flex-shrink: 0; margin-top: 2px; display: flex; }
        .bubble-system {
          background: transparent;
          color: var(--secondary-text-color, #9e9e9e);
          font-size: 12px;
          padding: 4px 0;
          font-style: italic;
        }
        .bubble-text { display: block; }

        .msg-time {
          font-size: 10px;
          color: var(--secondary-text-color, #9e9e9e);
          opacity: 0.6;
          margin-top: 3px;
          padding: 0 2px;
        }
        .msg-time--right { text-align: right; }

        /* ── Action cards ── */
        .action-card {
          margin-top: 8px;
          padding: 10px 12px;
          background: color-mix(in srgb, var(--primary-color, #6750a4) 8%, var(--card-background-color, #1c1e26));
          border-radius: 10px;
          border: 1px solid color-mix(in srgb, var(--primary-color, #6750a4) 20%, transparent);
        }
        .action-card-title {
          font-size: 11px;
          font-weight: 600;
          color: var(--primary-color, #6750a4);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 6px;
        }
        .action-row {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-bottom: 4px;
        }
        .action-row:last-child { margin-bottom: 0; }
        .chip {
          display: inline-flex;
          align-items: center;
          padding: 2px 8px;
          border-radius: 20px;
          font-size: 11px;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          white-space: nowrap;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .chip-entity {
          background: color-mix(in srgb, var(--primary-color, #6750a4) 20%, transparent);
          color: var(--primary-color, #6750a4);
        }
        .chip-service {
          background: color-mix(in srgb, #22c55e 18%, transparent);
          color: #22c55e;
        }
        .chip-data {
          background: var(--secondary-background-color, #23252f);
          color: var(--secondary-text-color, #9e9e9e);
          border: 1px solid var(--divider-color, rgba(255,255,255,0.08));
          max-width: 260px;
        }

        /* ── Loading dots ── */
        .msg-loading .bubble-assistant { min-width: 64px; }
        .loading-dots {
          display: flex;
          gap: 5px;
          align-items: center;
          padding: 4px 2px;
        }
        .loading-dots span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--secondary-text-color, #9e9e9e);
          animation: dot-bounce 1.2s ease-in-out infinite;
        }
        .loading-dots span:nth-child(1) { animation-delay: 0s; }
        .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
        .loading-dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-5px); opacity: 1; }
        }

        /* ── Input bar ── */
        .input-card {
          background: var(--card-background-color, #1c1e26);
          border-radius: 0 0 20px 20px;
          padding: 14px 20px;
          border-top: 1px solid var(--divider-color, rgba(255,255,255,0.08));
        }
        .input-row {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .prompt-input {
          flex: 1;
          padding: 12px 16px;
          border-radius: 24px;
          border: 1.5px solid var(--divider-color, rgba(255,255,255,0.12));
          background: var(--secondary-background-color, #23252f);
          color: var(--primary-text-color, #e1e2e8);
          font-size: 15px;
          transition: border-color 0.2s;
          outline: none;
        }
        .prompt-input:focus {
          border-color: var(--primary-color, #6750a4);
        }
        .prompt-input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .send-btn {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          border: none;
          background: var(--primary-color, #6750a4);
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: opacity 0.2s, transform 0.1s;
        }
        .send-btn:hover:not(:disabled) { opacity: 0.9; transform: scale(1.05); }
        .send-btn:active:not(:disabled) { transform: scale(0.97); }
        .send-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }
        .send-btn--loading { opacity: 0.8; }
        .spin-icon { animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Responsive ── */
        @media (max-width: 480px) {
          :host { padding: 8px; }
          /* On mobile the host padding shrinks to 8px × 2 = 16px total */
          .panel-wrap { height: calc(100% - 16px); }
          .bubble { max-width: 92%; }
          .voice-hint { display: none; }
          .header-card, .input-card { padding: 12px 14px; }
          .chat-body { padding: 12px 14px; }
        }
      </style>

      <div class="panel-wrap" role="main">

        <!-- Header -->
        <div class="header-card">
          <div class="header-top">
            <div class="brand">
              <div class="brand-icon" aria-hidden="true">
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="10" width="52" height="40" rx="18" fill="var(--primary-color)" fill-opacity="0.22"/>
                  <path d="M24 29c0-4.8 3.7-8.5 8.5-8.5S41 24.2 41 29c0 3-1.4 5-3.7 6.8-.8.6-1.3 1.6-1.3 2.7h-7c0-1.1-.5-2.1-1.3-2.7C25.4 34 24 32 24 29Z" fill="var(--primary-color)"/>
                  <rect x="29" y="40.5" width="7" height="2.8" rx="1.4" fill="var(--primary-color)"/>
                  <circle cx="17" cy="23" r="2" fill="var(--warning-color, #f5a623)"/>
                  <circle cx="48" cy="20" r="1.8" fill="var(--warning-color, #f5a623)"/>
                </svg>
              </div>
              <div>
                <div class="brand-title">Light Companion</div>
                <div class="brand-subtitle">AI Light Bubble Service</div>
              </div>
            </div>

            <div class="model-row">
              <label class="model-label" for="model">${t.model}</label>
              <select id="model" class="model-select" disabled aria-label="${t.model}"></select>
            </div>
          </div>

          <div class="status-bar" role="status" aria-live="polite">
            <span class="status-dot status-dot--ready" aria-hidden="true"></span>
            <span class="status-text">${t.ready}</span>
            <span class="status-sep" aria-hidden="true">·</span>
            <span class="entity-count"></span>
            <span class="voice-hint" aria-hidden="true">${t.voiceHint}</span>
          </div>
        </div>

        <!-- Warning container (dynamically populated) -->
        <div class="warning-container"></div>

        <!-- Chat area -->
        <div class="chat-card">
          <div class="chat-body" role="log" aria-live="polite" aria-label="Chat messages">
            <div class="chat-empty">${t.noActions}</div>
          </div>
        </div>

        <!-- Input bar -->
        <div class="input-card">
          <div class="input-row">
            <input
              id="prompt"
              class="prompt-input"
              type="text"
              placeholder="${t.placeholder}"
              autocomplete="off"
              autocorrect="off"
              spellcheck="false"
              aria-label="${t.placeholder}"
            />
            <button id="send" class="send-btn" aria-label="${t.send}">
              ${this._sendSVG()}
            </button>
          </div>
        </div>

      </div>
    `;

    // Attach events
    const input = this.shadowRoot.querySelector("#prompt");
    const sendBtn = this.shadowRoot.querySelector("#send");
    const modelSelect = this.shadowRoot.querySelector("#model");

    input?.addEventListener("input", (ev) => {
      this._text = ev.target.value;
    });
    input?.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter") {
        ev.preventDefault();
        this._submit();
      }
    });
    sendBtn?.addEventListener("click", () => this._submit());
    modelSelect?.addEventListener("change", (ev) => this._changeModel(ev.target.value));

    setTimeout(() => input?.focus(), 0);
  }
}

customElements.define("lightcompanion-panel", LightCompanionPanel);
