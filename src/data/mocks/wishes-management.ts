import type { WishesSettingsSummary, WishRecord } from "@/types";

export interface WishesManagementMockRecord {
  wishes: WishRecord[];
  settings: WishesSettingsSummary;
}

export const mockWishesManagementByInvitation: Record<
  string,
  WishesManagementMockRecord
> = {
  inv_01: {
    wishes: [
      {
        id: "wish_01",
        guestId: "guest_03",
        message:
          "Dearest Raka and Ayu, we are overjoyed to witness your sacred union. May your marriage be filled with endless peace, affection, and grace. We cannot wait to celebrate with you at the Grand Ballroom!",
        submittedAt: "2026-10-23T14:15:00+07:00",
        status: "pending",
        source: "guest_link",
      },
      {
        id: "wish_02",
        publicAuthor: "Nadira Salsabila",
        publicInitials: "NS",
        message:
          "Happy wedding, Kak Ayu and Kak Raka! Semoga lancar sampai hari H. Wishing you both boundless joy and happiness in this next chapter.",
        submittedAt: "2026-10-23T11:20:00+07:00",
        status: "pending",
        source: "public_link",
      },
      {
        id: "wish_03",
        guestId: "guest_04",
        message:
          "Wishing our favourite couple the absolute world! Counting down the days until we land in Jakarta. Here is to a lifetime of laughter and endless adventure together.",
        submittedAt: "2026-10-22T19:40:00+07:00",
        status: "published",
        source: "guest_link",
      },
      {
        id: "wish_04",
        guestId: "guest_05",
        message:
          "Selamat menempuh hidup baru Raka dan Ayu. Semoga senantiasa rukun, saling melengkapi, dan dilimpahi berkah serta kebahagiaan. Salam hangat dari keluarga besar di Jogja.",
        submittedAt: "2026-10-21T11:25:00+07:00",
        status: "published",
        source: "guest_link",
      },
      {
        id: "wish_05",
        guestId: "guest_02",
        message:
          "My sweetest Ayu! I still remember when you first told me about Raka during our Paris studio days. To see you two together today is pure magic. Ready for the early makeup call!",
        submittedAt: "2026-10-19T09:12:00+07:00",
        status: "published",
        source: "guest_link",
      },
      {
        id: "wish_06",
        publicAuthor: "A Former Colleague",
        publicInitials: "FC",
        message:
          "Congratulations, Raka and Ayu. Wishing you a joyful celebration and a wonderful life together.",
        submittedAt: "2026-10-18T16:30:00+07:00",
        status: "hidden",
        source: "public_link",
      },
      {
        id: "wish_07",
        guestId: "guest_06",
        message:
          "I am sorry I cannot join the celebration in person. Sending all my love and prayers for a beautiful day and a happy life together.",
        submittedAt: "2026-10-18T10:05:00+07:00",
        status: "hidden",
        source: "guest_link",
      },
    ],
    settings: {
      enabled: true,
      moderationMode: "approval_required",
    },
  },
};
