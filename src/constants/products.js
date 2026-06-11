// Product data constants
import sabun from '../assets/NEWWIDYATEMULAWAK/5DD6CA54-3DDB-4860-8673-02219D079341-600-00000062F8C19857.jpeg';


export const PRODUCTS = [
  // WIDYA TEMULAWAK
  {
    id: 1,
    brand: 'WIDYA TEMULAWAK',
    name: 'WIDYA TEMULAWAK Transparent Brightening Soap',
    category: 'Sabun',
    image: sabun,
    desc: { id: 'Sabun WIDYA TEMULAWAK 88gr dengan formula yang efektif mencerahkan wajah dan melembutkan kulit.', en: 'WIDYA TEMULAWAK 88g soap with a formula that effectively brightens the face and softens the skin.' },
    volume: '88 gr',
  }

];

// Featured products for homepage (4 produk)
export const FEATURED_PRODUCTS = PRODUCTS.slice(0, 4);

export const CLIENTS = [
  { name: '212 Mart', logo: null },
  { name: 'BCA', logo: null },
  { name: 'BNI', logo: null },
  { name: 'BRI', logo: null },
  { name: 'CEO Suite', logo: null },
  { name: 'Citius', logo: null },
  { name: 'Lautan Luas', logo: null },
  { name: 'Ninja Xpress', logo: null },
  { name: 'Pesona Indonesia', logo: null },
  { name: 'RSU Anvisena', logo: null },
  { name: 'RSUD Solok', logo: null },
  { name: 'Sucofindo', logo: null },
  { name: 'Waki', logo: null },
  { name: 'Yogya Group', logo: null },
];
