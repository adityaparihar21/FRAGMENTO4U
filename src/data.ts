/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MenuItem, LotMeta, RitualStep } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'coorg-pour-over',
    name: 'Coorg Estate Pour-over',
    description: 'Notes of citrus and spice forest. A single-origin slow drip that honors the specific terroir of the Karnataka hills.',
    price: 320,
    category: 'pour',
    tags: ['WASHED', '1,100M'],
    elevation: '1,100m',
    origin: 'Coorg, Karnataka',
    tastingNotes: ['Citrus', 'Spice Forest', 'Wild Honey'],
    customizable: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGi_ZYrowlTIjzY9-gDf2PjmYuNEPrtWvIu9E4lCKqwBQrjgcpGzCHFCOCCd-FF0dVvTJkk58eo-ca5t0ijiQqL54k_N8FquaWNypY1nFEmVvsG20CAParFptAa-3x2aSqrmAf6qviiTrjcuFBMcoz1mPYQrCkCqOU-haRRQz7CgPR_CjBKczgx_m9Vb2w8CXmr87Ap7xxCPTvEPFjPfvHqN5YIS-SXFhbted97FlYs-EQtLfjLiL3Ni3NumvEdvl860yEabg5YLQ'
  },
  {
    id: 'fragmento-espresso',
    name: 'Fragmento Blend Espresso',
    description: 'Our signature modular roast. A deep, chocolate-forward profile with a high-clarity finish.',
    price: 280,
    category: 'pour',
    tags: ['SIGNATURE', 'BLEND'],
    origin: 'Multi-Origin',
    tastingNotes: ['Dark Chocolate', 'Roasted Almond', 'Brown Sugar'],
    customizable: true
  },
  {
    id: 'oat-milk-latte',
    name: 'Oat Milk Latte',
    description: 'Micro-foamed oat milk paired with our darker seasonal fragments for a creamy, balanced morning ritual.',
    price: 340,
    category: 'pour',
    tags: ['OAT MILK', 'CREAMY'],
    tastingNotes: ['Mellow Espresso', 'Sweet Oats', 'Warm Caramel'],
    customizable: true,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLu8pr5AjD6SD55Dut4NUCF5XIWt-Omdvmlz_ApDYuqVGWBxaPB7ZWl-1s85BgCntk-QDb7UVOfO55SOvYmWhWI9RjBRRaeLYPuAGmJeO3214rw-kBrO28DrJwb1ATqLqwO119s3EQZ8P-QE7kQKwogGEGlSXv1mUAwiEjIXBESCc4v8FZz2eKRB5ZflHu_Zf1VMcOGiDwPYl2FhtKWgKXn_b_4hvnZBy6R1x_7XV42s9ekPE7K88KEheuQ'
  },
  {
    id: 'batch-brew',
    name: 'Batch Brew',
    description: 'Single estate seasonal roast, brewed daily with exceptional thermal stability.',
    price: 240,
    category: 'pour',
    tags: ['CLEAN', 'SEASONAL'],
    origin: 'Araku Valley',
    tastingNotes: ['Bright Citrus', 'Black Tea', 'Bergamot']
  },
  {
    id: 'oat-milk-cortado',
    name: 'Oat Milk Cortado',
    description: 'A restricted double shot of espresso cutting beautifully through silky oat microfoam.',
    price: 280,
    category: 'pour',
    tags: ['INTENSE', 'BALANCED'],
    tastingNotes: ['Marzipan', 'Cacao Nib', 'Velvety']
  },
  {
    id: 'classic-croissant',
    name: 'Classic Croissant',
    description: '72 hours of patience. Hand-laminated with cultured butter to achieve a structural honeycomb core.',
    price: 220,
    category: 'fold',
    tags: ['72H FOLD', 'BUTTER'],
    tastingNotes: ['Cultured Butter', 'Toasted Wheat', 'Crisp Shell'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhuDEjW3NDboR2VIBrCgJVcABqMbnZZzWFBvZ6ZCD1sbEVzDerTf-mCSo2IyJb0_OfEiKs7y1GpbX5e1EP3AWQHnd3xZOsChBUFSXg7QZ_BAQ5Qhx4pigpcDwfMwKeRs37aqaA9j2x2rt6BiyWgiXdF5ei_wONRLoLMA79L23_0OEb9slwUEvTYSvnlKz190FiW76gKi6AS75SU-g24psx0AxWBvM8TRnk0BHv0xDM4TLVDV0nHOicbJlVpWfE9t2ic462JffAKrM'
  },
  {
    id: 'cardamom-bun',
    name: 'Cardamom Bun',
    description: 'A modular knot of spiced dough, brushed with orange blossom glaze and finished with crushed green cardamom.',
    price: 240,
    category: 'fold',
    tags: ['SPICED', 'KNOT'],
    tastingNotes: ['Green Cardamom', 'Orange Blossom', 'Caramelized Edge']
  },
  {
    id: 'seasonal-fruit-galette',
    name: 'Seasonal Fruit Galette',
    description: 'A rustic, open-faced fragment featuring stone fruits sourced from local orchards. Served with a dollop of creme fraiche.',
    price: 280,
    category: 'fold',
    tags: ['LOCAL FRUIT', 'RUSTIC'],
    tastingNotes: ['Plum/Peach', 'Creme Fraiche', 'Flaky Pastry']
  },
  {
    id: 'pain-au-chocolat',
    name: 'Pain au Chocolat',
    description: 'Single-origin dark cacao rolled in seventy-two hour fermented lamination folds.',
    price: 220,
    category: 'fold',
    tags: ['DARK CACAO', '72H FOLD'],
    tastingNotes: ['70% Dark Cacao', 'Rich Butter', 'Melted Core']
  },
  {
    id: 'almond-frangipane',
    name: 'Almond Frangipane',
    description: 'Twice-baked frangipane pastry with a sweet almond center and finished with toasted almond flakes.',
    price: 260,
    category: 'fold',
    tags: ['TWICE BAKED', 'ALMOND'],
    tastingNotes: ['Frangipane', 'Toasted Flakes', 'Powdered Vanilla']
  }
];

export const CURRENT_LOT: LotMeta = {
  origin: 'Karnataka',
  subRegion: 'Coorg Estate',
  elevation: '1,100m',
  process: 'Hybrid (Natural & Washed)',
  score: '86+',
  roastLevel: 'Light-Medium',
  varietal: 'SL795',
  notes: ['Citrus', 'Forest Spice', 'Green Tea', 'Wild Honey']
};

export const RITUAL_STEPS: RitualStep[] = [
  {
    id: 'step-1',
    number: '01',
    label: 'THE SOURCING',
    title: 'Indian Estate, Direct',
    description: 'We source single-origin beans from ethical estates in Coorg and Chikmagalur. India grows some of the world\'s most distinctive shade-grown coffee, nestled under old-growth forest canopies.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaZvLxb2X241HpHz1ptcm3cwWlsblKNctLg4bK_MkSrHVuL2xvtGEOt0wgq8WBoGLr7Jp-0YOSfEBiThvuKSmhjFVuYy9xxDgR60FRyG29qLRjSLR3Xa4oE9afmJj7YWOj4OsY2FhjHhhgYW6wqLRAfhFk6uP16e7GOo2K26WviQZTQyhZ-Me4I_sKv9_TJmyi8s-MLbg5ofb-MDw_tU29DYxgYDjiHpP5cHWTi293SRVZuLn9LT-Z5dGTFUXMWq6H1iAUZWTB6QU'
  },
  {
    id: 'step-2',
    number: '02',
    label: 'THE SELECTION',
    title: 'Cupped Blind, Scored',
    description: 'Every lot is sampled, roasted, and cupped blind by our Q-graders. Only micro-lots scoring above 86 points on the Specialty Coffee Association scale are selected for our Dehradun menu.',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLugM9T5NA-QPXtnFOXbrcM8ldXXuwrwiVe8uRWjNo83-KYtx7-b-mT0WrDZdYdHdS_8gTD4HjaZK1g6_68q9fkv_kJrfH7AvfveFXEyLIKJSKEzrL2FLZw0hIiT6TV-pty4AIdz4QIEEUdSZ4_23hqUOPbigmYYsK-TkxXH70L96P5BEeZaiy0RkNqfruepm5wPcVjSLA3o_i9l5Ts2npiq58QZiQQVtm7Pb-VZE1OCnZYmK6S4KC3QDiA'
  },
  {
    id: 'step-3',
    number: '03',
    label: 'THE ROAST',
    title: 'Small-Batch, By Hand',
    description: 'We roast in 12kg micro-batches on our custom-restored, vintage drum roaster. Every origin has a unique roast profile, dialed in to maximize sweetness and highlight volatile origin aromatics.',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLunKP4eWuIylWG4Tjt_V2Ya2DipTy6lIw8-qhFaIIa8xp8XgFMGnHgQWbge-iA2jeuOPJ0f--pu4_i1yT_D-lN7ny0r47Go4Unz7Xme75XkiNb-9V9MXLMTERq31ByRn6gi7dMlqw_PuhKR8dw6i587Bqcx2Y41-rUP8A0sTIoOVRNZLDlyEfWPJOIpEld1VMFgr1RCel8fCZGl7P3IFZTgy0BjGHwuoB8L3NqAagz92Z-XR-Tj9HFfNw'
  },
  {
    id: 'step-4',
    number: '04',
    label: 'THE RITUAL',
    title: 'Poured with Presence',
    description: 'A meticulous intersection of water, temperature, and grind. Our baristas serve each pour-over using custom copper gooseneck kettles and glass drippers to brew a crystal-clear, complex cup.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGi_ZYrowlTIjzY9-gDf2PjmYuNEPrtWvIu9E4lCKqwBQrjgcpGzCHFCOCCd-FF0dVvTJkk58eo-ca5t0ijiQqL54k_N8FquaWNypY1nFEmVvsG20CAParFptAa-3x2aSqrmAf6qviiTrjcuFBMcoz1mPYQrCkCqOU-haRRQz7CgPR_CjBKczgx_m9Vb2w8CXmr87Ap7xxCPTvEPFjPfvHqN5YIS-SXFhbted97FlYs-EQtLfjLiL3Ni3NumvEdvl860yEabg5YLQ'
  }
];
