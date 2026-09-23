export type ScreenView = 'inicio' | 'tablero' | 'asistente';

export interface ExpedienteCase {
  id: string;
  code: string;
  fecha: string;
  ficha: string;
  programa: string;
  categoria: 'Académica' | 'Inasistencia' | 'Convivencia';
  faltaTipificada: string;
  articuloReglamento: string;
  fuenteDoc: string;
  folio: string;
  parrafo: string;
  estado: 'Plan Vigente' | 'Condicionamiento' | 'Archivado' | 'Superado' | 'Cancelación';
  medidaSugerida: string;
  extracto: string;
  detallesAdicionales?: string;
  firmaVerificada: boolean;
  aprendizRef: string;
  sha256?: string;
}

export interface DocumentItem {
  id: string;
  nombre: string;
  tipo: 'pdf' | 'docx' | 'xlsx';
  sesion: string;
  paginasRegistros: string;
  tamano: string;
  estado: 'Cargado' | 'Pendiente Extracción' | 'Procesado';
  sha256?: string;
}

export interface TeamMember {
  roleCode: 'PM' | 'FE' | 'BE' | 'DO';
  roleTitle: string;
  badge: string;
  accentColor: string;
  name: string;
  projectRole: string;
  responsibility: string;
}

export interface FilterState {
  period: string;
  category: string;
  searchQuery: string;
}

export interface DemoScenario {
  id: string;
  name: string;
  category: 'Académica' | 'Inasistencia' | 'Convivencia';
  ficha: string;
  programa: string;
  docTitle: string;
  rawSnippet: string;
  formato: string;
  extractor: string;
  hash: string;
  tokensCount: number;
  embeddingVector: string;
  matchedArticle: string;
  historicalPrecedent: string;
  precedentRate: string;
  riskLevel: 'Bajo' | 'Medio' | 'Alto';
  recommendedMeasure: string;
  folioCitation: string;
}

export interface FaqItem {
  id: string;
  category: 'General' | 'Documentos' | 'IA y Modelos' | 'Seguridad';
  badge: string;
  question: string;
  answer: string;
}

export type ColorblindMode = 'off' | 'protan' | 'deutan' | 'tritan' | 'achroma';

export interface A11ySettings {
  /** Escala de letra: 0.8 (80%) a 2.0 (200%). WCAG 2.2 §1.4.4 */
  textScale: number;
  /** Letras más separadas. WCAG 2.2 §1.4.12 */
  textSpacing: boolean;
  /** Subrayar enlaces. WCAG 2.2 §1.4.1 */
  underlineLinks: boolean;
  /** Resaltar títulos y foco de teclado. WCAG 2.2 §2.4.7 */
  guideFocus: boolean;
  /** Quitar animaciones. WCAG 2.2 §2.2.2 */
  calmMotion: boolean;
  /** Filtro de daltonismo. WCAG 2.2 §1.4.1 */
  colorblind: ColorblindMode;
}
