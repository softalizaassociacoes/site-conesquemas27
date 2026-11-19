"use client";

import { useSyncExternalStore } from "react";
import {
  assinarConsentimento,
  lerConsentimento,
  type Consentimento,
} from "@/lib/consentimento";

/**
 * Escolha atual de consentimento, reagindo na hora ao clique do aviso.
 *
 * No servidor devolve `null` — "ainda não escolheu" — para o HTML inicial não
 * trazer nem o aviso nem a medição, e a hidratação não divergir.
 */
export function useConsentimento(): Consentimento | null {
  return useSyncExternalStore(
    assinarConsentimento,
    lerConsentimento,
    () => null,
  );
}
