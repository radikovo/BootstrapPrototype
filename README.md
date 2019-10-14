# Designovy framework pro Bootstrap

## Clone projektu

Je treba pustit `npm install` k nacteni vsech balicku

A treba nekdy `npm update`

**Framework nepodporuje zadne vnorene adresare...** S je to urcene na jeden projekt, pokud je vice projektu, lepe je klonovat cele.

Do `/src` se pisou vsechny zdrojaky stranek. 

Do `/src/include` se pisu includy, ktere se strkaji do html stranek pomoci `@@include('include/header.html')` nebo `@@include('include/header.html', {"header": "Example header"})` s paramnetry. Vice na [gulp-file-include](https://www.npmjs.com/package/gulp-file-include)

Do `/content/img` se strkaji obrazky

Spusti se `gulp` a ten prelozi includy a scss a vytvori adresar dist, ze ktereho to cele pousti na [localhost:3000](http://localhost:3000/) a dela refresh kdyz se zmeni soubory. Do stejneho webu se puvlikuje i cely adresar content se statickym obsahem (obrazky).

Vysledny balicek je tedy v adresarich `content` a `dist`.

## Publish na Azure

Pouziva se Azure Storage s funkci Static website. K tomu je potreba udelat storage typu V2. Je treba povolit Static website a urcit index.html. Publikuje se do kontejneru $web.

Spusteni pomoci `gulp publish`

URL se da vypsat do logu.

**Nastaveni azure je treba udelat do `gulpfile.js`**

## Jak to cele vzniklo

Vychazim z [tohoto tutorialu](https://coursetro.com/posts/design/72/Installing-Bootstrap-4-Tutorial).

### Vytvoreni projektu

- projekt by mel mit package.json - vytvorime pomoci `npm init --yes`
- nainstalovat bootstrap, vcetne ulozeni do dependencies
  - `npm install bootstrap --save`
  - `npm install jquery --save`
  - `npm install popper.js --save`
- nainstalovat gulp a jeho moduly `npm install gulp browser-sync gulp-sass --save-dev`
- nainstalovat include modul `npm install gulp-file-include --save-dev`
- pak byly i dalsi moduly
- napsat si `gulpfile.js`
- spustit `gulp`

### Chyba gulp not recognized

`npm install -g gulp-cli`

## TODO

`index.html` by mel byt rozcestnik, takze trosku poladit design a udelat sablonu by se hodilo.

Nejaky zaklad demostranky by se taky hodil.
