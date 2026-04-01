import { Ionicons } from '@expo/vector-icons';

export type SuccessModalProps = {
  visible: boolean;
  title: string;
  message: string;
  /** Chamado ao tocar em OK e no botão Voltar do sistema (Android). */
  onConfirm: () => void;
  /** Texto do botão (ex.: OK, Continuar). */
  confirmLabel?: string;
  accessibilityHint?: string;
  /** Ícone de sucesso (por defeito: checkmark no círculo). */
  icon?: keyof typeof Ionicons.glyphMap;
};
