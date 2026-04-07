import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

const SYSTEM_PROMPT = `You are Securfix's virtual assistant, an expert in metal fencing, gates, doors, and construction materials. Securfix (Hierros Tous, S.L.U.) is a company with over 50 years of experience specializing in:
- Metal fencing (residential, industrial, agricultural)
- Security doors (Grade 3 and 4)
- Fire doors (certified EI 60, EI 90, EI 120)
- Mesh gates and sliding doors
- Posts, accessories, wires
- Tramex grating and perforated sheets

Key facts:
- Factory prices, all prices include VAT
- Delivery: 48-72h for Portugal/Spain, 3-15 days for rest of Europe
- 16,000+ m² warehouse in Barcelona
- Google rating: 4.6/5 (235 reviews)
- Offices in Madrid, Barcelona, and Lisbon
- Phone Spain: (+34) 910 606 414
- Phone Portugal: (+351) 300 528 280
- Email: comercial@securfix.pt
- 15-day return policy, free returns
- Lowest price guarantee

Help customers find products, answer questions about specifications, pricing, and installation. Always respond in the user's language. Be helpful, professional, and encourage purchases when appropriate. Keep responses concise and focused.`;

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
            content: `${SYSTEM_PROMPT}\n\nIMPORTANT: The user is writing in ${language}. You MUST respond in ${language}.`,
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

      // Fallback response if AI service is unavailable
      const fallbackMessages: Record<string, string> = {
        pt: 'Obrigado pela sua mensagem! Neste momento o nosso assistente está indisponível. Por favor, contacte-nos por telefone: (+351) 300 528 280 ou email: comercial@securfix.pt. A nossa equipa terá todo o gosto em ajudá-lo.',
        es: '¡Gracias por su mensaje! En este momento nuestro asistente no está disponible. Por favor, contáctenos por teléfono: (+34) 910 606 414 o email: comercial@securfix.pt.',
        fr: "Merci pour votre message ! Notre assistant est actuellement indisponible. Veuillez nous contacter par téléphone : (+351) 300 528 280 ou email : comercial@securfix.pt.",
        en: 'Thank you for your message! Our assistant is currently unavailable. Please contact us by phone: (+351) 300 528 280 or email: comercial@securfix.pt.',
        de: 'Vielen Dank für Ihre Nachricht! Unser Assistent ist derzeit nicht verfügbar. Kontaktieren Sie uns telefonisch: (+351) 300 528 280 oder per E-Mail: comercial@securfix.pt.',
        nl: 'Bedankt voor uw bericht! Onze assistent is momenteel niet beschikbaar. Neem contact met ons op via telefoon: (+351) 300 528 280 of e-mail: comercial@securfix.pt.',
        it: 'Grazie per il tuo messaggio! Il nostro assistente non è al momento disponibile. Contattaci telefonicamente: (+351) 300 528 280 o via email: comercial@securfix.pt.',
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
