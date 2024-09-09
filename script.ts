import { SYSTEM_4 } from './src/prompts';
import Groq from "groq-sdk";

import { html, css, LitElement } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';

// import '@vaadin/button';
// import '@vaadin/icon';
// import '@vaadin/icons';
// import '@vaadin/tabs';
// import '@vaadin/tabsheet';


const SYSTEM = {
  role: 'system',
  content: SYSTEM_4,
};

const SYSTEM2 = {
  role: 'system',
  content:
    'Give answer to the questions using the provided text. Treat redacted information (like Male_1 or Location_2) as a valid information.',
};

let apiKeyInput: HTMLInputElement;

async function callChatGPT(text, system = SYSTEM) {
  const request = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKeyInput.value}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        system,
        {
          role: 'user',
          content: text,
        },
      ],
      top_p: 1,
    }),
  });
  const data = await request.json();
  console.log('Data', data);
  return data.choices[0].message.content;
}

async function getGroqChatCompletion(text, system) {
  const groq = new Groq({ apiKey: groqApiKeyInput.value });
  return groq.chat.completions.create({
    messages: [
      system,
      {
        role: 'user',
        content: text,
      },
    ],
    model: "llama3-8b-8192",
  });
}

async function mainGroq(text, system = SYSTEM) {
  const chatCompletion = await getGroqChatCompletion(text, system);
  return chatCompletion.choices[0]?.message?.content || "";
}

async function callLlama(text) {
  const request = await fetch('http://192.168.1.123:11434/api/generate', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama3p1',
      prompt: SYSTEM_4 + '\n' + text,
      // SYSTEM,
      // {
      //   role: 'user',
      //   content: text,
      // },
      // ],
      stream: false,
    }),
  });
  const data = await request.json();
  console.log('Data', data);
  return data.response;
  // return data.choices[0].message.content;
}

let json: any = null;

// curl -X POST -d "{ \"model\": \"llama3p1\", \"prompt\": \"Why is the sky blue?\", \"stream\": false}"

async function main() {
  const beforeText = document.getElementById('text-before');
  const afterText = document.getElementById('text-after');
  const afterText2 = document.getElementById('text-after-2');
  const replacementsText = document.getElementById('text-replacements');

  apiKeyInput = document.getElementById('api-key') as HTMLInputElement;
  const toggleApiKeyButton = document.getElementById('toggle-api-key');
  const groqApiKeyInput = document.getElementById('groq-api-key') as HTMLInputElement;
  const toggleGroqApiKeyButton = document.getElementById('toggle-groq-api-key');
  const uploadButton = document.getElementById('upload');

  toggleGroqApiKeyButton.addEventListener('click', () => {
    if (groqApiKeyInput.type === 'password') {
      groqApiKeyInput.type = 'text';
      toggleGroqApiKeyButton.textContent = 'Hide Key';
    } else {
      groqApiKeyInput.type = 'password';
      toggleGroqApiKeyButton.textContent = 'Show Key';
    }
  });

  toggleApiKeyButton.addEventListener('click', () => {
    if (apiKeyInput.type === 'password') {
      apiKeyInput.type = 'text';
      toggleApiKeyButton.textContent = 'Hide Key';
    } else {
      apiKeyInput.type = 'password';
      toggleApiKeyButton.textContent = 'Show Key';
    }
  });
  const anonymizeButton = document.getElementById('anonymize');
  const pasteButton = document.getElementById('paste');
  const copyButton = document.getElementById('copy-after');

  uploadButton.addEventListener('click', async () => {
    const handles = await showOpenFilePicker();
    const files = await Promise.all(handles.map((handle) => handle.getFile()));
    if (!files.length) return;
    const file = files[0];
    const text = await file.text();
    beforeText.value = text;
    afterText.value = '';
    replacementsText.textContent = '';
  });

  // anonymizeButton.addEventListener('click', async () => {
  //   try {
  //     anonymizeButton.textContent = 'Working...';
  //     const text = beforeText.value;
  //     const anonymized = await callChatGPT(text);
  //     // const anonymized = await callLlama(text);

  //     const [altered, table] = anonymized.split('REPLACEMENT_TABLE');

  //     // const anonymized = await chrome.runtime.sendMessage({
  //     //   type: 'anonymize',
  //     //   text,
  //     // });
  //     afterText.value = altered;
  //     afterText2.innerHTML = altered;
  //     replacementsText.textContent = table
  //       .replace('```json\n', '')
  //       .replace('```', '');

  //     try {
  //       json = JSON.parse(table.replace('```json\n', '').replace('```', ''));
  //       const tbl = document.createElement('table');
  //       json.forEach((r) => {
  //         const tr = document.createElement('tr');
  //         const td1 = document.createElement('td');
  //         td1.textContent = r.Pseudonym;
  //         tr.appendChild(td1);

  //         const td2 = document.createElement('td');
  //         td2.textContent = r.Original;
  //         tr.appendChild(td2);

  //         tbl.appendChild(tr);
  //       });

  //       replacementsText.replaceChildren(tbl);
  //       console.log(tbl);
  //     } catch (e) {
  //       console.log(e);
  //     }

  //     console.log(table);
  //   } finally {
  //     anonymizeButton.textContent = 'Anonymize';
  //   }
  // });

  pasteButton.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    return chrome.tabs.sendMessage(tab.id, {
      type: 'PASTE',
      text: afterText2.textContent,
    });
  });

  copyButton.addEventListener('click', async () => {
    console.log('Here');
    await navigator.clipboard.writeText(afterText2.textContent);
    await showSnackbar('Text copied to clipboard');
  });
}

async function showSnackbar(text) {
  const bar = document.createElement('div');
  bar.setAttribute('popover', 'manual');
  const span = document.createElement('span');
  span.classList.add('text');
  span.textContent = text;

  bar.appendChild(span);
  document.body.appendChild(bar);
  bar.showPopover();
  setTimeout(() => {
    bar.hidePopover();
  }, 2000);

  // <div popover="manual" ?error=${this.error}>
  //       <span class="text">${this.labelText}</span>
  //       ${this.hasDismiss
  //         ? html`<span class="icon" @click=${this.close}>close</span>`
  //         : nothing}
  //     </div>
}

@customElement('my-app')
export class MyApp extends LitElement {
  override createRenderRoot() {
    return this;
  }

  override render() {
    return html`<header>
        <img src="/theveil.png" />
        <div>Veil</div>
      </header>
      <main>
        <section>
          <!-- <vaadin-tabsheet>
            <vaadin-button slot="prefix">Close all</vaadin-button>

            <vaadin-button slot="suffix" theme="icon" aria-label="Add tab">
              <vaadin-icon icon="vaadin:plus"></vaadin-icon>
            </vaadin-button>

            <vaadin-tabs slot="tabs">
              <vaadin-tab id="dashboard-tab">Dashboard</vaadin-tab>
              <vaadin-tab id="payment-tab">Payment</vaadin-tab>
              <vaadin-tab id="shipping-tab">Shipping</vaadin-tab>
            </vaadin-tabs>

            <div tab="dashboard-tab">This is the Dashboard tab content</div>
            <div tab="payment-tab">This is the Payment tab content</div>
            <div tab="shipping-tab">This is the Shipping tab content</div>
          </vaadin-tabsheet> -->

          <label ?hidden="${!this.shouldShowOriginal}">Original Text</label>
          <textarea
            ?hidden="${!this.shouldShowOriginal}"
            placeholder="Original"
            id="text-before"
          ></textarea>

          <label ?hidden="${this.shouldShowOriginal}">Anonymized Text</label>
          <textarea
            placeholder="Anonymized"
            readonly
            id="text-after"
            hidden
          ></textarea>
          <div
            id="text-after-2"
            ?hidden="${this.shouldShowOriginal}"
            contenteditable="true"
          ></div>
          <div class="actions">
            <button id="upload">Upload</button>
            <button
              ?hidden="${!this.shouldShowOriginal}"
              @click="${this.anonymize}"
              id="anonymize"
            >
              Anonymize
            </button>
            <button
              ?hidden="${this.shouldShowOriginal}"
              @click="${this.showOriginal}"
            >
              Show Original
            </button>
            <button id="paste" style="display: none">Paste</button>
            <button hidden id="copy-after">Copy Result</button>
          </div>
          <input
            placeholder="Enter ChatGPT Prompt"
            @keydown="${this.handleKeyDown}"
          />
          <textarea
            id="chatgpt-result"
            placeholder="Encoded ChatGPT Response"
            ?hidden=${this.shouldShowDecoded}
          ></textarea>
          <textarea
            id="text-decoded"
            placeholder="Decoded ChatGPT Response"
            ?hidden=${!this.shouldShowDecoded}
          ></textarea>
          <div class="actions">
            <button
              @click="${this.decodeMessage}"
              ?hidden=${this.shouldShowDecoded}
            >
              Decode
            </button>
            <button
              @click="${this.showEncoded}"
              ?hidden=${!this.shouldShowDecoded}
            >
              Show Original
            </button>
          </div>
        </section>
        <aside>
          <label>Replacements</label>
          <div id="text-replacements"></div>
        </aside>
      </main>`;
  }

  async anonymize() {
    const anonymizeButton = document.querySelector(
      '#anonymize'
    ) as HTMLButtonElement;
    const beforeText = document.getElementById(
      'text-before'
    ) as HTMLTextAreaElement;
    // const afterText = document.getElementById('text-after');
    const afterText2 = document.getElementById(
      'text-after-2'
    ) as HTMLDivElement;
    const replacementsText = document.getElementById(
      'text-replacements'
    ) as HTMLDivElement;

    try {
      anonymizeButton.textContent = 'Working...';
      const text = beforeText.value;
      // const anonymized = await callChatGPT(text);
      const anonymized = await mainGroq(text);
      // const anonymized = await callLlama(text);

      const [altered, table] = anonymized.split('REPLACEMENT_TABLE');

      // const anonymized = await chrome.runtime.sendMessage({
      //   type: 'anonymize',
      //   text,
      // });
      // afterText.value = altered;
      afterText2.innerHTML = altered;
      replacementsText.textContent = table
        .replace('```json\n', '')
        .replace('```', '');

      try {
        json = JSON.parse(table.replace('```json\n', '').replace('```', ''));
        const tbl = document.createElement('table');
        json.forEach((r) => {
          const tr = document.createElement('tr');
          const td1 = document.createElement('td');
          td1.textContent = r.Pseudonym;
          tr.appendChild(td1);

          const td2 = document.createElement('td');
          td2.textContent = r.Original;
          tr.appendChild(td2);

          tbl.appendChild(tr);
        });

        replacementsText.replaceChildren(tbl);
        console.log(tbl);
      } catch (e) {
        console.log(e);
      }

      console.log(table);
    } finally {
      anonymizeButton.textContent = 'Anonymize';
    }
    this.shouldShowOriginal = false;
  }

  showOriginal() {
    this.shouldShowOriginal = true;
  }

  @state() shouldShowDecoded = false;

  @state() shouldShowOriginal = true;

  async handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const target = event.target as HTMLInputElement;
      const prompt = target.value;
      target.value = '';

      const textValue = document.querySelector('#text-after-2')?.textContent;

      const response = await callChatGPT(textValue + '\n' + prompt, SYSTEM2);

      (document.getElementById('chatgpt-result') as HTMLTextAreaElement).value =
        response;
    }
  }

  @query('#text-decoded') decodedTextArea!: HTMLTextAreaElement;

  showEncoded() {
    this.shouldShowDecoded = false;
  }

  decodeMessage() {
    const encoded = (
      document.getElementById('chatgpt-result') as HTMLTextAreaElement
    ).value;
    let decoded = encoded;
    if (json) {
      for (const row of json) {
        decoded = decoded.replaceAll(row.Pseudonym, row.Original);
      }
    }
    this.decodedTextArea.value = decoded;
    this.shouldShowDecoded = true;
  }
}

setTimeout(main, 1000);
