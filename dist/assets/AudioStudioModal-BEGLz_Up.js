import { jsx } from "./jsx-shim/jsx-runtime.js";
import { j as jsx2 } from "./vendor-react-BbRiLirl.js";
import { A as AudioStudioContent } from "./AudioStudioContent-CYqgvu51.js";
import "./vendor-state-m3Xdu9cz.js";
import "./index-DE7up0M0.js";
import "./vendor-remotion-D3IpuOk5.js";
const m = ({
  isOpen,
  onClose,
  onApplyAudio,
  initialTab = "tts"
}) => isOpen ? /* @__PURE__ */ jsx("div", { onMouseDown: (event) => {
  if (event.target === event.currentTarget) {
    if (onClose != null) {
      onClose();
    }
  }
}, style: {
  position: "fixed",
  inset: 0,
  zIndex: 9999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(4, 6, 12, 0.86)",
  backdropFilter: "blur(12px)",
  padding: 20
}, children: /* @__PURE__ */ jsx("div", { style: {
  width: 860,
  maxWidth: "100%",
  height: 680,
  maxHeight: "92vh",
  background: "var(--popover)",
  border: "1px solid var(--border-strong)",
  borderRadius: "var(--radius-lg)",
  boxShadow: "var(--shadow-lg)",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  color: "var(--foreground)",
  fontFamily: "var(--font-sans)"
}, children: /* @__PURE__ */ jsx(AudioStudioContent, { mode: "modal", isOpen, onClose, onApplyAudio, initialTab }) }) }) : null;
export {
  m as AudioStudioModal
};
