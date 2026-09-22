import type { DigitalGiftConfiguration } from "@/types";

/**
 * Management-only visibility settings. Account and address content remains
 * sourced from the shared invitation detail record.
 */
export const mockDigitalGiftConfiguration: Readonly<
  Record<string, DigitalGiftConfiguration>
> = {
  inv_01: {
    enabled: true,
    physicalGiftEnabled: true,
  },
  inv_02: {
    enabled: false,
    physicalGiftEnabled: false,
  },
};
