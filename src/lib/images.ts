const ids = {
  wristSuit: "1507679799987-c73779587ccf",
  wristBlue: "1509941943102-10c232535736",
  alps: "1506905925346-21bda4d32df4",
  valley: "1530122037265-a5f1f91d3b99",
  lake: "1497436072909-60f360e1d4b1",
  night: "1534447677768-be436bb09401",
  abyss: "1515405295579-ba7b45403062",
  pocket: "1509048191080-d2984bad6ae5",
  hourglass: "1501139083538-0139583c060f",
  stillLife: "1565193566173-7a0ee3dbe261",
  salon: "1606744824163-985d376605aa",
  jewel: "1573408301185-9146fe634ad0",
  watchDark: "1612817159949-195b6eb9e31a",
  watchStones: "1614164185128-e4ec99c436d7",
  watchVintage: "1620625515032-6ed0c1790c75",
  watchChrono: "1622434641406-a158123450f9",
  watchBook: "1547996160-81dfa63595aa",
  watchDiver: "1548171915-e79a380a2a4b",
  watchBlueSun: "1619134778706-7015533a6150",
  watchPanda: "1542496658-e33a6d0d50f6",
  watchTeal: "1522312346375-d1a52e2b99b3",
  watchSunset: "1533139502658-0198f920d8e8",
  watchRed: "1539874754764-5a96559165b0",
  watchFlat: "1557531365-e8b22d93dbd0",
  watchRock: "1495856458515-0637185db551",
  watchTrio: "1609587312208-cea54be969e7",
  watchHand: "1524592094714-0f0654e20314",
  watchBlueStrap: "1585123334904-845d60e97b29",
  watchMinimal: "1434056886845-dac89ffe9b56",
  watchNato: "1508057198894-247b23fe5ade",
} as const;

export type ImageKey = keyof typeof ids;

export function img(key: ImageKey, width = 1600) {
  return `https://images.unsplash.com/photo-${ids[key]}?auto=format&fit=crop&w=${width}&q=80`;
}
