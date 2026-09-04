const img = (f) => `/products/${f}`;

export const CATALOG = {
  'crunch-berry-200':   { name: 'crunch berry · 200g',   price: 249, mrp: 299, sw: '#F5C4D8', img: img('fibbi-crunch-berry.webp') },
  'crunch-coffee-200':  { name: 'crunch coffee · 200g',  price: 269, mrp: 319, sw: '#E3D0B5', img: img('fibbi-crunch-coffee.webp') },
  'crunch-cocoa-200':   { name: 'crunch cocoa · 200g',   price: 269, mrp: 319, sw: '#CDBBAC', img: img('fibbi-crunch-cocoa.webp') },
  'crunch-vanilla-200': { name: 'crunch vanilla · 200g', price: 269, mrp: 319, sw: '#EDE3C8', img: img('fibbi-crunch-vanilla.webp') },
  'og-jar-200':      { name: 'og jar · 200g',     price: 399, mrp: 449, sw: '#EAD9B4', img: img('fibbi-og-jar.webp') },
  'og-sticks-30':    { name: 'og sticks · 30×6g', price: 549, mrp: 599, sw: '#F3E7CE', img: img('fibbi-og-stick.webp') },
  'cup-berry':       { name: 'berry dahi cup',   price: 99,  mrp: 119, sw: '#F5C4D8', img: img('fibbi-cup-berry.webp') },
  'cup-coffee':      { name: 'cold coffee cup',  price: 99,  mrp: 119, sw: '#E3D0B5', img: img('fibbi-cup-coffee.webp') },
  'cup-cocoa':       { name: 'cocoa oat cup',    price: 109, mrp: 129, sw: '#CDBBAC', img: img('fibbi-cup-cocoa.webp') },
  'cup-vanilla':     { name: 'vanilla dahi cup', price: 99,  mrp: 119, sw: '#EDE3C8', img: img('fibbi-cup-vanilla.webp') },
};

export const FREE_SHIP = 499;

export const REVIEWS = [
  { stars: 5, tape: '',     text: 'badiya h dahi me daal ke roz kha rahi hu, crunch sach me last bite tak rehta hai', who: 'aditi · 24 · pune' },
  { stars: 4, tape: 'pink', text: "thought it'll taste like isabgol… it doesn't?? tastes like proper granola. thoda pricey but chalega", who: 'rehan · 27 · mumbai' },
  { stars: 5, tape: 'lav',  text: 'day 5 update: bloating genuinely kam hua. also the packaging is so cute yaar, kept the pouch', who: 'priyanka · 25 · indore' },
  { stars: 5, tape: 'gold', text: 'mummy ne pucha kahan se liya unhone bhi try kiya, ab do packet mangwane padenge', who: 'arjun · 23 · bengaluru' },
  { stars: 4, tape: '',     text: 'delivery took 5 days to noida but product is solid. cocoa wala > original imo', who: 'sneha · 26 · delhi ncr' },
  { stars: 3, tape: 'pink', text: 'achha hai, kaam karta hai. bas 200g jaldi khatam ho jata hai — bade pack lao pls', who: 'kabir · 28 · pune' },
  { stars: 5, tape: 'lav',  text: "can't do slimy isabgol water, never could. this is literally the fix. second order placed", who: 'ishita · 24 · ahmedabad' },
  { stars: 5, tape: 'gold', text: 'COD tha isliye risk le liya. no regrets — office snack drawer me permanent jagah mil gayi', who: 'rohit · 29 · hyderabad' },
];
