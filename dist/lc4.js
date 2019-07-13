import{ALPHABET,GRIDSIZE,ALPHABET_LS47,GRIDSIZE_LS47}from"./config.js";import{shuffle,randomElement,shiftRowRight,shiftColumnDown,position,printState}from"./helpers.js";export function generateKey(a="lc4"){let b="lc4"===a.toLowerCase()?ALPHABET:ALPHABET_LS47;return shuffle([...b]).join("")}export function generateNonce(a=10,b="lc4"){if(6>a)throw new Error("Nonce must be at least 6 characters long");return Array(a).fill(0).map(()=>randomElement([...("lc4"===b.toLowerCase()?ALPHABET:ALPHABET_LS47)])).join("")}export function initState(a,b="lc4"){let c="ls47"===b?GRIDSIZE_LS47:GRIDSIZE,d="ls47"===b?ALPHABET_LS47:ALPHABET,e=a.length===c*c?a:d,f=Array(c).fill(0).map(()=>Array(c).fill(0));for(let g=0;g<d.length;g++)f[Math.floor(g/c)][g%c]=d.indexOf(e[g]);if(a.length!==c*c){let e=0;for(let g of a){let a=d.indexOf(g)%c,h=Math.floor(d.indexOf(g)/c);for(let d=0;d<a;d++)shiftRowRight(f,e%c,{},b);for(let a=0;a<h;a++)shiftColumnDown(f,e%c,{},b);e++}}return f}export function encryptMsg({state:a,marker:b,mode:c},d,e=!1){let f="ls47"===c?ALPHABET_LS47:ALPHABET,g="ls47"===c?GRIDSIZE_LS47:GRIDSIZE;return e&&(console.log(`Encrypting: ${d}`),console.log("step: 0"),printState(a.slice(),{row:-1,col:-1},b,c)),[...d].map((d,h)=>{let i=f.indexOf(d),[j,k]=position(i,a),l=(j+Math.floor(a[b.i][b.j]/g))%g,m=(k+a[b.i][b.j]%g)%g,n=a[l][m];return shiftRowRight(a,j,b,c),l===j&&(m=(m+1)%g),shiftColumnDown(a,m,b,c),m===k&&(j=(j+1)%g),b.i=(b.i+Math.floor(n/g))%g,b.j=(b.j+n%g)%g,e&&(console.log(`step: ${h+1}`),console.log(Array(3*g-2).fill("-").join("")),printState(a.slice(),{row:j,col:m},b,c),console.log(Array(3*g-2).fill("-").join("")),console.log(`pt: \x1b[31m${d}\x1b[0m  ct: \x1b[31m${f[n]}\x1b[0m`,"\n")),f[n]}).join("")}export function decryptMsg({state:a,marker:b,mode:c},d,e){let f="ls47"===c?ALPHABET_LS47:ALPHABET,g="ls47"===c?GRIDSIZE_LS47:GRIDSIZE;return e&&(console.log(`Decrypting: ${d}`),console.log("step: 0"),printState(a.slice(),{row:-1,col:-1},b,c)),[...d].map((d,h)=>{let i=f.indexOf(d),[j,k]=position(i,a),l=(j-Math.floor(a[b.i][b.j]/g))%g,m=(k-a[b.i][b.j]%g)%g;0>l&&(l+=g),0>m&&(m+=g);let n=a[l][m];return shiftRowRight(a,l,b,c),j===l&&(k=(k+1)%g),shiftColumnDown(a,k,b,c),k===m&&(l=(l+1)%g),b.i=(b.i+Math.floor(i/g))%g,b.j=(b.j+i%g)%g,e&&(console.log(`step: ${h+1}`),console.log(Array(3*g-2).fill("-").join("")),printState(a.slice(),{row:l,col:k},b,c),console.log(Array(3*g-2).fill("-").join("")),console.log(`ct: \x1b[31m${d}\x1b[0m  pt: \x1b[31m${f[n]}\x1b[0m`,"\n")),f[n]}).join("")}
//# sourceMappingURL=lc4.js.map