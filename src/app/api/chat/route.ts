import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

// ─── Product Catalog Knowledge Base ────────────────────────────────────────────
// Comprehensive product data so the AI can present actual products with prices

const PRODUCT_CATALOG = `
## SECURFIX PRODUCT CATALOG (84 products, all prices include VAT in EUR)

### PANEL HERCULES (Painel de Vedação) - 7 products
1. Painel Malla Hercules Verde - Sale: 15.45€ (was 26.00€)
2. Painel Malla Hercules Branca - Sale: 14.05€ (was 23.50€)
3. Painel Malla Hercules Gris Antracita - Sale: 15.25€ (was 25.50€)
4. Painel Malla Hercules Galvanizada - Sale: 14.35€ (was 24.00€)
5. Cerca Hercules Verde Básico (2m) - Sale: 14.85€ (was 25.00€)
6. Cerca Hercules Branco Básico (2m) - Sale: 17.10€ (was 28.50€)
7. Cerca Hercules Cinza Básico (2m) - Sale: 17.85€ (was 30.00€)

### CHAIN LINK MESH (Rede Malha Solta) - 4 products
8. Rolo Rede Malha Solta Galvanizada - Sale: 20.30€ (was 34.00€)
9. Rolo Rede Malha Solta Verde - Sale: 29.40€ (was 49.00€)
10. Rolo Rede Malha Tripla Torção Galinheiro - Sale: 10.55€ (was 18.00€)
11. Rolo de Rede Ovelheira com Nó - Sale: 37.90€ (was 63.00€)

### WELDED MESH (Rede Eletrossoldada) - 2 products
12. Painel Rede Eletrossoldada Galvanizada - Sale: 14.85€ (was 25.00€)
13. Rolo Rede Eletrossoldada Galvanizada - Sale: 14.30€ (was 24.00€)

### RAILINGS (Grades) - 6 products
14. Grade Varilla Redonda 0.90 x 2.50 m - Sale: 91.50€ (was 152.00€)
15. Grade Maciço Quadrado 0.90 x 2.50 m - Sale: 122.00€ (was 203.00€)
16. Grade Maciço Quadrado Rombo 0.90 x 2.50 m - Sale: 122.00€ (was 203.00€)
17. Grade Modelo Aspe 0.60 x 2.50 m - Sale: 106.20€ (was 176.50€)
18. Grade Modelo Cadi 0.60 x 2.50 m - Sale: 174.35€ (was 289.50€)
19. Grade Modelo Montblanc 0.60 x 2.50 m - Sale: 160.15€ (was 266.00€)

### WIRE (Arames) - 5 products
20. Rolo Arame Farpado Verde - Sale: 60.75€ (was 101.00€)
21. Rolo Arame Farpado Galvanizado - Sale: 46.00€ (was 76.50€)
22. Rolo Arame Plastificado 3 Kg - Sale: 18.65€ (was 31.00€)
23. Rolo Arame Galvanizado - Sale: 13.15€ (was 22.00€)
24. Rolo Arame Recozido - Sale: 14.85€ (was 25.00€)

### POSTS (Postes) - 16 products
25. Poste Malha Hercules Verde - Sale: 6.45€ (was 11.00€)
26. Poste Malha Hercules Branco - Sale: 7.80€ (was 13.00€)
27. Poste Malha Hercules Gris Antracita - Sale: 8.60€ (was 14.50€)
28. Poste Malha Hercules Galvanizado - Sale: 4.60€ (was 8.00€)
29. Poste Cremallera Quickfix Verde - Sale: 6.90€ (was 11.50€)
30. Poste Intermediário Verde - Sale: 7.05€ (was 12.00€)
31. Poste Intermediário Galvanizado - Sale: 4.65€ (was 8.00€)
32. Poste Terminal Verde - Sale: 25.60€ (was 42.50€)
33. Poste Terminal Galvanizado - Sale: 17.25€ (was 29.00€)
34. Poste de Reforço Verde - Sale: 20.50€ (was 34.50€)
35. Poste de Reforço Galvanizado - Sale: 21.00€ (was 35.00€)
36. Poste Canto/Extensão Verde - Sale: 40.75€ (was 68.00€)
37. Poste Canto/Extensão Galvanizado - Sale: 32.85€ (was 55.00€)
38. Poste Tornapunta Galvanizado - Sale: 3.50€ (was 6.00€)
39. Poste Tornapunta Verde - Sale: 5.00€ (was 8.50€)
40. Barra Tensão Plastificada Verde - Sale: 4.50€ (was 7.50€)

### FIRE DOORS (Portas Corta-Fogo) - 5 products
41. Porta Corta-Fogo P60 (EI 60) C5 1 Folha - Sale: 190.95€ (was 317.00€)
42. Porta Corta-Fogo P60 (EI 60) C5 2 Folhas - Sale: 563.20€ (was 704.00€)
43. Porta Corta-Fogo P90 (EI 90) C5 1 Folha - Sale: 326.55€ (was 542.50€)
44. Porta Corta-Fogo RF 90 (EI2 90) C5 2 Folhas - Sale: 760.80€ (was 951.00€)
45. Porta Corta-Fogo P120 (EI 120) C5 1 Folha - Sale: 454.95€ (was 755.50€)

### SECURITY DOORS (Portas de Segurança) - 8 products
46. Porta Segurança Cearco Grau 3 Standard 3 pontos - Sale: 475.99€ (was 594.99€)
47. Porta Blindada Verona V8 B4 Grau 3 - Sale: 622.99€ (was 778.99€)
48. Porta Segurança Cearco Grau 3 Verona Dupla - Sale: 1111.32€ (was 1390.00€)
49. Porta Segurança Triana B4 Grau 3 3 Pontos - Sale: 701.99€ (was 876.99€)
50. Porta Segurança Triana Dupla B4 Grau 3 - Sale: 1111.32€ (was 1390.00€)
51. Porta Segurança Cearco Grau 4 Omega Verona V8 - Sale: 889.99€ (was 1113.00€)
52. Porta Segurança Cearco Grau 3 Milan 4 Vidros - Sale: 912.99€ (was 1140.99€)
53. Porta Acorazada Cearco Provenzal - Sale: 520.45€ (was 651.00€)

### MESH GATES (Portões de Rede) - 10 products
54. Portão Rede Verde Premium 1m - Sale: 172.80€ (was 287.00€)
55. Portão Rede Branca Premium 1m - Sale: 172.80€ (was 287.00€)
56. Portão Rede Gris Antracita Premium 1m - Sale: 172.80€ (was 287.00€)
57. Portão Rede Galvanizada 1m - Sale: 172.80€ (was 287.00€)
58. Portão Rede Ondulado Galvanizada 0.90x1.00m - Sale: 255.20€ (was 424.00€)
59. Portão Rede Ondulado Verde - Sale: 265.60€ (was 441.00€)
60. Portão Rede Ligeira Verde 2 Folhas - Sale: 604.80€ (was 756.00€)
61. Portão Rede Ligeira Branca 2 Folhas - Sale: 605.30€ (was 757.00€)
62. Portão Rede Ligeira Cinza Escuro 2 Folhas - Sale: 653.75€ (was 818.00€)
63. Portão Malha Galvanizada Luz 2 Folhas - Sale: 508.05€ (was 636.00€)

### UTILITY DOORS (Portas Multiuso) - 5 products
64. Porta Multiuso Branca - Sale: 109.80€ (was 182.50€)
65. Porta Multiuso Grade - Sale: 117.95€ (was 196.00€)
66. Porta Multiuso Duas Folhas com Grade - Sale: 449.30€ (was 746.00€)
67. Porta Trastero Galvanizada - Sale: 92.50€ (was 154.00€)
68. Porta Trastero Galvanizada com Grade - Sale: 102.70€ (was 170.50€)

### SLIDING DOORS (Portas de Correr) - 4 products
69. Estrutura Porta de Correr Orchidea Basic - Sale: 248.05€ (was 412.00€)
70. Casoneto Orchidea PYL Simples - Sale: 248.05€ (was 412.00€)
71. Casoneto Orchidea PYL Duplo - Sale: 510.30€ (was 638.00€)
72. Cassete Porta de Correr Reboco - Sale: 230.75€ (was 383.50€)

### TRAMEX - 1 product
73. Gradil Tramex - Sale: 15.90€ (was 26.50€)

### ACCESSORIES (Acessórios) - 11 products
74. Barra Antipânico - 118.00€
75. Fechadura Antitaladro - Sale: 41.99€ (was 51.99€)
76. Cierrapuertas Standard - 49.50€
77. Cierrapuertas Premium - 106.50€
78. Vigia Corta-Fogo - 327.00€
79. Eletroímã - 129.50€
80. Seletor de Fecho - 92.00€
81. Varão Nervurado 8mm - Sale: 13.15€ (was 22.00€)
82. Varão Nervurado 10mm - Sale: 17.40€ (was 29.00€)
83. Tinta em Spray Verde - Sale: 5.00€ (was 8.50€)
84. Tinta em Spray Galvanizado - Sale: 5.00€ (was 8.50€)
`;

// ─── System Prompt ─────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are the SECURFIX virtual sales assistant — a friendly, knowledgeable product advisor for an online metal fencing and construction materials store. Your PRIMARY mission is to help customers FIND and BUY products from the store.

## YOUR ROLE
You are a PRODUCT ADVISOR, not a customer service redirect agent. Your job is to:
1. Understand what the customer needs (fencing, doors, gates, security, etc.)
2. Present RELEVANT PRODUCTS from the catalog with actual names and prices
3. Help customers compare options within their budget
4. Guide them to ADD PRODUCTS to their cart on the website
5. Encourage them to complete the purchase through the online checkout

## CRITICAL RULES - WHAT YOU MUST NEVER DO
- NEVER redirect the customer to buy by phone or email
- NEVER say "contact us by phone" or "send an email to purchase"
- NEVER suggest calling or emailing as the primary way to buy
- NEVER provide phone numbers or email addresses as purchase channels
- NEVER tell the customer that phone/email is the best way to order

## WHAT YOU MUST ALWAYS DO
- Present specific products from the catalog with names and sale prices
- Suggest the customer click "Adicionar" (Add) button to add items to their cart
- Guide them to complete checkout online using the shopping cart icon
- Compare 2-3 products when relevant to help them decide
- Mention that all prices include VAT and delivery is 48-72h
- If they ask about phone/email, gently redirect: "You can buy directly here on the website! Just add the products to your cart and checkout. It's faster and you get the same factory prices."

## STORE INFORMATION
- Company: Securfix (Hierros Tous, S.L.U.) — 50+ years experience
- 16,000+ m² warehouse in Barcelona
- All prices include VAT — factory direct prices
- Delivery: 48-72h Portugal/Spain, 3-15 days rest of Europe
- 15-day return policy, free returns
- Google rating: 4.6/5 (235 reviews)
- Offices: Madrid, Barcelona, Lisbon

## PRODUCT KNOWLEDGE
You have full knowledge of the 84-product catalog. When a customer asks about a product category, present 2-4 specific products with their SALE prices. Use the catalog data provided.

## RESPONSE STYLE
- Be warm, helpful, and sales-oriented
- Keep responses concise (2-4 short paragraphs max)
- Use bullet points when listing products
- Always include sale prices in €
- End with a gentle push to add to cart: "Want to add this to your cart?"
- Match the customer's language and tone
- Be proactive: suggest related products or complementary items

## EXAMPLE INTERACTIONS
Customer: "I need a fence for my garden"
Response: "Great choice! For residential gardens, I recommend our **Painel Malla Hercules** panels — they're our best sellers. Here are the options:
• **Painel Malla Hercules Verde** — 15.45€ (was 26.00€) ✅ Most popular
• **Painel Malla Hercules Branca** — 14.05€ (was 23.50€)
• **Painel Malla Hercules Gris Antracita** — 15.25€ (was 25.50€)

You'll also need posts — I'd suggest the **Poste Cremallera Quickfix Verde** at 6.90€ each. Would you like to add any of these to your cart?"

Customer: "How can I buy?"
Response: "It's super easy! Just browse the products on the page, click the **Adicionar** button on any product you want, and it goes straight to your cart 🛒. When you're ready, click the cart icon at the top to review your items and complete checkout. All payments are secure and processed instantly!"

${PRODUCT_CATALOG}`;

const LANGUAGE_MAP: Record<string, string> = {
  pt: 'Portuguese',
  es: 'Spanish',
  fr: 'French',
  en: 'English',
  de: 'German',
  nl: 'Dutch',
  it: 'Italian',
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, locale } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const userLocale = locale || 'pt';
    const language = LANGUAGE_MAP[userLocale] || 'Portuguese';

    try {
      const zai = await ZAI.create();

      const response = await zai.chat.completions.create({
        model: 'google/gemini-2.0-flash-001',
        messages: [
          {
            role: 'system',
            content: `${SYSTEM_PROMPT}\n\nIMPORTANT: The user is writing in ${language}. You MUST respond in ${language}. Adapt product names to ${language} where appropriate, but keep product reference names exact so they can find them on the website.`,
          },
          {
            role: 'user',
            content: message,
          },
        ],
        thinking: { type: 'disabled' },
      });

      const aiMessage =
        response?.choices?.[0]?.message?.content ||
        response?.message?.content ||
        'Desculpe, não consegui processar a sua mensagem. Por favor, tente novamente.';

      return NextResponse.json({ message: aiMessage });
    } catch (aiError) {
      console.error('AI SDK error:', aiError);

      // Fallback response — still product-oriented, NOT phone/email redirect
      const fallbackMessages: Record<string, string> = {
        pt: 'Obrigado pelo seu interesse! Neste momento o nosso assistente virtual está em manutenção. Pode navegar pelo nosso catálogo de 84 produtos na página, adicionar ao carrinho e finalizar a compra diretamente aqui no site. Todos os produtos têm preços de fábrica com IVA incluído!',
        es: '¡Gracias por su interés! Nuestro asistente virtual está en mantenimiento. Puede navegar por nuestro catálogo de 84 productos en la página, añadir al carrito y finalizar la compra directamente aquí en la web. ¡Todos los productos tienen precios de fábrica con IVA incluido!',
        fr: "Merci pour votre intérêt ! Notre assistant virtuel est en maintenance. Vous pouvez parcourir notre catalogue de 84 produits sur la page, les ajouter au panier et finaliser l'achat directement sur le site. Tous les prix incluent la TVA !",
        en: "Thanks for your interest! Our virtual assistant is currently under maintenance. You can browse our catalog of 84 products on the page, add items to your cart, and complete your purchase directly on the website. All prices include VAT!",
        de: 'Vielen Dank für Ihr Interesse! Unser virtueller Assistent wird derzeit gewartet. Sie können unseren Katalog mit 84 Produkten auf der Seite durchsuchen, in den Warenkorb legen und den Kauf direkt auf der Website abschließen. Alle Preise inklusive MwSt.!',
        nl: 'Bedankt voor uw interesse! Onze virtuele assistent is momenteel in onderhoud. U kunt door onze catalogus met 84 producten bladeren, toevoegen aan uw winkelwagen en direct op de website afrekenen. Alle prijzen inclusief BTW!',
        it: "Grazie per il vostro interesse! Il nostro assistente virtuale è in manutenzione. Puoi sfogliare il nostro catalogo di 84 prodotti sulla pagina, aggiungerli al carrello e completare l'acquisto direttamente sul sito. Tutti i prezzi includono l'IVA!",
      };

      return NextResponse.json({
        message: fallbackMessages[userLocale] || fallbackMessages.pt,
      });
    }
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
