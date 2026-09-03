import React, { useState } from 'react';
import { Shield, FileText, Lock } from 'lucide-react';
import { PageRoute } from '../types';

interface LegalPageProps {
  initialTab?: 'privacidade' | 'termos' | 'cookies';
  onNavigate: (route: PageRoute) => void;
}

type TabType = 'privacidade' | 'termos' | 'cookies';

export const LegalPage: React.FC<LegalPageProps> = ({ initialTab = 'privacidade', onNavigate }) => {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);

  return (
    <div className="bg-[#F5E9DF] text-[#28242C] font-sans">
      
      {/* Header */}
      <section className="py-16 sm:py-24 border-b border-[#A59A91]/25 bg-[#FAF4EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#A74447] uppercase">
            Transparência &amp; Conformidade
          </span>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-[#28242C]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Informações Legais &amp; Políticas
          </h1>
          <p className="text-base sm:text-lg text-[#28242C]/75 max-w-2xl mx-auto leading-relaxed">
            Compromisso com a Lei Geral de Proteção de Dados (LGPD), sigilo médico e normas sanitárias vigentes.
          </p>
        </div>
      </section>

      {/* Tabs Bar */}
      <section className="py-6 border-b border-[#A59A91]/25 bg-[#F5E9DF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setActiveTab('privacidade')}
            className={`px-6 py-2.5 text-xs uppercase tracking-widest font-medium transition-all cursor-pointer ${
              activeTab === 'privacidade'
                ? 'bg-[#A74447] text-[#F5E9DF] border border-[#A74447] shadow-sm'
                : 'bg-[#FAF4EF] text-[#28242C] border border-[#A59A91]/30 hover:border-[#A74447]'
            }`}
          >
            Política de Privacidade
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('termos')}
            className={`px-6 py-2.5 text-xs uppercase tracking-widest font-medium transition-all cursor-pointer ${
              activeTab === 'termos'
                ? 'bg-[#A74447] text-[#F5E9DF] border border-[#A74447] shadow-sm'
                : 'bg-[#FAF4EF] text-[#28242C] border border-[#A59A91]/30 hover:border-[#A74447]'
            }`}
          >
            Termos de Uso
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('cookies')}
            className={`px-6 py-2.5 text-xs uppercase tracking-widest font-medium transition-all cursor-pointer ${
              activeTab === 'cookies'
                ? 'bg-[#A74447] text-[#F5E9DF] border border-[#A74447] shadow-sm'
                : 'bg-[#FAF4EF] text-[#28242C] border border-[#A59A91]/30 hover:border-[#A74447]'
            }`}
          >
            Política de Cookies
          </button>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-[#A59A91]/25 bg-[#FAF4EF] p-8 sm:p-14 space-y-10 text-[#28242C]/85 text-sm sm:text-base leading-relaxed shadow-sm">
            
            {activeTab === 'privacidade' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-[#A74447]">
                  <Lock className="w-6 h-6" />
                  <h2
                    className="text-3xl font-serif font-medium text-[#28242C]"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    Aviso de Privacidade &amp; Proteção de Dados (LGPD)
                  </h2>
                </div>

                <p>
                  A <strong>Alpha Clinic Vital</strong>, inscrita sob as normas do Conselho Regional de Medicina
                  e Vigilância Sanitária do Distrito Federal, valoriza profundamente a confidencialidade e a segurança
                  das informações pessoais e de saúde de nossos pacientes.
                </p>

                <h3 className="text-xl font-serif font-medium text-[#28242C]">1. Coleta e Finalidade dos Dados</h3>
                <p>
                  Coletamos informações cadastrais (nome, telefone, e-mail) exclusivamente para viabilizar o agendamento
                  de consultas, confirmações via WhatsApp e relacionamento clínico. Dados de anamnese médica e prontuários
                  são resguardados sob sigilo profissional absoluto, não sendo compartilhados com terceiros sob qualquer hipótese.
                </p>

                <h3 className="text-xl font-serif font-medium text-[#28242C]">2. Armazenamento Seguro</h3>
                <p>
                  Todos os registros eletrônicos são protegidos por criptografia de ponta e sistemas em conformidade com os
                  padrões da Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
                </p>

                <h3 className="text-xl font-serif font-medium text-[#28242C]">3. Seus Direitos</h3>
                <p>
                  O titular dos dados pode solicitar, a qualquer momento, a confirmação, retificação ou exclusão de dados
                  cadastrais não essenciais através do e-mail <code>contato@alphaclinicvital.com.br</code>.
                </p>
              </div>
            )}

            {activeTab === 'termos' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-[#A74447]">
                  <FileText className="w-6 h-6" />
                  <h2
                    className="text-3xl font-serif font-medium text-[#28242C]"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    Termos de Uso &amp; Políticas de Atendimento
                  </h2>
                </div>

                <p>
                  Bem-vinda ao portal da <strong>Alpha Clinic Vital</strong>. Ao navegar e utilizar os canais de agendamento
                  deste site, você concorda com os termos e diretrizes descritos a seguir.
                </p>

                <h3 className="text-xl font-serif font-medium text-[#28242C]">1. Natureza Informativa</h3>
                <p>
                  Os conteúdos, artigos e descrições de tratamentos veiculados neste site possuem caráter estritamente educativo
                  e informativo. Nenhuma informação aqui contida substitui a consulta médica presencial e individualizada.
                </p>

                <h3 className="text-xl font-serif font-medium text-[#28242C]">2. Política de Cancelamento e Reagendamento</h3>
                <p>
                  Para mantermos a excelência e pontualidade de nossas suítes VIP, solicitamos aviso prévio de no mínimo
                  24 horas para reagendamento de consultas ou sessões já confirmadas.
                </p>

                <h3 className="text-xl font-serif font-medium text-[#28242C]">3. Direitos Autorais</h3>
                <p>
                  Todo o design, tipografia, fotografias de procedimentos e marcas registradas pertencem exclusivamente à
                  Alpha Clinic Vital ou a parceiros licenciados, sendo vedada sua reprodução não autorizada.
                </p>
              </div>
            )}

            {activeTab === 'cookies' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-[#A74447]">
                  <Shield className="w-6 h-6" />
                  <h2
                    className="text-3xl font-serif font-medium text-[#28242C]"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    Política de Cookies &amp; Rastreamento
                  </h2>
                </div>

                <p>
                  Utilizamos cookies essenciais para garantir o funcionamento estável de nossa plataforma digital e propiciar
                  uma experiência de navegação rápida e personalizada.
                </p>

                <h3 className="text-xl font-serif font-medium text-[#28242C]">1. O que são Cookies?</h3>
                <p>
                  Cookies são pequenos arquivos de texto armazenados temporariamente em seu navegador que auxiliam na
                  memorização de preferências e facilitam o carregamento de páginas.
                </p>

                <h3 className="text-xl font-serif font-medium text-[#28242C]">2. Tipos de Cookies Utilizados</h3>
                <ul className="list-disc list-inside space-y-2 text-[#28242C]/80">
                  <li><strong>Cookies Estritamente Necessários:</strong> Fundamentais para a navegação segura e roteamento de páginas.</li>
                  <li><strong>Cookies de Desempenho e Analytics:</strong> Auxiliam a compreender o fluxo de visitantes de forma anônima e agregada.</li>
                </ul>

                <h3 className="text-xl font-serif font-medium text-[#28242C]">3. Gerenciamento pelo Usuário</h3>
                <p>
                  Você pode configurar as opções de privacidade do seu navegador a qualquer momento para recusar ou limpar
                  os cookies armazenados.
                </p>
              </div>
            )}

            <div className="pt-8 border-t border-[#A59A91]/25 flex items-center justify-between">
              <span className="text-xs text-[#A59A91]">Última atualização: Julho de 2024</span>
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="text-xs font-semibold uppercase tracking-widest text-[#A74447] hover:underline cursor-pointer"
              >
                &larr; Voltar à Página Inicial
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default LegalPage;
