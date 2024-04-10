/*
  ═══╡ UPPGIFT 57 ╞══════════════════════════════════════════════════
  
  Deklarera en funktion med namnet `isPositive` som har en parameter.

  Funktionen skall returnera `true` ifall värdet i parametern
  är likamed eller större än 0, annars skall funktionen 
  returnera `false`.
  
  ───┤ RESURSER ├────────────────────────────────────────────────────

  - ...
*/

// Ta inte bort följande kod:

import readline from 'read-console-input'

const value = Number(readline('Ange ett tal: '))

if(isPositive(value)) {
  console.log('Talet är positivt.')
}
else {
  console.log('Talet är negativt.')
}

// Deklarera funktionen `isPositive` här..
