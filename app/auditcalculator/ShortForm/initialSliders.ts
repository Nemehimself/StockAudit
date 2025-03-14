type SliderValues = {
  marketing: number;
  advertising: number;
  sales: number;
  smartMoney: number;
};

export const initialSliders: Record<string, Record<string, SliderValues>> = {
    Winter: {
      Standard: { marketing: 40, advertising: 20, sales: 20, smartMoney: 20 },
      Intense: { marketing: 70, advertising: 10, sales: 10, smartMoney: 10 },
      Custom: { marketing: 0, advertising: 0, sales: 0, smartMoney: 0 },
    },
    Spring: {
      Standard: { marketing: 20, advertising: 40, sales: 20, smartMoney: 20 },
      Intense: { marketing: 10, advertising: 70, sales: 10, smartMoney: 10 },
      Custom: { marketing: 0, advertising: 0, sales: 0, smartMoney: 0 },
    },
    Summer: {
      Standard: { marketing: 20, advertising: 20, sales: 40, smartMoney: 20 },
      Intense: { marketing: 10, advertising: 10, sales: 70, smartMoney: 10 },
      Custom: { marketing: 0, advertising: 0, sales: 0, smartMoney: 0 },
    },
    Autumn: {
      Standard: { marketing: 20, advertising: 20, sales: 20, smartMoney: 40 },
      Intense: { marketing: 10, advertising: 10, sales: 10, smartMoney: 70 },
      Custom: { marketing: 0, advertising: 0, sales: 0, smartMoney: 0 },
    },
  };