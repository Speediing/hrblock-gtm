import type { ChatPreview, ComputerPreview } from "@/content/types";

import styles from "./leave-behind.module.css";

export function ChatSurface(props: {
  readonly agentName: string;
  readonly chat: ChatPreview;
  readonly phone?: boolean;
}) {
  const { agentName, chat, phone = false } = props;

  return (
    <div className={phone ? styles.phone : styles.chat}>
      {phone ? <div className={styles.phoneNotch} aria-hidden="true" /> : null}
      <div className={styles.chatHeader}>
        <span className={styles.agentMark} aria-hidden="true">
          {agentName
            .split(" ")
            .map((word) => word[0])
            .join("")}
        </span>
        <span>
          <strong>{agentName}</strong>
          <small>
            <i aria-hidden="true" />
            Ready
          </small>
        </span>
      </div>
      <div className={styles.chatThread}>
        <p className={styles.userMessage}>{chat.prompt}</p>
        <p className={styles.agentMessage}>{chat.status}</p>
      </div>
      <div className={styles.chatComposer} aria-hidden="true">
        <span>+</span>
        <p>Message {agentName}</p>
        <span>●</span>
      </div>
    </div>
  );
}

export function SoftwareComputer(props: {
  readonly computer: ComputerPreview;
  readonly compact?: boolean;
}) {
  const { computer, compact = false } = props;

  return (
    <div
      className={
        compact
          ? `${styles.computer} ${styles.computerCompact}`
          : styles.computer
      }
    >
      <div className={styles.computerChrome}>
        <span className={styles.trafficLights} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <code>{computer.path}</code>
      </div>
      <div className={styles.computerTabs} aria-hidden="true">
        <span className={styles.activeTab}>{computer.tab}</span>
        <span>Files</span>
        <span>Checks</span>
      </div>
      <div className={styles.computerBody}>
        <p className={styles.computerLabel}>Illustrative computer</p>
        <ul>
          {computer.rows.map((row) => (
            <li key={`${row.label}-${row.value}`} data-state={row.state}>
              <i aria-hidden="true" />
              <span>{row.label}</span>
              <strong>{row.value}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
