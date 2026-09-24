/**
 * Fields shared by every Moment Kita notification surface.
 *
 * Product areas extend this small record with their own categories, read
 * state, and resource references instead of maintaining unrelated models for
 * the same title/message/timestamp contract.
 */
export interface NotificationRecord {
  id: string;
  title: string;
  description: string;
  /** ISO 8601 timestamp. */
  occurredAt: string;
}

/** Shared delivery-channel shape extended by Customer and Admin preferences. */
export interface NotificationDeliveryPreference {
  id: string;
  title: string;
  description: string;
  inApp: boolean;
  email: boolean;
  /** Mandatory preferences cannot be disabled in either channel. */
  mandatory: boolean;
}
