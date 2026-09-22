import type {
  InvitationBuilderContent,
  InvitationBuilderSection,
  InvitationVersion,
} from "@/types";

interface VersionDescriptor {
  versionNumber: number;
  savedAt: string;
  summary: string;
}

const invitationOneHistory: readonly VersionDescriptor[] = [
  {
    versionNumber: 10,
    savedAt: "2026-09-22T18:42:00+07:00",
    summary: "Gallery, wedding venue, and RSVP deadline updated",
  },
  {
    versionNumber: 9,
    savedAt: "2026-09-21T14:10:00+07:00",
    summary: "RSVP settings and welcome message updated",
  },
  {
    versionNumber: 8,
    savedAt: "2026-09-20T09:30:00+07:00",
    summary: "Gallery and couple photos updated",
  },
  {
    versionNumber: 7,
    savedAt: "2026-09-18T17:15:00+07:00",
    summary: "Digital Gift account updated",
  },
  {
    versionNumber: 6,
    savedAt: "2026-09-15T11:20:00+07:00",
    summary: "Wedding venue and event time changed",
  },
  {
    versionNumber: 5,
    savedAt: "2026-09-12T16:04:00+07:00",
    summary: "Invitation content updated",
  },
  {
    versionNumber: 4,
    savedAt: "2026-09-08T19:40:00+07:00",
    summary: "Wishes settings updated",
  },
  {
    versionNumber: 3,
    savedAt: "2026-09-05T13:22:00+07:00",
    summary: "Couple story and family details updated",
  },
  {
    versionNumber: 2,
    savedAt: "2026-09-02T10:05:00+07:00",
    summary: "Couple names and opening message updated",
  },
  {
    versionNumber: 1,
    savedAt: "2026-08-28T15:30:00+07:00",
    summary: "Initial invitation content saved",
  },
];

const invitationThreeHistory: readonly VersionDescriptor[] = [
  {
    versionNumber: 4,
    savedAt: "2026-09-18T15:40:00+07:00",
    summary: "Invitation content finalized",
  },
  {
    versionNumber: 3,
    savedAt: "2026-09-17T11:25:00+07:00",
    summary: "Wedding venue and event time changed",
  },
  {
    versionNumber: 2,
    savedAt: "2026-09-14T09:15:00+07:00",
    summary: "Gallery and couple photos updated",
  },
  {
    versionNumber: 1,
    savedAt: "2026-09-10T13:00:00+07:00",
    summary: "Initial invitation content saved",
  },
];

const descriptorsByInvitation: Readonly<
  Record<string, readonly VersionDescriptor[]>
> = {
  inv_01: invitationOneHistory,
  inv_02: [
    {
      versionNumber: 1,
      savedAt: "2026-09-21T10:30:00+07:00",
      summary: "Initial invitation content saved",
    },
  ],
  inv_03: invitationThreeHistory,
};

function cloneContent(
  content: InvitationBuilderContent,
): InvitationBuilderContent {
  return JSON.parse(JSON.stringify(content)) as InvitationBuilderContent;
}

function buildHistoricalContent(
  currentContent: InvitationBuilderContent,
  currentSections: InvitationBuilderSection[],
  versionNumber: number,
  currentVersionNumber: number,
): {
  content: InvitationBuilderContent;
  sections: InvitationBuilderSection[];
} {
  const content = cloneContent(currentContent);
  const sections = currentSections.map((section) => ({ ...section }));
  const stepsBack = currentVersionNumber - versionNumber;

  if (stepsBack >= 1) {
    content.rsvp.headline = "Kindly share your attendance";
    content.rsvp.collectMealPreference = false;
  }
  if (stepsBack >= 2) {
    content.gallery = content.gallery.slice(0, 3);
    content.loveStory.title = "Where Our Story Began";
  }
  if (stepsBack >= 4) {
    content.digitalGift.accounts = [];
    const giftSection = sections.find(
      (section) => section.type === "digitalGift",
    );
    if (giftSection) giftSection.visible = false;
  }
  if (stepsBack >= 5) {
    content.events[0] = {
      ...content.events[0],
      startTime: "09:00",
      venue: "Jakarta Celebration Hall",
      address: "Central Jakarta",
    };
  }
  if (stepsBack >= 7) {
    content.wishes.moderationEnabled = false;
    content.loveStory.body =
      "A simple beginning, shared with the people we love most.";
  }
  if (stepsBack >= 8) {
    content.gallery = content.gallery.slice(0, 1);
    content.quotes = content.quotes.slice(0, 1);
  }
  if (stepsBack >= 9) {
    for (const section of sections) {
      if (section.optional) section.visible = false;
    }
  }

  return { content, sections };
}

export function createMockInvitationVersions(
  invitationId: string,
  currentContent: InvitationBuilderContent,
  currentSections: InvitationBuilderSection[],
): InvitationVersion[] {
  const descriptors = descriptorsByInvitation[invitationId] ?? [
    {
      versionNumber: 1,
      savedAt: "2026-09-20T12:00:00+07:00",
      summary: "Current invitation content saved",
    },
  ];
  const currentVersionNumber = descriptors[0]?.versionNumber ?? 1;

  return descriptors.map((descriptor, index) => {
    const snapshot = buildHistoricalContent(
      currentContent,
      currentSections,
      descriptor.versionNumber,
      currentVersionNumber,
    );

    return {
      ...descriptor,
      ...snapshot,
      isCurrent: index === 0,
    };
  });
}
