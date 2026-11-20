export type Testimony = {
  name: string;
  role: string;
  quote: string;
};

const client31: Testimony = {
  name: "Client, Age 31",
  role: "ARISE Graduate · Tulsa, OK",
  quote: "After experiencing 6 failed attempts at treatment, I have never seen or experienced such a caring, knowledgeable, and helpful staff. Through treatment I was able to get my family, job, drivers license, self-love, confidence and life back.",
};

const jasmineR: Testimony = {
  name: "Jasmine R.",
  role: "ARISE Graduate · Tulsa",
  quote: "ActionSteps gave me back my life — and gave my children their mom back. I have a job, a home, and three years sober.",
};

const marcusT: Testimony = {
  name: "Marcus T.",
  role: "Father · ASCEND Alumni",
  quote: "I was facing 10 years. Today I'm a foreman with health insurance, a sponsor, and a family that trusts me again.",
};

const lindaH: Testimony = {
  name: "Linda H.",
  role: "Mother of a Graduate",
  quote: "I got my son back. Real, present, and healthy. I'll spend the rest of my life telling people about ActionSteps.",
};

const deshawnK: Testimony = {
  name: "DeShawn K.",
  role: "ARISE Graduate",
  quote: "It was the first place that treated me like a human being instead of a case file. That changed everything.",
};

const mitchell: Testimony = {
  name: "Hon. R. Mitchell",
  role: "Tulsa County Court",
  quote: "The outcomes ActionSteps produces are unmatched. I send people there with confidence.",
};

const reneeM: Testimony = {
  name: "Renee M.",
  role: "Employer Partner",
  quote: "ASCEND alumni are some of my most reliable, dedicated employees. We hire from this program every year.",
};

const kendraW: Testimony = {
  name: "Kendra W.",
  role: "DA Investigator · Tulsa County",
  quote: "We see the difference on the other side. Men who complete ARISE show up — for court, for probation, and for their families — instead of racking up new charges.",
};

export const allTestimonies: Testimony[] = [client31, jasmineR, marcusT, lindaH, deshawnK, mitchell, reneeM, kendraW];

export const ariseTestimonies: Testimony[] = [jasmineR, deshawnK, mitchell];

export const ascendTestimonies: Testimony[] = [marcusT, reneeM];

export const impactTestimonies: Testimony[] = [client31, lindaH, kendraW];
