class LightCompanionPanel extends HTMLElement {
  static get properties() {
    return {
      hass: {},
      _text: { state: true },
      _loading: { state: true },
      _logs: { state: true },
      _entities: { state: true },
    };
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._text = "";
    this._loading = false;
    this._logs = [];
    this._entities = [];
  }

  set hass(hass) {
    this._hass = hass;
    this.render();
    if (this._entities.length === 0) {
      this._loadEntities();
    }
  }

  async _loadEntities() {
    try {
      const response = await this._hass.callApi("GET", "lightcompanion/entities");
      this._entities = response.entities || [];
      this._log(`Bereit: ${this._entities.length} Light-Entitäten geladen.`, "info");
      this.render();
    } catch (err) {
      this._log(`Fehler beim Laden der Entitäten: ${err.message}`, "error");
      this.render();
    }
  }

  _log(message, level = "info") {
    this._logs = [{ ts: new Date().toLocaleTimeString(), level, message }, ...this._logs].slice(0, 40);
  }

  async _submit() {
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
      this._log(`❌ Anfrage fehlgeschlagen: ${err.message}`, "error");
    } finally {
      this._loading = false;
      this.render();
      const input = this.shadowRoot?.querySelector("#prompt");
      input?.focus();
    }
  }

  render() {
    if (!this.shadowRoot) return;

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
          <input id="prompt" placeholder="z. B. Disco im Wohnzimmer" value="${this._text.replaceAll('"', '&quot;')}" ${this._loading ? "disabled" : ""} />
          <button id="send" ${this._loading ? "disabled" : ""}>${this._loading ? "Läuft…" : "Senden"}</button>
        </div>
        <div class="hint">💡 Sprachaufnahme über Android-Tastatur/Mikrofon möglich.</div>
        <div class="status"><span class="dot"></span><span>${this._loading ? "LLM interpretiert…" : "Bereit"}</span></div>
        <div class="logs">
          ${this._logs.map((l) => `<div class="log">[${l.ts}] ${l.message}</div>`).join("") || '<div class="log">Noch keine Aktionen.</div>'}
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
