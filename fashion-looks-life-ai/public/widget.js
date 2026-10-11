(() => {
  if (window.__fashionLooksLifeAIInstalled) return;
  window.__fashionLooksLifeAIInstalled = true;
  const script = document.currentScript;
  const apiBase = (script?.dataset.apiBase || new URL(script.src).origin).replace(/\/$/, "");
  const root = document.createElement("div");
  root.id = "fashion-looks-life-ai";
  document.body.appendChild(root);
  const shadow = root.attachShadow({ mode: "open" });
  shadow.innerHTML = `
    <style>
      :host{all:initial;font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#f3f7ff}
      *{box-sizing:border-box}
      .launcher{position:fixed;right:20px;bottom:20px;z-index:2147483000;border:0;border-radius:999px;background:#102b46;color:#fff;padding:14px 18px;font-size:14px;font-weight:700;box-shadow:0 8px 28px #0005;cursor:pointer}
      .panel{position:fixed;right:20px;bottom:82px;z-index:2147483000;width:min(360px,calc(100vw - 28px));height:min(510px,calc(100vh - 120px));background:#0b1423;border:1px solid #30445f;border-radius:18px;box-shadow:0 18px 50px #0008;display:none;overflow:hidden}
      .panel.open{display:flex;flex-direction:column}
      header{padding:14px;background:#12243a;border-bottom:1px solid #30445f}
      h2{font-size:16px;margin:0 0 3px;color:#fff}header p{font-size:12px;color:#bac9dc;margin:0}
      .messages{padding:12px;flex:1;overflow:auto;display:flex;flex-direction:column;gap:9px}
      .bubble{font-size:13px;line-height:1.45;white-space:pre-wrap;overflow-wrap:anywhere;padding:10px 11px;border-radius:12px;background:#16263a;color:#f3f7ff;max-width:95%}
      .bubble.user{align-self:flex-end;background:#155064}.bubble.ai{align-self:flex-start}
      form{padding:10px;border-top:1px solid #30445f;display:flex;gap:7px}
      textarea{min-width:0;flex:1;resize:none;height:44px;background:#101e30;color:#fff;border:1px solid #30445f;border-radius:9px;padding:9px;font:13px system-ui}
      button.send{border:0;border-radius:9px;background:#6be6f5;color:#06121c;font-weight:800;padding:0 12px;cursor:pointer}
      .fine{font-size:10px;color:#9eafc6;padding:0 11px 9px;margin:0}
      .close{float:right;background:transparent;border:0;color:#fff;font-size:20px;cursor:pointer}
      @media(max-width:480px){.panel{right:10px;bottom:76px}.launcher{right:12px;bottom:12px}}
    </style>
    <button class="launcher" aria-expanded="false">✦ Ask Fashion Looks AI</button>
    <section class="panel" role="dialog" aria-label="Fashion Looks Life AI chat">
      <header><button class="close" aria-label="Close chat">×</button><h2>Fashion Looks Life AI</h2><p>Textile services · General enquiries · Next steps</p></header>
      <div class="messages" aria-live="polite"><div class="bubble ai">Hello! I can help with textile certification questions and prepare an enquiry for the Fashion Looks team. What would you like to know?</div></div>
      <form><textarea maxlength="3000" required aria-label="Your message" placeholder="Type your question…"></textarea><button class="send" type="submit">Send</button></form>
      <p class="fine">AI can make mistakes. Don't share passwords or confidential client records. Messages are sent to the configured AI provider.</p>
    </section>`;
  const launcher=shadow.querySelector(".launcher"), panel=shadow.querySelector(".panel"), close=shadow.querySelector(".close");
  const messages=shadow.querySelector(".messages"), form=shadow.querySelector("form"), textarea=shadow.querySelector("textarea"), send=shadow.querySelector(".send");
  const history=[];
  const toggle=show=>{panel.classList.toggle("open",show);launcher.setAttribute("aria-expanded",String(show));if(show)textarea.focus()};
  launcher.addEventListener("click",()=>toggle(!panel.classList.contains("open")));
  close.addEventListener("click",()=>toggle(false));
  function bubble(text,who){const el=document.createElement("div");el.className="bubble "+who;el.textContent=text;messages.appendChild(el);messages.scrollTop=messages.scrollHeight;return el}
  form.addEventListener("submit",async e=>{
    e.preventDefault();const message=textarea.value.trim();if(!message)return;
    textarea.value="";bubble(message,"user");history.push({role:"user",content:message});
    send.disabled=true;send.textContent="…";const pending=bubble("Thinking…","ai");
    try{
      const response=await fetch(apiBase+"/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message,mode:"certification",history:history.slice(-8,-1)})});
      const data=await response.json();if(!response.ok)throw new Error(data.error||"Request failed");
      pending.textContent=data.reply||"No response received.";history.push({role:"assistant",content:pending.textContent});
    }catch(err){pending.textContent="Sorry, AI is not available right now. Please try again later.";console.error("Fashion Looks Life AI:",err)}
    finally{send.disabled=false;send.textContent="Send";messages.scrollTop=messages.scrollHeight}
  });
})();