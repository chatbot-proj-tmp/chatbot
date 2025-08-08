// DOM 요소 선택
const chatbotContainer = document.getElementById("chatbot-container");
const chatbot = document.getElementById("chatbot");
const toggleBtn = document.getElementById("chatbot-toggle-btn");

const infoModal = document.getElementById("info-modal");
const resetModal = document.getElementById("reset-modal");

const langBtn = document.getElementById("lang-btn");
const infoBtn = document.getElementById("info-btn");
const resetBtn = document.getElementById("reset-btn");
const closeBtn = document.getElementById("close-btn");

const langDropdown = document.getElementById('lang-dropdown');
const langList = document.getElementById('lang-list');

const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const messages = document.getElementById("chat-messages");


// 언어 관련
let language = "KOR";
const defaultMsgDict = {
  "KOR": `안녕하세요! GPT-4 기반 한라대학교 챗봇 ‘한라대학교 GPT’입니다. 😄<br><br>
          학교에 대해 궁금한 점이 있으신가요?<br><br>
          질문이 구체적일수록 더 정확한 답변을 드릴 수 있어요! 😉<br><br>
          무엇이든 편하게 물어보세요. 제가 도와드릴게요!<br><br>
          📌 개인 정보는 수집하지 않으니 편하게 대화하세요.<br><br>
          📌 한국어, 영어, 베트남어, 중국어 모두 지원해요.`,

  "ENG": `Hello! I’m Halla University GPT, your chatbot powered by GPT-4. 😄<br><br>
          Do you have any questions about Halla University?<br><br>
          The more specific your question is, the more accurate my answer will be! 😉<br><br>
          Feel free to ask anything—I'm here to help!<br><br>
          📌 We do not collect any personal information, so feel comfortable chatting.<br><br>
          📌 Available in Korean, English, Vietnamese, and Chinese.`,

  "VI": `Xin chào! Tôi là Halla University GPT, chatbot của bạn được hỗ trợ bởi GPT-4. 😄<br><br>
         Bạn có thắc mắc gì về Halla University không?<br><br>
         Câu hỏi càng cụ thể thì tôi sẽ trả lời càng chính xác! 😉<br><br>
         Cứ thoải mái đặt câu hỏi nhé—tôi luôn sẵn sàng hỗ trợ bạn!<br><br>
         📌 Chúng tôi không thu thập thông tin cá nhân, nên bạn cứ yên tâm trò chuyện.<br><br>
         📌 Hỗ trợ các ngôn ngữ: tiếng Hàn, tiếng Anh, tiếng Việt và tiếng Trung.`,

  "CN": `你好！我是由 GPT-4 提供支持的 Halla University GPT 聊天机器人。😄<br><br>
         你对 Halla University 有什么疑问吗？<br><br>
         问题越具体，我给出的答案就越准确哦！😉<br><br>
         欢迎随时提问，我会尽力帮助你！<br><br>
         📌 我们不会收集任何个人信息，请放心聊天。<br><br>
         📌 支持韩语、英语、越南语和中文。`
}

const waitMsgDict = {
  "KOR": "응답 생성 중입니다...",
  "ENG": "Generating response...",
  "VI": "Đang tạo phản hồi...",
  "CN": "正在生成回复..."
};

const errorMsgDict = {
  "KOR": "오류가 발생했습니다",
  "ENG": "An error has occurred.",
  "VI": "Đã xảy ra lỗi.",
  "CN": "发生错误。"
};

const infoModalDict = {
  "KOR" : `<div class="modal">
            <div class="modal-title"><span class="highlight">한라대학교 GPT</span> 이용 안내</div>
            <div class="modal-content scrollable">
              <ul>
                <li>단어가 아닌 <span class="highlight">대화형 문장으로 질문</span> 해주세요.</li>
                <li>도서관, 커뮤니티 등 <span class="highlight">다른 사이트의 지식은 저에게 없어요.</span></li>
                <li>제가 제공하는 정보는 <span class="highlight">부정확할 수 있어요.</span></li>
                <li>정확한 정보는 <span class="highlight">답변의 출처 및 해당 페이지 링크</span>를 통해 직접 확인해 주세요.</li>
              </ul>
            </div>
            <div class="modal-buttons single">
              <button id="confirm-info-btn">확인</button>
            </div>
          </div>`,
  
  "ENG": `<div class="modal">
            <div class="modal-title"><span class="highlight">Halla University GPT</span><br>User Guide</div>
            <div class="modal-content scrollable">
              <ul>
                <li>Please ask questions in <span class="highlight">conversational sentences</span>, not just single words.</li>
                <li>I do not have knowledge from <span class="highlight">other sites such as libraries or communities</span>.</li>
                <li>The information I provide <span class="highlight">may be inaccurate</span>.</li>
                <li>For accurate information, please <span class="highlight">check the sources and links</span> in my responses.</li>
              </ul>
            </div>
            <div class="modal-buttons single">
              <button id="confirm-info-btn">OK</button>
            </div>
          </div>
          `,

  "VI": `<div class="modal">
          <div class="modal-title"><span class="highlight">Halla University GPT</span><br>Hướng dẫn sử dụng</div>
          <div class="modal-content scrollable">
            <ul>
              <li>Vui lòng đặt câu hỏi bằng <span class="highlight">câu hội thoại đầy đủ</span>, không chỉ bằng từ đơn.</li>
              <li>Tôi không có kiến thức từ <span class="highlight">các trang web khác như thư viện hoặc cộng đồng</span>.</li>
              <li>Thông tin tôi cung cấp <span class="highlight">có thể không chính xác</span>.</li>
              <li>Để có thông tin chính xác, vui lòng <span class="highlight">kiểm tra nguồn và liên kết</span> trong câu trả lời của tôi.</li>
            </ul>
          </div>
          <div class="modal-buttons single">
            <button id="confirm-info-btn">Xác nhận</button>
          </div>
        </div>
        `,

  "CN": `<div class="modal">
          <div class="modal-title"><span class="highlight">Halla University GPT</span><br>使用指南</div>
          <div class="modal-content scrollable">
            <ul>
              <li>请使用<span class="highlight">对话式的完整句子</span>来提问，而不是单个词语。</li>
              <li>我没有来自<span class="highlight">其他网站（如图书馆或社区）</span>的知识。</li>
              <li>我提供的信息<span class="highlight">可能不准确</span>。</li>
              <li>如需准确的信息，请<span class="highlight">查看我的回答中的来源和链接</span>。</li>
            </ul>
          </div>
          <div class="modal-buttons single">
            <button id="confirm-info-btn">确认</button>
          </div>
        </div>
        `
}

const resetModalDict = {
  "KOR": `<div class="modal">
            <div class="modal-title">대화 내용 초기화</div>
            <div class="modal-content">
              대화가 처음부터 다시 시작되며<br/>
              이전 대화 내용은 복구할 수 없습니다.<br />
              초기화 하시겠습니까?
            </div>
            <div class="modal-buttons">
              <button id="cancel-reset-btn">취소</button>
              <button id="confirm-reset-btn">초기화</button>
            </div>
          </div>
        </div>`,
  
  "ENG": `<div class="modal">
            <div class="modal-title">Reset Conversation</div>
            <div class="modal-content">
              The conversation will start over from the beginning.<br/>
              Previous conversation history cannot be recovered.<br />
              Do you want to reset?
            </div>
            <div class="modal-buttons">
              <button id="cancel-reset-btn">Cancel</button>
              <button id="confirm-reset-btn">Reset</button>
            </div>
          </div>
        </div>`,
      
  "VI": `<div class="modal">
            <div class="modal-title">Đặt lại cuộc trò chuyện</div>
            <div class="modal-content">
              Cuộc trò chuyện sẽ bắt đầu lại từ đầu.<br/>
              Lịch sử cuộc trò chuyện trước đó sẽ không thể khôi phục.<br />
              Bạn có muốn đặt lại không?
            </div>
            <div class="modal-buttons">
              <button id="cancel-reset-btn">Hủy</button>
              <button id="confirm-reset-btn">Đặt lại</button>
            </div>
          </div>
        </div>`,

  "CN": `<div class="modal">
            <div class="modal-title">重置对话</div>
            <div class="modal-content">
              对话将从头开始。<br/>
              之前的对话记录无法恢复。<br />
              您确定要重置吗？
            </div>
            <div class="modal-buttons">
              <button id="cancel-reset-btn">取消</button>
              <button id="confirm-reset-btn">重置</button>
            </div>
          </div>
        </div>`
}

userInputPlaceHolderDict = {
  "KOR" : "무엇이든 물어보세요!",
  "ENG": "Ask me anything!",
  "VI": "Hãy hỏi tôi bất cứ điều gì!",
  "CN": "有什么都可以问我！"
}

// 딜레이
const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// 초기화 및 기본 이벤트
window.addEventListener('DOMContentLoaded', () => {
  sendDefaultMesage();
  setModal();
  setUserInputPlaceHolder();

  setChatbotExpanded();
  setLangDropdown();
  setInputAndSend();
});


// 초기 메시지 생성
const sendDefaultMesage = () => {
  let defaultMsgElement = document.createElement('div');

  defaultMsgElement.innerHTML = `
  <div class="bot-message-container" id="default-message">
    <img class="bot-avatar" src="assets/bot-avatar.png" alt="bot" />
    <div class="message bot">${defaultMsgDict[language]}</div>
  </div>
  `;

  messages.appendChild(defaultMsgElement);
  messages.scrollTop = messages.scrollHeight;
};


// 모달 설정
const setModal = () => {
  setInfoModal();
  setResetModal();
}


// 정보 모달 설정
const setInfoModal = () => {
  infoModal.innerHTML = infoModalDict[language];
  let infoConfirmBtn = document.getElementById("confirm-info-btn");

  infoBtn.addEventListener("click", () => {   // 모달 열기
    infoModal.style.display = "flex";
    infoModal.classList.remove('fade-out');
    infoModal.classList.add('fade-in');
  });

  infoConfirmBtn.addEventListener("click", () => {   // 모달 닫기
    infoModal.classList.remove('fade-in');
    infoModal.classList.add('fade-out');
  });

  infoModal.addEventListener('animationend', (e) => {   // 모달 애니메이션 처리
    if (e.animationName === 'fadeOut') {
      infoModal.style.display = 'none';
      infoModal.classList.remove('fade-out');
    }
  });
}


// 초기화 모달 설정
const setResetModal = () => {
  resetModal.innerHTML = resetModalDict[language];
  let resetCancelBtn = document.getElementById("cancel-reset-btn");
  let resetConfirmBtn = document.getElementById("confirm-reset-btn");

  resetBtn.addEventListener("click", () => {   // 모달 열기
    resetModal.style.display = "flex";
    resetModal.classList.remove('fade-out');
    resetModal.classList.add('fade-in');
  });

  resetCancelBtn.addEventListener("click", () => {  // 초기화 취소
    resetModal.classList.remove('fade-in');
    resetModal.classList.add('fade-out');
  });

  resetConfirmBtn.addEventListener("click", () => {   // 초기화 확인
    let botMessages = document.querySelectorAll('.bot-message-container');
    let userMessages = document.querySelectorAll('.user');

    botMessages.forEach(msg => msg.remove());
    userMessages.forEach(msg => msg.remove());
    sendDefaultMesage();

    resetModal.classList.remove('fade-in');
    resetModal.classList.add('fade-out');
  });

  resetModal.addEventListener('animationend', (e) => {   // 모달 애니메이션 처리
    if (e.animationName === 'fadeOut') {
      resetModal.style.display = 'none';
      resetModal.classList.remove('fade-out');
    }
  });
}


// user-input placeholder 처리
const setUserInputPlaceHolder = () => {
  document.getElementById("user-input").placeholder = userInputPlaceHolderDict[language];
}


// 챗봇 UI 제어
const setChatbotExpanded = () => {
  toggleBtn.addEventListener("click", async () => {   // 챗봇 열기
    chatbotContainer.classList.add("expanded");
  });

  closeBtn.addEventListener("click", async () => {   // 챗봇 닫기
    chatbotContainer.classList.remove("expanded");
  });

}


// 언어 드롭다운
const setLangDropdown = () => {
  const toggleLangDropdown = (e) => {   // 드롭다운 토글 함수
    e.stopPropagation();

    if (langDropdown.classList.contains('fade-in')) {
      langDropdown.classList.remove('fade-in');
      langDropdown.classList.add('fade-out');

      setTimeout(() => {
        langDropdown.style.display = 'none';
        langDropdown.classList.remove('fade-out');
      }, 300);
    }
    else {
      langDropdown.style.display = 'block';
      langDropdown.classList.add('fade-in');
    }
  }

  document.addEventListener('click', (e) => {   // 외부 클릭 시 드롭다운 닫기
    if (!langDropdown.contains(e.target) && !langBtn.contains(e.target)) {  

      if (langDropdown.classList.contains('fade-in')) {
        langDropdown.classList.remove('fade-in');
        langDropdown.classList.add('fade-out');

        setTimeout(() => {
          langDropdown.style.display = 'none';
          langDropdown.classList.remove('fade-out');
        }, 300);
      }
    }
  });

  langList.querySelectorAll('li').forEach((item) => {   // 언어 선택 시 드롭다운 닫기 및 값 처리
    item.addEventListener('click', () => {
      let preLang = language;
      language = item.dataset.value;

      langDropdown.classList.remove('fade-in');
      langDropdown.classList.add('fade-out');

      setTimeout(() => {
        langDropdown.style.display = 'none';
        langDropdown.classList.remove('fade-out');
      }, 300);

      if (preLang !== language) {  
        if (!document.querySelector('.message.user')) {
          document.querySelector('.bot-message-container').remove(); 
        }

        sendDefaultMesage();
        setModal();
        setUserInputPlaceHolder();
      }
    });
  });

  langBtn.addEventListener('click', toggleLangDropdown);   // lang-btn 클릭 시 드롭다운 토글
}


// input, send etc...
const setInputAndSend = () => {
  userInput.addEventListener('input', () => {   // 텍스트 입력란 크기 조정
    let lineHeight = parseInt(getComputedStyle(userInput).lineHeight, 10);
    let currentRows = Math.floor(userInput.scrollHeight / lineHeight);

    if (currentRows > 2) {
      userInput.style.height = '45px';
      userInput.style.height = userInput.scrollHeight + 'px';
    }
  });

  // 메시지 전송 기능
  // 전송 버튼 및 Enter 키 처리
  sendBtn.addEventListener("click", () => {
    if (sendBtn.disabled) {
      return;
    }

    sendMessage()
  });

  userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (sendBtn.disabled) {
        return;
      }

      sendMessage();
    }
  });
}


// HTML 이스케이프 함수
const escapeHTML = (str) => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};


// 메시지 전송
const sendMessage = async () => {
  let userMsg = userInput.value.trim();

  if (!userMsg) {
    userInput.style.height = '45px';
    userInput.value = "";
    return;
  }
  else {
    userMsg = escapeHTML(userMsg).replace(/\n/g, '<br>');
  }

  sendBtn.disabled = true;
  appendUserMessage(userMsg);
  await delay(1000);
  await appendBotMessage(userMsg);
  sendBtn.disabled = false;
}


// 유저 메시지 추가
const appendUserMessage = (userMsg) => {
  // 입력창 초기화
  userInput.value = "";
  userInput.style.height = '45px';

  // 메시지 element 생성
  const msgElement = document.createElement("div");
  msgElement.innerHTML = `<div class="message user animate">${userMsg}</div>`;

  messages.appendChild(msgElement);
  messages.scrollTop = messages.scrollHeight;
}


const appendBotMessage = async (userMsg) => {
  // 응답 생성 메시지 띄우기
  let msgElement = document.createElement("div");
  let waitMsg = `<span class="wait-msg">${waitMsgDict[language]}</span><span class="loader"></span>`;

  msgElement.innerHTML = `
    <div class="bot-message-container animate">
      <img class="bot-avatar" src="assets/bot-avatar.png" alt="bot" />
      <div class="message bot">${waitMsg}</div>
    </div>
  `;

  messages.appendChild(msgElement);
  messages.scrollTop = messages.scrollHeight;

  const botMsgElement = msgElement.querySelector(".message.bot");   // 실제 메시지로 교체

  try {
    // request
    const resp = await fetch(`${window.location.origin}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "message": userMsg, "language": language })
    });

    // response
    let botMsg = "";
    const reader = resp.body.getReader();
    const decoder = new TextDecoder("utf-8");
    
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      const chunk = decoder.decode(value, { stream: true });
      const characters = chunk.split('');

      for (const char of characters) {
        botMsg += char;
        botMsgElement.innerHTML = escapeHTML(botMsg).replace(/\n/g, "<br>");
        messages.scrollTop = messages.scrollHeight;
        await new Promise(r => setTimeout(r, 10)); 
      }
    }
  } 
  catch (error) {
    botMsgElement.innerHTML = `❌ ${errorMsgDict[language]}:` + error.message;
  }

  messages.scrollTop = messages.scrollHeight;
};