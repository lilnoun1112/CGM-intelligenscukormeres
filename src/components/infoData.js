/* Content captured from the Figma info screens (desktop 427:3185 + the
   mobile tab frames tab-performance / tab-lifestyle). The "Diabétesz" tab is
   the default shown in the desktop design. */

export const TABS = [
  {
    key: 'diabetes',
    label: 'Diabétesz',
    items: [
      {
        heading: 'Tudatosabb cukorkontroll:',
        body: 'Ha diabétesszel élsz, fontos lehet, hogy ne csak egy-egy mérési pontot láss, hanem folyamatosabban követhesd, hogyan alakul a cukorszinted. Az Accu-Chek SmartGuide CGM valós idejű glükózadatokat adhat, így könnyebben felismerheted, mikor lehet szükség beavatkozásra.',
      },
      {
        heading: 'Előrejelzések a kilengések előtt:',
        body: 'A rendszer prediktív funkciói segíthetnek időben felkészülni a lehetséges alacsony vagy magas glükózértékekre. Az alkalmazás 30 perces alacsony glükóz-előrejelzéssel, 2 órás glükóz-előrejelzéssel és éjszakai kockázatbecsléssel támogathatja a mindennapi döntéseidet.',
      },
      {
        heading: 'Nagyobb biztonságérzet a nap során:',
        body: 'A személyre szabható értesítések figyelmeztethetnek, ha a glükózszinted figyelmet igényel. Így nem kell folyamatosan találgatnod, merre tartanak az értékeid, és magabiztosabban alakíthatod a napi rutinodat, étkezéseidet vagy pihenésedet.',
      },
    ],
  },
  {
    key: 'performance',
    label: 'Teljesítmény',
    items: [
      {
        heading: 'Aktívabb napok, tudatosabban:',
        body: 'Ha sportolsz, sokat mozogsz vagy változatos a napirended, különösen hasznos lehet látni, hogyan reagál a szervezeted a terhelésre. A folyamatos glükózmonitorozás segíthet jobban megérteni, mikor stabilak az értékeid, és mikor érdemes óvatosabban folytatnod.',
      },
      {
        heading: 'Trendek, nem csak számok:',
        body: 'Az Accu-Chek SmartGuide és a mySugr app nemcsak az aktuális glükózértéket mutathatja, hanem azt is, milyen irányba mozdulnak az értékeid. A trendnyilak, grafikonok és előrejelzések segíthetnek abban, hogy jobban lásd, mi történik a háttérben.',
      },
      {
        heading: 'Felkészültebb döntések mozgás közben is:',
        body: 'A személyre szabható értesítések és az előrejelzések támogatást adhatnak akkor is, amikor nem szeretnéd, hogy a cukorszinted miatti bizonytalanság kizökkentsen. Így könnyebben igazíthatod a mozgást, a pihenést vagy a napi teendőket ahhoz, amit az adataid mutatnak.',
      },
    ],
  },
  {
    key: 'lifestyle',
    label: 'Életmód',
    items: [
      {
        heading: 'A mindennapok hatásainak megértése:',
        body: 'Az étkezés, az alvás, a stressz, a mozgás és a napi ritmus mind hatással lehetnek a cukorszintedre. A rendszer segíthet jobban átlátni ezeket az összefüggéseket, így könnyebben felismerheted, mi hogyan befolyásolja a glükózértékeidet.',
      },
      {
        heading: 'Egyszerűbb követés a mySugr appal:',
        body: 'A mySugr applikációban követheted a glükózadataidat, naplózhatod az inzulinbeadást, a szénhidrátbevitelt és a napi aktivitásaidat is. A grafikonok, statisztikák és mintázatok segíthetnek abban, hogy átláthatóbban kezeld a diabétesszel kapcsolatos információkat.',
      },
      {
        heading: 'Kényelmesebb beillesztés a rutinodba:',
        body: 'Az akár 14 napig viselhető, vízálló szenzor a felkarodon hordható, és 5 percenként automatikusan méri a glükózszintedet. Így a cukorszintkövetés kevésbé szakítja meg a napodat, és természetesebb része lehet a mindennapi életednek.',
      },
    ],
  },
];

export const PREDICTION_CARDS = [
  {
    eyebrow: 'Alacsony glükózszint előrejelzése',
    title: '30 perces előrejelzés',
    body: 'Érezd magad nagyobb biztonságban az alacsony glükózszintet előrejelző funkcióval, amely figyelmeztet, ha hamarosan alacsony érték várható, így időben léphetsz a kockázat csökkentése, illetve az esemény időtartamának és súlyosságának mérséklése érdekében.',
  },
  {
    eyebrow: 'Glükóz-előrejelzés',
    title: '2 órás előrejelzés',
    body: 'Készülj fel időben a 2 órás glükóz-előrejelző funkcióval, amely megmutatja, merre tart a glükózszinted, így egy lépéssel a lehetséges glükózkilengések előtt járhatsz.',
  },
  {
    eyebrow: 'Éjszakai alacsony glükózszint előrejelzése',
    title: 'Éjszakai előrejelzés',
    body: 'Aludj nyugodtabban az éjszakai alacsony glükózszintet előrejelző funkcióval, amely előre jelzi a hipó kockázatát, hogy még lefekvés előtt felkészülhess.',
  },
];
