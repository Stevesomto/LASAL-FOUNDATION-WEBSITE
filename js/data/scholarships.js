/**
 * status: "open" accepts applications; "closed" hides the application forms and shows
 * "Closed – next intake coming soon". To reopen, set status to "open" and update deadline.
 */
export const scholarshipsData = [
    {
      id: "stem-excellence-2026",
      title: "STEM Excellence Scholarship",
      category: "Undergraduate",
      amount: "₦250,000 / year",
      status: "closed",
      deadline: "October 15, 2026",
      description: "Full tuition assistance and dedicated mentorship for high-achieving undergraduate students pursuing STEM degrees.",
      eligibility: "Open to first and second-year university students with a minimum CGPA of 3.50 on a 5.0 scale."
    },
    // {
    //   id: "community-leadership-award",
    //   title: "Community Leadership Award",
    //   category: "All Levels",
    //   amount: "₦300,000 one-time",
    //   status: "open",
    //   deadline: "December 15, 2026",
    //   description: "Recognizing and funding students who demonstrate exceptional civic engagement alongside academic excellence.",
    //   eligibility: "Enrolled students with verified community service records."
    // }
  ];

export const CLOSED_LABEL = "Closed – next intake coming soon";

export function isScholarshipOpen(scholarship) {
  return scholarship.status !== "closed";
}

export function deadlineText(scholarship) {
  return isScholarshipOpen(scholarship) ? scholarship.deadline : CLOSED_LABEL;
}
