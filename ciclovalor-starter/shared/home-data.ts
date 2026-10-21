export type MaterialId = 'papel' | 'plastico' | 'vidro' | 'metal';
export interface Material { id: MaterialId; name: string; color: string; tip: string; avoid: string; }
export interface CollectionPoint { id: string; name: string; area: string; kind: string; materials: MaterialId[]; note: string; }
export interface HomeData { mode: 'demo'; city: string; materials: Material[]; points: CollectionPoint[]; }
export const homeData: HomeData = {
  mode: 'demo', city: 'Vassouras, RJ',
  materials: [
    {id:'papel',name:'Papel',color:'#d7b77b',tip:'Separe papéis e papelões limpos e secos. Desmonte as caixas para ocupar menos espaço.',avoid:'Papéis engordurados, papel higiênico e guardanapos usados não entram nesta categoria.'},
    {id:'plastico',name:'Plástico',color:'#e9ab99',tip:'Esvazie as embalagens e retire os resíduos. Se possível, compacte as garrafas antes de levar.',avoid:'A aceitação de cada tipo de plástico depende do ponto de coleta. Confirme antes da entrega.'},
    {id:'vidro',name:'Vidro',color:'#96bba9',tip:'Esvazie potes e garrafas. Proteja o vidro quebrado e identifique a embalagem para evitar acidentes.',avoid:'Espelhos, lâmpadas e cerâmicas precisam de orientação específica e não devem ser misturados.'},
    {id:'metal',name:'Metal',color:'#adbcc7',tip:'Separe latas e embalagens metálicas vazias, evitando bordas cortantes expostas.',avoid:'Pilhas, baterias e eletrônicos exigem coleta específica. Não os misture aos metais comuns.'}
  ],
  points: [
    {id:'centro',name:'Ecoponto do Centro',area:'Centro',kind:'Ecoponto',materials:['papel','plastico','metal','vidro'],note:'Ponto fictício para demonstrar a experiência. Endereço, operador e horários serão cadastrados após validação.'},
    {id:'comunidade',name:'Espaço da comunidade',area:'Bairro demonstrativo',kind:'Coleta comunitária',materials:['papel','plastico'],note:'Exemplo de ponto comunitário. Os materiais aceitos e a disponibilidade precisam ser confirmados com o operador.'},
    {id:'parceiro',name:'Estação de reciclagem',area:'Região demonstrativa',kind:'Coleta parceira',materials:['metal','vidro','plastico'],note:'Exemplo de ponto parceiro. Não representa um estabelecimento cadastrado ou uma parceria real.'}
  ]
};
