"use server";

import { selectTestimonials } from "@/ai/flows/select-testimonials";

const allTestimonials = [
    "LexPage was instrumental in our corporate merger. Their attention to detail and legal expertise were second to none. I couldn't have asked for a better team.",
    "After my accident, I was lost. The team at LexPage handled my personal injury case with such care and professionalism, securing a settlement that changed my life.",
    "As a startup, navigating intellectual property law was daunting. LexPage protected our assets and gave us the peace of mind to focus on growing our business.",
    "The criminal defense team at LexPage is outstanding. They fought tirelessly for me and achieved a result I didn't think was possible. I'm forever grateful.",
    "Going through a divorce is tough, but my attorney at LexPage was a compassionate and strategic guide through the entire family law process.",
    "Buying my first commercial property was a huge step. LexPage's real estate team made the transaction smooth and secure.",
    "We faced a complex civil litigation case that threatened our company. LexPage's litigation team was brilliant, strategic, and ultimately victorious.",
    "I highly recommend LexPage for any business law matters. They are responsive, knowledgeable, and truly partners in your success.",
    "When I needed a strong defense, LexPage was there. Their criminal law expertise is top-notch."
];

export async function getRelevantTestimonials(legalNeed: string): Promise<string[]> {
  try {
    if (!legalNeed) {
      return allTestimonials.slice(0, 3); // Return a few default testimonials if no need is specified
    }
    const relevantTestimonials = await selectTestimonials({
      legalNeed,
      allTestimonials,
    });
    return relevantTestimonials.length > 0 ? relevantTestimonials : ["No specific testimonials found for your need, but here's what our clients say: ... " + allTestimonials[0]];
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    // Return a subset as a fallback in case of AI error
    return allTestimonials.slice(0, 3);
  }
}
