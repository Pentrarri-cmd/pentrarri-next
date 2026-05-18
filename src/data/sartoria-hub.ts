export const sartoriaData = {
  brand: {
    name: 'Falcone Sartoria',
    tagline: 'Maßatelier · Anzüge · Lederwaren',
    location: 'Mailand · München · Berlin',
  },
  kpis: [
    { label: 'Aktive Aufträge', value: '47', delta: '+12%', period: 'vs. Q3', positive: true },
    { label: 'Umsatz Q4', value: '€384.200', delta: '+8.4%', period: 'vs. Q3', positive: true },
    { label: 'Ø Lieferzeit', value: '5.2 Wo', delta: '-0.8 Wo', period: 'vs. Q3', positive: true },
    { label: 'Kundenzufriedenheit', value: '98%', delta: '+2 pp', period: 'vs. Q3', positive: true },
  ],
  pipeline: [
    {
      status: 'Beratung',
      count: 8,
      orders: [
        { id: 'A-2026-184', customer: 'Klaus Berger', item: '2-Reiher Anzug', fabric: 'Loro Piana Wool 120s', updated: 'vor 2h' },
        { id: 'A-2026-185', customer: 'Sophie Wallenberg', item: 'Mantel', fabric: 'Holland & Sherry Cashmere', updated: 'vor 5h' },
        { id: 'A-2026-186', customer: 'Friedrich Brandt', item: 'Smoking', fabric: 'Reda Super 150s', updated: 'gestern' },
      ],
    },
    {
      status: 'Erstmaß',
      count: 6,
      orders: [
        { id: 'A-2026-178', customer: 'Maximilian von Hertzberg', item: '3-Teiler', fabric: 'Loro Piana Vicuña', updated: 'vor 1h' },
        { id: 'A-2026-179', customer: 'Anna Linde', item: 'Hosenanzug', fabric: 'Solbiati Linen', updated: 'gestern' },
      ],
    },
    {
      status: 'In Produktion',
      count: 18,
      orders: [
        { id: 'A-2026-152', customer: 'Heinrich Maier', item: 'Sakko', fabric: 'Ariston Wool', updated: 'vor 3h' },
        { id: 'A-2026-153', customer: 'Cornelia Reinhardt', item: 'Aktentasche', fabric: 'Alcantara Leder', updated: 'vor 1h' },
        { id: 'A-2026-154', customer: 'Stefan Hofmann', item: '2-Reiher', fabric: 'VBC Super 130s', updated: 'gestern' },
      ],
    },
    {
      status: 'Probe',
      count: 9,
      orders: [
        { id: 'A-2026-140', customer: 'Dr. Wolfgang Krenz', item: 'Anzug', fabric: 'Drago Sigaro', updated: 'vor 4h' },
        { id: 'A-2026-141', customer: 'Birgit Stadler', item: 'Kostüm', fabric: 'Loro Piana Tasmanian', updated: 'gestern' },
      ],
    },
    {
      status: 'Auslieferung',
      count: 6,
      orders: [
        { id: 'A-2026-128', customer: 'Andreas Köhler', item: '3-Teiler', fabric: 'Holland & Sherry Sherry Tweed', updated: 'vor 30min' },
      ],
    },
  ],
  activity: [
    { time: '14:32', actor: 'Sophie Wallenberg', action: 'Anprobe-Termin gebucht', target: 'A-2026-185', tone: 'info' as const },
    { time: '13:18', actor: 'Atelier München', action: 'Maßnahme abgeschlossen', target: 'A-2026-184', tone: 'success' as const },
    { time: '12:45', actor: 'Klaus Berger', action: 'Stoffauswahl bestätigt', target: 'A-2026-184', tone: 'success' as const },
    { time: '11:20', actor: 'System', action: 'Zahlungseingang verbucht', target: 'A-2026-152', tone: 'success' as const },
    { time: '09:58', actor: 'Anna Linde', action: 'Hat Termin verschoben', target: 'A-2026-179', tone: 'warning' as const },
    { time: '08:14', actor: 'Atelier Berlin', action: 'Bestellung freigegeben', target: 'A-2026-178', tone: 'info' as const },
  ],
};

export type SartoriaData = typeof sartoriaData;
