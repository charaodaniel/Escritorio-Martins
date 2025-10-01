"use server";

import { selectTestimonials } from "@/ai/flows/select-testimonials";

const allTestimonials = [
    "A LexPage foi fundamental em nossa fusão corporativa. A atenção aos detalhes e a expertise jurídica foram inigualáveis. Eu não poderia ter pedido uma equipe melhor.",
    "Após meu acidente, eu estava perdido. A equipe da LexPage cuidou do meu caso de lesão corporal com tanto cuidado e profissionalismo, garantindo um acordo que mudou minha vida.",
    "Como startup, navegar pela lei de propriedade intelectual era assustador. A LexPage protegeu nossos ativos e nos deu a tranquilidade para focar no crescimento do nosso negócio.",
    "A equipe de defesa criminal da LexPage é excepcional. Eles lutaram incansavelmente por mim e alcançaram um resultado que eu não achava possível. Sou eternamente grato.",
    "Passar por um divórcio é difícil, mas meu advogado na LexPage foi um guia compassivo e estratégico durante todo o processo de direito de família.",
    "Comprar meu primeiro imóvel comercial foi um grande passo. A equipe imobiliária da LexPage tornou a transação tranquila e segura.",
    "Enfrentamos um caso complexo de contencioso cível que ameaçava nossa empresa. A equipe de litígios da LexPage foi brilhante, estratégica e, no final, vitoriosa.",
    "Eu recomendo fortemente a LexPage para quaisquer questões de direito empresarial. Eles são responsivos, experientes e verdadeiros parceiros no seu sucesso.",
    "Quando precisei de uma defesa forte, a LexPage estava lá. A experiência deles em direito criminal é de primeira linha."
];

export async function getRelevantTestimonials(legalNeed: string): Promise<string[]> {
  try {
    if (!legalNeed) {
      return allTestimonials.slice(0, 3); // Retorna alguns depoimentos padrão se nenhuma necessidade for especificada
    }
    const relevantTestimonials = await selectTestimonials({
      legalNeed,
      allTestimonials,
    });
    return relevantTestimonials.length > 0 ? relevantTestimonials : ["Nenhum depoimento específico encontrado para sua necessidade, mas veja o que nossos clientes dizem: ... " + allTestimonials[0]];
  } catch (error) {
    console.error("Erro ao buscar depoimentos:", error);
    // Retorna um subconjunto como fallback em caso de erro da IA
    return allTestimonials.slice(0, 3);
  }
}
