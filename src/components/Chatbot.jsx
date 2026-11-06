// ADNOV Interactive Assistant (Floating Chatbot) - Clean Sky & Lime Theme
import { useState, useEffect, useRef } from "react";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { siteConfig } from "../config/siteConfig";
import { servicesData } from "../data/services";
import { WhatsAppIcon, InstagramIcon } from "./SocialIcons";

export default function Chatbot({ onSelectServiceForEnquiry }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "m-1",
      sender: "bot",
      text: "Hello! 👋 Welcome to ADNOV — Where Innovation Meets Solutions. How can I help you elevate your brand today?",
      quickReplies: [
        "What services do you offer?",
        "How do I start a project?",
        "Can you do Live Broadcasting?",
        "Chat on WhatsApp",
      ],
      time: "Just now",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
    }
  }, [isOpen, messages, isTyping]);

  const getBotResponse = (query) => {
    const q = query.toLowerCase();

    if (q.includes("service") || q.includes("what do you do") || q.includes("offer")) {
      return {
        text: "ADNOV is a full-service creative media & digital solutions studio. We offer 10 core disciplines:\n\n• Live Broadcasting (Multi-cam, hybrid streaming)\n• Cinematic Videography & Commercials\n• Professional Photography\n• High-Impact Video Editing & Reels\n• Luxury Wedding Works & Films\n• Brand Identity & Systems\n• High-Performance Web Development\n• Poster & Graphic Design\n• Digital Growth Marketing\n• Custom Creative Technologies\n\nWhich discipline would you like to explore?",
        quickReplies: ["Tell me about Live Broadcasting", "Tell me about Web Development", "Open Enquiry Form"],
      };
    }

    if (q.includes("live") || q.includes("broadcast") || q.includes("stream")) {
      return {
        text: "Our Live Broadcasting team provides 4K multi-camera switching, teleprompters, graphics overlays, and redundant internet streams for corporate summits, hybrid galas, concerts, and sports events worldwide.",
        action: { label: "Book Live Broadcast", service: "Live Broadcasting" },
        quickReplies: ["Videography Services", "Open Enquiry Form", "Chat on WhatsApp"],
      };
    }

    if (q.includes("video") || q.includes("film") || q.includes("commercial")) {
      return {
        text: "We shoot on cinema-grade cameras with precision lighting, gimbals, and drone cinematography. We produce high-impact commercials, brand documentaries, event reels, and corporate films.",
        action: { label: "Enquire About Videography", service: "Videography" },
        quickReplies: ["Video Editing", "Photography", "Open Enquiry Form"],
      };
    }

    if (q.includes("photo") || q.includes("picture")) {
      return {
        text: "We specialize in commercial product photography, executive portraits, fashion lookbooks, and event coverage with precision dark-field lighting and master retouching.",
        action: { label: "Enquire About Photography", service: "Photography" },
        quickReplies: ["Wedding Works", "Poster Design", "Open Enquiry Form"],
      };
    }

    if (q.includes("wedding")) {
      return {
        text: "Our Wedding Works department immortalizes your celebration into a Hollywood-grade cinematic feature film and luxury photo album, capturing raw candid emotions and destination vistas.",
        action: { label: "Check Wedding Availability", service: "Wedding Works" },
        quickReplies: ["Watch Wedding Work", "Open Enquiry Form", "Chat on WhatsApp"],
      };
    }

    if (q.includes("web") || q.includes("site") || q.includes("app") || q.includes("code")) {
      return {
        text: "Our digital engineering arm builds bespoke websites, 3D interactive WebGL experiences, e-commerce stores, and custom web applications optimized for lightning speed, SEO, and conversions.",
        action: { label: "Start Web Project", service: "Web Development" },
        quickReplies: ["Branding Services", "Open Enquiry Form"],
      };
    }

    if (q.includes("brand") || q.includes("logo") || q.includes("identity")) {
      return {
        text: "Our branding team crafts unforgettable visual identities, logos, comprehensive design systems, typography guidelines, and packaging that make brands stand apart.",
        action: { label: "Enquire About Branding", service: "Branding" },
        quickReplies: ["Graphic Design", "Web Development", "Open Enquiry Form"],
      };
    }

    if (q.includes("cost") || q.includes("price") || q.includes("budget") || q.includes("quote") || q.includes("rate")) {
      return {
        text: "Every creative project at ADNOV is tailored to your scope and objectives. We work across flexible tiers, starting from focused project packages to full enterprise retainers. Fill out our quick enquiry form with your budget range, and we will send a custom proposal within 24 hours!",
        action: { label: "Get a Custom Quote", service: "More Services" },
        quickReplies: ["Open Enquiry Form", "Chat on WhatsApp"],
      };
    }

    if (q.includes("whatsapp") || q.includes("call") || q.includes("phone")) {
      return {
        text: `You can reach our creative team directly on WhatsApp at ${siteConfig.contact.phoneDisplay} or click below to start a direct WhatsApp conversation right now.`,
        isWhatsApp: true,
        quickReplies: ["Open Enquiry Form", "Check Services"],
      };
    }

    if (q.includes("instagram") || q.includes("social")) {
      return {
        text: `Follow our latest creative projects, behind-the-scenes shoots, and design reels on Instagram: ${siteConfig.social.instagramHandle}!`,
        isInstagram: true,
        quickReplies: ["What services do you offer?", "Open Enquiry Form"],
      };
    }

    if (q.includes("enquiry") || q.includes("contact") || q.includes("start") || q.includes("hire")) {
      return {
        text: "Ready to start? You can fill out our interactive enquiry form right here on the website, and our creative directors will review your brief today.",
        action: { label: "Scroll to Enquiry Form", service: null },
        quickReplies: ["Chat on WhatsApp", "Our Services"],
      };
    }

    return {
      text: "I'd love to help you with that! At ADNOV, we handle everything from Live Broadcasting and Cinema Production to Branding, 3D Web Design, and Marketing. Would you like to speak to a creative producer or fill out a project brief?",
      quickReplies: [
        "What services do you offer?",
        "Open Enquiry Form",
        "Chat on WhatsApp",
        "Our Portfolio",
      ],
    };
  };

  const handleSend = (textToSend) => {
    const query = textToSend || inputVal;
    if (!query.trim()) return;

    const userMsg = {
      id: "u-" + Date.now(),
      sender: "user",
      text: query,
      time: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    setTimeout(() => {
      const botReply = getBotResponse(query);
      const botMsg = {
        id: "b-" + Date.now(),
        sender: "bot",
        text: botReply.text,
        quickReplies: botReply.quickReplies,
        action: botReply.action,
        isWhatsApp: botReply.isWhatsApp,
        isInstagram: botReply.isInstagram,
        time: "Just now",
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleAction = (serviceName) => {
    setIsOpen(false);
    if (onSelectServiceForEnquiry && serviceName) {
      onSelectServiceForEnquiry(serviceName);
    } else {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleQuickReply = (text) => {
    if (text === "Chat on WhatsApp") {
      window.open(siteConfig.social.whatsapp, "_blank");
      return;
    }
    if (text === "Open Enquiry Form") {
      setIsOpen(false);
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (text === "Our Portfolio") {
      setIsOpen(false);
      document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    handleSend(text);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "m-reset-" + Date.now(),
        sender: "bot",
        text: "Chat refreshed. How can ADNOV support your creative vision today?",
        quickReplies: [
          "What services do you offer?",
          "How do I start a project?",
          "Chat on WhatsApp",
        ],
        time: "Just now",
      },
    ]);
  };

  return (
    <div className="chatbot-root" aria-live="polite">
      {/* Floating Launcher Button */}
      <button
        type="button"
        className={`chatbot-trigger-btn-light ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close ADNOV Assistant chat" : "Open ADNOV Assistant chat"}
      >
        <span className="trigger-lime-ring" />
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        {!isOpen && unreadCount > 0 && (
          <span className="unread-lime-badge">{unreadCount}</span>
        )}
      </button>

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="chatbot-window-light">
          {/* Header */}
          <div className="chatbot-header-light">
            <div className="bot-profile-light">
              <div className="bot-avatar-light">
                <Bot size={20} />
                <span className="online-dot-lime" />
              </div>
              <div>
                <h4 className="bot-name-light">ADNOV Assistant</h4>
                <span className="bot-status-light">Online • Creative Concierge</span>
              </div>
            </div>

            <div className="bot-controls-light">
              <button
                type="button"
                className="bot-ctrl-btn-light"
                onClick={handleResetChat}
                title="Reset conversation"
                aria-label="Reset conversation"
              >
                <RotateCcw size={15} />
              </button>
              <button
                type="button"
                className="bot-ctrl-btn-light"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                aria-label="Close chat"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="chatbot-messages-light">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`msg-row-light ${msg.sender === "user" ? "user-row-light" : "bot-row-light"}`}
              >
                {msg.sender === "bot" && (
                  <div className="avatar-bot-icon">
                    <Bot size={14} />
                  </div>
                )}

                <div className="msg-content-light">
                  <div className={`bubble-light ${msg.sender === "user" ? "bubble-user-light" : "bubble-bot-light"}`}>
                    <p style={{ whiteSpace: "pre-line" }}>{msg.text}</p>
                  </div>

                  {msg.action && (
                    <button
                      type="button"
                      className="chat-action-lime"
                      onClick={() => handleAction(msg.action.service)}
                    >
                      <Sparkles size={14} />
                      <span>{msg.action.label}</span>
                      <ArrowRight size={13} />
                    </button>
                  )}

                  {msg.isWhatsApp && (
                    <a
                      href={siteConfig.social.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="chat-wa-lime"
                    >
                      <WhatsAppIcon size={16} />
                      <span>Start WhatsApp Chat</span>
                    </a>
                  )}

                  {msg.isInstagram && (
                    <a
                      href={siteConfig.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="chat-insta-btn"
                    >
                      <InstagramIcon size={16} />
                      <span>Visit @adnovcreative</span>
                    </a>
                  )}

                  {msg.quickReplies && msg.quickReplies.length > 0 && (
                    <div className="quick-replies-light">
                      {msg.quickReplies.map((qr, i) => (
                        <button
                          key={i}
                          type="button"
                          className="qr-chip-light"
                          onClick={() => handleQuickReply(qr)}
                        >
                          {qr}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="msg-row-light bot-row-light">
                <div className="avatar-bot-icon">
                  <Bot size={14} />
                </div>
                <div className="typing-box-light">
                  <span className="dot-lime" />
                  <span className="dot-lime" />
                  <span className="dot-lime" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form
            className="chatbot-input-light"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              className="chat-input-field-light"
              placeholder="Ask about our services or projects..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
            <button
              type="submit"
              className="chat-send-lime"
              disabled={!inputVal.trim()}
              aria-label="Send message"
            >
              <Send size={15} />
            </button>
          </form>

          <div className="chatbot-footer-light">
            <span>Powered by ADNOV Studio AI • Fast Human Handoff</span>
          </div>
        </div>
      )}
    </div>
  );
}
