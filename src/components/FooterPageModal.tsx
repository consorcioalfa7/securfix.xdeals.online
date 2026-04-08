'use client';

import { XCircle } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

interface FooterPageModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageKey: string;
  title: string;
}

const PAGE_CONTENT: Record<string, React.ReactNode> = {
  about: (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Quem Somos</h2>
      <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
        <p>
          A <strong className="text-gray-900">Securfix</strong> é uma empresa líder no sector de vedações metálicas e materiais de construção, 
          liderada por profissionais com vasta experiência no mundo da bricolage e da construção civil. A nossa equipa de especialistas 
          em produtos, marketing e tecnologia está à sua disposição para tornar a sua experiência Securfix única e enriquecedora.
        </p>
        <p>
          Vinculada ao Grupo Hierros Tous, formado por empresas do sector de bricolage e construção com <strong className="text-gray-900">mais de 50 anos de experiência</strong>, 
          a Securfix tem a vocação de criar a primeira plataforma 100% online, dedicada ao profissional do sector da construção.
        </p>
        <div className="rounded-lg bg-[#ea6663]/5 border border-[#ea6663]/20 p-4">
          <h3 className="text-base font-semibold text-gray-900 mb-3">Os Nossos Números</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-2xl font-bold text-[#ea6663]">50+</p>
              <p className="text-xs text-gray-500">Anos de Experiência</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#ea6663]">16.000+</p>
              <p className="text-xs text-gray-500">m² de Instalações</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#ea6663]">48-72h</p>
              <p className="text-xs text-gray-500">Entrega Rápida</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#ea6663]">4.6/5</p>
              <p className="text-xs text-gray-500">Avaliação Google</p>
            </div>
          </div>
        </div>
        <p>
          Com instalações de mais de 16.000 m² localizadas em Parets del Vallès, Barcelona, e graças a acordos com fabricantes 
          e distribuidores localizados em Espanha das primeiras marcas internacionais, a Securfix pode entregar os produtos 
          oferecidos na web em 48/72 horas.
        </p>
        <p>
          Oferecemos uma ampla gama de produtos em stock, para que possa realizar qualquer trabalho relacionado com vedações metálicas, 
          portas de segurança, grades, postes, arames e todos os acessórios necessários — sem soldas para evitar corrosão.
        </p>
        <h3 className="text-lg font-semibold text-gray-900 pt-2">A Nossa Missão</h3>
        <p>
          Democratizar o acesso a materiais de construção e vedações metálicas de alta qualidade, oferecendo preços de fábrica 
          directos ao consumidor e profissional, com entrega rápida em toda a Europa e um serviço de assessoria personalizado.
        </p>
        <h3 className="text-lg font-semibold text-gray-900 pt-2">A Nossa Visão</h3>
        <p>
          Ser a referência europeia em vendas online de vedações metálicas e materiais de construção, reconhecida pela qualidade 
          dos produtos, preços competitivos e excelência no serviço ao cliente.
        </p>
      </div>
    </div>
  ),

  contact: (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Contacte-Nos</h2>
      <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
        <p>
          A equipa da Securfix está disponível para ajudá-lo em qualquer questão relacionada com os nossos produtos, 
          encomendas, orçamentos ou assistência técnica. Não hesite em contactar-nos através de qualquer um dos canais abaixo.
        </p>

        <div className="space-y-4">
          <div className="rounded-lg border border-gray-200 p-4">
            <h3 className="text-base font-semibold text-gray-900 mb-2">📍 Armazém Madrid</h3>
            <p>P. de las Flores, 23</p>
            <p>28823, Coslada, Espanha</p>
            <p className="mt-1 text-gray-500">Horário: L a V de 8h a 14h / 15h a 17h</p>
          </div>

          <div className="rounded-lg border border-gray-200 p-4">
            <h3 className="text-base font-semibold text-gray-900 mb-2">📍 Barcelona (Sede Principal)</h3>
            <p>Carretera C-17, Km 17</p>
            <p>08150, Parets del Vallès, Espanha</p>
            <p className="mt-1 text-gray-500">Horário: L a V de 8h a 13h / 15h a 18h</p>
          </div>

          <div className="rounded-lg border border-[#ea6663]/20 bg-[#ea6663]/5 p-4">
            <h3 className="text-base font-semibold text-gray-900 mb-2">📍 Escritórios — Lisboa, Portugal</h3>
            <p>Rua Fialho de Almeida, nº 14</p>
            <p>1070-129 Avenidas Novas, Lisboa</p>
          </div>
        </div>

        <div className="rounded-lg bg-gray-50 p-4">
          <h3 className="text-base font-semibold text-gray-900 mb-3">Telefone e Email</h3>
          <div className="space-y-2">
            <p>📞 Espanha: <strong>(+34) 910 606 414</strong></p>
            <p>📞 Logística: <strong>(+34) 937 371 701</strong></p>
            <p>📞 WhatsApp: <strong>(+34) 669 386 327</strong></p>
            <p>📞 Portugal: <strong>(+351) 300 528 280</strong></p>
            <p>✉️ Email: <strong>comercial@securfix.pt</strong></p>
          </div>
        </div>
      </div>
    </div>
  ),

  legal: (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Condições Legais</h2>
      <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
        <p><strong>Última atualização:</strong> Janeiro 2026</p>

        <h3 className="text-lg font-semibold text-gray-900">1. Informação Geral</h3>
        <p>
          A Securfix é uma marca comercial de Hierros Tous, S.L.U, com sede em Parets del Vallès, Barcelona, Espanha. 
          O website securfix.pt é uma plataforma de comércio eletrónico dedicada à venda de vedações metálicas, portas, 
          grades, postes e materiais de construção.
        </p>

        <h3 className="text-lg font-semibold text-gray-900">2. Utilização do Website</h3>
        <p>
          O acesso e utilização deste website atribui ao utilizador a condição de utilizador e implica a aceitação plena 
          de todas as condições incluídas neste aviso legal. O utilizador compromete-se a fazer um uso adequado dos 
          conteúdos e serviços que a Securfix oferece.
        </p>

        <h3 className="text-lg font-semibold text-gray-900">3. Preços e Pagamentos</h3>
        <p>
          Todos os preços indicados no website incluem IVA à taxa legal em vigor. Os preços podem ser modificados sem 
          aviso prévio, embora as modificações não afetem encomendas já confirmadas. Aceitamos os seguintes métodos 
          de pagamento: Visa, Mastercard, Maestro, Apple Pay, Google Pay e Shop Pay.
        </p>

        <h3 className="text-lg font-semibold text-gray-900">4. Encomendas e Entregas</h3>
        <p>
          As encomendas são processadas de segunda a sexta-feira. O prazo de entrega é de 48 a 72 horas para Portugal 
          e Espanha, e de 3 a 15 dias úteis para o resto da Europa, dependendo do destino. Os custos de envio são 
          calculados automaticamente durante o checkout.
        </p>

        <h3 className="text-lg font-semibold text-gray-900">5. Propriedade Intelectual</h3>
        <p>
          Todos os conteúdos do website, incluindo textos, fotografias, gráficos, imagens, ícones, tecnologia, software, 
          links e outros conteúdos audiovisuais ou sonoros, bem como o seu design gráfico e códigos-fonte, são propriedade 
          intelectual da Securfix / Hierros Tous, S.L.U.
        </p>

        <h3 className="text-lg font-semibold text-gray-900">6. Proteção de Dados</h3>
        <p>
          A Securfix cumpre com o Regulamento Geral de Proteção de Dados (RGPD) e a Lei Orgânica de Proteção de Dados 
          Pessoais. Para mais informações, consulte a nossa Política de Privacidade.
        </p>

        <h3 className="text-lg font-semibold text-gray-900">7. Lei Aplicável</h3>
        <p>
          Para a resolução de quaisquer litígios que possam surgir do acesso ou utilização deste website, as partes 
          submetem-se aos tribunais do domicílio do utilizador, sendo aplicável a legislação espanhola e portuguesa.
        </p>
      </div>
    </div>
  ),

  privacy: (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Política de Privacidade</h2>
      <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
        <p><strong>Última atualização:</strong> Janeiro 2026</p>

        <h3 className="text-lg font-semibold text-gray-900">1. Responsável pelo Tratamento</h3>
        <p>
          Hierros Tous, S.L.U. (Securfix), com sede em Parets del Vallès, Barcelona, Espanha, é a responsável pelo 
          tratamento dos dados pessoais recolhidos através deste website, em conformidade com o Regulamento Geral de 
          Proteção de Dados (RGPD - Regulamento UE 2016/679).
        </p>

        <h3 className="text-lg font-semibold text-gray-900">2. Dados Pessoais Recolhidos</h3>
        <p>Podemos recolher os seguintes dados pessoais:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Dados de identificação: nome, apelidos, NIF/CIF</li>
          <li>Dados de contacto: endereço, email, telefone</li>
          <li>Dados de transação: histórico de encomendas, pagamentos</li>
          <li>Dados de navegação: cookies, endereço IP, browser utilizado</li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-900">3. Finalidade do Tratamento</h3>
        <p>Os dados pessoais são tratados para as seguintes finalidades:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Gestão de encomendas e entregas</li>
          <li>Processamento de pagamentos</li>
          <li>Envio de comunicações comerciais (com consentimento)</li>
          <li>Melhoria dos nossos serviços e experiência do utilizador</li>
          <li>Cumprimento de obrigações legais</li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-900">4. Base Legal</h3>
        <p>
          O tratamento dos seus dados pessoais baseia-se no consentimento, na execução de um contrato, no cumprimento 
          de uma obrigação legal e no interesse legítimo do responsável pelo tratamento.
        </p>

        <h3 className="text-lg font-semibold text-gray-900">5. Direitos do Titular</h3>
        <p>O titular dos dados tem direito a:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Acesso:</strong> solicitar informação sobre os dados pessoais tratados</li>
          <li><strong>Retificação:</strong> corrigir dados inexatos ou incompletos</li>
          <li><strong>Supressão:</strong> solicitar a eliminação dos seus dados</li>
          <li><strong>Oposição:</strong> opor-se ao tratamento dos seus dados</li>
          <li><strong>Portabilidade:</strong> solicitar os seus dados em formato estruturado</li>
          <li><strong>Limitação:</strong> limitar o tratamento dos seus dados</li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-900">6. Conservação dos Dados</h3>
        <p>
          Os dados pessoais serão conservados durante o tempo necessário para cumprir a finalidade para a qual foram 
          recolhidos e durante os prazos legalmente exigidos.
        </p>

        <h3 className="text-lg font-semibold text-gray-900">7. Contacto</h3>
        <p>
          Para exercer os seus direitos ou esclarecer dúvidas sobre esta política, contacte-nos através do email: 
          <strong> comercial@securfix.pt</strong>
        </p>
      </div>
    </div>
  ),

  cookies: (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Política de Cookies</h2>
      <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
        <p><strong>Última atualização:</strong> Janeiro 2026</p>

        <h3 className="text-lg font-semibold text-gray-900">1. O que são Cookies?</h3>
        <p>
          Os cookies são pequenos ficheiros de texto que são armazenados no seu dispositivo (computador, tablet, 
          smartphone) quando visita o nosso website. Permitem que o website lembre as suas ações e preferências 
          durante um período de tempo, para que não tenha que as voltar a indicar em cada visita.
        </p>

        <h3 className="text-lg font-semibold text-gray-900">2. Tipos de Cookies Utilizados</h3>
        <div className="space-y-3">
          <div className="rounded-lg border border-gray-200 p-3">
            <p className="font-semibold text-gray-900">Cookies Técnicos (Necessários)</p>
            <p className="text-xs text-gray-500 mt-1">Essenciais para o funcionamento do website. Permitem a navegação e utilização de áreas seguras.</p>
          </div>
          <div className="rounded-lg border border-gray-200 p-3">
            <p className="font-semibold text-gray-900">Cookies de Análise</p>
            <p className="text-xs text-gray-500 mt-1">Ajudam-nos a compreender como os visitantes interagem com o website, recolhendo informações de forma anónima.</p>
          </div>
          <div className="rounded-lg border border-gray-200 p-3">
            <p className="font-semibold text-gray-900">Cookies de Marketing</p>
            <p className="text-xs text-gray-500 mt-1">Utilizados para apresentar publicidade relevante e personalizada.</p>
          </div>
          <div className="rounded-lg border border-gray-200 p-3">
            <p className="font-semibold text-gray-900">Cookies de Personalização</p>
            <p className="text-xs text-gray-500 mt-1">Permitem recordar as suas preferências (idioma, moeda, localização) para uma experiência personalizada.</p>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900">3. Gestão de Cookies</h3>
        <p>
          Pode configurar o seu navegador para bloquear ou alertar sobre a presença de cookies. No entanto, 
          algumas partes do website poderão não funcionar corretamente se desativar os cookies.
        </p>

        <h3 className="text-lg font-semibold text-gray-900">4. Cookies de Terceiros</h3>
        <p>
          Utilizamos serviços de terceiros que podem instalar cookies no seu dispositivo: Google Analytics, 
          Google Ads, Facebook Pixel e Shopify Analytics.
        </p>
      </div>
    </div>
  ),

  shipping: (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Condições de Envio</h2>
      <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
        <h3 className="text-lg font-semibold text-gray-900">Prazos de Entrega</h3>
        <p>
          A Securfix compromete-se com a entrega rápida dos seus produtos. Os prazos contam a partir da confirmação 
          do pagamento e dependem do destino da encomenda.
        </p>

        <div className="rounded-lg border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 bg-gray-100 px-4 py-2.5 text-xs font-semibold text-gray-600 uppercase">
            <span>Destino</span>
            <span>Prazo de Entrega</span>
          </div>
          {[
            ['Portugal / Espanha', '2-3 dias úteis'],
            ['França / Itália', '3-5 dias úteis'],
            ['Alemanha, Holanda, Bélgica, Áustria', '5-7 dias úteis'],
            ['Resto da Europa', '7-10 dias úteis'],
            ['Países distantes (Escandinávia, etc.)', '10-15 dias úteis'],
          ].map(([dest, time]) => (
            <div key={dest} className="grid grid-cols-1 sm:grid-cols-2 border-t border-gray-100 px-4 py-2.5 text-sm">
              <span className="text-gray-700">{dest}</span>
              <span className="font-medium text-gray-900">{time}</span>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold text-gray-900">Custos de Envio</h3>
        <p>
          Os custos de envio são calculados automaticamente durante o processo de checkout, com base no peso, 
          volume e destino da encomenda. Encomendas acima de determinado valor podem beneficiar de envio gratuito 
          (promoções sujeitas a alteração).
        </p>

        <h3 className="text-lg font-semibold text-gray-900">Envio de Produtos Volumosos</h3>
        <p>
          Produtos volumosos como painéis de vedação, portas de segurança ou portões de rede podem necessitar de 
          transporte especializado. Nesses casos, a Securfix entrará em contacto para confirmar as condições 
          de entrega e eventuais custos adicionais.
        </p>

        <h3 className="text-lg font-semibold text-gray-900">Acompanhamento da Encomenda</h3>
        <p>
          Após o envio, receberá um email com o número de rastreamento para acompanhar a sua encomenda em tempo real 
          através do website do transportador.
        </p>

        <h3 className="text-lg font-semibold text-gray-900">Entregas com Defeito</h3>
        <p>
          Se receber produtos danificados ou com defeito, deve comunicar-nos num prazo máximo de 48 horas após a 
          receção. A Securfix procederá à substituição ou devolução sem custos adicionais.
        </p>
      </div>
    </div>
  ),

  returns: (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Cancelar e Devolver uma Compra</h2>
      <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
        <h3 className="text-lg font-semibold text-gray-900">Direito de Cancelamento</h3>
        <p>
          O cliente tem o direito de cancelar a encomenda num prazo de <strong className="text-gray-900">14 dias</strong> a contar 
          da data de receção dos produtos, sem necessidade de justificação, conforme o previsto no Código de Defesa 
          do Consumidor e na legislação europeia aplicável.
        </p>

        <h3 className="text-lg font-semibold text-gray-900">Condições de Devolução</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Os produtos devem estar na embalagem original, sem sinais de uso ou montagem</li>
          <li>Os produtos não podem ter sido modificados, cortados ou personalizados</li>
          <li>Os produtos devem ser devolvidos em perfeitas condições</li>
          <li>Produtos sob medida ou cortados à medida não são elegíveis para devolução</li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-900">Como Devolver</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Contacte-nos através do email <strong>comercial@securfix.pt</strong> indicando o número da encomenda</li>
          <li>A nossa equipa enviará as instruções de devolução e a etiqueta de envio</li>
          <li>Embalagem os produtos devidamente na embalagem original</li>
          <li>Entregue a encomenda no ponto de envio indicado</li>
          <li>Após a receção e verificação, procederemos ao reembolso</li>
        </ol>

        <h3 className="text-lg font-semibold text-gray-900">Reembolso</h3>
        <p>
          O reembolso será processado no prazo máximo de <strong className="text-gray-900">14 dias</strong> após a receção 
          dos produtos devolvidos. O valor será creditado no mesmo método de pagamento utilizado na compra.
        </p>

        <div className="rounded-lg bg-[#ea6663]/5 border border-[#ea6663]/20 p-4">
          <p className="font-semibold text-gray-900">Devoluções Gratuitas</p>
          <p className="mt-1">
            A Securfix oferece devoluções gratuitas. Não tem qualquer custo associado ao processo de devolução.
          </p>
        </div>

        <h3 className="text-lg font-semibold text-gray-900">Garantia de 15 Dias</h3>
        <p>
          Para além do direito legal de cancelamento, a Securfix oferece uma garantia de satisfação de 15 dias. 
          Se não estiver satisfeito com o produto, pode devolvê-lo sem questões.
        </p>
      </div>
    </div>
  ),

  price_guarantee: (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Garantia de Preço Mais Baixo</h2>
      <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
        <div className="rounded-lg bg-[#ea6663]/5 border border-[#ea6663]/20 p-4">
          <p className="text-lg font-bold text-gray-900">Encontrou mais barato? Nós igualamos!</p>
          <p className="mt-1">
            Se encontrar o mesmo produto a um preço inferior noutro website, contacte-nos e nós igualamos o preço.
          </p>
        </div>

        <h3 className="text-lg font-semibold text-gray-900">Como Funciona</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Encontre o mesmo produto (mesma referência e especificações) noutro website</li>
          <li>O website deve ser um concorrente direto e vender na Europa</li>
          <li>O preço deve incluir IVA e ser para o mesmo produto, não promocional</li>
          <li>Envie-nos o link e o preço encontrado para <strong>comercial@securfix.pt</strong></li>
          <li>A nossa equipa verificará e igualará o preço num prazo máximo de 24 horas</li>
        </ol>

        <h3 className="text-lg font-semibold text-gray-900">Preço de Fábrica</h3>
        <p>
          A Securfix trabalha diretamente com fabricantes e elimina intermediários. Por isso, oferecemos 
          <strong className="text-gray-900"> preços de fábrica</strong> — os mais competitivos do mercado. Todos os nossos 
          preços incluem IVA, sem surpresas no checkout.
        </p>

        <h3 className="text-lg font-semibold text-gray-900">Preços para Profissionais</h3>
        <p>
          A Securfix é uma loja destinada a profissionais. Os nossos preços profissionais já incluem descontos 
          competitivos que podem chegar a 40% face ao preço de retalho recomendado.
        </p>

        <h3 className="text-lg font-semibold text-gray-900">Promoções Permanentes</h3>
        <p>
          Além da garantia de preço mais baixo, oferecemos promoções e descontos regulares em centenas de produtos. 
          Subscreva a nossa newsletter para receber alertas de ofertas especiais e códigos de desconto exclusivos.
        </p>
      </div>
    </div>
  ),

  faq: (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Perguntas Frequentes</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="faq1">
          <AccordionTrigger className="text-sm font-semibold text-gray-900 text-left">Quais são os métodos de pagamento aceites?</AccordionTrigger>
          <AccordionContent className="text-sm text-gray-600 leading-relaxed">
            Aceitamos Visa, Mastercard, Maestro, Apple Pay, Google Pay e Shop Pay. Todos os pagamentos são processados de forma segura com encriptação SSL.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq2">
          <AccordionTrigger className="text-sm font-semibold text-gray-900 text-left">Qual é o prazo de entrega?</AccordionTrigger>
          <AccordionContent className="text-sm text-gray-600 leading-relaxed">
            Para Portugal e Espanha, a entrega é de 48-72 horas úteis. Para o resto da Europa, os prazos variam entre 3 e 15 dias úteis, dependendo do destino. Após o envio, receberá um email com o número de rastreamento.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq3">
          <AccordionTrigger className="text-sm font-semibold text-gray-900 text-left">Os preços incluem IVA?</AccordionTrigger>
          <AccordionContent className="text-sm text-gray-600 leading-relaxed">
            Sim, todos os preços indicados no nosso website incluem IVA à taxa legal em vigor. Não haverá custos adicionais no checkout.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq4">
          <AccordionTrigger className="text-sm font-semibold text-gray-900 text-left">Posso devolver um produto?</AccordionTrigger>
          <AccordionContent className="text-sm text-gray-600 leading-relaxed">
            Sim, tem 14 dias para cancelar a encomenda e 15 dias de garantia de satisfação. Os produtos devem estar na embalagem original, sem sinais de uso. As devoluções são gratuitas.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq5">
          <AccordionTrigger className="text-sm font-semibold text-gray-900 text-left">Como faço para solicitar um orçamento?</AccordionTrigger>
          <AccordionContent className="text-sm text-gray-600 leading-relaxed">
            Pode solicitar um orçamento sem compromisso contactando-nos por telefone (+351) 300 528 280 ou por email comercial@securfix.pt. A nossa equipa responderá em menos de 24 horas com o melhor preço.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq6">
          <AccordionTrigger className="text-sm font-semibold text-gray-900 text-left">Vocês cortam painéis à medida?</AccordionTrigger>
          <AccordionContent className="text-sm text-gray-600 leading-relaxed">
            Sim, oferecemos serviço de corte à medida para painéis de vedação. Contacte-nos com as medidas necessárias e prepararemos um orçamento personalizado. Note que produtos cortados à medida não são elegíveis para devolução.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq7">
          <AccordionTrigger className="text-sm font-semibold text-gray-900 text-left">Qual é o pedido mínimo?</AccordionTrigger>
          <AccordionContent className="text-sm text-gray-600 leading-relaxed">
            Não temos pedido mínimo. No entanto, por se tratar de uma loja destinada a profissionais, recomendamos encomendas acima de 50€ para um melhor aproveitamento dos custos de envio.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq8">
          <AccordionTrigger className="text-sm font-semibold text-gray-900 text-left">Encontrou um produto mais barato noutro site?</AccordionTrigger>
          <AccordionContent className="text-sm text-gray-600 leading-relaxed">
            Temos uma garantia de preço mais baixo. Se encontrar o mesmo produto a um preço inferior noutro website europeu, contacte-nos com o link e nós igualaremos o preço num prazo de 24 horas.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq9">
          <AccordionTrigger className="text-sm font-semibold text-gray-900 text-left">Como posso acompanhar a minha encomenda?</AccordionTrigger>
          <AccordionContent className="text-sm text-gray-600 leading-relaxed">
            Após o envio, receberá um email com o número de rastreamento. Pode acompanhar a sua encomenda através da secção "Acompanhar Encomenda" no nosso website ou diretamente no site do transportador.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq10">
          <AccordionTrigger className="text-sm font-semibold text-gray-900 text-left">Vocês entregam nos Açores e Madeira?</AccordionTrigger>
          <AccordionContent className="text-sm text-gray-600 leading-relaxed">
            Sim, entregamos nos Açores e Madeira. O prazo de entrega é de 7-10 dias úteis. Os custos de envio podem variar face ao território continental e serão calculados durante o checkout.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),

  careers: (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Trabalhe Connosco</h2>
      <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
        <p>
          Na Securfix acreditamos que o nosso sucesso é resultado de uma equipa dedicada e apaixonada. Estamos 
          sempre à procura de profissionais talentosos que queiram fazer parte do nosso crescimento.
        </p>

        <div className="rounded-lg bg-[#ea6663]/5 border border-[#ea6663]/20 p-4">
          <p className="font-semibold text-gray-900">Porque trabalhar na Securfix?</p>
          <ul className="mt-2 space-y-1.5 list-disc pl-5">
            <li>Empresa em crescimento rápido no sector e-commerce</li>
            <li>Equipa jovem, dinâmica e multicultural</li>
            <li>Remuneração competitiva e benefícios</li>
            <li>Possibilidade de desenvolvimento profissional</li>
            <li>Ambiente de trabalho colaborativo</li>
          </ul>
        </div>

        <h3 className="text-lg font-semibold text-gray-900">Posições em Aberto</h3>
        <div className="space-y-3">
          <div className="rounded-lg border border-gray-200 p-4">
            <p className="font-semibold text-gray-900">Especialista em Vedações Metálicas</p>
            <p className="text-xs text-[#ea6663] font-medium mt-0.5">Barcelona / Remoto • Tempo Integral</p>
            <p className="mt-2 text-xs text-gray-500">
              Procuramos um especialista com conhecimento técnico em vedações metálicas, portas de segurança e materiais 
              de construção para assessoria a clientes profissionais.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 p-4">
            <p className="font-semibold text-gray-900">Desenvolvedor Full-Stack</p>
            <p className="text-xs text-[#ea6663] font-medium mt-0.5">Remoto • Tempo Integral</p>
            <p className="mt-2 text-xs text-gray-500">
              Para reforçar a nossa equipa de desenvolvimento do e-commerce. Experiência com React, Next.js, Node.js 
              e APIs de pagamento.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 p-4">
            <p className="font-semibold text-gray-900">Assistente de Logística</p>
            <p className="text-xs text-[#ea6663] font-medium mt-0.5">Parets del Vallès • Tempo Integral</p>
            <p className="mt-2 text-xs text-gray-500">
              Responsável pela gestão de stock, preparação de encomendas e coordenação com transportadores. 
              Experiência em logística de e-commerce valorizada.
            </p>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900">Candidatura Espontânea</h3>
        <p>
          Não encontrou a posição ideal? Envie a sua candidatura espontânea para 
          <strong> comercial@securfix.pt</strong> com o assunto &quot;Candidatura Espontânea&quot;. 
          Analisaremos todas as candidaturas e contactaremos caso surja uma oportunidade adequada ao seu perfil.
        </p>

        <div className="rounded-lg bg-gray-50 p-4">
          <p className="font-semibold text-gray-900">Enviar Currículo</p>
          <p className="mt-1">
            Email: <strong>comercial@securfix.pt</strong><br />
            Assunto: &quot;Candidatura — [Posição] — [Nome]&quot;
          </p>
        </div>
      </div>
    </div>
  ),
};

export default function FooterPageModal({ isOpen, onClose, pageKey, title }: FooterPageModalProps) {
  if (!isOpen) return null;

  const content = PAGE_CONTENT[pageKey];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl animate-in fade-in-0 zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-md p-2.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            aria-label="Fechar"
          >
            <XCircle className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-4 py-4 sm:px-6 sm:py-6">
          {content || (
            <div className="text-center text-gray-400 py-12">
              <p>Página em construção.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
