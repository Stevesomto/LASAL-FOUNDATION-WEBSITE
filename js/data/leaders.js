/**
 * Leadership profiles (About Us > Leadership & Governance).
 *
 * HOW TO ADD OR UPDATE A LEADER  (edit only this file)
 *   - bio     : array of paragraphs. Shown IN FULL on leader-details.html?id=<id>.
 *   - summary : optional short intro for the About page card. If you leave it out,
 *               the card uses the first paragraph of `bio`.
 *   - The About page card always shows just 3 lines, then a "Read More" button
 *     that opens the full profile. This works the same for every leader.
 *   - Optional: imageFit: "contain" (for logos / placeholder images).
 */
export const leadersData = [
  {
    id: "funmi-oyetunji",
    name: "Mrs. Funmi Oyetunji, B.Sc., FCA, FCCA",
    role: "Chairperson",
    image: "images/leadership/oyetunji-funmilayo-portrait.jpg",
    imageAlt: "Mrs. Oyetunji Funmilayo, Chairperson of LASAL Foundation",
    imagePosition: "center top",
    bio: [
      "A seasoned finance and business professional with about 40 years of experience across accounting, banking, financial advisory, real estate, and corporate governance.",
      "She is the CEO of Abitos Financial Services Limited and Chairman of Prestige Assurance Plc.",
      "She is also the Chairman of LASAL Foundation, where she champions education and social mobility through scholarships, mentorship, and support for indigent but brilliant Nigerian students.",
      "She is also an author of A Conscious Life: Navigating Critical Stages and Aspects of Life Successfully."
    ]
  },
  {
    id: "bisi-ogunko",
    name: "Mrs. Adebisi Ogunko",
    role: "Trustee",
    image: "images/Adebisi_Ogunko.jpeg",
    imageAlt: "Mrs. Adebisi Ogunko, Trustee of LASAL Foundation",
    imagePosition: "center top",
    bio: [
      "Born in Lagos and attended Queens School Enugu and Federal Government College Enugu for ordinary school leaving certificates and advance level certificates respectively.",
      "She graduated with a Bsc Psychology degree from University of Lagos in 1984 and started her career in Banking.",
      "She worked in Wema Bank and then Skye Bank (now Polaris Bank). She went on to Bacad Finance and Investment Company Limited where she was the Head of Money Market Portfolio.",
      "She went on to have a stint of Facility Management at Canaan Mall and hospitality Management at Lasal Hotel. In 1999 Mrs. Bisi Ogunko became Managing Director of Business Facilitators Ltd, a company actively involved in real estate, oil and gas and investment brokerage. In 2019, she became a co-founder of Assured Amass Resources Ltd.",
      "She is a member of trustee of Lasal Foundation - an NGO committed to giving scholarship to indigent but bright students in the tertiary institution. She is also one of the founding members of Praiseville International Helps Ministries. An NGO committed to spiritual and financial upliftment of the poor, orphans and widows.",
      "She is blessed with a son - Joseph Feyisola Ogunko.",
      "She is intentional and deliberate in the achievement of targets within set timelines."
    ]
  },
  {
    id: "tokunbo",
    name: "Mrs. Tokunbo Olufela Mumuney",
    role: "Trustee",
    image: "images/MUMNEY.jpeg",
    imageAlt: "Mrs. Tokunbo Mumuney, Trustee of LASAL Foundation",
    imagePosition: "center top",
    imageFit: "contain",
    bio: ["Mrs. Tokunbo Olufela Mumuney is an accomplished real estate executive with extensive experience in banking, real estate, housing management, and property administration. She retired as Deputy General Manager, Commercial Properties, at the Lagos State Development and Property Corporation (LSDPC) in June 2015 and currently serves as Head of Practice at Florentina Ventures and Homes, a real estate firm she founded.",
    "She holds a degree in Mathematics from the University of Port Harcourt, an MBA from Ladoke Akintola University of Technology, and a degree in Real Estate Management from the University of Reading. She is a member of the Royal Institution of Chartered Surveyors (RICS).",
    "As a mentor with the LASAL Foundation, she contributes her wealth of experience and knowledge to guiding and empowering young people."]
  },
  {
    id: "rita-Ebi",
    name: "Ms. Rita Ebi",
    role: "Programs Officer",
    image: "images/rita_ebi.jpeg",
    imageAlt: "Ms. Rita Ebi",
    imagePosition: "center top",
    bio: ["Manages scholarship applications and awards, coordinates beneficiaries, monitors students’ academic progress, maintains programme records, and ensures the effective implementation of scholarship programmes."]
  }
];
