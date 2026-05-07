/* ════════════════════════════════════════════════════════════
   CharCode — app.js
   afonsobranco.github.io/devtools
   ════════════════════════════════════════════════════════════ */

'use strict';

// ════════════════════════════════════════════════════════════
//  DATA — HTML named entities  (name → Unicode code point)
// ════════════════════════════════════════════════════════════
const ENTITIES = {
  quot:34,amp:38,apos:39,lt:60,gt:62,
  euro:8364,sbquo:8218,fnof:402,bdquo:8222,hellip:8230,
  dagger:8224,Dagger:8225,circ:710,permil:8240,
  Scaron:352,lsaquo:8249,OElig:338,scaron:353,
  rsaquo:8250,oelig:339,Yuml:376,
  lsquo:8216,rsquo:8217,ldquo:8220,rdquo:8221,
  bull:8226,ndash:8211,mdash:8212,tilde:732,trade:8482,
  nbsp:160,iexcl:161,cent:162,pound:163,curren:164,yen:165,
  brvbar:166,sect:167,uml:168,copy:169,ordf:170,laquo:171,
  not:172,shy:173,reg:174,macr:175,deg:176,plusmn:177,
  sup2:178,sup3:179,acute:180,micro:181,para:182,middot:183,
  cedil:184,sup1:185,ordm:186,raquo:187,frac14:188,frac12:189,
  frac34:190,iquest:191,
  Agrave:192,Aacute:193,Acirc:194,Atilde:195,Auml:196,Aring:197,
  AElig:198,Ccedil:199,Egrave:200,Eacute:201,Ecirc:202,Euml:203,
  Igrave:204,Iacute:205,Icirc:206,Iuml:207,ETH:208,Ntilde:209,
  Ograve:210,Oacute:211,Ocirc:212,Otilde:213,Ouml:214,times:215,
  Oslash:216,Ugrave:217,Uacute:218,Ucirc:219,Uuml:220,Yacute:221,
  THORN:222,szlig:223,
  agrave:224,aacute:225,acirc:226,atilde:227,auml:228,aring:229,
  aelig:230,ccedil:231,egrave:232,eacute:233,ecirc:234,euml:235,
  igrave:236,iacute:237,icirc:238,iuml:239,eth:240,ntilde:241,
  ograve:242,oacute:243,ocirc:244,otilde:245,ouml:246,divide:247,
  oslash:248,ugrave:249,uacute:250,ucirc:251,uuml:252,yacute:253,
  thorn:254,yuml:255,
  Alpha:913,Beta:914,Gamma:915,Delta:916,Epsilon:917,Zeta:918,
  Eta:919,Theta:920,Iota:921,Kappa:922,Lambda:923,Mu:924,Nu:925,
  Xi:926,Omicron:927,Pi:928,Rho:929,Sigma:931,Tau:932,Upsilon:933,
  Phi:934,Chi:935,Psi:936,Omega:937,
  alpha:945,beta:946,gamma:947,delta:948,epsilon:949,zeta:950,
  eta:951,theta:952,iota:953,kappa:954,lambda:955,mu:956,nu:957,
  xi:958,omicron:959,pi:960,rho:961,sigmaf:962,sigma:963,tau:964,
  upsilon:965,phi:966,chi:967,psi:968,omega:969,
  thetasym:977,upsih:978,piv:982,
  forall:8704,part:8706,exist:8707,empty:8709,nabla:8711,
  isin:8712,notin:8713,ni:8715,prod:8719,sum:8721,minus:8722,
  lowast:8727,radic:8730,prop:8733,infin:8734,ang:8736,
  and:8743,or:8744,cap:8745,cup:8746,int:8747,there4:8756,
  sim:8764,cong:8773,asymp:8776,ne:8800,equiv:8801,le:8804,ge:8805,
  sub:8834,sup:8835,nsub:8836,sube:8838,supe:8839,
  oplus:8853,otimes:8855,perp:8869,sdot:8901,
  larr:8592,uarr:8593,rarr:8594,darr:8595,harr:8596,crarr:8629,
  lArr:8656,uArr:8657,rArr:8658,dArr:8659,hArr:8660,
  ensp:8194,emsp:8195,thinsp:8201,zwnj:8204,zwj:8205,
  lrm:8206,rlm:8207,oline:8254,frasl:8260,prime:8242,Prime:8243,
  lceil:8968,rceil:8969,lfloor:8970,rfloor:8971,
  lang:9001,rang:9002,loz:9674,
  spades:9824,clubs:9827,hearts:9829,diams:9830,
  alefsym:8501,image:8465,weierp:8472,real:8476,
};

// Reverse map: code point → shortest entity name
const C2E = {};
for (const [k, v] of Object.entries(ENTITIES)) {
  if (!C2E[v] || k.length < C2E[v].length) C2E[v] = k;
}

// Windows-1252 byte → Unicode code point (128–159 range)
const W12 = {
  128:8364,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,
  136:710,137:8240,138:352,139:8249,140:338,142:381,145:8216,
  146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,
  153:8482,154:353,155:8250,156:339,158:382,159:376,
};
const W12R = {};
for (const [b, c] of Object.entries(W12)) W12R[c] = +b;

// ════════════════════════════════════════════════════════════
//  DESCRIPTIONS
// ════════════════════════════════════════════════════════════
const DESC = {
  0:'Null (NUL)',1:'Start of heading (SOH)',2:'Start of text (STX)',3:'End of text (ETX)',
  4:'End of transmission (EOT)',5:'Enquiry (ENQ)',6:'Acknowledge (ACK)',7:'Bell (BEL)',
  8:'Backspace (BS)',9:'Horizontal tab (HT)',10:'Line feed / newline (LF)',11:'Vertical tab (VT)',
  12:'Form feed (FF)',13:'Carriage return (CR)',14:'Shift out (SO)',15:'Shift in (SI)',
  16:'Data link escape (DLE)',17:'Device control 1 (XON)',18:'Device control 2',
  19:'Device control 3 (XOFF)',20:'Device control 4',21:'Negative acknowledge (NAK)',
  22:'Synchronous idle (SYN)',23:'End of transmission block (ETB)',24:'Cancel (CAN)',
  25:'End of medium (EM)',26:'Substitute (SUB)',27:'Escape (ESC)',
  28:'File separator',29:'Group separator',30:'Record separator',31:'Unit separator',
  32:'Space',33:'Exclamation mark',34:'Quotation mark',35:'Number sign (hash)',
  36:'Dollar sign',37:'Percent sign',38:'Ampersand',39:'Apostrophe',
  40:'Left parenthesis',41:'Right parenthesis',42:'Asterisk',43:'Plus sign',
  44:'Comma',45:'Hyphen-minus',46:'Full stop (period)',47:'Solidus (slash)',
  48:'Digit zero',49:'Digit one',50:'Digit two',51:'Digit three',52:'Digit four',
  53:'Digit five',54:'Digit six',55:'Digit seven',56:'Digit eight',57:'Digit nine',
  58:'Colon',59:'Semicolon',60:'Less-than sign',61:'Equals sign',
  62:'Greater-than sign',63:'Question mark',64:'Commercial at',
  65:'Latin capital A',66:'Latin capital B',67:'Latin capital C',68:'Latin capital D',
  69:'Latin capital E',70:'Latin capital F',71:'Latin capital G',72:'Latin capital H',
  73:'Latin capital I',74:'Latin capital J',75:'Latin capital K',76:'Latin capital L',
  77:'Latin capital M',78:'Latin capital N',79:'Latin capital O',80:'Latin capital P',
  81:'Latin capital Q',82:'Latin capital R',83:'Latin capital S',84:'Latin capital T',
  85:'Latin capital U',86:'Latin capital V',87:'Latin capital W',88:'Latin capital X',
  89:'Latin capital Y',90:'Latin capital Z',
  91:'Left square bracket',92:'Reverse solidus (backslash)',93:'Right square bracket',
  94:'Circumflex accent',95:'Low line (underscore)',96:'Grave accent',
  97:'Latin small a',98:'Latin small b',99:'Latin small c',100:'Latin small d',
  101:'Latin small e',102:'Latin small f',103:'Latin small g',104:'Latin small h',
  105:'Latin small i',106:'Latin small j',107:'Latin small k',108:'Latin small l',
  109:'Latin small m',110:'Latin small n',111:'Latin small o',112:'Latin small p',
  113:'Latin small q',114:'Latin small r',115:'Latin small s',116:'Latin small t',
  117:'Latin small u',118:'Latin small v',119:'Latin small w',120:'Latin small x',
  121:'Latin small y',122:'Latin small z',
  123:'Left curly bracket',124:'Vertical line (pipe)',125:'Right curly bracket',
  126:'Tilde',127:'Delete (DEL)',
  128:'Euro sign (Win-1252 0x80)',130:'Single low-9 quotation mark',
  131:'Latin small f with hook',132:'Double low-9 quotation mark',
  133:'Horizontal ellipsis',134:'Dagger',135:'Double dagger',
  136:'Modifier letter circumflex accent',137:'Per mille sign',
  138:'Latin capital S with caron',139:'Single left-pointing angle quotation mark',
  140:'Latin capital ligature OE',142:'Latin capital Z with caron',
  145:'Left single quotation mark',146:'Right single quotation mark',
  147:'Left double quotation mark',148:'Right double quotation mark',
  149:'Bullet',150:'En dash',151:'Em dash',152:'Small tilde',153:'Trade mark sign',
  154:'Latin small s with caron',155:'Single right-pointing angle quotation mark',
  156:'Latin small ligature oe',158:'Latin small z with caron',
  159:'Latin capital Y with diaeresis',
  160:'No-break space',161:'Inverted exclamation mark',162:'Cent sign',
  163:'Pound sign',164:'Currency sign',165:'Yen sign',166:'Broken bar',
  167:'Section sign',168:'Diaeresis',169:'Copyright sign',
  170:'Feminine ordinal indicator',171:'Left-pointing double angle quotation mark',
  172:'Not sign',173:'Soft hyphen',174:'Registered sign',175:'Macron',
  176:'Degree sign',177:'Plus-minus sign',178:'Superscript two',179:'Superscript three',
  180:'Acute accent',181:'Micro sign',182:'Pilcrow sign (paragraph)',
  183:'Middle dot',184:'Cedilla',185:'Superscript one',186:'Masculine ordinal indicator',
  187:'Right-pointing double angle quotation mark',
  188:'Vulgar fraction one quarter',189:'Vulgar fraction one half',
  190:'Vulgar fraction three quarters',191:'Inverted question mark',
  215:'Multiplication sign',247:'Division sign',
  338:'Latin capital ligature OE',339:'Latin small ligature oe',
  352:'Latin capital S with caron',353:'Latin small s with caron',
  376:'Latin capital Y with diaeresis',381:'Latin capital Z with caron',
  382:'Latin small z with caron',402:'Latin small f with hook',
  710:'Modifier letter circumflex accent',732:'Small tilde',
  913:'Greek capital Alpha',914:'Greek capital Beta',915:'Greek capital Gamma',
  916:'Greek capital Delta',917:'Greek capital Epsilon',918:'Greek capital Zeta',
  919:'Greek capital Eta',920:'Greek capital Theta',921:'Greek capital Iota',
  922:'Greek capital Kappa',923:'Greek capital Lambda',924:'Greek capital Mu',
  925:'Greek capital Nu',926:'Greek capital Xi',927:'Greek capital Omicron',
  928:'Greek capital Pi',929:'Greek capital Rho',931:'Greek capital Sigma',
  932:'Greek capital Tau',933:'Greek capital Upsilon',934:'Greek capital Phi',
  935:'Greek capital Chi',936:'Greek capital Psi',937:'Greek capital Omega',
  945:'Greek small alpha',946:'Greek small beta',947:'Greek small gamma',
  948:'Greek small delta',949:'Greek small epsilon',950:'Greek small zeta',
  951:'Greek small eta',952:'Greek small theta',953:'Greek small iota',
  954:'Greek small kappa',955:'Greek small lambda',956:'Greek small mu',
  957:'Greek small nu',958:'Greek small xi',959:'Greek small omicron',
  960:'Greek small pi',961:'Greek small rho',962:'Greek small final sigma',
  963:'Greek small sigma',964:'Greek small tau',965:'Greek small upsilon',
  966:'Greek small phi',967:'Greek small chi',968:'Greek small psi',969:'Greek small omega',
  977:'Greek theta symbol',978:'Greek upsilon with hook',982:'Greek pi symbol',
  8194:'En space',8195:'Em space',8201:'Thin space',
  8204:'Zero-width non-joiner',8205:'Zero-width joiner',
  8206:'Left-to-right mark',8207:'Right-to-left mark',
  8211:'En dash',8212:'Em dash',
  8216:'Left single quotation mark',8217:'Right single quotation mark',
  8218:'Single low-9 quotation mark',8220:'Left double quotation mark',
  8221:'Right double quotation mark',8222:'Double low-9 quotation mark',
  8224:'Dagger',8225:'Double dagger',8226:'Bullet',8230:'Horizontal ellipsis',
  8240:'Per mille sign',8242:'Prime',8243:'Double prime',
  8249:'Single left-pointing angle quotation mark',
  8250:'Single right-pointing angle quotation mark',
  8254:'Overline',8260:'Fraction slash',8364:'Euro sign',
  8465:'Black-letter capital I',8472:'Script capital P (Weierstrass)',
  8476:'Black-letter capital R',8482:'Trade mark sign',8501:'Alef symbol',
  8592:'Leftwards arrow',8593:'Upwards arrow',8594:'Rightwards arrow',
  8595:'Downwards arrow',8596:'Left right arrow',
  8629:'Downwards arrow with corner leftwards',
  8656:'Leftwards double arrow',8657:'Upwards double arrow',
  8658:'Rightwards double arrow',8659:'Downwards double arrow',
  8660:'Left right double arrow',
  8704:'For all',8706:'Partial differential',8707:'There exists',
  8709:'Empty set',8711:'Nabla',8712:'Element of',8713:'Not an element of',
  8715:'Contains as member',8719:'N-ary product',8721:'N-ary summation',
  8722:'Minus sign',8727:'Asterisk operator',8730:'Square root',
  8733:'Proportional to',8734:'Infinity',8736:'Angle',
  8743:'Logical and',8744:'Logical or',8745:'Intersection',8746:'Union',
  8747:'Integral',8756:'Therefore',8764:'Tilde operator',
  8773:'Approximately equal to',8776:'Almost equal to',
  8800:'Not equal to',8801:'Identical to',
  8804:'Less-than or equal to',8805:'Greater-than or equal to',
  8834:'Subset of',8835:'Superset of',8836:'Not a subset of',
  8838:'Subset of or equal to',8839:'Superset of or equal to',
  8853:'Circled plus',8855:'Circled times',8869:'Up tack (perpendicular)',
  8901:'Dot operator',8968:'Left ceiling',8969:'Right ceiling',
  8970:'Left floor',8971:'Right floor',
  9001:'Left-pointing angle bracket',9002:'Right-pointing angle bracket',
  9674:'Lozenge',9728:'Sun',9733:'Black star',9734:'White star',
  9824:'Black spade suit',9827:'Black club suit',9829:'Black heart suit',
  9830:'Black diamond suit',9786:'Smiley face',9742:'Telephone',
  10084:'Heavy red heart',128512:'Grinning face',128514:'Face with tears of joy',
  128516:'Grinning face with smiling eyes',128522:'Slightly smiling face',
  128525:'Smiling face with heart-eyes',128544:'Pouting face',
  128557:'Loudly crying face',128640:'Rocket',128293:'Fire',
  128080:'Crown',127775:'Glowing star',127774:'Sun with face',
  128077:'Thumbs up',128078:'Thumbs down',128079:'Clapping hands',
};

// ════════════════════════════════════════════════════════════
//  BLOCK NAME  (code point → Unicode block label)
// ════════════════════════════════════════════════════════════
function blockName(cp) {
  if (cp < 128)  return 'Basic Latin (ASCII)';
  if (cp < 256)  return 'Latin-1 Supplement';
  if (cp < 384)  return 'Latin Extended-A';
  if (cp < 592)  return 'Latin Extended-B';
  if (cp < 880)  return 'IPA / Modifier / Combining';
  if (cp < 1024) return 'Greek and Coptic';
  if (cp < 1280) return 'Cyrillic';
  if (cp < 1792) return 'Armenian / Hebrew / Arabic';
  if (cp >= 0x1F600 && cp <= 0x1F64F) return 'Emoji — Emoticons';
  if (cp >= 0x1F300 && cp <= 0x1F5FF) return 'Emoji — Misc Symbols';
  if (cp >= 0x1F680 && cp <= 0x1F6FF) return 'Emoji — Transport';
  if (cp >= 0x1F900 && cp <= 0x1F9FF) return 'Emoji — Supplemental';
  if (cp >= 0x2600  && cp <= 0x26FF)  return 'Miscellaneous Symbols';
  if (cp >= 0x2700  && cp <= 0x27BF)  return 'Dingbats';
  if (cp >= 8192  && cp <= 8303)  return 'General Punctuation';
  if (cp >= 8352  && cp <= 8399)  return 'Currency Symbols';
  if (cp >= 8448  && cp <= 8527)  return 'Letterlike Symbols';
  if (cp >= 8704  && cp <= 8959)  return 'Mathematical Operators';
  if (cp >= 8960  && cp <= 9215)  return 'Miscellaneous Technical';
  if (cp >= 9472  && cp <= 9727)  return 'Box Drawing / Geometric Shapes';
  if (cp >= 9728  && cp <= 9983)  return 'Miscellaneous Symbols';
  if (cp >= 9984  && cp <= 10175) return 'Dingbats';
  return 'Unicode U+' + cp.toString(16).toUpperCase().padStart(4, '0');
}

// ════════════════════════════════════════════════════════════
//  HELPERS
// ════════════════════════════════════════════════════════════
function groupBin(b) {
  const p = b.padStart(Math.ceil(b.length / 4) * 4, '0');
  return p.match(/.{1,4}/g).join(' ');
}

function utf8Hex(cp) {
  try {
    return Array.from(new TextEncoder().encode(String.fromCodePoint(cp)))
      .map(b => b.toString(16).toUpperCase().padStart(2, '0'))
      .join(' ');
  } catch (e) { return '—'; }
}

function urlEnc(cp) {
  try { return encodeURIComponent(String.fromCodePoint(cp)); }
  catch (e) { return '—'; }
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escA(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/'/g, '&#39;');
}

// ════════════════════════════════════════════════════════════
//  RESULT BUILDER
// ════════════════════════════════════════════════════════════
function charInfo(c) {
  const cp  = c.codePointAt(0);
  const hex = cp.toString(16).toUpperCase().padStart(4, '0');
  return {
    char: c, cp, hex,
    htmlDec:  '&#' + cp + ';',
    htmlName: C2E[cp] ? '&' + C2E[cp] + ';' : null,
    desc:     DESC[cp] || blockName(cp),
    utf8:     utf8Hex(cp),
  };
}

function buildResult(cp, itype, warn) {
  if (isNaN(cp) || cp < 0 || cp > 0x10FFFF) return null;
  const char = String.fromCodePoint(cp);
  const hex  = cp.toString(16).toUpperCase().padStart(4, '0');
  const w    = W12R[cp] || (cp >= 32 && cp <= 127 ? cp : cp >= 160 && cp <= 255 ? cp : null);
  const jsE  = cp > 0xFFFF
    ? `\\u{${cp.toString(16).toUpperCase()}}`
    : `\\u${cp.toString(16).toUpperCase().padStart(4, '0')}`;
  return {
    type: 'single', char, cp, hex, dec: cp,
    bin: groupBin(cp.toString(2)), binR: cp.toString(2),
    htmlDec:  '&#' + cp + ';',
    htmlHex:  '&#x' + hex + ';',
    htmlName: C2E[cp] ? '&' + C2E[cp] + ';' : null,
    desc: DESC[cp] || blockName(cp),
    w1252: w,
    cssE: '\\' + cp.toString(16).toUpperCase(),
    jsE, utf8: utf8Hex(cp), url: urlEnc(cp),
    itype, warn,
  };
}

// ════════════════════════════════════════════════════════════
//  SEARCH INDEX
// ════════════════════════════════════════════════════════════
const SIDX = [];
const _seen = new Set();

for (const [cs, desc] of Object.entries(DESC)) {
  let cp = parseInt(cs);
  // DESC entries for 128-159 are Win-1252 bytes - remap to actual Unicode code points
  if (cp >= 128 && cp <= 159 && W12[cp]) cp = W12[cp];
  if (cp >= 0 && cp <= 0x10FFFF && !_seen.has(cp)) {
    SIDX.push({
      cp, desc, ent: C2E[cp] || null,
      char: String.fromCodePoint(cp),
      q: (desc + ' ' + (C2E[cp] || '')).toLowerCase(),
    });
    _seen.add(cp);
  }
}
for (const [name, cp] of Object.entries(ENTITIES)) {
  if (!_seen.has(cp)) {
    const desc = DESC[cp] || blockName(cp);
    SIDX.push({ cp, desc, ent: name, char: String.fromCodePoint(cp), q: (desc + ' ' + name).toLowerCase() });
    _seen.add(cp);
  }
}

function search(q) {
  const ql = q.toLowerCase().trim();
  if (!ql) return [];
  const exact = [], starts = [], contains = [];
  const seenCp = new Set();
  for (const item of SIDX) {
    if (seenCp.has(item.cp)) continue;
    const entExact  = item.ent && item.ent.toLowerCase() === ql;
    const entStarts = item.ent && item.ent.toLowerCase().startsWith(ql);
    const descStart = item.desc.toLowerCase().startsWith(ql);
    const inQ       = item.q.includes(ql);
    if (entExact)           { exact.push(item);    seenCp.add(item.cp); }
    else if (entStarts || descStart) { starts.push(item); seenCp.add(item.cp); }
    else if (inQ)           { contains.push(item); seenCp.add(item.cp); }
  }
  return [...exact, ...starts, ...contains].slice(0, 18);
}

// ════════════════════════════════════════════════════════════
//  INPUT DETECTION
// ════════════════════════════════════════════════════════════
const KIND_LABELS = {
  'html-n':  'HTML NAME',
  'html-d':  'HTML DECIMAL',
  'html-h':  'HTML HEX',
  'uni':     'UNICODE',
  'hex0x':   'HEXADECIMAL',
  'hex':     'HEXADECIMAL',
  'dec':     'DECIMAL',
  'char':    'CHARACTER',
  'name':    'SEARCH',
  'multi':   'MULTI-CHAR',
};

function detect(t) {
  if (!t) return 'empty';
  if (/^&[a-zA-Z][a-zA-Z0-9]*;?$/.test(t))           return 'html-n';
  if (/^&#\d+;?$/.test(t))                             return 'html-d';
  if (/^&#[xX][0-9a-fA-F]+;?$/.test(t))               return 'html-h';
  if (/^[Uu]\+[0-9a-fA-F]+$/.test(t))                 return 'uni';
  if (/^0[xX][0-9a-fA-F]+$/.test(t))                  return 'hex0x';
  if (/^[0-9a-fA-F]{2,6}$/.test(t) && /[a-fA-F]/.test(t)) return 'hex';
  if (/^\d+$/.test(t))                                 return 'dec';
  if (t.length >= 2 && /^[a-zA-Z][a-zA-Z0-9 _-]*$/.test(t)) return 'name';
  return [...t].length === 1 ? 'char' : 'multi';
}

// ════════════════════════════════════════════════════════════
//  CONVERSION ENGINE
// ════════════════════════════════════════════════════════════
function convert(raw) {
  // Handle single-character inputs BEFORE trimming — catches space, nbsp (U+00A0),
  // LRM (U+200E), RLM (U+200F), and other whitespace/invisible chars
  if ([...raw].length === 1) {
    return buildResult(raw.codePointAt(0), 'Character');
  }
  const t = raw.trim();
  if (!t) return null;
  const k = detect(t);

  try {
    // HTML named entity
    if (k === 'html-n') {
      const nm = t.replace(/^&/, '').replace(/;$/, '');
      const cp = ENTITIES[nm];
      if (cp === undefined) {
        // Error recovery: fuzzy search on the name
        const sr = search(nm);
        if (sr.length > 0) {
          return { type: 'search', query: nm, results: sr, warn: `Unknown entity &${nm}; — did you mean one of these?` };
        }
        // Final fallback: show literal character breakdown
        return { type: 'multi', items: [...t].map(c => charInfo(c)), warn: `Unknown entity &${nm}; — showing literal characters` };
      }
      return buildResult(cp, 'HTML Name Entity');
    }

    // HTML decimal entity
    if (k === 'html-d') {
      let cp = parseInt(t.replace(/^&#/, '').replace(/;$/, ''));
      if (cp >= 128 && cp <= 159 && W12[cp]) cp = W12[cp];
      return buildResult(cp, 'HTML Decimal Entity');
    }

    // HTML hex entity
    if (k === 'html-h') {
      return buildResult(parseInt(t.replace(/^&#[xX]/, '').replace(/;$/, ''), 16), 'HTML Hex Entity');
    }

    // Unicode notation U+XXXX
    if (k === 'uni') {
      return buildResult(parseInt(t.replace(/^[Uu]\+/, ''), 16), 'Unicode Notation');
    }

    // 0x-prefixed hex
    if (k === 'hex0x') {
      return buildResult(parseInt(t, 16), 'Hexadecimal (0x prefix)');
    }

    // Bare hex (has at least one A–F letter)
    if (k === 'hex') {
      const cp = parseInt(t, 16);
      if (cp <= 0x10FFFF) return buildResult(cp, 'Hexadecimal');
    }

    // Decimal number
    if (k === 'dec') {
      let n = parseInt(t);
      if (n >= 128 && n <= 159 && W12[n]) return buildResult(W12[n], 'Decimal (Win-1252 byte)');
      return buildResult(n, 'Decimal');
    }

    // Text name search
    if (k === 'name') {
      const sr = search(t);
      if (sr.length > 0) return { type: 'search', query: t, results: sr };
      // No results — fall back to literal char breakdown with notice
      return {
        type: 'multi',
        items: [...t].map(c => charInfo(c)),
        warn: `No characters found matching "${t}" — showing literal characters`,
      };
    }

    // Single character
    if (k === 'char') return buildResult(t.codePointAt(0), 'Character');

    // Multi-character string
    return { type: 'multi', items: [...t].map(c => charInfo(c)) };

  } catch (e) {
    return { type: 'err', msg: 'Could not parse: ' + t };
  }
}

// ════════════════════════════════════════════════════════════
//  THEME
// ════════════════════════════════════════════════════════════
let dark = document.documentElement.classList.contains('dark');
let lastR = null;

function applyTheme() {
  document.documentElement.classList.toggle('dark', dark);
  document.getElementById('tico').textContent = dark ? '🌙' : '☀️';
  document.getElementById('tlbl').textContent  = dark ? 'DARK' : 'LIGHT';
  drawBg();
  if (lastR) render(lastR);
}

function toggleTheme() { dark = !dark; applyTheme(); }
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => { dark = e.matches; applyTheme(); });

// ════════════════════════════════════════════════════════════
//  BACKGROUND CANVAS
// ════════════════════════════════════════════════════════════
function drawBg() {
  const c = document.getElementById('bgc');
  c.width  = window.innerWidth;
  c.height = window.innerHeight;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, c.width, c.height);
  if (!dark) return;

  // Stars
  for (let i = 0; i < 120; i++) {
    const x = Math.random() * c.width, y = Math.random() * c.height;
    const r = Math.random() * 1.4 + .15, a = Math.random() * .28 + .04;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(155,200,255,${a})`; ctx.fill();
  }

  // Radial glow blobs
  const g1 = ctx.createRadialGradient(c.width*.15, c.height*.25, 0, c.width*.15, c.height*.25, c.width*.42);
  g1.addColorStop(0, 'rgba(0,90,200,.07)'); g1.addColorStop(1, 'transparent');
  ctx.fillStyle = g1; ctx.fillRect(0, 0, c.width, c.height);

  const g2 = ctx.createRadialGradient(c.width*.85, c.height*.8, 0, c.width*.85, c.height*.8, c.width*.38);
  g2.addColorStop(0, 'rgba(0,150,255,.05)'); g2.addColorStop(1, 'transparent');
  ctx.fillStyle = g2; ctx.fillRect(0, 0, c.width, c.height);
}
window.addEventListener('resize', drawBg);

// ════════════════════════════════════════════════════════════
//  FLOATING CHAR CLOUD
// ════════════════════════════════════════════════════════════
function buildCloud() {
  const chars = [0x2211,0x221E,0x2190,0x2022,0x20AC,0x03B1,0x03C0,0x2665,0x2660,0x2714,
                 0x21D2,0x222B,0x2202,0x2260,0x00A9,0x00AE,0x2122,0x00B6,0x2020,0x00B1,
                 0x2248,0x2264,0x25CA,0x2666,0x2663,0x00B0,0x2030,0x2194];
  const el = document.getElementById('cloud');
  chars.forEach((cp, i) => {
    const span = document.createElement('span');
    span.textContent = String.fromCodePoint(cp);
    span.style.cssText = [
      `left:${Math.round(4 + Math.random() * 90)}%`,
      `top:${Math.round(4 + Math.random() * 90)}%`,
      `font-size:${14 + Math.floor(Math.random() * 14)}px`,
      `opacity:0`,
      `color:var(--a)`,
      `animation-delay:${(i * 0.38).toFixed(2)}s`,
      `animation-duration:${(6 + Math.random() * 4).toFixed(1)}s`,
    ].join(';');
    el.appendChild(span);
  });
}

// ════════════════════════════════════════════════════════════
//  RENDER
// ════════════════════════════════════════════════════════════
function hoverBg() {
  return dark ? 'rgba(255,255,255,.03)' : 'rgba(0,0,0,.02)';
}

function warnHtml(msg) {
  if (!msg) return '';
  return `<div class="warn">&#9888; ${esc(msg)}</div>`;
}

function render(r) {
  const el = document.getElementById('res');
  const em = document.getElementById('empty');
  if (!r) { el.style.opacity = '0'; em.style.display = 'block'; return; }
  em.style.display = 'none';

  if (r.type === 'err') {
    el.innerHTML = `<div class="as card" style="padding:26px;text-align:center">
      <p style="font-family:'JetBrains Mono',monospace;font-size:13px;color:rgba(220,60,60,.9)">${esc(r.msg)}</p>
    </div>`;
    el.style.opacity = '1';
    return;
  }
  if (r.type === 'search') { el.innerHTML = renderSearch(r); el.style.opacity = '1'; return; }
  if (r.type === 'multi')  { el.innerHTML = renderMulti(r);  el.style.opacity = '1'; return; }
  if (r.type === 'single') { el.innerHTML = renderSingle(r); el.style.opacity = '1'; return; }
}

// ── Single character view ──
function isInvisible(cp) {
  return cp < 32 ||
         cp === 127 ||
         (cp >= 128 && cp <= 159) ||   // C1 controls
         (cp >= 8203 && cp <= 8207) || // zero-width + directional marks (ZWS, ZWNJ, ZWJ, LRM, RLM)
         cp === 8232 || cp === 8233 ||  // line/paragraph separator
         cp === 65279;                  // BOM / ZWNBSP
}

function dispChar(cp, char) {
  if (isInvisible(cp)) {
    const label = cp < 32 || cp === 127 ? 'CTRL'
      : (cp >= 128 && cp <= 159)        ? 'C1'
      : 'INVIS';
    return `<span style="font-size:.32em;font-family:'JetBrains Mono',monospace;color:var(--a);letter-spacing:.04em">${label}</span>`;
  }
  return esc(char);
}

function renderSingle(r) {
  const invisible = isInvisible(r.cp);
  const disp = dispChar(r.cp, r.char);

  const rows = [
    { l:'Decimal',     v: String(r.dec),    raw: String(r.dec),    chip: false },
    { l:'Hex',         v: r.hex,            raw: r.hex,            chip: false },
    { l:'Binary',      v: r.bin,            raw: r.binR,           chip: false },
    { l:'HTML Number', v: r.htmlDec,        raw: r.htmlDec,        chip: true  },
    { l:'HTML Hex',    v: r.htmlHex,        raw: r.htmlHex,        chip: true  },
    { l:'HTML Name',   v: r.htmlName || '—', raw: r.htmlName,     chip: !!r.htmlName, skip: !r.htmlName },
    { l:'Unicode',     v: `U+${r.hex}`,     raw: `U+${r.hex}`,    chip: false },
    { l:'CSS Escape',  v: r.cssE,           raw: r.cssE,           chip: false },
    { l:'JS Escape',   v: r.jsE,            raw: r.jsE,            chip: false },
    { l:'UTF-8 Bytes', v: r.utf8,           raw: r.utf8.replace(/ /g,''), chip: false },
    { l:'URL Encoded', v: r.url,            raw: r.url,            chip: r.url !== esc(r.char) },
    { l:'Character',   v: invisible ? '(non-printing)' : esc(r.char), raw: r.char, chip: false, skip: invisible },
  ];

  if (r.w1252 && r.w1252 !== r.cp) {
    const byteHex = '0x' + r.w1252.toString(16).toUpperCase().padStart(2, '0');
    rows.splice(3, 0, { l:'Win-1252 Byte', v:`${byteHex} (dec ${r.w1252})`, raw: String(r.w1252), chip: false });
  }

  const rowHtml = row => {
    const valH = row.chip
      ? `<span class="cc">${esc(row.v)}</span>`
      : `<span style="font-family:'JetBrains Mono',monospace;font-size:13px">${esc(row.v)}</span>`;
    const cpyH = (!row.skip && row.raw)
      ? `<button class="cbtn" onclick="cpv('${escA(row.raw)}','${escA(row.l)}')">copy</button>`
      : `<span style="color:var(--mu);font-family:'JetBrains Mono',monospace;font-size:10px">—</span>`;
    return `<tr class="dr" onmouseenter="this.style.background=hoverBg()" onmouseleave="this.style.background='transparent'">
      <td class="dl">${esc(row.l)}</td>
      <td class="dv">${valH}</td>
      <td class="dc">${cpyH}</td>
    </tr>`;
  };

  return `<div class="as">
    ${warnHtml(r.warn)}
    <div class="card" style="padding:30px 22px 24px;text-align:center;margin-bottom:10px;position:relative;overflow:hidden">
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 65%,rgba(var(--ar),.055) 0%,transparent 70%);pointer-events:none"></div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;position:relative">
        <span style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.1em;text-transform:uppercase;padding:3px 9px;border-radius:99px;background:rgba(var(--ar),.1);color:var(--a);border:1px solid rgba(var(--ar),.25)">${esc(r.itype)}</span>
        <button onclick="cpAll()" style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.06em;padding:5px 13px;border-radius:99px;border:1px solid var(--bd);color:var(--mu);background:transparent;cursor:pointer;transition:all .15s"
          onmouseenter="this.style.color='var(--a)';this.style.borderColor='var(--a)'"
          onmouseleave="this.style.color='var(--mu)';this.style.borderColor='var(--bd)'">COPY ALL</button>
      </div>
      <div class="char-hero">${disp}</div>
      <p style="color:var(--mu);font-size:14px;margin-top:13px;margin-bottom:5px;line-height:1.55">${esc(r.desc)}</p>
      <p style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--a);opacity:.65;letter-spacing:.06em">U+${r.hex.padStart(4,'0')} &middot; ${esc(blockName(r.cp))}</p>
    </div>
    <div class="card" style="overflow:hidden">
      <table class="dt">
        <thead><tr>
          <th style="width:130px">Label</th>
          <th>Value</th>
          <th style="width:72px;text-align:right">Copy</th>
        </tr></thead>
        <tbody>${rows.map(rowHtml).join('')}</tbody>
      </table>
    </div>
  </div>`;
}

// ── Search results grid ──
function renderSearch(r) {
  const cards = r.results.map(item => {
    const disp  = dispChar(item.cp, item.char);
    const label = item.ent
      ? `&amp;${esc(item.ent)};`
      : 'U+' + item.cp.toString(16).toUpperCase().padStart(4, '0');
    return `<div class="scard" onclick="si('${escA(item.char)}')" title="${esc(item.desc)}">
      <div class="sc-ch">${disp}</div>
      <div class="sc-cp">${label}</div>
      <div class="sc-nm">${esc(item.desc)}</div>
    </div>`;
  }).join('');

  return `<div class="as">
    ${warnHtml(r.warn)}
    <div class="card" style="overflow:hidden">
      <div class="shdr">
        <span>&#128269; &ldquo;${esc(r.query)}&rdquo;</span>
        <span>${r.results.length} result${r.results.length !== 1 ? 's' : ''} &mdash; click to inspect</span>
      </div>
      <div class="sgrid">${cards}</div>
    </div>
  </div>`;
}

// ── Multi-character table ──
function renderMulti(r) {
  const rows = r.items.map((item, i) => {
    const disp   = dispChar(item.cp, item.char);
    const ent    = item.htmlName
      ? `<span class="mc-e">${esc(item.htmlName)}</span>`
      : `<span style="color:var(--mu)">—</span>`;
    return `<tr class="dr" onmouseenter="this.style.background=hoverBg()" onmouseleave="this.style.background='transparent'">
      <td style="color:var(--mu);font-family:'JetBrains Mono',monospace;font-size:11px;width:36px">${i+1}</td>
      <td><span class="mc-c" onclick="si('${escA(item.char)}')" title="Click to inspect">${disp}</span></td>
      <td class="mc-n">${item.cp}</td>
      <td class="mc-n">${item.hex}</td>
      <td>${ent}</td>
      <td class="mc-n" style="letter-spacing:.04em">${esc(item.utf8)}</td>
      <td class="mc-d">${esc(item.desc)}</td>
    </tr>`;
  }).join('');

  return `<div class="as">
    ${warnHtml(r.warn)}
    <div class="card" style="overflow:hidden">
      <div class="shdr">
        <span>&#9776; Multi-character breakdown</span>
        <span>${r.items.length} code point${r.items.length !== 1 ? 's' : ''} &mdash; click char to inspect</span>
      </div>
      <div style="overflow-x:auto">
        <table class="mt">
          <thead><tr>
            <th style="width:36px">#</th><th>Char</th><th>Dec</th><th>Hex</th>
            <th>HTML Name</th><th>UTF-8</th><th>Description</th>
          </tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>
  </div>`;
}

// ════════════════════════════════════════════════════════════
//  INPUT HANDLING
// ════════════════════════════════════════════════════════════
let dTimer = null;

function onInp(v) {
  clearTimeout(dTimer);
  document.getElementById('clrbtn').style.opacity = v.length ? '1' : '0';
  const bw = document.getElementById('bwrap');
  const bb = document.getElementById('tbadge');
  // Use v.length, not v.trim(), so whitespace chars like space and &nbsp; aren't ignored
  if (v.length) {
    bb.textContent   = KIND_LABELS[detect(v)] || 'INPUT';
    bw.style.opacity = '1';
  } else {
    bw.style.opacity = '0';
  }
  dTimer = setTimeout(() => {
    if (v.length) { lastR = convert(v); render(lastR); }
    else          { lastR = null; render(null); }
  }, 70);
}

function onKey(e) {
  if (e.key === 'Escape') clearInp();
  if (e.key === 'Enter') {
    clearTimeout(dTimer);
    const v = document.getElementById('inp').value;
    if (v.length) { lastR = convert(v); render(lastR); }
  }
}

function clearInp() {
  const i = document.getElementById('inp');
  i.value = '';
  i.focus();
  onInp('');
}

function si(v) {
  const i = document.getElementById('inp');
  i.value = v;
  i.focus();
  onInp(v);
}

// ════════════════════════════════════════════════════════════
//  COPY
// ════════════════════════════════════════════════════════════
function cpv(raw, lbl) {
  navigator.clipboard.writeText(raw).then(() => showToast(lbl + ' copied'));
}

function cpAll() {
  if (!lastR || lastR.type !== 'single') return;
  const r = lastR;
  const lines = [
    `Character:   ${r.char}`,
    `Description: ${r.desc}`,
    `Decimal:     ${r.dec}`,
    `Hex:         ${r.hex}`,
    `Binary:      ${r.binR}`,
    `HTML Number: ${r.htmlDec}`,
    `HTML Hex:    ${r.htmlHex}`,
    `HTML Name:   ${r.htmlName || '—'}`,
    `Unicode:     U+${r.hex}`,
    `CSS Escape:  ${r.cssE}`,
    `JS Escape:   ${r.jsE}`,
    `UTF-8 Bytes: ${r.utf8}`,
    `URL Encoded: ${r.url}`,
    r.w1252 && r.w1252 !== r.cp
      ? `Win-1252:    0x${r.w1252.toString(16).toUpperCase()}`
      : null,
  ].filter(Boolean).join('\n');
  navigator.clipboard.writeText(lines).then(() => showToast('All data copied'));
}

// ════════════════════════════════════════════════════════════
//  TOAST
// ════════════════════════════════════════════════════════════
let tTimer = null;

function showToast(msg) {
  const el  = document.getElementById('toast');
  const ti  = document.getElementById('ti');
  document.getElementById('tmsg').textContent = msg;
  Object.assign(ti.style, {
    background:         dark ? 'rgba(7,8,13,.93)' : 'rgba(255,255,255,.96)',
    border:             `1px solid ${dark ? 'rgba(0,207,255,.3)' : 'rgba(37,99,235,.2)'}`,
    color:              dark ? '#E4E6F0' : '#08090F',
    boxShadow:          dark ? '0 16px 48px rgba(0,0,0,.7)' : '0 16px 48px rgba(0,0,0,.1)',
    backdropFilter:     'blur(20px)',
    webkitBackdropFilter: 'blur(20px)',
  });
  el.className = 'ti';
  clearTimeout(tTimer);
  tTimer = setTimeout(() => { el.className = 'to'; }, 2200);
}

// ════════════════════════════════════════════════════════════
//  INIT
// ════════════════════════════════════════════════════════════
buildCloud();
drawBg();
