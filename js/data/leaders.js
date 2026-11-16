/**
 * People shown on the About page, in two sections.
 *
 * HOW TO ADD OR UPDATE A PERSON  (edit only this file)
 *   - group   : "governance" (Chairperson, Board of Trustees),
 *               "advisory" (Advisory Board), or
 *               "leadership" (staff who run the Foundation day to day).
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
    group: "governance",
    image: "images/leadership/oyetunji-funmilayo-portrait.jpg",
    imageAlt: "Mrs. Oyetunji Funmilayo, Chairperson of LASAL Foundation",
    imagePosition: "center top",
    bio: [
      "Funmi Oyetunji is a chartered accountant and a seasoned finance and business professional with about 40 years of experience across accounting, banking, financial advisory, real estate, and corporate governance in both Nigeria and the United Kingdom.",
      "She is the CEO of Abitos Financial Services Limited, a private portfolio and real estate company and serves on a number of boards including as Chairman of Prestige Assurance Plc. She has attended Leadership and Board Effectiveness programs at Harvard Business School, INSEAD and IMD and has taught Finance on the executive programs of the Lagos Business School.",
      "Mrs Oyetunji is the Founder and Chairman of LASAL Foundation, where she champions education and social mobility through scholarships, mentorship, and support for indigent but brilliant Nigerian students.",
      "She is the author of the acclaimed book; A Conscious Life: Navigating Critical Stages and Aspects of Life Successfully."
    ]
  },
  {
    id: "bisi-ogunko",
    name: "Mrs. Adebisi Ogunko",
    role: "Trustee",
    group: "governance",
    image: "images/Adebisi_Ogunko.jpeg",
    imageAlt: "Mrs. Adebisi Ogunko, Trustee of LASAL Foundation",
    imagePosition: "center top",
    bio: [
      "Mrs. Bisi Ogunko graduated with a B.Sc. in Psychology from the University of Lagos in 1984 and began her career in banking, working with",
      "Wema Bank and Skye Bank (now Polaris Bank). She later joined Bacad Finance and Investment Company Limited as Head of Money Market Portfolio before gaining experience in facility and hospitality management at Canaan Mall and LASAL Hotel.",
      "In 1999, she became Managing Director of Business Facilitators Ltd, a company involved in brokerage in the areas of real estate, oil and gas and other investments. In 2019, she co-founded Assured Amass Resources Ltd. She is a member of the Board of Trustees of LASAL Foundation,  and a founding member of Praiseville International Helps Ministries. She is intentional and deliberate in achieving targets within set timelines.",
    ]
  },
  {
    id: "tokunbo",
    name: "Mrs. Tokunbo Olufela Mumuney",
    role: "Trustee",
    group: "governance",
    image: "images/MUMNEY.jpeg",
    imageAlt: "Mrs. Tokunbo Mumuney, Trustee of LASAL Foundation",
    imagePosition: "center top",
    imageFit: "contain",
    bio: [
      "Mrs. Tokunbo Olufela Mumuney is a real estate executive with experience across banking, housing management, and property administration. She retired as Deputy General Manager, Commercial Properties, at the Lagos State Development and Property Corporation (LSDPC) in June 2015.",
      "She holds a degree in Mathematics from the University of Port Harcourt, an MBA from Ladoke Akintola University of Technology, and a degree in Real Estate Management from the University of Reading. She is a member of the Royal Institution of Chartered Surveyors (RICS), and leads Florentina Ventures and Homes, the firm she founded.",
      "As a Trustee and mentor of LASAL Foundation, she brings that experience to guiding and empowering young people."
    ]
  },
  {
    id: "femi-oyetunji",
    name: "Dr. Femi Oyetunji",
    role: "Advisory Board",
    group: "advisory",
    image: "images/leadership/dr-femi-oyetunji.jpg",
    imageAlt: "Dr. Femi Oyetunji, Advisory Board of LASAL Foundation",
    imagePosition: "center top",
    bio: [
      "Dr. Femi Oyetunji is a Fellow of the Institute of Actuaries, United Kingdom. He holds a First Class BSc in Statistics and Operational Research, an MSc from Imperial College, London, and a PhD in Statistics from the University of Manchester Institute of Science and Technology.",
      "He began as a lecturer at the University of Ibadan, qualified as an actuary with Bacon & Woodrow in England, and returned to Nigeria to rise to General Manager, Life Operations at AIICO Insurance. He was later Managing Director of Crusader Insurance and founding Managing Director of Alexander Forbes Consulting Actuaries Nigeria, where he supervised major insurance pension schemes.",
      "As Managing Director of Continental Reinsurance, he led its transformation into a pan-African company with subsidiaries in Kenya, Botswana and Cameroun. He is Chairman of SanlamAllianz Life Insurance Nigeria, a former Governing Council member of the Nigerian Insurers Association, and a past President of the Association of Investment Advisers & Portfolio Managers."
    ]
  },
  {
    id: "olaiya-orlando-ojo",
    name: "Olaiya Orlando Ojo",
    role: "Advisory Board",
    group: "advisory",
    image: "images/leadership/chief-olaiya-orlando-ojo.jpg",
    imageAlt: "Olaiya Orlando Ojo, Advisory Board of LASAL Foundation",
    imagePosition: "center center",
    bio: [
      "Olaiya Orlando Ojo is presently Chairman/Managing Associate of Amsa'in Management Consultants, an organisation, strategy and business advisory consultancy; Board member of PR Renal Care (Puerto Rico) Inc; Board member, Horizon Clinic Gambia; Chairman, Instein Organisation Advisory; and Member of the Advisory Panel of the Africa Research Excellence Fund (AREF), which funds talented post-doctoral health researchers in Africa.",
      "Orlando retired from Shell Petroleum Development Company of Nigeria in May 2006 as member of the leadership team: Regional Support Directorate - Shell Exploration & Production Africa Ltd after over 36 years working in companies of the Royal Dutch/Shell. He was the Managing Director/CEO of National Oil & Chemical Marketing plc, of Shell Nigeria Gas Ltd, and General Manager of Togo et Shell, and Societe Togolaise de Stockage, Lome, Togo. After retirement, he served as Chairman of First Guarantee Pensions Ltd, Board member of NESTOIL, and member of the Board of Governors of Lekki British International High School.",
      "Born in Mopa, Kogi State, and widely travelled, he speaks Yoruba, Hausa, English and French fluently. Orlando was educated at the University of Ibadan, Imperial College, Aston University, Lancaster University, the Open University, Ashridge Business School, and the London Business School, where he is a Sloan Fellow (with distinction). He holds a BSc (Hons) Mathematics, a BA (Hons) Arts and Humanities (Philosophy), an MSc (Systems Analysis), an MA (Operational Research) and an MSc (Organisation Consulting) (with merit)."
    ]
  },
  {
    id: "rita-Ebi",
    name: "Ms. Rita Ebi",
    role: "Programs Officer",
    group: "leadership",
    image: "images/rita_ebi.jpeg",
    imageAlt: "Ms. Rita Ebi",
    imagePosition: "center top",
    bio: ["Manages scholarship applications and awards, coordinates beneficiaries, monitors students’ academic progress, maintains programme records, and ensures the effective implementation of scholarship programmes."]
  }
];
